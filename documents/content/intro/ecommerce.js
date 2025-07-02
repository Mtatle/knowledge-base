// Document content for E-Commerce
const ecommerceContent = {
    id: '1p_e1vLAOCjvx3QrUYpP5MtbcuuHy3f39ViqMOHKd21g',
    title: 'E-Commerce',
    type: 'presentation',
    description: 'E-commerce overview',
    tags: ['e-commerce', 'online shopping', 'digital retail'],
    content: ``
};

window.ecommerceContent = ecommerceContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(ecommerceContent, 'content', 'intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(ecommerceContent, 'content', 'intro');
        }
    });
}

