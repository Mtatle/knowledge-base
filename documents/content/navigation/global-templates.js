// Document content for Global Templates, Company Templates, and Notes
const globalTemplatesContent = {
    id: '1Qy3__PYg__gjNi7LMsw9bpnPj9MsK7Chwlg-dh4qa_k',
    title: 'Global Templates, Company Templates, and Notes',
    type: 'presentation',
    description: 'Template organization guide',
    tags: ['templates', 'global', 'company', 'notes', 'organization'],
    content: ``
};

window.globalTemplatesContent = globalTemplatesContent;

// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument(globalTemplatesContent, 'content', 'navigation');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument(globalTemplatesContent, 'content', 'navigation');
        }
    });
}

