function send_asm_update(){
    let asm_code = asm_editor.getValue();
    socket.emit('assemble', {'code':asm_code})
}

function update_assembled_prettified(code) {

    if(typeof code !== "undefined") {
        const output_code = code
            .map((code_line) => 
                // Convert string characters to bytes
                Array.from(new Uint8Array(code_line)).map((inp) =>
                    // Prefix 1-digit hex numbers with 0, make uppercase
                    ("0"+inp.toString(16)).substr(-2).toUpperCase()
                // Separate bytes on a line by ' '
                ).join(' ')
            )
            // Separate lines by '\n'
            .join('\n');

        // Take a lock so this update doesn't trigger a disassembly
        mutex_lock = true;

        machine_editor.setOption("wrap", false);
        machine_editor.setValue(output_code, 1);
        const cur_line = asm_editor.selection.getCursor().row;
        machine_editor.selection.moveTo(cur_line, 0);

        mutex_lock = false;
    }
}


function update_assembled_raw(code){
    let output_code = ""

    code.forEach(function(code_line){
        hexed_line_raw = code_line.map(function(inp){return "\\x"+ ("0"+inp.toString(16)).substr(-2).toUpperCase()}).join('')
        output_code += hexed_line_raw
    })
    mutex_lock = true
    machine_editor.setOption("wrap", true); //wrap lines for raw string
    machine_editor.setValue(output_code, 1);
    mutex_lock = false;

}

function update_assembled_code(code){
    global_settings.machine_code_bytes = JSON.stringify(code);// Update the code bytes in local storage for when we change modes

    if (global_settings['VIEW'] == '1')
        update_assembled_prettified(code)
    else update_assembled_raw(code);

    set_success_message("Code Assembled")

}
