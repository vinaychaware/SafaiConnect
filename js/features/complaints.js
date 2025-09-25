// Complaint Management System
class ComplaintManager {
  constructor() {
    this.complaints = this.loadComplaints();
  }

  loadComplaints() {
    // Load from localStorage or return mock data
    return Utils.storage.get('complaints') || [...MOCK_DATA.complaints];
  }

  saveComplaints() {
    Utils.storage.set('complaints', this.complaints);
  }

  createComplaint(complaintData) {
    const currentUser = authSystem.getCurrentUser();
    
    const complaint = {
      id: 'C' + Date.now(),
      title: complaintData.title,
      description: complaintData.description,
      location: complaintData.location,
      category: complaintData.category,
      priority: complaintData.priority,
      status: COMPLAINT_STATUS.PENDING,
      submittedBy: currentUser.name,
      submittedAt: new Date(),
      assignedTo: null,
      resolvedAt: null,
      photos: complaintData.photos || []
    };

    this.complaints.unshift(complaint);
    this.saveComplaints();

    // Notify admin
    this.notifyAdmin(complaint);
    
    return complaint;
  }

  updateComplaint(complaintId, updates) {
    const index = this.complaints.findIndex(c => c.id === complaintId);
    if (index !== -1) {
      this.complaints[index] = { ...this.complaints[index], ...updates, updatedAt: new Date() };
      this.saveComplaints();
      return this.complaints[index];
    }
    return null;
  }

  assignComplaint(complaintId, workerId) {
    const complaint = this.updateComplaint(complaintId, {
      assignedTo: workerId,
      status: COMPLAINT_STATUS.ASSIGNED
    });

    if (complaint) {
      this.notifyWorker(complaint, workerId);
      return true;
    }
    return false;
  }

  resolveComplaint(complaintId, resolutionData) {
    const complaint = this.updateComplaint(complaintId, {
      status: COMPLAINT_STATUS.COMPLETED,
      resolvedAt: new Date(),
      resolutionNotes: resolutionData.notes,
      proofPhoto: resolutionData.photo
    });

    if (complaint) {
      this.notifyCitizen(complaint);
      return true;
    }
    return false;
  }

  approveComplaint(complaintId) {
    const complaint = this.updateComplaint(complaintId, {
      status: COMPLAINT_STATUS.VERIFIED
    });

    if (complaint) {
      // Award points to citizen
      this.awardPointsToCitizen(complaint);
      return true;
    }
    return false;
  }

