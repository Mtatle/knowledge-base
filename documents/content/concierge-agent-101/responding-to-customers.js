// Document content for Responding To Customers
const respondingToCustomersContent = {
    id: '11T7I1iwLc7OejJWXnBqjBGemHdcP1KpgeeHBpBSKsoc',
    title: 'Responding To Customers',
    type: 'presentation',
    description: 'Guide to customer response best practices',
    tags: ['customer response', 'communication', 'service', 'engagement'],
    content: ``
};

window.respondingToCustomersContent = respondingToCustomersContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(respondingToCustomersContent, 'content', 'conciergeAgent101');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(respondingToCustomersContent, 'content', 'conciergeAgent101');
        }
    });
}

