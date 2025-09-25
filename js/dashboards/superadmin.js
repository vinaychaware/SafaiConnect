// Superadmin Dashboard
class SuperadminDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.admins = this.loadAdmins();
    this.vouchers = this.loadVouchers();
    this.campaigns = this.loadCampaigns();
    this.inventory = this.loadInventory();
  }

  loadAdmins() {
    return Utils.storage.get('admins') || [
      { id: 'ADM001', name: 'John Smith', email: 'john@admin.com', zone: 'Zone A', status: 'active', joinedAt: new Date('2023-06-15') },
      { id: 'ADM002', name: 'Sarah Johnson', email: 'sarah@admin.com', zone: 'Zone B', status: 'active', joinedAt: new Date('2023-08-20') },
      { id: 'ADM003', name: 'Mike Wilson', email: 'mike@admin.com', zone: 'Zone C', status: 'inactive', joinedAt: new Date('2023-09-10') }
    ];
  }

  saveAdmins() {
    Utils.storage.set('admins', this.admins);
  }

  loadVouchers() {
    return Utils.storage.get('vouchers') || {
      total: 5000,
      provided: 4200,
      claimed: 3800,
      areaWise: {
        'Zone A': { provided: 1500, claimed: 1350 },
        'Zone B': { provided: 1200, claimed: 1100 },
        'Zone C': { provided: 1000, claimed: 900 },
        'Zone D': { provided: 500, claimed: 450 }
      },
      cityWise: {
        'North District': { provided: 2000, claimed: 1800 },
        'South District': { provided: 1500, claimed: 1400 },
        'East District': { provided: 700, claimed: 600 }
      }
    };
  }

  loadCampaigns() {
    return Utils.storage.get('campaigns') || [
      { id: 'C001', name: 'Clean Streets Initiative', area: 'Zone A', type: 'weekly', status: 'active', startDate: new Date('2024-01-01'), participants: 45 },
      { id: 'C002', name: 'Plastic Free Campaign', area: 'Zone B', type: 'monthly', status: 'scheduled', startDate: new Date('2024-02-01'), participants: 0 },
      { id: 'C003', name: 'Community Composting', area: 'Zone C', type: 'occasionally', status: 'completed', startDate: new Date('2023-12-15'), participants: 78 },
      { id: 'C004', name: 'School Awareness Drive', area: 'Zone A', type: 'monthly', status: 'scheduled', startDate: new Date('2024-01-25'), participants: 0 }
    ];
  }

  loadInventory() {
    return Utils.storage.get('inventory') || [
      { id: 'INV001', item: 'Garbage Trucks', quantity: 25, available: 23, maintenance: 2, cost: 2500000 },
      { id: 'INV002', item: 'Collection Bins', quantity: 1500, available: 1450, maintenance: 50, cost: 750000 },
      { id: 'INV003', item: 'Safety Equipment', quantity: 200, available: 180, maintenance: 20, cost: 100000 },
      { id: 'INV004', item: 'Cleaning Supplies', quantity: 500, available: 450, maintenance: 0, cost: 50000 },
      { id: 'INV005', item: 'Compost Bins', quantity: 800, available: 750, maintenance: 50, cost: 400000 }
    ];
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
    const stats = MOCK_DATA.stats;
    const vouchers = this.vouchers;
    const revenue = this.calculateRevenue();
    const wasteSegregation = this.getWasteSegregationData();
    
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">System Overview</h1>
        <p class="dashboard-subtitle">Complete system monitoring and control</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Total Complaints</span>
            <div class="stat-icon primary">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          <div class="stat-value">${stats.totalComplaints.toLocaleString()}</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +12% from last month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Resolution Rate</span>
            <div class="stat-icon secondary">
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
          <div class="stat-value">${(stats.resolvedComplaints / stats.totalComplaints * 100).toFixed(1)}%</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +5.2% from last month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Avg Resolution Time</span>
            <div class="stat-icon warning">
              <i class="fas fa-clock"></i>
            </div>
          </div>
          <div class="stat-value">4.2h</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-down"></i>
            20% faster this week
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Revenue Generated</span>
            <div class="stat-icon primary">
              <i class="fas fa-rupee-sign"></i>
            </div>
          </div>
          <div class="stat-value">${Utils.formatCurrency(revenue.total)}</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            +18% this month
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">City-wide Heat Map</h3>
            <button class="btn btn-primary" onclick="navigation.navigateTo('analytics')">
              <i class="fas fa-chart-bar"></i>
              View Analytics
            </button>
          </div>
          <div class="card-body">
            <div class="map-container">
              <div class="heat-map"></div>
              <div class="map-placeholder">
                <i class="fas fa-map" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                <p>Interactive heat map showing cleanliness levels across the city</p>
                <div style="margin-top: 1rem;">
                  <span class="badge badge-error" style="margin-right: 0.5rem;">Red Zones (15)</span>
                  <span class="badge badge-warning" style="margin-right: 0.5rem;">Medium Priority (8)</span>
                  <span class="badge badge-success">Green Zones (25)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Voucher Statistics</h3>
          </div>
          <div class="card-body">
            <div class="voucher-stats">
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Total Vouchers:</span>
                <strong>${vouchers.total.toLocaleString()}</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Provided:</span>
                <strong style="color: var(--primary);">${vouchers.provided.toLocaleString()}</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Claimed:</span>
                <strong style="color: var(--success);">${vouchers.claimed.toLocaleString()}</strong>
              </div>
              <div style="display: flex; justify-content: between;">
                <span>Claim Rate:</span>
                <strong style="color: var(--warning);">${((vouchers.claimed / vouchers.provided) * 100).toFixed(1)}%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Waste Segregation</h3>
          </div>
          <div class="card-body">
            <div class="waste-breakdown">
              <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                  <span>Biomethanization</span>
                  <strong>${wasteSegregation.biomethanization}%</strong>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${wasteSegregation.biomethanization}%; background: var(--success);"></div>
                </div>
              </div>
              <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                  <span>Recycled</span>
                  <strong>${wasteSegregation.recycled}%</strong>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${wasteSegregation.recycled}%; background: var(--primary);"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                  <span>Waste to Energy</span>
                  <strong>${wasteSegregation.wasteToEnergy}%</strong>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${wasteSegregation.wasteToEnergy}%; background: var(--warning);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Active Campaigns</h3>
          </div>
          <div class="card-body">
            <div class="campaign-summary">
              ${this.campaigns.filter(c => c.status === 'active').slice(0, 3).map(campaign => `
                <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">${campaign.name}</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">${campaign.area} • ${Utils.capitalize(campaign.type)}</div>
                  <div style="font-size: 0.75rem; color: var(--success);">${campaign.participants} participants</div>
                </div>
              `).join('')}
              <button class="btn btn-secondary w-full" onclick="window.SuperadminDashboard.viewAllCampaigns()">
                View All Campaigns
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">System Health</h3>
          </div>
          <div class="card-body">
            <div class="system-health">
              <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 2rem; font-weight: 700; color: var(--success); margin-bottom: 0.5rem;">98.9%</div>
                <div style="color: var(--gray-600);">System Uptime</div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">${this.admins.filter(a => a.status === 'active').length}</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600);">Active Admins</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--secondary);">${stats.activeWorkers}</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600);">Active Workers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quick Actions</h3>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <button class="btn btn-primary" onclick="window.SuperadminDashboard.showAddAdminModal()" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                <i class="fas fa-user-plus" style="font-size: 1.5rem;"></i>
                Add New Admin
              </button>
              
              <button class="btn btn-secondary" onclick="navigation.navigateTo('analytics')" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                <i class="fas fa-chart-line" style="font-size: 1.5rem;"></i>
                View Analytics
              </button>
              
              <button class="btn btn-success" onclick="window.SuperadminDashboard.generateSystemReport()" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                <i class="fas fa-file-alt" style="font-size: 1.5rem;"></i>
                Generate Report
              </button>
              
              <button class="btn btn-warning" onclick="window.SuperadminDashboard.viewPenaltyOversight()" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                <i class="fas fa-gavel" style="font-size: 1.5rem;"></i>
                Penalty Oversight
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderAnalytics() {
    const vouchers = this.vouchers;
    const greenChampions = this.getGreenChampionsData();
    const areaRatings = this.getAreaRatings();
    const leaderboard = this.getLeaderboard();
    
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">System Analytics</h1>
        <p class="dashboard-subtitle">Comprehensive insights and performance metrics</p>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Heat Map Analysis</h3>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 400px;">
              <div class="heat-map"></div>
              <div class="map-placeholder">
                <i class="fas fa-map-marked-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 2rem;"></i>
                <h3 style="margin-bottom: 1rem;">City Cleanliness Heat Map</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                  <div style="text-align: center; padding: 1rem; background: #FEE2E2; border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #DC2626;">15</div>
                    <div style="font-size: 0.875rem; color: #7F1D1D;">Red Zones</div>
                  </div>
                  <div style="text-align: center; padding: 1rem; background: #FEF3C7; border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #D97706;">8</div>
                    <div style="font-size: 0.875rem; color: #92400E;">Yellow Zones</div>
                  </div>
                  <div style="text-align: center; padding: 1rem; background: #D1FAE5; border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #059669;">25</div>
                    <div style="font-size: 0.875rem; color: #064E3B;">Green Zones</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Area-wise Ratings</h3>
          </div>
          <div class="card-body">
            <div class="area-ratings">
              ${areaRatings.map(area => `
                <div style="margin-bottom: 1.5rem;">
                  <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-weight: 600;">${area.name}</span>
                    <span style="color: var(--warning); font-weight: 700;">${area.rating}/5</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(area.rating / 5) * 100}%; background: ${area.rating >= 4 ? 'var(--success)' : area.rating >= 3 ? 'var(--warning)' : 'var(--error)'};"></div>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--gray-500); margin-top: 0.25rem;">${area.complaints} complaints • ${area.resolved} resolved</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Voucher Distribution</h3>
          </div>
          <div class="card-body">
            <div class="voucher-analytics">
              <h4 style="margin-bottom: 1rem;">Area-wise Distribution</h4>
              ${Object.entries(vouchers.areaWise).map(([area, data]) => `
                <div style="margin-bottom: 1rem;">
                  <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                    <span>${area}</span>
                    <span>${data.claimed}/${data.provided}</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(data.claimed / data.provided) * 100}%; background: var(--primary);"></div>
                  </div>
                </div>
              `).join('')}
              
              <h4 style="margin: 2rem 0 1rem;">City-wise Distribution</h4>
              ${Object.entries(vouchers.cityWise).map(([city, data]) => `
                <div style="margin-bottom: 1rem;">
                  <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                    <span>${city}</span>
                    <span>${data.claimed}/${data.provided}</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(data.claimed / data.provided) * 100}%; background: var(--secondary);"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Green Champions Leaderboard</h3>
          </div>
          <div class="card-body">
            <div class="green-champions-list">
              ${greenChampions.map((champion, index) => `
                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div style="font-size: 1.5rem;">${index < 3 ? ['🏆', '🥈', '🥉'][index] : '⭐'}</div>
                  <div style="flex: 1;">
                    <div style="font-weight: 600;">${champion.name}</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">${champion.area}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 700; color: var(--primary);">${champion.points}</div>
                    <div style="font-size: 0.75rem; color: var(--gray-500);">points</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Municipal Corporation Leaderboard</h3>
          </div>
          <div class="card-body">
            <div class="municipal-leaderboard">
              ${leaderboard.municipal.map((corp, index) => `
                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div style="font-weight: 700; color: var(--primary); min-width: 30px;">#${index + 1}</div>
                  <div style="flex: 1;">
                    <div style="font-weight: 600;">${corp.name}</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">${corp.district}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 700; color: var(--success);">${corp.score}%</div>
                    <div style="font-size: 0.75rem; color: var(--gray-500);">efficiency</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Campaign Schedule</h3>
          </div>
          <div class="card-body">
            <div class="campaign-schedule">
              <div style="margin-bottom: 2rem;">
                <h5 style="color: var(--success); margin-bottom: 1rem;">Active Campaigns</h5>
                ${this.campaigns.filter(c => c.status === 'active').map(campaign => `
                  <div style="margin-bottom: 1rem; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${campaign.name}</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">${campaign.area} • ${Utils.capitalize(campaign.type)}</div>
                  </div>
                `).join('')}
              </div>
              
              <div>
                <h5 style="color: var(--warning); margin-bottom: 1rem;">Scheduled Campaigns</h5>
                ${this.campaigns.filter(c => c.status === 'scheduled').map(campaign => `
                  <div style="margin-bottom: 1rem; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${campaign.name}</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">${campaign.area} • Starts ${Utils.formatDate(campaign.startDate)}</div>
                  </div>
                `).join('')}
              </div>
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

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Admin Management</h3>
          </div>
          <div class="card-body">
            <div class="management-stats" style="margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>Total Admins:</span>
                <strong>${this.admins.length}</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>Active:</span>
                <strong style="color: var(--success);">${this.admins.filter(a => a.status === 'active').length}</strong>
              </div>
              <div style="display: flex; justify-content: between;">
                <span>Inactive:</span>
                <strong style="color: var(--error);">${this.admins.filter(a => a.status === 'inactive').length}</strong>
              </div>
            </div>
            <div class="management-actions">
              <button class="btn btn-primary w-full" style="margin-bottom: 0.5rem;" onclick="window.SuperadminDashboard.showAddAdminModal()">
                <i class="fas fa-user-plus"></i> Add New Admin
              </button>
              <button class="btn btn-secondary w-full" onclick="window.SuperadminDashboard.viewAllAdmins()">
                <i class="fas fa-users"></i> Manage Admins
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Inventory Management</h3>
          </div>
          <div class="card-body">
            <div class="inventory-summary" style="margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>Total Items:</span>
                <strong>${this.inventory.reduce((sum, item) => sum + item.quantity, 0)}</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>Available:</span>
                <strong style="color: var(--success);">${this.inventory.reduce((sum, item) => sum + item.available, 0)}</strong>
              </div>
              <div style="display: flex; justify-content: between;">
                <span>In Maintenance:</span>
                <strong style="color: var(--warning);">${this.inventory.reduce((sum, item) => sum + item.maintenance, 0)}</strong>
              </div>
            </div>
            <div class="management-actions">
              <button class="btn btn-primary w-full" style="margin-bottom: 0.5rem;" onclick="window.SuperadminDashboard.viewInventory()">
                <i class="fas fa-boxes"></i> View Inventory
              </button>
              <button class="btn btn-secondary w-full" onclick="window.SuperadminDashboard.addInventoryItem()">
                <i class="fas fa-plus"></i> Add Item
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Revenue Analytics</h3>
          </div>
          <div class="card-body">
            <div class="revenue-summary" style="margin-bottom: 1.5rem;">
              <div style="text-align: center; margin-bottom: 1rem;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${Utils.formatCurrency(this.calculateRevenue().total)}</div>
                <div style="color: var(--gray-600);">Total Revenue</div>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>E-commerce:</span>
                <strong>${Utils.formatCurrency(this.calculateRevenue().ecommerce)}</strong>
              </div>
              <div style="display: flex; justify-content: between;">
                <span>Services:</span>
                <strong>${Utils.formatCurrency(this.calculateRevenue().services)}</strong>
              </div>
            </div>
            <button class="btn btn-primary w-full" onclick="window.SuperadminDashboard.viewRevenueDetails()">
              <i class="fas fa-chart-line"></i> View Details
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">System Configuration</h3>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
            <div class="config-section">
              <h5 style="margin-bottom: 1rem;">Operational Settings</h5>
              <div class="config-list">
                <div class="config-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                  <span>Auto-assignment</span>
                  <div class="toggle-switch" style="width: 50px; height: 24px; background: var(--primary); border-radius: 12px; position: relative; cursor: pointer;">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px; transition: all 0.2s;"></div>
                  </div>
                </div>
                <div class="config-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                  <span>Real-time Tracking</span>
                  <div class="toggle-switch" style="width: 50px; height: 24px; background: var(--primary); border-radius: 12px; position: relative; cursor: pointer;">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px; transition: all 0.2s;"></div>
                  </div>
                </div>
                <div class="config-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0;">
                  <span>Penalty System</span>
                  <div class="toggle-switch" style="width: 50px; height: 24px; background: var(--primary); border-radius: 12px; position: relative; cursor: pointer;">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px; transition: all 0.2s;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="config-section">
              <h5 style="margin-bottom: 1rem;">Notification Settings</h5>
              <div class="config-list">
                <div class="config-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                  <span>Email Notifications</span>
                  <div class="toggle-switch" style="width: 50px; height: 24px; background: var(--primary); border-radius: 12px; position: relative; cursor: pointer;">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px; transition: all 0.2s;"></div>
                  </div>
                </div>
                <div class="config-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                  <span>SMS Alerts</span>
                  <div class="toggle-switch" style="width: 50px; height: 24px; background: var(--primary); border-radius: 12px; position: relative; cursor: pointer;">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px; transition: all 0.2s;"></div>
                  </div>
                </div>
                <div class="config-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0;">
                  <span>Push Notifications</span>
                  <div class="toggle-switch" style="width: 50px; height: 24px; background: var(--gray-300); border-radius: 12px; position: relative; cursor: pointer;">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: all 0.2s;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="config-section">
              <h5 style="margin-bottom: 1rem;">System Maintenance</h5>
              <div class="maintenance-actions">
                <button class="btn btn-secondary w-full" style="margin-bottom: 0.5rem;">
                  <i class="fas fa-database"></i> Backup Database
                </button>
                <button class="btn btn-warning w-full" style="margin-bottom: 0.5rem;">
                  <i class="fas fa-broom"></i> Clear Cache
                </button>
                <button class="btn btn-info w-full">
                  <i class="fas fa-sync"></i> System Update
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
        <p class="dashboard-subtitle">Generate and export comprehensive reports</p>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Report Generation</h3>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
            <div class="report-type" style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='var(--primary)'; this.style.color='white';" onmouseout="this.style.backgroundColor='var(--gray-50)'; this.style.color='';">
              <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h4 style="margin-bottom: 0.5rem;">Complaints Report</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem;">Detailed analysis of all complaints</p>
              <div class="badge badge-info">Weekly/Monthly</div>
            </div>

            <div class="report-type" style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='var(--primary)'; this.style.color='white';" onmouseout="this.style.backgroundColor='var(--gray-50)'; this.style.color='';">
              <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h4 style="margin-bottom: 0.5rem;">Performance Report</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem;">Worker and system performance</p>
              <div class="badge badge-success">Real-time</div>
            </div>

            <div class="report-type" style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='var(--primary)'; this.style.color='white';" onmouseout="this.style.backgroundColor='var(--gray-50)'; this.style.color='';">
              <i class="fas fa-chart-line" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h4 style="margin-bottom: 0.5rem;">Analytics Report</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem;">Trends and insights</p>
              <div class="badge badge-warning">Custom</div>
            </div>

            <div class="report-type" style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='var(--primary)'; this.style.color='white';" onmouseout="this.style.backgroundColor='var(--gray-50)'; this.style.color='';">
              <i class="fas fa-rupee-sign" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h4 style="margin-bottom: 0.5rem;">Revenue Report</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem;">Financial analytics</p>
              <div class="badge badge-success">Monthly</div>
            </div>

            <div class="report-type" style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='var(--primary)'; this.style.color='white';" onmouseout="this.style.backgroundColor='var(--gray-50)'; this.style.color='';">
              <i class="fas fa-gavel" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h4 style="margin-bottom: 0.5rem;">Penalty Report</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem;">Oversight and compliance</p>
              <div class="badge badge-error">Critical</div>
            </div>

            <div class="report-type" style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='var(--primary)'; this.style.color='white';" onmouseout="this.style.backgroundColor='var(--gray-50)'; this.style.color='';">
              <i class="fas fa-recycle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h4 style="margin-bottom: 0.5rem;">Waste Segregation</h4>
              <p style="font-size: 0.875rem; margin-bottom: 1rem;">Segregation analytics</p>
              <div class="badge badge-info">Environmental</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderProfile() {
    const user = authSystem.getCurrentUser();
    
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Profile Settings</h1>
        <p class="dashboard-subtitle">Manage your account and preferences</p>
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
              <p style="color: var(--gray-600);">${Utils.capitalize(user.role.replace('-', ' '))}</p>
            </div>
            <div class="profile-stats">
              <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px; margin-bottom: 1rem;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">100%</div>
                <div style="color: var(--gray-600); font-size: 0.875rem;">System Access</div>
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
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Role</label>
                <input type="text" class="form-control" value="${Utils.capitalize(user.role.replace('-', ' '))}" disabled>
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Member Since</label>
                <input type="text" class="form-control" value="${Utils.formatDate(user.joinedAt)}" disabled>
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

  // Helper methods for data generation
  calculateRevenue() {
    return {
      total: 2850000,
      ecommerce: 1850000,
      services: 1000000
    };
  }

  getWasteSegregationData() {
    return {
      biomethanization: 35,
      recycled: 45,
      wasteToEnergy: 20
    };
  }

  getGreenChampionsData() {
    return [
      { name: 'Sarah Wilson', area: 'Zone A', points: 1250 },
      { name: 'Michael Chen', area: 'Zone B', points: 1180 },
      { name: 'Priya Patel', area: 'Zone C', points: 1150 },
      { name: 'David Rodriguez', area: 'Zone A', points: 980 },
      { name: 'Emma Davis', area: 'Zone D', points: 850 }
    ];
  }

  getAreaRatings() {
    return [
      { name: 'Zone A', rating: 4.2, complaints: 25, resolved: 23 },
      { name: 'Zone B', rating: 3.8, complaints: 18, resolved: 16 },
      { name: 'Zone C', rating: 4.5, complaints: 12, resolved: 12 },
      { name: 'Zone D', rating: 3.2, complaints: 35, resolved: 28 }
    ];
  }

  getLeaderboard() {
    return {
      municipal: [
        { name: 'Central Municipal Corp', district: 'Central District', score: 94.5 },
        { name: 'North Zone Corp', district: 'North District', score: 91.2 },
        { name: 'South Municipal Corp', district: 'South District', score: 88.7 },
        { name: 'East Zone Corp', district: 'East District', score: 85.3 }
      ]
    };
  }

  // Superadmin specific methods
  showAddAdminModal() {
    const content = `
      <div class="add-admin-form">
        <h3 style="margin-bottom: 2rem; text-align: center;">Add New Admin</h3>
        
        <form id="addAdminForm">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name</label>
            <input type="text" class="form-control" id="adminName" placeholder="Enter admin's full name" required>
          </div>
          
          <div class="form-group" style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address</label>
            <input type="email" class="form-control" id="adminEmail" placeholder="Enter admin's email" required>
          </div>
          
          <div class="form-group" style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Assigned Zone</label>
            <select class="form-control" id="adminZone" required>
              <option value="">Select Zone</option>
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
              <option value="Zone D">Zone D</option>
              <option value="Zone E">Zone E</option>
            </select>
          </div>
          
          <div class="form-group" style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
            <input type="tel" class="form-control" id="adminPhone" placeholder="Enter phone number">
          </div>
          
          <div class="form-group" style="margin-bottom: 2rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Initial Password</label>
            <input type="password" class="form-control" id="adminPassword" placeholder="Set initial password" required>
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-user-plus"></i>
              Add Admin
            </button>
          </div>
        </form>
      </div>
    `;

    modal.show('Add New Admin', content, { size: '600px' });

    // Handle form submission
    document.getElementById('addAdminForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addNewAdmin();
    });
  }

  addNewAdmin() {
    const name = document.getElementById('adminName').value;
    const email = document.getElementById('adminEmail').value;
    const zone = document.getElementById('adminZone').value;
    const phone = document.getElementById('adminPhone').value;

    const newAdmin = {
      id: 'ADM' + (Date.now().toString().slice(-3)),
      name: name,
      email: email,
      zone: zone,
      phone: phone,
      status: 'active',
      joinedAt: new Date()
    };

    this.admins.push(newAdmin);
    this.saveAdmins();

    notifications.success('Admin Added', `${name} has been successfully added as an admin for ${zone}`);
    modal.hide();
    this.refresh();
  }

  viewAllAdmins() {
    const content = `
      <div class="admin-management">
        <h3 style="margin-bottom: 2rem;">Admin Management</h3>
        
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Zone</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.admins.map(admin => `
                <tr>
                  <td>${admin.id}</td>
                  <td>${admin.name}</td>
                  <td>${admin.email}</td>
                  <td>${admin.zone}</td>
                  <td>
                    <span class="badge ${admin.status === 'active' ? 'badge-success' : 'badge-error'}">
                      ${Utils.capitalize(admin.status)}
                    </span>
                  </td>
                  <td>${Utils.formatDate(admin.joinedAt)}</td>
                  <td>
                    <button class="btn btn-ghost" onclick="window.SuperadminDashboard.toggleAdminStatus('${admin.id}')" title="Toggle Status">
                      <i class="fas fa-toggle-${admin.status === 'active' ? 'on' : 'off'}"></i>
                    </button>
                    <button class="btn btn-ghost" onclick="window.SuperadminDashboard.editAdmin('${admin.id}')" title="Edit">
                      <i class="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
        </div>
      </div>
    `;

    modal.show('Admin Management', content, { size: '900px' });
  }

  toggleAdminStatus(adminId) {
    const admin = this.admins.find(a => a.id === adminId);
    if (admin) {
      admin.status = admin.status === 'active' ? 'inactive' : 'active';
      this.saveAdmins();
      notifications.info('Status Updated', `${admin.name}'s status changed to ${admin.status}`);
      this.viewAllAdmins(); // Refresh the modal
    }
  }

  viewInventory() {
    const content = `
      <div class="inventory-management">
        <h3 style="margin-bottom: 2rem;">Inventory Management</h3>
        
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Total Quantity</th>
                <th>Available</th>
                <th>In Maintenance</th>
                <th>Total Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${this.inventory.map(item => `
                <tr>
                  <td>${item.item}</td>
                  <td>${item.quantity}</td>
                  <td style="color: var(--success);">${item.available}</td>
                  <td style="color: var(--warning);">${item.maintenance}</td>
                  <td>${Utils.formatCurrency(item.cost)}</td>
                  <td>
                    <span class="badge ${item.available > item.quantity * 0.8 ? 'badge-success' : item.available > item.quantity * 0.5 ? 'badge-warning' : 'badge-error'}">
                      ${item.available > item.quantity * 0.8 ? 'Good' : item.available > item.quantity * 0.5 ? 'Low' : 'Critical'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
            <div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${Utils.formatCurrency(this.inventory.reduce((sum, item) => sum + item.cost, 0))}</div>
              <div style="color: var(--gray-600);">Total Investment</div>
            </div>
            <div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">${this.inventory.reduce((sum, item) => sum + item.available, 0)}</div>
              <div style="color: var(--gray-600);">Available Items</div>
            </div>
            <div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning);">${this.inventory.reduce((sum, item) => sum + item.maintenance, 0)}</div>
              <div style="color: var(--gray-600);">In Maintenance</div>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
        </div>
      </div>
    `;

    modal.show('Inventory Management', content, { size: '900px' });
  }

  viewPenaltyOversight() {
    const penaltyData = [
      { area: 'Zone A', ignoredComplaints: 5, penaltyAmount: 50000, status: 'pending' },
      { area: 'Zone B', ignoredComplaints: 12, penaltyAmount: 120000, status: 'imposed' },
      { area: 'Zone C', ignoredComplaints: 3, penaltyAmount: 30000, status: 'resolved' },
      { area: 'Zone D', ignoredComplaints: 8, penaltyAmount: 80000, status: 'pending' }
    ];

    const content = `
      <div class="penalty-oversight">
        <h3 style="margin-bottom: 2rem;">Penalty Oversight</h3>
        
        <div class="penalty-stats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
          <div style="text-align: center; padding: 1rem; background: var(--error); color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: 700;">${penaltyData.reduce((sum, p) => sum + p.ignoredComplaints, 0)}</div>
            <div>Total Ignored Complaints</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: var(--warning); color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: 700;">${Utils.formatCurrency(penaltyData.reduce((sum, p) => sum + p.penaltyAmount, 0))}</div>
            <div>Total Penalty Amount</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: var(--primary); color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: 700;">${penaltyData.filter(p => p.status === 'pending').length}</div>
            <div>Pending Actions</div>
          </div>
        </div>
        
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Area</th>
                <th>Ignored Complaints</th>
                <th>Penalty Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${penaltyData.map(penalty => `
                <tr>
                  <td>${penalty.area}</td>
                  <td style="color: var(--error); font-weight: 600;">${penalty.ignoredComplaints}</td>
                  <td>${Utils.formatCurrency(penalty.penaltyAmount)}</td>
                  <td>
                    <span class="badge ${penalty.status === 'imposed' ? 'badge-error' : penalty.status === 'pending' ? 'badge-warning' : 'badge-success'}">
                      ${Utils.capitalize(penalty.status)}
                    </span>
                  </td>
                  <td>
                    ${penalty.status === 'pending' ? 
                      '<button class="btn btn-error" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">Impose Penalty</button>' : 
                      '<button class="btn btn-ghost" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">View Details</button>'
                    }
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
        </div>
      </div>
    `;

    modal.show('Penalty Oversight', content, { size: '800px' });
  }

  viewAllCampaigns() {
    const content = `
      <div class="campaign-management">
        <h3 style="margin-bottom: 2rem;">Campaign Management</h3>
        
        <div class="campaign-filters" style="margin-bottom: 2rem;">
          <div style="display: flex; gap: 1rem; align-items: center;">
            <select class="form-control" style="width: auto;">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
            <select class="form-control" style="width: auto;">
              <option value="">All Types</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="occasionally">Occasional</option>
            </select>
            <button class="btn btn-primary">
              <i class="fas fa-plus"></i>
              New Campaign
            </button>
          </div>
        </div>
        
        <div class="campaigns-grid" style="display: grid; gap: 1rem;">
          ${this.campaigns.map(campaign => `
            <div class="campaign-card" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1.5rem;">
              <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
                <div style="flex: 1;">
                  <h4 style="margin-bottom: 0.5rem;">${campaign.name}</h4>
                  <div style="color: var(--gray-600); margin-bottom: 0.5rem;">${campaign.area} • ${Utils.capitalize(campaign.type)}</div>
                  <div style="font-size: 0.875rem; color: var(--gray-500);">Starts: ${Utils.formatDate(campaign.startDate)}</div>
                </div>
                <div style="text-align: right;">
                  <span class="badge ${campaign.status === 'active' ? 'badge-success' : campaign.status === 'scheduled' ? 'badge-warning' : 'badge-info'}">
                    ${Utils.capitalize(campaign.status)}
                  </span>
                  <div style="margin-top: 0.5rem; font-weight: 600; color: var(--primary);">${campaign.participants} participants</div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-ghost">
                  <i class="fas fa-eye"></i>
                  View
                </button>
                <button class="btn btn-ghost">
                  <i class="fas fa-edit"></i>
                  Edit
                </button>
                ${campaign.status === 'scheduled' ? 
                  '<button class="btn btn-success"><i class="fas fa-play"></i> Start</button>' : ''
                }
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
        </div>
      </div>
    `;

    modal.show('Campaign Management', content, { size: '900px' });
  }

  generateSystemReport() {
    notifications.info('Report Generation', 'Generating comprehensive system report...');
    
    setTimeout(() => {
      notifications.success('Report Ready', 'System report has been generated and is ready for download');
    }, 3000);
  }

  viewRevenueDetails() {
    const revenue = this.calculateRevenue();
    const monthlyData = [
      { month: 'Jan', ecommerce: 150000, services: 80000 },
      { month: 'Feb', ecommerce: 180000, services: 85000 },
      { month: 'Mar', ecommerce: 200000, services: 90000 },
      { month: 'Apr', ecommerce: 220000, services: 95000 }
    ];

    const content = `
      <div class="revenue-details">
        <h3 style="margin-bottom: 2rem;">Revenue Analytics</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
          <div style="text-align: center; padding: 1rem; background: var(--primary); color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: 700;">${Utils.formatCurrency(revenue.total)}</div>
            <div>Total Revenue</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: var(--success); color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: 700;">${Utils.formatCurrency(revenue.ecommerce)}</div>
            <div>E-commerce</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: var(--secondary); color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: 700;">${Utils.formatCurrency(revenue.services)}</div>
            <div>Services</div>
          </div>
        </div>
        
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Month</th>
                <th>E-commerce Revenue</th>
                <th>Services Revenue</th>
                <th>Total</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              ${monthlyData.map((data, index) => {
                const total = data.ecommerce + data.services;
                const prevTotal = index > 0 ? monthlyData[index - 1].ecommerce + monthlyData[index - 1].services : total;
                const growth = index > 0 ? ((total - prevTotal) / prevTotal * 100).toFixed(1) : 0;
                
                return `
                  <tr>
                    <td>${data.month}</td>
                    <td>${Utils.formatCurrency(data.ecommerce)}</td>
                    <td>${Utils.formatCurrency(data.services)}</td>
                    <td style="font-weight: 600;">${Utils.formatCurrency(total)}</td>
                    <td style="color: ${growth > 0 ? 'var(--success)' : 'var(--error)'};">
                      ${growth > 0 ? '+' : ''}${growth}%
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
        </div>
      </div>
    `;

    modal.show('Revenue Details', content, { size: '800px' });
  }

  bindEvents() {
    // Add any event listeners specific to superadmin dashboard
  }

  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export
window.SuperadminDashboard = new SuperadminDashboard();