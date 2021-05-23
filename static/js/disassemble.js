function parse_raw(code) {
    // A super shitty hack to parse raw strings
    let raw_parsed = JSON.parse('"' + code.replace(/\\x/g, "\\u00") + '"');
    //conver to array of ints
    const machine_parsed = raw_parsed.map((chr) =>
        chr.charCodeAt(0)
    );
     
    //Because of the structure of machine_code_bytes, treat it all as one line
    return [machine_parsed];
}

function parse_prettified(code) {
    let code_by_line = code.split("\n");
    
    const machine_parsed = code_by_line.map((code_line) => {
        let code_line_p1 = code_line.replace(/\s/g, "");
        if(code_line_p1.length % 2 !== 0) {
            throw "Invalid hex";
        }

        //convert to int array from hex
        let parsed_hex = [];
        for(let i = 0; i < code_line_p1.length; i+=2){
           parsed_hex.push(parseInt(code_line_p1.substr(i, 2), 16));
        }

        return parsed_hex;
    });

    return machine_parsed;
}

function update_disassembled(response) {
    response = JSON.parse(response);

    if (response.hasOwnProperty("ok")) {
        const code = response["ok"];

        mutex_lock = true;
        asm_editor.setValue(code, 1);
        let cur_line = machine_editor.selection.getCursor().row;
        asm_editor.selection.moveTo(cur_line, 0);
        mutex_lock = false;

        set_message("Success: Code Disassembled!");
    } else if (response.hasOwnProperty("error")) {
        set_message(response["error"]);
    } else {
        set_message("Error disassembling: Invalid server response. See console.");
        console.log(response);
    }
}

function disassemble() {
    let machine_code_parsed;
    //Remove all non hex things
    const machine_code = machine_editor.getValue();
    //because I throw exceptions when invalid hex, I need to catch em and return 
    try{
        if (document.getElementById('VIEW').value === "1") {
            machine_code_parsed = parse_prettified(machine_code);
        } else {
            machine_code_parsed = parse_raw(machine_code);
        }
    } catch (err){
        set_message("Error disassembling: invalid hex present");
        return;
    }
    global_settings.machine_code_bytes = JSON.stringify(machine_code_parsed);

    ajaxPost(
        "disassemble",
        {
            'raw': JSON.stringify(machine_code_parsed),
            'settings': JSON.stringify(get_settings()),
        },
        update_disassembled
    );
}
