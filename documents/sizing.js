// Document content for Sizing guide
const sizingContent = {
    id: '1l0OM-EVw6gAZ5hWsJ7xBE3KZT4zkFqqkLMCSYT8WMm4',
    title: 'Sizing',
    type: 'doc',
    description: 'Sizing Guide',
    tags: ['sizing', 'measurements', 'fit', 'size chart', 'dimensions'],
    content: `Sizing guide for customer support representatives. This document covers how to help customers find the right size for their purchases.

Key topics covered:
- Size chart interpretation
- Measurement guidelines
- Fit recommendations
- Size exchanges and returns
- International sizing conversions
- Brand-specific sizing notes
- Common sizing issues and solutions

When helping customers with sizing:
1. Always refer to the brand's official size chart
2. Ask for customer measurements when needed
3. Consider the product type and fit preference
4. Provide clear measurement instructions
5. Explain return/exchange policies for sizing issues

Common sizing terms:
- XS, S, M, L, XL sizing
- Numeric sizing (2, 4, 6, 8, etc.)
- International conversions (US, UK, EU)
- Measurements (chest, waist, hips, inseam)
- Fit types (slim, regular, relaxed, oversized)`
};

window.sizingContent = sizingContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(sizingContent);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(sizingContent);
        }
    });
}
