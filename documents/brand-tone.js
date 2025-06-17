// Document content for Brand Tone Preference guide
const brandToneContent = {
    id: '1MjWL8lm8n3EmxOe7tArRzgfcZRM3ZxnS_GSQ8qp-xKE',
    title: 'Brand Tone Preference',
    type: 'doc',
    description: 'Brand Communication Guidelines',
    tags: ['brand', 'tone', 'communication', 'voice', 'style', 'messaging'],
    content: `Brand tone preference guidelines for maintaining consistent communication across all customer interactions.

This guide covers:
- Understanding brand voice and personality
- Tone variations for different situations
- Language preferences and restrictions
- Communication style guidelines
- Brand-specific messaging requirements
- Formal vs. casual communication
- Emoji and punctuation usage
- Cultural sensitivity considerations

Key principles:
1. Always match the brand's established tone
2. Maintain consistency across all channels
3. Adapt tone based on customer mood and situation
4. Use brand-approved language and terminology
5. Avoid off-brand expressions or slang
6. Consider the target audience demographics
7. Balance professionalism with brand personality

Common tone types:
- Professional and formal
- Friendly and conversational
- Playful and energetic
- Sophisticated and elegant
- Casual and relatable
- Authoritative and trustworthy

Implementation tips:
- Review brand guidelines regularly
- Practice tone matching in training scenarios
- Ask for feedback on communication style
- Escalate when unsure about tone appropriateness`
};

window.brandToneContent = brandToneContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(brandToneContent);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(brandToneContent);
        }
    });
}
