#!/bin/bash

echo "Starting Claude Monitor Demo..."
echo "================================"
echo ""
echo "This will start a test WebSocket server and the monitor client."
echo "Press Ctrl+C to stop both processes."
echo ""

# Start the test server in the background
echo "Starting test server on ws://localhost:4000/stream..."
node test-server.js &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 2

# Start the monitor
echo "Starting monitor client..."
npm start

# When the monitor exits, kill the server
echo "Stopping test server..."
kill $SERVER_PID 2>/dev/null

echo "Demo stopped."