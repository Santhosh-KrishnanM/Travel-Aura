// Dashboard functionality
let currentUser = null;

// Initialize dashboard
function initializeDashboard() {
  // Get user data from localStorage or session
  const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  if (userData) {
    try {
      currentUser = JSON.parse(userData);
      document.getElementById('userWelcome').textContent = `Welcome, ${currentUser.username || currentUser.name || "User"}!`;
      updateUserProfile();
    } catch (err) {
      currentUser = null;
    }
  }
  
  // Show overview section by default
  showSection('overview');
  loadDashboardCards();
  loadDestinations();
  loadFavorites();
  loadProfile();
  loadSupport();
}

// Update user profile information
function updateUserProfile() {
  if (currentUser) {
    // Top right user name
    document.getElementById('userName') && (document.getElementById('userName').textContent = `Welcome, ${currentUser.username}!`);
    // Profile section
    document.getElementById('profileName') && (document.getElementById('profileName').textContent = currentUser.username);
    document.getElementById('profileEmail') && (document.getElementById('profileEmail').textContent = currentUser.email);
    document.getElementById('profileUsername') && (document.getElementById('profileUsername').textContent = currentUser.username);
    document.getElementById('profileEmailDetail') && (document.getElementById('profileEmailDetail').textContent = currentUser.email);
    document.getElementById('profilePhone') && (document.getElementById('profilePhone').textContent = currentUser.phone);
    document.getElementById('profileAddress') && (document.getElementById('profileAddress').textContent = currentUser.address);
  }
}

// Show different sections
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.remove('active'));
  
  // Show selected section
  document.getElementById(sectionId).classList.add('active');
  
  // Update sidebar active state
  const menuItems = document.querySelectorAll('.sidebar-menu li');
  menuItems.forEach(item => item.classList.remove('active'));
  
  // Find and activate corresponding menu item
  const activeMenuItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`).parentElement;
  activeMenuItem.classList.add('active');
  
  // Update page title
  const titles = {
    'overview': 'Dashboard',
    'destinations': 'Destinations',
    'bookings': 'My Bookings',
    'favorites': 'Favorites',
    'profile': 'Profile',
    'support': 'Support'
  };
  document.getElementById('pageTitle').textContent = titles[sectionId];
}

// Toggle sidebar for mobile
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// Load dashboard cards stats
function loadDashboardCards() {
  const container = document.getElementById('dashboardCards');
  if (!container) return;
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon"><i class="fas fa-map-marked-alt"></i></div>
      <div class="stat-info"><h3>12</h3><p>Places Visited</p></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon"><i class="fas fa-calendar-check"></i></div>
      <div class="stat-info"><h3>3</h3><p>Upcoming Trips</p></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon"><i class="fas fa-heart"></i></div>
      <div class="stat-info"><h3>8</h3><p>Favorite Places</p></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon"><i class="fas fa-star"></i></div>
      <div class="stat-info"><h3>4.8</h3><p>Average Rating</p></div>
    </div>
  `;
}

// Load destinations data
function loadDestinations() {
  // Replace this with an API call if needed
  const destinations = [
    {
      id: 'ooty',
      name: 'Ooty',
      type: 'hill-station',
      rating: 4.8,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80',
      description: 'Queen of Hill Stations'
    },
    {
      id: 'kodaikanal',
      name: 'Kodaikanal',
      type: 'hill-station',
      rating: 4.7,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=80',
      description: 'Princess of Hill Stations'
    },
    {
      id: 'marina-beach',
      name: 'Marina Beach',
      type: 'beach',
      rating: 4.3,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80',
      description: 'World\'s Second Longest Beach'
    },
    {
      id: 'meenakshi-temple',
      name: 'Meenakshi Temple',
      type: 'temple',
      rating: 4.9,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&q=80',
      description: 'Historic Hindu Temple'
    },
    {
      id: 'mahabalipuram',
      name: 'Mahabalipuram',
      type: 'heritage',
      rating: 4.5,
      reviews: 634,
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=300&q=80',
      description: 'UNESCO World Heritage Site'
    },
    {
      id: 'rameswaram',
      name: 'Rameswaram',
      type: 'temple',
      rating: 4.6,
      reviews: 756,
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=300&q=80',
      description: 'Sacred Pilgrimage Site'
    }
  ];
  
  displayDestinations(destinations);
}

