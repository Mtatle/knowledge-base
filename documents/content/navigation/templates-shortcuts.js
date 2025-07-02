// Document content for Templates and Shortcuts
const templatesShortcutsContent = {
    id: '1Fjv7pwVx46H1tospQELVWe879PrEvfKu8118tJIfyQQ',
    title: 'Templates and Shortcuts',
    type: 'doc',
    description: 'Templates and shortcuts guide',
    tags: ['templates', 'shortcuts', 'guide', 'efficiency'],
    content: ``
};

window.templatesShortcutsContent = templatesShortcutsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(templatesShortcutsContent, 'content', 'navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(templatesShortcutsContent, 'content', 'navigation');
        }
    });
}

