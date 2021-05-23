from flask import request
import copy
import json


DEFAULT_SETTINGS = {
    'ARCH': 'ARCH_X86',
    'MODE': 'MODE_64',
    'ENDIAN': 'MODE_LITTLE_ENDIAN',
    'OFFSET' : '0x0',
    'VIEW': '1'
}

def get_settings():
    if hasattr(request, 'form') and 'settings' in request.form:
        settings = json.loads(request.form['settings'])
    else:
        settings = DEFAULT_SETTINGS
    settings = copy.copy(settings)

    for key in DEFAULT_SETTINGS:
        if key not in settings:
            settings[key] = DEFAULT_SETTINGS[key]

    try:
        settings['OFFSET'] = int(settings['OFFSET'], 16)
    except ValueError:
        try:
            settings['OFFSET'] = int(settings['OFFSET'])
        except ValueError:
            settings['OFFSET'] = 0

    return settings
