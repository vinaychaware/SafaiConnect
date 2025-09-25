// Utility helper functions
const Utils = {
  // Generate unique ID
  generateId: () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  },

  // Format date
  formatDate: (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Calculate time ago
  timeAgo: (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return 'Just now';
  },

  // Capitalize first letter
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Format currency
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  },

  // Get status badge HTML
  getStatusBadge: (status) => {
    const statusClasses = {
      [COMPLAINT_STATUS.PENDING]: 'badge-warning',
      [COMPLAINT_STATUS.ASSIGNED]: 'badge-info',
      [COMPLAINT_STATUS.IN_PROGRESS]: 'badge-warning',
      [COMPLAINT_STATUS.COMPLETED]: 'badge-success',
      [COMPLAINT_STATUS.VERIFIED]: 'badge-success',
      [COMPLAINT_STATUS.CLOSED]: 'badge-success'
    };

    const statusLabels = {
      [COMPLAINT_STATUS.PENDING]: 'Pending',
      [COMPLAINT_STATUS.ASSIGNED]: 'Assigned',
      [COMPLAINT_STATUS.IN_PROGRESS]: 'In Progress',
      [COMPLAINT_STATUS.COMPLETED]: 'Completed',
      [COMPLAINT_STATUS.VERIFIED]: 'Verified',
      [COMPLAINT_STATUS.CLOSED]: 'Closed'
    };

    return `<span class="badge ${statusClasses[status] || 'badge-info'}">${statusLabels[status] || status}</span>`;
  },

  // Get priority badge HTML
  getPriorityBadge: (priority) => {
    const priorityClasses = {
      'low': 'badge-info',
      'medium': 'badge-warning',
      'high': 'badge-error'
    };

    return `<span class="badge ${priorityClasses[priority] || 'badge-info'}">${Utils.capitalize(priority)}</span>`;
  },

  // Local storage helpers
  storage: {
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    },

    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Error writing to localStorage:', error);
        return false;
      }
    },

    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
      }
    }
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Validate email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Get user display name
  getUserDisplayName: (user) => {
    return user.name || user.email || 'Unknown User';
  },

  // Generate random color for avatars
  getAvatarColor: (name) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  },

  // Check if user has permission
  hasPermission: (userRole, requiredRole) => {
    const roleHierarchy = {
      [USER_ROLES.CITIZEN]: 1,
      [USER_ROLES.WORKER]: 2,
      [USER_ROLES.GREEN_CHAMPION]: 2,
      [USER_ROLES.ADMIN]: 3,
      [USER_ROLES.SUPERADMIN]: 4
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  },

  // Mock geolocation
  getCurrentLocation: () => {
    return new Promise((resolve) => {
      // Simulate getting location
      setTimeout(() => {
        resolve({
          latitude: 28.6139 + (Math.random() - 0.5) * 0.1,
          longitude: 77.2090 + (Math.random() - 0.5) * 0.1
        });
      }, 1000);
    });
  },

  // Generate mock complaint data
  generateMockComplaint: (overrides = {}) => {
    const complaints = [
      'Overflowing dustbin near market',
      'Illegal dumping in vacant lot',
      'Missed garbage collection',
      'Broken waste container',
      'Blocked drainage system'
    ];

    const locations = [
      'Main Street Market',
      'Green Valley Apartments',
      'City Center Plaza',
      'Riverside Park',
      'Industrial Area'
    ];

    return {
      id: 'C' + Date.now(),
      title: complaints[Math.floor(Math.random() * complaints.length)],
      description: 'Detailed description of the waste management issue',
      location: locations[Math.floor(Math.random() * locations.length)],
      status: COMPLAINT_STATUS.PENDING,
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      submittedBy: 'User' + Math.floor(Math.random() * 100),
      submittedAt: new Date(),
      assignedTo: null,
      category: COMPLAINT_TYPES[Math.floor(Math.random() * COMPLAINT_TYPES.length)],
      ...overrides
    };
  }
};

// Export for use in other modules
window.Utils = Utils;