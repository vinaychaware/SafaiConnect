// Modal component functionality
class Modal {
  constructor() {
    this.overlay = document.getElementById('modalOverlay');
    this.modal = this.overlay.querySelector('.modal');
    this.title = document.getElementById('modalTitle');
    this.body = document.getElementById('modalBody');
    this.closeBtn = document.getElementById('modalClose');
    
    this.init();
  }

  init() {
    // Close modal on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });

    // Close modal on close button click
    this.closeBtn.addEventListener('click', () => {
      this.hide();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
        this.hide();
      }
    });
  }

  show(title, content, options = {}) {
    this.title.textContent = title;
    
    if (typeof content === 'string') {
      this.body.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      this.body.innerHTML = '';
      this.body.appendChild(content);
    }

    // Apply custom styles if provided
    if (options.size) {
      this.modal.style.maxWidth = options.size;
    } else {
      this.modal.style.maxWidth = '';
    }

    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus management
    const firstFocusable = this.modal.querySelector('input, button, textarea, select, a[href]');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
  }

  hide() {
    this.overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  showComplaintForm(complaint = null) {
    const isEdit = complaint !== null;
    const title = isEdit ? 'Edit Complaint' : 'Submit New Complaint';
    
    const form = document.createElement('form');
    form.innerHTML = `
      <div class="form-group" style="margin-bottom: 1rem;">
        <label for="complaintTitle" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Title</label>
        <input type="text" id="complaintTitle" class="form-control" value="${complaint?.title || ''}" required>
      </div>
      
      <div class="form-group" style="margin-bottom: 1rem;">
        <label for="complaintCategory" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Category</label>
        <select id="complaintCategory" class="form-control" required>
          ${COMPLAINT_TYPES.map(type => 
            `<option value="${type}" ${complaint?.category === type ? 'selected' : ''}>${type}</option>`
          ).join('')}
        </select>
      </div>
      
      <div class="form-group" style="margin-bottom: 1rem;">
        <label for="complaintDescription" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Description</label>
        <textarea id="complaintDescription" class="form-control" rows="4" placeholder="Describe the issue in detail...">${complaint?.description || ''}</textarea>
      </div>
      
      <div class="form-group" style="margin-bottom: 1rem;">
        <label for="complaintLocation" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Location</label>
        <input type="text" id="complaintLocation" class="form-control" value="${complaint?.location || ''}" placeholder="Enter specific location" required>
      </div>
      
      <div class="form-group" style="margin-bottom: 1rem;">
        <label for="complaintPriority" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Priority</label>
        <select id="complaintPriority" class="form-control" required>
          <option value="low" ${complaint?.priority === 'low' ? 'selected' : ''}>Low</option>
          <option value="medium" ${complaint?.priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="high" ${complaint?.priority === 'high' ? 'selected' : ''}>High</option>
        </select>
      </div>
      
      <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
        <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-${isEdit ? 'save' : 'paper-plane'}"></i>
          ${isEdit ? 'Update' : 'Submit'} Complaint
        </button>
      </div>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        title: document.getElementById('complaintTitle').value,
        category: document.getElementById('complaintCategory').value,
        description: document.getElementById('complaintDescription').value,
        location: document.getElementById('complaintLocation').value,
        priority: document.getElementById('complaintPriority').value
      };

      if (isEdit) {
        // Update existing complaint
        window.ComplaintManager.updateComplaint(complaint.id, formData);
        notifications.show('Success', 'Complaint updated successfully', 'success');
      } else {
        // Create new complaint
        window.ComplaintManager.createComplaint(formData);
        notifications.show('Success', 'Complaint submitted successfully', 'success');
      }

      this.hide();
      
      // Refresh the current view
      if (window.currentDashboard && window.currentDashboard.refresh) {
        window.currentDashboard.refresh();
      }
    });

    this.show(title, form, { size: '600px' });
  }

  showTrainingModule(module) {
    const content = `
      <div class="training-module">
        <div class="training-header" style="text-align: center; margin-bottom: 2rem;">
          <div class="training-icon" style="font-size: 3rem; margin-bottom: 1rem;">🎓</div>
          <h3 style="margin-bottom: 0.5rem;">${module.title}</h3>
          <p style="color: var(--gray-600);">Duration: ${module.duration} • Points: ${module.points}</p>
        </div>
        
        <div class="training-content" style="margin-bottom: 2rem;">
          <div class="progress-section" style="margin-bottom: 2rem;">
            <div class="training-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 0%" id="trainingProgress"></div>
              </div>
              <span id="progressText">0%</span>
            </div>
          </div>
          
          <div class="lesson-content">
            <h4 style="margin-bottom: 1rem;">Lesson Content</h4>
            <p style="margin-bottom: 1rem;">This interactive training module will teach you about ${module.title.toLowerCase()}.</p>
            <div class="lesson-video" style="background: var(--gray-100); padding: 3rem; text-align: center; border-radius: 8px; margin-bottom: 1rem;">
              <i class="fas fa-play-circle" style="font-size: 3rem; color: var(--primary);"></i>
              <p style="margin-top: 1rem; color: var(--gray-600);">Interactive content would be loaded here</p>
            </div>
          </div>
        </div>
        
        <div class="training-actions" style="display: flex; gap: 1rem; justify-content: center;">
          <button type="button" class="btn btn-ghost" onclick="modal.hide()">Later</button>
          <button type="button" class="btn btn-primary" id="startTraining">
            <i class="fas fa-play"></i>
            Start Training
          </button>
        </div>
      </div>
    `;

    this.show(`Training Module: ${module.title}`, content, { size: '700px' });

    // Add training simulation
    const startBtn = document.getElementById('startTraining');
    const progressBar = document.getElementById('trainingProgress');
    const progressText = document.getElementById('progressText');

    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Training in Progress...';
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Show completion
          setTimeout(() => {
            notifications.show(
              'Training Complete!',
              `You earned ${module.points} Green Points!`,
              'success'
            );
            
            // Update user's training progress
            const currentUser = Utils.storage.get('currentUser');
            if (currentUser) {
              currentUser.greenPoints = (currentUser.greenPoints || 0) + module.points;
              currentUser.completedModules = currentUser.completedModules || [];
              if (!currentUser.completedModules.includes(module.id)) {
                currentUser.completedModules.push(module.id);
              }
              Utils.storage.set('currentUser', currentUser);
            }
            
            this.hide();
            
            // Refresh dashboard
            if (window.currentDashboard && window.currentDashboard.refresh) {
              window.currentDashboard.refresh();
            }
          }, 1000);
        }
      }, 200);
    });
  }

  showProductDetails(product) {
    const content = `
      <div class="product-details">
        <div class="product-image" style="height: 200px; background: var(--gray-100); display: flex; align-items: center; justify-content: center; font-size: 4rem; margin-bottom: 2rem; border-radius: 8px;">
          ${product.image}
        </div>
        
        <div class="product-info">
          <h3 style="margin-bottom: 1rem;">${product.name}</h3>
          <p style="color: var(--gray-600); margin-bottom: 1rem;">${product.description}</p>
          <div class="product-price" style="font-size: 1.5rem; font-weight: 700; color: var(--primary); margin-bottom: 2rem;">
            ${Utils.formatCurrency(product.price)}
          </div>
          
          <div class="quantity-selector" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
            <label style="font-weight: 600;">Quantity:</label>
            <button type="button" class="btn btn-ghost" onclick="this.nextElementSibling.stepDown()">-</button>
            <input type="number" value="1" min="1" max="10" style="width: 80px; text-align: center; padding: 8px; border: 1px solid var(--gray-300); border-radius: 4px;">
            <button type="button" class="btn btn-ghost" onclick="this.previousElementSibling.stepUp()">+</button>
          </div>
          
          <div class="product-actions" style="display: flex; gap: 1rem;">
            <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="window.EcommerceManager.addToCart(${product.id}, document.querySelector('input[type=number]').value); modal.hide();">
              <i class="fas fa-shopping-cart"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

    this.show(product.name, content, { size: '500px' });
  }
}

// Initialize modal
const modal = new Modal();
window.modal = modal;