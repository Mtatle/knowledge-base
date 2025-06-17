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
                mainElement.insertBefore(searchResultsContainer, mainElement.firstChild);            }
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
                        searchResultsContainer.style.display = 'block';
                    }
                }

                // If no enhanced results, try basic search
                if (!overallResultsFound) {
                    console.log("No enhanced results, trying basic search...");
                    overallResultsFound = performBasicSearch(mainElement, searchTerm);
                    searchResultsContainer.style.display = 'none';
                }

                // Show/hide no results message
                if (!overallResultsFound) {
                    noResultsMessage.textContent = `No results found for "${searchTerm}"`;
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

        function displayEnhancedSearchResults(results, container, searchTerm) {
            container.innerHTML = '';
            if (results.length === 0) {
                container.style.display = 'block';
                container.innerHTML = `<p style="text-align:center;font-size:1.1rem;color:#4a5568;font-family:Montserrat,sans-serif;">No results found for "${searchTerm}"</p>`;
                return;
            }
            // Title for results
            container.innerHTML = `<div style="text-align:center;margin-bottom:18px;font-size:1.15rem;font-weight:600;color:#5a67d8;font-family:Montserrat,sans-serif;">🔍 Search Results for "${searchTerm}" (${results.length} found)</div>`;
            // Results grid
            const grid = document.createElement('div');
            grid.className = 'button-grid';
            results.forEach(res => {
                const doc = res.document;
                // Build the link
                const link = document.createElement('a');
                link.className = 'button';
                link.href = `viewer.html?id=${doc.id}&type=${doc.type}&title=${encodeURIComponent(doc.title)}`;
                link.style.display = 'block';
                link.style.marginBottom = '18px';
                link.innerHTML = `${doc.type === 'presentation' ? '📊' : '📄'} <b>${doc.title}</b><br><span style='font-size:0.98em;color:#6b7280;font-weight:400;'>${doc.description || ''}</span>`;
                // Optionally, show excerpt with highlight
                if (res.matches && res.matches.length > 0) {
                    const excerpt = res.matches.find(m => m.startsWith('Content:'));
                    if (excerpt) {
                        // Highlight search term
                        const safeExcerpt = excerpt.replace(/Content: /, '').replace(new RegExp(searchTerm, 'gi'), match => `<mark style='background:#f6e05e;color:#2d3748;border-radius:3px;'>${match}</mark>`);
                        const excerptDiv = document.createElement('div');
                        excerptDiv.style.fontSize = '0.95em';
                        excerptDiv.style.color = '#7b8494';
                        excerptDiv.style.marginTop = '6px';
                        excerptDiv.innerHTML = safeExcerpt;
                        link.appendChild(excerptDiv);
                    }
                }
                grid.appendChild(link);
            });
            container.appendChild(grid);
            container.style.display = 'block';
        }
    }
};
