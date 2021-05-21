// Capstone Constants
// architecture
const CS_ARCH_ARM = 0
const CS_ARCH_ARM64 = 1
const CS_ARCH_MIPS = 2
const CS_ARCH_X86 = 3
const CS_ARCH_PPC = 4
const CS_ARCH_SPARC = 5
const CS_ARCH_SYSZ = 6
const CS_ARCH_XCORE = 7
const CS_ARCH_M68K = 8
const CS_ARCH_TMS320C64X = 9
const CS_ARCH_M680X = 10
const CS_ARCH_EVM = 11
const CS_ARCH_MOS65XX = 12
const CS_ARCH_MAX = 13
const CS_ARCH_ALL = 0xFFFF

// disasm mode
const CS_MODE_LITTLE_ENDIAN = 0      // little-endian mode (default mode)
const CS_MODE_ARM = 0                // ARM mode
const CS_MODE_16 = (1 << 1)          // 16-bit mode (for X86)
const CS_MODE_32 = (1 << 2)          // 32-bit mode (for X86)
const CS_MODE_64 = (1 << 3)          // 64-bit mode (for X86, PPC)
const CS_MODE_THUMB = (1 << 4)       // ARM's Thumb mode, including Thumb-2
const CS_MODE_MCLASS = (1 << 5)      // ARM's Cortex-M series
const CS_MODE_V8 = (1 << 6)          // ARMv8 A32 encodings for ARM
const CS_MODE_MICRO = (1 << 4)       // MicroMips mode (MIPS architecture)
const CS_MODE_MIPS3 = (1 << 5)       // Mips III ISA
const CS_MODE_MIPS32R6 = (1 << 6)    // Mips32r6 ISA
const CS_MODE_MIPS2 = (1 << 7)       // Mips II ISA
const CS_MODE_V9 = (1 << 4)          // Sparc V9 mode (for Sparc)
const CS_MODE_QPX = (1 << 4)         // Quad Processing eXtensions mode (PPC)
const CS_MODE_M68K_000 = (1 << 1)    // M68K 68000 mode
const CS_MODE_M68K_010 = (1 << 2)    // M68K 68010 mode
const CS_MODE_M68K_020 = (1 << 3)    // M68K 68020 mode
const CS_MODE_M68K_030 = (1 << 4)    // M68K 68030 mode
const CS_MODE_M68K_040 = (1 << 5)    // M68K 68040 mode
const CS_MODE_M68K_060 = (1 << 6)    // M68K 68060 mode
const CS_MODE_BIG_ENDIAN = (1 << 31) // big-endian mode
const CS_MODE_MIPS32 = CS_MODE_32    // Mips32 ISA
const CS_MODE_MIPS64 = CS_MODE_64    // Mips64 ISA
const CS_MODE_M680X_6301 = (1 << 1)  // M680X HD6301/3 mode
const CS_MODE_M680X_6309 = (1 << 2)  // M680X HD6309 mode
const CS_MODE_M680X_6800 = (1 << 3)  // M680X M6800/2 mode
const CS_MODE_M680X_6801 = (1 << 4)  // M680X M6801/3 mode
const CS_MODE_M680X_6805 = (1 << 5)  // M680X M6805 mode
const CS_MODE_M680X_6808 = (1 << 6)  // M680X M68HC08 mode
const CS_MODE_M680X_6809 = (1 << 7)  // M680X M6809 mode
const CS_MODE_M680X_6811 = (1 << 8)  // M680X M68HC11 mode
const CS_MODE_M680X_CPU12 = (1 << 9)  // M680X CPU12 mode
const CS_MODE_M680X_HCS08 = (1 << 10)  // M680X HCS08 mode

// Capstone option type
const CS_OPT_SYNTAX = 1    // Intel X86 asm syntax (const CS_ARCH_X86 arch)
const CS_OPT_DETAIL = 2    // Break down instruction structure into details
const CS_OPT_MODE = 3      // Change engine's mode at run-time
const CS_OPT_MEM = 4       // Change engine's mode at run-time
const CS_OPT_SKIPDATA = 5  // Skip data when disassembling
const CS_OPT_SKIPDATA_SETUP = 6      // Setup user-defined function for SKIPDATA option
const CS_OPT_MNEMONIC = 7  // Customize instruction mnemonic
const CS_OPT_UNSIGNED = 8  // Print immediate in unsigned form

