# Azure DevOps Diff Color Customizer

Extension navigateur Edge/Chrome qui permet de personnaliser les couleurs des différences (diff) dans Azure DevOps.

## 🎯 Fonctionnalités

- ✅ Personnalisation des couleurs des éléments `.added-content` et `.removed-content`
- ✅ Interface de configuration intuitive accessible via l'icône de l'extension
- ✅ Aperçu en temps réel des couleurs
- ✅ Sauvegarde automatique des préférences
- ✅ Réinitialisation aux couleurs par défaut
- ✅ Application automatique sur le site http://vmproddevops:8080/

## 🚀 Installation

Cette extension n'est pas disponible sur le Chrome Web Store. Pour l'installer :

### 1. Préparer l'extension
1. Téléchargez ou clonez ce projet
2. Ajoutez les icônes PNG dans le dossier `icons/` :
   - `icon16.png` (16x16 pixels)
   - `icon32.png` (32x32 pixels) 
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)

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
3. Configurez les couleurs selon vos préférences :
   - **Contenu ajouté** : Couleur de fond et texte pour `.added-content`
   - **Contenu supprimé** : Couleur de fond et texte pour `.removed-content`
4. Utilisez l'aperçu pour voir le rendu en temps réel
5. Cliquez sur "Sauvegarder" pour appliquer les changements
6. Rechargez la page Azure DevOps pour voir les nouveaux styles

## ⚙️ Couleurs par défaut

- **Contenu ajouté** : Fond `#efbdef` (violet clair), Texte `noir`
- **Contenu supprimé** : Fond `#ff5c5c` (rouge), Texte `noir`

## 📁 Structure du projet

```
Azure-DevOps-Diff-Color/
├── manifest.json          # Configuration de l'extension
├── content.js             # Script injecté dans les pages
├── popup.html            # Interface de configuration
├── popup.css             # Styles de l'interface
├── popup.js              # Logique de l'interface
├── icons/                # Icônes de l'extension
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # Ce fichier
```

## 🔧 Développement

### Modification des couleurs par défaut
Modifiez les valeurs dans `content.js` et `popup.js` :

```javascript
const defaultColors = {
  addedBg: '#efbdef',
  addedText: '#000000',
  removedBg: '#ff5c5c',
  removedText: '#000000'
};
```

### Ajout de nouveaux sélecteurs CSS
Modifiez `content.js` pour cibler d'autres éléments :

```javascript
style.textContent = `
  .repos-summary-diff-container .added-content,
  .your-new-selector {
    background-color: ${colors.addedBg} !important;
    color: ${colors.addedText} !important;
  }
`;
```

### Rechargement lors du développement
Après chaque modification :
1. Allez dans `edge://extensions/` ou `chrome://extensions/`
2. Cliquez sur le bouton "Recharger" de votre extension
3. Rechargez les pages Azure DevOps pour voir les changements

## 🛠️ Technologies utilisées

- **Manifest V3** : Dernière version des extensions Chrome/Edge
- **Chrome Extensions API** : Storage, Tabs
- **Vanilla JavaScript** : Pas de frameworks externes
- **CSS3** : Styles modernes avec variables CSS

## 📝 Notes importantes

- L'extension ne fonctionne que sur `http://vmproddevops:8080/*`
- Les préférences sont sauvegardées avec `chrome.storage.sync`
- L'extension observe les changements DOM pour réappliquer les styles
- Utilise `!important` pour s'assurer que les styles prennent le dessus

## 🤝 Contribution

Pour contribuer à ce projet :
1. Forkez le repository
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Créez une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
