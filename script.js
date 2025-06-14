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
        }
    } else { // Code for index.html, as docId will be null
        const searchInput = document.getElementById('searchInput');
        const mainElement = document.querySelector('main');

        if (searchInput && mainElement) {
            let noResultsMessage = document.getElementById('noResultsMessage');
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('p');
                noResultsMessage.id = 'noResultsMessage';
                noResultsMessage.style.textAlign = 'center';
                noResultsMessage.style.marginTop = '20px';
                noResultsMessage.style.fontSize = '1.1rem';
                noResultsMessage.style.color = '#4a5568'; // Using a color from your existing palette
                // Insert the message at the beginning of the main content area
                mainElement.insertBefore(noResultsMessage, mainElement.firstChild);
            }
            noResultsMessage.style.display = 'none'; // Ensure it's hidden initially

            searchInput.addEventListener('input', function() {
                const searchTerm = searchInput.value.toLowerCase().trim();
                let overallResultsFound = false;

                const buttonGrids = mainElement.querySelectorAll('.button-grid');

                buttonGrids.forEach(grid => {
                    let resultsInThisGrid = false;
                    const buttonsInGrid = grid.querySelectorAll('.button');
                    
                    buttonsInGrid.forEach(button => {
                        const buttonText = button.textContent.toLowerCase();
                        if (searchTerm === '' || buttonText.includes(searchTerm)) {
                            button.style.display = 'flex'; // Reapply display:flex from CSS
                            if (searchTerm !== '' && buttonText.includes(searchTerm)) {
                                resultsInThisGrid = true;
                                overallResultsFound = true;
                            } else if (searchTerm === '') {
                                resultsInThisGrid = true; // Consider empty search as "results" for section visibility
                                overallResultsFound = true; // Ensure no "no results" message for empty search
                            }
                        } else {
                            button.style.display = 'none';
                        }
                    });

                    const sectionTitle = grid.previousElementSibling;
                    if (resultsInThisGrid || searchTerm === '') {
                        if (sectionTitle && sectionTitle.tagName === 'H2') {
                            sectionTitle.style.display = ''; // Revert to default/CSS display
                        }
                        grid.style.display = 'grid'; // Reapply display:grid from CSS
                    } else {
                        if (sectionTitle && sectionTitle.tagName === 'H2') {
                            sectionTitle.style.display = 'none';
                        }
                        grid.style.display = 'none';
                    }
                });

                if (searchTerm !== '' && !overallResultsFound) {
                    noResultsMessage.textContent = `No articles found matching "${searchInput.value}"`;
                    noResultsMessage.style.display = ''; // Show message
                } else {
                    noResultsMessage.style.display = 'none'; // Hide message
                }
            });
        }
    }
};