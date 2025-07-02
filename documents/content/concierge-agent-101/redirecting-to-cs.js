// Document content for Redirecting to CS, Escalations and Personal Information
const redirectingToCSContent = {
    id: '17lJ5yL5Q4snbWlbs_x1_08Mx9ghvQD8F5UHT3IvGf7s',
    title: 'Redirecting to CS, Escalations and Personal Information',
    type: 'presentation',
    description: 'Guidelines for redirecting customers and handling escalations',
    tags: ['redirecting', 'customer service', 'escalations', 'personal information'],
    content: ``
};

window.redirectingToCSContent = redirectingToCSContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(redirectingToCSContent, 'content', 'conciergeAgent101');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(redirectingToCSContent, 'content', 'conciergeAgent101');
        }
    });
}

