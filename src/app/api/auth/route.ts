import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, phone, email, password, otp, googleToken } = body;

    // Mock authentication logic
    switch (type) {
      case 'phone-login':
        if (!phone) {
          return NextResponse.json(
            { success: false, error: 'Phone number is required' },
            { status: 400 }
          );
        }
        
        // Simulate sending OTP
        return NextResponse.json({
          success: true,
          message: 'OTP sent successfully',
          data: {
            phone,
            otpSent: true,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
          }
        });

      case 'verify-otp':
        if (!phone || !otp) {
          return NextResponse.json(
            { success: false, error: 'Phone and OTP are required' },
            { status: 400 }
          );
        }

        // Simulate OTP verification (accept any 6-digit OTP for demo)
        if (otp.length === 6 && /^\d{6}$/.test(otp)) {
          const user = {
            id: 'user_' + Date.now(),
            phone,
            name: 'User ' + phone.slice(-4),
            email: null,
            avatar: null,
            createdAt: new Date().toISOString(),
            preferences: {
              notifications: true,
              location: 'Mumbai',
              currency: 'INR'
            }
          };

          return NextResponse.json({
            success: true,
            message: 'OTP verified successfully',
            data: {
              user,
              token: 'mock_jwt_token_' + Date.now()
            }
          });
        } else {
          return NextResponse.json(
            { success: false, error: 'Invalid OTP' },
            { status: 400 }
          );
        }

      case 'email-login':
        if (!email || !password) {
          return NextResponse.json(
            { success: false, error: 'Email and password are required' },
            { status: 400 }
          );
        }

        // Simulate email login (accept any email/password for demo)
        const user = {
          id: 'user_' + Date.now(),
          email,
          name: 'User ' + email.split('@')[0],
          phone: null,
          avatar: null,
          createdAt: new Date().toISOString(),
          preferences: {
            notifications: true,
            location: 'Mumbai',
            currency: 'INR'
          }
        };

        return NextResponse.json({
          success: true,
          message: 'Login successful',
          data: {
            user,
            token: 'mock_jwt_token_' + Date.now()
          }
        });

      case 'google-login':
        if (!googleToken) {
          return NextResponse.json(
            { success: false, error: 'Google token is required' },
            { status: 400 }
          );
        }

        // Simulate Google login
        const googleUser = {
          id: 'user_' + Date.now(),
          email: 'user@gmail.com',
          name: 'Google User',
          phone: null,
          avatar: 'https://via.placeholder.com/150',
          createdAt: new Date().toISOString(),
          preferences: {
            notifications: true,
            location: 'Mumbai',
            currency: 'INR'
          }
        };

        return NextResponse.json({
          success: true,
          message: 'Google login successful',
          data: {
            user: googleUser,
            token: 'mock_google_jwt_token_' + Date.now()
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid authentication type' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    // Simulate token validation
    if (token.startsWith('mock_jwt_token_') || token.startsWith('mock_google_jwt_token_')) {
      const user = {
        id: 'user_' + Date.now(),
        email: 'user@example.com',
        name: 'Authenticated User',
        phone: '+91 98765 43210',
        avatar: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          location: 'Mumbai',
          currency: 'INR'
        }
      };

      return NextResponse.json({
        success: true,
        data: {
          user,
          isValid: true
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth GET API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}