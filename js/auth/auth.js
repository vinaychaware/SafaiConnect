// Authentication system
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.currentRole = null;
    this.init();
  }

  init() {
    // Check if user is already logged in
    this.checkExistingSession();
    
    // Setup login form
    this.setupLoginForm();
    
    // Setup logout
    this.setupLogout();
  }

  setupLoginForm() {
    const loginBtn = document.getElementById('loginBtn');
    const roleSelect = document.getElementById('userRole');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginBtn.addEventListener('click', () => {
      const role = roleSelect.value;
      const email = emailInput.value;
      const password = passwordInput.value;

      if (!role) {
        notifications.error('Error', 'Please select your role');
        return;
      }

      if (!email || !password) {
        notifications.error('Error', 'Please enter email and password');
        return;
      }

      this.login(email, password, role);
    });

    // Allow Enter key to submit
    [emailInput, passwordInput].forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          loginBtn.click();
        }
      });
    });
  }

  setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
      this.logout();
    });
  }

  checkExistingSession() {
    const storedUser = Utils.storage.get('currentUser');
    const storedRole = Utils.storage.get('currentRole');
    
    if (storedUser && storedRole) {
      this.currentUser = storedUser;
      this.currentRole = storedRole;
      this.showDashboard();
    }
  }

  async login(email, password, role) {
    // Show loading state
    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    loginBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email/password combination works
      const user = {
        id: 'user_' + Date.now(),
        email: email,
        name: this.generateUserName(email, role),
        role: role,
        greenPoints: Math.floor(Math.random() * 500) + 100,
        trainingProgress: Math.floor(Math.random() * 100),
        completedModules: [],
        joinedAt: new Date(),
        profileImage: null
      };

      this.currentUser = user;
      this.currentRole = role;

      // Store session
      Utils.storage.set('currentUser', user);
      Utils.storage.set('currentRole', role);

      // Show success notification
      notifications.success('Welcome!', `Successfully logged in as ${role.replace('-', ' ')}`);
      
      // Navigate to dashboard
      this.showDashboard();

    } catch (error) {
      notifications.error('Login Failed', 'Please check your credentials and try again');
    } finally {
      // Reset login button
      loginBtn.innerHTML = originalText;
      loginBtn.disabled = false;
    }
  }

  generateUserName(email, role) {
    const names = {
      [USER_ROLES.SUPERADMIN]: ['Alex Thompson', 'Sarah Wilson', 'Michael Chen'],
      [USER_ROLES.ADMIN]: ['David Rodriguez', 'Lisa Johnson', 'James Brown'],
      [USER_ROLES.GREEN_CHAMPION]: ['Emma Davis', 'Noah Martinez', 'Olivia Anderson'],
      [USER_ROLES.WORKER]: ['Carlos Garcia', 'Maria Lopez', 'Ahmed Hassan'],
      [USER_ROLES.CITIZEN]: ['John Smith', 'Jane Doe', 'Robert Johnson']
    };

    const roleNames = names[role] || ['Demo User'];
    return roleNames[Math.floor(Math.random() * roleNames.length)];
  }

  showDashboard() {
    // Hide login screen
    document.getElementById('loginScreen').classList.remove('active');
    
    // Show navigation and main content
    navigation.show();
    navigation.setUser(this.currentUser, this.currentRole);
    
    // Update user info in header
    document.getElementById('userInfo').textContent = 
      `${Utils.getUserDisplayName(this.currentUser)} (${Utils.capitalize(this.currentRole.replace('-', ' '))})`;
  }

  logout() {
    // Clear session
    Utils.storage.remove('currentUser');
    Utils.storage.remove('currentRole');
    
    this.currentUser = null;
    this.currentRole = null;

    // Hide dashboard
    navigation.hide();
    
    // Show login screen
    document.getElementById('loginScreen').classList.add('active');
    
    // Clear form
    document.getElementById('userRole').value = '';
    document.getElementById('email').value = 'demo@example.com';
    document.getElementById('password').value = 'password';
    
    notifications.info('Logged Out', 'You have been successfully logged out');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentRole() {
    return this.currentRole;
  }

  hasPermission(requiredRole) {
    return Utils.hasPermission(this.currentRole, requiredRole);
  }

  updateUserProfile(updates) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      Utils.storage.set('currentUser', this.currentUser);
      return true;
    }
    return false;
  }
}

// Initialize auth system
const authSystem = new AuthSystem();
window.authSystem = authSystem;