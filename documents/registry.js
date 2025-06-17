// Central document registry - loads all document content for searching
class DocumentRegistry {
    constructor() {
        this.documents = new Map();
        console.log('DocumentRegistry initialized');
    }    registerDocument(content) {
        if (!content || !content.id || !content.title) {
            console.error('Invalid document content passed to registry:', content);
            return;
        }
        this.documents.set(content.id, content);
        console.log(`Document registered: ${content.title}`);
    }    searchDocuments(searchTerm) {
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
}

// Create global instance
window.documentRegistry = new DocumentRegistry();

// Add a loaded event for other scripts to know when registry is ready
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded - Registry ready');
    // Dispatch a custom event to notify that registry is ready
    window.dispatchEvent(new CustomEvent('registryReady'));
});
