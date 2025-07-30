'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  ArrowLeft,
  Bike,
  Percent,
  TrendingUp,
  Utensils,
  Zap,
  Sparkles,
  Crown,
  ExternalLink
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState('all');
  const [cuisine, setCuisine] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mock data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian, Pizza",
      rating: 4.5,
      deliveryTime: "25-30 min",
      deliveryFee: "₹29",
      minOrder: "₹199",
      image: "/api/placeholder/300/200",
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
      image: "/api/placeholder/300/200",
      platforms: [
        { name: "Swiggy", price: "₹249", delivery: "₹25", time: "20 min", offer: "Free delivery", color: "bg-orange-500" },
        { name: "Zomato", price: "₹269", delivery: "₹35", time: "25 min", offer: "10% off", color: "bg-red-500" },
        { name: "Uber Eats", price: "₹259", delivery: "₹30", time: "22 min", offer: "15% off", color: "bg-green-500" }
      ],
      bestDeal: "Swiggy",
      savings: "₹20"
    },
    {
      id: 3,
      name: "Biryani Bliss",
      cuisine: "Indian, Biryani",
      rating: 4.7,
      deliveryTime: "30-35 min",
      deliveryFee: "₹39",
      minOrder: "₹249",
      image: "/api/placeholder/300/200",
      platforms: [
        { name: "Swiggy", price: "₹349", delivery: "₹39", time: "30 min", offer: "₹50 off", color: "bg-orange-500" },
        { name: "Zomato", price: "₹329", delivery: "₹29", time: "35 min", offer: "20% off", color: "bg-red-500" },
        { name: "Uber Eats", price: "₹359", delivery: "₹45", time: "32 min", offer: "15% off", color: "bg-green-500" }
      ],
      bestDeal: "Zomato",
      savings: "₹30"
    }
  ];

  // Mock data for quick delivery
  const quickDelivery = [
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
    },
    {
      id: 2,
      name: "Soft Drinks",
      category: "Beverages",
      deliveryTime: "8 min",
      platforms: [
        { name: "Zepto", price: "₹120", delivery: "₹29", time: "8 min", offer: "Buy 2 Get 1", color: "bg-blue-500" },
        { name: "Blinkit", price: "₹115", delivery: "₹25", time: "10 min", offer: "10% off", color: "bg-purple-500" }
      ],
      bestDeal: "Blinkit",
      savings: "₹5"
    }
  ];

  const cuisines = [
    "All", "Italian", "Chinese", "Indian", "Mexican", "Thai",
    "American", "Japanese", "Mediterranean", "Fast Food"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedLocation) params.set('location', selectedLocation);
    router.push(`/search?${params.toString()}`);
  };

  const handlePlatformClick = (platformName: string, restaurantName: string) => {
    // Simulate redirect to platform
    alert(`Redirecting to ${platformName} for ${restaurantName}`);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Search Bar Section */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm border-b sticky top-16 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for food, restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-xl"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-48"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-xl"
                />
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" size="lg" className="h-12 px-8 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm border-b sticky top-28 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4 overflow-x-auto">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Filter className="w-4 h-4 text-gray-500" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-8 border-2 border-gray-200 focus:border-orange-400 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="delivery">Delivery Time</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-32 h-8 border-2 border-gray-200 focus:border-orange-400 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="expensive">Expensive</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger className="w-32 h-8 border-2 border-gray-200 focus:border-orange-400 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map((c) => (
                    <SelectItem key={c} value={c.toLowerCase()}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="restaurants" className="w-full">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl p-1">
              <TabsTrigger
                value="restaurants"
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Utensils className="w-4 h-4" />
                <span className="hidden sm:inline">Restaurants</span>
              </TabsTrigger>
              <TabsTrigger
                value="quick-delivery"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Quick</span>
              </TabsTrigger>
              <TabsTrigger
                value="dining"
                className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Dining</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="restaurants" className="space-y-6">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {restaurants.length} Restaurants found
              </h2>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-700 border-2 border-green-200 px-4 py-2 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  Best deals highlighted
                </Badge>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {restaurants.map((restaurant) => (
                <motion.div key={restaurant.id} variants={itemVariants}>
                  <Card
                    className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 overflow-hidden group"
                    onMouseEnter={() => setSelectedRestaurant(restaurant.id)}
                    onMouseLeave={() => setSelectedRestaurant(null)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <motion.div
                          className="w-full lg:w-48 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl flex-shrink-0 overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-700 font-medium text-sm text-center px-2">
                              {restaurant.name}
                            </span>
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                {restaurant.name}
                              </h3>
                              <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <motion.div
                                  className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="font-medium">{restaurant.rating}</span>
                                </motion.div>
                                <motion.div
                                  className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Clock className="w-4 h-4 text-blue-500" />
                                  <span>{restaurant.deliveryTime}</span>
                                </motion.div>
                                <motion.div
                                  className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Bike className="w-4 h-4 text-green-500" />
                                  <span>{restaurant.deliveryFee}</span>
                                </motion.div>
                              </div>
                            </div>

                            <AnimatePresence>
                              {restaurant.bestDeal && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                    <Crown className="w-4 h-4" />
                                    Best Deal: {restaurant.bestDeal}
                                  </Badge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Platform Comparison */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-orange-500" />
                              Platform Comparison:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {restaurant.platforms.map((platform) => (
                                <motion.div
                                  key={platform.name}
                                  whileHover={{ scale: 1.05, y: -5 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="cursor-pointer"
                                  onClick={() => handlePlatformClick(platform.name, restaurant.name)}
                                >
                                  <Card
                                    className={`p-4 text-center border-2 transition-all duration-300 ${platform.name === restaurant.bestDeal
                                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                                      }`}
                                  >
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                      <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                                      <div className="font-bold text-sm">{platform.name}</div>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="text-2xl font-bold text-gray-900">
                                        {platform.price}
                                      </div>
                                      <div className="text-xs text-gray-600 space-y-1">
                                        <div>Delivery: {platform.delivery}</div>
                                        <div>Time: {platform.time}</div>
                                      </div>
                                      {platform.offer && (
                                        <motion.div
                                          whileHover={{ scale: 1.1 }}
                                          className="inline-block"
                                        >
                                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200 mt-2">
                                            <Percent className="w-3 h-3 mr-1" />
                                            {platform.offer}
                                          </Badge>
                                        </motion.div>
                                      )}
                                    </div>
                                  </Card>
                                </motion.div>
                              ))}
                            </div>

                            {restaurant.savings && (
                              <motion.div
                                className="text-center mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                <Badge className="bg-orange-500 text-white px-4 py-2 rounded-full">
                                  Save up to {restaurant.savings} with best deal!
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="quick-delivery" className="space-y-6">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Quick Delivery ({quickDelivery.length} items)
              </h2>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 text-blue-700 border-2 border-blue-200 px-4 py-2 rounded-full">
                  <Zap className="w-3 h-3" />
                  Under 15 minutes
                </Badge>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {quickDelivery.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card
                    className="hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 overflow-hidden group"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Zap className="w-8 h-8 text-blue-500" />
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{item.deliveryTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {item.platforms.map((platform) => (
                            <motion.div
                              key={platform.name}
                              whileHover={{ scale: 1.05, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              className="cursor-pointer"
                              onClick={() => handlePlatformClick(platform.name, item.name)}
                            >
                              <Card
                                className={`p-3 min-w-[120px] text-center border-2 transition-all duration-300 ${platform.name === item.bestDeal
                                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                  }`}
                              >
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <div className={`w-2 h-2 rounded-full ${platform.color}`}></div>
                                  <div className="font-bold text-xs">{platform.name}</div>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                  {platform.price}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {platform.time}
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="dining" className="space-y-6">
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Dining Reservations
              </h2>
              <p className="text-gray-600 mb-6">
                Compare restaurant booking offers and table availability
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg px-8 py-3">
                  Coming Soon
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}