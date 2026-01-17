// Events Data
// This file now fetches events from Firebase Firestore
// Fallback events are used if Firestore is not available

// Fallback events (used when Firestore is unavailable)
const fallbackEvents = [
    {
        title: "Off The Chain Thursdays",
        date: "Every Thursday @ 6:30 PM",
        dateString: null,
        recurring: true,
        location: { name: "Atlanta Blockchain Center" },
        description: "Join us for our weekly networking event. Connect with blockchain enthusiasts, developers, and entrepreneurs in the Atlanta Web3 community."
    }
];

// Function to fetch events from Firestore
async function fetchEventsFromFirestore() {
    // Check if Firebase is initialized
    if (typeof db === 'undefined') {
        console.warn('Firestore not available, using fallback events');
        return fallbackEvents;
    }

    try {
        const snapshot = await db.collection('events').get();

        if (snapshot.empty) {
            console.log('No events in Firestore, using fallback events');
            return fallbackEvents;
        }

        const events = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            events.push({
                id: doc.id,
                title: data.title,
                date: formatEventDateDisplay(data.date, data.displayTime, data.recurring),
                dateString: data.date,
                recurring: data.recurring || false,
                location: data.location,
                description: data.description,
                imageUrl: data.imageUrl || null,
                link: data.link || null
            });
        });

        return events;

    } catch (error) {
        console.error('Error fetching events from Firestore:', error);
        return fallbackEvents;
    }
}

// Format date for display
function formatEventDateDisplay(dateStr, displayTime, recurring) {
    if (recurring) {
        return displayTime ? `Every event @ ${displayTime}` : 'Recurring Event';
    }

    if (!dateStr) return 'Date TBD';

    const date = new Date(dateStr + 'T00:00:00');
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);

    return displayTime ? `${formatted} @ ${displayTime}` : formatted;
}

// Function to filter and sort events
function getUpcomingEvents(events) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter out past events (keep recurring events)
    const upcomingEvents = events.filter(event => {
        if (event.recurring) {
            return true;
        }
        if (!event.dateString) {
            return true;
        }
        // Parse date as local time (not UTC) to avoid timezone issues
        const eventDate = new Date(event.dateString + 'T00:00:00');
        return eventDate >= today;
    });

    // Sort events: recurring first, then by date
    upcomingEvents.sort((a, b) => {
        if (a.recurring && !b.recurring) return -1;
        if (!a.recurring && b.recurring) return 1;
        if (!a.dateString || !b.dateString) return 0;
        return new Date(a.dateString) - new Date(b.dateString);
    });

    return upcomingEvents;
}

// Generate map link (supports Google Maps links, Apple Maps links, or addresses)
function getMapLink(location) {
    if (!location) return null;

    // If address is provided
    if (location.address) {
        // If it's already a URL (Google Maps, Apple Maps, etc.), use it directly
        if (location.address.startsWith('http://') || location.address.startsWith('https://')) {
            return location.address;
        }
        // Otherwise, create a Google Maps search URL from the address
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
    }

    // Fallback: search by location name
    if (location.name) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name)}`;
    }

    // Legacy support: if location is just a string
    if (typeof location === 'string') {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    }

    return null;
}

// Function to render events
async function renderEvents() {
    const eventsList = document.getElementById('eventsList');

    if (!eventsList) {
        console.error('Events list container not found');
        return;
    }

    // Show loading state
    eventsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Loading events...</p>';

    // Fetch events from Firestore
    const allEvents = await fetchEventsFromFirestore();
    const upcomingEvents = getUpcomingEvents(allEvents);

    // Clear loading state
    eventsList.innerHTML = '';

    // Check if there are events
    if (upcomingEvents.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No upcoming events at this time. Check back soon!</p>';
        return;
    }

    // Create event cards
    upcomingEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card fade-in';

        // Get location display name
        const locationName = event.location?.name || event.location || '';
        const mapsLink = getMapLink(event.location);

        let cardHTML = '';

        // Add image if available
        if (event.imageUrl) {
            cardHTML += `
                <div class="event-image-container">
                    <img src="${event.imageUrl}" alt="${event.title}" class="event-image">
                </div>
            `;
        }

        cardHTML += `<h3 class="event-title">${event.title}</h3>`;
        cardHTML += `<p class="event-date">${event.date}</p>`;

        if (locationName) {
            if (mapsLink) {
                cardHTML += `
                    <p class="event-location">
                        <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="location-link">
                            <span class="location-icon">📍</span> ${locationName}
                            <span class="map-link-text">View on Map</span>
                        </a>
                    </p>
                `;
            } else {
                cardHTML += `<p class="event-location">📍 ${locationName}</p>`;
            }
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
