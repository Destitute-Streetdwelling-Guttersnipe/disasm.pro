function update_assembled_prettified(code) {
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

function update_assembled_raw(code) {
    // Same thing as update_assembled_prettified, only:
    const output_code = code
        .map((code_line) =>
            Array.from(new Uint8Array(code_line)).map((inp) =>
                // Prefix all digits by \x
                "\\x" + ("0"+inp.toString(16)).substr(-2).toUpperCase()
            // And make everything lie on one line, no whitespace
            ).join('')
        )
        .join('');

    mutex_lock = true;
    // String may be long, so wrap it
    machine_editor.setOption("wrap", true);
    machine_editor.setValue(output_code, 1);
    mutex_lock = false;
}

function update_assembled(response) {
    response = JSON.parse(response);

    if (response.hasOwnProperty("ok")) {
        const code = response["ok"];
        // Update the code bytes in local storage for when we change modes
        global_settings.machine_code_bytes = code;
        
        if (global_settings["VIEW"] === "1") {
            update_assembled_prettified(code)
        } else {
            update_assembled_raw(code);
        }

        set_message("Success: Code Assembled!");
    } else if (response.hasOwnProperty("error")) {
        set_message(response["error"]);
    } else {
        set_message("Error assembling: Invalid server response. See console.");
        console.log(response);
    }
}

/* When called, this function initiates a POST request to the server to
 * assemble the code, and receives the response from the server and puts it to
 * the page. */
function assemble() {
    let asm_code = asm_editor.getValue();
    ajaxPost(
        "assemble",
        {
            'code': asm_code,
            'settings': JSON.stringify(get_settings())
        },
        update_assembled
    );
}
