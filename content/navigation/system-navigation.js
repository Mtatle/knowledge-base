// Document content for System Navigation
const systemNavigationContent = {
    id: '1JY1rfqqoQmv154h5J2kD-6v-FPcwVVJKUXgL4OkVk_4',
    title: 'System Navigation',
    type: 'presentation',
    description: 'Guide to system navigation',
    tags: ['system', 'navigation', 'platform', 'interface', 'guide'],
    content: ``
};

// Export for use in main search
window.systemNavigationContent = systemNavigationContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(systemNavigationContent, 'Navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(systemNavigationContent, 'Navigation');
        }
    });
}
