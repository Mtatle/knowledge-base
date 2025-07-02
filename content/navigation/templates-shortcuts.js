// Document content for Templates and Shortcuts
const templatesShortcutsContent = {
    id: '1Fjv7pwVx46H1tospQELVWe879PrEvfKu8118tJIfyQQ',
    title: 'Templates and Shortcuts',
    type: 'doc',
    description: 'Guide to template shortcuts',
    tags: ['templates', 'shortcuts', 'keyboard', 'efficiency'],
    content: ``
};

// Export for use in main search
window.templatesShortcutsContent = templatesShortcutsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(templatesShortcutsContent, 'Navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(templatesShortcutsContent, 'Navigation');
        }
    });
}
