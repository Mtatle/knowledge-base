// Document content for Opting In & Out
const optingInOutContent = {
    id: '196tQ4DTNhJSLh4xvruucnnmhZN8iD3c9EmrTksp69qA',
    title: 'Opting In & Out',
    type: 'presentation',
    description: 'Guide on opt-in and opt-out processes',
    tags: ['opt-in', 'opt-out', 'subscriptions', 'preferences'],
    content: ``
};

window.optingInOutContent = optingInOutContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(optingInOutContent, 'content', 'intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(optingInOutContent, 'content', 'intro');
        }
    });
}

