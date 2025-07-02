// Document content for When to Request Templates
const requestTemplatesContent = {
    id: '1p9aosWDa8VqobsdSQX6joNLiQ-f2FdCkSG-TgZb-p5Y',
    title: 'When to Request Templates',
    type: 'presentation',
    description: 'Guidelines for requesting new templates',
    tags: ['templates', 'requests', 'guidelines', 'workflow'],
    content: ``
};

// Export for use in main search
window.requestTemplatesContent = requestTemplatesContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(requestTemplatesContent, 'Navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(requestTemplatesContent, 'Navigation');
        }
    });
}
