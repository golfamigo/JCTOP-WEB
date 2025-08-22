#!/bin/bash

# Get auth token
echo "Logging in..."
RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jctop.com","password":"Admin123"}')

TOKEN=$(echo $RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['accessToken'])")

echo "Publishing events..."

# Get all events first
EVENTS=$(curl -s -X GET http://localhost:3001/api/v1/events/my \
  -H "Authorization: Bearer $TOKEN")

echo "My events: $EVENTS"

# Try to get all events (admin)
ALL_EVENTS=$(curl -s -X GET http://localhost:3001/api/v1/events/all \
  -H "Authorization: Bearer $TOKEN")

echo "All events: $ALL_EVENTS"