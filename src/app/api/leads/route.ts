import { NextRequest, NextResponse } from 'next/server';
import { submitLead } from '@/actions/properties';

// POST /api/leads - Submit a lead for a property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'propertyId'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate phone format (basic validation)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(body.phone.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }
    
    const lead = await submitLead(body);
    
    return NextResponse.json(
      { success: true, lead },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error in POST /api/leads:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
