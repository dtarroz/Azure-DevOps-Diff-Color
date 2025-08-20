// Content script pour Azure DevOps Diff Color Customizer
console.log('Azure DevOps Diff Color Customizer chargé');

// Fonction pour appliquer les couleurs personnalisées
function applyCustomColors(colors) {
  // Supprimer le style existant s'il existe
  const existingStyle = document.getElementById('azure-devops-custom-colors');
  if (existingStyle) {
    existingStyle.remove();
  }

  // Créer un nouveau style
  const style = document.createElement('style');
  style.id = 'azure-devops-custom-colors';
  style.textContent = `
    .repos-summary-diff-container .added-content {
      background-color: ${colors.addedBg} !important;
      color: ${colors.addedText} !important;
    }
    
    .repos-summary-diff-container .removed-content {
      background-color: ${colors.removedBg} !important;
      color: ${colors.removedText} !important;
    }
  `;
  
  document.head.appendChild(style);
}

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

// Écouter les changements de couleurs depuis le popup
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.azureDevOpsColors) {
    applyCustomColors(changes.azureDevOpsColors.newValue);
  }
});

// Observer les changements DOM pour réappliquer les styles si nécessaire
const observer = new MutationObserver((mutations) => {
  let shouldReapply = false;
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.querySelector && (
            node.querySelector('.repos-summary-diff-container') ||
            node.classList.contains('repos-summary-diff-container')
          )) {
            shouldReapply = true;
          }
        }
      });
    }
  });
  
  if (shouldReapply) {
    setTimeout(() => {
      chrome.storage.sync.get(['azureDevOpsColors'], (result) => {
        if (result.azureDevOpsColors) {
          applyCustomColors(result.azureDevOpsColors);
        }
      });
    }, 100);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
