from flask import request
from keystone import Ks
import traceback

from .settings import get_settings
from .constants import keystone_modes


keystone_instances = {}

# Initialize all the keystone instances so we can access them directly later on
def init_keystone():
    global keystone_instances
    keystone_instances = {}

    for ARCH in keystone_modes:
        arch = keystone_modes[ARCH]
        arch_val = arch['KS_VAL']

        if ARCH not in keystone_instances:
            keystone_instances[ARCH] = {}

        for MODE in arch['MODES']:
            mode = arch['MODES'][MODE]
            mode_val = mode['KS_VAL']

            if MODE not in keystone_instances[ARCH]:
                keystone_instances[ARCH][MODE] = {}

            for ENDIAN in mode['ENDIAN']:
                endian = mode['ENDIAN'][ENDIAN]
                endian_val = endian['KS_VAL']

                keystone_instances[ARCH][MODE][ENDIAN] = Ks(arch_val, mode_val + endian_val)


def assemble(code, arch, mode, endian, offset):
    """
    Attempt to assemble code (as a string) with the specified settings.

    Returns `True, assembled_code` on success, and `False, error` on failure.
    """
    try:
        keystone = keystone_instances[arch][mode][endian]
        assembled_code = keystone.asm_by_line(code, offset)[0]

        # Convert from bytes to lists of integers. Avoids encoding errors but
        # takes up a bit more space, oh well
        return True, [list(line) for line in assembled_code]
    except Exception as e:
        print("Assembler error")
        traceback.print_exc()
        #Super hack to get the first part of a Keystone error message
        return False, "Error assembling: " + str(e).split("(")[0]
