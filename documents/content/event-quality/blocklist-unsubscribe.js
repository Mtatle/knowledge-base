// Document content for When to Blocklist, When to Unsubscribe, Closing a Conversation & Joumeys
const blocklist_unsubscribe_content = {
    id: '1rARWcKeZKqv-h_y-uiYrUDyhhtf0Iy8SnqLr_audy_U',
    title: 'When to Blocklist, When to Unsubscribe, Closing a Conversation & Journeys',
    type: 'presentation',
    description: 'Guidelines for various conversation scenarios',
    tags: ['blocklist', 'unsubscribe', 'closing', 'journeys', 'conversations'],
    content: ``
};

window.blocklist_unsubscribe_content = blocklist_unsubscribe_content;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(blocklist_unsubscribe_content, 'content', 'eventQuality');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(blocklist_unsubscribe_content, 'content', 'eventQuality');
        }
    });
}

