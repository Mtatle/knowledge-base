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
        // --- Modern live search logic ---
        const searchInput = document.getElementById('searchInput');
        const mainElement = document.querySelector('main');

        // Create a container for dynamic search results
        let searchResultsContainer = document.getElementById('searchResultsContainer');
        if (!searchResultsContainer) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.id = 'searchResultsContainer';
            searchResultsContainer.style.marginTop = '30px';
            mainElement.insertBefore(searchResultsContainer, mainElement.firstChild);
        }
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.style.display = 'none';

        // Hide/show all button grids
        function setButtonGridsVisible(visible) {
            const buttonGrids = mainElement.querySelectorAll('.button-grid');
            buttonGrids.forEach(grid => {
                grid.style.display = visible ? '' : 'none';
            });
        }

        // Render search results as clickable cards/buttons
        function renderSearchResults(results, searchTerm) {
            searchResultsContainer.innerHTML = '';
            if (results.length === 0) {
                searchResultsContainer.style.display = 'block';
                searchResultsContainer.innerHTML = `<p style="text-align:center;font-size:1.1rem;color:#4a5568;font-family:Montserrat,sans-serif;">No results found for "${searchTerm}"</p>`;
                return;
            }
            // Title for results
            searchResultsContainer.innerHTML = `<div style="text-align:center;margin-bottom:18px;font-size:1.15rem;font-weight:600;color:#5a67d8;font-family:Montserrat,sans-serif;">🔍 Search Results for "${searchTerm}" (${results.length} found)</div>`;
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
            searchResultsContainer.appendChild(grid);
            searchResultsContainer.style.display = 'block';
        }

        // --- Live search event ---
        if (searchInput && mainElement) {
            searchInput.addEventListener('input', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm.length === 0) {
                    searchResultsContainer.style.display = 'none';
                    setButtonGridsVisible(true);
                    return;
                }
                // Use registry for full-text search
                if (window.documentRegistry && typeof window.documentRegistry.searchDocuments === 'function') {
                    const results = window.documentRegistry.searchDocuments(searchTerm);
                    setButtonGridsVisible(false);
                    renderSearchResults(results, searchTerm);
                }
            });
        }
    }
};