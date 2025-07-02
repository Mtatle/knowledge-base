// Document content for Rewards and Credit
const rewardsCreditContent = {
    id: '1PhOw3LF0aNbJLyWFDBVaZTe2AiTxwrgbqZfSJfCHjuI',
    title: 'Rewards and Credit',
    type: 'doc',
    description: 'Information about rewards and credit systems',
    tags: ['rewards', 'credit', 'points', 'loyalty'],
    content: ``
};

window.rewardsCreditContent = rewardsCreditContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(rewardsCreditContent, 'content', 'conversationTopics', 'general');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(rewardsCreditContent, 'content', 'conversationTopics', 'general');
        }
    });
}
