import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const host = request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3001');
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/api/auth/linkedin/callback`;

  if (error || !code) {
    return NextResponse.redirect(
      `${baseUrl}/?linkedin_error=${encodeURIComponent(errorDescription || error || 'Access denied')}`
    );
  }

  if (!clientId || !clientSecret) {
    // If running in development without credentials, fallback to demo mode
    return NextResponse.redirect(`${baseUrl}/?linkedin=demo`);
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error('LinkedIn token exchange failed:', errText);
      return NextResponse.redirect(`${baseUrl}/?linkedin_error=token_failed`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user profile info from LinkedIn OIDC userinfo endpoint
    const userInfoResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userInfoResponse.ok) {
      return NextResponse.redirect(`${baseUrl}/?linkedin_error=userinfo_failed`);
    }

    const userInfo = await userInfoResponse.json();

    // LinkedIn OIDC UserInfo response structure:
    // { sub, name, given_name, family_name, picture, email, email_verified, locale }
    const profilePayload = {
      firstName: userInfo.given_name || '',
      lastName: userInfo.family_name || '',
      email: userInfo.email || '',
      avatarUrl: userInfo.picture || '',
      headline: '',
    };

    const encodedData = encodeURIComponent(JSON.stringify(profilePayload));
    return NextResponse.redirect(`${baseUrl}/?linkedin_success=1&profile=${encodedData}`);
  } catch (err: any) {
    console.error('OAuth callback exception:', err);
    return NextResponse.redirect(`${baseUrl}/?linkedin_error=${encodeURIComponent(err.message || 'unknown')}`);
  }
}
