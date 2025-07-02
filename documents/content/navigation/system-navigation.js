// Document content for System Navigation
const systemNavigationContent = {
    id: '1JY1rfqqoQmv154h5J2kD-6v-FPcwVVJKUXgL4OkVk_4',
    title: 'System Navigation',
    type: 'presentation',
    description: 'System navigation guide',
    tags: ['navigation', 'system', 'guide', 'usage'],
    content: ``
};

window.systemNavigationContent = systemNavigationContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(systemNavigationContent, 'content', 'navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(systemNavigationContent, 'content', 'navigation');
        }
    });
}
