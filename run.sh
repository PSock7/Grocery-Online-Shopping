#!/bin/bash

# Fonction pour afficher le menu
show_menu() {
    echo "1) Démarrer Minikube et configurer l'environnement"
    echo "2) Regarder les pods qui s'executent"
    echo "3) Lister les services avec la commande minikube"
    echo "4) Exécuter les tests Curl pour creer un compte utilisateur"
    echo "5) Executer les tests curl pour se connecter "
    echo "6) Executer les tests curl pour creer un produit "
    echo "7) Quitter"
    echo -n "Entrez votre choix [1-5]: "
}

# Fonction pour démarrer Minikube et configurer l'environnement
start_minikube() {
    minikube start --driver docker --static-ip 192.168.49.2
    minikube addons enable ingress
    kubectl apply -f ./K8s/namespace
    kubectl apply -f ./K8s/database
    kubectl apply -f ./K8s/backend
    kubectl apply -f ./K8s/frontend
    echo "Minikube et les services ont été configurés."
}

show_pod(){
	kubectl get pods -n grocery 
}
show_minikube_service(){
	minikube service list -n grocery
}

# Menu principal
while true; do
    show_menu
    read choice
    case $choice in
        1) start_minikube ;;
	2) show_pod ;;
	3) show_minikube_service ;;
        4) ./curltest.sh customer-signup ;;
        5) ./curltest.sh customer-login ;;
        6) ./curltest.sh create-product ;;
        7) break ;;
        *) echo "Choix invalide, réessayez." ;;
    esac
done
