// Document content for Attentive Messages
const attentiveMessagesContent = {
    id: '1yTXSjLQ2u2BTnUYsG0XDyRJ8vx_mdegMXu521SW6XdM',
    title: 'Attentive Messages',
    type: 'presentation',
    description: 'Guide to creating attentive and responsive messaging',
    tags: ['attentive', 'messages', 'communication', 'responsiveness', 'engagement'],
    content: ``
};

// Export for use in main search
window.attentiveMessagesContent = attentiveMessagesContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(attentiveMessagesContent, 'Intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(attentiveMessagesContent, 'Intro');
        }
    });
}
