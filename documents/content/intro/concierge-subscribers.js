// Document content for Concierge Through The Lens of Subscribers
const conciergeSubscribersContent = {
    id: '1celRsgKBZwr4rqRKEe72Z_qVRDFxWYt729W3nzO8y8c',
    title: 'Concierge Through The Lens of Subscribers',
    type: 'presentation',
    description: 'Subscriber perspective on concierge service',
    tags: ['concierge', 'subscribers', 'service', 'customer experience'],
    content: ``
};

window.conciergeSubscribersContent = conciergeSubscribersContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(conciergeSubscribersContent, 'content', 'intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(conciergeSubscribersContent, 'content', 'intro');
        }
    });
}

