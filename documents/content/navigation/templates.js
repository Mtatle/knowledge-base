// Document content for Templates
const templatesContent = {
    id: '1jl9L1jHTcPhcXRL_24P3EmGW5UQbkAXqdDT_fmYpIoU',
    title: 'Templates',
    type: 'presentation',
    description: 'Templates overview',
    tags: ['templates', 'documentation', 'guides'],
    content: ``
};

window.templatesContent = templatesContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(templatesContent, 'content', 'navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(templatesContent, 'content', 'navigation');
        }
    });
}

