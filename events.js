// Events Data
// HOW TO MANAGE EVENTS:
// 1. To add an event: Copy an event object and update the fields
// 2. To remove an event: Delete the entire event object (including the curly braces and comma)
// 3. Recurring events: Set recurring: true - these always show up
// 4. One-time events: Set recurring: false and provide a dateString (YYYY-MM-DD format)
// 5. Past events are automatically filtered out (except recurring ones)

const events = [
    // RECURRING EVENTS (always displayed)
    {
        title: "Off The Chain Thursdays",
        date: "Every Thursday @ 6:30 PM",
        dateString: null, // null for recurring events
        recurring: true,
        location: "Atlanta Blockchain Center",
        description: "Join us for our weekly networking event. Connect with blockchain enthusiasts, developers, and entrepreneurs in the Atlanta Web3 community."
    },

    // UPCOMING ONE-TIME EVENTS (add new events here)
    // Template for adding new events:
    // {
    //     title: "Event Name",
    //     date: "Month DD, YYYY @ HH:MM AM/PM",
    //     dateString: "YYYY-MM-DD",  // Used for sorting and filtering
    //     recurring: false,
    //     location: "Venue Name",
    //     description: "Event description here"
    // },

    {
        title: "Blockchain 101 Workshop",
        date: "November 10, 2025 @ 5:00 PM",
        dateString: "2025-11-10",
        recurring: false,
        location: "Atlanta Blockchain Center",
        description: "New to blockchain? This beginner-friendly workshop covers the fundamentals of blockchain technology, cryptocurrencies, and Web3."
    },
    {
        title: "Web3 Pitchfest Atlanta",
        date: "December 5, 2025 @ 6:00 PM",
        dateString: "2025-12-05",
        recurring: false,
        location: "Atlanta Blockchain Center",
        description: "Annual pitching competition for Web3 startups. Watch innovative projects compete for prizes and community support."
    },
    {
        title: "Smart Contract Development Bootcamp",
        date: "December 12, 2025 @ 2:00 PM",
        dateString: "2025-12-12",
        recurring: false,
        location: "Atlanta Blockchain Center",
        description: "Deep dive into Solidity and smart contract development. Learn to build, test, and deploy your first smart contracts."
    },
    {
        title: "DAO Governance Workshop",
        date: "January 15, 2026 @ 6:00 PM",
        dateString: "2026-01-15",
        recurring: false,
        location: "Atlanta Blockchain Center",
        description: "Learn about decentralized governance, voting mechanisms, and how Terminus DAO operates. Open to all community members."
    }
];

// Function to filter and sort events
function getUpcomingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison

    // Filter out past events (keep recurring events)
    const upcomingEvents = events.filter(event => {
        if (event.recurring) {
            return true; // Always show recurring events
        }
        if (!event.dateString) {
            return true; // Show events without dates
        }
        const eventDate = new Date(event.dateString);
        return eventDate >= today;
    });

    // Sort events: recurring first, then by date
    upcomingEvents.sort((a, b) => {
        // Recurring events come first
        if (a.recurring && !b.recurring) return -1;
        if (!a.recurring && b.recurring) return 1;

        // Both recurring or both not recurring, sort by date
        if (!a.dateString || !b.dateString) return 0;
        return new Date(a.dateString) - new Date(b.dateString);
    });

    return upcomingEvents;
}

// Function to render events
function renderEvents() {
    const eventsList = document.getElementById('eventsList');

    if (!eventsList) {
        console.error('Events list container not found');
        return;
    }

    // Clear existing content
    eventsList.innerHTML = '';

    // Get filtered and sorted upcoming events
    const upcomingEvents = getUpcomingEvents();

    // Check if there are events
    if (upcomingEvents.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No upcoming events at this time. Check back soon!</p>';
        return;
    }

    // Create event cards
    upcomingEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card fade-in';

        let cardHTML = `
            <h3 class="event-title">${event.title}</h3>
            <p class="event-date">${event.date}</p>
        `;

        if (event.location) {
            cardHTML += `<p class="event-location">📍 ${event.location}</p>`;
        }

        if (event.description) {
            cardHTML += `<p class="event-description">${event.description}</p>`;
        }

        if (event.link) {
            cardHTML += `<a href="${event.link}" class="event-link" target="_blank" rel="noopener noreferrer">Read more</a>`;
        }

        eventCard.innerHTML = cardHTML;
        eventsList.appendChild(eventCard);
    });
}

// Render events when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderEvents);
} else {
    renderEvents();
}
