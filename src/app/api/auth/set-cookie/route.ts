import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'firebase-admin';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    console.log('Cookie API called with token:', idToken ? `present (${idToken.length} chars)` : 'null/undefined');
    
    const response = NextResponse.json({ success: true });

    if (!idToken) {
      // Clear the cookie if no token provided
      response.cookies.set('idToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0, // Delete the cookie
        path: '/',
      });
      console.log('Auth cookie cleared');
      return response;
    }

    const adminApp = getFirebaseAdminApp();
    if (!adminApp) {
      console.error('Firebase admin app not initialized');
      return NextResponse.json({ error: 'Firebase admin not initialized' }, { status: 500 });
    }

    // Verify the ID token
    const decodedToken = await auth(adminApp).verifyIdToken(idToken);
    console.log(`Token verified for user: ${decodedToken.uid}`);
    
    // Set httpOnly cookie with the ID token
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    };
    
    response.cookies.set('idToken', idToken, cookieOptions);
    console.log(`Setting auth cookie for user: ${decodedToken.uid} with options:`, cookieOptions);
    
    return NextResponse.json({ success: true, uid: decodedToken.uid });
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    return NextResponse.json({ error: 'Failed to set auth cookie' }, { status: 500 });
  }
}
