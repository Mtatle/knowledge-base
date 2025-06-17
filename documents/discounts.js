// Document content for Discounts guide
const discountsContent = {
    id: '1GtO-5cJVi6PSRLM8Gp5_naWXXtdDtXf-zUwgpKa-2lI',
    title: 'Discounts',
    type: 'doc',
    description: 'A Key Guide',
    tags: ['discounts', 'promotions', 'codes', 'sales', 'BOGO', 'pricing'],
    content: `Discounts are reductions of the regular price of a product or service in order to obtain or increase sales. Brands often offer them in the form of promotional codes, sale promotions, BOGO (buy one, get one free), bundling and others.

This training will walk you through how to handle scenarios/conversations involving discounts. We will mainly focus on:
- what to do when the system offers a discount to a customer
- what to do when a customer asks for a discount
- how to troubleshoot and resolve any discount issues that arise

General workflow:
We proactively offer a discount. These situations most frequently look like the screenshot below but can vary when it comes to actual wording. The most important aspect is that we ask the customer if they want a discount or tell them we have one for them.

When a customer responds that they would like a discount, we should:
- Check the left-hand side of the UI, below the notes, to see if there is a Concierge discount available
- Send the AW template if available
- Check Promo Notes section if not in main position

The customer asks for a discount code/deal:
When a customer asks us for a discount code without any offer from us, check the left-hand side of the UI for any Concierge discount codes available. These can be located either underneath the notes or in the Promo Notes section.

Troubleshooting Discount/Promo Issues:
- Expiration dates
- Specific instructions to apply promotions  
- Minimum order total requirement
- Eligibility for certain items
- Already discounted items
- Sale items, bundles, sets, subscriptions
- Previous code usage
- Resubscribed customers

For Shopify-integrated brands, enter the code in the Coupon Inspector to check if the code is still valid. If the Coupon Inspector is unavailable (non-Shopify brand), create a mock cart to test the code on full-priced items.

Important notes:
- Codes are usually for one-time use only
- Some discount codes may have exceptions
- Always check if there are alternative valid codes available
- Report issues in #concierge-ops-issues channel if needed`
};

// Export for use in main search
window.discountsContent = discountsContent;

// Register with document registry
function registerDocument() {
    if (window.documentRegistry) {
        window.documentRegistry.registerDocument(discountsContent);
    } else {
        console.error('Document registry not available for Discounts');
    }
}

// Register immediately if registry is available
if (window.documentRegistry) {
    registerDocument();
} else {
    // Wait for registry to be ready
    window.addEventListener('registryReady', registerDocument);
}
