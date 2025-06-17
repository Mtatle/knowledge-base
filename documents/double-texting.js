// Document content for Double Texting guide
const doubleTextingContent = {
    id: '1FsLbW_3g9TNYjuYWUeCT8ASs_J46m8LqLJJd30fHuKc',
    title: 'Double Texting',
    type: 'doc',
    description: 'Double Texting Guidelines',
    tags: ['double texting', 'follow up', 'messaging', 'communication', 'timing'],
    content: `Double texting guidelines for customer service representatives. This covers when and how to send follow-up messages appropriately.

Key concepts:
- Understanding double texting etiquette
- Appropriate timing for follow-ups
- When double texting is necessary
- How to avoid being pushy or overwhelming
- Customer preference considerations
- Brand-specific double texting policies

When to double text:
1. Important updates or corrections
2. Time-sensitive information
3. Clarification requests
4. System errors or technical issues
5. Urgent customer service matters
6. Follow-up on incomplete conversations

When NOT to double text:
- Customer has indicated they need time
- Recent message was already sent
- Customer seems overwhelmed
- Non-urgent information
- Promotional content (unless specified)
- After business hours (brand dependent)

Best practices:
- Wait appropriate time intervals
- Keep follow-up messages concise
- Acknowledge the double text if necessary
- Provide value in each message
- Respect customer response patterns
- Use professional judgment
- Follow brand-specific guidelines

Timing recommendations:
- Wait at least 2-4 hours for non-urgent matters
- Immediate for urgent corrections or updates
- Consider time zones and business hours
- Adapt based on conversation flow and customer behavior`
};

window.doubleTextingContent = doubleTextingContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(doubleTextingContent);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(doubleTextingContent);
        }
    });
}
