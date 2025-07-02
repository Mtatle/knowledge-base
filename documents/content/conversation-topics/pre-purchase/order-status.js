// Document content for Order Status Inquiry and Resolution Guide
const orderStatusContent = {
    id: '1_6FReKGa18LL7pZjgLcdzNQ99Se-oAMrcpz3Cy88YA0',
    title: 'Order Status Inquiry and Resolution Guide',
    type: 'doc',
    description: 'Guide for handling order status inquiries',
    tags: ['order status', 'inquiry', 'resolution', 'customer service'],
    content: ``
};

window.orderStatusContent = orderStatusContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(orderStatusContent, 'content', 'conversationTopics', 'prePurchase');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(orderStatusContent, 'content', 'conversationTopics', 'prePurchase');
        }
    });
}
