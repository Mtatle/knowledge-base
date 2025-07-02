// Document content for Driving to Purchase & Links
const drivingToPurchaseContent = {
    id: '1r9mTN_Mgc9_QjoF1OvWhMNgr9MoaF2BsMgZEhzjqfxs',
    title: 'Driving to Purchase & Links',
    type: 'presentation',
    description: 'Guide to driving customer purchases',
    tags: ['purchase', 'conversion', 'links', 'sales'],
    content: ``
};

window.drivingToPurchaseContent = drivingToPurchaseContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(drivingToPurchaseContent, 'content', 'conversationTopics', 'general');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(drivingToPurchaseContent, 'content', 'conversationTopics', 'general');
        }
    });
}
