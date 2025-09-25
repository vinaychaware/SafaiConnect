// Vehicle Tracking System
class VehicleTracker {
  constructor() {
    this.vehicles = this.loadVehicles();
    this.trackingInterval = null;
    this.isTracking = false;
  }

  loadVehicles() {
    // Load from localStorage or return mock data
    return Utils.storage.get('vehicles') || [
      {
        id: 'GC-001',
        name: 'Garbage Collection Truck 1',
        type: 'collection',
        driver: 'Carlos Garcia',
        zone: 'Zone A',
        status: 'active',
        location: { lat: 28.6139, lng: 77.2090 },
        route: [
          { lat: 28.6139, lng: 77.2090, name: 'Central Depot' },
          { lat: 28.6180, lng: 77.2100, name: 'Main Street Market' },
          { lat: 28.6200, lng: 77.2120, name: 'Green Valley Apartments' },
          { lat: 28.6230, lng: 77.2140, name: 'School Area' }
        ],
        currentRouteIndex: 1,
        speed: 25, // km/h
        fuel: 85,
        capacity: 60,
        lastUpdate: new Date()
      },
      {
        id: 'GC-002',
        name: 'Garbage Collection Truck 2',
        type: 'collection',
        driver: 'Maria Lopez',
        zone: 'Zone B',
        status: 'active',
        location: { lat: 28.6250, lng: 77.2080 },
        route: [
          { lat: 28.6250, lng: 77.2080, name: 'North Depot' },
          { lat: 28.6280, lng: 77.2090, name: 'Industrial Area' },
          { lat: 28.6300, lng: 77.2110, name: 'Residential Complex' },
          { lat: 28.6320, lng: 77.2130, name: 'Community Center' }
        ],
        currentRouteIndex: 2,
        speed: 30,
        fuel: 70,
        capacity: 45,
        lastUpdate: new Date()
      },
      {
        id: 'GC-003',
        name: 'Garbage Collection Truck 3',
        type: 'collection',
        driver: 'Ahmed Hassan',
        zone: 'Zone C',
        status: 'maintenance',
        location: { lat: 28.6100, lng: 77.2150 },
        route: [],
        currentRouteIndex: 0,
        speed: 0,
        fuel: 95,
        capacity: 0,
        lastUpdate: new Date()
      }
    ];
  }

  saveVehicles() {
    Utils.storage.set('vehicles', this.vehicles);
  }

  startTracking() {
    if (this.isTracking) return;
    
    this.isTracking = true;
    this.trackingInterval = setInterval(() => {
      this.updateVehiclePositions();
    }, 5000); // Update every 5 seconds
    
    notifications.success('Tracking Started', 'Vehicle tracking is now active');
  }

  stopTracking() {
    if (!this.isTracking) return;
    
    this.isTracking = false;
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }
    
