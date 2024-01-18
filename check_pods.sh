#!/bin/bash

NAMESPACE=grocery
PODS=$(kubectl get pods -n $NAMESPACE -o jsonpath='{.items[*].metadata.name}')

for pod in $PODS; do
    STATUS=$(kubectl get pod $pod -n $NAMESPACE -o jsonpath='{.status.phase}')
    if [ "$STATUS" != "Running" ]; then
        echo "Suppression du pod $pod dans l'état $STATUS"
        kubectl delete pod $pod -n $NAMESPACE
    fi
done
