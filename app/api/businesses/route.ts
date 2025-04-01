// app/api/businesses/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  try {
    const businesses = await prisma.business.findMany({
      where: {
        OR: [
          { name: { contains: query || '', mode: 'insensitive' } },
          { description: { contains: query || '', mode: 'insensitive' } },
        ],
      },
      include: {
        categories: true,
        reviews: true,
      },
    });

    return NextResponse.json(businesses);
  } catch (error) {
    // Use the error variable in the response
    return NextResponse.json(
      { 
        error: "Failed to search businesses",
        // Include details only in development
        ...(process.env.NODE_ENV === 'development' && { 
          details: error instanceof Error ? error.message : 'Unknown error' 
        })
      },
      { status: 500 }
    );
  }
}