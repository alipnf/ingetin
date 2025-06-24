import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Calendar API operations untuk server-side
export async function POST(request: NextRequest) {
  try {
    const { accessToken, action, data } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token required' },
        { status: 400 }
      );
    }

    // Setup OAuth2 client with access token
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth });

    switch (action) {
      case 'create':
        const createResponse = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: data.event,
        });
        return NextResponse.json({ 
          eventId: createResponse.data.id,
          success: true 
        });

      case 'update':
        await calendar.events.update({
          calendarId: 'primary',
          eventId: data.eventId,
          requestBody: data.event,
        });
        return NextResponse.json({ success: true });

      case 'delete':
        await calendar.events.delete({
          calendarId: 'primary',
          eventId: data.eventId,
        });
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { 
        error: 'Calendar operation failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