    notifications.info('Tracking Stopped', 'Vehicle tracking has been disabled');
  }

  updateVehiclePositions() {
    this.vehicles.forEach(vehicle => {
      if (vehicle.status === 'active' && vehicle.route.length > 0) {
        this.moveVehicleAlongRoute(vehicle);
      }
    });
    
    this.saveVehicles();
    this.broadcastVehicleUpdates();
  }

  moveVehicleAlongRoute(vehicle) {
    const currentPoint = vehicle.route[vehicle.currentRouteIndex];
    const nextPoint = vehicle.route[(vehicle.currentRouteIndex + 1) % vehicle.route.length];
    
    if (!currentPoint || !nextPoint) return;

    // Calculate distance and bearing
    const distance = this.calculateDistance(
      vehicle.location.lat, vehicle.location.lng,
      nextPoint.lat, nextPoint.lng
    );

    // Move towards next point
    const moveDistance = (vehicle.speed * 5) / 3600; // 5 seconds worth of movement in km
    
    if (distance <= moveDistance) {
      // Reached the waypoint
      vehicle.location = { lat: nextPoint.lat, lng: nextPoint.lng };
      vehicle.currentRouteIndex = (vehicle.currentRouteIndex + 1) % vehicle.route.length;
      
      // Notify if vehicle reaches citizen area
      this.checkCitizenNotifications(vehicle, nextPoint);
    } else {
      // Move towards the waypoint
      const bearing = this.calculateBearing(
        vehicle.location.lat, vehicle.location.lng,
        nextPoint.lat, nextPoint.lng
      );
      
      const newPosition = this.moveTowards(
        vehicle.location.lat, vehicle.location.lng,
        bearing, moveDistance
      );
      
      vehicle.location = newPosition;
    }
    
    vehicle.lastUpdate = new Date();
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = this.toRadians(lon2 - lon1);
    const lat1Rad = this.toRadians(lat1);
    const lat2Rad = this.toRadians(lat2);
    
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    return Math.atan2(y, x);
  }

  moveTowards(lat, lon, bearing, distance) {
    const R = 6371; // Earth's radius in km
    const latRad = this.toRadians(lat);
    const lonRad = this.toRadians(lon);
    
    const newLatRad = Math.asin(
      Math.sin(latRad) * Math.cos(distance / R) +
      Math.cos(latRad) * Math.sin(distance / R) * Math.cos(bearing)
    );
    
    const newLonRad = lonRad + Math.atan2(
      Math.sin(bearing) * Math.sin(distance / R) * Math.cos(latRad),
      Math.cos(distance / R) - Math.sin(latRad) * Math.sin(newLatRad)
    );
    
    return {
      lat: this.toDegrees(newLatRad),
      lng: this.toDegrees(newLonRad)
    };
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  checkCitizenNotifications(vehicle, waypoint) {
    // Simulate citizen notifications based on waypoint names
    const currentUser = authSystem.getCurrentUser();
    const userRole = authSystem.getCurrentRole();
    
    if (userRole === USER_ROLES.CITIZEN) {
      const citizenAreas = ['Green Valley Apartments', 'Residential Complex', 'School Area'];
      
      if (citizenAreas.includes(waypoint.name)) {
        // Simulate 5-minute warning
        setTimeout(() => {
          notifications.showVehicleAlert(
            `Garbage vehicle ${vehicle.id} is 5 minutes away from ${waypoint.name}!`,
            'warning'
          );
        }, 1000);
        
        // Simulate arrival notification
        setTimeout(() => {
          notifications.showVehicleAlert(
            `Garbage vehicle ${vehicle.id} has arrived at ${waypoint.name}!`,
            'success'
          );
        }, 8000);
      }
    }
  }

  broadcastVehicleUpdates() {
    // In a real system, this would broadcast to all connected clients
    // For demo purposes, we'll trigger updates in the tracking dashboard
    if (window.currentDashboard && window.currentDashboard.currentSection === 'tracking') {
      // Refresh tracking display if it's active
      const trackingStatus = document.querySelector('.vehicle-status');
      if (trackingStatus) {
        this.updateTrackingDisplay();
      }
    }
  }

  updateTrackingDisplay() {
    // Update the tracking display with current vehicle positions
    const activeVehicles = this.vehicles.filter(v => v.status === 'active');
    
    activeVehicles.forEach(vehicle => {
      const currentWaypoint = vehicle.route[vehicle.currentRouteIndex];
      const progress = ((vehicle.currentRouteIndex + 1) / vehicle.route.length) * 100;
      
      // Update progress bars and status displays
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach(bar => {
        if (bar.getAttribute('data-vehicle') === vehicle.id) {
          bar.style.width = progress + '%';
        }
      });
    });
  }

  getVehicleById(vehicleId) {
    return this.vehicles.find(v => v.id === vehicleId);
  }

  getVehiclesByZone(zone) {
    return this.vehicles.filter(v => v.zone === zone);
  }

  getActiveVehicles() {
    return this.vehicles.filter(v => v.status === 'active');
  }

  updateVehicleStatus(vehicleId, status) {
    const vehicle = this.getVehicleById(vehicleId);
    if (vehicle) {
      vehicle.status = status;
      vehicle.lastUpdate = new Date();
      this.saveVehicles();
      
      notifications.info('Vehicle Status Updated', `Vehicle ${vehicleId} status changed to ${status}`);
      return true;
    }
    return false;
  }

  reportVehicleIssue(vehicleId, issue) {
    const vehicle = this.getVehicleById(vehicleId);
    if (vehicle) {
      vehicle.issues = vehicle.issues || [];
      vehicle.issues.push({
        id: 'ISS' + Date.now(),
        type: issue.type,
        description: issue.description,
        severity: issue.severity,
        reportedAt: new Date(),
        status: 'reported'
      });
      
      // If high severity, change vehicle status
      if (issue.severity === 'high') {
        vehicle.status = 'maintenance';
      }
      
      this.saveVehicles();
      
      notifications.warning('Vehicle Issue Reported', `Issue reported for vehicle ${vehicleId}. Maintenance team notified.`);
      return true;
    }
    return false;
  }

  getVehicleStats() {
    const total = this.vehicles.length;
    const active = this.vehicles.filter(v => v.status === 'active').length;
    const maintenance = this.vehicles.filter(v => v.status === 'maintenance').length;
    const offline = this.vehicles.filter(v => v.status === 'offline').length;
    
    const avgFuel = this.vehicles.reduce((acc, v) => acc + v.fuel, 0) / total;
    const avgCapacity = this.vehicles.reduce((acc, v) => acc + v.capacity, 0) / total;
    
    return {
      total,
      active,
      maintenance,
      offline,
      avgFuel: Math.round(avgFuel),
      avgCapacity: Math.round(avgCapacity)
    };
  }

  getNearbyVehicles(lat, lng, radiusKm = 5) {
    return this.vehicles.filter(vehicle => {
      const distance = this.calculateDistance(lat, lng, vehicle.location.lat, vehicle.location.lng);
      return distance <= radiusKm && vehicle.status === 'active';
    }).map(vehicle => ({
      ...vehicle,
      distance: this.calculateDistance(lat, lng, vehicle.location.lat, vehicle.location.lng)
    })).sort((a, b) => a.distance - b.distance);
  }

  estimateArrivalTime(vehicleId, destinationLat, destinationLng) {
    const vehicle = this.getVehicleById(vehicleId);
    if (!vehicle || vehicle.status !== 'active') return null;
    
    const distance = this.calculateDistance(
      vehicle.location.lat, vehicle.location.lng,
      destinationLat, destinationLng
    );
    
    const estimatedMinutes = Math.round((distance / vehicle.speed) * 60);
    return estimatedMinutes;
  }
}

// Initialize vehicle tracker
window.VehicleTracker = new VehicleTracker();

// Auto-start tracking for demo purposes
setTimeout(() => {
  window.VehicleTracker.startTracking();
}, 2000);