# disasm.pro
Formerly known as disasm.ninja, It's a multi-architecture realtime assembler/disassembler with line-to-line correlation. A live version is currently up at https://disasm.duvallj.pw/

# What and Why
Previous author:
> It is basically a nice frontend of a [keystone](https://github.com/ret2got/keystone) fork (for line-to-line assembling) and [capstone](https://github.com/aquynh/capstone). 
> 
> I don't normally do frontend development but I wanted something for quickly analyzing tiny snippets of code (mostly during CTFs) and shellcoding, which led to this. 
> 
> I know there are other online assemblers/disassemblers out there, but none of them fit my exact needs. 

Current author: Yup I can confirm, their code got the job done but it wasn't pretty. Still a very good project and I'm glad someone else made it and did most of the hard work.

# Support
It currently supports 5 architectures:

- x86/64
- ARMv8
- MIPS
- Sparc
- PowerPC

Most typical assembler directives are also supported. Macros are not fully supported. 

# Installation

To Install and run it locally: 

- Git clone with submodules

```
git clone https://github.com/duvallj/disasm.pro.git --recursive
cd disasm.pro
```

- Make a virtual environment

```
python -m venv venv
```

- Install the Python3 bindings

```
cd keystone/bindings/python
make install3
```

- Install other Python dependencies

```
pip3 install -r requirements.txt
```

Now you can run it by executing the `ninja.py`

```
python3 ninja.py
```

For deployment with nginx/systemd, see the configuration files in the root of the repository.

# Bugs/Issues

If you stumble upon any bugs or somehow get it to segfault, please file an issue.
