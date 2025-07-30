'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  ExternalLink,
  Award,
  Target,
  Calculator,
  RefreshCw,
  Heart,
  Share2
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function ComparePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [sortBy, setSortBy] = useState('savings');
  const [priceRange, setPriceRange] = useState('all');
  const [cuisine, setCuisine] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState<string | null>(null);
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced mock data for price comparison
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
          savings: 0
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
          savings: -30
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
          savings: 14
        }
      ],
      bestDeal: "Uber Eats",
      maxSavings: 44,
      avgRating: 4.47,
      image: "/api/placeholder/300/200"
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
          savings: 15
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
          savings: -15
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
          savings: 0
        }
      ],
      bestDeal: "Swiggy",
      maxSavings: 30,
      avgRating: 4.27,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Chicken Biryani",
      restaurant: "Biryani Bliss",
      category: "Indian",
      basePrice: 349,
      platforms: [
        {
          name: "Swiggy",
          price: 349,
          delivery: 39,
          total: 388,
          time: "30 min",
          offer: "₹50 off",
          offerValue: 50,
          rating: 4.7,
          color: "bg-orange-500",
          savings: 0
        },
        {
          name: "Zomato",
          price: 329,
          delivery: 29,
          total: 358,
          time: "35 min",
          offer: "20% off",
          offerValue: 66,
          rating: 4.8,
          color: "bg-red-500",
          savings: 30
        },
        {
          name: "Uber Eats",
          price: 359,
          delivery: 45,
          total: 404,
          time: "32 min",
          offer: "15% off",
          offerValue: 54,
          rating: 4.5,
          color: "bg-green-500",
          savings: -16
        }
      ],
      bestDeal: "Zomato",
      maxSavings: 46,
      avgRating: 4.67,
      image: "/api/placeholder/300/200"
    }
  ];

  const cuisines = [
    "All", "Italian", "Chinese", "Indian", "Mexican", "Thai",
    "American", "Japanese", "Mediterranean", "Fast Food"
  ];

  const sortOptions = [
    { value: "savings", label: "Max Savings" },
    { value: "rating", label: "Highest Rating" },
    { value: "price", label: "Lowest Price" },
    { value: "time", label: "Fastest Delivery" }
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

  const floatVariants = {
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedLocation) params.set('location', selectedLocation);
    router.push(`/compare?${params.toString()}`);
  };

  const handlePlatformClick = (platformName: string, itemName: string) => {
    // Simulate redirect to platform
    alert(`Redirecting to ${platformName} for ${itemName}`);
  };

  const calculateSavings = (item: any) => {
    const prices = item.platforms.map((p: any) => p.total);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return maxPrice - minPrice;
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-10 blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={floatVariants}
            transition={{ delay: i * 0.5 }}
          />
        ))}
      </div>



      {/* Search Section */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm border-b sticky top-16 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for food items to compare..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-xl"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-48"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-xl"
                />
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="h-12 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl">
                <Search className="w-4 h-4 mr-2" />
                Compare Prices
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Filters and Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-10 border-2 border-gray-200 focus:border-orange-400 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-32 h-10 border-2 border-gray-200 focus:border-orange-400 rounded-lg">
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
                <SelectTrigger className="w-32 h-10 border-2 border-gray-200 focus:border-orange-400 rounded-lg">
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

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="h-10 border-2 border-gray-200 hover:border-orange-400 rounded-lg"
                onClick={() => setShowDetailed(!showDetailed)}
              >
                <Target className="w-4 h-4 mr-2" />
                {showDetailed ? 'Simple View' : 'Detailed View'}
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-4 lg:ml-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{comparisonData.length}</div>
              <div className="text-sm text-gray-600">Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                ₹{Math.max(...comparisonData.map(calculateSavings))}
              </div>
              <div className="text-sm text-gray-600">Max Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {(comparisonData.reduce((acc, curr) => acc + curr.avgRating, 0) / comparisonData.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </motion.div>
        </div>

        {/* Comparison Results */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {comparisonData.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card
                className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 overflow-hidden group"
                onMouseEnter={() => setSelectedComparison(item.id.toString())}
                onMouseLeave={() => setSelectedComparison(null)}
              >
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Utensils className="w-8 h-8 text-orange-600" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          {item.name}
                        </CardTitle>
                        <p className="text-gray-600">{item.restaurant} • {item.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium text-sm">{item.avgRating}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Save up to ₹{calculateSavings(item)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedComparison === item.id.toString() && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex gap-2"
                        >
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" variant="outline" className="border-2 border-gray-200">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" variant="outline" className="border-2 border-gray-200">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Platform Comparison */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        Platform Comparison
                      </h4>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 rounded-full flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        Best: {item.bestDeal}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {item.platforms.map((platform) => (
                        <motion.div
                          key={platform.name}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer"
                          onClick={() => handlePlatformClick(platform.name, item.name)}
                        >
                          <Card
                            className={`p-4 border-2 transition-all duration-300 ${platform.name === item.bestDeal
                              ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                              }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                                <div className="font-bold">{platform.name}</div>
                              </div>
                              {platform.name === item.bestDeal && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  BEST
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Item Price:</span>
                                <span className="font-bold text-lg">₹{platform.price}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Delivery:</span>
                                <span className="font-medium">₹{platform.delivery}</span>
                              </div>
                              <div className="border-t pt-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-700">Total:</span>
                                  <span className="font-bold text-xl text-orange-600">₹{platform.total}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Time:</span>
                                <span className="font-medium">{platform.time}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Rating:</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="font-medium">{platform.rating}</span>
                                </div>
                              </div>
                              {platform.offer && (
                                <motion.div whileHover={{ scale: 1.05 }}>
                                  <Badge variant="secondary" className="w-full text-center bg-orange-100 text-orange-700 border-orange-200 mt-2">
                                    <Percent className="w-3 h-3 mr-1 inline" />
                                    {platform.offer}
                                  </Badge>
                                </motion.div>
                              )}

                              {showDetailed && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-xs text-gray-600 space-y-1">
                                    <div>Offer Value: ₹{platform.offerValue}</div>
                                    <div>Savings: {platform.savings >= 0 ? '+' : ''}₹{platform.savings}</div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <motion.div
                              className="mt-4 text-center"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Button
                                size="sm"
                                className={`w-full ${platform.name === item.bestDeal
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : 'bg-orange-500 hover:bg-orange-600'
                                  } text-white`}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Order Now
                              </Button>
                            </motion.div>
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

        {/* Summary Section */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-4"
            >
              <Award className="w-16 h-16 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">
              Smart Price Comparison
            </h2>
            <p className="text-xl text-orange-100 mb-6 max-w-2xl mx-auto">
              Compare prices across multiple platforms and find the best deals instantly.
              Save money on every order with our intelligent comparison engine.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">₹{Math.max(...comparisonData.map(calculateSavings))}</div>
                <div className="text-orange-100">Max Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{comparisonData.length}</div>
                <div className="text-orange-100">Items Compared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">3</div>
                <div className="text-orange-100">Platforms</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}