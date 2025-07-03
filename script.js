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
        // --- Sidebar Navigation Logic ---
        const burgerMenu = document.querySelector('.burger-menu');
        const sidebar = document.querySelector('.sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        const container = document.querySelector('.container');
        const sidebarMenuItems = document.querySelectorAll('.sidebar-menu-item');
        const quickLinks = document.querySelectorAll('.quick-link');
        
        // Toggle sidebar when burger menu is clicked
        if (burgerMenu) {
            burgerMenu.addEventListener('click', toggleSidebar);
        }
        
        // Close sidebar when clicking outside (on overlay)
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', toggleSidebar);
        }
        
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            container.classList.toggle('sidebar-active');
        }
        
        // Toggle submenu when sidebar menu item is clicked
        sidebarMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                const submenu = this.querySelector('.sidebar-submenu');
                if (submenu) {
                    submenu.classList.toggle('active');
                }
                
                // Handle category navigation
                const category = this.getAttribute('data-category');
                if (category) {
                    scrollToCategory(category);
                }
            });
        });
        
        // Handle submenu item clicks
        document.querySelectorAll('.sidebar-submenu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                // Toggle file list or subfolder list visibility
                const fileList = this.querySelector('.sidebar-file-list');
                const subfolderList = this.querySelector('.sidebar-subfolder-list');
                if (fileList && !subfolderList) {
                    fileList.style.display = fileList.style.display === 'none' ? 'block' : 'none';
                }
                if (subfolderList) {
                    subfolderList.style.display = subfolderList.style.display === 'none' ? 'block' : 'none';
                }
            });
        });

        // Handle subfolder item clicks
        document.querySelectorAll('.sidebar-subfolder-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const fileList = this.querySelector('.sidebar-file-list');
                if (fileList) {
                    fileList.style.display = fileList.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
        
        // Handle quick links
        quickLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const documentId = this.getAttribute('data-document');
                if (documentId === 'agent-scorecard') {
                    // Navigate to Agent Scorecard document
                    openDocument('agent-behavior', 'Admin', 'System');
                } else if (documentId === 'qa-results') {
                    // Navigate to QA Results document
                    openDocument('qa-approach', 'Content', 'Message Quality');
                }
            });
        });
        
        function scrollToCategory(category) {
            const categoryElement = document.querySelector(`h2 i.fas.fa-${category === 'admin' ? 'shield-alt' : 'book'}`).parentNode;
            if (categoryElement) {
                categoryElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        function scrollToFolder(folderName) {
            const folderHeaders = document.querySelectorAll('.folder-header');
            let folderHeader = null;
            
            folderHeaders.forEach(header => {
                if (header.textContent.trim().toLowerCase().includes(folderName.toLowerCase())) {
                    folderHeader = header;
                }
            });
            
            if (folderHeader) {
                folderHeader.scrollIntoView({ behavior: 'smooth' });
                // Expand folder if it's collapsed
                const folderContent = folderHeader.nextElementSibling;
                if (folderContent && folderContent.style.display === 'none') {
                    toggleFolder(folderHeader);
                }
            }
        }
        
        function openDocument(docName, category, folder) {
            // First find and click on the category
            const categoryItem = document.querySelector(`.sidebar-menu-item[data-category="${category.toLowerCase()}"]`);
            if (categoryItem) {
                categoryItem.click();
                
                // Then find and click on the folder
                const folderItem = document.querySelector(`.sidebar-submenu-item[data-folder="${folder.toLowerCase()}"]`);
                if (folderItem) {
                    folderItem.click();
                    
                    // Finally find and click on the document link
                    setTimeout(() => {
                        const docLinks = document.querySelectorAll('.file');
                        docLinks.forEach(link => {
                            if (link.textContent.trim().toLowerCase().includes(docName.toLowerCase())) {
                                link.click();
                            }
                        });
                    }, 500); // Give time for folder to expand
                }
            }
        }
        
        // --- Modern live search logic ---
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

        // Hide/show all folder containers and folders
        function setContentVisible(visible) {
            const folderContainers = mainElement.querySelectorAll('.folder-container');
            const categoryHeaders = mainElement.querySelectorAll('h2');
            
            folderContainers.forEach(container => {
                container.style.display = visible ? 'block' : 'none';
            });
            
            categoryHeaders.forEach(header => {
                header.style.display = visible ? 'block' : 'none';
            });
        }        
        
        // Quick links functionality
        document.querySelectorAll('.quick-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const documentId = this.getAttribute('data-document');
                
                // Handle specific quick links
                if (documentId === 'agent-scorecard') {
                    window.location.href = 'viewer.html?id=agent-behavior&type=doc&title=Agent%20Scorecard';
                } else if (documentId === 'qa-results') {
                    window.location.href = 'viewer.html?id=qa-approach&type=doc&title=QA%20Results';
                }
            });
        });
    }

    // --- Main content subfolder toggle logic ---
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.subfolder-header').forEach(header => {
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                // Only one subfolder open at a time
                const parent = header.parentElement.parentElement;
                parent.querySelectorAll('.subfolder .folder-content').forEach(content => {
                    if (content !== header.nextElementSibling) {
                        content.classList.remove('active');
                        content.style.display = 'none';
                    }
                });
                header.classList.toggle('active');
                const content = header.nextElementSibling;
                content.classList.toggle('active');
                if (content.classList.contains('active')) {
                    content.style.display = 'block';
                } else {
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- Burger menu movement logic ---
    window.addEventListener('DOMContentLoaded', function() {
        const burgerMenu = document.querySelector('.burger-menu');
        const sidebar = document.querySelector('.sidebar');
        if (burgerMenu && sidebar) {
            function updateBurgerPosition() {
                if (sidebar.classList.contains('active')) {
                    burgerMenu.style.left = '320px';
                } else {
                    burgerMenu.style.left = '20px';
                }
            }
            // Initial position
            updateBurgerPosition();
            // Listen for sidebar toggle
            const observer = new MutationObserver(updateBurgerPosition);
            observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
        }
    });
};