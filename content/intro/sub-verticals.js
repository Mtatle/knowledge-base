// Document content for Sub-verticals
const subVerticalsContent = {
    id: '1yTFwAQEs0zettdi4aw9hA-IeN59AyAv8rw4jza0mAEY',
    title: 'Sub-verticals',
    type: 'presentation',
    description: 'Overview of business sub-verticals',
    tags: ['sub-verticals', 'business', 'segments', 'markets'],
    content: ``
};

// Export for use in main search
window.subVerticalsContent = subVerticalsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(subVerticalsContent, 'Intro');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(subVerticalsContent, 'Intro');
        }
    });
}
