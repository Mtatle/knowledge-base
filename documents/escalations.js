// Document content for Escalations guide
const escalationsContent = {
    id: '1pCAJJll3RJMy_8sLxQmkkHskhLoXCq1la4pGjgvAb3g',
    title: 'Escalations',
    type: 'doc',
    description: 'Escalation Procedures',
    tags: ['escalations', 'supervisor', 'management', 'complex issues', 'procedures'],
    content: `Escalation procedures for customer service representatives. This guide covers when and how to escalate customer issues appropriately.

When to escalate:
1. Customer requests to speak with a manager
2. Technical issues beyond your expertise
3. Policy exceptions requiring approval
4. Billing disputes over certain amounts
5. Complex refund or return situations
6. Angry or threatening customers
7. Legal or compliance concerns
8. System errors affecting multiple customers
9. Issues requiring specialized knowledge
10. Situations you're not confident handling

Types of escalations:
- Immediate escalation (urgent issues)
- Scheduled escalation (non-urgent)
- Technical escalation (IT/system issues)
- Management escalation (policy/authority issues)
- Specialist escalation (product/service specific)

Escalation process:
1. Document the issue thoroughly
2. Gather all relevant information
3. Attempt initial resolution if appropriate
4. Identify the correct escalation path
5. Provide clear handoff summary
6. Follow up as required
7. Learn from the resolution

Information to include:
- Customer details and contact information
- Complete issue description
- Steps already taken
- Customer's desired outcome
- Urgency level
- Any relevant policies or procedures
- Brand-specific considerations
- Timeline requirements

Communication during escalation:
- Keep customer informed of progress
- Set realistic expectations for resolution time
- Maintain professional demeanor
- Document all interactions
- Provide regular updates
- Ensure smooth handoff to escalated team

Post-escalation:
- Follow up on resolution
- Update customer records
- Learn from the case
- Identify process improvements
- Share knowledge with team
- Document lessons learned`
};

window.escalationsContent = escalationsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(escalationsContent);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(escalationsContent);
        }
    });
}
