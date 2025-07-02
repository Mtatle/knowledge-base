// Document content for Discounts
const discountsContent = {
    id: '1qJM9406IKWMnC3vbNRHMTLHTRNTDixNQRflBonFNZ_8',
    title: 'Discounts',
    type: 'doc',
    description: 'Information about discount policies',
    tags: ['discounts', 'promotions', 'savings', 'offers'],
    content: ``
};

window.discountsContent = discountsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(discountsContent, 'content', 'conversationTopics', 'prePurchase');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(discountsContent, 'content', 'conversationTopics', 'prePurchase');
        }
    });
}
