// =================================================================================
// Citizen Dashboard - Main Class
// =================================================================================
// This class manages the entire user interface for the Citizen role. It handles
// navigation and renders all necessary sections, including complaint submission,
// vehicle tracking, training, and the eco-store.
// =================================================================================

class CitizenDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.vehicleTracking = false;
    this.notifications = {
      vehicle5min: false,
      vehicleArrived: false
    };
  }

  /**
   * Loads a specific section into the main content area.
   * This acts as the primary navigation router for the dashboard.
   * @param {string} section The name of the section to load.
   */
  loadSection(section) {
    this.currentSection = section;
    const content = document.getElementById('mainContent');

    switch (section) {
      case 'dashboard':
        content.innerHTML = this.renderDashboard();
        break;
      case 'submit-complaint':
        content.innerHTML = this.renderSubmitComplaint();
        break;
      case 'my-complaints':
        content.innerHTML = this.renderMyComplaints();
        break;
      case 'tracking':
        content.innerHTML = this.renderTracking();
        break;
      case 'shop':
        content.innerHTML = this.renderShop();
        break;
      case 'training':
        content.innerHTML = this.renderTraining();
        break;
      case 'profile':
        content.innerHTML = this.renderProfile();
        break;
      default:
        content.innerHTML = this.renderDashboard();
    }

    this.bindEvents();
  }

  // --- Main Dashboard View ---
  renderDashboard() {
    const user = authSystem.getCurrentUser();
    const greenPoints = user.greenPoints || 250;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Citizen Dashboard</h1>
        <p class="dashboard-subtitle">Welcome to Smart Waste Management, ${user.name}!</p>
      </div>
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">My Complaints</span><div class="stat-icon primary"><i class="fas fa-exclamation-circle"></i></div></div>
          <div class="stat-value">7</div>
          <div class="stat-change positive"><i class="fas fa-check"></i> 5 resolved</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Green Points</span><div class="stat-icon success"><i class="fas fa-coins"></i></div></div>
          <div class="stat-value">${greenPoints.toLocaleString()}</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +25 this week</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Training Progress</span><div class="stat-icon secondary"><i class="fas fa-graduation-cap"></i></div></div>
          <div class="stat-value">${user.trainingProgress || 65}%</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Community Rank</span><div class="stat-icon warning"><i class="fas fa-trophy"></i></div></div>
          <div class="stat-value">#42</div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Recent Complaints</h3><button class="btn btn-primary" onclick="navigation.navigateTo('my-complaints')"><i class="fas fa-eye"></i> View All</button></div>
          <div class="card-body">
            </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Quick Actions</h3></div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="navigation.navigateTo('submit-complaint')"><i class="fas fa-plus-circle"></i> Report New Issue</button>
              <button class="btn btn-secondary" onclick="navigation.navigateTo('tracking')"><i class="fas fa-truck"></i> Track Garbage Vehicle</button>
              <button class="btn btn-info" onclick="navigation.navigateTo('shop')"><i class="fas fa-shopping-cart"></i> Visit Eco Store</button>
              <button class="btn btn-success" onclick="navigation.navigateTo('training')"><i class="fas fa-graduation-cap"></i> Learn & Earn Points</button>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Waste Collection Schedule</h3></div>
          <div class="card-body">
            </div>
        </div>
      </div>
    `;
  }

  generateWeeklySchedule() { /* ... (utility function as provided) ... */ }

  // --- FEATURE: Complaint Submission with Geotag & Photos ---
  // This section provides a detailed form for citizens to report issues.
  // It includes fields for location (with a "Use Current Location" button for geotagging)
  // and a placeholder for photo uploads.
  // -----------------------------------------------------------------
  renderSubmitComplaint() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Report an Issue</h1>
        <p class="dashboard-subtitle">Help keep your community clean by reporting issues</p>
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Submit New Complaint</h3></div>
          <div class="card-body">
            <form id="complaintForm" class="complaint-form">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Issue Type</label>
                <select class="form-control" id="issueType" required><option value="">Select issue type</option><option>Overflowing Bin</option><option>Illegal Dumping</option><option>Missed Collection</option></select>
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Description</label>
                <textarea class="form-control" rows="4" id="complaintDescription" placeholder="Provide detailed information..." required></textarea>
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Location</label>
                <input type="text" class="form-control" id="complaintLocation" placeholder="Enter specific location" required>
                <button type="button" class="btn btn-ghost" style="margin-top: 0.5rem;" onclick="window.CitizenDashboard.getCurrentLocation()"><i class="fas fa-map-marker-alt"></i> Use Current Location</button>
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Attach Photo (Optional)</label>
                <div class="photo-upload-area" style="border: 2px dashed var(--gray-300); border-radius: 8px; padding: 2rem; text-align: center;">
                  <i class="fas fa-camera" style="font-size: 2rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                  <p>Click to upload a photo</p>
                  <input type="file" style="display: none;">
                </div>
              </div>
              <div class="form-actions" style="margin-top: 2rem;">
                <button type="submit" class="btn btn-primary w-full"><i class="fas fa-paper-plane"></i> Submit Complaint</button>
              </div>
            </form>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Reporting Guidelines</h3></div>
          <div class="card-body">
            </div>
        </div>
      </div>
    `;
  }
  
  // --- FEATURE: Complaint & Reward Points Tracking ---
  // This section allows citizens to view their complaint history, track the status,
  // see points earned, and rate the service, which helps in tracking collector performance.
  // -----------------------------------------------------------------
  renderMyComplaints() {
    const complaints = [
      { id: 'C001', title: 'Overflowing bin near school', status: 'resolved', rating: 5, pointsEarned: 25 },
      { id: 'C002', title: 'Illegal dumping in park', status: 'in_progress', rating: null, pointsEarned: 0 },
    ];
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Complaints</h1>
        <p class="dashboard-subtitle">Track the status of your submitted complaints</p>
      </div>
      <div class="card">
        <div class="card-header"><h3 class="card-title">Complaint History</h3></div>
        <div class="card-body">
          <div class="complaints-grid" style="display: grid; gap: 1.5rem;">
            ${complaints.map(complaint => `
              <div class="complaint-card" style="border: 1px solid var(--gray-200); padding: 1.5rem; border-radius: 12px;">
                <h4 style="margin-bottom: 1rem;">${complaint.title}</h4>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    ${Utils.getStatusBadge(complaint.status)}
                    ${complaint.rating ? `<div style="color: var(--warning); margin-top: 0.5rem;">${'★'.repeat(complaint.rating)}</div>` : 
                      (complaint.status === 'resolved' ? `<button class="btn btn-warning" style="margin-top: 0.5rem;" onclick="window.CitizenDashboard.rateService('${complaint.id}')"><i class="fas fa-star"></i> Rate Service</button>` : '')
                    }
                  </div>
                  <div style="color: var(--success); font-weight: 600;">${complaint.pointsEarned > 0 ? `+${complaint.pointsEarned} <i class="fas fa-coins"></i>` : ''}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Vehicle Tracking with Notification Pop-ups ---
  // Renders a real-time map to track garbage collection vehicles.
  // The toggleVehicleTracking() method simulates the start of tracking and
  // triggers timed notification pop-ups for vehicle proximity and arrival.
  // -----------------------------------------------------------------
  renderTracking() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Garbage Vehicle Tracking</h1>
        <p class="dashboard-subtitle">Track collection vehicles in real-time</p>
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Live Vehicle Map</h3>
            <button class="btn ${this.vehicleTracking ? 'btn-error' : 'btn-success'}" onclick="window.CitizenDashboard.toggleVehicleTracking()">
              <i class="fas fa-${this.vehicleTracking ? 'stop' : 'play'}"></i> ${this.vehicleTracking ? 'Stop' : 'Start'} Tracking
            </button>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 500px;">
              <div class="map-placeholder">
                <i class="fas fa-truck" style="font-size: 4rem; color: var(--primary); margin-bottom: 2rem;"></i>
                <h3>Real-time Vehicle Tracking</h3>
                <p>${this.vehicleTracking ? 'Tracking is active.' : 'Click "Start Tracking" to see live locations.'}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Vehicle Status</h3></div>
          <div class="card-body">
            <div class="vehicle-status" style="padding: 1.5rem; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span style="font-weight: 600;">Vehicle GC-002</span>
                <span class="badge badge-warning">5 min away</span>
              </div>
              <button class="btn btn-primary" onclick="window.CitizenDashboard.requestNotification()"><i class="fas fa-bell"></i> Notify When Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- Eco Store (Part of Reward System) ---
  renderShop() { /* ... (code as provided) ... */ }

  // --- FEATURE: Training for Citizens (Duolingo Style) & App ---
  // Provides a gamified learning experience where citizens can complete
  // modules on waste management, track their progress, and earn Green Points.
  // This covers both general training and specific app usage training.
  // -----------------------------------------------------------------
  renderTraining() {
    const trainingModules = [
      { id: 'c01', title: 'Waste Segregation Basics', duration: '15 Mins', points: 30 },
      { id: 'c02', title: 'Recycling Best Practices', duration: '20 Mins', points: 40 },
      { id: 'c03', title: 'How to Use This App', duration: '10 Mins', points: 20 },
    ];
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Waste Management Training</h1>
        <p class="dashboard-subtitle">Learn sustainable practices and earn Green Points</p>
      </div>
      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
        ${trainingModules.map(module => `
          <div class="training-module-card" style="border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden;">
            <div style="padding: 2rem; background: var(--primary); color: white; text-align: center;">
              <i class="fas fa-graduation-cap" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
              <h3>${module.title}</h3>
            </div>
            <div style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div style="color: var(--primary); font-weight: 600;"><i class="fas fa-coins"></i> ${module.points} Points</div>
                <span class="badge badge-info">Available</span>
              </div>
              <button class="btn btn-primary" onclick="modal.showTrainingModule(${JSON.stringify(module)})" style="width: 100%;"><i class="fas fa-play"></i> Start Learning</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // --- User Profile ---
  renderProfile() { /* ... (code as provided) ... */ }

  // =================================================================================
  // Citizen-Specific Methods & Event Handlers
  // =================================================================================

  getCurrentLocation() {
    notifications.info('Getting Location', 'Detecting your current location...');
    // In a real app, this would use the browser's Geolocation API.
    setTimeout(() => {
        const locationField = document.getElementById('complaintLocation');
        if (locationField) {
            locationField.value = `MG Road, Bengaluru, Karnataka`;
        }
        notifications.success('Location Found', 'Your location has been added.');
    }, 1500);
  }

  toggleVehicleTracking() {
    this.vehicleTracking = !this.vehicleTracking;
    if (this.vehicleTracking) {
      notifications.success('Tracking Started', 'Now tracking garbage vehicles.');
      // Simulate notification pop-ups
      setTimeout(() => {
        if (this.vehicleTracking) notifications.showVehicleAlert('Vehicle is 5 minutes away!', 'warning');
      }, 5000); // 5 seconds for demo
      setTimeout(() => {
        if (this.vehicleTracking) notifications.showVehicleAlert('Vehicle has arrived!', 'success');
      }, 10000); // 10 seconds for demo
    } else {
      notifications.info('Tracking Stopped', 'Vehicle tracking disabled.');
    }
    this.refresh();
  }
  
  rateService(complaintId) { /* ... (code as provided) ... */ }
  hoverStar(rating) { /* ... (code as provided) ... */ }
  selectRating(rating) { /* ... (code as provided) ... */ }
  submitRating(complaintId) { /* ... (code as provided) ... */ }
  
  bindEvents() {
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
      complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        notifications.success('Complaint Submitted', 'Thank you for your report!');
        navigation.navigateTo('my-complaints');
      });
    }
  }

  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export
window.CitizenDashboard = new CitizenDashboard();