// Document content for Templates
const templatesContent = {
    id: '1jl9L1jHTcPhcXRL_24P3EmGW5UQbkAXqdDT_fmYpIoU',
    title: 'Templates',
    type: 'presentation',
    description: 'Template guidelines and usage',
    tags: ['templates', 'guidelines', 'usage', 'standards'],
    content: ``
};

// Export for use in main search
window.templatesContent = templatesContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(templatesContent, 'Navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(templatesContent, 'Navigation');
        }
    });
}
