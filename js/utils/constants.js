// Application Constants
const APP_CONFIG = {
  APP_NAME: 'Smart Waste Management System',
  VERSION: '1.0.0',
  API_BASE_URL: '/api',
  STORAGE_KEY: 'swms_data'
};

const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  GREEN_CHAMPION: 'green-champion',
  WORKER: 'worker',
  CITIZEN: 'citizen'
};

const COMPLAINT_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  VERIFIED: 'verified',
  CLOSED: 'closed'
};

const COMPLAINT_TYPES = [
  'Overflowing Bins',
  'Illegal Dumping',
  'Missed Collection',
  'Broken Equipment',
  'Blocked Drainage',
  'Other'
];

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
};

const TRAINING_MODULES = {
  citizen: [
    { id: 1, title: 'Waste Segregation Basics', duration: '15 min', points: 50 },
    { id: 2, title: 'Recycling Best Practices', duration: '20 min', points: 75 },
    { id: 3, title: 'Community Engagement', duration: '10 min', points: 40 }
  ],
  worker: [
    { id: 1, title: 'Safety Protocols', duration: '30 min', points: 100 },
    { id: 2, title: 'Equipment Handling', duration: '25 min', points: 80 },
    { id: 3, title: 'Efficient Collection Routes', duration: '20 min', points: 60 },
    { id: 4, title: 'Customer Service', duration: '15 min', points: 50 }
  ],
  'green-champion': [
    { id: 1, title: 'Community Leadership', duration: '25 min', points: 90 },
    { id: 2, title: 'Environmental Awareness', duration: '30 min', points: 100 },
    { id: 3, title: 'Waste Reduction Strategies', duration: '20 min', points: 70 },
    { id: 4, title: 'Composting Techniques', duration: '35 min', points: 120 }
  ]
};

const ECOMMERCE_PRODUCTS = [
  { 
    id: 1, 
    name: 'Segregation Dustbin Set', 
    price: 599, 
    image: '🗂️',
    description: 'Color-coded 3-bin set for waste segregation',
    category: 'containers'
  },
  { 
    id: 2, 
    name: 'Compost Bin', 
    price: 899, 
    image: '🌱',
    description: 'Organic waste composting bin for home use',
    category: 'composting'
  },
  { 
    id: 3, 
    name: 'Biodegradable Bags', 
    price: 199, 
    image: '🛍️',
    description: 'Pack of 100 eco-friendly waste bags',
    category: 'supplies'
  },
  { 
    id: 4, 
    name: 'Recycling Guide Book', 
    price: 299, 
    image: '📚',
    description: 'Complete guide to effective recycling',
    category: 'education'
  }
];

// Mock data for demonstration
const MOCK_DATA = {
  complaints: [
    {
      id: 'C001',
      title: 'Overflowing bin on Main Street',
      description: 'The dustbin near the bus stop is overflowing',
      location: 'Main Street, Near Bus Stop',
      status: COMPLAINT_STATUS.PENDING,
      priority: 'high',
      submittedBy: 'John Doe',
      submittedAt: new Date('2024-01-15T10:30:00'),
      assignedTo: null,
      category: 'Overflowing Bins'
    },
    {
      id: 'C002',
      title: 'Missed garbage collection',
      description: 'Garbage not collected for 3 days in our area',
      location: 'Green Valley Apartments',
      status: COMPLAINT_STATUS.ASSIGNED,
      priority: 'medium',
      submittedBy: 'Jane Smith',
      submittedAt: new Date('2024-01-14T14:20:00'),
      assignedTo: 'Worker001',
      category: 'Missed Collection'
    }
  ],
  users: {
    'demo@example.com': {
      id: 'user001',
      name: 'Demo User',
      email: 'demo@example.com',
      role: USER_ROLES.CITIZEN,
      greenPoints: 250,
      trainingProgress: 65
    }
  },
  stats: {
    totalComplaints: 1245,
    resolvedComplaints: 1180,
    pendingComplaints: 65,
    activeWorkers: 45,
    greenChampions: 123,
    citizenSatisfaction: 94.2
  }
};