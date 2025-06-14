window.onload = function() {
    // Get parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('id');
    const docType = urlParams.get('type');
    const docTitle = urlParams.get('title');

    let embedUrl = '';

    // Set the correct embed URL based on the type
    if (docType === 'doc') {
        embedUrl = `https://docs.google.com/document/d/${docId}/preview`;
    } else if (docType === 'presentation') {
        embedUrl = `https://docs.google.com/presentation/d/${docId}/embed?start=false&loop=false&delayms=3000`;
    }

    // Update the page with the correct title and iframe source
    if (docId) {
        const titleElement = document.getElementById('document-title');
        const iframeElement = document.getElementById('doc-iframe');

        // Set the document title in the header and the browser tab
        document.title = docTitle;
        titleElement.textContent = docTitle;
        
        // Set the source for the iframe
        iframeElement.src = embedUrl;
    }
};