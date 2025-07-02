// Document content for Personalization/Empathy
const personalizationContent = {
    id: '1QpQbnZ_Fc0BGohBWTTw_VuFBTHbF4DspMPuXxR25rNg',
    title: 'Personalization/Empathy',
    type: 'doc',
    description: 'Guide to personalizing messages with empathy',
    tags: ['personalization', 'empathy', 'communication', 'customer service'],
    content: ``
};

// Export for use in main search
window.personalizationContent = personalizationContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(personalizationContent, 'Message Quality');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(personalizationContent, 'Message Quality');
        }
    });
}
