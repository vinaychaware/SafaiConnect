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
      case 'complaints':
        content.innerHTML = this.renderComplaints();
        break;
      case 'workforce':
        content.innerHTML = this.renderWorkforce();
        break;
      case 'assignments':
        content.innerHTML = this.renderAssignments();
        break;
      case 'reports':
        content.innerHTML = this.renderReports();
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

  renderDashboard() {
    const user = authSystem.getCurrentUser();
    
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Admin Dashboard</h1>
        <p class="dashboard-subtitle">Welcome back, ${user.name}! Manage your waste management operations</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Total Complaints</span>
            <div class="stat-icon primary">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          <div class="stat-value">1,245</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +12% from last month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Resolved Issues</span>
            <div class="stat-icon success">
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
          <div class="stat-value">1,180</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            94.8% resolution rate
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Active Workers</span>
            <div class="stat-icon secondary">
              <i class="fas fa-users"></i>
            </div>
          </div>
          <div class="stat-value">45</div>
          <div class="stat-change positive">
            <i class="fas fa-user-plus"></i>
            3 new this week
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Citizen Satisfaction</span>
            <div class="stat-icon warning">
              <i class="fas fa-star"></i>
            </div>
          </div>
          <div class="stat-value">4.6</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +0.3 this month
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Complaints</h3>
            <button class="btn btn-primary" onclick="navigation.navigateTo('complaints')">
              <i class="fas fa-eye"></i>
              View All
            </button>
          </div>
          <div class="card-body">
            ${this.renderRecentComplaints()}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quick Actions</h3>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="navigation.navigateTo('assignments')">
                <i class="fas fa-tasks"></i>
                Assign Tasks
              </button>
              <button class="btn btn-secondary" onclick="navigation.navigateTo('workforce')">
                <i class="fas fa-users"></i>
                Manage Workers
              </button>
              <button class="btn btn-info" onclick="navigation.navigateTo('reports')">
                <i class="fas fa-chart-bar"></i>
                View Reports
              </button>
              <button class="btn btn-success" onclick="window.AdminDashboard.generateReport()">
                <i class="fas fa-download"></i>
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Performance Overview</h3>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 300px;">
              <div class="map-placeholder">
                <i class="fas fa-chart-area" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                <p>Performance analytics and city-wide statistics</p>
                <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                  <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">94.8%</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Resolution Rate</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">2.3 hrs</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Avg Response Time</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning);">4.6/5</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Citizen Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderRecentComplaints() {
    const complaints = [
      { id: 'C001', title: 'Overflowing bin on Main Street', status: 'pending', priority: 'high', time: '2 hours ago' },
      { id: 'C002', title: 'Missed garbage collection', status: 'assigned', priority: 'medium', time: '4 hours ago' },
      { id: 'C003', title: 'Illegal dumping in park', status: 'in_progress', priority: 'high', time: '6 hours ago' }
    ];

    return `
      <div class="complaints-list">
        ${complaints.map(complaint => `
          <div class="complaint-item" style="display: flex; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
            <div style="flex: 1;">
              <div style="font-weight: 600; margin-bottom: 0.25rem;">${complaint.title}</div>
              <div style="display: flex; gap: 1rem; align-items: center;">
                ${Utils.getStatusBadge(complaint.status)}
                ${Utils.getPriorityBadge(complaint.priority)}
                <span style="font-size: 0.875rem; color: var(--gray-500);">${complaint.time}</span>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-ghost" onclick="window.ComplaintManager.viewComplaint('${complaint.id}')" title="View Details">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-ghost" onclick="window.AdminDashboard.assignComplaint('${complaint.id}')" title="Assign Worker">
                <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderComplaints() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Complaint Management</h1>
        <p class="dashboard-subtitle">Monitor and manage citizen complaints</p>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Pending</span>
            <div class="stat-icon warning">
              <i class="fas fa-clock"></i>
            </div>
          </div>
          <div class="stat-value">65</div>
          <div class="stat-change negative">
            <i class="fas fa-arrow-up"></i>
            Needs attention
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">In Progress</span>
            <div class="stat-icon secondary">
              <i class="fas fa-spinner"></i>
            </div>
          </div>
          <div class="stat-value">128</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-down"></i>
            Being resolved
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Resolved Today</span>
            <div class="stat-icon success">
              <i class="fas fa-check"></i>
            </div>
          </div>
          <div class="stat-value">42</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Great progress
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">All Complaints</h3>
          <div style="display: flex; gap: 1rem;">
            <select class="form-control" style="width: auto;">
              <option>All Status</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <select class="form-control" style="width: auto;">
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Submitted</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.generateComplaintRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  generateComplaintRows() {
    const complaints = [
      { id: 'C001', title: 'Overflowing bin on Main Street', location: 'Main Street Market', status: 'pending', priority: 'high', submitted: '2024-01-15', assignedTo: null },
      { id: 'C002', title: 'Missed garbage collection', location: 'Green Valley Apartments', status: 'assigned', priority: 'medium', submitted: '2024-01-14', assignedTo: 'Worker001' },
      { id: 'C003', title: 'Illegal dumping in park', location: 'Central Park', status: 'in_progress', priority: 'high', submitted: '2024-01-13', assignedTo: 'Worker002' },
      { id: 'C004', title: 'Broken waste container', location: 'School Area', status: 'completed', priority: 'low', submitted: '2024-01-12', assignedTo: 'Worker003' }
    ];

    return complaints.map(complaint => `
      <tr>
        <td>${complaint.id}</td>
        <td>${complaint.title}</td>
        <td>${complaint.location}</td>
        <td>${Utils.getStatusBadge(complaint.status)}</td>
        <td>${Utils.getPriorityBadge(complaint.priority)}</td>
        <td>${complaint.submitted}</td>
        <td>${complaint.assignedTo || '<span style="color: var(--gray-400);">Unassigned</span>'}</td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-ghost" onclick="window.ComplaintManager.viewComplaint('${complaint.id}')" title="View">
              <i class="fas fa-eye"></i>
            </button>
            ${complaint.status === 'pending' ? `
              <button class="btn btn-ghost" onclick="window.AdminDashboard.assignComplaint('${complaint.id}')" title="Assign">
                <i class="fas fa-user-plus"></i>
              </button>
            ` : ''}
            ${complaint.status === 'completed' ? `
              <button class="btn btn-ghost" onclick="window.AdminDashboard.approveComplaint('${complaint.id}')" title="Approve">
                <i class="fas fa-check"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderWorkforce() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Workforce Management</h1>
        <p class="dashboard-subtitle">Manage workers and their assignments</p>
        <button class="btn btn-primary" onclick="window.AdminDashboard.addWorker()">
          <i class="fas fa-user-plus"></i>
          Add New Worker
        </button>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Total Workers</span>
            <div class="stat-icon primary">
              <i class="fas fa-users"></i>
            </div>
          </div>
          <div class="stat-value">45</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            3 new this month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">On Duty</span>
            <div class="stat-icon success">
              <i class="fas fa-user-check"></i>
            </div>
          </div>
          <div class="stat-value">38</div>
          <div class="stat-change positive">
            <i class="fas fa-clock"></i>
            84% attendance
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Avg Performance</span>
            <div class="stat-icon warning">
              <i class="fas fa-star"></i>
            </div>
          </div>
          <div class="stat-value">4.2</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Excellent
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Worker Directory</h3>
          <div style="display: flex; gap: 1rem;">
            <input type="text" class="form-control" placeholder="Search workers..." style="width: 250px;">
            <select class="form-control" style="width: auto;">
              <option>All Zones</option>
              <option>Zone A</option>
              <option>Zone B</option>
              <option>Zone C</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Worker ID</th>
                  <th>Name</th>
                  <th>Zone</th>
                  <th>Status</th>
                  <th>Tasks Completed</th>
                  <th>Rating</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.generateWorkerRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  generateWorkerRows() {
    const workers = [
      { id: 'W001', name: 'Carlos Garcia', zone: 'Zone A', status: 'on_duty', tasks: 247, rating: 4.8, lastActive: '2 min ago' },
      { id: 'W002', name: 'Maria Lopez', zone: 'Zone B', status: 'on_duty', tasks: 189, rating: 4.6, lastActive: '5 min ago' },
      { id: 'W003', name: 'Ahmed Hassan', zone: 'Zone C', status: 'off_duty', tasks: 156, rating: 4.3, lastActive: '2 hours ago' },
      { id: 'W004', name: 'Priya Patel', zone: 'Zone A', status: 'on_duty', tasks: 203, rating: 4.7, lastActive: '1 min ago' }
    ];

    return workers.map(worker => `
      <tr>
        <td>${worker.id}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem;">
              ${worker.name.charAt(0)}
            </div>
            ${worker.name}
          </div>
        </td>
        <td>${worker.zone}</td>
        <td>
          <span class="badge ${worker.status === 'on_duty' ? 'badge-success' : 'badge-warning'}">
            ${worker.status === 'on_duty' ? 'On Duty' : 'Off Duty'}
          </span>
        </td>
        <td>${worker.tasks}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: var(--warning);">★</span>
            <span style="font-weight: 600;">${worker.rating}</span>
          </div>
        </td>
        <td>${worker.lastActive}</td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-ghost" onclick="window.AdminDashboard.viewWorker('${worker.id}')" title="View Profile">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-ghost" onclick="window.AdminDashboard.assignTask('${worker.id}')" title="Assign Task">
              <i class="fas fa-tasks"></i>
            </button>
            <button class="btn btn-ghost" onclick="window.AdminDashboard.contactWorker('${worker.id}')" title="Contact">
              <i class="fas fa-phone"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderAssignments() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Task Assignments</h1>
        <p class="dashboard-subtitle">Assign and monitor worker tasks</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Unassigned Complaints</h3>
          </div>
          <div class="card-body">
            <div style="max-height: 400px; overflow-y: auto;">
              ${this.renderUnassignedComplaints()}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Available Workers</h3>
          </div>
          <div class="card-body">
            <div style="max-height: 400px; overflow-y: auto;">
              ${this.renderAvailableWorkers()}
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Active Assignments</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Description</th>
                    <th>Assigned To</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.generateAssignmentRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderUnassignedComplaints() {
    const complaints = [
      { id: 'C005', title: 'Overflowing bin near school', priority: 'high', location: 'School Street' },
      { id: 'C006', title: 'Illegal dumping reported', priority: 'medium', location: 'Park Avenue' },
      { id: 'C007', title: 'Missed collection route', priority: 'low', location: 'Residential Area' }
    ];

    return complaints.map(complaint => `
      <div class="complaint-assignment-item" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 0.5rem;">
          <h4 style="margin-bottom: 0.25rem;">${complaint.title}</h4>
          ${Utils.getPriorityBadge(complaint.priority)}
        </div>
        <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 1rem;">
          <i class="fas fa-map-marker-alt"></i> ${complaint.location}
        </p>
        <button class="btn btn-primary" onclick="window.AdminDashboard.showAssignmentModal('${complaint.id}')">
          <i class="fas fa-user-plus"></i>
          Assign Worker
        </button>
      </div>
    `).join('');
  }

  renderAvailableWorkers() {
    const workers = [
      { id: 'W001', name: 'Carlos Garcia', zone: 'Zone A', currentTasks: 2, rating: 4.8 },
      { id: 'W002', name: 'Maria Lopez', zone: 'Zone B', currentTasks: 1, rating: 4.6 },
      { id: 'W004', name: 'Priya Patel', zone: 'Zone A', currentTasks: 3, rating: 4.7 }
    ];

    return workers.map(worker => `
      <div class="worker-assignment-item" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
            ${worker.name.charAt(0)}
          </div>
          <div style="flex: 1;">
            <h4 style="margin-bottom: 0.25rem;">${worker.name}</h4>
            <div style="font-size: 0.875rem; color: var(--gray-600);">${worker.zone}</div>
          </div>
        </div>
        <div style="display: flex; justify-content: between; align-items: center;">
          <div style="font-size: 0.875rem; color: var(--gray-600);">
            ${worker.currentTasks} active tasks • ★ ${worker.rating}
          </div>
          <span class="badge badge-success">Available</span>
        </div>
      </div>
    `).join('');
  }

  generateAssignmentRows() {
    const assignments = [
      { id: 'T001', description: 'Clean overflowing bin', assignedTo: 'Carlos Garcia', priority: 'high', status: 'in_progress', dueDate: '2024-01-16' },
      { id: 'T002', description: 'Garbage collection Route A', assignedTo: 'Maria Lopez', priority: 'medium', status: 'assigned', dueDate: '2024-01-16' },
      { id: 'T003', description: 'Remove illegal dumping', assignedTo: 'Ahmed Hassan', priority: 'high', status: 'completed', dueDate: '2024-01-15' }
    ];

    return assignments.map(assignment => `
      <tr>
        <td>${assignment.id}</td>
        <td>${assignment.description}</td>
        <td>${assignment.assignedTo}</td>
        <td>${Utils.getPriorityBadge(assignment.priority)}</td>
        <td>${Utils.getStatusBadge(assignment.status)}</td>
        <td>${assignment.dueDate}</td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-ghost" onclick="window.AdminDashboard.viewAssignment('${assignment.id}')" title="View">
              <i class="fas fa-eye"></i>
            </button>
            ${assignment.status === 'completed' ? `
              <button class="btn btn-ghost" onclick="window.AdminDashboard.approveTask('${assignment.id}')" title="Approve">
                <i class="fas fa-check"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderReports() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Reports & Analytics</h1>
        <p class="dashboard-subtitle">Comprehensive system performance reports</p>
        <button class="btn btn-primary" onclick="window.AdminDashboard.generateReport()">
          <i class="fas fa-download"></i>
          Generate Report
        </button>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">This Month</span>
            <div class="stat-icon primary">
              <i class="fas fa-calendar"></i>
            </div>
          </div>
          <div class="stat-value">1,245</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Total complaints
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Resolution Rate</span>
            <div class="stat-icon success">
              <i class="fas fa-percentage"></i>
            </div>
          </div>
          <div class="stat-value">94.8%</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +2.3% from last month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Avg Response Time</span>
            <div class="stat-icon warning">
              <i class="fas fa-clock"></i>
            </div>
          </div>
          <div class="stat-value">2.3h</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-down"></i>
            -0.5h improvement
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Worker Efficiency</span>
            <div class="stat-icon secondary">
              <i class="fas fa-chart-line"></i>
            </div>
          </div>
          <div class="stat-value">87%</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Excellent performance
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Monthly Trends</h3>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 300px;">
              <div class="map-placeholder">
                <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                <p>Monthly complaint and resolution trends</p>
                <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem;">
                  <span class="badge badge-info">Jan: 1,245</span>
                  <span class="badge badge-success">Resolved: 1,180</span>
                  <span class="badge badge-warning">Pending: 65</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Zone Performance</h3>
          </div>
          <div class="card-body">
            <div class="zone-performance">
              ${['Zone A', 'Zone B', 'Zone C'].map(zone => `
                <div style="margin-bottom: 1.5rem;">
                  <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-weight: 600;">${zone}</span>
                    <span style="font-size: 0.875rem; color: var(--gray-600);">${Math.floor(Math.random() * 20) + 80}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.floor(Math.random() * 20) + 80}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderTraining() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Training Management</h1>
        <p class="dashboard-subtitle">Monitor and manage training programs</p>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Active Programs</span>
            <div class="stat-icon primary">
              <i class="fas fa-graduation-cap"></i>
            </div>
          </div>
          <div class="stat-value">12</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            3 new this month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Completion Rate</span>
            <div class="stat-icon success">
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
          <div class="stat-value">89%</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Excellent engagement
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Certificates Issued</span>
            <div class="stat-icon warning">
              <i class="fas fa-certificate"></i>
            </div>
          </div>
          <div class="stat-value">156</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            This month
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Training Programs</h3>
          <button class="btn btn-primary" onclick="window.AdminDashboard.createTrainingProgram()">
            <i class="fas fa-plus"></i>
            Create Program
          </button>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Program Name</th>
                  <th>Target Role</th>
                  <th>Duration</th>
                  <th>Enrolled</th>
                  <th>Completed</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Safety Protocols</td>
                  <td>Workers</td>
                  <td>30 min</td>
                  <td>45</td>
                  <td>38</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-ghost" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-ghost" title="Edit"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>Community Leadership</td>
                  <td>Green Champions</td>
                  <td>45 min</td>
                  <td>23</td>
                  <td>19</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-ghost" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-ghost" title="Edit"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>Waste Segregation</td>
                  <td>Citizens</td>
                  <td>15 min</td>
                  <td>234</td>
                  <td>198</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-ghost" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-ghost" title="Edit"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  renderProfile() {
    const user = authSystem.getCurrentUser();
    
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Admin Profile</h1>
        <p class="dashboard-subtitle">Manage your administrator account</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Profile Information</h3>
          </div>
          <div class="card-body">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem; font-weight: 700;">
                ${user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style="margin-bottom: 0.5rem;">${user.name}</h3>
              <p style="color: var(--gray-600);">System Administrator</p>
            </div>
            <div class="profile-stats">
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Employee ID:</span>
                <strong>ADM-001</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Department:</span>
                <strong>Operations</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Access Level:</span>
                <strong>Administrator</strong>
              </div>
              <div style="display: flex; justify-content: between;">
                <span>Last Login:</span>
                <strong>Today, 9:30 AM</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Account Settings</h3>
          </div>
          <div class="card-body">
            <form class="profile-form">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name</label>
                <input type="text" class="form-control" value="${user.name}">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address</label>
                <input type="email" class="form-control" value="${user.email}">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
                <input type="tel" class="form-control" placeholder="Enter phone number">
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Department</label>
                <select class="form-control">
                  <option>Operations</option>
                  <option>Management</option>
                  <option>Technical</option>
                </select>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-save"></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // Admin-specific methods
  assignComplaint(complaintId) {
    window.ComplaintManager.showAssignmentModal(complaintId);
  }

  approveComplaint(complaintId) {
    window.ComplaintManager.approveComplaint(complaintId);
    notifications.success('Complaint Approved', 'Complaint has been verified and citizen points awarded');
    this.refresh();
  }

  showAssignmentModal(complaintId) {
    window.ComplaintManager.showAssignmentModal(complaintId);
  }

  addWorker() {
    const content = `
      <form class="add-worker-form">
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name</label>
          <input type="text" class="form-control" placeholder="Enter worker name" required>
        </div>
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address</label>
          <input type="email" class="form-control" placeholder="Enter email address" required>
        </div>
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
          <input type="tel" class="form-control" placeholder="Enter phone number" required>
        </div>
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Assigned Zone</label>
          <select class="form-control" required>
            <option value="">Select zone</option>
            <option value="Zone A">Zone A</option>
            <option value="Zone B">Zone B</option>
            <option value="Zone C">Zone C</option>
          </select>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
          <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-user-plus"></i>
            Add Worker
          </button>
        </div>
      </form>
    `;

    modal.show('Add New Worker', content);
  }

  viewWorker(workerId) {
    notifications.info('Worker Profile', `Viewing profile for worker ${workerId}`);
  }

  assignTask(workerId) {
    notifications.info('Task Assignment', `Assigning task to worker ${workerId}`);
  }

  contactWorker(workerId) {
    notifications.info('Contact Worker', `Contacting worker ${workerId}`);
  }

  generateReport() {
    notifications.info('Generating Report', 'Your comprehensive report is being prepared...');
    
    setTimeout(() => {
      notifications.success('Report Ready', 'Your report has been generated and is ready for download');
    }, 3000);
  }

  createTrainingProgram() {
    notifications.info('Create Program', 'Opening training program creation wizard...');
  }

  viewAssignment(assignmentId) {
    notifications.info('Assignment Details', `Viewing details for assignment ${assignmentId}`);
  }

  approveTask(assignmentId) {
    notifications.success('Task Approved', `Assignment ${assignmentId} has been approved and completed`);
    this.refresh();
  }

  bindEvents() {
    // Bind any specific events for the current section
  }

  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export
window.AdminDashboard = new AdminDashboard();