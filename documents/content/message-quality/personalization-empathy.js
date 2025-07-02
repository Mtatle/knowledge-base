// Document content for Personalization/Empathy
const personalizationEmpathyContent = {
    id: '1QpQbnZ_Fc0BGohBWTTw_VuFBTHbF4DspMPuXxR25rNg',
    title: 'Personalization/Empathy',
    type: 'doc',
    description: 'Guide to personalization and empathy',
    tags: ['personalization', 'empathy', 'communication', 'customer service'],
    content: ``
};

window.personalizationEmpathyContent = personalizationEmpathyContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(personalizationEmpathyContent, 'content', 'messageQuality');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(personalizationEmpathyContent, 'content', 'messageQuality');
        }
    });
}

