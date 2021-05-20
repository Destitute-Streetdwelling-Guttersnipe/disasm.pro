from flask import request
from capstone import Cs
import json
import traceback

from .settings import get_settings
from .constants import keystone_modes


capstone_instances = {}

def init_capstone():
    global capstone_instances
    capstone_instances = {}

    for ARCH in keystone_modes:
        arch = keystone_modes[ARCH]
        arch_val = arch['CS_VAL']

        if ARCH not in capstone_instances:
            capstone_instances[ARCH] = {}

        for MODE in arch['MODES']:
            mode = arch['MODES'][MODE]
            mode_val = mode['CS_VAL']

            if MODE not in capstone_instances[ARCH]:
                capstone_instances[ARCH][MODE] = {}

            for ENDIAN in mode['ENDIAN']:
                endian = mode['ENDIAN'][ENDIAN]
                endian_val = endian['CS_VAL']

                capstone_instances[ARCH][MODE][ENDIAN] = Cs(arch_val, mode_val + endian_val)

def disassemble(raw, arch, mode, endian, offset):
    try:
        capstone = capstone_instances[arch][mode][endian]
        raw = json.loads(raw)
        # Flatten the list using haxx
        raw = bytes([X for Y in raw for X in Y])
        output_instructions = "\n".join([
            f"{instr.mnemonic} {instr.op_str}"
            for instr in capstone.disasm(raw, offset)
        ])

        return True, output_instructions
    except Exception as e:
        print("Disassembler error")
        traceback.print_exc()
        #Super hack to get the first part of a Keystone error message
        return False, "Error disassembling: " + str(e).split("(")[0]

