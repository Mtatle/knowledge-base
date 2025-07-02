// Document content for Payments & Accounts
const paymentsAccountsContent = {
    id: '1niTTES92AD7eFtSaKr2j3sXAMsR5MMRCKh8VbxYungY',
    title: 'Payments & Accounts',
    type: 'presentation',
    description: 'Information on payment methods and account management',
    tags: ['payments', 'accounts', 'financial', 'management'],
    content: ``
};

window.paymentsAccountsContent = paymentsAccountsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(paymentsAccountsContent, 'content', 'conversationTopics', 'prePurchase');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(paymentsAccountsContent, 'content', 'conversationTopics', 'prePurchase');
        }
    });
}
