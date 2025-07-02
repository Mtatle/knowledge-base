// Document content for Shipping Options and Delivery
const shippingOptionsContent = {
    id: '1MkPhItX5zQC6xWitpRl49P2zol9z1SjbwPR8LADkLKk',
    title: 'Shipping Options and Delivery',
    type: 'presentation',
    description: 'Overview of shipping and delivery options',
    tags: ['shipping', 'delivery', 'logistics', 'transportation'],
    content: ``
};

window.shippingOptionsContent = shippingOptionsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(shippingOptionsContent, 'content', 'conversationTopics', 'general');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(shippingOptionsContent, 'content', 'conversationTopics', 'general');
        }
    });
}
