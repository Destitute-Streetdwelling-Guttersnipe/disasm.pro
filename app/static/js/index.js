const settings_skeleton = {'ARCH' : '', 'MODE' : '', 'ENDIAN' : '', 'OFFSET' : ''}

let global_settings = localStorage;
//The assembled code bytes are the stored code from the last set_settings
let socket, asm_editor, machine_editor;

let mutex_lock = false;
    
document.body.onload = ()=> {
    init_settings()

    //Handler for when we receive assembled code

    document.getElementById('ARCH').addEventListener('change', () => {
        set_arch(document.getElementById('ARCH').value);
        update_settings_to_server();
    })
    
    document.getElementById('MODE').addEventListener('change', () => {
        set_mode(document.getElementById('MODE').value);
        update_settings_to_server();
    })

    document.getElementById('ENDIAN').addEventListener('change', () => {
        set_endian(document.getElementById('ENDIAN').value);
        update_settings_to_server();
    })

    document.getElementById('OFFSET').addEventListener('change', () => {
        set_offset(document.getElementById('OFFSET').value);
        update_settings_to_server();
    })
    
    document.getElementById('VIEW').addEventListener('change', () => {
        set_view(document.getElementById('VIEW').value);
        update_assembled_code(JSON.parse(global_settings.machine_code_bytes));
    })

    asm_editor.commands.addCommand({
        name: "assemble",
        bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
        exec: (editor) => {
            global_settings.asm_code = editor.getValue();
            //A lock here is neede because setValue of ace editor fires onchange event
            if (mutex_lock) return; 
            global_settings.last_focus = 0;
            assemble();
        },
        readOnly: true
    });

    machine_editor.commands.addCommand({
        name: "disassemble",
        bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
        exec: (editor) => {
            global_settings.machine_code = machine_editor.getValue();
            if (mutex_lock) return;
            global_settings.last_focus = 1;
            disassemble();
        },
        readOnly: true
    });

    easydropdown.all({
        behavior: {
            liveUpdates: true
        }
    });
}

function init_settings() {
    // if only ARCH is null, aka new session, initialize everything
    if(global_settings.ARCH === undefined){
        default_settings = {
            'ARCH': 'ARCH_X86',
            'MODE': 'MODE_64',
            'ENDIAN': 'MODE_LITTLE_ENDIAN',
            'OFFSET' : '0x0',
            'VIEW': '1'
        };

        for(key in default_settings){
            global_settings[key] = default_settings[key];
        }

        global_settings.asm_code = "mov rax, 0x0\n";
        global_settings.machine_code = "48 C7 C0 00 00 00 00\n"
        global_settings.machine_code_bytes = [[0x48, 0xC7, 0xC0, 0x00, 0x00, 0x00, 0x00]]
        global_settings.last_focus = 0 // 0 means on the asm editor and 1 means on the machine editor
    }

    // The editor where we write asm
    asm_editor = ace.edit("asm_editor");
    asm_editor.setTheme("ace/theme/twilight");
    asm_editor.setShowPrintMargin(false);
    asm_editor.setFontSize("1em");
    asm_editor.setOptions({
        fontFamily: '"Courier New", Courier, monospace'
    });
    asm_editor.session.setMode("ace/mode/assembly_x86");
    asm_editor.session.setValue(global_settings.asm_code);

    // Where the disassebmled code is displayed
    machine_editor = ace.edit("machine_editor");
    machine_editor.setTheme("ace/theme/twilight");
    machine_editor.setShowPrintMargin(false);
    machine_editor.setFontSize("1em");
    machine_editor.setOptions({
        fontFamily: '"Courier New", Courier, monospace'
    });
    machine_editor.setOption('indentedSoftWrap', false);
    machine_editor.autoIndent = false;
    machine_editor.renderer.setShowGutter(false);
    machine_editor.session.setMode("ace/mode/text");
    machine_editor.session.setValue(global_settings.machine_code);
    
    sync_settings_local();
    update_settings_to_server();
    set_message("Initialized: Ready");
}

function get_settings() {
    current_settings = settings_skeleton;

    for (const key in current_settings){
        if (current_settings.hasOwnProperty(key)) {
            current_settings[key] = global_settings[key];
        }
    }

    return current_settings;
}

function update_settings_to_server() {
    ajaxPost("/update_settings", {'settings': JSON.stringify(get_settings())}, _ => {
        if(global_settings.last_focus === 0) {
            assemble();
        } else {
            disassemble();
        }
    });
}

function clear_option_element(element) {
    while (document.getElementById(element).length !== 0) {
        document.getElementById(element).remove(0);
    }
}

function set_offset(new_offset) {
    global_settings['OFFSET'] = new_offset;
}

function set_endian(new_endian) {
    // bug in the easydropdown library which launches two event handlers
    if(new_endian === ""){ 
        document.getElementById('ENDIAN').value = global_settings['ENDIAN'];
        return;
    }

    global_settings['ENDIAN'] = new_endian;
}

function set_mode(new_mode) {
    if(new_mode == ""){
        document.getElementById('MODE').value = global_settings['MODE'];
        return;
    }

    global_settings['MODE'] = new_mode;

    let current_mode = keystone_modes[global_settings['ARCH']]['MODES'][new_mode];
    let current_mode_endians = Object.keys(current_mode['ENDIAN'])

    // Reset the endian options for the new mode
    clear_option_element('ENDIAN');
    current_mode_endians.forEach((endianness) => {
        let opt = document.createElement("option");
        opt.text = current_mode['ENDIAN'][endianness].DESCRIPTION;
        opt.value = endianness;
        document.getElementById('ENDIAN').add(opt);
    });

    if (!current_mode_endians.includes(global_settings['ENDIAN'])) {
        set_endian(current_mode_endians[0]);
    } else {
        document.getElementById('ENDIAN').value = global_settings['ENDIAN'];
    }
}

function set_arch(new_arch){
    global_settings['ARCH'] = new_arch;

    current_arch = keystone_modes[new_arch];
    current_arch_modes = Object.keys(current_arch['MODES']);
    
    let current_mode_elem = document.getElementById('MODE');

    // Reset the mode options for the new arch
    clear_option_element('MODE');
    current_arch_modes.forEach((mode) => {
        let opt = document.createElement("option");
        opt.text = current_arch['MODES'][mode].DESCRIPTION;
        opt.value = mode;
        current_mode_elem.add(opt);
    });

    if (!current_arch_modes.includes(global_settings['MODE'])) {
        set_mode(current_arch_modes[0]);
    } else {
        document.getElementById('MODE').value = global_settings['MODE'];
    }
}

function set_view(new_view) {
    global_settings['VIEW'] = new_view;
}

function sync_settings_local() {
    // Just change the ARCH, it will start a chain of event handlers...
    document.getElementById('ARCH').value = global_settings['ARCH']
    set_arch(global_settings['ARCH']);

    document.getElementById('MODE').value = global_settings['MODE']
    set_mode(global_settings['MODE']);

    document.getElementById('ENDIAN').value = global_settings['ENDIAN']
    set_endian(global_settings['ENDIAN']);

    document.getElementById('OFFSET').value = global_settings['OFFSET']
    set_offset(global_settings['OFFSET']);

    document.getElementById('VIEW').value = global_settings['VIEW']
    set_view(global_settings['VIEW']);
}

function set_message(message) {
    document.getElementById('msg-box').innerText = message;    
}
