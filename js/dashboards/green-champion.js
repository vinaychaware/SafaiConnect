// =================================================================================
// Green Champion Dashboard - Main Class
// =================================================================================
// This class manages the entire user interface for the Green Champion role.
// It handles navigation, renders different sections, and contains the logic
// for user interactions like rating work and redeeming rewards.
// =================================================================================

class GreenChampionDashboard {
  constructor() {
    this.currentSection = 'dashboard';
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
      case 'my-reports':
        content.innerHTML = this.renderMyReports();
        break;
      case 'community':
        content.innerHTML = this.renderCommunity();
        break;
      case 'rewards':
        content.innerHTML = this.renderRewards();
        break;
      case 'heat-map':
        content.innerHTML = this.renderHeatMap();
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

  // --- FEATURE: Main Dashboard (Overview & Gamification) ---
  // This is the landing page, showing key stats, recent activity,
  // achievements (badges), and quick actions.
  // -----------------------------------------------------------------
  renderDashboard() {
    const user = authSystem.getCurrentUser();
    const greenPoints = user.greenPoints || 250;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Green Champion Hub</h1>
        <p class="dashboard-subtitle">Leading the way to a cleaner community</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Green Points</span>
            <div class="stat-icon primary"><i class="fas fa-coins"></i></div>
          </div>
          <div class="stat-value">${greenPoints.toLocaleString()}</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +50 this week</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Reports Submitted</span>
            <div class="stat-icon secondary"><i class="fas fa-flag"></i></div>
          </div>
          <div class="stat-value">12</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> 3 this month</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Community Rank</span>
            <div class="stat-icon warning"><i class="fas fa-trophy"></i></div>
          </div>
          <div class="stat-value">#7</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +2 positions</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Areas Cleaned</span>
            <div class="stat-icon primary"><i class="fas fa-broom"></i></div>
          </div>
          <div class="stat-value">8</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> 2 this week</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Recent Activities</h3></div>
          <div class="card-body">
            <div class="activity-timeline">
              <div class="activity-item" style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--success); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-check"></i></div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Complaint Resolved</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Your report about overflowing bin was successfully resolved</div>
                  <div style="font-size: 0.75rem; color: var(--gray-500);">2 hours ago • +25 Green Points</div>
                </div>
              </div>
              <div class="activity-item" style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-graduation-cap"></i></div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Training Completed</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Finished "Community Leadership" module</div>
                  <div style="font-size: 0.75rem; color: var(--gray-500);">1 day ago • +90 Green Points</div>
                </div>
              </div>
              <div class="activity-item" style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-users"></i></div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Community Event</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Participated in neighborhood cleanup drive</div>
                  <div style="font-size: 0.75rem; color: var(--gray-500);">3 days ago • +100 Green Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="card-title">Achievements</h3></div>
          <div class="card-body">
            <div class="achievements-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--primary);">Top Reporter</div>
              </div>
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌟</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--warning);">Community Hero</div>
              </div>
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎯</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--success);">100% Accuracy</div>
              </div>
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--secondary);">Learner</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Quick Actions</h3></div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <button class="btn btn-primary" onclick="modal.showComplaintForm()" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-plus-circle" style="font-size: 1.5rem;"></i> Report Issue</button>
              <button class="btn btn-secondary" onclick="navigation.navigateTo('heat-map')" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-map" style="font-size: 1.5rem;"></i> View Heat Map</button>
              <button class="btn btn-success" onclick="navigation.navigateTo('rewards')" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-gift" style="font-size: 1.5rem;"></i> Redeem Points</button>
              <button class="btn btn-warning" onclick="navigation.navigateTo('training')" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-graduation-cap" style="font-size: 1.5rem;"></i> Training</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Complaint Reporting & Feedback ---
  // Renders the list of reports submitted by the champion and
  // provides actions to view details or rate the work.
  // ----------------------------------------------------
  renderMyReports() {
    const reports = [
      { id: 'R001', title: 'Overflowing bin near school', status: 'resolved', points: 25, date: new Date('2024-01-15'), rating: 5 },
      { id: 'R002', title: 'Illegal dumping in park', status: 'in_progress', points: 50, date: new Date('2024-01-14'), rating: null },
      { id: 'R003', title: 'Broken waste container', status: 'verified', points: 30, date: new Date('2024-01-12'), rating: 4 }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Reports</h1>
        <p class="dashboard-subtitle">Track your submitted complaints and earned points</p>
        <button class="btn btn-primary" onclick="modal.showComplaintForm()"><i class="fas fa-plus"></i> Submit New Report</button>
      </div>

      <div class="card">
        <div class="card-header"><h3 class="card-title">Report History</h3></div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Points Earned</th>
                  <th>Submitted</th>
                  <th>Rating Given</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${reports.map(report => `
                  <tr>
                    <td>${report.id}</td>
                    <td>${report.title}</td>
                    <td>${Utils.getStatusBadge(report.status)}</td>
                    <td><span style="color: var(--primary); font-weight: 600;">+${report.points} <i class="fas fa-coins"></i></span></td>
                    <td>${Utils.formatDate(report.date)}</td>
                    <td>
                      ${report.rating ? 
                        `<div style="color: var(--warning);">${'★'.repeat(report.rating)}${'☆'.repeat(5-report.rating)}</div>` : 
                        '<span style="color: var(--gray-400);">Pending</span>'
                      }
                    </td>
                    <td>
                      <button class="btn btn-ghost" onclick="window.ComplaintManager.viewComplaint('${report.id}')" title="View Details"><i class="fas fa-eye"></i></button>
                      ${report.status === 'resolved' && !report.rating ? 
                        `<button class="btn btn-ghost" onclick="window.GreenChampionDashboard.rateWork('${report.id}')" title="Rate Work"><i class="fas fa-star"></i></button>` : ''
                      }
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Community Hub & Leaderboard ---
  // Creates a space for community events and a leaderboard
  // to foster competition and engagement among champions.
  // ------------------------------------------------
  renderCommunity() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Community Hub</h1>
        <p class="dashboard-subtitle">Connect with fellow Green Champions and community events</p>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Upcoming Community Events</h3></div>
          <div class="card-body">
            <div class="event-list">
              <div class="event-card" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                  <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem; color: var(--primary);">Community Cleanup Drive</h4>
                    <p style="color: var(--gray-600); margin-bottom: 0.5rem;">Join us for a neighborhood cleaning initiative</p>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 600; color: var(--accent);">Jan 20, 2024</div>
                    <div style="font-size: 0.875rem; color: var(--gray-500);">9:00 AM</div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="color: var(--success); font-weight: 600;"><i class="fas fa-coins"></i> +100 Green Points</div>
                  <button class="btn btn-primary">Join Event</button>
                </div>
              </div>
              <div class="event-card" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                  <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem; color: var(--secondary);">Waste Segregation Workshop</h4>
                    <p style="color: var(--gray-600); margin-bottom: 0.5rem;">Learn advanced segregation techniques</p>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 600; color: var(--accent);">Jan 22, 2024</div>
                    <div style="font-size: 0.875rem; color: var(--gray-500);">2:00 PM</div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="color: var(--success); font-weight: 600;"><i class="fas fa-coins"></i> +75 Green Points</div>
                  <button class="btn btn-primary">Join Event</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="card-title">Top Green Champions</h3></div>
          <div class="card-body">
            <div class="leaderboard">
              ${[
                { rank: 1, name: 'Sarah Wilson', points: 1250, badge: '🏆' },
                { rank: 2, name: 'Michael Chen', points: 1180, badge: '🥈' },
                { rank: 3, name: 'Priya Patel', points: 1150, badge: '🥉' },
                { rank: 4, name: 'David Rodriguez', points: 980, badge: '🌟' },
                { rank: 5, name: 'Emma Davis', points: 850, badge: '⭐' }
              ].map(champion => `
                <div class="leaderboard-item" style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div style="font-size: 1.5rem;">${champion.badge}</div>
                  <div style="flex: 1;">
                    <div style="font-weight: 600;">${champion.name}</div>
                    <div style="color: var(--primary); font-size: 0.875rem;"><i class="fas fa-coins"></i> ${champion.points.toLocaleString()} points</div>
                  </div>
                  <div style="font-weight: 600; color: var(--gray-600);">#${champion.rank}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Incentives (Rewards Store) ---
  // Allows champions to redeem their Green Points for tangible rewards,
  // providing a strong incentive to stay active.
  // ---------------------------------------------
  renderRewards() {
    const user = authSystem.getCurrentUser();
    const availablePoints = user.greenPoints || 250;

    const rewards = [
      { id: 1, name: 'Movie Tickets', points: 200, image: '🎬', description: '2 movie tickets to any theater' },
      { id: 2, name: 'Eco-Friendly Bag', points: 150, image: '🛍️', description: 'Reusable shopping bag' },
      { id: 3, name: 'Plant Saplings', points: 100, image: '🌱', description: 'Set of 5 plant saplings' },
      { id: 4, name: 'Restaurant Voucher', points: 300, image: '🍽️', description: '₹500 voucher at partnered restaurants' },
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Rewards Store</h1>
        <p class="dashboard-subtitle">Redeem your Green Points for amazing rewards</p>
        <div style="display: flex; align-items: center; gap: 1rem; background: var(--primary); color: white; padding: 1rem; border-radius: 8px;">
          <i class="fas fa-coins" style="font-size: 2rem;"></i>
          <div>
            <div style="font-size: 1.5rem; font-weight: 700;">${availablePoints.toLocaleString()}</div>
            <div style="opacity: 0.9;">Available Green Points</div>
          </div>
        </div>
      </div>

      <div class="product-grid">
        ${rewards.map(reward => `
          <div class="product-card">
            <div class="product-image" style="font-size: 4rem;">${reward.image}</div>
            <div class="product-info">
              <h4 class="product-title">${reward.name}</h4>
              <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 1rem;">${reward.description}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);"><i class="fas fa-coins"></i> ${reward.points}</div>
                ${availablePoints >= reward.points ? `<span class="badge badge-success">Available</span>` : `<span class="badge badge-error">Insufficient Points</span>`}
              </div>
              <button class="btn ${availablePoints >= reward.points ? 'btn-primary' : 'btn-ghost'}" ${availablePoints < reward.points ? 'disabled' : ''} onclick="window.GreenChampionDashboard.redeemReward(${reward.id}, ${reward.points})" style="width: 100%;"><i class="fas fa-gift"></i> Redeem</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- FEATURE: Heat Maps & Analytics ---
  // Visualizes cleanliness data on a map, helping champions
  // identify problem areas and track city-wide progress.
  // ----------------------------------------
  renderHeatMap() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">City Cleanliness Heat Map</h1>
        <p class="dashboard-subtitle">Real-time visualization of cleanliness levels across the city</p>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="map-container" style="height: 500px; position: relative;">
            <div class="heat-map"></div>
            <div class="map-placeholder">
              <i class="fas fa-map" style="font-size: 4rem; color: var(--gray-400); margin-bottom: 2rem;"></i>
              <h3 style="margin-bottom: 1rem;">Interactive City Heat Map</h3>
              <p style="color: var(--gray-600); max-width: 500px; margin: 0 auto 2rem;">
                Red zones require immediate attention, while green zones are well-maintained.
              </p>
              <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 0.5rem;"><div style="width: 20px; height: 20px; background: #EF4444; border-radius: 50%;"></div><span>High Priority Areas (12)</span></div>
                <div style="display: flex; align-items: center; gap: 0.5rem;"><div style="width: 20px; height: 20px; background: #F59E0B; border-radius: 50%;"></div><span>Medium Priority (8)</span></div>
                <div style="display: flex; align-items: center; gap: 0.5rem;"><div style="width: 20px; height: 20px; background: #10B981; border-radius: 50%;"></div><span>Clean Areas (25)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Training for Green Champions ---
  // Renders the training module section where champions can
  // learn new skills and earn points.
  // ---------------------------------------------
  renderTraining() {
    const user = authSystem.getCurrentUser();
    const completedModules = user.completedModules || ['gc01']; // Example: 'gc01' is completed
    const trainingModules = [
        { id: 'gc01', title: 'Community Leadership', duration: '45 Mins', points: 90 },
        { id: 'gc02', title: 'Environmental Awareness', duration: '60 Mins', points: 100 },
        { id: 'gc03', title: 'Waste Reduction Strategies', duration: '30 Mins', points: 75 },
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Green Champion Training</h1>
        <p class="dashboard-subtitle">Master the skills of community leadership and environmental stewardship</p>
      </div>
      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
            <div class="stat-header"><span class="stat-title">Modules Completed</span><div class="stat-icon primary"><i class="fas fa-graduation-cap"></i></div></div>
            <div class="stat-value">${completedModules.length}/${trainingModules.length}</div>
        </div>
        <div class="stat-card">
            <div class="stat-header"><span class="stat-title">Progress</span><div class="stat-icon secondary"><i class="fas fa-chart-line"></i></div></div>
            <div class="stat-value">${Math.round((completedModules.length / trainingModules.length) * 100)}%</div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
        ${trainingModules.map(module => {
          const isCompleted = completedModules.includes(module.id);
          return `
            <div class="training-module-card" style="border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden; ${isCompleted ? 'opacity: 0.8;' : ''}">
              <div style="padding: 2rem; background: ${isCompleted ? 'var(--success)' : 'var(--primary)'}; color: white; text-align: center;">
                <i class="fas fa-${isCompleted ? 'check-circle' : 'graduation-cap'}" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 0.5rem;">${module.title}</h3>
                <p style="opacity: 0.9;">Duration: ${module.duration}</p>
              </div>
              <div style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 600;"><i class="fas fa-coins"></i> ${module.points} Points</div>
                  ${isCompleted ? '<span class="badge badge-success">Completed</span>' : '<span class="badge badge-info">Available</span>'}
                </div>
                <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}" onclick="modal.showTrainingModule(${JSON.stringify(module)})" style="width: 100%;">
                  <i class="fas fa-${isCompleted ? 'eye' : 'play'}"></i> ${isCompleted ? 'Review' : 'Start Training'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // --- FEATURE: User Profile & Verified Badges ---
  // Displays the champion's profile information, stats,
  // and provides forms to update their settings.
  // -------------------------------------------------
  renderProfile() {
    const user = authSystem.getCurrentUser();

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Profile Settings</h1>
        <p class="dashboard-subtitle">Manage your Green Champion profile</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Profile Information</h3></div>
          <div class="card-body">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem; font-weight: 700;">
                ${user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style="margin-bottom: 0.5rem;">
                ${user.name}
                ${user.isVerified ? '<i class="fas fa-check-circle" style="color: var(--primary); margin-left: 0.5rem;" title="Verified Champion"></i>' : ''}
              </h3>
              <p style="color: var(--gray-600);">Green Champion</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Account Settings</h3></div>
          <div class="card-body">
            <form class="profile-form">
              <div class="form-group" style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name</label><input type="text" class="form-control" value="${user.name}"></div>
              <div class="form-group" style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address</label><input type="email" class="form-control" value="${user.email}"></div>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  // =================================================================================
  // Helper Methods for Specific Champion Actions
  // =================================================================================

  /**
   * Displays a modal for rating the resolution of a complaint.
   * @param {string} reportId The ID of the report to be rated.
   */
  rateWork(reportId) {
    const content = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Rate the Work Quality</h3>
        <p style="color: var(--gray-600);">How satisfied are you with the resolution of your report?</p>
      </div>
      <div class="rating-section" style="text-align: center; margin: 2rem 0;">
        <div class="star-rating" style="font-size: 2rem; color: var(--gray-300);">
          ${[1,2,3,4,5].map(star => 
            `<span class="star" data-rating="${star}" style="cursor: pointer; transition: color 0.2s; margin: 0 0.25rem;" 
              onmouseover="window.GreenChampionDashboard.hoverStar(${star})" 
              onclick="window.GreenChampionDashboard.selectRating(${star})">★</span>`
          ).join('')}
        </div>
        <div id="ratingText" style="margin-top: 1rem; color: var(--gray-600);">Select a rating</div>
      </div>
      <div class="form-group" style="margin: 2rem 0;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Additional Comments (Optional)</label>
        <textarea class="form-control" rows="4" placeholder="Share your feedback..."></textarea>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
        <button class="btn btn-primary" onclick="window.GreenChampionDashboard.submitRating('${reportId}')"><i class="fas fa-star"></i> Submit Rating</button>
      </div>
    `;
    modal.show('Rate Work Quality', content);
    this.currentRating = 0;
  }

  hoverStar(rating) {
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('ratingText');
    stars.forEach((star, index) => {
      star.style.color = index < rating ? 'var(--warning)' : 'var(--gray-300)';
    });
    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    ratingText.textContent = texts[rating] || 'Select a rating';
  }

  selectRating(rating) {
    this.currentRating = rating;
    this.hoverStar(rating);
  }

  submitRating(reportId) {
    if (this.currentRating === 0) {
      notifications.warning('Rating Required', 'Please select a star rating');
      return;
    }
    notifications.success('Rating Submitted', `Thank you! You earned 10 bonus Green Points.`);
    const currentUser = authSystem.getCurrentUser();
    if (currentUser) {
      currentUser.greenPoints = (currentUser.greenPoints || 0) + 10;
      authSystem.updateUserProfile(currentUser);
    }
    modal.hide();
    this.refresh();
  }

  /**
   * Handles the logic for redeeming a reward from the store.
   * @param {number} rewardId The ID of the reward.
   * @param {number} pointsCost The cost of the reward in Green Points.
   */
  redeemReward(rewardId, pointsCost) {
    const user = authSystem.getCurrentUser();
    const currentPoints = user.greenPoints || 0;
    if (currentPoints < pointsCost) {
      notifications.error('Insufficient Points', 'You do not have enough points for this reward.');
      return;
    }
    user.greenPoints = currentPoints - pointsCost;
    authSystem.updateUserProfile(user);
    notifications.success('Reward Redeemed!', `Your reward is on its way. ${pointsCost} points deducted.`);
    this.refresh();
  }

  /**
   * Binds any necessary event listeners for the current view.
   * (Placeholder for more complex interactions)
   */
  bindEvents() {
    // Add any event listeners specific to the green champion dashboard
  }

  /**
   * Refreshes the current section to reflect any data changes.
   */
  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export the dashboard instance for global access
window.GreenChampionDashboard = new GreenChampionDashboard();