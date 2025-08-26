import { NextRequest, NextResponse } from 'next/server';

// In-memory store for mock authentication
const tokenStore = new Map<string, any>();

// Helper to create a user object
const createUser = (data: { phone?: string; email?: string; name?: string; avatar?: string }) => {
  return {
    id: 'user_' + Date.now(),
    phone: data.phone || null,
    email: data.email || null,
    name: data.name || 'User',
    avatar: data.avatar || null,
    createdAt: new Date().toISOString(),
    preferences: {
      notifications: true,
      location: 'Mumbai',
      currency: 'INR',
    },
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, phone, email, password, otp, googleToken } = body;

    let user;
    switch (type) {
      case 'phone-login':
        if (!phone) {
          return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
        }
        return NextResponse.json({
          success: true,
          message: 'OTP sent successfully',
          data: { phone, otpSent: true, otpExpiry: new Date(Date.now() + 10 * 60 * 1000).toISOString() },
        });

      case 'verify-otp':
        if (!phone || !otp) {
          return NextResponse.json({ success: false, error: 'Phone and OTP are required' }, { status: 400 });
        }
        if (otp.length === 6 && /^\d{6}$/.test(otp)) {
          user = createUser({ phone, name: `User ${phone.slice(-4)}` });
          const token = `token_${Date.now()}`;
          tokenStore.set(token, user);
          return NextResponse.json({ success: true, message: 'OTP verified successfully', data: { user, token } });
        } else {
          return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 });
        }

      case 'email-login':
        if (!email || !password) {
          return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
        }
        user = createUser({ email, name: `User ${email.split('@')[0]}` });
        const token = `token_${Date.now()}`;
        tokenStore.set(token, user);
        return NextResponse.json({ success: true, message: 'Login successful', data: { user, token } });

      case 'google-login':
        if (!googleToken) {
          return NextResponse.json({ success: false, error: 'Google token is required' }, { status: 400 });
        }
        user = createUser({ email: 'user@gmail.com', name: 'Google User', avatar: 'https://via.placeholder.com/150' });
        const googleTokenValue = `token_${Date.now()}`;
        tokenStore.set(googleTokenValue, user);
        return NextResponse.json({ success: true, message: 'Google login successful', data: { user, token: googleTokenValue } });

      default:
        return NextResponse.json({ success: false, error: 'Invalid authentication type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Token is required' }, { status: 400 });
    }

    if (tokenStore.has(token)) {
      const user = tokenStore.get(token);
      return NextResponse.json({ success: true, data: { user, isValid: true } });
    } else {
      // Also accept mock tokens from the chat page for demonstration purposes
      if (token.startsWith('mock_jwt_token_')) {
        const user = createUser({ email: 'mock@example.com', name: 'Mock User' });
        return NextResponse.json({ success: true, data: { user, isValid: true } });
      }
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth GET API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}