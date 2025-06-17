// Document content for Closing Conversations guide
const closingConversationContent = {
    id: '1vOLuTQoPIiMcUItAhBY28Ys8nsTKbqlBylCpEpjEtOo',
    title: 'Closing a Conversation',
    type: 'doc',
    description: 'Professional Conversation Closure',
    tags: ['closing', 'conversation', 'ending', 'wrap up', 'professional', 'goodbye'],
    content: `Guidelines for professionally closing customer service conversations. This covers various scenarios and appropriate closure techniques.

Key principles:
- Always ensure customer satisfaction before closing
- Provide clear next steps if applicable
- Leave the door open for future communication
- Use appropriate closing language for the brand
- Confirm resolution of customer issues
- Offer additional assistance opportunities

Types of conversation closures:
1. Issue resolved successfully
2. Customer needs time to decide
3. Escalation required
4. Information provided, no further action needed
5. Customer becomes unresponsive
6. End of business hours
7. Technical limitations requiring follow-up

Professional closing phrases:
- "Is there anything else I can help you with today?"
- "Feel free to reach out if you have any other questions"
- "Thank you for contacting us, have a great day!"
- "I'm here if you need any additional assistance"
- "Please don't hesitate to get in touch if you need help"

What to include in closures:
- Summary of what was accomplished
- Next steps (if any)
- Timeline expectations
- Contact information for follow-up
- Appreciation for the customer's time
- Brand-appropriate sign-off

When NOT to close:
- Customer has unanswered questions
- Issue remains unresolved
- Customer is expressing frustration
- Important information is still being processed
- Follow-up action is immediately required

Post-closure considerations:
- Document conversation details
- Set reminders for follow-up actions
- Update customer profile if needed
- Report any issues or feedback
- Prepare for potential re-engagement`
};

window.closingConversationContent = closingConversationContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(closingConversationContent);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(closingConversationContent);
        }
    });
}
