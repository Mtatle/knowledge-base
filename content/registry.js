// Central document registry - loads all document content for searching
class DocumentRegistry {
    constructor() {
        this.documents = new Map();
        this.folders = new Map();
        console.log('DocumentRegistry initialized');
    }
    
    registerDocument(content, folder = null) {
        if (!content || !content.id || !content.title) {
            console.error('Invalid document content passed to registry:', content);
            return;
        }
        
        // Store document
        this.documents.set(content.id, content);
        
        // Add to folder if specified
        if (folder) {
            if (!this.folders.has(folder)) {
                this.folders.set(folder, []);
            }
            this.folders.get(folder).push(content.id);
        }
        
        console.log(`Document registered: ${content.title}`);
    }
    
    registerFolder(folderName, parentFolder = null) {
        if (!this.folders.has(folderName)) {
            this.folders.set(folderName, []);
        }
        
        // Track folder hierarchy
        if (parentFolder) {
            if (!this.folders.has(parentFolder)) {
                this.folders.set(parentFolder, []);
            }
            
            // Mark this as a subfolder
            if (!this.folders.get(parentFolder).includes(`folder:${folderName}`)) {
                this.folders.get(parentFolder).push(`folder:${folderName}`);
            }
        }
    }
    
    getFolderContents(folderName) {
        if (!this.folders.has(folderName)) {
            return [];
        }
        
        const contents = [];
        const folderItems = this.folders.get(folderName);
        
        for (const item of folderItems) {
            if (typeof item === 'string') {
                if (item.startsWith('folder:')) {
                    // This is a subfolder
                    const subfolderName = item.substring(7);
                    contents.push({
                        type: 'folder',
                        name: subfolderName
                    });
                } else {
                    // This is a document ID
                    const doc = this.documents.get(item);
                    if (doc) {
                        contents.push({
                            type: 'document',
                            document: doc
                        });
                    }
                }
            }
        }
        
        return contents;
    }
    
    searchDocuments(searchTerm) {
        console.log(`Registry searching for: "${searchTerm}"`);
        console.log(`Registry has ${this.documents.size} documents registered`);
        
        const results = [];
        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        if (!lowerSearchTerm) {
            return results;
        }

        this.documents.forEach((doc) => {
            let score = 0;
            let matchDetails = [];

            // Search in title (higher weight)
            if (doc.title && doc.title.toLowerCase().includes(lowerSearchTerm)) {
                score += 10;
                matchDetails.push(`Title: ${doc.title}`);
            }

            // Search in description
            if (doc.description && doc.description.toLowerCase().includes(lowerSearchTerm)) {
                score += 5;
                matchDetails.push(`Description: ${doc.description}`);
            }

            // Search in tags (medium weight)
            if (doc.tags && Array.isArray(doc.tags)) {
                doc.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(lowerSearchTerm)) {
                        score += 3;
                        matchDetails.push(`Tag: ${tag}`);
                    }
                });
            }

            // Search in content (lower weight but important)
            if (doc.content && typeof doc.content === 'string' && doc.content.toLowerCase().includes(lowerSearchTerm)) {
                score += 2;
                
                // Find excerpt around the match
                const contentLower = doc.content.toLowerCase();
                const matchIndex = contentLower.indexOf(lowerSearchTerm);
                if (matchIndex !== -1) {
                    const start = Math.max(0, matchIndex - 50);
                    const end = Math.min(doc.content.length, matchIndex + lowerSearchTerm.length + 50);
                    const excerpt = doc.content.substring(start, end);
                    matchDetails.push(`Content: ...${excerpt}...`);
                }
            }

            if (score > 0) {
                results.push({
                    document: doc,
                    score: score,
                    matches: matchDetails
                });
            }
        });

        // Sort by score (descending)
        return results.sort((a, b) => b.score - a.score);
    }

    getDocument(id) {
        return this.documents.get(id);
    }

    getAllDocuments() {
        return Array.from(this.documents.values());
    }
    
    getAllFolders() {
        return Array.from(this.folders.keys());
    }
}

// Create global instance
window.documentRegistry = new DocumentRegistry();

// Set up main category folders
window.documentRegistry.registerFolder('Admin');
window.documentRegistry.registerFolder('Content');

// Set up Content subfolders
window.documentRegistry.registerFolder('Navigation', 'Content');
window.documentRegistry.registerFolder('Message Quality', 'Content');
window.documentRegistry.registerFolder('Intro', 'Content');
window.documentRegistry.registerFolder('Event Quality', 'Content');
window.documentRegistry.registerFolder('Conversation Topics', 'Content');
window.documentRegistry.registerFolder('Concierge Agent 101', 'Content');
window.documentRegistry.registerFolder('Compliance', 'Content');

// Set up Conversation Topics subfolders
window.documentRegistry.registerFolder('Pre-Purchase', 'Conversation Topics');
window.documentRegistry.registerFolder('Post-Purchase', 'Conversation Topics');
window.documentRegistry.registerFolder('General', 'Conversation Topics');

// Add a loaded event for other scripts to know when registry is ready
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded - Registry ready');
    // Dispatch a custom event to notify that registry is ready
    window.dispatchEvent(new CustomEvent('registryReady'));
});
