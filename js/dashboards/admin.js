// Admin Dashboard
class AdminDashboard {
  constructor() {
    this.currentSection = 'dashboard';
  }

  loadSection(section) {
    this.currentSection = section;
    const content = document.getElementById('mainContent');

    switch (section) {
      case 'dashboard':
        content.innerHTML = this.renderDashboard();
        break;
    case 'workers':
        content.innerHTML = this.renderWorkers();
        break;
      case 'complaints':
        content.innerHTML = this.renderComplaints();
        break;
    case 'task-assignment':
        content.innerHTML = this.renderTaskAssignment();
        break;
    case 'vehicle-tracking':
      content.innerHTML = this.renderVehicleTracking();
      break;
      case 'training-status':
        content.innerHTML = this.renderTrainingStatus();
        break;
      case 'area-monitoring':
        content.innerHTML = this.renderAreaMonitoring();
        break;
      case 'heat-maps':
        content.innerHTML = this.renderHeatMaps();
        break;
      case 'vehicle-tracking':
        content.innerHTML = this.renderVehicleTracking();
        break;
    case 'revenue-analytics':
        content.innerHTML = this.renderRevenueAnalytics();
        break;
    case 'reports':
      content.innerHTML = this.renderRevenueAnalytics();
      break;
      case 'penalties':
        content.innerHTML = this.renderPenalties();
        break;
      case 'green-champions':
        content.innerHTML = this.renderGreenChampions();
        break;
      case 'salary-tracking':
        content.innerHTML = this.renderSalaryTracking();
        break;
      case 'user-management':
        content.innerHTML = this.renderUserManagement();
        break;
      case 'rewards-system': // Renamed from 'vouchers'
        content.innerHTML = this.renderRewardsSystem();
        break;
      case 'video-training':
        content.innerHTML = this.renderVideoTraining();
        break;
      case 'eco-facilities': // New Feature
        content.innerHTML = this.renderEcoFacilities();
        break;
      case 'e-marketplace': // New Feature
        content.innerHTML = this.renderEMarketplace();
        break;
      case 'profile':
        content.innerHTML = this.renderProfile();
        break;
      default:
        content.innerHTML = this.renderDashboard();
    }

    this.bindEvents();
  }

