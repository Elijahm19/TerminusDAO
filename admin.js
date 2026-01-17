// Admin Portal JavaScript

// State
let currentUser = null;
let editingEventId = null;
let selectedImageFile = null;
let eventToDelete = null;

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const registerCard = document.getElementById('registerCard');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('userEmail');
const eventForm = document.getElementById('eventForm');
const adminEventsList = document.getElementById('adminEventsList');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initFormHandlers();
    initImageUpload();
    initSidebarNavigation();
});

// ==================== AUTHENTICATION ====================

function initAuth() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            showDashboard();
            loadEvents();
        } else {
            currentUser = null;
            showLogin();
        }
    });

    // Login form handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('loginError');

        try {
            errorEl.textContent = '';
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            errorEl.textContent = getAuthErrorMessage(error.code);
        }
    });

    // Register form handler
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regPasswordConfirm').value;
        const errorEl = document.getElementById('registerError');

        if (password !== confirmPassword) {
            errorEl.textContent = 'Passwords do not match';
            return;
        }

        try {
            errorEl.textContent = '';
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            errorEl.textContent = getAuthErrorMessage(error.code);
        }
    });

    // Logout handler
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });

    // Toggle between login and register
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.login-card:not(#registerCard)').style.display = 'none';
        registerCard.style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        registerCard.style.display = 'none';
        document.querySelector('.login-card:not(#registerCard)').style.display = 'block';
    });
}

function getAuthErrorMessage(code) {
    const messages = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/invalid-email': 'Please enter a valid email address',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later'
    };
    return messages[code] || 'An error occurred. Please try again.';
}

function showLogin() {
    loginSection.style.display = 'flex';
    dashboardSection.style.display = 'none';
    logoutBtn.style.display = 'none';
    userEmailSpan.textContent = '';
}

function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    logoutBtn.style.display = 'block';
    userEmailSpan.textContent = currentUser.email;
}

// ==================== SIDEBAR NAVIGATION ====================

function initSidebarNavigation() {
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            showView(view);
        });
    });
}

function showView(viewName) {
    // Update sidebar buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Show/hide views
    document.querySelectorAll('.dashboard-view').forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(`${viewName}View`).style.display = 'block';

    // Reset form when switching to create view
    if (viewName === 'create' && !editingEventId) {
        resetForm();
    }
}

// ==================== IMAGE UPLOAD ====================

function initImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    const fileInput = document.getElementById('eventImage');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewImage = document.getElementById('imagePreview');
    const placeholder = document.getElementById('uploadPlaceholder');
    const removeBtn = document.getElementById('removeImage');

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        handleImageFile(e.target.files[0]);
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    });

    // Remove image
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedImageFile = null;
        fileInput.value = '';
        previewContainer.style.display = 'none';
        placeholder.style.display = 'block';
        previewImage.src = '';
    });
}

