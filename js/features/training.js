// Training System
class TrainingSystem {
  constructor() {
    this.userProgress = this.loadUserProgress();
    this.certificates = this.loadCertificates();
  }

  loadUserProgress() {
    return Utils.storage.get('trainingProgress') || {};
  }

  saveUserProgress() {
    Utils.storage.set('trainingProgress', this.userProgress);
  }

  loadCertificates() {
    return Utils.storage.get('certificates') || [];
  }

  saveCertificates() {
    Utils.storage.set('certificates', this.certificates);
  }

  getUserProgress(userId) {
    return this.userProgress[userId] || {
      completedModules: [],
      totalPoints: 0,
      certificates: [],
      currentStreak: 0,
      lastActivityDate: null
    };
  }

  updateUserProgress(userId, progress) {
    this.userProgress[userId] = { ...this.getUserProgress(userId), ...progress };
    this.saveUserProgress();
  }

  startTrainingModule(moduleId, userId) {
    const user = authSystem.getCurrentUser();
    const userRole = authSystem.getCurrentRole();
    const modules = TRAINING_MODULES[userRole] || [];
    const module = modules.find(m => m.id === moduleId);
    
    if (!module) {
      notifications.error('Module Not Found', 'Training module not available');
      return false;
    }

    // Check if already completed
    const progress = this.getUserProgress(userId);
    if (progress.completedModules.includes(moduleId)) {
      notifications.info('Already Completed', 'You have already completed this training module');
      return false;
    }

    return this.simulateTrainingProgress(module, userId);
  }

  simulateTrainingProgress(module, userId) {
    const content = `
      <div class="training-simulator">
        <div class="training-header" style="text-align: center; margin-bottom: 2rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
          <h2>${module.title}</h2>
          <p style="color: var(--gray-600);">Interactive Training Session</p>
        </div>

        <div class="training-content">
          <div class="lesson-progress" style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
              <span style="font-weight: 600;">Progress</span>
              <span id="progressPercent">0%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" id="trainingProgressBar" style="width: 0%; transition: width 0.3s ease;"></div>
            </div>
          </div>

          <div class="lesson-content" id="lessonContent">
            ${this.generateLessonContent(module)}
          </div>

          <div class="training-actions" style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
            <button class="btn btn-ghost" onclick="modal.hide()">Exit Training</button>
            <button class="btn btn-primary" id="continueBtn" onclick="window.TrainingSystem.advanceLesson()">
              <i class="fas fa-arrow-right"></i>
              Continue
            </button>
          </div>
        </div>
      </div>
    `;

    modal.show(`Training: ${module.title}`, content, { size: '800px' });

    // Initialize training simulation
    this.currentModule = module;
    this.currentUserId = userId;
    this.lessonStep = 0;
    this.totalSteps = 5; // Simulated lesson steps
    this.updateLessonContent();

    return true;
  }

  generateLessonContent(module) {
    const contentMap = {
      'Waste Segregation Basics': {
        title: 'Understanding Waste Types',
        content: `
          <div class="lesson-section">
            <h3 style="margin-bottom: 1rem;">Types of Waste</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗂️</div>
                <h4>Organic Waste</h4>
                <p style="font-size: 0.875rem; color: var(--gray-600);">Food scraps, garden waste</p>
              </div>
              <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">♻️</div>
                <h4>Recyclable</h4>
                <p style="font-size: 0.875rem; color: var(--gray-600);">Paper, plastic, metal</p>
              </div>
              <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗑️</div>
                <h4>General Waste</h4>
                <p style="font-size: 0.875rem; color: var(--gray-600);">Non-recyclable items</p>
              </div>
            </div>
          </div>
        `
      },
      'Safety Protocols': {
        title: 'Worker Safety Guidelines',
        content: `
          <div class="lesson-section">
            <h3 style="margin-bottom: 1rem;">Essential Safety Equipment</h3>
            <div class="safety-checklist">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <i class="fas fa-hard-hat" style="color: var(--warning); font-size: 1.5rem;"></i>
                <span>Safety helmet must be worn at all times</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <i class="fas fa-hand-paper" style="color: var(--primary); font-size: 1.5rem;"></i>
                <span>Protective gloves for handling waste materials</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <i class="fas fa-eye" style="color: var(--secondary); font-size: 1.5rem;"></i>
                <span>Safety goggles when required</span>
              </div>
            </div>
          </div>
        `
      },
      'Community Leadership': {
        title: 'Leading Environmental Change',
        content: `
          <div class="lesson-section">
            <h3 style="margin-bottom: 1rem;">Leadership Principles</h3>
            <div style="space-y: 1rem;">
              <div style="margin-bottom: 1rem;">
                <h4 style="color: var(--primary); margin-bottom: 0.5rem;">1. Lead by Example</h4>
                <p style="color: var(--gray-600);">Demonstrate proper waste management practices in your daily life</p>
              </div>
              <div style="margin-bottom: 1rem;">
                <h4 style="color: var(--primary); margin-bottom: 0.5rem;">2. Educate Others</h4>
                <p style="color: var(--gray-600);">Share knowledge and encourage community participation</p>
              </div>
              <div style="margin-bottom: 1rem;">
                <h4 style="color: var(--primary); margin-bottom: 0.5rem;">3. Organize Initiatives</h4>
                <p style="color: var(--gray-600);">Plan and execute community cleanup drives and awareness programs</p>
              </div>
            </div>
          </div>
        `
      }
    };

    return contentMap[module.title] || {
      title: 'Training Content',
      content: `
        <div class="lesson-section">
          <h3 style="margin-bottom: 1rem;">${module.title}</h3>
          <p style="color: var(--gray-600); line-height: 1.6;">
            This comprehensive training module covers all aspects of ${module.title.toLowerCase()}. 
            You'll learn practical skills and best practices that you can apply immediately.
          </p>
        </div>
      `
    };
  }

