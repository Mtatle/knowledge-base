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
        if (document.title && titleElement) {
            document.title = docTitle;
            titleElement.textContent = docTitle;
        }
            
        // Set the source for the iframe
        if (iframeElement) {
            iframeElement.src = embedUrl;
        }
    } else { // Code for index.html, as docId will be null
        console.log("Setting up enhanced search functionality...");
        const searchInput = document.getElementById('searchInput');
        const mainElement = document.querySelector('main');

        if (searchInput && mainElement) {
            console.log("Search elements found, adding event listener...");
            
            // Create no results message
            let noResultsMessage = document.getElementById('noResultsMessage');
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'noResultsMessage';
                noResultsMessage.style.textAlign = 'center';
                noResultsMessage.style.marginTop = '20px';
                noResultsMessage.style.fontSize = '1.1rem';
                noResultsMessage.style.color = '#4a5568';
                noResultsMessage.style.fontFamily = 'Montserrat, sans-serif';
                mainElement.insertBefore(noResultsMessage, mainElement.firstChild);
            }
            noResultsMessage.style.display = 'none';

            // Create enhanced search results container
            let searchResultsContainer = document.getElementById('searchResultsContainer');
            if (!searchResultsContainer) {
                searchResultsContainer = document.createElement('div');
                searchResultsContainer.id = 'searchResultsContainer';
                searchResultsContainer.style.marginTop = '20px';
                mainElement.insertBefore(searchResultsContainer, mainElement.firstChild);
            }
            searchResultsContainer.style.display = 'none';

            searchInput.addEventListener('input', function() {
                console.log("Search input changed:", searchInput.value);
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                // Clear previous search results
                searchResultsContainer.innerHTML = '';
                searchResultsContainer.style.display = 'none';

                if (searchTerm === '') {
                    // Show all buttons and sections
                    showAllContent(mainElement);
                    noResultsMessage.style.display = 'none';
                    return;
                }

                let overallResultsFound = false;

                // First, try enhanced search with document registry
                if (window.documentRegistry) {
                    const searchResults = window.documentRegistry.searchDocuments(searchTerm);
                    console.log("Enhanced search results:", searchResults);
                    
                    if (searchResults.length > 0) {
                        overallResultsFound = true;
                        displayEnhancedSearchResults(searchResults, searchResultsContainer, searchTerm);
                        hideAllContent(mainElement);
                    }
                }

                // Fallback to basic title search if no enhanced results
                if (!overallResultsFound) {
                    overallResultsFound = performBasicSearch(mainElement, searchTerm);
                }

                // Show/hide no results message
                if (!overallResultsFound) {
                    noResultsMessage.innerHTML = `
                        <div style="padding: 20px; text-align: center;">
                            <p style="font-size: 1.2rem; color: #4a5568; margin-bottom: 10px;">
                                No articles found matching "<strong>${searchInput.value}</strong>"
                            </p>
                            <p style="font-size: 0.9rem; color: #718096;">
                                Try searching for terms like "discount", "sizing", "template", or "escalation"
                            </p>
                        </div>
                    `;
                    noResultsMessage.style.display = 'block';
                } else {
                    noResultsMessage.style.display = 'none';
                }
            });
        } else {
            console.log("Search elements not found!");
        }

        // Helper functions
        function showAllContent(mainElement) {
            const buttonGrids = mainElement.querySelectorAll('.button-grid');
            buttonGrids.forEach(grid => {
                const buttonsInGrid = grid.querySelectorAll('.button');
                buttonsInGrid.forEach(button => {
                    button.style.display = 'flex';
                });
                
                const sectionTitle = grid.previousElementSibling;
                if (sectionTitle && sectionTitle.tagName === 'H2') {
                    sectionTitle.style.display = 'block';
                }
                grid.style.display = 'grid';
            });
        }

        function hideAllContent(mainElement) {
            const buttonGrids = mainElement.querySelectorAll('.button-grid');
            buttonGrids.forEach(grid => {
                const sectionTitle = grid.previousElementSibling;
                if (sectionTitle && sectionTitle.tagName === 'H2') {
                    sectionTitle.style.display = 'none';
                }
                grid.style.display = 'none';
            });
        }

        function performBasicSearch(mainElement, searchTerm) {
            let resultsFound = false;
            const buttonGrids = mainElement.querySelectorAll('.button-grid');

            buttonGrids.forEach(grid => {
                let resultsInThisGrid = false;
                const buttonsInGrid = grid.querySelectorAll('.button');
                
                buttonsInGrid.forEach(button => {
                    const buttonText = button.textContent.toLowerCase();
                    
                    if (buttonText.includes(searchTerm)) {
                        button.style.display = 'flex';
                        resultsInThisGrid = true;
                        resultsFound = true;
                    } else {
                        button.style.display = 'none';
                    }
                });

                const sectionTitle = grid.previousElementSibling;
                if (resultsInThisGrid) {
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

            return resultsFound;
        }

        function displayEnhancedSearchResults(searchResults, container, searchTerm) {
            container.style.display = 'block';
            
            const resultsHeader = document.createElement('div');
            resultsHeader.innerHTML = `
                <h3 style="color: #2d3748; font-size: 1.3rem; margin-bottom: 15px; font-family: 'Montserrat', sans-serif;">
                    🔍 Search Results for "${searchTerm}" (${searchResults.length} found)
                </h3>
            `;
            container.appendChild(resultsHeader);

            const resultsGrid = document.createElement('div');
            resultsGrid.className = 'button-grid';
            resultsGrid.style.marginTop = '15px';

            searchResults.forEach(result => {
                const doc = result.document;
                const resultButton = document.createElement('a');
                resultButton.href = `viewer.html?id=${doc.id}&type=${doc.type}&title=${encodeURIComponent(doc.title)}`;
                resultButton.className = 'button search-result-button';
                
                // Highlight the search term in title
                const highlightedTitle = highlightSearchTerm(doc.title, searchTerm);
                const typeIcon = doc.type === 'doc' ? '📄' : '📊';
                
                // Show match details
                const matchInfo = result.matches.slice(0, 2).join(' • ');
                
                resultButton.innerHTML = `
                    <div style="width: 100%;">
                        <div style="font-size: 1.1rem; margin-bottom: 5px;">
                            ${typeIcon} ${highlightedTitle}
                        </div>
                        <div style="font-size: 0.8rem; color: #718096; line-height: 1.3;">
                            ${matchInfo}
                        </div>
                        <div style="font-size: 0.7rem; color: #a0aec0; margin-top: 5px;">
                            Score: ${result.score} | ${doc.type === 'doc' ? 'Document' : 'Presentation'}
                        </div>
                    </div>
                `;
                
                resultsGrid.appendChild(resultButton);
            });

            container.appendChild(resultsGrid);
        }

        function highlightSearchTerm(text, searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<mark style="background-color: #ffd700; padding: 1px 2px; border-radius: 2px;">$1</mark>');
        }
    }
};
