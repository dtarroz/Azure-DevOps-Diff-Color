# Azure DevOps Diff Color

Extension navigateur Edge/Chrome qui permet de personnaliser les couleurs des différences (diff) dans Azure DevOps.

## 🎯 Fonctionnalités

- ✅ Personnalisation des couleurs des éléments ajoutés et supprimés
- ✅ Interface de configuration intuitive accessible via l'icône de l'extension
- ✅ Aperçu en temps réel des couleurs
- ✅ Sauvegarde des préférences
- ✅ Réinitialisation aux couleurs par défaut
- ✅ Application automatique sur le site http://vmproddevops:8080/

## 🚀 Installation

Cette extension n'est pas disponible sur le Chrome Web Store. Pour l'installer :

### 1. Préparer l'extension
1. Téléchargez ou clonez ce projet

### 2. Installation sur Edge
1. Ouvrez Microsoft Edge
2. Allez dans `edge://extensions/`
3. Activez le "Mode développeur" 
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier de ce projet

### 3. Installation sur Chrome
1. Ouvrez Google Chrome
2. Allez dans `chrome://extensions/`
3. Activez le "Mode développeur"
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier de ce projet

## 🎨 Utilisation

1. Naviguez vers votre site Azure DevOps (http://vmproddevops:8080/)
2. Cliquez sur l'icône de l'extension dans la barre d'outils
3. Configurez les couleurs selon vos préférences
4. Utilisez l'aperçu pour voir le rendu en temps réel
5. Cliquez sur "Sauvegarder" pour appliquer les changements

## 📝 Notes importantes

- L'extension ne fonctionne que sur `http://vmproddevops:8080/*`
- Les préférences sont sauvegardées avec `chrome.storage.sync`
- Utilise `!important` pour s'assurer que les styles prennent le dessus
