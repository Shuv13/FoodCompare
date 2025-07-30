import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const location = searchParams.get('location') || '';
    const category = searchParams.get('category') || 'restaurants';
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const priceRange = searchParams.get('priceRange') || 'all';
    const cuisine = searchParams.get('cuisine') || 'all';

    // Mock data for different categories
    const mockData = {
      restaurants: [
        {
          id: 1,
          name: "Pizza Palace",
          cuisine: "Italian, Pizza",
          rating: 4.5,
          deliveryTime: "25-30 min",
          deliveryFee: "₹29",
          minOrder: "₹199",
          location: "Downtown",
          platforms: [
            { name: "Swiggy", price: "₹299", delivery: "₹29", time: "25 min", offer: "20% off", color: "bg-orange-500" },
            { name: "Zomato", price: "₹319", delivery: "₹39", time: "30 min", offer: "15% off", color: "bg-red-500" },
            { name: "Uber Eats", price: "₹289", delivery: "₹25", time: "28 min", offer: "25% off", color: "bg-green-500" }
          ],
          bestDeal: "Uber Eats",
          savings: "₹30"
        },
        {
          id: 2,
          name: "Burger House",
          cuisine: "American, Fast Food",
          rating: 4.3,
          deliveryTime: "20-25 min",
          deliveryFee: "₹25",
          minOrder: "₹149",
          location: "Suburb",
          platforms: [
            { name: "Swiggy", price: "₹249", delivery: "₹25", time: "20 min", offer: "Free delivery", color: "bg-orange-500" },
            { name: "Zomato", price: "₹269", delivery: "₹35", time: "25 min", offer: "10% off", color: "bg-red-500" },
            { name: "Uber Eats", price: "₹259", delivery: "₹30", time: "22 min", offer: "15% off", color: "bg-green-500" }
          ],
          bestDeal: "Swiggy",
          savings: "₹20"
        }
      ],
      "quick-delivery": [
        {
          id: 1,
          name: "Fresh Vegetables",
          category: "Groceries",
          deliveryTime: "10 min",
          platforms: [
            { name: "Zepto", price: "₹89", delivery: "₹29", time: "10 min", offer: "Free delivery on ₹99", color: "bg-blue-500" },
            { name: "Blinkit", price: "₹95", delivery: "₹35", time: "12 min", offer: "5% off", color: "bg-purple-500" }
          ],
          bestDeal: "Zepto",
          savings: "₹6"
        }
      ],
      dining: [
        {
          id: 1,
          name: "The Grand Palace",
          cuisine: "Italian, Fine Dining",
          rating: 4.8,
          priceRange: "₹₹₹₹",
          location: "Downtown",
          platforms: [
            { name: "Zomato Dining", offer: "25% off on total bill", offerValue: "25%", rating: 4.7, bookingFee: "Free" },
            { name: "EazyDiner", offer: "₹500 off on ₹2000", offerValue: "₹500", rating: 4.6, bookingFee: "Free" }
          ],
          bestDeal: "Zomato Dining",
          savings: "₹625"
        }
      ]
    };

    let results = mockData[category as keyof typeof mockData] || [];

    // Filter by query
    if (query) {
      results = results.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item as any).cuisine?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by location
    if (location) {
      results = results.filter(item => 
        (item as any).location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by cuisine
    if (cuisine !== 'all') {
      results = results.filter(item => 
        (item as any).cuisine?.toLowerCase().includes(cuisine.toLowerCase())
      );
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery':
        results.sort((a, b) => {
          const aTime = parseInt((a as any).deliveryTime?.split('-')[0] || '0');
          const bTime = parseInt((b as any).deliveryTime?.split('-')[0] || '0');
          return aTime - bTime;
        });
        break;
      case 'price':
        results.sort((a, b) => {
          const aPrice = parseInt(a.platforms[0].price.replace('₹', ''));
          const bPrice = parseInt(b.platforms[0].price.replace('₹', ''));
          return aPrice - bPrice;
        });
        break;
      default:
        // Relevance - keep as is
        break;
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      filters: {
        query,
        location,
        category,
        sortBy,
        priceRange,
        cuisine
      }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, location, category, filters } = body;

    // Here you would typically:
    // 1. Validate the input
    // 2. Call external APIs (Swiggy, Zomato, Uber Eats, etc.)
    // 3. Aggregate and compare the results
    // 4. Cache the results for performance

    // For now, we'll return mock data
    return NextResponse.json({
      success: true,
      message: 'Search request received',
      data: {
        query,
        location,
        category,
        filters
      }
    });

  } catch (error) {
    console.error('Search POST API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}