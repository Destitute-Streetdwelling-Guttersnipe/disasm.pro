keystone_modes = {
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
