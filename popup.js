// JavaScript pour le popup de configuration
document.addEventListener('DOMContentLoaded', () => {
  const addedBgColor = document.getElementById('addedBgColor');
  const addedTextColor = document.getElementById('addedTextColor');
  const removedBgColor = document.getElementById('removedBgColor');
  const removedTextColor = document.getElementById('removedTextColor');
  const previewAdded = document.getElementById('previewAdded');
  const previewRemoved = document.getElementById('previewRemoved');
  const saveBtn = document.getElementById('saveBtn');
  const resetBtn = document.getElementById('resetBtn');
  const status = document.getElementById('status');

  // Couleurs par défaut
  const defaultColors = {
    addedBg: '#efbdef',
    addedText: '#000000',
    removedBg: '#ff5c5c',
    removedText: '#000000'
  };

  // Charger les couleurs sauvegardées
  function loadColors() {
    chrome.storage.sync.get(['azureDevOpsColors'], (result) => {
      const colors = result.azureDevOpsColors || defaultColors;
      
      addedBgColor.value = colors.addedBg;
      addedTextColor.value = colors.addedText;
      removedBgColor.value = colors.removedBg;
      removedTextColor.value = colors.removedText;
      
      updatePreview();
    });
  }

  // Mettre à jour l'aperçu
  function updatePreview() {
    previewAdded.style.backgroundColor = addedBgColor.value;
    previewAdded.style.color = addedTextColor.value;
    previewRemoved.style.backgroundColor = removedBgColor.value;
    previewRemoved.style.color = removedTextColor.value;
  }

  // Sauvegarder les couleurs
  function saveColors() {
    const colors = {
      addedBg: addedBgColor.value,
      addedText: addedTextColor.value,
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
    addedBgColor.value = defaultColors.addedBg;
    addedTextColor.value = defaultColors.addedText;
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
  addedBgColor.addEventListener('input', updatePreview);
  addedTextColor.addEventListener('input', updatePreview);
  removedBgColor.addEventListener('input', updatePreview);
  removedTextColor.addEventListener('input', updatePreview);
  
  saveBtn.addEventListener('click', saveColors);
  resetBtn.addEventListener('click', resetColors);

  // Charger les couleurs au démarrage
  loadColors();
});
