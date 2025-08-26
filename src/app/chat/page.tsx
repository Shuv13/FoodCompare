'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  text: string;
  senderId: string;
  senderName: string;
  timestamp: string;
}

export default function ChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd get the token from your auth context or local storage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // For demonstration, we'll use a mock token.
      // In a real app, you would redirect to login or handle the unauthenticated state.
      const mockToken = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('authToken', mockToken);
      setToken(mockToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const newSocket = io({
      path: '/api/socketio',
      auth: {
        token,
      },
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      setError(null);
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
      setError(`Connection failed: ${err.message}. Please refresh and try again.`);
      // In a real app, you might want to try to re-authenticate
    });

    newSocket.on('chatMessage', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit('chatMessage', { text: message });
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Chat</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          <div className="h-96 overflow-y-auto border p-4 mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{msg.senderName}: </span>
                <span>{msg.text}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={!socket || !!error}
            />
            <Button onClick={sendMessage} disabled={!socket || !!error}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
