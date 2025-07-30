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
  Flash,
  Award,
  Target,
  DollarSign,
  Calendar,
  Users,
  MapPin as MapPinIcon,
  Phone,
  Globe,
  CreditCard,
  Percent as PercentIcon,
  Gift,
  Shield,
  Star as StarIcon,
  Heart,
  Share2,
  Camera,
  Wifi,
  Car,
  Music,
  Wine,
  ChefHat,
  Building,
  Diamond
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function DiningPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [sortBy, setSortBy] = useState('rating');
  const [cuisine, setCuisine] = useState('all');
  const [partySize, setPartySize] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    // Set default time to current time + 2 hours
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 2);
    setTime(currentTime.toTimeString().slice(0, 5));
  }, []);

  // Enhanced mock data for dining reservations
  const restaurants = [
    {
      id: 1,
      name: "The Grand Palace",
      cuisine: "Italian, Fine Dining",
      rating: 4.8,
      priceRange: "₹₹₹₹",
      location: "Downtown",
      description: "Authentic Italian cuisine with a modern twist",
      platforms: [
        {
          name: "Zomato Dining",
          offer: "25% off on total bill",
          offerValue: "25%",
          rating: 4.7,
          bookingFee: "Free",
          cancellation: "Free up to 2 hours",
          features: ["VIP seating", "Complimentary wine", "Birthday special"],
          availability: "Available",
          price: "₹2500 for two"
        },
        {
          name: "EazyDiner",
          offer: "₹500 off on ₹2000",
          offerValue: "₹500",
          rating: 4.6,
          bookingFee: "Free",
          cancellation: "Free up to 1 hour",
          features: ["Priority seating", "Welcome drink", "Dessert on us"],
          availability: "Limited",
          price: "₹2000 for two"
        },
        {
          name: "Dineout",
          offer: "20% cashback",
          offerValue: "20%",
          rating: 4.5,
          bookingFee: "₹50",
          cancellation: "Non-refundable",
          features: ["Table guarantee", "Special menu", "Photo session"],
          availability: "Available",
          price: "₹2200 for two"
        }
      ],
      bestDeal: "Zomato Dining",
      maxSavings: 625,
      avgRating: 4.6,
      images: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
      amenities: ["Valet Parking", "Outdoor Seating", "Live Music", "WiFi", "AC", "Bar"],
      dressCode: "Smart Casual",
      timings: "12:00 PM - 11:00 PM"
    },
    {
      id: 2,
      name: "Spice Garden",
      cuisine: "Indian, North Indian",
      rating: 4.6,
      priceRange: "₹₹₹",
      location: "Suburb",
      description: "Traditional Indian flavors with contemporary presentation",
      platforms: [
        {
          name: "Zomato Dining",
          offer: "15% off + free dessert",
          offerValue: "15%",
          rating: 4.5,
          bookingFee: "Free",
          cancellation: "Free up to 3 hours",
          features: ["Garden seating", "Cooking demo", "Spice box gift"],
          availability: "Available",
          price: "₹1500 for two"
        },
        {
          name: "EazyDiner",
          offer: "Buy 1 Get 1 on main course",
          offerValue: "50%",
          rating: 4.7,
          bookingFee: "Free",
          cancellation: "Free up to 2 hours",
          features: ["Chef's table", "Welcome drink", "Recipe card"],
          availability: "Available",
          price: "₹1200 for two"
        },
        {
          name: "Dineout",
          offer: "₹300 off on ₹1000",
          offerValue: "₹300",
          rating: 4.4,
          bookingFee: "Free",
          cancellation: "Free up to 1 hour",
          features: ["Window seating", "Complimentary appetizer", "Photo opportunity"],
          availability: "Limited",
          price: "₹1400 for two"
        }
      ],
      bestDeal: "EazyDiner",
      maxSavings: 600,
      avgRating: 4.53,
      images: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
      amenities: ["Parking", "Outdoor Seating", "Live Music", "Family Friendly", "AC", "Full Bar"],
      dressCode: "Casual",
      timings: "11:00 AM - 11:30 PM"
    },
    {
      id: 3,
      name: "Ocean View",
      cuisine: "Seafood, Continental",
      rating: 4.7,
      priceRange: "₹₹₹₹₹",
      location: "Beachfront",
      description: "Fresh seafood with stunning ocean views",
      platforms: [
        {
          name: "Zomato Dining",
          offer: "30% off on seafood platter",
          offerValue: "30%",
          rating: 4.8,
          bookingFee: "Free",
          cancellation: "Free up to 4 hours",
          features: ["Ocean view table", "Champagne welcome", "Sunset special"],
          availability: "Available",
          price: "₹3500 for two"
        },
        {
          name: "EazyDiner",
          offer: "₹1000 off on ₹3000",
          offerValue: "₹1000",
          rating: 4.6,
          bookingFee: "Free",
          cancellation: "Free up to 2 hours",
          features: ["Beach access", "Complimentary mocktail", "Live cooking"],
          availability: "Limited",
          price: "₹2800 for two"
        },
        {
          name: "Dineout",
          offer: "25% cashback + free dessert",
          offerValue: "25%",
          rating: 4.5,
          bookingFee: "₹100",
          cancellation: "Free up to 1 hour",
          features: ["Private dining", "Wine pairing", "Photographer"],
          availability: "Available",
          price: "₹3200 for two"
        }
      ],
      bestDeal: "Zomato Dining",
      maxSavings: 1050,
      avgRating: 4.63,
      images: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
      amenities: ["Valet Parking", "Ocean View", "Live Music", "WiFi", "AC", "Wine Cellar", "Private Dining"],
      dressCode: "Formal",
      timings: "5:00 PM - 12:00 AM"
    }
  ];

  const cuisines = [
    "All", "Italian", "Indian", "Chinese", "Mexican", "Thai",
    "Continental", "Japanese", "Mediterranean", "Seafood", "Fine Dining"
  ];

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "price", label: "Lowest Price" },
    { value: "savings", label: "Max Savings" },
    { value: "distance", label: "Nearest" }
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
    router.push(`/dining?${params.toString()}`);
  };

  const handlePlatformClick = (platformName: string, restaurantName: string) => {
    // Simulate redirect to platform
    alert(`Redirecting to ${platformName} for ${restaurantName} reservation`);
  };

  const calculateSavings = (restaurant: any) => {
    const prices = restaurant.platforms.map((p: any) => {
      const basePrice = parseInt(p.price.replace(/[^\d]/g, ''));
      if (p.offerValue.includes('%')) {
        const percentage = parseInt(p.offerValue.replace('%', ''));
        return basePrice * (percentage / 100);
      } else if (p.offerValue.includes('₹')) {
        return parseInt(p.offerValue.replace(/[^\d]/g, ''));
      } else if (p.offerValue.includes('Buy 1 Get 1')) {
        return basePrice / 2;
      }
      return 0;
    });
    return Math.max(...prices);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-10 blur-3xl"
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
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12 md:py-16"
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
            <ChefHat className="w-16 h-16 text-white mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Fine Dining Experiences
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Compare restaurant booking offers and find the perfect table for your special occasion
          </p>

          {/* Search and Booking Form */}
          <motion.form
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <motion.div whileHover={{ scale: 1.02 }}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Restaurant or cuisine"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:border-white/40 focus:ring-white/40 transition-all duration-300 rounded-lg"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-10 h-12 border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:border-white/40 focus:ring-white/40 transition-all duration-300 rounded-lg"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 h-12 border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:border-white/40 focus:ring-white/40 transition-all duration-300 rounded-lg"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-10 h-12 border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:border-white/40 focus:ring-white/40 transition-all duration-300 rounded-lg"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="h-12 bg-white text-purple-600 hover:bg-gray-100 rounded-lg font-semibold w-full">
                  <Search className="w-4 h-4 mr-2" />
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
                className="text-3xl font-bold text-purple-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {restaurants.length}
              </motion.div>
              <p className="text-gray-600 text-sm">Restaurants</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <motion.div
                className="text-3xl font-bold text-pink-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
              >
                4.6
              </motion.div>
              <p className="text-gray-600 text-sm">Avg Rating</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <motion.div
                className="text-3xl font-bold text-red-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              >
                ₹{Math.max(...restaurants.map(calculateSavings))}
              </motion.div>
              <p className="text-gray-600 text-sm">Max Savings</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <motion.div
                className="text-3xl font-bold text-orange-500 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
              >
                3
              </motion.div>
              <p className="text-gray-600 text-sm">Platforms</p>
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
              <SelectTrigger className="w-40 h-10 border-2 border-gray-200 focus:border-purple-400 rounded-lg">
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
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger className="w-40 h-10 border-2 border-gray-200 focus:border-purple-400 rounded-lg">
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

          <motion.div whileHover={{ scale: 1.05 }}>
            <Select value={partySize} onValueChange={setPartySize}>
              <SelectTrigger className="w-32 h-10 border-2 border-gray-200 focus:border-purple-400 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Person</SelectItem>
                <SelectItem value="2">2 People</SelectItem>
                <SelectItem value="3">3 People</SelectItem>
                <SelectItem value="4">4 People</SelectItem>
                <SelectItem value="5+">5+ People</SelectItem>
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
            Fine Dining Restaurants
          </h2>
          <p className="text-gray-600">
            Compare booking offers and find the perfect restaurant for your occasion
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {restaurants.map((restaurant) => (
            <motion.div key={restaurant.id} variants={itemVariants}>
              <Card
                className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 overflow-hidden group"
                onMouseEnter={() => setSelectedRestaurant(restaurant.id)}
                onMouseLeave={() => setSelectedRestaurant(null)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Restaurant Info */}
                    <div className="lg:w-1/3">
                      <div className="relative">
                        <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <Building className="w-16 h-16 text-purple-600 mx-auto mb-2" />
                              <div className="text-lg font-bold text-purple-800">
                                {restaurant.name.split(' ')[0]}
                              </div>
                              <div className="text-sm text-purple-700">
                                {restaurant.name.split(' ')[1]}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                            {restaurant.name}
                          </h3>
                          <p className="text-gray-600 mb-3">{restaurant.description}</p>

                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              {restaurant.cuisine}
                            </Badge>
                            <Badge className="bg-pink-100 text-pink-700 border-pink-200">
                              {restaurant.priceRange}
                            </Badge>
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{restaurant.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{restaurant.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{restaurant.timings}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>Dress Code: {restaurant.dressCode}</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">Amenities:</div>
                            <div className="flex flex-wrap gap-1">
                              {restaurant.amenities.slice(0, 4).map((amenity, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {restaurant.amenities.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{restaurant.amenities.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Platform Comparison */}
                    <div className="lg:w-2/3">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Target className="w-5 h-5 text-purple-500" />
                          Booking Platform Comparison
                        </h4>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 rounded-full flex items-center gap-2">
                          <Crown className="w-4 h-4" />
                          Best: {restaurant.bestDeal}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {restaurant.platforms.map((platform) => (
                          <motion.div
                            key={platform.name}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer"
                            onClick={() => handlePlatformClick(platform.name, restaurant.name)}
                          >
                            <Card
                              className={`p-4 border-2 transition-all duration-300 ${platform.name === restaurant.bestDeal
                                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="font-bold">{platform.name}</div>
                                </div>
                                {platform.name === restaurant.bestDeal && (
                                  <Badge className="bg-purple-500 text-white text-xs">
                                    BEST
                                  </Badge>
                                )}
                              </div>

                              <div className="space-y-2">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-gray-900">
                                    {platform.price}
                                  </div>
                                  <div className="text-sm text-gray-600">for two</div>
                                </div>

                                <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-3 rounded-lg">
                                  <div className="text-center">
                                    <div className="text-sm font-medium text-gray-700 mb-1">Special Offer</div>
                                    <div className="text-lg font-bold text-orange-600">
                                      {platform.offer}
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="bg-gray-50 rounded p-2">
                                    <div className="font-medium text-gray-700">Rating</div>
                                    <div className="flex items-center justify-center gap-1">
                                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                      <span>{platform.rating}</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 rounded p-2">
                                    <div className="font-medium text-gray-700">Booking Fee</div>
                                    <div className="font-medium">{platform.bookingFee}</div>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="text-xs font-medium text-gray-700">Features:</div>
                                  {platform.features.slice(0, 2).map((feature, idx) => (
                                    <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                      {feature}
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-3">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs w-full text-center ${platform.availability === "Available"
                                      ? "text-green-700 border-green-200 bg-green-50"
                                      : "text-yellow-700 border-yellow-200 bg-yellow-50"
                                      }`}
                                  >
                                    {platform.availability}
                                  </Badge>
                                </div>

                                <div className="text-xs text-gray-500 mt-2">
                                  <div className="font-medium">Cancellation:</div>
                                  <div>{platform.cancellation}</div>
                                </div>
                              </div>

                              <motion.div
                                className="mt-4 text-center"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Button
                                  size="sm"
                                  className={`w-full ${platform.name === restaurant.bestDeal
                                    ? 'bg-purple-500 hover:bg-purple-600'
                                    : 'bg-pink-500 hover:bg-pink-600'
                                    } text-white`}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Book Now
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
        className="bg-gradient-to-r from-purple-500 to-pink-500 py-16"
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
            <Diamond className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premium Dining Experiences
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Book your table at the finest restaurants with exclusive offers and guaranteed availability
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-purple-100">Partner Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-purple-100">Happy Diners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.8</div>
              <div className="text-purple-100">Avg Rating</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DiningPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DiningPageContent />
    </Suspense>
  );
}