// Document content for Template Requests presentation
const templateRequestsContent = {
    id: '1FVz0YM_TlWYi1xweqHoXwoGees_WPWHMU3Hk_gLH2ZI',
    title: 'When to Request Templates',
    type: 'presentation',
    description: 'Template Request Guidelines',
    tags: ['templates', 'requests', 'procedures', 'workflow', 'approval', 'guidelines'],
    content: `Guidelines for when and how to request new templates or modifications to existing ones.

When to request templates:
1. Frequently repeated responses not covered by existing templates
2. New product launches requiring specific messaging
3. Policy changes affecting customer communication
4. Seasonal or promotional messaging needs
5. Brand-specific requirements not currently available
6. Complex scenarios requiring standardized responses
7. Legal or compliance updates
8. Customer feedback indicating need for clearer messaging

Types of template requests:
- New template creation
- Existing template modification
- Template translation or localization
- Seasonal template updates
- Brand-specific customizations
- Emergency template needs
- Bulk template updates
- Template removal or archiving

Request process:
1. Identify the specific need
2. Check existing template library first
3. Document the use case clearly
4. Provide sample content or draft
5. Include relevant brand guidelines
6. Specify urgency level
7. Submit through proper channels
8. Follow up as needed

Information to include:
- Clear description of the need
- Target audience or customer type
- Specific use cases or scenarios
- Brand tone and voice requirements
- Any legal or compliance considerations
- Preferred timeline for implementation
- Examples of current similar messaging
- Expected usage frequency

Review and approval process:
- Initial review by team lead
- Content review for accuracy
- Brand compliance check
- Legal review if required
- Testing with sample scenarios
- Team feedback and refinement
- Final approval and deployment
- Training on new template usage

Best practices:
- Be specific about the need
- Provide clear examples
- Consider all use cases
- Think about scalability
- Include measurable success criteria
- Plan for template maintenance
- Consider training needs
- Document template purpose and usage`
};

window.templateRequestsContent = templateRequestsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(templateRequestsContent);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(templateRequestsContent);
        }
    });
}
