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
        }    } else { // Code for index.html, as docId will be null        // --- Modern live search logic ---
        const searchInput = document.getElementById('searchInput');
        const mainElement = document.querySelector('main');
        
        // Get the search results container which is now in the HTML
        const searchResultsContainer = document.getElementById('searchResultsContainer');
        
        // Initialize it
        if (searchResultsContainer) {
            searchResultsContainer.innerHTML = '';
            searchResultsContainer.style.display = 'none';
        } else {
            console.error("Search results container not found in the DOM");
        }

        // Hide/show all button grids
        function setButtonGridsVisible(visible) {
            const buttonGrids = mainElement.querySelectorAll('.button-grid');
            buttonGrids.forEach(grid => {
                grid.style.display = visible ? '' : 'none';
            });
        }        // Render search results as clickable cards/buttons - ONLY showing titles
        function renderSearchResults(results, searchTerm) {
            // Ensure we have the container
            const searchResultsContainer = document.getElementById('searchResultsContainer');
            if (!searchResultsContainer) {
                console.error("Search results container not found");
                return;
            }
            
            // Clear previous results
            searchResultsContainer.innerHTML = '';
            
            if (results.length === 0) {
                searchResultsContainer.style.display = 'block';
                searchResultsContainer.innerHTML = `<p style="text-align:center;font-size:1.1rem;color:#4a5568;font-family:Montserrat,sans-serif;">No results found for "${searchTerm}"</p>`;
                return;
            }
            
            // Title for results
            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `🔍 Search Results for "${searchTerm}" (${results.length} found)`;
            titleDiv.style.textAlign = 'center';
            titleDiv.style.marginBottom = '18px';
            titleDiv.style.fontSize = '1.15rem';
            titleDiv.style.fontWeight = '600';
            titleDiv.style.color = '#5a67d8';
            searchResultsContainer.appendChild(titleDiv);
            
            // Results grid
            const grid = document.createElement('div');
            grid.className = 'button-grid';
            
            results.forEach(res => {
                const doc = res.document;
                  // Build the link with ONLY the title (no description)
                const link = document.createElement('a');
                link.className = 'button';
                link.href = `viewer.html?id=${doc.id}&type=${doc.type}&title=${encodeURIComponent(doc.title)}`;
                
                // Create title element
                const titleElem = document.createElement('b');
                titleElem.textContent = doc.title;
                  // Create icon and append title only
                link.innerHTML = `${doc.type === 'presentation' ? '📊' : '📄'} `;
                link.appendChild(titleElem);
                
                // Force style to ensure only title shows (no description)
                link.style.height = 'auto';
                link.style.minHeight = '30px';
                
                grid.appendChild(link);
            });
            
            searchResultsContainer.appendChild(grid);
            searchResultsContainer.style.display = 'block';
            
            // Make sure it's visible - scroll to it if needed
            searchResultsContainer.scrollIntoView({behavior: 'smooth', block: 'nearest'});
        }

        // --- Live search event ---
        if (searchInput && mainElement) {
            searchInput.addEventListener('input', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm.length === 0) {
                    searchResultsContainer.style.display = 'none';
                    setButtonGridsVisible(true);
                    return;
                }                // Use registry for full-text search
                if (window.documentRegistry && typeof window.documentRegistry.searchDocuments === 'function') {
                    console.log(`Searching for: "${searchTerm}"`);
                    const results = window.documentRegistry.searchDocuments(searchTerm);
                    console.log(`Search returned ${results.length} results:`, results);
                    setButtonGridsVisible(false);
                    renderSearchResults(results, searchTerm);
                } else {
                    console.error('Document registry not found or searchDocuments method missing');
                }
            });
        }
    }
};