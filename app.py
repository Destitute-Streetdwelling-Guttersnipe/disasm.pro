from flask import Flask, request, jsonify
import json
from disasm import assemble, disassemble
from disasm.settings import get_settings

app = Flask(__name__)
app.config['SECRET_KEY'] = 'anevenmoreseceterskey'

# Init the *stones
assemble.init_keystone()
disassemble.init_capstone()

# Add all routes
@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/assemble', methods=['POST', 'PUT'])
def do_assemble():
    settings = get_settings()
    arch = settings['ARCH']
    mode = settings['MODE']
    endian = settings['ENDIAN']
    offset = settings['OFFSET']

    if 'code' not in request.form:
        return {'error': "Code not included in request"}, 400

    success, output = assemble.assemble(
        request.form['code'],
        arch, mode, endian, offset
    )

    if success:
        return {'ok': output}, 200
    else:
        return {'error': output}, 500

@app.route('/disassemble', methods=['POST', 'PUT'])
def do_disassemble():
    settings = get_settings()
    arch = settings['ARCH']
    mode = settings['MODE']
    endian = settings['ENDIAN']
    offset = settings['OFFSET']

    if 'raw' not in request.form:
        return {'error': "Raw bytes not included in request"}, 400

    success, output = disassemble.disassemble(
        request.form['raw'],
        arch, mode, endian, offset
    )

    if success:
        return {'ok': output}, 200
    else:
        return {'error': output}, 500

