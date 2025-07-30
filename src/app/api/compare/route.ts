import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const items = searchParams.get('items') || '';
    const location = searchParams.get('location') || '';

    // Mock comparison data
    const comparisonData = [
      {
        id: 1,
        name: "Margherita Pizza",
        restaurant: "Pizza Palace",
        category: "Pizza",
        basePrice: 299,
        platforms: [
          { 
            name: "Swiggy", 
            price: 299, 
            delivery: 29, 
            total: 328, 
            time: "25 min", 
            offer: "20% off on next order", 
            offerValue: 60,
            rating: 4.5,
            color: "bg-orange-500",
            savings: 0,
            deepLink: "swiggy://restaurant/pizza-palace/margherita-pizza"
          },
          { 
            name: "Zomato", 
            price: 319, 
            delivery: 39, 
            total: 358, 
            time: "30 min", 
            offer: "15% off", 
            offerValue: 48,
            rating: 4.3,
            color: "bg-red-500",
            savings: -30,
            deepLink: "zomato://restaurant/pizza-palace/margherita-pizza"
          },
          { 
            name: "Uber Eats", 
            price: 289, 
            delivery: 25, 
            total: 314, 
            time: "28 min", 
            offer: "25% off + free delivery", 
            offerValue: 72,
            rating: 4.6,
            color: "bg-green-500",
            savings: 14,
            deepLink: "ubereats://store/pizza-palace/margherita-pizza"
          }
        ],
        bestDeal: "Uber Eats",
        maxSavings: 44,
        avgRating: 4.47,
        recommendation: "Best value for money with fastest delivery"
      },
      {
        id: 2,
        name: "Chicken Burger Meal",
        restaurant: "Burger House",
        category: "Fast Food",
        basePrice: 249,
        platforms: [
          { 
            name: "Swiggy", 
            price: 249, 
            delivery: 25, 
            total: 274, 
            time: "20 min", 
            offer: "Free delivery", 
            offerValue: 25,
            rating: 4.3,
            color: "bg-orange-500",
            savings: 15,
            deepLink: "swiggy://restaurant/burger-house/chicken-burger-meal"
          },
          { 
            name: "Zomato", 
            price: 269, 
            delivery: 35, 
            total: 304, 
            time: "25 min", 
            offer: "10% off", 
            offerValue: 27,
            rating: 4.1,
            color: "bg-red-500",
            savings: -15,
            deepLink: "zomato://restaurant/burger-house/chicken-burger-meal"
          },
          { 
            name: "Uber Eats", 
            price: 259, 
            delivery: 30, 
            total: 289, 
            time: "22 min", 
            offer: "15% off", 
            offerValue: 39,
            rating: 4.4,
            color: "bg-green-500",
            savings: 0,
            deepLink: "ubereats://store/burger-house/chicken-burger-meal"
          }
        ],
        bestDeal: "Swiggy",
        maxSavings: 30,
        avgRating: 4.27,
        recommendation: "Fastest delivery with no delivery charges"
      }
    ];

    // Filter by items if specified
    let results = comparisonData;
    if (items) {
      const itemArray = items.split(',').map(item => item.toLowerCase().trim());
      results = comparisonData.filter(item => 
        itemArray.some(searchTerm => 
          item.name.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm)
        )
      );
    }

    // Calculate comparison statistics
    const stats = {
      totalItems: results.length,
      maxSavings: Math.max(...results.map(item => item.maxSavings)),
      avgRating: results.reduce((acc, curr) => acc + curr.avgRating, 0) / results.length,
      platformCounts: {
        swiggy: results.filter(item => item.bestDeal === "Swiggy").length,
        zomato: results.filter(item => item.bestDeal === "Zomato").length,
        uberEats: results.filter(item => item.bestDeal === "Uber Eats").length
      }
    };

    return NextResponse.json({
      success: true,
      data: results,
      stats,
      filters: {
        items,
        location
      }
    });

  } catch (error) {
    console.error('Compare API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, location, userId } = body;

    // Here you would typically:
    // 1. Validate the input
    // 2. Fetch real-time data from multiple platforms
    // 3. Perform price comparison analysis
    // 4. Generate recommendations
    // 5. Store comparison history for the user

    // Mock AI-powered analysis
    const analysis = {
      totalSavings: 156,
      bestPlatform: "Uber Eats",
      recommendation: "Based on current prices and delivery times, Uber Eats offers the best overall value for your selected items",
      insights: [
        "Uber Eats has the fastest average delivery time (26 min)",
        "Swiggy offers the most free delivery options",
        "Zomato has the highest rated restaurants on average"
      ],
      priceTrends: {
        trend: "decreasing",
        change: -2.5,
        timeframe: "last 24 hours"
      }
    };

    return NextResponse.json({
      success: true,
      message: 'Comparison completed successfully',
      data: {
        items,
        location,
        userId,
        analysis,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Compare POST API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}