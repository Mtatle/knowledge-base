// Document content for Concierge Agent Technical Settings
const technicalSettingsContent = {
    id: '1ItUQAyYlBlCXy-paWCRg3oKSgC3525zBKTD5eXZiOfw',
    title: 'Concierge Agent Technical Settings',
    type: 'presentation',
    description: 'Guide to technical settings for concierge agents',
    tags: ['technical settings', 'configuration', 'setup', 'system'],
    content: ``
};

window.technicalSettingsContent = technicalSettingsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(technicalSettingsContent, 'content', 'conciergeAgent101');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(technicalSettingsContent, 'content', 'conciergeAgent101');
        }
    });
}

