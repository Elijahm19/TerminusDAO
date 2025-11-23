// Sponsorship Tiers Data
const sponsorshipTiers = [
    {
        tier: "Platinum",
        title: "Platinum Sponsorship",
        description: "Includes premier brand visibility, VIP event access, mentorship opportunities within the Immutable Founders incubator, a chance to host workshops, and dedicated coworking space access.",
        color: "#E5E4E2"
    },
    {
        tier: "Gold",
        title: "Gold Sponsorship",
        description: "Offers notable brand exposure, participation in select events, mentoring roles within the incubator, and annual coworking passes.",
        color: "#FFD700"
    },
    {
        tier: "Silver",
        title: "Silver Sponsorship",
        description: "Provides brand mentions, access to select ABC events, and coworking passes, enabling meaningful engagement with Atlanta's blockchain community.",
        color: "#C0C0C0"
    },
    {
        tier: "Custom",
        title: "Custom Packages",
        description: "Tailored sponsorship packages designed to fit the unique needs of sponsors, including personalized workshops, exclusive Off the Chain Thursdays events, and more.",
        color: "#FFD700"
    }
];

// Function to render sponsors
function renderSponsors() {
    const sponsorsContainer = document.getElementById('sponsorsTable');

    if (!sponsorsContainer) {
        console.error('Sponsors container not found');
        return;
    }

    // Clear existing content
    sponsorsContainer.innerHTML = '';

    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'sponsorship-grid';

    // Create a card for each tier
    sponsorshipTiers.forEach(tierData => {
        const card = document.createElement('div');
        card.className = 'sponsorship-card fade-in';

        const title = document.createElement('h3');
        title.className = 'sponsorship-title';
        title.style.color = tierData.color;
        title.textContent = tierData.title;

        const description = document.createElement('p');
        description.className = 'sponsorship-description';
        description.textContent = tierData.description;

        card.appendChild(title);
        card.appendChild(description);
        grid.appendChild(card);
    });

    sponsorsContainer.appendChild(grid);
}

// Render sponsors when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSponsors);
} else {
    renderSponsors();
}
