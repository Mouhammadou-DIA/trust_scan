function extractPageContent() {
  const links = Array.from(document.querySelectorAll('a')).map(a => ({
    href: a.href,
    text: a.textContent.trim(),
    visible: a.offsetParent !== null
  }));

  const forms = Array.from(document.querySelectorAll('form')).map(f => ({
    action: f.action,
    method: f.method
  }));

  const text = document.body.innerText;

  return { links, forms, text };
}

chrome.runtime.sendMessage({ 
  type: 'PAGE_CONTENT', 
  data: extractPageContent() 
});