function handleImageFile(file) {
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    selectedImageFile = file;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        document.getElementById('uploadPlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// ==================== FORM HANDLERS ====================

function initFormHandlers() {
    eventForm.addEventListener('submit', handleEventSubmit);
}

async function handleEventSubmit(e) {
    e.preventDefault();

    const errorEl = document.getElementById('formError');
    const successEl = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    errorEl.textContent = '';
    successEl.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = editingEventId ? 'Updating...' : 'Creating...';

    try {
        // Gather form data
        const eventData = {
            title: document.getElementById('eventTitle').value.trim(),
            description: document.getElementById('eventDescription').value.trim(),
            date: document.getElementById('eventDate').value,
            displayTime: formatDisplayTime(),
            location: {
                name: document.getElementById('eventLocation').value.trim()
            },
            recurring: document.getElementById('eventRecurring').checked,
            link: document.getElementById('eventLink').value.trim() || null,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Validate required fields
        if (!eventData.title || !eventData.description || !eventData.date || !eventData.location.name) {
            throw new Error('Please fill in all required fields');
        }

        // Upload image if selected
        if (selectedImageFile) {
            const imageUrl = await uploadImage(selectedImageFile);
            eventData.imageUrl = imageUrl;
        }

        // Save to Firestore
        if (editingEventId) {
            await db.collection('events').doc(editingEventId).update(eventData);
            successEl.textContent = 'Event updated successfully!';
        } else {
            eventData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('events').add(eventData);
            successEl.textContent = 'Event created successfully!';
        }

        // Reset and go back to events list
        setTimeout(() => {
            resetForm();
            showView('events');
            loadEvents();
        }, 1500);

    } catch (error) {
        console.error('Error saving event:', error);
        errorEl.textContent = error.message || 'Failed to save event. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = editingEventId ? 'Update Event' : 'Create Event';
    }
}

function formatDisplayTime() {
    const hour = document.getElementById('eventHour').value;
    const minute = document.getElementById('eventMinute').value;
    const period = document.getElementById('eventPeriod').value;
    return `${hour}:${minute} ${period}`;
}

async function uploadImage(file) {
    const filename = `events/${Date.now()}_${file.name}`;
    const storageRef = storage.ref(filename);

    const snapshot = await storageRef.put(file);
    const downloadUrl = await snapshot.ref.getDownloadURL();

    return downloadUrl;
}

function resetForm() {
    eventForm.reset();
    editingEventId = null;
    selectedImageFile = null;

    document.getElementById('eventId').value = '';
    document.getElementById('formTitle').textContent = 'Create New Event';
    document.getElementById('submitBtn').textContent = 'Create Event';
    document.getElementById('formError').textContent = '';
    document.getElementById('formSuccess').textContent = '';

    // Reset image preview
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('uploadPlaceholder').style.display = 'block';
    document.getElementById('imagePreview').src = '';
}

// ==================== EVENTS CRUD ====================

async function loadEvents() {
    adminEventsList.innerHTML = '<div class="loading">Loading events</div>';

    try {
        const snapshot = await db.collection('events')
            .orderBy('date', 'desc')
            .get();

        if (snapshot.empty) {
            adminEventsList.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <h3>No events yet</h3>
                    <p>Create your first event to get started</p>
                </div>
            `;
            return;
        }

        adminEventsList.innerHTML = '';
        snapshot.forEach(doc => {
            const event = { id: doc.id, ...doc.data() };
            adminEventsList.appendChild(createEventCard(event));
        });

    } catch (error) {
        console.error('Error loading events:', error);
        adminEventsList.innerHTML = `
            <div class="empty-state">
                <h3>Error loading events</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'admin-event-card';

    const formattedDate = formatEventDate(event.date, event.displayTime, event.recurring);
    const locationDisplay = event.location?.name || event.location || 'No location';

    card.innerHTML = `
        ${event.imageUrl
            ? `<img src="${event.imageUrl}" alt="${event.title}" class="admin-event-image">`
            : `<div class="admin-event-image placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
               </div>`
        }
        <div class="admin-event-details">
            <h3 class="admin-event-title">
                ${event.title}
                ${event.recurring ? '<span class="recurring-badge">Recurring</span>' : ''}
            </h3>
            <div class="admin-event-meta">
                <span>${formattedDate}</span>
                <span>${locationDisplay}</span>
            </div>
            <p class="admin-event-description">${event.description}</p>
            <div class="admin-event-actions">
                <button class="btn-edit" onclick="editEvent('${event.id}')">Edit</button>
                <button class="btn-delete" onclick="confirmDelete('${event.id}')">Delete</button>
            </div>
        </div>
    `;

    return card;
}

function formatEventDate(dateStr, displayTime, recurring) {
    if (recurring) {
        return `Recurring @ ${displayTime || 'TBD'}`;
    }

    if (!dateStr) return 'Date TBD';

    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);

    return displayTime ? `${formatted} @ ${displayTime}` : formatted;
}

async function editEvent(eventId) {
    try {
        const doc = await db.collection('events').doc(eventId).get();

        if (!doc.exists) {
            alert('Event not found');
            return;
        }

        const event = doc.data();
        editingEventId = eventId;

        // Populate form
        document.getElementById('eventId').value = eventId;
        document.getElementById('eventTitle').value = event.title || '';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventDate').value = event.date || '';
        document.getElementById('eventRecurring').checked = event.recurring || false;
        document.getElementById('eventLink').value = event.link || '';

        // Parse and set time
        if (event.displayTime) {
            const timeParts = event.displayTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (timeParts) {
                document.getElementById('eventHour').value = timeParts[1];
                document.getElementById('eventMinute').value = timeParts[2];
                document.getElementById('eventPeriod').value = timeParts[3].toUpperCase();
            }
        }

        // Set location
        if (event.location) {
            document.getElementById('eventLocation').value = event.location.name || event.location || '';
        }

        // Set image preview if exists
        if (event.imageUrl) {
            document.getElementById('imagePreview').src = event.imageUrl;
            document.getElementById('imagePreviewContainer').style.display = 'block';
            document.getElementById('uploadPlaceholder').style.display = 'none';
        }

        // Update form title and button
        document.getElementById('formTitle').textContent = 'Edit Event';
        document.getElementById('submitBtn').textContent = 'Update Event';

        // Show create view
        showView('create');

    } catch (error) {
        console.error('Error loading event for edit:', error);
        alert('Failed to load event. Please try again.');
    }
}

function confirmDelete(eventId) {
    eventToDelete = eventId;
    document.getElementById('deleteModal').style.display = 'flex';

    document.getElementById('confirmDeleteBtn').onclick = () => deleteEvent(eventId);
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    eventToDelete = null;
}

async function deleteEvent(eventId) {
    try {
        // Get event to check for image
        const doc = await db.collection('events').doc(eventId).get();
        const event = doc.data();

        // Delete image from storage if exists
        if (event.imageUrl) {
            try {
                const imageRef = storage.refFromURL(event.imageUrl);
                await imageRef.delete();
            } catch (e) {
                console.warn('Could not delete image:', e);
            }
        }

        // Delete event document
        await db.collection('events').doc(eventId).delete();

        closeDeleteModal();
        loadEvents();

    } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
    }
}

// Make functions globally available
window.showView = showView;
window.editEvent = editEvent;
window.confirmDelete = confirmDelete;
window.closeDeleteModal = closeDeleteModal;
window.resetForm = resetForm;
