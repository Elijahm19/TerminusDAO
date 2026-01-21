// Events Data - Fetches events from Firebase Firestore

// Generate a directions link that works with user's preferred map app
function getDirectionsLink(location) {
    if (!location) return null;

    let destination = '';

    // If address is provided
    if (location.address) {
        // If it's already a URL, use it directly
        if (location.address.startsWith('http://') || location.address.startsWith('https://')) {
            return location.address;
        }
        destination = location.address;
    } else if (location.name) {
        destination = location.name;
    } else if (typeof location === 'string') {
        destination = location;
    }

    if (!destination) return null;

    // Use a universal maps link that works on mobile and desktop
    // This will open in Google Maps on Android, Apple Maps on iOS, or browser maps on desktop
    const encodedDest = encodeURIComponent(destination);

    // Using maps.google.com with dir action for directions
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedDest}`;
}

async function renderEvents() {
    const eventsList = document.getElementById('eventsList');

    if (!eventsList) {
        console.error('Events list container not found');
        return;
    }

    // Show loading state
    eventsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-primary);">Loading events...</p>';

    // Check if Firebase is initialized
    if (typeof db === 'undefined') {
        console.error('Firestore not available');
        eventsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-primary);">Unable to load events.</p>';
        return;
    }

    try {
        const snapshot = await db.collection('events').get();
        console.log('Fetched', snapshot.size, 'events from Firestore');

        if (snapshot.empty) {
            eventsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-primary);">No upcoming events at this time. Check back soon!</p>';
            return;
        }

        // Clear loading state
        eventsList.innerHTML = '';

        // Create event cards
        snapshot.forEach(doc => {
            const event = doc.data();
            console.log('Processing event:', event.title, event);

            // Format the date
            let dateDisplay = 'Date TBD';
            if (event.recurring) {
                dateDisplay = event.displayTime ? `Recurring @ ${event.displayTime}` : 'Recurring Event';
            } else if (event.date) {
                const date = new Date(event.date + 'T00:00:00');
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                dateDisplay = date.toLocaleDateString('en-US', options);
                if (event.displayTime) {
                    dateDisplay += ` @ ${event.displayTime}`;
                }
            }

            // Get location name
            const locationName = event.location?.name || event.location || '';

            // Create card element
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';

            // Build card HTML
            let cardHTML = '';

            // Add image if available
            if (event.imageUrl) {
                cardHTML += `
                    <div class="event-image-container">
                        <img src="${event.imageUrl}" alt="${event.title}" class="event-image">
                    </div>
                `;
            }

            cardHTML += `<h3 class="event-title">${event.title || 'Untitled Event'}</h3>`;
            cardHTML += `<p class="event-date">${dateDisplay}</p>`;

            if (locationName) {
                const directionsLink = getDirectionsLink(event.location);
                if (directionsLink) {
                    cardHTML += `
                        <p class="event-location">
                            <a href="${directionsLink}" target="_blank" rel="noopener noreferrer" class="location-link">
                                📍 ${locationName}
                                <span class="directions-text">Get Directions</span>
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
                cardHTML += `<a href="${event.link}" class="event-link" target="_blank" rel="noopener noreferrer">Learn More</a>`;
            }

            eventCard.innerHTML = cardHTML;
            eventsList.appendChild(eventCard);
            console.log('Added card for:', event.title);
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        eventsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-primary);">Error loading events: ' + error.message + '</p>';
    }
}

// Render events when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderEvents);
} else {
    renderEvents();
}
