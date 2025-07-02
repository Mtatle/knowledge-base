// Document content for Opting In & Out
const optingContent = {
    id: '196tQ4DTNhJSLh4xvruucnnmhZN8iD3c9EmrTksp69qA',
    title: 'Opting In & Out',
    type: 'presentation',
    description: 'Guide to opt-in and opt-out processes',
    tags: ['opt-in', 'opt-out', 'consent', 'subscription', 'marketing'],
    content: ``
};

// Export for use in main search
window.optingContent = optingContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(optingContent, 'Intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(optingContent, 'Intro');
        }
    });
}
