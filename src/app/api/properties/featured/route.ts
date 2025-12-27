import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedProperties } from '@/actions/properties';

// GET /api/properties/featured - Get featured properties
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '6'), 20);
    
    const result = await getFeaturedProperties(limit);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error in GET /api/properties/featured:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch featured properties' },
      { status: 500 }
    );
  }
}
