// Document content for Discounts, Rewards and Promo Codes
const discountsRewardsContent = {
    id: '1SSliJGLwg6srjDmqwUtSsVDhAdCBQSWDfmRPToM9yyE',
    title: 'Discounts, Rewards and Promo Codes',
    type: 'presentation',
    description: 'Guide to discount and reward programs',
    tags: ['discounts', 'rewards', 'promo codes', 'incentives'],
    content: ``
};

window.discountsRewardsContent = discountsRewardsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(discountsRewardsContent, 'content', 'conversationTopics', 'general');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(discountsRewardsContent, 'content', 'conversationTopics', 'general');
        }
    });
}
