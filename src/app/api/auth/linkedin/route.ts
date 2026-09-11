import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const host = request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3001');
  const redirectUri = `${baseUrl}/api/auth/linkedin/callback`;

  // If user requested demo/mock or credentials are not yet set
  const isMock = searchParams.get('mock') === 'true';
  if (!clientId || isMock) {
    // Redirect with demo parameter to trigger frontend mock auto-fill
    return NextResponse.redirect(`${baseUrl}/?linkedin=demo`);
  }

  // LinkedIn OAuth 2.0 OpenID Connect endpoint
  const state = Math.random().toString(36).substring(7);
  const scope = encodeURIComponent('openid profile email');
  const encodedRedirectUri = encodeURIComponent(redirectUri);

  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&state=${state}&scope=${scope}`;

  const response = NextResponse.redirect(linkedInAuthUrl);
  // Store state in a temporary httpOnly cookie for CSRF verification
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
