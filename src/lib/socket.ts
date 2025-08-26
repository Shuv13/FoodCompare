import { Server, Socket } from 'socket.io';

interface AuthenticatedSocket extends Socket {
  user?: any;
}

export const setupSocket = (io: Server) => {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error: Token not provided'));
    }

    try {
      // We are in the same process, so we can use localhost
      const response = await fetch(`http://localhost:3000/api/auth?token=${token}`);
      const data = await response.json();

      if (response.ok && data.success && data.data.isValid) {
        socket.user = data.data.user;
        next();
      } else {
        next(new Error('Authentication error: Invalid token'));
      }
    } catch (error) {
      console.error('Socket auth middleware error:', error);
      next(new Error('Authentication error: Internal server error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log('Authenticated client connected:', socket.id, 'user:', socket.user.name);
    
    // Handle chat messages
    socket.on('chatMessage', (msg: { text: string }) => {
      // Broadcast the message to all clients with sender info
      io.emit('chatMessage', {
        text: msg.text,
        senderId: socket.user.id,
        senderName: socket.user.name,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // Send welcome message
    socket.emit('chatMessage', {
      text: `Welcome to the chat, ${socket.user.name}!`,
      senderId: 'system',
      senderName: 'System',
      timestamp: new Date().toISOString(),
    });
  });
};