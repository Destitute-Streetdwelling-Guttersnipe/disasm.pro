FROM ubuntu:20.04 AS build

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq git python python3 cmake && \
    mkdir /tools

ADD keystone /build/keystone

# Build keystone
RUN /bin/bash -c "cd /build/keystone/bindings/python && \
    make install3 && \
    echo done"

# Install other packages
ADD requirements.txt /

RUN /bin/bash -c "cd / && pip3 install -r requirements.txt"

ENTRYPOINT ["/bin/bash"]