// Capstone option value
const CS_OPT_OFF = 0             // Turn OFF an option - default option of const CS_OPT_DETAIL
const CS_OPT_ON = 3              // Turn ON an option (const CS_OPT_DETAIL)

// Common instruction operand types - to be consistent across all architectures.
const CS_OP_INVALID = 0
const CS_OP_REG = 1
const CS_OP_IMM = 2
const CS_OP_MEM = 3
const CS_OP_FP  = 4

// Common instruction groups - to be consistent across all architectures.
const CS_GRP_INVALID = 0  // uninitialized/invalid group.
const CS_GRP_JUMP    = 1  // all jump instructions (conditional+direct+indirect jumps)
const CS_GRP_CALL    = 2  // all call instructions
const CS_GRP_RET     = 3  // all return instructions
const CS_GRP_INT     = 4  // all interrupt instructions (int+syscall)
const CS_GRP_IRET    = 5  // all interrupt return instructions
const CS_GRP_PRIVILEGE = 6  // all privileged instructions

// Access types for instruction operands.
const CS_AC_INVALID  = 0        // Invalid/unitialized access type.
const CS_AC_READ     = (1 << 0) // Operand that is read from.
const CS_AC_WRITE    = (1 << 1) // Operand that is written to.

// Capstone syntax value
const CS_OPT_SYNTAX_DEFAULT = 0    // Default assembly syntax of all platforms (const CS_OPT_SYNTAX)
const CS_OPT_SYNTAX_INTEL = 1    // Intel X86 asm syntax - default syntax on X86 (const CS_OPT_SYNTAX, const CS_ARCH_X86)
const CS_OPT_SYNTAX_ATT = 2      // ATT asm syntax (const CS_OPT_SYNTAX, const CS_ARCH_X86)
const CS_OPT_SYNTAX_NOREGNAME = 3   // Asm syntax prints register name with only number - (const CS_OPT_SYNTAX, const CS_ARCH_PPC, const CS_ARCH_ARM)
const CS_OPT_SYNTAX_MASM = 4      // MASM syntax (const CS_OPT_SYNTAX, const CS_ARCH_X86)

// Capstone error type
const CS_ERR_OK = 0      // No error: everything was fine
const CS_ERR_MEM = 1     // Out-Of-Memory error: cs_open(), cs_disasm()
const CS_ERR_ARCH = 2    // Unsupported architecture: cs_open()
const CS_ERR_HANDLE = 3  // Invalid handle: cs_op_count(), cs_op_index()
const CS_ERR_CSH = 4     // Invalid csh argument: cs_close(), cs_errno(), cs_option()
const CS_ERR_MODE = 5    // Invalid/unsupported mode: cs_open()
const CS_ERR_OPTION = 6  // Invalid/unsupported option: cs_option()
const CS_ERR_DETAIL = 7  // Invalid/unsupported option: cs_option()
const CS_ERR_MEMSETUP = 8
const CS_ERR_VERSION = 9 // Unsupported version (bindings)
const CS_ERR_DIET = 10   // Information irrelevant in diet engine
const CS_ERR_SKIPDATA = 11 // Access irrelevant data for "data" instruction in SKIPDATA mode
const CS_ERR_X86_ATT = 12 // X86 AT&T syntax is unsupported (opt-out at compile time)
const CS_ERR_X86_INTEL = 13 // X86 Intel syntax is unsupported (opt-out at compile time)
const CS_ERR_X86_MASM = 14 // X86 Intel syntax is unsupported (opt-out at compile time)

