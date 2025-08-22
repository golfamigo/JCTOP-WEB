#!/bin/bash

# Get auth token
echo "Logging in..."
RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jctop.com","password":"Admin123"}')

TOKEN=$(echo $RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['accessToken'])")

echo "Creating events..."

# Event 1
curl -X POST http://localhost:3001/api/v1/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "2025 春季音樂節",
    "description": "一年一度的春季音樂盛會",
    "startDate": "2025-03-15T10:00:00Z",
    "endDate": "2025-03-17T22:00:00Z",
    "location": "台北小巨蛋",
    "imageUrl": "https://via.placeholder.com/400x200",
    "status": "published"
  }'

# Event 2
curl -X POST http://localhost:3001/api/v1/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "科技創新大會",
    "description": "探索最新科技趨勢",
    "startDate": "2025-04-20T09:00:00Z",
    "endDate": "2025-04-22T18:00:00Z",
    "location": "台北國際會議中心",
    "imageUrl": "https://via.placeholder.com/400x200",
    "status": "published"
  }'

# Event 3
curl -X POST http://localhost:3001/api/v1/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "美食嘉年華",
    "description": "品嚐來自世界各地的美食",
    "startDate": "2025-05-01T11:00:00Z",
    "endDate": "2025-05-05T21:00:00Z",
    "location": "信義區香堤廣場",
    "imageUrl": "https://via.placeholder.com/400x200",
    "status": "published"
  }'

echo -e "\n\nTest data created successfully!"