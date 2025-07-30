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
  Timer,
  Package,
  ShoppingCart,
  Leaf,
  IceCream,
  Coffee,
  Pill,
  Smartphone,
  BatteryCharging,
  Award,
  Target,
  DollarSign
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function QuickDeliveryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [sortBy, setSortBy] = useState('time');
  const [category, setCategory] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced mock data for quick delivery items
  const quickDeliveryItems = [
    {
      id: 1,
      name: "Fresh Vegetables",
      category: "Groceries",
      subcategory: "Fresh Produce",
      deliveryTime: "10 min",
      platforms: [
        {
          name: "Zepto",
          price: 89,
          delivery: 29,
          total: 118,
          time: "10 min",
          offer: "Free delivery on ₹99",
          offerValue: 29,
          rating: 4.5,
          color: "bg-blue-500",
          features: ["Farm fresh", "Quality checked"],
          availability: "In Stock"
        },
        {
          name: "Blinkit",
          price: 95,
          delivery: 35,
          total: 130,
          time: "12 min",
          offer: "5% off",
          offerValue: 5,
          rating: 4.3,
          color: "bg-purple-500",
          features: ["Organic options", "Same day delivery"],
          availability: "In Stock"
        },
        {
          name: "Instamart",
          price: 92,
          delivery: 25,
          total: 117,
          time: "15 min",
          offer: "₹10 off",
          offerValue: 10,
          rating: 4.4,
          color: "bg-green-500",
          features: ["Express delivery", "Fresh guarantee"],
          availability: "Limited Stock"
        }
      ],
      bestDeal: "Instamart",
      maxSavings: 13,
      avgRating: 4.4,
      icon: <Leaf className="w-8 h-8 text-green-500" />
    },
    {
      id: 2,
      name: "Soft Drinks",
      category: "Beverages",
      subcategory: "Cold Drinks",
      deliveryTime: "8 min",
      platforms: [
        {
          name: "Zepto",
          price: 120,
          delivery: 29,
          total: 149,
          time: "8 min",
          offer: "Buy 2 Get 1",
          offerValue: 60,
          rating: 4.6,
          color: "bg-blue-500",
          features: ["Chilled delivery", "All brands"],
          availability: "In Stock"
        },
        {
          name: "Blinkit",
          price: 115,
          delivery: 25,
          total: 140,
          time: "10 min",
          offer: "10% off",
          offerValue: 12,
          rating: 4.4,
          color: "bg-purple-500",
          features: ["Combo offers", "Quick delivery"],
          availability: "In Stock"
        },
        {
          name: "Instamart",
          price: 125,
          delivery: 20,
          total: 145,
          time: "12 min",
          offer: "Free delivery",
          offerValue: 20,
          rating: 4.2,
          color: "bg-green-500",
          features: ["Same day delivery", "Bulk orders"],
          availability: "In Stock"
        }
      ],
      bestDeal: "Blinkit",
      maxSavings: 9,
      avgRating: 4.4,
      icon: <Coffee className="w-8 h-8 text-brown-500" />
    },
    {
      id: 3,
      name: "Ice Cream",
      category: "Desserts",
      subcategory: "Frozen",
      deliveryTime: "15 min",
      platforms: [
        {
          name: "Zepto",
          price: 180,
          delivery: 29,
          total: 209,
          time: "15 min",
          offer: "20% off",
          offerValue: 36,
          rating: 4.7,
          color: "bg-blue-500",
          features: ["Frozen delivery", "Premium brands"],
          availability: "In Stock"
        },
        {
          name: "Blinkit",
          price: 195,
          delivery: 35,
          total: 230,
          time: "18 min",
          offer: "Buy 1 Get 1",
          offerValue: 98,
          rating: 4.5,
          color: "bg-purple-500",
          features: ["Ice cream cakes", "Party packs"],
          availability: "Limited Stock"
        },
        {
          name: "Instamart",
          price: 175,
          delivery: 25,
          total: 200,
          time: "20 min",
          offer: "₹25 off",
          offerValue: 25,
          rating: 4.3,
          color: "bg-green-500",
          features: ["Express delivery", "Multiple flavors"],
          availability: "In Stock"
        }
      ],
      bestDeal: "Blinkit",
      maxSavings: 30,
      avgRating: 4.5,
      icon: <IceCream className="w-8 h-8 text-pink-500" />
    },
    {
      id: 4,
      name: "Medicines",
      category: "Healthcare",
      subcategory: "OTC",
      deliveryTime: "12 min",
      platforms: [
        {
          name: "Zepto",
          price: 250,
          delivery: 29,
          total: 279,
          time: "12 min",
          offer: "15% off",
          offerValue: 38,
          rating: 4.8,
          color: "bg-blue-500",
          features: ["24/7 delivery", "Prescription upload"],
          availability: "In Stock"
        },
        {
          name: "Blinkit",
          price: 265,
          delivery: 35,
          total: 300,
          time: "15 min",
          offer: "₹50 off",
          offerValue: 50,
          rating: 4.6,
          color: "bg-purple-500",
          features: ["Health experts", "Quick delivery"],
          availability: "In Stock"
        },
        {
          name: "Instamart",
          price: 245,
          delivery: 25,
          total: 270,
          time: "18 min",
          offer: "Free delivery",
          offerValue: 25,
          rating: 4.4,
          color: "bg-green-500",
          features: ["Same day delivery", "Genuine products"],
          availability: "Limited Stock"
        }
      ],
      bestDeal: "Instamart",
      maxSavings: 30,
      avgRating: 4.6,
      icon: <Pill className="w-8 h-8 text-red-500" />
    },
    {
      id: 5,
      name: "Phone Charger",
      category: "Electronics",
      subcategory: "Accessories",
      deliveryTime: "20 min",
      platforms: [
        {
          name: "Zepto",
          price: 899,
          delivery: 29,
          total: 928,
          time: "20 min",
          offer: "10% off",
          offerValue: 90,
          rating: 4.3,
          color: "bg-blue-500",
          features: ["Fast charging", "Multiple ports"],
          availability: "In Stock"
        },
        {
          name: "Blinkit",
          price: 949,
          delivery: 35,
          total: 984,
          time: "25 min",
          offer: "₹100 off",
          offerValue: 100,
          rating: 4.2,
          color: "bg-purple-500",
          features: ["Warranty included", "Premium quality"],
          availability: "Limited Stock"
        },
        {
          name: "Instamart",
          price: 879,
          delivery: 25,
          total: 904,
          time: "30 min",
          offer: "Free delivery",
          offerValue: 25,
          rating: 4.1,
          color: "bg-green-500",
          features: ["Same day delivery", "All brands"],
          availability: "In Stock"
        }
      ],
      bestDeal: "Instamart",
      maxSavings: 80,
      avgRating: 4.2,
      icon: <BatteryCharging className="w-8 h-8 text-blue-500" />
    }
  ];

  const categories = [
    "All", "Groceries", "Beverages", "Desserts", "Healthcare", "Electronics", "Personal Care"
  ];

  const sortOptions = [
    { value: "time", label: "Fastest Delivery" },
    { value: "price", label: "Lowest Price" },
    { value: "savings", label: "Max Savings" },
    { value: "rating", label: "Highest Rated" }
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
      y: [-8, 8, -8],
      transition: {
        duration: 2.5,
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
    router.push(`/quick-delivery?${params.toString()}`);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-10 blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={floatVariants}
            transition={{ delay: i * 0.4 }}
          />
        ))}
      </div>



      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <Zap className="w-16 h-16 text-white mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lightning Fast Delivery
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Compare prices across Zepto, Blinkit, and Instamart. Get everything you need delivered in 10 minutes or less!
          </p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-3">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for quick delivery items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:border-white/40 focus:ring-white/40 transition-all duration-300 rounded-xl"
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
                    className="pl-12 h-14 text-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:border-white/40 focus:ring-white/40 transition-all duration-300 rounded-xl"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="h-14 px-8 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <motion.div
                className="text-3xl font-bold text-blue-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                10
              </motion.div>
              <p className="text-gray-600 text-sm">Min Delivery</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <motion.div
                className="text-3xl font-bold text-purple-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
              >
                24/7
              </motion.div>
              <p className="text-gray-600 text-sm">Available</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <motion.div
                className="text-3xl font-bold text-pink-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              >
                {quickDeliveryItems.length}
              </motion.div>
              <p className="text-gray-600 text-sm">Categories</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <motion.div
                className="text-3xl font-bold text-green-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
              >
                ₹{Math.max(...quickDeliveryItems.map(calculateSavings))}
              </motion.div>
              <p className="text-gray-600 text-sm">Max Savings</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="container mx-auto px-4 pb-6">
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg">
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
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-40 h-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 pb-12">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Quick Delivery Items
          </h2>
          <p className="text-gray-600">
            Compare prices and get your essentials delivered in minutes
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickDeliveryItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card
                className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 overflow-hidden group"
                onMouseEnter={() => setSelectedItem(item.id)}
                onMouseLeave={() => setSelectedItem(null)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Item Info */}
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {item.category}
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            {item.subcategory}
                          </Badge>
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{item.avgRating}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                            <Timer className="w-4 h-4 text-green-500" />
                            <span>{item.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Platform Comparison */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-500" />
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
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
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
                                  <span className="text-sm text-gray-600">Price:</span>
                                  <span className="font-bold text-lg">₹{platform.price}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Delivery:</span>
                                  <span className="font-medium">₹{platform.delivery}</span>
                                </div>
                                <div className="border-t pt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Total:</span>
                                    <span className="font-bold text-xl text-blue-600">₹{platform.total}</span>
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

                                <div className="mt-2">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${platform.availability === "In Stock"
                                      ? "text-green-700 border-green-200"
                                      : "text-yellow-700 border-yellow-200"
                                      }`}
                                  >
                                    {platform.availability}
                                  </Badge>
                                </div>
                              </div>

                              <motion.div
                                className="mt-4 text-center"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Button
                                  size="sm"
                                  className={`w-full ${platform.name === item.bestDeal
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-blue-500 hover:bg-blue-600'
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-500 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <Zap className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need It Now? We've Got You!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            From groceries to electronics, get everything delivered to your doorstep in 10 minutes or less.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-blue-100">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-blue-100">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function QuickDeliveryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <QuickDeliveryContent />
    </Suspense>
  );
}