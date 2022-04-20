FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
        build-essential \
        python3 \
        python3-pip \
        cmake \
        python-is-python3

# Build keystone
COPY keystone/ /keystone
RUN cd /keystone && \
    mkdir build && \
    cd build && \
    ../make-share.sh && \
    make install && \
    ldconfig && \
    cd ../bindings/python && \
    make install3

# Install requirements
COPY requirements.txt /
RUN cd / && \
    pip install -r requirements.txt && \
    rm requirements.txt

# Copy disasm
RUN mkdir -p /disasm/app
ADD app /disasm/app
COPY ninja.py /disasm/

WORKDIR /disasm
ENTRYPOINT ["python"]
CMD ["ninja.py"]