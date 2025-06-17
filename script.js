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
    if (docId) { // This block is for viewer.html
        const titleElement = document.getElementById('document-title');
        const iframeElement = document.getElementById('doc-iframe');

        // Set the document title in the header and the browser tab
        if (document.title && titleElement) { // Check if titleElement is not null
            document.title = docTitle;
            titleElement.textContent = docTitle;
        }
            
        // Set the source for the iframe
        if (iframeElement) { // Check if iframeElement is not null
            iframeElement.src = embedUrl;
        }    } else { // Code for index.html, as docId will be null
        console.log("Setting up search functionality...");
        const searchInput = document.getElementById('searchInput');
        const mainElement = document.querySelector('main');

        if (searchInput && mainElement) {
            console.log("Search elements found, adding event listener...");
            
            // Create no results message
            let noResultsMessage = document.getElementById('noResultsMessage');
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('p');
                noResultsMessage.id = 'noResultsMessage';
                noResultsMessage.style.textAlign = 'center';
                noResultsMessage.style.marginTop = '20px';
                noResultsMessage.style.fontSize = '1.1rem';
                noResultsMessage.style.color = '#4a5568';
                noResultsMessage.style.fontFamily = 'Montserrat, sans-serif';
                mainElement.insertBefore(noResultsMessage, mainElement.firstChild);
            }
            noResultsMessage.style.display = 'none';

            searchInput.addEventListener('input', function() {
                console.log("Search input changed:", searchInput.value);
                const searchTerm = searchInput.value.toLowerCase().trim();
                let overallResultsFound = false;

                const buttonGrids = mainElement.querySelectorAll('.button-grid');
                console.log("Found", buttonGrids.length, "button grids");

                buttonGrids.forEach(grid => {
                    let resultsInThisGrid = false;
                    const buttonsInGrid = grid.querySelectorAll('.button');
                      buttonsInGrid.forEach(button => {
                        const buttonText = button.textContent.toLowerCase();
                        
                        // Extract document ID from the button's href
                        const href = button.getAttribute('href');
                        const docIdMatch = href.match(/id=([^&]+)/);
                        const docId = docIdMatch ? docIdMatch[1] : null;
                        
                        // Search in both button text and document content
                        let isMatch = false;
                        
                        // Search in button text
                        if (buttonText.includes(searchTerm)) {
                            isMatch = true;
                        }
                        
                        // Search in document content if available
                        if (!isMatch && docId && documentContent[docId]) {
                            const doc = documentContent[docId];
                            const searchableText = (doc.title + ' ' + doc.content + ' ' + doc.keywords.join(' ')).toLowerCase();
                            if (searchableText.includes(searchTerm)) {
                                isMatch = true;
                            }
                        }
                        
                        console.log("Checking button:", buttonText, "Document ID:", docId, "Match:", isMatch);
                        
                        if (searchTerm === '' || isMatch) {
                            button.style.display = 'flex';
                            resultsInThisGrid = true;
                            overallResultsFound = true;
                        } else {
                            button.style.display = 'none';
                        }
                    });

                    // Show/hide section titles and grids
                    const sectionTitle = grid.previousElementSibling;
                    if (resultsInThisGrid || searchTerm === '') {
                        if (sectionTitle && sectionTitle.tagName === 'H2') {
                            sectionTitle.style.display = 'block';
                        }
                        grid.style.display = 'grid';
                    } else {
                        if (sectionTitle && sectionTitle.tagName === 'H2') {
                            sectionTitle.style.display = 'none';
                        }
                        grid.style.display = 'none';
                    }
                });

                // Show/hide no results message
                if (searchTerm !== '' && !overallResultsFound) {                    noResultsMessage.textContent = `No articles found matching "${searchInput.value}"`;
                    noResultsMessage.style.display = 'block';
                } else {
                    noResultsMessage.style.display = 'none';
                }
            });
        } else {
            console.log("Search elements not found!");
        }
    }
};