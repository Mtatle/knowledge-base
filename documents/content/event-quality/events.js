// Document content for Events
const eventsContent = {
    id: '1QJDaNbXtdb92SRwyJBn4FEW3lftD4Fx5wd2JcVFcquU',
    title: 'Events',
    type: 'presentation',
    description: 'Overview of events',
    tags: ['events', 'management', 'scheduling', 'organization'],
    content: ``
};

window.eventsContent = eventsContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(eventsContent, 'content', 'eventQuality');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(eventsContent, 'content', 'eventQuality');
        }
    });
}

