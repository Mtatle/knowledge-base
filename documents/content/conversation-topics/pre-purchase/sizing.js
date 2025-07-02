// Document content for Sizing
const sizingContent = {
    id: '1sWF5HFRu8rpk1kk9UXwsWzeb-p2zEzJUU-nBqx9j8Ko',
    title: 'Sizing',
    type: 'presentation',
    description: 'Guide to sizing information',
    tags: ['sizing', 'fit', 'measurements', 'guide'],
    content: ``
};

window.sizingContent = sizingContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(sizingContent, 'content', 'conversationTopics', 'prePurchase');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(sizingContent, 'content', 'conversationTopics', 'prePurchase');
        }
    });
}
