// Document content for General Client and Website Knowledge
const generalClientContent = {
    id: '1vqhJEJKPffTT8I5z2anpyVHpqMc-GHXe9U79zgdZfrk',
    title: 'General Client and Website Knowledge',
    type: 'presentation',
    description: 'Overview of client and website information',
    tags: ['client', 'website', 'knowledge', 'information'],
    content: ``
};

window.generalClientContent = generalClientContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(generalClientContent, 'content', 'conciergeAgent101');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(generalClientContent, 'content', 'conciergeAgent101');
        }
    });
}