// Display destinations
function displayDestinations(destinations) {
  const container = document.querySelector('.destinations-list');
  if (!container) return;
  container.innerHTML = '';
  
  destinations.forEach(dest => {
    const card = createDestinationCard(dest);
    container.appendChild(card);
  });
}

// Create destination card
function createDestinationCard(destination) {
  const card = document.createElement('div');
  card.className = 'destination-card';
  card.onclick = () => showDestinationDetails(destination.id);
  
  card.innerHTML = `
    <div class="destination-image" style="background-image: url('${destination.image}')"></div>
    <div class="destination-info">
      <h4>${destination.name}</h4>
      <p><i class="fas fa-star"></i> ${destination.rating} (${destination.reviews} reviews)</p>
      <span class="destination-type">${destination.type.replace('-', ' ')}</span>
      <p style="margin-top: 10px; color: #666;">${destination.description}</p>
    </div>
  `;
  
  return card;
}

// Filter destinations
function filterDestinations(type) {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  // Activate clicked tab
  event.target.classList.add('active');
  
  // Filter logic would go here
  // For now, we'll just reload all destinations
  loadDestinations();
}

// Load favorites
function loadFavorites() {
  // Replace this with an API call if needed
  const favorites = [
    { id: 'ooty', name: 'Ooty', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },
    { id: 'kodaikanal', name: 'Kodaikanal', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=80' },
    { id: 'marina-beach', name: 'Marina Beach', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80' }
  ];
  
  const container = document.querySelector('.favorites-grid');
  if (!container) return;
  container.innerHTML = '';
  
  favorites.forEach(fav => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
      <div class="destination-image" style="background-image: url('${fav.image}')"></div>
      <div class="destination-info">
        <h4>${fav.name}</h4>
        <button class="btn-danger" onclick="removeFavorite('${fav.id}')">
          <i class="fas fa-heart-broken"></i> Remove
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Show destination details
function showDestinationDetails(destinationId) {
  alert(`Showing details for: ${destinationId}`);
  // This would typically open a modal or navigate to a detailed view
}

// Adventure and Food page functions (from original script.js)
function showAdventurePage() {
  document.querySelector('.dashboard-container').style.display = 'none';
  alert('Adventure page would be shown here');
}

function showFoodPage() {
  document.querySelector('.dashboard-container').style.display = 'none';
  alert('Food page would be shown here');
}

// Create new booking
function createNewBooking() {
  alert('New booking form would open here');
}

// Edit profile
function editProfile() {
  alert('Profile edit form would open here');
}

// Remove favorite
function removeFavorite(destinationId) {
  if (confirm('Remove this destination from favorites?')) {
    // Remove from favorites and reload
    loadFavorites();
  }
}

// Load profile section with user info from backend (if needed)
function loadProfile() {
  // If currentUser, update the profile section; else, show not logged in
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileUsername = document.getElementById('profileUsername');
  const profileEmailDetail = document.getElementById('profileEmailDetail');
  const profilePhone = document.getElementById('profilePhone');
  const profileAddress = document.getElementById('profileAddress');
  if (currentUser) {
    profileName && (profileName.textContent = currentUser.username);
    profileEmail && (profileEmail.textContent = currentUser.email);
    profileUsername && (profileUsername.textContent = currentUser.username);
    profileEmailDetail && (profileEmailDetail.textContent = currentUser.email);
    profilePhone && (profilePhone.textContent = currentUser.phone);
    profileAddress && (profileAddress.textContent = currentUser.address);
  } else {
    profileName && (profileName.textContent = 'No user logged in.');
    profileEmail && (profileEmail.textContent = '');
    profileUsername && (profileUsername.textContent = '');
    profileEmailDetail && (profileEmailDetail.textContent = '');
    profilePhone && (profilePhone.textContent = '');
    profileAddress && (profileAddress.textContent = '');
  }
}

// Load support section
function loadSupport() {
  // Optionally, show support info or fetch from backend
}

// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'travel.html';
  }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    document.querySelector('.sidebar').classList.remove('open');
  }
});