// Document content for Escalations
const escalationsContent = {
    id: '1lLMI34T6ty9y0_0RqBqnHh9qgM3d5Sp9dom_YPgTmEc',
    title: 'Escalations',
    type: 'presentation',
    description: 'Guide to handling escalations',
    tags: ['escalations', 'customer service', 'issue resolution', 'management'],
    content: ``
};

window.escalationsContent = escalationsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(escalationsContent, 'content', 'conciergeAgent101');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(escalationsContent, 'content', 'conciergeAgent101');
        }
    });
}

