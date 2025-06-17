// Central document registry - loads all document content for searching
class DocumentRegistry {
    constructor() {
        this.documents = new Map();
        this.loadDocuments();
    }

    loadDocuments() {
        // This will be populated when individual document files are loaded
        this.documents = new Map();
    }

    registerDocument(content) {
        this.documents.set(content.id, content);
    }

    searchDocuments(searchTerm) {
        const results = [];
        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        if (!lowerSearchTerm) {
            return results;
        }

        this.documents.forEach((doc) => {
            let score = 0;
            let matchDetails = [];

            // Search in title (higher weight)
            if (doc.title.toLowerCase().includes(lowerSearchTerm)) {
                score += 10;
                matchDetails.push(`Title: ${doc.title}`);
            }

            // Search in description
            if (doc.description && doc.description.toLowerCase().includes(lowerSearchTerm)) {
                score += 5;
                matchDetails.push(`Description: ${doc.description}`);
            }

            // Search in tags (medium weight)
            if (doc.tags) {
                doc.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(lowerSearchTerm)) {
                        score += 3;
                        matchDetails.push(`Tag: ${tag}`);
                    }
                });
            }

            // Search in content (lower weight but important)
            if (doc.content && doc.content.toLowerCase().includes(lowerSearchTerm)) {
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