  updateLessonContent() {
    const progressBar = document.getElementById('trainingProgressBar');
    const progressPercent = document.getElementById('progressPercent');
    const continueBtn = document.getElementById('continueBtn');

    if (!progressBar || !progressPercent) return;

    const progress = Math.round((this.lessonStep / this.totalSteps) * 100);
    progressBar.style.width = progress + '%';
    progressPercent.textContent = progress + '%';

    // Update button text based on progress
    if (continueBtn) {
      if (this.lessonStep >= this.totalSteps - 1) {
        continueBtn.innerHTML = '<i class="fas fa-check"></i> Complete Training';
        continueBtn.onclick = () => this.completeTraining();
      } else {
        continueBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Continue';
      }
    }
  }

  advanceLesson() {
    this.lessonStep++;
    this.updateLessonContent();

    if (this.lessonStep < this.totalSteps) {
      // Show different content for each step
      notifications.info('Progress', `Lesson step ${this.lessonStep} of ${this.totalSteps} completed`);
    }
  }

  completeTraining() {
    if (!this.currentModule || !this.currentUserId) return;

    // Update user progress
    const progress = this.getUserProgress(this.currentUserId);
    progress.completedModules.push(this.currentModule.id);
    progress.totalPoints += this.currentModule.points;
    progress.lastActivityDate = new Date().toISOString();
    
    // Update streak
    const lastActivity = progress.lastActivityDate ? new Date(progress.lastActivityDate) : null;
    const today = new Date();
    if (lastActivity && this.isSameDay(lastActivity, today)) {
      // Same day, don't increment streak
    } else if (lastActivity && this.isConsecutiveDay(lastActivity, today)) {
      progress.currentStreak += 1;
    } else {
      progress.currentStreak = 1; // Reset streak
    }

    this.updateUserProgress(this.currentUserId, progress);

    // Update user's green points and training progress in auth system
    const currentUser = authSystem.getCurrentUser();
    if (currentUser) {
      currentUser.greenPoints = (currentUser.greenPoints || 0) + this.currentModule.points;
      currentUser.completedModules = progress.completedModules;
      currentUser.trainingProgress = Math.round((progress.completedModules.length / this.getTotalModulesForRole()) * 100);
      authSystem.updateUserProfile(currentUser);
    }

    // Generate certificate if all modules completed
    this.checkForCertificate(this.currentUserId);

    // Show completion notification
    notifications.success('Training Complete!', 
      `You've earned ${this.currentModule.points} Green Points! Your total streak: ${progress.currentStreak} days`
    );

    modal.hide();

    // Refresh current dashboard
    if (window.currentDashboard && window.currentDashboard.refresh) {
      window.currentDashboard.refresh();
    }

    // Reset training state
    this.currentModule = null;
    this.currentUserId = null;
    this.lessonStep = 0;
  }

  getTotalModulesForRole() {
    const userRole = authSystem.getCurrentRole();
    const modules = TRAINING_MODULES[userRole] || [];
    return modules.length;
  }