  viewComplaint(complaintId) {
    const complaint = this.complaints.find(c => c.id === complaintId);
    if (!complaint) {
      notifications.error('Not Found', 'Complaint not found');
      return;
    }

    const content = `
      <div class="complaint-details">
        <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 2rem;">
          <div>
            <h3 style="margin-bottom: 0.5rem;">${complaint.title}</h3>
            <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
              ${Utils.getStatusBadge(complaint.status)}
              ${Utils.getPriorityBadge(complaint.priority)}
              <span class="badge badge-info">${complaint.category}</span>
            </div>
          </div>
          <div style="text-align: right; color: var(--gray-600); font-size: 0.875rem;">
            <div>ID: ${complaint.id}</div>
            <div>${Utils.formatDate(complaint.submittedAt)}</div>
          </div>
        </div>

        <div class="complaint-info">
          <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem;">Description</h4>
            <p style="color: var(--gray-600); line-height: 1.6;">${complaint.description}</p>
          </div>

          <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem;">Location</h4>
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-600);">
              <i class="fas fa-map-marker-alt"></i>
              <span>${complaint.location}</span>
            </div>
          </div>

          <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem;">Submitted By</h4>
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-600);">
              <i class="fas fa-user"></i>
              <span>${complaint.submittedBy}</span>
            </div>
          </div>

          ${complaint.assignedTo ? `
            <div style="margin-bottom: 2rem;">
              <h4 style="margin-bottom: 1rem;">Assigned To</h4>
              <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-600);">
                <i class="fas fa-hard-hat"></i>
                <span>${complaint.assignedTo}</span>
              </div>
            </div>
          ` : ''}

          ${complaint.resolvedAt ? `
            <div style="margin-bottom: 2rem;">
              <h4 style="margin-bottom: 1rem;">Resolved On</h4>
              <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--success);">
                <i class="fas fa-check-circle"></i>
                <span>${Utils.formatDate(complaint.resolvedAt)}</span>
              </div>
            </div>
          ` : ''}

          ${complaint.resolutionNotes ? `
            <div style="margin-bottom: 2rem;">
              <h4 style="margin-bottom: 1rem;">Resolution Notes</h4>
              <p style="color: var(--gray-600); line-height: 1.6;">${complaint.resolutionNotes}</p>
            </div>
          ` : ''}
        </div>

        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
          ${this.getComplaintActions(complaint).map(action => 
            `<button class="btn btn-${action.type}" onclick="${action.onclick}">
              <i class="fas fa-${action.icon}"></i>
              ${action.label}
            </button>`
          ).join('')}
        </div>
      </div>
    `;

    modal.show(`Complaint Details - ${complaint.id}`, content, { size: '700px' });
  }

  getComplaintActions(complaint) {
    const currentUser = authSystem.getCurrentUser();
    const userRole = authSystem.getCurrentRole();
    const actions = [];

    if (userRole === USER_ROLES.ADMIN) {
      if (complaint.status === COMPLAINT_STATUS.PENDING) {
        actions.push({
          type: 'primary',
          icon: 'user-plus',
          label: 'Assign Worker',
          onclick: `window.ComplaintManager.showAssignmentModal('${complaint.id}')`
        });
      }

      if (complaint.status === COMPLAINT_STATUS.COMPLETED) {
        actions.push({
          type: 'success',
          icon: 'check',
          label: 'Approve',
          onclick: `window.ComplaintManager.approveComplaint('${complaint.id}'); modal.hide();`
        });
      }
    }

    if (userRole === USER_ROLES.WORKER && complaint.assignedTo === currentUser.name) {
      if (complaint.status === COMPLAINT_STATUS.ASSIGNED) {
        actions.push({
          type: 'success',
          icon: 'check',
          label: 'Mark Complete',
          onclick: `window.ComplaintManager.showCompletionModal('${complaint.id}')`
        });
      }
    }

    return actions;
  }

  showAssignmentModal(complaintId) {
    const workers = [
      { id: 'W001', name: 'Carlos Garcia', zone: 'Zone A' },
      { id: 'W002', name: 'Maria Lopez', zone: 'Zone B' },
      { id: 'W003', name: 'Ahmed Hassan', zone: 'Zone C' }
    ];

    const content = `
      <div class="assignment-modal">
        <h3 style="margin-bottom: 2rem; text-align: center;">Assign Worker</h3>
        
        <div class="worker-selection">
          <div class="form-group" style="margin-bottom: 2rem;">
            <label style="display: block; margin-bottom: 1rem; font-weight: 600;">Select Worker</label>
            <div class="worker-grid" style="display: grid; gap: 1rem;">
              ${workers.map(worker => `
                <div class="worker-option" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1rem; cursor: pointer; transition: all 0.2s;" onclick="window.ComplaintManager.selectWorker('${worker.id}', '${worker.name}')">
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                      ${worker.name.charAt(0)}
                    </div>
                    <div>
                      <div style="font-weight: 600;">${worker.name}</div>
                      <div style="font-size: 0.875rem; color: var(--gray-600);">${worker.zone}</div>
                    </div>
                  </div>
                  <input type="radio" name="selectedWorker" value="${worker.id}" style="display: none;">
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="form-group" style="margin-bottom: 2rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Priority Instructions</label>
            <textarea class="form-control" rows="3" id="assignmentNotes" placeholder="Special instructions for the worker..."></textarea>
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
            <button class="btn btn-primary" onclick="window.ComplaintManager.confirmAssignment('${complaintId}')">
              <i class="fas fa-check"></i>
              Assign Worker
            </button>
          </div>
        </div>
      </div>
    `;

    modal.show('Assign Worker to Complaint', content, { size: '600px' });
    this.selectedWorker = null;
  }

  selectWorker(workerId, workerName) {
    // Remove previous selection
    document.querySelectorAll('.worker-option').forEach(option => {
      option.style.borderColor = 'var(--gray-200)';
      option.style.backgroundColor = '';
    });

    // Highlight selected worker
    event.currentTarget.style.borderColor = 'var(--primary)';
    event.currentTarget.style.backgroundColor = 'var(--gray-50)';

    this.selectedWorker = { id: workerId, name: workerName };
  }

  confirmAssignment(complaintId) {
    if (!this.selectedWorker) {
      notifications.warning('Selection Required', 'Please select a worker to assign');
      return;
    }

    const success = this.assignComplaint(complaintId, this.selectedWorker.name);
    if (success) {
      notifications.success('Assignment Complete', `Complaint assigned to ${this.selectedWorker.name}`);
      modal.hide();
      
      // Refresh current dashboard
      if (window.currentDashboard && window.currentDashboard.refresh) {
        window.currentDashboard.refresh();
      }
    }
  }

  showCompletionModal(complaintId) {
    const content = `
      <div class="completion-modal">
        <h3 style="margin-bottom: 2rem; text-align: center;">Mark Complaint as Complete</h3>
        
        <div class="completion-form">
          <div class="form-group" style="margin-bottom: 2rem;">
            <label style="display: block; margin-bottom: 1rem; font-weight: 600;">Upload Proof Photo</label>
            <div class="photo-upload-area" style="border: 2px dashed var(--gray-300); border-radius: 8px; padding: 2rem; text-align: center; background: var(--gray-50);">
              <i class="fas fa-camera" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
              <p style="margin-bottom: 1rem; color: var(--gray-600);">Upload a photo showing the completed work</p>
              <button type="button" class="btn btn-secondary" onclick="window.ComplaintManager.captureProofPhoto()">
                <i class="fas fa-camera"></i>
                Capture Photo
              </button>
            </div>
          </div>
          
          <div class="form-group" style="margin-bottom: 2rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Resolution Notes</label>
            <textarea class="form-control" rows="4" id="resolutionNotes" placeholder="Describe the work completed and any additional information..."></textarea>
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
            <button class="btn btn-success" onclick="window.ComplaintManager.confirmCompletion('${complaintId}')">
              <i class="fas fa-check"></i>
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    `;

    modal.show('Complete Complaint Resolution', content, { size: '600px' });
    this.proofPhotoUploaded = false;
  }

  captureProofPhoto() {
    const photoArea = document.querySelector('.photo-upload-area');
    
    photoArea.innerHTML = `
      <div style="color: var(--primary);">
        <i class="fas fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <p>Capturing photo with GPS coordinates...</p>
      </div>
    `;

    // Simulate photo capture
    setTimeout(() => {
      photoArea.innerHTML = `
        <div style="color: var(--success);">
          <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <p>Photo captured successfully!</p>
          <div style="font-size: 0.875rem; color: var(--gray-600); margin-top: 1rem;">
            GPS: 28.6139°N, 77.2090°E<br>
            Time: ${new Date().toLocaleString()}
          </div>
        </div>
      `;
      this.proofPhotoUploaded = true;
    }, 3000);
  }

  confirmCompletion(complaintId) {
    if (!this.proofPhotoUploaded) {
      notifications.warning('Photo Required', 'Please upload a proof photo before marking as complete');
      return;
    }

    const notes = document.getElementById('resolutionNotes').value;
    const success = this.resolveComplaint(complaintId, {
      notes: notes,
      photo: 'proof_photo_' + Date.now() + '.jpg'
    });

    if (success) {
      notifications.success('Complaint Completed', 'Complaint has been marked as complete and sent for admin approval');
      modal.hide();
      
      // Refresh current dashboard
      if (window.currentDashboard && window.currentDashboard.refresh) {
        window.currentDashboard.refresh();
      }
    }
  }

  notifyAdmin(complaint) {
    // In a real system, this would send a notification to admins
    console.log('New complaint submitted:', complaint.id);
  }

  notifyWorker(complaint, workerId) {
    // In a real system, this would send a notification to the worker
    notifications.info('Assignment Notification', `New task assigned to ${complaint.assignedTo}`);
  }

  notifyCitizen(complaint) {
    // In a real system, this would notify the citizen who submitted the complaint
    notifications.success('Complaint Resolution', `Your complaint "${complaint.title}" has been resolved!`);
  }

  awardPointsToCitizen(complaint) {
    // Award points based on priority
    const pointsMap = {
      'high': 50,
      'medium': 30,
      'low': 20
    };

    const points = pointsMap[complaint.priority] || 25;
    
    // In a real system, you would update the citizen's points in the database
    notifications.showGreenPoints(points, 'valid complaint resolution');
  }

  getComplaintsByUser(userId) {
    return this.complaints.filter(c => c.submittedBy === userId);
  }

  getComplaintsByWorker(workerId) {
    return this.complaints.filter(c => c.assignedTo === workerId);
  }

  getComplaintsByStatus(status) {
    return this.complaints.filter(c => c.status === status);
  }

  getComplaintStats() {
    const total = this.complaints.length;
    const byStatus = {};
    
    Object.values(COMPLAINT_STATUS).forEach(status => {
      byStatus[status] = this.complaints.filter(c => c.status === status).length;
    });

    const byPriority = {
      high: this.complaints.filter(c => c.priority === 'high').length,
      medium: this.complaints.filter(c => c.priority === 'medium').length,
      low: this.complaints.filter(c => c.priority === 'low').length
    };

    return {
      total,
      byStatus,
      byPriority,
      resolutionRate: total > 0 ? (byStatus[COMPLAINT_STATUS.VERIFIED] / total) * 100 : 0
    };
  }
}

// Initialize complaint manager
window.ComplaintManager = new ComplaintManager();