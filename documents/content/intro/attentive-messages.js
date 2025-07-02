// Document content for Attentive Messages
const attentiveMessagesContent = {
    id: '1yTXSjLQ2u2BTnUYsG0XDyRJ8vx_mdegMXu521SW6XdM',
    title: 'Attentive Messages',
    type: 'presentation',
    description: 'Guide to attentive messaging',
    tags: ['attentive', 'messages', 'communication', 'customer service'],
    content: ``
};

window.attentiveMessagesContent = attentiveMessagesContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(attentiveMessagesContent, 'content', 'intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(attentiveMessagesContent, 'content', 'intro');
        }
    });
}

