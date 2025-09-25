// Notification system
class NotificationSystem {
  constructor() {
    this.container = document.getElementById('notifications');
    this.notifications = [];
  }

  show(title, message, type = 'info', duration = 5000) {
    const notification = this.create(title, message, type);
    this.container.appendChild(notification);
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification);
      }, duration);
    }

    return notification;
  }

  create(title, message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type} fade-in`;
    
    const iconMap = {
      success: 'fa-check-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-times-circle',
      info: 'fa-info-circle'
    };

    const colorMap = {
      success: 'var(--success)',
      warning: 'var(--warning)',
      error: 'var(--error)',
      info: 'var(--primary)'
    };

    notification.innerHTML = `
      <div class="notification-icon" style="color: ${colorMap[type]};">
        <i class="fas ${iconMap[type]}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      this.remove(notification);
    });

    return notification;
  }

  remove(notification) {
    if (notification && notification.parentNode) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  // Predefined notification types
  success(title, message, duration = 5000) {
    return this.show(title, message, 'success', duration);
  }

  warning(title, message, duration = 5000) {
    return this.show(title, message, 'warning', duration);
  }

  error(title, message, duration = 5000) {
    return this.show(title, message, 'error', duration);
  }

  info(title, message, duration = 5000) {
    return this.show(title, message, 'info', duration);
  }

  // Special notification for vehicle tracking
  showVehicleAlert(message, type = 'info') {
    const notification = this.show(
      'Garbage Collection Update',
      message,
      type,
      8000 // Longer duration for vehicle alerts
    );

    // Add special styling for vehicle notifications
    notification.style.borderLeft = '4px solid var(--accent)';
    
    return notification;
  }

  // Show green points earned notification
  showGreenPoints(points, action) {
    const notification = this.show(
      'Green Points Earned!',
      `You earned ${points} points for ${action}`,
      'success',
      6000
    );

    // Add special animation for points
    const icon = notification.querySelector('.notification-icon');
    icon.innerHTML = '<i class="fas fa-coins" style="animation: bounce 0.6s ease-in-out;"></i>';
    
    return notification;
  }
}

// Add bounce animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 20%, 60%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    80% {
      transform: translateY(-5px);
    }
  }
`;
document.head.appendChild(style);

// Initialize notification system
const notifications = new NotificationSystem();
window.notifications = notifications;