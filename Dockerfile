FROM ubuntu:20.04

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq git python3 python3-distutils python3-setuptools python3-pip build-essential cmake

# Build keystone
COPY keystone/ /build/keystone
RUN /bin/bash -c "cd /build/keystone/bindings/python && make install3"

# Fix keystone installation
RUN /bin/bash -c "cd /usr/local/lib/python3.8/dist-packages/keystone_engine-0.9.2-py3.8.egg && \
	mv ystone keystone && \
	mv G-INFO EGG-INFO"

# Install other packages
COPY requirements.txt /
RUN /bin/bash -c "cd / && pip3 install -r requirements.txt"

# Add all other files
COPY static/ static/
COPY app.py runserver.py handler.py /
COPY disasm/ disasm/

# For regular usage (as WGI server)
ENTRYPOINT ["python3"]
CMD ["runserver.py"]

# For usage as AWS Lambda function
# ENTRYPOINT ["python3", "-m", "awslambdaric"]
# CMD ["handler.handler"]
