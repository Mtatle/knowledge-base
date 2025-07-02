// Document content for E-Commerce
const ecommerceContent = {
    id: '1p_e1vLAOCjvx3QrUYpP5MtbcuuHy3f39ViqMOHKd21g',
    title: 'E-Commerce',
    type: 'presentation',
    description: 'E-commerce concepts and practices',
    tags: ['e-commerce', 'online', 'retail', 'shopping', 'sales'],
    content: ``
};

// Export for use in main search
window.ecommerceContent = ecommerceContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(ecommerceContent, 'Intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(ecommerceContent, 'Intro');
        }
    });
}
