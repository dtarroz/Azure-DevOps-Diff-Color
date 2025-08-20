// JavaScript pour le popup de configuration
document.addEventListener('DOMContentLoaded', () => {
  const addedLineBgColor = document.getElementById('addedLineBgColor');
  const addedLineTextColor = document.getElementById('addedLineTextColor');
  const addedBgColor = document.getElementById('addedBgColor');
  const addedTextColor = document.getElementById('addedTextColor');
  const removedLineBgColor = document.getElementById('removedLineBgColor');
  const removedLineTextColor = document.getElementById('removedLineTextColor');
  const removedBgColor = document.getElementById('removedBgColor');
  const removedTextColor = document.getElementById('removedTextColor');
  const previewAddedLine = document.getElementById('previewAddedLine');
  const previewAdded = document.getElementById('previewAdded');
  const previewRemovedLine = document.getElementById('previewRemovedLine');
  const previewRemoved = document.getElementById('previewRemoved');
  const saveBtn = document.getElementById('saveBtn');
  const resetBtn = document.getElementById('resetBtn');
  const status = document.getElementById('status');

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

  // Charger les couleurs sauvegardées
  function loadColors() {
    chrome.storage.sync.get(['azureDevOpsColors'], (result) => {
      const colors = result.azureDevOpsColors || defaultColors;
      
      addedLineBgColor.value = colors.addedLineBg;
      addedLineTextColor.value = colors.addedLineText;
      addedBgColor.value = colors.addedBg;
      addedTextColor.value = colors.addedText;
      removedLineBgColor.value = colors.removedLineBg;
      removedLineTextColor.value = colors.removedLineText;
      removedBgColor.value = colors.removedBg;
      removedTextColor.value = colors.removedText;
      
      updatePreview();
    });
  }

  // Mettre à jour l'aperçu
  function updatePreview() {
    previewAddedLine.style.backgroundColor = addedLineBgColor.value;
    previewAddedLine.style.color = addedLineTextColor.value;
    previewAdded.style.backgroundColor = addedBgColor.value;
    previewAdded.style.color = addedTextColor.value;
    previewRemovedLine.style.backgroundColor = removedLineBgColor.value;
    previewRemovedLine.style.color = removedLineTextColor.value;
    previewRemoved.style.backgroundColor = removedBgColor.value;
    previewRemoved.style.color = removedTextColor.value;
  }

  // Sauvegarder les couleurs
  function saveColors() {
    const colors = {
      addedLineBg: addedLineBgColor.value,
      addedLineText: addedLineTextColor.value,
      addedBg: addedBgColor.value,
      addedText: addedTextColor.value,
      removedLineBg: removedLineBgColor.value,
      removedLineText: removedLineTextColor.value,
      removedBg: removedBgColor.value,
      removedText: removedTextColor.value
    };

    chrome.storage.sync.set({ azureDevOpsColors: colors }, () => {
      showStatus('Couleurs sauvegardées !', 'success');
      
      // Mettre à jour les onglets Azure DevOps ouverts
      chrome.tabs.query({ url: 'http://vmproddevops:8080/*' }, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.reload(tab.id);
        });
      });
    });
  }

  // Réinitialiser aux couleurs par défaut
  function resetColors() {
    addedLineBgColor.value = defaultColors.addedLineBg;
    addedLineTextColor.value = defaultColors.addedLineText;
    addedBgColor.value = defaultColors.addedBg;
    addedTextColor.value = defaultColors.addedText;
    removedLineBgColor.value = defaultColors.removedLineBg;
    removedLineTextColor.value = defaultColors.removedLineText;
    removedBgColor.value = defaultColors.removedBg;
    removedTextColor.value = defaultColors.removedText;
    
    updatePreview();
    showStatus('Couleurs réinitialisées', 'success');
  }

  // Afficher un message de statut
  function showStatus(message, type) {
    status.textContent = message;
    status.className = `status ${type}`;
    
    setTimeout(() => {
      status.textContent = '';
      status.className = 'status';
    }, 2000);
  }

  // Event listeners
  addedLineBgColor.addEventListener('input', updatePreview);
  addedLineTextColor.addEventListener('input', updatePreview);
  addedBgColor.addEventListener('input', updatePreview);
  addedTextColor.addEventListener('input', updatePreview);
  removedLineBgColor.addEventListener('input', updatePreview);
  removedLineTextColor.addEventListener('input', updatePreview);
  removedBgColor.addEventListener('input', updatePreview);
  removedTextColor.addEventListener('input', updatePreview);
  
  saveBtn.addEventListener('click', saveColors);
  resetBtn.addEventListener('click', resetColors);

  // Charger les couleurs au démarrage
  loadColors();
});