// Keystone constants
const KS_ARCH_ARM = 1
const KS_ARCH_ARM64 = 2
const KS_ARCH_MIPS = 3
const KS_ARCH_X86 = 4
const KS_ARCH_PPC = 5
const KS_ARCH_SPARC = 6
const KS_ARCH_SYSTEMZ = 7
const KS_ARCH_HEXAGON = 8
const KS_ARCH_EVM = 9
const KS_ARCH_MAX = 10
const KS_MODE_LITTLE_ENDIAN = 0
const KS_MODE_BIG_ENDIAN = 1073741824
const KS_MODE_ARM = 1
const KS_MODE_THUMB = 16
const KS_MODE_V8 = 64
const KS_MODE_MICRO = 16
const KS_MODE_MIPS3 = 32
const KS_MODE_MIPS32R6 = 64
const KS_MODE_MIPS32 = 4
const KS_MODE_MIPS64 = 8
const KS_MODE_16 = 2
const KS_MODE_32 = 4
const KS_MODE_64 = 8
const KS_MODE_PPC32 = 4
const KS_MODE_PPC64 = 8
const KS_MODE_QPX = 16
const KS_MODE_SPARC32 = 4
const KS_MODE_SPARC64 = 8
const KS_MODE_V9 = 16
const KS_ERR_ASM = 128
const KS_ERR_ASM_ARCH = 512
const KS_ERR_OK = 0
const KS_ERR_NOMEM = 1
const KS_ERR_ARCH = 2
const KS_ERR_HANDLE = 3
const KS_ERR_MODE = 4
const KS_ERR_VERSION = 5
const KS_ERR_OPT_INVALID = 6
const KS_ERR_ASM_EXPR_TOKEN = 128
const KS_ERR_ASM_DIRECTIVE_VALUE_RANGE = 129
const KS_ERR_ASM_DIRECTIVE_ID = 130
const KS_ERR_ASM_DIRECTIVE_TOKEN = 131
const KS_ERR_ASM_DIRECTIVE_STR = 132
const KS_ERR_ASM_DIRECTIVE_COMMA = 133
const KS_ERR_ASM_DIRECTIVE_RELOC_NAME = 134
const KS_ERR_ASM_DIRECTIVE_RELOC_TOKEN = 135
const KS_ERR_ASM_DIRECTIVE_FPOINT = 136
const KS_ERR_ASM_DIRECTIVE_UNKNOWN = 137
const KS_ERR_ASM_DIRECTIVE_EQU = 138
const KS_ERR_ASM_DIRECTIVE_INVALID = 139
const KS_ERR_ASM_VARIANT_INVALID = 140
const KS_ERR_ASM_EXPR_BRACKET = 141
const KS_ERR_ASM_SYMBOL_MODIFIER = 142
const KS_ERR_ASM_SYMBOL_REDEFINED = 143
const KS_ERR_ASM_SYMBOL_MISSING = 144
const KS_ERR_ASM_RPAREN = 145
const KS_ERR_ASM_STAT_TOKEN = 146
const KS_ERR_ASM_UNSUPPORTED = 147
const KS_ERR_ASM_MACRO_TOKEN = 148
const KS_ERR_ASM_MACRO_PAREN = 149
const KS_ERR_ASM_MACRO_EQU = 150
const KS_ERR_ASM_MACRO_ARGS = 151
const KS_ERR_ASM_MACRO_LEVELS_EXCEED = 152
const KS_ERR_ASM_MACRO_STR = 153
const KS_ERR_ASM_MACRO_INVALID = 154
const KS_ERR_ASM_ESC_BACKSLASH = 155
const KS_ERR_ASM_ESC_OCTAL = 156
const KS_ERR_ASM_ESC_SEQUENCE = 157
const KS_ERR_ASM_ESC_STR = 158
const KS_ERR_ASM_TOKEN_INVALID = 159
const KS_ERR_ASM_INSN_UNSUPPORTED = 160
const KS_ERR_ASM_FIXUP_INVALID = 161
const KS_ERR_ASM_LABEL_INVALID = 162
const KS_ERR_ASM_FRAGMENT_INVALID = 163
const KS_ERR_ASM_INVALIDOPERAND = 512
const KS_ERR_ASM_MISSINGFEATURE = 513
const KS_ERR_ASM_MNEMONICFAIL = 514
const KS_OPT_SYNTAX = 1
const KS_OPT_SYM_RESOLVER = 2
const KS_OPT_SYNTAX_INTEL = 1
const KS_OPT_SYNTAX_ATT = 2
const KS_OPT_SYNTAX_NASM = 4
const KS_OPT_SYNTAX_MASM = 8
const KS_OPT_SYNTAX_GAS = 16
const KS_OPT_SYNTAX_RADIX16 = 32

