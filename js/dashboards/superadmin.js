// Superadmin Dashboard
class SuperadminDashboard {
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
      case 'analytics':
        content.innerHTML = this.renderAnalytics();
        break;
      case 'system-management':
        content.innerHTML = this.renderSystemManagement();
        break;
      case 'reports':
        content.innerHTML = this.renderReports();
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
        <h1 class="dashboard-title">Superadmin Dashboard</h1>
        <p class="dashboard-subtitle">Welcome back, ${user.name}! System overview and management</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Total Users</span>
            <div class="stat-icon primary">
              <i class="fas fa-users"></i>
            </div>
          </div>
          <div class="stat-value">2,847</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +156 this month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">System Uptime</span>
            <div class="stat-icon success">
              <i class="fas fa-server"></i>
            </div>
          </div>
          <div class="stat-value">99.9%</div>
          <div class="stat-change positive">
            <i class="fas fa-check"></i>
            Excellent performance
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Active Zones</span>
            <div class="stat-icon secondary">
              <i class="fas fa-map"></i>
            </div>
          </div>
          <div class="stat-value">12</div>
          <div class="stat-change positive">
            <i class="fas fa-plus"></i>
            2 new zones added
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Revenue</span>
            <div class="stat-icon warning">
              <i class="fas fa-rupee-sign"></i>
            </div>
          </div>
          <div class="stat-value">₹2.4M</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +18% growth
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">System Health</h3>
            <button class="btn btn-primary" onclick="navigation.navigateTo('system-management')">
              <i class="fas fa-cogs"></i>
              Manage System
            </button>
          </div>
          <div class="card-body">
            ${this.renderSystemHealth()}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quick Actions</h3>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="navigation.navigateTo('analytics')">
                <i class="fas fa-chart-bar"></i>
                View Analytics
              </button>
              <button class="btn btn-secondary" onclick="window.SuperadminDashboard.manageUsers()">
                <i class="fas fa-users-cog"></i>
                Manage Users
              </button>
              <button class="btn btn-info" onclick="window.SuperadminDashboard.systemBackup()">
                <i class="fas fa-database"></i>
                System Backup
              </button>
              <button class="btn btn-warning" onclick="window.SuperadminDashboard.maintenanceMode()">
                <i class="fas fa-tools"></i>
                Maintenance Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Global Performance Metrics</h3>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 350px;">
              <div class="map-placeholder">
                <i class="fas fa-globe" style="font-size: 4rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 1rem;">System-wide Performance Dashboard</h3>
                <p style="color: var(--gray-600); margin-bottom: 2rem;">
                  Real-time monitoring of all zones and operations
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; max-width: 600px; margin: 0 auto;">
                  <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">2,847</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Total Users</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">1,245</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Active Complaints</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning);">156</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Active Workers</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--secondary);">12</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Zones</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSystemHealth() {
    const healthMetrics = [
      { name: 'Database', status: 'healthy', value: '99.9%', icon: 'database' },
      { name: 'API Services', status: 'healthy', value: '100%', icon: 'server' },
      { name: 'Storage', status: 'warning', value: '78%', icon: 'hdd' },
      { name: 'Network', status: 'healthy', value: '99.5%', icon: 'network-wired' }
    ];

    return `
      <div class="system-health">
        ${healthMetrics.map(metric => `
          <div class="health-metric" style="display: flex; align-items: center; justify-content: between; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 40px; height: 40px; border-radius: 8px; background: ${metric.status === 'healthy' ? 'var(--success)' : 'var(--warning)'}; display: flex; align-items: center; justify-content: center; color: white;">
                <i class="fas fa-${metric.icon}"></i>
              </div>
              <div>
                <div style="font-weight: 600; margin-bottom: 0.25rem;">${metric.name}</div>
                <div style="font-size: 0.875rem; color: var(--gray-600);">
                  <span class="badge ${metric.status === 'healthy' ? 'badge-success' : 'badge-warning'}">
                    ${metric.status === 'healthy' ? 'Healthy' : 'Warning'}
                  </span>
                </div>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.25rem; font-weight: 700; color: ${metric.status === 'healthy' ? 'var(--success)' : 'var(--warning)'};">
                ${metric.value}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderAnalytics() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">System Analytics</h1>
        <p class="dashboard-subtitle">Comprehensive system performance and usage analytics</p>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Daily Active Users</span>
            <div class="stat-icon primary">
              <i class="fas fa-users"></i>
            </div>
          </div>
          <div class="stat-value">1,847</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +12% from yesterday
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">API Requests</span>
            <div class="stat-icon secondary">
              <i class="fas fa-exchange-alt"></i>
            </div>
          </div>
          <div class="stat-value">45.2K</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Today
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Storage Used</span>
            <div class="stat-icon warning">
              <i class="fas fa-hdd"></i>
            </div>
          </div>
          <div class="stat-value">78%</div>
          <div class="stat-change negative">
            <i class="fas fa-exclamation-triangle"></i>
            Monitor closely
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Response Time</span>
            <div class="stat-icon success">
              <i class="fas fa-tachometer-alt"></i>
            </div>
          </div>
          <div class="stat-value">245ms</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-down"></i>
            Excellent
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">User Growth Trends</h3>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 300px;">
              <div class="map-placeholder">
                <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                <p>User registration and activity trends over time</p>
                <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem;">
                  <span class="badge badge-primary">Citizens: 2,234</span>
                  <span class="badge badge-secondary">Workers: 156</span>
                  <span class="badge badge-success">Champions: 89</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">System Performance</h3>
          </div>
          <div class="card-body">
            <div class="performance-metrics">
              <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 600;">CPU Usage</span>
                  <span style="font-size: 0.875rem; color: var(--gray-600);">45%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 45%; background: var(--success);"></div>
                </div>
              </div>
              
              <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 600;">Memory Usage</span>
                  <span style="font-size: 0.875rem; color: var(--gray-600);">67%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 67%; background: var(--warning);"></div>
                </div>
              </div>
              
              <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 600;">Disk Usage</span>
                  <span style="font-size: 0.875rem; color: var(--gray-600);">78%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 78%; background: var(--error);"></div>
                </div>
              </div>
              
              <div>
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 600;">Network I/O</span>
                  <span style="font-size: 0.875rem; color: var(--gray-600);">23%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 23%; background: var(--success);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Zone-wise Analytics</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Zone</th>
                    <th>Active Users</th>
                    <th>Complaints</th>
                    <th>Resolution Rate</th>
                    <th>Worker Efficiency</th>
                    <th>Satisfaction Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Zone A</td>
                    <td>847</td>
                    <td>234</td>
                    <td><span class="badge badge-success">96%</span></td>
                    <td><span class="badge badge-success">89%</span></td>
                    <td>4.7/5</td>
                  </tr>
                  <tr>
                    <td>Zone B</td>
                    <td>623</td>
                    <td>189</td>
                    <td><span class="badge badge-success">94%</span></td>
                    <td><span class="badge badge-warning">76%</span></td>
                    <td>4.5/5</td>
                  </tr>
                  <tr>
                    <td>Zone C</td>
                    <td>456</td>
                    <td>156</td>
                    <td><span class="badge badge-warning">87%</span></td>
                    <td><span class="badge badge-success">92%</span></td>
                    <td>4.3/5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSystemManagement() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">System Management</h1>
        <p class="dashboard-subtitle">Configure and manage system settings</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">User Management</h3>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.SuperadminDashboard.manageUsers()">
                <i class="fas fa-users"></i>
                Manage All Users
              </button>
              <button class="btn btn-secondary" onclick="window.SuperadminDashboard.manageRoles()">
                <i class="fas fa-user-tag"></i>
                Role Management
              </button>
              <button class="btn btn-info" onclick="window.SuperadminDashboard.userPermissions()">
                <i class="fas fa-key"></i>
                User Permissions
              </button>
              <button class="btn btn-warning" onclick="window.SuperadminDashboard.suspendedUsers()">
                <i class="fas fa-user-slash"></i>
                Suspended Users
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">System Configuration</h3>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.SuperadminDashboard.systemSettings()">
                <i class="fas fa-cogs"></i>
                System Settings
              </button>
              <button class="btn btn-secondary" onclick="window.SuperadminDashboard.databaseConfig()">
                <i class="fas fa-database"></i>
                Database Config
              </button>
              <button class="btn btn-info" onclick="window.SuperadminDashboard.apiSettings()">
                <i class="fas fa-plug"></i>
                API Settings
              </button>
              <button class="btn btn-warning" onclick="window.SuperadminDashboard.securitySettings()">
                <i class="fas fa-shield-alt"></i>
                Security Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">System Operations</h3>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
              <div class="operation-card" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary);">
                  <i class="fas fa-database"></i>
                </div>
                <h4 style="margin-bottom: 1rem;">Database Backup</h4>
                <p style="color: var(--gray-600); margin-bottom: 1.5rem; font-size: 0.875rem;">
                  Create a full system backup
                </p>
                <button class="btn btn-primary" onclick="window.SuperadminDashboard.systemBackup()">
                  Start Backup
                </button>
              </div>

              <div class="operation-card" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--warning);">
                  <i class="fas fa-tools"></i>
                </div>
                <h4 style="margin-bottom: 1rem;">Maintenance Mode</h4>
                <p style="color: var(--gray-600); margin-bottom: 1.5rem; font-size: 0.875rem;">
                  Enable system maintenance
                </p>
                <button class="btn btn-warning" onclick="window.SuperadminDashboard.maintenanceMode()">
                  Enable Maintenance
                </button>
              </div>

              <div class="operation-card" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--success);">
                  <i class="fas fa-sync"></i>
                </div>
                <h4 style="margin-bottom: 1rem;">System Update</h4>
                <p style="color: var(--gray-600); margin-bottom: 1.5rem; font-size: 0.875rem;">
                  Update system components
                </p>
                <button class="btn btn-success" onclick="window.SuperadminDashboard.systemUpdate()">
                  Check Updates
                </button>
              </div>

              <div class="operation-card" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--error);">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h4 style="margin-bottom: 1rem;">System Logs</h4>
                <p style="color: var(--gray-600); margin-bottom: 1.5rem; font-size: 0.875rem;">
                  View system error logs
                </p>
                <button class="btn btn-secondary" onclick="window.SuperadminDashboard.viewLogs()">
                  View Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderReports() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">System Reports</h1>
        <p class="dashboard-subtitle">Comprehensive system and business reports</p>
        <button class="btn btn-primary" onclick="window.SuperadminDashboard.generateCustomReport()">
          <i class="fas fa-plus"></i>
          Create Custom Report
        </button>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Reports Generated</span>
            <div class="stat-icon primary">
              <i class="fas fa-file-alt"></i>
            </div>
          </div>
          <div class="stat-value">1,247</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            This month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Automated Reports</span>
            <div class="stat-icon success">
              <i class="fas fa-robot"></i>
            </div>
          </div>
          <div class="stat-value">24</div>
          <div class="stat-change positive">
            <i class="fas fa-check"></i>
            Active schedules
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Data Processed</span>
            <div class="stat-icon secondary">
              <i class="fas fa-chart-bar"></i>
            </div>
          </div>
          <div class="stat-value">2.4TB</div>
          <div class="stat-change positive">
            <i class="fas fa-database"></i>
            This month
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Available Reports</h3>
          <div style="display: flex; gap: 1rem;">
            <select class="form-control" style="width: auto;">
              <option>All Categories</option>
              <option>System Reports</option>
              <option>User Reports</option>
              <option>Financial Reports</option>
              <option>Performance Reports</option>
            </select>
            <input type="text" class="form-control" placeholder="Search reports..." style="width: 250px;">
          </div>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Category</th>
                  <th>Last Generated</th>
                  <th>Frequency</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>System Performance Report</td>
                  <td><span class="badge badge-info">System</span></td>
                  <td>2024-01-15 09:00</td>
                  <td>Daily</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-ghost" title="View Report"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-ghost" title="Download"><i class="fas fa-download"></i></button>
                    <button class="btn btn-ghost" title="Schedule"><i class="fas fa-calendar"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>User Activity Report</td>
                  <td><span class="badge badge-primary">Users</span></td>
                  <td>2024-01-15 08:30</td>
                  <td>Weekly</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-ghost" title="View Report"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-ghost" title="Download"><i class="fas fa-download"></i></button>
                    <button class="btn btn-ghost" title="Schedule"><i class="fas fa-calendar"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>Financial Summary</td>
                  <td><span class="badge badge-warning">Financial</span></td>
                  <td>2024-01-14 18:00</td>
                  <td>Monthly</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-ghost" title="View Report"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-ghost" title="Download"><i class="fas fa-download"></i></button>
                    <button class="btn btn-ghost" title="Schedule"><i class="fas fa-calendar"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>Complaint Resolution Analysis</td>
                  <td><span class="badge badge-secondary">Performance</span></td>
                  <td>2024-01-14 12:00</td>
                  <td>Weekly</td>
                  <td><span class="badge badge-warning">Pending</span></td>
                  <td>
                    <button class="btn btn-ghost" title="View Report"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-ghost" title="Download"><i class="fas fa-download"></i></button>
                    <button class="btn btn-ghost" title="Schedule"><i class="fas fa-calendar"></i></button>
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
        <h1 class="dashboard-title">Superadmin Profile</h1>
        <p class="dashboard-subtitle">Manage your superadmin account and system preferences</p>
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
              <p style="color: var(--gray-600);">System Superadmin</p>
              <span class="badge badge-error" style="margin-top: 0.5rem;">Highest Access Level</span>
            </div>
            <div class="profile-stats">
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Employee ID:</span>
                <strong>SA-001</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Department:</span>
                <strong>System Administration</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Access Level:</span>
                <strong style="color: var(--error);">Superadmin</strong>
              </div>
              <div style="display: flex; justify-content: between;">
                <span>Last Login:</span>
                <strong>Today, 8:45 AM</strong>
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
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Two-Factor Authentication</label>
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" checked>
                    <span>Enable 2FA</span>
                  </label>
                  <button type="button" class="btn btn-ghost">Configure</button>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Session Timeout</label>
                <select class="form-control">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4 hours</option>
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

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Security & Audit</h3>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
              <div class="security-item" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem;">
                <h4 style="margin-bottom: 1rem; color: var(--primary);">
                  <i class="fas fa-shield-alt"></i>
                  Security Settings
                </h4>
                <p style="color: var(--gray-600); margin-bottom: 1rem; font-size: 0.875rem;">
                  Manage system security configurations
                </p>
                <button class="btn btn-primary" onclick="window.SuperadminDashboard.securitySettings()">
                  Configure Security
                </button>
              </div>

              <div class="security-item" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem;">
                <h4 style="margin-bottom: 1rem; color: var(--warning);">
                  <i class="fas fa-history"></i>
                  Audit Logs
                </h4>
                <p style="color: var(--gray-600); margin-bottom: 1rem; font-size: 0.875rem;">
                  View system access and activity logs
                </p>
                <button class="btn btn-secondary" onclick="window.SuperadminDashboard.viewAuditLogs()">
                  View Audit Logs
                </button>
              </div>

              <div class="security-item" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem;">
                <h4 style="margin-bottom: 1rem; color: var(--error);">
                  <i class="fas fa-user-lock"></i>
                  Access Control
                </h4>
                <p style="color: var(--gray-600); margin-bottom: 1rem; font-size: 0.875rem;">
                  Manage user permissions and access levels
                </p>
                <button class="btn btn-warning" onclick="window.SuperadminDashboard.accessControl()">
                  Manage Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Superadmin-specific methods
  manageUsers() {
    notifications.info('User Management', 'Opening comprehensive user management interface...');
  }

  manageRoles() {
    notifications.info('Role Management', 'Opening role and permission management...');
  }

  userPermissions() {
    notifications.info('User Permissions', 'Opening user permission configuration...');
  }

  suspendedUsers() {
    notifications.info('Suspended Users', 'Viewing suspended user accounts...');
  }

  systemSettings() {
    notifications.info('System Settings', 'Opening system configuration panel...');
  }

  databaseConfig() {
    notifications.info('Database Config', 'Opening database configuration settings...');
  }

  apiSettings() {
    notifications.info('API Settings', 'Opening API configuration panel...');
  }

  securitySettings() {
    notifications.info('Security Settings', 'Opening security configuration panel...');
  }

  systemBackup() {
    notifications.info('System Backup', 'Initiating full system backup...');
    
    setTimeout(() => {
      notifications.success('Backup Complete', 'System backup has been successfully created');
    }, 5000);
  }

  maintenanceMode() {
    const content = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
        <h3>Enable Maintenance Mode</h3>
        <p style="color: var(--gray-600);">This will temporarily disable the system for all users except superadmins.</p>
      </div>
      
      <div class="form-group" style="margin-bottom: 2rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Maintenance Message</label>
        <textarea class="form-control" rows="3" placeholder="Enter message to display to users...">System maintenance in progress. We'll be back shortly.</textarea>
      </div>
      
      <div class="form-group" style="margin-bottom: 2rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Estimated Duration</label>
        <select class="form-control">
          <option>30 minutes</option>
          <option>1 hour</option>
          <option>2 hours</option>
          <option>4 hours</option>
          <option>Custom</option>
        </select>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
        <button class="btn btn-warning" onclick="window.SuperadminDashboard.confirmMaintenanceMode()">
          <i class="fas fa-tools"></i>
          Enable Maintenance Mode
        </button>
      </div>
    `;

    modal.show('System Maintenance', content);
  }

  confirmMaintenanceMode() {
    notifications.warning('Maintenance Mode Enabled', 'System is now in maintenance mode');
    modal.hide();
  }

  systemUpdate() {
    notifications.info('System Update', 'Checking for available system updates...');
    
    setTimeout(() => {
      notifications.success('Updates Available', 'System updates are available for installation');
    }, 3000);
  }

  viewLogs() {
    notifications.info('System Logs', 'Opening system error and activity logs...');
  }

  generateCustomReport() {
    notifications.info('Custom Report', 'Opening custom report builder...');
  }

  viewAuditLogs() {
    notifications.info('Audit Logs', 'Opening comprehensive audit log viewer...');
  }

  accessControl() {
    notifications.info('Access Control', 'Opening access control management panel...');
  }

  bindEvents() {
    // Bind any specific events for the current section
  }

  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export
window.SuperadminDashboard = new SuperadminDashboard();