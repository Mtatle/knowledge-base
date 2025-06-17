// Document content for TextBlaze presentation
const textblazeContent = {
    id: '12p2LBjenpyBg9uWGzGPjGtrNr6b3n2mcvosG-ojUYaY',
    title: 'How to Use TextBlaze',
    type: 'presentation',
    description: 'Essential Tool',
    tags: ['textblaze', 'templates', 'automation', 'shortcuts', 'productivity', 'tools'],
    content: `TextBlaze training presentation covering the essential features and usage of the TextBlaze tool for customer service efficiency.

What is TextBlaze:
- Text expansion and template tool
- Keyboard shortcuts for common responses
- Time-saving automation for repetitive tasks
- Customizable templates and snippets
- Integration with various platforms

Key features:
1. Text snippets and templates
2. Dynamic placeholders
3. Form fields for customization
4. Conditional logic
5. Auto-correction capabilities
6. Cross-platform compatibility
7. Team sharing and collaboration
8. Analytics and usage tracking

Setting up TextBlaze:
- Install browser extension
- Create account and workspace
- Configure keyboard shortcuts
- Import team templates
- Customize personal snippets
- Set up folder organization

Common use cases:
- Welcome messages
- FAQ responses
- Closing statements
- Product information
- Shipping and return policies
- Troubleshooting steps
- Escalation procedures
- Brand-specific responses

Best practices:
- Keep templates up to date
- Use clear naming conventions
- Test templates before deployment
- Regular team template reviews
- Monitor usage analytics
- Gather feedback for improvements
- Maintain consistency across team
- Back up important templates

Advanced features:
- Dynamic content insertion
- Date and time variables  
- Customer name personalization
- Conditional text based on scenarios
- Integration with CRM systems
- Multi-language support
- Template versioning
- Bulk template management`
};

window.textblazeContent = textblazeContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(textblazeContent);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(textblazeContent);
        }
    });
}
