// Document content for Concierge Through The Lens of Subscribers
const conciergeLensContent = {
    id: '1celRsgKBZwr4rqRKEe72Z_qVRDFxWYt729W3nzO8y8c',
    title: 'Concierge Through The Lens of Subscribers',
    type: 'presentation',
    description: 'Understanding concierge service from the subscriber perspective',
    tags: ['concierge', 'subscribers', 'perspective', 'service', 'experience'],
    content: ``
};

// Export for use in main search
window.conciergeLensContent = conciergeLensContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(conciergeLensContent, 'Intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(conciergeLensContent, 'Intro');
        }
    });
}
