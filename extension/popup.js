chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tabId = tabs[0].id;
  
  chrome.storage.local.get([tabId.toString()], (result) => {
    const data = result[tabId];
    
    if (!data) {
      document.getElementById('result').innerHTML = '<p>Aucune analyse disponible</p>';
      return;
    }

    const flags = data.details?.urlAnalysis?.flags || [];
    const flagsHtml = flags.map(f => `<div class="flag">${f}</div>`).join('');

    document.getElementById('result').innerHTML = `
      <div class="score ${data.level}">${data.score}</div>
      <h3>${data.level}</h3>
      <div class="details">
        <p><strong>URL:</strong> ${data.url}</p>
        <p><strong>Backlinks:</strong> ${data.details.backlinks?.totalBacklinks || 0}</p>
        <p><strong>Liens internes:</strong> ${data.details.internalLinks?.internalLinksCount || 0}</p>
        ${flagsHtml}
      </div>
    `;
  });
});
