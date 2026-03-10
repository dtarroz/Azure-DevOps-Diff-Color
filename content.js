// Content script pour Azure DevOps Diff Color Customizer
console.log('Azure DevOps Diff Color Customizer chargé');

// Fonction pour appliquer les couleurs personnalisées
function applyCustomColors(colors) {
  // Supprimer le style existant s'il existe
  resetCustomColors();

        // TODO la couleur est moins opaque que la sélection
      // la couleur de texte n'est pas à faire ici
      // http://vmproddevops:8080/tfs/DefaultCollection/Val%20Force%20One/_git/AMMON/pullrequest/3362?_a=files&path=/BO/AMMON/Couches/Val.Ammon.WebSite/App_Start/OwinStartup.cs
        // la preméire ligne devrait être plus sombre

  // Créer un nouveau style
  const style = document.createElement('style');
  style.id = 'azure-devops-custom-colors';
  style.textContent = `
    .repos-diff-contents-row .added {
      background-color: ${colors.addedLineBg};
      color: ${colors.addedLineText};   
    }

    .cdr.line-insert {
      background-color: ${colors.addedLineBg};
      color: ${colors.addedLineText};   
    }

    .repos-summary-diff-container .added-content {
      background-color: ${colors.addedBg};
      color: ${colors.addedText};
    }

    .cdr.char-insert {
      background-color: ${colors.addedBg};
      color: ${colors.addedText};
    }

    
    .repos-diff-contents-row .removed {
      background-color: ${colors.removedLineBg};
      color: ${colors.removedLineText};   
    } 
    
    .cdr.line-delete {
      background-color: ${colors.removedLineBg};
      color: ${colors.removedLineText};   
    }

    .repos-summary-diff-container .removed-content {
      background-color: ${colors.removedBg};
      color: ${colors.removedText};
    }

    .cdr.char-delete {
      background-color: ${colors.removedBg};
      color: ${colors.removedText};
    }


    .monaco-editor .selected-text {
      background-color: #c3d1df;
    }

    .monaco-editor .focused .selected-text {
      background-color: #7abdff;
    }

    .monaco-editor:has(.selected-text) .cdr.line-insert,
    .monaco-editor:has(.selected-text) .cdr.line-delete {
      opacity: 0.5;
    }

    .monaco-editor:has(.selected-text) .cdr.char-insert,
    .monaco-editor:has(.selected-text) .cdr.char-delete {
      opacity: 0.5;
    }
  `;
  
  document.body.insertBefore(style, document.body.firstChild);
}

function updateRender()
{
  chrome.storage.sync.get(['azureDevOpsEnabled'], (result) => {
    const enable = result.azureDevOpsEnabled !== false;
    if (enable) {
      // Charger les couleurs sauvegardées
      chrome.storage.sync.get(['azureDevOpsColors'], (result) => {
        if (result.azureDevOpsColors) {
          applyCustomColors(result.azureDevOpsColors);
        } else {
          // Couleurs par défaut
          const defaultColors = {
            addedLineBg: '#EAF5EA',
            addedLineText: '#191919',
            addedBg: '#D7ECD7',
            addedText: '#191919',
            removedLineBg: '#F7E5E5',
            removedLineText: '#191919',
            removedBg: '#F0CECE',
            removedText: '#191919'
          };
          applyCustomColors(defaultColors);
        }
      });
    }
    else
    {
      resetCustomColors();
    }
  });
}

function resetCustomColors()
{
  const existingStyle = document.getElementById('azure-devops-custom-colors');
  if (existingStyle)
    existingStyle.remove();
}

// Écouter les changements de couleurs depuis le popup
chrome.storage.onChanged.addListener((changes, namespace) => {
    updateRender();
});

updateRender();