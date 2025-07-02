// Document content for Missing/Lost Items
const missingLostItemsContent = {
    id: '1t5eJs6BWsC4I1t9z1P7n_BB1Idj4j4kQjPGo8JkuUpg',
    title: 'Missing/Lost Items',
    type: 'doc',
    description: 'Guide for handling missing or lost item cases',
    tags: ['missing items', 'lost items', 'customer service', 'resolution'],
    content: ``
};

window.missingLostItemsContent = missingLostItemsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(missingLostItemsContent, 'content', 'conversationTopics', 'postPurchase');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(missingLostItemsContent, 'content', 'conversationTopics', 'postPurchase');
        }
    });
}