  renderDashboard() {
    const stats = MOCK_DATA.stats;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Admin Dashboard</h1>
        <p class="dashboard-subtitle">Operational management and oversight</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Total Complaints</span><div class="stat-icon primary"><i class="fas fa-exclamation-triangle"></i></div></div>
          <div class="stat-value">${stats.totalComplaints}</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +12% this month</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Resolved Complaints</span><div class="stat-icon success"><i class="fas fa-check-circle"></i></div></div>
          <div class="stat-value">${stats.resolvedComplaints}</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> 94.8% resolution rate</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Active Workers</span><div class="stat-icon primary"><i class="fas fa-hard-hat"></i></div></div>
          <div class="stat-value">${stats.activeWorkers}</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> 98% attendance today</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Green Champions</span><div class="stat-icon secondary"><i class="fas fa-users"></i></div></div>
          <div class="stat-value">${stats.greenChampions}</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +8 new this month</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Marketplace Revenue</span><div class="stat-icon warning"><i class="fas fa-rupee-sign"></i></div></div>
          <div class="stat-value">₹2.4L</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +15% this month</div>
        </div>
        <div class="stat-card">
          <div class="stat-header"><span class="stat-title">Training Completion</span><div class="stat-icon primary"><i class="fas fa-certificate"></i></div></div>
          <div class="stat-value">87%</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +5% improvement</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Issues & Complaints</h3>
            <button class="btn btn-primary" onclick="navigation.navigateTo('complaints')"><i class="fas fa-eye"></i> View All</button>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead><tr><th>ID</th><th>Area</th><th>Status</th><th>Priority</th><th>Actions</th></tr></thead>
                <tbody>
                  ${MOCK_DATA.complaints.slice(0, 5).map(complaint => `
                    <tr>
                      <td>${complaint.id}</td>
                      <td>${complaint.location}</td>
                      <td>${Utils.getStatusBadge(complaint.status)}</td>
                      <td>${Utils.getPriorityBadge(complaint.priority)}</td>
                      <td>
                        <button class="btn btn-ghost" onclick="window.AdminDashboard.assignComplaint('${complaint.id}')"><i class="fas fa-user-plus"></i></button>
                        <button class="btn btn-ghost" onclick="window.ComplaintManager.viewComplaint('${complaint.id}')"><i class="fas fa-eye"></i></button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Quick Actions</h3></div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.AdminDashboard.addWorker()"><i class="fas fa-user-plus"></i> Add Worker</button>
              <button class="btn btn-secondary" onclick="navigation.navigateTo('task-assignment')"><i class="fas fa-tasks"></i> Assign Tasks</button>
              <button class="btn btn-warning" onclick="navigation.navigateTo('e-marketplace')"><i class="fas fa-store"></i> Manage Marketplace</button>
              <button class="btn btn-info" onclick="navigation.navigateTo('eco-facilities')"><i class="fas fa-recycle"></i> Manage Eco-Facilities</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  generateAreaStats() {
    return [
      { area: 'Zone A', value: '95%', metric: 'Hygiene Score', icon: '🏆', color: 'success' },
      { area: 'Zone B', value: '87%', metric: 'Hygiene Score', icon: '⭐', color: 'primary' },
      { area: 'Zone C', value: '78%', metric: 'Hygiene Score', icon: '📈', color: 'warning' },
      { area: 'Zone D', value: '92%', metric: 'Hygiene Score', icon: '✅', color: 'success' }
    ];
  }

  renderWorkers() {
    // Unchanged from original
    const workers = [
        { id: 'W001', name: 'Carlos Garcia', area: 'Zone A', status: 'active', attendance: '98%', tasksToday: 5, rating: 4.8, lastLogin: '08:00 AM', phone: '+91 9876543210' },
        { id: 'W002', name: 'Maria Lopez', area: 'Zone B', status: 'active', attendance: '95%', tasksToday: 3, rating: 4.6, lastLogin: '08:15 AM', phone: '+91 9876543211' },
        { id: 'W003', name: 'Ahmed Hassan', area: 'Zone C', status: 'offline', attendance: '92%', tasksToday: 0, rating: 4.9, lastLogin: 'Yesterday', phone: '+91 9876543212' },
        { id: 'W004', name: 'Priya Patel', area: 'Zone A', status: 'active', attendance: '97%', tasksToday: 4, rating: 4.7, lastLogin: '07:45 AM', phone: '+91 9876543213' }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Worker Management</h1>
        <p class="dashboard-subtitle">Monitor and manage field workers</p>
        <button class="btn btn-primary" onclick="window.AdminDashboard.addWorker()"><i class="fas fa-user-plus"></i> Add New Worker</button>
      </div>
      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
            <div class="stat-header"><span class="stat-title">Total Workers</span><div class="stat-icon primary"><i class="fas fa-users"></i></div></div>
            <div class="stat-value">${workers.length}</div>
        </div>
        <div class="stat-card">
            <div class="stat-header"><span class="stat-title">Active Today</span><div class="stat-icon success"><i class="fas fa-user-check"></i></div></div>
            <div class="stat-value">${workers.filter(w => w.status === 'active').length}</div>
        </div>
        <div class="stat-card">
            <div class="stat-header"><span class="stat-title">Average Rating</span><div class="stat-icon warning"><i class="fas fa-star"></i></div></div>
            <div class="stat-value">${(workers.reduce((acc, w) => acc + w.rating, 0) / workers.length).toFixed(1)}</div>
        </div>
        <div class="stat-card">
            <div class="stat-header"><span class="stat-title">Tasks Today</span><div class="stat-icon secondary"><i class="fas fa-tasks"></i></div></div>
            <div class="stat-value">${workers.reduce((acc, w) => acc + w.tasksToday, 0)}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Worker Directory</h3>
          <div style="display: flex; gap: 1rem;">
            <select class="form-control" style="width: auto;" id="areaFilter">
              <option value="">All Areas</option><option value="Zone A">Zone A</option><option value="Zone B">Zone B</option><option value="Zone C">Zone C</option><option value="Zone D">Zone D</option>
            </select>
            <select class="form-control" style="width: auto;" id="statusFilter">
              <option value="">All Status</option><option value="active">Active</option><option value="offline">Offline</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Worker ID</th><th>Name</th><th>Area</th><th>Status</th><th>Training Certified</th><th>Rating</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${workers.map(worker => `
                  <tr>
                    <td>${worker.id}</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem;">${worker.name.charAt(0)}</div>
                        <div>
                          <div style="font-weight: 600;">${worker.name}</div>
                          <div style="font-size: 0.75rem; color: var(--gray-500);">${worker.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td>${worker.area}</td>
                    <td><span class="badge ${worker.status === 'active' ? 'badge-success' : 'badge-error'}">${worker.status === 'active' ? 'Active' : 'Offline'}</span></td>
                    <td><span class="badge ${worker.id === 'W003' ? 'badge-warning' : 'badge-success'}">${worker.id === 'W003' ? 'Pending' : 'Yes'} <i class="fas fa-certificate"></i></span></td>
                    <td><div style="display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-star" style="color: var(--warning);"></i> ${worker.rating}</div></td>
                    <td>
                      <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-ghost" onclick="window.AdminDashboard.viewWorkerProfile('${worker.id}')" title="View Profile"><i class="fas fa-user"></i></button>
                        <button class="btn btn-ghost" onclick="navigation.navigateTo('vehicle-tracking')" title="Track Location"><i class="fas fa-map-marker-alt"></i></button>
                        <button class="btn btn-ghost" onclick="window.AdminDashboard.editWorker('${worker.id}')" title="Edit"><i class="fas fa-edit"></i></button>
                      </div>
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
  
  renderComplaints() {
    // This now serves as the "Report & Track an Issue" module
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Issue & Complaint Management</h1>
        <p class="dashboard-subtitle">Review, assign, and track all citizen-reported issues</p>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Total Reports</span><div class="stat-icon primary"><i class="fas fa-list"></i></div></div><div class="stat-value">1,245</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Pending</span><div class="stat-icon warning"><i class="fas fa-clock"></i></div></div><div class="stat-value">65</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Resolved</span><div class="stat-icon success"><i class="fas fa-check"></i></div></div><div class="stat-value">1,180</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Avg Resolution Time</span><div class="stat-icon secondary"><i class="fas fa-stopwatch"></i></div></div><div class="stat-value">4.2h</div></div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">All Reported Issues</h3>
          <div style="display: flex; gap: 1rem;">
            <input type="search" class="form-control" placeholder="Search by ID or location...">
          </div>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead><tr><th><input type="checkbox" id="selectAll"></th><th>ID</th><th>Title</th><th>Area</th><th>Status</th><th>Submitted</th><th>Assigned To</th><th>Actions</th></tr></thead>
              <tbody id="complaintsTableBody">${this.generateComplaintsTable()}</tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" onclick="window.AdminDashboard.bulkAssign()"><i class="fas fa-tasks"></i> Bulk Assign Selected</button>
        </div>
      </div>
    `;
  }

  generateComplaintsTable() {
    // Unchanged from original
    const complaints = [...MOCK_DATA.complaints];
    for (let i = 0; i < 8; i++) {
      complaints.push(Utils.generateMockComplaint());
    }

    return complaints.map(complaint => `
      <tr>
        <td><input type="checkbox" class="complaint-checkbox" value="${complaint.id}"></td>
        <td>${complaint.id}</td><td>${complaint.title}</td><td>${complaint.location}</td>
        <td>${Utils.getStatusBadge(complaint.status)}</td>
        <td>${Utils.timeAgo(complaint.submittedAt)}</td>
        <td>${complaint.assignedTo || '<span style="color: var(--gray-400);">Unassigned</span>'}</td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-ghost" onclick="window.AdminDashboard.assignComplaint('${complaint.id}')" title="Assign"><i class="fas fa-user-plus"></i></button>
            <button class="btn btn-ghost" onclick="window.ComplaintManager.viewComplaint('${complaint.id}')" title="View"><i class="fas fa-eye"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderTaskAssignment() {
    // Unchanged from original
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Task Assignment</h1>
        <p class="dashboard-subtitle">Create and manage work assignments</p>
        <button class="btn btn-primary" onclick="window.AdminDashboard.createScheduledTask()"><i class="fas fa-plus"></i> Create Scheduled Task</button>
      </div>
      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Assigned Work</span><div class="stat-icon primary"><i class="fas fa-tasks"></i></div></div><div class="stat-value">45</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Work Completed</span><div class="stat-icon success"><i class="fas fa-check-circle"></i></div></div><div class="stat-value">38</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Work Not Done</span><div class="stat-icon error"><i class="fas fa-times-circle"></i></div></div><div class="stat-value">7</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Scheduled Tasks</span><div class="stat-icon secondary"><i class="fas fa-calendar"></i></div></div><div class="stat-value">12</div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Assignment Board</h3>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            <div class="assignment-column" style="background: var(--gray-50); border-radius: 8px; padding: 1rem;">
              <h4 style="margin-bottom: 1rem; color: var(--gray-700);"><i class="fas fa-clock" style="color: var(--warning);"></i> Pending (3)</h4>
              <div class="assignment-card" style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--warning);">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Clean Market Area</div>
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">Zone A • High Priority</div>
                <button class="btn btn-primary" style="width: 100%; font-size: 0.75rem; padding: 0.5rem; margin-top: 1rem;"><i class="fas fa-user-plus"></i> Assign Worker</button>
              </div>
            </div>
            <div class="assignment-column" style="background: var(--gray-50); border-radius: 8px; padding: 1rem;">
              <h4 style="margin-bottom: 1rem; color: var(--gray-700);"><i class="fas fa-play" style="color: var(--secondary);"></i> In Progress (5)</h4>
              <div class="assignment-card" style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--secondary);">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Garbage Collection Route 1</div>
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">Zone B • Medium Priority</div>
                <button class="btn btn-secondary" style="width: 100%; font-size: 0.75rem; padding: 0.5rem; margin-top: 1rem;"><i class="fas fa-eye"></i> Track Progress</button>
              </div>
            </div>
            <div class="assignment-column" style="background: var(--gray-50); border-radius: 8px; padding: 1rem;">
              <h4 style="margin-bottom: 1rem; color: var(--gray-700);"><i class="fas fa-check" style="color: var(--success);"></i> Completed (8)</h4>
              <div class="assignment-card" style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--success);">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Park Cleaning</div>
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">Zone C • Low Priority</div>
                <button class="btn btn-success" style="width: 100%; font-size: 0.75rem; padding: 0.5rem; margin-top: 1rem;"><i class="fas fa-check"></i> Approved</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderTrainingStatus() {
    // Enhanced for Mandatory Training feature
    const trainingData = [
      { role: 'Workers', total: 45, completed: 38, inProgress: 5, notStarted: 2 },
      { role: 'Green Champions', total: 123, completed: 98, inProgress: 15, notStarted: 10 },
      { role: 'Citizens', total: 1250, completed: 890, inProgress: 180, notStarted: 180 }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Mandatory Training & Certification</h1>
        <p class="dashboard-subtitle">Monitor training progress for access to app features.</p>
        <button class="btn btn-primary" onclick="navigation.navigateTo('video-training')"><i class="fas fa-video"></i> Manage Training Library</button>
      </div>
      
      <div class="card">
        <div class="card-header"><h3 class="card-title">Certification Progress by Role</h3></div>
        <div class="card-body">
          <div style="display: grid; gap: 2rem;">
            ${trainingData.map(data => `
              <div class="training-role-card" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <h4 style="margin: 0; color: var(--gray-800);">${data.role}</h4>
                  <span style="color: var(--gray-600); font-weight: bold;">${((data.completed / data.total) * 100).toFixed(0)}% Certified</span>
                </div>
                <div class="progress-bar" style="height: 12px; margin-bottom: 1rem;">
                  <div style="display: flex; height: 100%; border-radius: 6px; overflow: hidden;">
                    <div style="background: var(--success); width: ${(data.completed / data.total) * 100}%;" title="Completed"></div>
                    <div style="background: var(--warning); width: ${(data.inProgress / data.total) * 100}%;" title="In Progress"></div>
                    <div style="background: var(--gray-300); width: ${(data.notStarted / data.total) * 100}%;" title="Not Started"></div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
                  <div style="color: var(--success);"><b>${data.completed}</b> Certified</div>
                  <div style="color: var(--warning);"><b>${data.inProgress}</b> In Progress</div>
                  <div style="color: var(--error);"><b>${data.notStarted}</b> Not Started</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderAreaMonitoring() {
    // Unchanged from original
    const areas = [
      { name: 'Zone A', hygieneScore: 95, complaints: 12, resolved: 11, workers: 8, greenChampions: 15 },
      { name: 'Zone B', hygieneScore: 87, complaints: 18, resolved: 15, workers: 10, greenChampions: 12 },
      { name: 'Zone C', hygieneScore: 78, complaints: 25, resolved: 20, workers: 12, greenChampions: 18 },
      { name: 'Zone D', hygieneScore: 92, complaints: 8, resolved: 8, workers: 6, greenChampions: 10 }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Area Monitoring</h1>
        <p class="dashboard-subtitle">Monitor area-wise performance and segregation</p>
      </div>

      <div class="card">
        <div class="card-header"><h3 class="card-title">Area-wise Performance Dashboard</h3></div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            ${areas.map(area => `
              <div class="area-card" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; background: var(--white);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <h4 style="margin: 0;">${area.name}</h4>
                  <div style="text-align: right;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--${area.hygieneScore >= 90 ? 'success' : area.hygieneScore >= 80 ? 'warning' : 'error'});">${area.hygieneScore}%</div>
                    <div style="font-size: 0.75rem; color: var(--gray-600);">Hygiene Score</div>
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
                  <div style="text-align: center; padding: 0.75rem; background: var(--gray-50); border-radius: 6px;"><div style="font-weight: 600; color: var(--primary);">${area.complaints}</div><div style="font-size: 0.75rem;">Complaints</div></div>
                  <div style="text-align: center; padding: 0.75rem; background: var(--gray-50); border-radius: 6px;"><div style="font-weight: 600; color: var(--success);">${area.resolved}</div><div style="font-size: 0.75rem;">Resolved</div></div>
                  <div style="text-align: center; padding: 0.75rem; background: var(--gray-50); border-radius: 6px;"><div style="font-weight: 600; color: var(--secondary);">${area.workers}</div><div style="font-size: 0.75rem;">Workers</div></div>
                  <div style="text-align: center; padding: 0.75rem; background: var(--gray-50); border-radius: 6px;"><div style="font-weight: 600; color: var(--accent);">${area.greenChampions}</div><div style="font-size: 0.75rem;">Champions</div></div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn btn-ghost" style="flex: 1; font-size: 0.75rem;" onclick="window.AdminDashboard.viewAreaDetails('${area.name}')"><i class="fas fa-eye"></i> View Details</button>
                  <button class="btn btn-primary" style="flex: 1; font-size: 0.75rem;" onclick="window.AdminDashboard.manageArea('${area.name}')"><i class="fas fa-cog"></i> Manage</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  renderHeatMaps() {
    // Unchanged from original
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Heat Maps</h1>
        <p class="dashboard-subtitle">Visual representation of cleanliness zones and complaint density</p>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">City-wide Analytics Heat Map</h3>
          <div style="display: flex; gap: 1rem;">
            <select class="form-control" style="width: auto;"><option value="cleanliness">Cleanliness Level</option><option value="complaints">Complaint Density</option></select>
            <select class="form-control" style="width: auto;"><option value="today">Today</option><option value="week">This Week</option></select>
          </div>
        </div>
        <div class="card-body">
          <div class="map-container" style="height: 500px; position: relative;">
            <div class="map-placeholder">
              <i class="fas fa-map" style="font-size: 4rem; color: var(--gray-400); margin-bottom: 2rem;"></i>
              <h3>Interactive City Heat Map</h3>
              <p style="color: var(--gray-600); max-width: 500px; margin: 0 auto 2rem;">Red zones require immediate attention, while green zones are well-maintained.</p>
              <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 0.5rem;"><div style="width: 20px; height: 20px; background: #10B981; border-radius: 50%;"></div><span>Green Zones (25)</span></div>
                <div style="display: flex; align-items: center; gap: 0.5rem;"><div style="width: 20px; height: 20px; background: #F59E0B; border-radius: 50%;"></div><span>Yellow Zones (8)</span></div>
                <div style="display: flex; align-items: center; gap: 0.5rem;"><div style="width: 20px; height: 20px; background: #EF4444; border-radius: 50%;"></div><span>Red Zones (12)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderVehicleTracking() {
    // Enhanced for Smart Vehicle Tracking feature
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Smart Vehicle Tracking & Alerts</h1>
        <p class="dashboard-subtitle">Live vehicle monitoring and route management.</p>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Active Vehicles</span><div class="stat-icon primary"><i class="fas fa-truck"></i></div></div><div class="stat-value">12</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Routes Completed</span><div class="stat-icon success"><i class="fas fa-check-circle"></i></div></div><div class="stat-value">89/110</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">On Schedule</span><div class="stat-icon warning"><i class="fas fa-clock"></i></div></div><div class="stat-value">92%</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Alerts Sent</span><div class="stat-icon secondary"><i class="fas fa-bell"></i></div></div><div class="stat-value">450 Today</div></div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Live Vehicle Map</h3>
            <button class="btn btn-primary" onclick="window.AdminDashboard.refreshTracking()"><i class="fas fa-sync"></i> Refresh</button>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 400px;">
              <div class="map-placeholder">
                <i class="fas fa-map-marker-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                <h3>Real-time Vehicle Map</h3>
                <p style="color: var(--gray-600);">Live tracking of all garbage collection vehicles.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Vehicle Status</h3></div>
          <div class="card-body" style="padding: 0;">
            <div class="vehicle-list" style="max-height: 400px; overflow-y: auto;">
              ${[
                { id: 'GC-001', driver: 'Carlos Garcia', status: 'On Route', location: 'Zone A', capacity: '85%' },
                { id: 'GC-002', driver: 'Maria Lopez', status: 'On Route', location: 'Zone B', capacity: '60%' },
                { id: 'GC-003', driver: 'Ahmed Hassan', status: 'At Depot', location: 'Depot', capacity: '0%' },
                { id: 'GC-004', driver: 'Ravi Kumar', status: 'Delayed', location: 'Zone C', capacity: '75%' }
              ].map(vehicle => `
                <div class="vehicle-item" style="border-bottom: 1px solid var(--gray-200); padding: 1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <div style="font-weight: 600;">${vehicle.id}</div>
                    <span class="badge ${vehicle.status === 'On Route' ? 'badge-success' : 'badge-warning'}">${vehicle.status}</span>
                  </div>
                  <div style="font-size: 0.875rem; color: var(--gray-600);">Driver: ${vehicle.driver}</div>
                  <div class="progress-bar" style="height: 6px; margin-top: 0.5rem;">
                    <div style="background: var(--primary); width: ${vehicle.capacity}; height: 100%; border-radius: 3px;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderRevenueAnalytics() {
    // Unchanged from original
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Revenue Analytics</h1>
        <p class="dashboard-subtitle">E-commerce platform revenue and financial insights</p>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Total Revenue</span><div class="stat-icon primary"><i class="fas fa-rupee-sign"></i></div></div><div class="stat-value">₹2.4L</div><div class="stat-change positive"><i class="fas fa-arrow-up"></i> +15%</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Orders</span><div class="stat-icon success"><i class="fas fa-shopping-cart"></i></div></div><div class="stat-value">1,245</div><div class="stat-change positive"><i class="fas fa-arrow-up"></i> +8%</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Avg Order Value</span><div class="stat-icon warning"><i class="fas fa-chart-line"></i></div></div><div class="stat-value">₹193</div><div class="stat-change positive"><i class="fas fa-arrow-up"></i> +5%</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Customer Retention</span><div class="stat-icon secondary"><i class="fas fa-users"></i></div></div><div class="stat-value">78%</div><div class="stat-change positive"><i class="fas fa-arrow-up"></i> +3%</div></div>
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Revenue Trends</h3>
            <select class="form-control" style="width: auto;"><option>This Month</option><option>This Year</option></select>
          </div>
          <div class="card-body">
            <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: var(--gray-50); border-radius: 8px;">
              <div style="text-align: center; color: var(--gray-500);"><i class="fas fa-chart-area" style="font-size: 3rem; margin-bottom: 1rem;"></i><p>Revenue trend chart placeholder</p></div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Top Products</h3></div>
          <div class="card-body">
            <div class="product-list">
              ${[
                { name: 'Segregation Dustbin Set', revenue: '₹1.47L' },
                { name: 'Compost Bin', revenue: '₹1.70L' },
                { name: 'Biodegradable Bags', revenue: '₹1.13L' }
              ].map((product, index) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div><div style="font-weight: 600; font-size: 0.875rem;">${product.name}</div></div>
                  <div style="font-weight: 600; color: var(--success);">${product.revenue}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  renderPenalties() {
    // Unchanged from original
    const penalties = [
      { id: 'P001', area: 'Zone C', reason: 'Repeated complaint ignoring', amount: '₹5,000', status: 'pending', date: '2024-01-15' },
      { id: 'P002', area: 'Zone B', reason: 'Poor waste segregation', amount: '₹3,000', status: 'paid', date: '2024-01-12' },
      { id: 'P003', area: 'Zone A', reason: 'Delayed response time', amount: '₹2,000', status: 'disputed', date: '2024-01-10' }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Penalties Management</h1>
        <p class="dashboard-subtitle">Track penalties for consistently ignored complaints</p>
      </div>
      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Total Penalties</span><div class="stat-icon error"><i class="fas fa-gavel"></i></div></div><div class="stat-value">${penalties.length}</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Pending Amount</span><div class="stat-icon warning"><i class="fas fa-rupee-sign"></i></div></div><div class="stat-value">₹5,000</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Collected</span><div class="stat-icon success"><i class="fas fa-check-circle"></i></div></div><div class="stat-value">₹3,000</div></div>
        <div class="stat-card"><div class="stat-header"><span class="stat-title">Disputed</span><div class="stat-icon secondary"><i class="fas fa-question-circle"></i></div></div><div class="stat-value">₹2,000</div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Penalty Records</h3>
          <button class="btn btn-primary" onclick="window.AdminDashboard.generatePenaltyReport()"><i class="fas fa-file-alt"></i> Generate Report</button>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead><tr><th>Penalty ID</th><th>Area</th><th>Reason</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                ${penalties.map(penalty => `
                  <tr>
                    <td>${penalty.id}</td><td>${penalty.area}</td><td>${penalty.reason}</td>
                    <td style="font-weight: 600; color: var(--error);">${penalty.amount}</td>
                    <td><span class="badge ${penalty.status === 'paid' ? 'badge-success' : 'badge-warning'}">${Utils.capitalize(penalty.status)}</span></td>
                    <td>${penalty.date}</td>
                    <td>
                      <button class="btn btn-ghost" onclick="window.AdminDashboard.viewPenaltyDetails('${penalty.id}')" title="View Details"><i class="fas fa-eye"></i></button>
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
  
  renderGreenChampions() {
    // Enhanced for Green Champion Role feature
    const champions = [
        { id: 'GC001', name: 'Anjali Sharma', area: 'Zone A', points: 1250, reports: 15, verified: 12, lastActive: 'Today' },
        { id: 'GC002', name: 'Rohan Mehta', area: 'Zone B', points: 980, reports: 11, verified: 11, lastActive: 'Yesterday' },
        { id: 'GC003', name: 'Fatima Khan', area: 'Zone A', points: 1500, reports: 21, verified: 18, lastActive: 'Today' },
    ];
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">Green Champion Management</h1>
            <p class="dashboard-subtitle">Monitor profiles, reports, and activity of Green Champions.</p>
        </div>
        <div class="card">
            <div class="card-header"><h3 class="card-title">Champion Leaderboard</h3></div>
            <div class="card-body">
                <div class="table-container">
                    <table class="table">
                        <thead><tr><th>Champion ID</th><th>Name</th><th>Area</th><th>Green Points</th><th>Reports Filed</th><th>Reports Verified</th><th>Actions</th></tr></thead>
                        <tbody>
                        ${champions.map(c => `
                            <tr>
                                <td>${c.id}</td>
                                <td>${c.name}</td>
                                <td>${c.area}</td>
                                <td><i class="fas fa-star" style="color: var(--warning);"></i> ${c.points}</td>
                                <td>${c.reports}</td>
                                <td><span style="color: var(--success);">${c.verified}</span></td>
                                <td>
                                    <button class="btn btn-ghost" onclick="window.AdminDashboard.viewGreenChampionProfile('${c.id}')" title="View Profile"><i class="fas fa-user"></i></button>
                                    <button class="btn btn-ghost" onclick="window.AdminDashboard.viewChampionReports('${c.id}')" title="View Reports"><i class="fas fa-file-alt"></i></button>
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
    
  renderSalaryTracking() {
    // Unchanged from original
      const salaries = [
          { workerId: 'W001', name: 'Carlos Garcia', salary: '₹15,000', bonus: '₹500', net: '₹15,500', status: 'Paid' },
          { workerId: 'W002', name: 'Maria Lopez', salary: '₹15,000', bonus: '₹300', net: '₹15,300', status: 'Paid' },
          { workerId: 'W003', name: 'Ahmed Hassan', salary: '₹14,500', bonus: '₹0', net: '₹14,500', status: 'Pending' },
      ];
      return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">Salary Tracking</h1>
            <p class="dashboard-subtitle">Keep records of worker salaries and payments.</p>
        </div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Monthly Payroll</h3>
                <button class="btn btn-primary" onclick="window.AdminDashboard.processSalaries()"><i class="fas fa-cogs"></i> Process All Pending</button>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead><tr><th>Worker ID</th><th>Name</th><th>Base Salary</th><th>Bonus</th><th>Net Pay</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                    ${salaries.map(s => `
                        <tr>
                            <td>${s.workerId}</td>
                            <td>${s.name}</td>
                            <td>${s.salary}</td>
                            <td>${s.bonus}</td>
                            <td style="font-weight: 600;">${s.net}</td>
                            <td><span class="badge ${s.status === 'Paid' ? 'badge-success' : 'badge-warning'}">${s.status}</span></td>
                            <td><button class="btn btn-ghost" onclick="window.AdminDashboard.viewPayslip('${s.workerId}')"><i class="fas fa-file-invoice-dollar"></i></button></td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
      `;
  }
    
  renderUserManagement() {
    // Unchanged from original
      return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">User Management</h1>
            <p class="dashboard-subtitle">Overall monitoring of civilians and Green Champions.</p>
        </div>
        <div class="card">
            <div class="card-header"><h3 class="card-title">Civilian Users</h3></div>
            <div class="card-body"><p>A table listing all civilian users, their engagement scores, and area would be displayed here.</p></div>
        </div>
        <div style="margin-top: 2rem;">
            ${this.renderGreenChampions()}
        </div>
      `;
  }

  renderRewardsSystem() {
    // Replaces 'vouchers' with full Green Points & Rewards System
      const rewards = [
          { name: '₹50 Utility Bill Discount', points: 500, type: 'Discount' },
          { name: 'Local Cafe Voucher', points: 250, type: 'Voucher' },
          { name: 'Free Compost Bin', points: 1000, type: 'Product' }
      ];
      return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">Green Points & Rewards System</h1>
            <p class="dashboard-subtitle">Manage points, rewards, and redemptions.</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
            <div class="card">
                <div class="card-header"><h3 class="card-title">Leaderboard</h3></div>
                <div class="card-body"><p>Top Green Point earners would be listed here.</p></div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Rewards Catalog</h3>
                    <button class="btn btn-primary" onclick="window.AdminDashboard.addReward()"><i class="fas fa-plus"></i> Add Reward</button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead><tr><th>Reward Name</th><th>Points Cost</th><th>Type</th><th>Actions</th></tr></thead>
                        <tbody>
                        ${rewards.map(r => `
                            <tr>
                                <td>${r.name}</td>
                                <td><i class="fas fa-star" style="color: var(--warning);"></i> ${r.points}</td>
                                <td><span class="badge badge-info">${r.type}</span></td>
                                <td><button class="btn btn-ghost"><i class="fas fa-edit"></i></button></td>
                            </tr>
                        `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      `;
  }

  renderVideoTraining() {
    // Unchanged from original
      const videos = [
          { id: 'VT01', title: 'Effective Waste Segregation', for: 'Civilians', duration: '5:30' },
          { id: 'VT02', title: 'Safety Protocols for Workers', for: 'Workers', duration: '8:15' },
          { id: 'VT03', title: 'How to Start Composting', for: 'All Users', duration: '12:00' },
      ];
      return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">Video Training Library</h1>
            <p class="dashboard-subtitle">Manage training videos for all users.</p>
            <button class="btn btn-primary" onclick="window.AdminDashboard.addVideo()"><i class="fas fa-plus"></i> Upload New Video</button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
            ${videos.map(v => `
                <div class="card">
                    <div class="card-body" style="text-align: center;">
                        <i class="fas fa-video" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4 style="margin-bottom: 0.5rem;">${v.title}</h4>
                        <p style="color: var(--gray-600); margin-bottom: 1rem;">For: ${v.for} | ${v.duration}</p>
                        <button class="btn btn-secondary" onclick="window.AdminDashboard.editVideo('${v.id}')">Edit Details</button>
                    </div>
                </div>
            `).join('')}
        </div>
      `;
  }
    
  renderEcoFacilities() {
    // New feature: Eco-Facility Locator
    const facilities = [
        { id: 'EF01', name: 'Central Recycling Center', type: 'Recycling', area: 'Zone A', status: 'Online' },
        { id: 'EF02', name: 'East E-Waste Collection', type: 'E-Waste', area: 'Zone C', status: 'Online' },
        { id: 'EF03', name: 'West Biomethanization Plant', type: 'Biomethanization', area: 'Zone D', status: 'Offline' },
    ];
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">Eco-Facility Locator</h1>
            <p class="dashboard-subtitle">Manage locations for recycling, e-waste, etc.</p>
            <button class="btn btn-primary" onclick="window.AdminDashboard.addFacility()"><i class="fas fa-plus"></i> Add New Facility</button>
        </div>
        <div class="card">
            <div class="card-header"><h3 class="card-title">Facility Directory</h3></div>
            <div class="card-body">
                <div class="table-container">
                    <table class="table">
                        <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Area</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                        ${facilities.map(f => `
                            <tr>
                                <td>${f.id}</td><td>${f.name}</td>
                                <td><span class="badge badge-secondary">${f.type}</span></td><td>${f.area}</td>
                                <td><span class="badge ${f.status === 'Online' ? 'badge-success' : 'badge-error'}">${f.status}</span></td>
                                <td>
                                    <button class="btn btn-ghost" onclick="window.AdminDashboard.editFacility('${f.id}')"><i class="fas fa-edit"></i></button>
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

  renderEMarketplace() {
    // New feature: E-Marketplace
    const products = [
        { id: 'PROD01', name: 'Segregation Dustbin Set', price: '₹499', stock: 150, sales: 294 },
        { id: 'PROD02', name: 'Home Compost Kit', price: '₹899', stock: 80, sales: 189 },
        { id: 'PROD03', name: 'Biodegradable Bags (100pcs)', price: '₹120', stock: 500, sales: 940 },
    ];
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">E-Marketplace Management</h1>
            <p class="dashboard-subtitle">Manage products, inventory, and orders for eco-utilities.</p>
            <button class="btn btn-primary" onclick="window.AdminDashboard.addProduct()"><i class="fas fa-plus"></i> Add New Product</button>
        </div>
        <div class="card">
            <div class="card-header"><h3 class="card-title">Product Inventory</h3></div>
            <div class="card-body">
                <div class="table-container">
                    <table class="table">
                        <thead><tr><th>Product ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Total Sales</th><th>Actions</th></tr></thead>
                        <tbody>
                        ${products.map(p => `
                            <tr>
                                <td>${p.id}</td><td>${p.name}</td>
                                <td style="font-weight: 600;">${p.price}</td>
                                <td><span class="badge ${p.stock < 100 ? 'badge-warning' : 'badge-success'}">${p.stock}</span></td>
                                <td>${p.sales}</td>
                                <td>
                                    <button class="btn btn-ghost" onclick="window.AdminDashboard.editProduct('${p.id}')"><i class="fas fa-edit"></i></button>
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

  renderProfile() {
    // Unchanged from original
    const user = authSystem.getCurrentUser();

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Profile Settings</h1>
        <p class="dashboard-subtitle">Manage your account and preferences</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Profile Information</h3></div>
          <div class="card-body">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
                ${user.name.charAt(0).toUpperCase()}
              </div>
              <h3>${user.name}</h3>
              <p style="color: var(--gray-600);">${Utils.capitalize(user.role.replace('-', ' '))}</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Account Settings</h3></div>
          <div class="card-body">
            <form class="profile-form">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem;">Full Name</label>
                <input type="text" class="form-control" value="${user.name}">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem;">Email Address</label>
                <input type="email" class="form-control" value="${user.email}">
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Language Preference</label>
                  <select class="form-control">
                      <option>English</option><option>Hindi</option><option>Marathi</option>
                  </select>
              </div>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // --- Admin-specific methods ---

  addWorker() {
    const content = `
      <form class="add-worker-form">
        <div class="form-group" style="margin-bottom: 1rem;"><label>Full Name</label><input type="text" class="form-control" placeholder="Enter full name" required></div>
        <div class="form-group" style="margin-bottom: 1rem;"><label>Phone Number</label><input type="tel" class="form-control" placeholder="Enter phone number" required></div>
        <div class="form-group" style="margin-bottom: 1rem;"><label>Assigned Area</label><select class="form-control" required><option value="">Select Area</option><option value="Zone A">Zone A</option><option value="Zone B">Zone B</option></select></div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
          <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fas fa-user-plus"></i> Add Worker</button>
        </div>
      </form>
    `;
    modal.show('Add New Worker', content);
  }

  createScheduledTask() {
    const content = `
      <form class="scheduled-task-form">
        <div class="form-group" style="margin-bottom: 1rem;"><label>Task Title</label><input type="text" class="form-control" placeholder="Enter task title" required></div>
        <div class="form-group" style="margin-bottom: 1rem;"><label>Description</label><textarea class="form-control" rows="3" required></textarea></div>
        <div class="form-group" style="margin-bottom: 1rem;"><label>Scheduled Date</label><input type="date" class="form-control" required></div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
          <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fas fa-calendar-plus"></i> Schedule Task</button>
        </div>
      </form>
    `;
    modal.show('Create Scheduled Task', content);
  }

  // Placeholder methods for new functionalities
  viewGreenChampionProfile(id) { notifications.info('Profile', `Viewing profile for Green Champion ${id}.`); }
  viewChampionReports(id) { notifications.info('Reports', `Fetching reports filed by Green Champion ${id}.`); }
  processSalaries() { notifications.success('Payroll', 'Processing all pending salaries.'); }
  viewPayslip(workerId) { notifications.info('Payslip', `Generating payslip for worker ${workerId}.`); }
  addVideo() { notifications.info('Video Library', 'Opening form to upload a new training video.'); }
  editVideo(videoId) { notifications.info('Video Library', `Editing details for video ${videoId}.`); }
  addReward() { notifications.info('Rewards', 'Opening form to add a new reward to the catalog.'); }
  addFacility() { notifications.info('Eco-Facilities', 'Opening form to add a new facility.'); }
  editFacility(facilityId) { notifications.info('Eco-Facilities', `Editing details for facility ${facilityId}.`); }
  addProduct() { notifications.info('E-Marketplace', 'Opening form to add a new product.'); }
  editProduct(productId) { notifications.info('E-Marketplace', `Editing details for product ${productId}.`); }
    
  // Placeholder methods from original code
  assignComplaint(complaintId) { notifications.info('Assignment', `Opening assignment dialog for complaint ${complaintId}`); }
  // Enhanced: open ComplaintManager assignment modal
  assignComplaint(complaintId) {
    if (window.ComplaintManager && typeof window.ComplaintManager.showAssignmentModal === 'function') {
      window.ComplaintManager.showAssignmentModal(complaintId);
    } else {
      notifications.info('Assignment', `Opening assignment dialog for complaint ${complaintId}`);
    }
  }
  bulkAssign() {
    const selected = Array.from(document.querySelectorAll('.complaint-checkbox:checked')).map(cb => cb.value);
    if (selected.length === 0) {
      notifications.warning('Selection Required', 'Please select complaints to assign');
      return;
    }

    // Reuse ComplaintManager assignment modal, then apply to all selected
    if (window.ComplaintManager && typeof window.ComplaintManager.showAssignmentModal === 'function') {
      const originalConfirm = window.ComplaintManager.confirmAssignment?.bind(window.ComplaintManager);
      window.ComplaintManager.showAssignmentModal(selected[0]);
      // Monkey-patch confirm to bulk-assign using selected worker
      window.ComplaintManager.confirmAssignment = (firstId) => {
        if (!window.ComplaintManager.selectedWorker) {
          notifications.warning('Selection Required', 'Please select a worker to assign');
          return;
        }
        const workerName = window.ComplaintManager.selectedWorker.name;
        selected.forEach(id => window.ComplaintManager.assignComplaint(id, workerName));
        notifications.success('Bulk Assignment', `Assigned ${selected.length} complaints to ${workerName}`);
        modal.hide();
        if (window.currentDashboard && window.currentDashboard.refresh) {
          window.currentDashboard.refresh();
        }
        // restore original
        if (originalConfirm) window.ComplaintManager.confirmAssignment = originalConfirm;
      };
    } else {
      notifications.success('Bulk Assignment', `Processing ${selected.length} complaint assignments`);
    }
  }
  approveComplaint(complaintId) { notifications.success('Approved', `Complaint ${complaintId} has been approved and closed`); }
  sendAlert() { notifications.info('Alert Sent', 'Emergency alert sent to all active workers'); }
  viewWorkerProfile(workerId) { notifications.info('Worker Profile', `Viewing profile for worker ${workerId}`); }
  assignTask(workerId) { notifications.info('Task Assignment', `Assigning new task to worker ${workerId}`); }
  trackWorker(workerId) { notifications.info('Worker Tracking', `Tracking location for worker ${workerId}`); }
  editWorker(workerId) { notifications.info('Edit Worker', `Opening edit form for worker ${workerId}`); }
  viewAreaDetails(areaName) { notifications.info('Area Details', `Viewing detailed information for ${areaName}`); }
  manageArea(areaName) { notifications.info('Area Management', `Opening management panel for ${areaName}`); }
  refreshTracking() { notifications.info('Tracking Refresh', 'Refreshing vehicle tracking data...'); }
  generatePenaltyReport() { notifications.success('Report Generated', 'Penalty report is ready for download'); }
  viewPenaltyDetails(penaltyId) { notifications.info('Penalty Details', `Viewing details for penalty ${penaltyId}`); }
  markPenaltyPaid(penaltyId) { notifications.success('Payment Recorded', `Penalty ${penaltyId} has been marked as paid`); }
  exportComplaints() { notifications.success('Export Complete', 'Complaints data has been exported to CSV'); }

  bindEvents() {
    if (this.currentSection === 'complaints') {
      const selectAllCheckbox = document.getElementById('selectAll');
      if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
          document.querySelectorAll('.complaint-checkbox').forEach(cb => cb.checked = e.target.checked);
        });
      }
    }
  }

  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export
window.AdminDashboard = new AdminDashboard();