  checkForCertificate(userId) {
    const userRole = authSystem.getCurrentRole();
    const modules = TRAINING_MODULES[userRole] || [];
    const progress = this.getUserProgress(userId);

    if (progress.completedModules.length >= modules.length) {
      const certificate = this.generateCertificate(userId, userRole);
      this.certificates.push(certificate);
      this.saveCertificates();

      progress.certificates.push(certificate.id);
      this.updateUserProgress(userId, progress);

      setTimeout(() => {
        notifications.success('Certificate Earned!', 
          `Congratulations! You've earned a ${Utils.capitalize(userRole.replace('-', ' '))} Training Certificate!`
        );
      }, 2000);
    }
  }

  generateCertificate(userId, role) {
    const user = authSystem.getCurrentUser();
    return {
      id: 'CERT' + Date.now(),
      userId: userId,
      userName: user.name,
      role: role,
      title: `${Utils.capitalize(role.replace('-', ' '))} Training Certificate`,
      issueDate: new Date().toISOString(),
      modules: TRAINING_MODULES[role] ? TRAINING_MODULES[role].map(m => m.title) : [],
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // Valid for 1 year
    };
  }

  isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
  }

  isConsecutiveDay(lastDate, currentDate) {
    const nextDay = new Date(lastDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return this.isSameDay(nextDay, currentDate);
  }

  getTrainingStats(userId) {
    const progress = this.getUserProgress(userId);
    const userRole = authSystem.getCurrentRole();
    const totalModules = TRAINING_MODULES[userRole] ? TRAINING_MODULES[userRole].length : 0;
    
    return {
      completedModules: progress.completedModules.length,
      totalModules: totalModules,
      completionPercentage: totalModules > 0 ? Math.round((progress.completedModules.length / totalModules) * 100) : 0,
      totalPoints: progress.totalPoints,
      currentStreak: progress.currentStreak,
      certificates: progress.certificates.length,
      lastActivity: progress.lastActivityDate
    };
  }

  getUserCertificates(userId) {
    return this.certificates.filter(cert => cert.userId === userId);
  }

  isModuleCompleted(moduleId, userId) {
    const progress = this.getUserProgress(userId);
    return progress.completedModules.includes(moduleId);
  }

  getLeaderboard() {
    const leaderboard = Object.entries(this.userProgress)
      .map(([userId, progress]) => ({
        userId,
        totalPoints: progress.totalPoints,
        completedModules: progress.completedModules.length,
        currentStreak: progress.currentStreak
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10); // Top 10

    return leaderboard;
  }

  resetUserProgress(userId) {
    this.userProgress[userId] = {
      completedModules: [],
      totalPoints: 0,
      certificates: [],
      currentStreak: 0,
      lastActivityDate: null
    };
    this.saveUserProgress();
  }

  exportCertificate(certificateId) {
    const certificate = this.certificates.find(cert => cert.id === certificateId);
    if (!certificate) {
      notifications.error('Certificate Not Found', 'The requested certificate could not be found');
      return;
    }

    // In a real application, this would generate and download a PDF certificate
    notifications.success('Certificate Export', 'Certificate has been prepared for download');
    
    // Simulate certificate content
    const content = `
      <div class="certificate" style="text-align: center; padding: 2rem; border: 2px solid var(--primary); background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);">
        <div style="margin-bottom: 2rem;">
          <h1 style="color: var(--primary); margin-bottom: 0.5rem;">Certificate of Completion</h1>
          <p style="color: var(--gray-600);">Smart Waste Management Training Program</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">This is to certify that</p>
          <h2 style="color: var(--primary); margin-bottom: 0.5rem; font-size: 2rem;">${certificate.userName}</h2>
          <p style="font-size: 1.125rem;">has successfully completed</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="color: var(--secondary); margin-bottom: 1rem;">${certificate.title}</h3>
          <div style="text-align: left; max-width: 400px; margin: 0 auto;">
            <p style="font-weight: 600; margin-bottom: 0.5rem;">Completed Modules:</p>
            <ul style="list-style: none; padding: 0;">
              ${certificate.modules.map(module => `<li style="margin-bottom: 0.25rem;">✓ ${module}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <p style="color: var(--gray-600);">Issue Date: ${Utils.formatDate(new Date(certificate.issueDate))}</p>
          <p style="color: var(--gray-600);">Valid Until: ${Utils.formatDate(new Date(certificate.validUntil))}</p>
          <p style="color: var(--gray-600);">Certificate ID: ${certificate.id}</p>
        </div>
        
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--gray-200);">
          <p style="color: var(--gray-500); font-size: 0.875rem;">
            Smart Waste Management System<br>
            Municipal Corporation
          </p>
        </div>
      </div>
    `;

    modal.show('Training Certificate', content, { size: '700px' });
  }
}

// Initialize training system
window.TrainingSystem = new TrainingSystem();