const keystone_modes = {
    'ARCH_ARM': {
        'KS_VAL': KS_ARCH_ARM,
        'CS_VAL': CS_ARCH_ARM,
        'MODES': {
            'MODE_ARM': {
                'KS_VAL': KS_MODE_ARM,
                'CS_VAL': CS_MODE_ARM,
                'DESCRIPTION': '32 Bit',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    },
                    'MODE_BIG_ENDIAN': {
                        'KS_VAL': KS_MODE_BIG_ENDIAN,
                        'CS_VAL': CS_MODE_BIG_ENDIAN,
                        'DESCRIPTION': 'Big Endian'
                    }
                }
            },
            'MODE_THUMB': {
                'KS_VAL': KS_MODE_THUMB,
                'CS_VAL': CS_MODE_THUMB,
                'DESCRIPTION': '32 Bit Thumb',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    },
                    'MODE_BIG_ENDIAN': {
                        'KS_VAL': KS_MODE_BIG_ENDIAN,
                        'CS_VAL': CS_MODE_BIG_ENDIAN,
                        'DESCRIPTION': 'Big Endian'
                    }
                }
            }
        }
    },
    'ARCH_ARM64': {
        'KS_VAL': KS_ARCH_ARM64,
        'CS_VAL': CS_ARCH_ARM64,
        'MODES': {
            'MODE_ARM': {
                'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                'DESCRIPTION': '64 Bit',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    }
                }
            }
        }
    },

    'ARCH_MIPS': {
        'KS_VAL': KS_ARCH_MIPS,
        'CS_VAL': CS_ARCH_MIPS,
        'MODES': {
            'MODE_MIPS32': {
                'KS_VAL': KS_MODE_MIPS32,
                'CS_VAL': CS_MODE_MIPS32,
                'DESCRIPTION': '32 Bit',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    },
                    'MODE_BIG_ENDIAN': {
                        'KS_VAL': KS_MODE_BIG_ENDIAN,
                        'CS_VAL': CS_MODE_BIG_ENDIAN,
                        'DESCRIPTION': 'Big Endian'
                    }
                }
            },
            'MODE_MIPS64': {
                'KS_VAL': KS_MODE_MIPS64,
                'CS_VAL': CS_MODE_MIPS64,
                'DESCRIPTION': '64 Bit',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    },
                    'MODE_BIG_ENDIAN': {
                        'KS_VAL': KS_MODE_BIG_ENDIAN,
                        'CS_VAL': CS_MODE_BIG_ENDIAN,
                        'DESCRIPTION': 'Big Endian'
                    }
                }
            }
        }
    },

    'ARCH_X86': {
        'KS_VAL': KS_ARCH_X86,
        'CS_VAL': CS_ARCH_X86,
        'MODES': {
            'MODE_64': {
                'KS_VAL': KS_MODE_64,
                'CS_VAL': CS_MODE_64,
                'DESCRIPTION': '64 Bit',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    }
                }
            },
            'MODE_32': {
                'KS_VAL': KS_MODE_32,
                'CS_VAL': CS_MODE_32,
                'DESCRIPTION': '32 Bit',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    }
                }
            },
            'MODE_16': {
                'KS_VAL': KS_MODE_16,
                'CS_VAL': CS_MODE_16,
                'DESCRIPTION': '16 Bit',
                'ENDIAN': {
                    'MODE_LITTLE_ENDIAN': {
                        'KS_VAL': KS_MODE_LITTLE_ENDIAN,
                        'CS_VAL': CS_MODE_LITTLE_ENDIAN,
                        'DESCRIPTION': 'Little Endian'
                    }
                }
            }
        }
    }
}
