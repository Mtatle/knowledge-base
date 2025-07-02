// Document content for When to Request Templates
const whenToRequestTemplatesContent = {
    id: '1p9aosWDa8VqobsdSQX6joNLiQ-f2FdCkSG-TgZb-p5Y',
    title: 'When to Request Templates',
    type: 'presentation',
    description: 'Guide on template requests',
    tags: ['templates', 'requests', 'process', 'guidelines'],
    content: ``
};

window.whenToRequestTemplatesContent = whenToRequestTemplatesContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(whenToRequestTemplatesContent, 'content', 'navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(whenToRequestTemplatesContent, 'content', 'navigation');
        }
    });
}

