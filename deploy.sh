#!/bin/bash

set -e

echo "Building docker image"
docker build . -t thinger
echo "Logging out of Docker (going to log back in)"
docker logout
echo "Logging back in to AWS ECR"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 649900069624.dkr.ecr.us-east-1.amazonaws.com
echo "Tagging image"
docker tag thinger:latest 649900069624.dkr.ecr.us-east-1.amazonaws.com/disasm:latest
echo "Pushing image"
docker push 649900069624.dkr.ecr.us-east-1.amazonaws.com/disasm:latest
echo "Syncinc S3 bucket"
aws s3 sync --delete static/ s3://disasm.duvallj.pw/static/
aws s3 sync static/index.html s3://disasm.duvallj.pw/index.html
echo "Done! Check AWS Console to complete setup"
