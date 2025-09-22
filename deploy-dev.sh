#!/bin/bash

npm run prisma:deploy:dev

npm run build

docker buildx build --platform linux/amd64,linux/arm64 -t kns1997/testapp-dev:latest .
docker push kns1997/testapp-dev:latest

kubectl apply -f deployment-dev.yaml
kubectl apply -f ngrok-deployment.yaml

kubectl rollout restart deployment testapp-dev-deployment -n default
