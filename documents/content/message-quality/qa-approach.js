// Document content for QA Approach
const qaApproachContent = {
    id: '1Dtq1IV2Fe_-nxPvdhEt2wdLwIny8OnUpWiCTyghQN7c',
    title: 'QA Approach',
    type: 'presentation',
    description: 'Quality assurance approach',
    tags: ['qa', 'quality', 'approach', 'assurance'],
    content: ``
};

window.qaApproachContent = qaApproachContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(qaApproachContent, 'content', 'messageQuality');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(qaApproachContent, 'content', 'messageQuality');
        }
    });
}

