const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock data
const mockEvents = [
  {
    id: 1,
    title: '2025 春季音樂節',
    description: '一年一度的春季音樂盛會',
    startDate: '2025-03-15T10:00:00Z',
    endDate: '2025-03-17T22:00:00Z',
    location: '台北小巨蛋',
    imageUrl: 'https://via.placeholder.com/400x200',
    status: 'published',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: '科技創新大會',
    description: '探索最新科技趨勢',
    startDate: '2025-04-20T09:00:00Z',
    endDate: '2025-04-22T18:00:00Z',
    location: '台北國際會議中心',
    imageUrl: 'https://via.placeholder.com/400x200',
    status: 'published',
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z'
  },
  {
    id: 3,
    title: '美食嘉年華',
    description: '品嚐來自世界各地的美食',
    startDate: '2025-05-01T11:00:00Z',
    endDate: '2025-05-05T21:00:00Z',
    location: '信義區香堤廣場',
    imageUrl: 'https://via.placeholder.com/400x200',
    status: 'published',
    createdAt: '2025-01-03T00:00:00Z',
    updatedAt: '2025-01-03T00:00:00Z'
  }
];

// Routes
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/v1/events', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  
  res.json({
    data: mockEvents,
    meta: {
      page,
      limit,
      total: mockEvents.length,
      totalPages: Math.ceil(mockEvents.length / limit)
    }
  });
});

app.get('/api/v1/events/:id', (req, res) => {
  const event = mockEvents.find(e => e.id === parseInt(req.params.id));
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Auth endpoints
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock successful login
  if (email && password) {
    res.json({
      access_token: 'mock_jwt_token_123456',
      user: {
        id: 1,
        email: email,
        name: 'Test User',
        role: 'user'
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/v1/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (email && password && name) {
    res.json({
      access_token: 'mock_jwt_token_123456',
      user: {
        id: 2,
        email: email,
        name: name,
        role: 'user'
      }
    });
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
});

app.get('/api/v1/auth/profile', (req, res) => {
  res.json({
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    role: 'user'
  });
});

// Start server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/v1`);
});