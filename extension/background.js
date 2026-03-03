const API_URL = 'http://localhost:3002/fati/analyze';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    analyzeUrl(tab.url, tabId);
  }
});

async function analyzeUrl(url, tabId) {
  if (!url.startsWith('http')) return;

  try {
    const response = await fetch(`${API_URL}?url=${encodeURIComponent(url)}`);
    const result = await response.json();

    chrome.storage.local.set({ [tabId]: result });

    if (result.level === 'BLOCKED') {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL('warning.html') });
    }
  } catch (error) {
    console.error('FATI analysis error:', error);
  }
}
