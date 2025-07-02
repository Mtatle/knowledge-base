// Document content for Agent Behavior and Performance
const agentBehaviorContent = {
    id: '1olKxtscaFT702gQyDccRJ_m3MYW6iaqyW3Oo9rmzjJ4',
    title: 'Agent Behavior and Performance',
    type: 'presentation',
    description: 'Guidelines for agent behavior and performance standards',
    tags: ['agent behavior', 'performance', 'standards', 'guidelines'],
    content: ``
};

window.agentBehaviorContent = agentBehaviorContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(agentBehaviorContent, 'admin');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(agentBehaviorContent, 'admin');
        }
    });
}
