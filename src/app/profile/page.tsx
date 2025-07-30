'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  CreditCard, 
  Heart,
  History,
  Star,
  TrendingUp,
  Shield,
  LogOut,
  Edit,
  Save,
  X,
  Smartphone,
  Mail,
  Calendar,
  Target,
  Award,
  Gift,
  Clock,
  DollarSign,
  MapPin as MapPinIcon,
  Phone,
  Globe,
  CreditCard as CreditCardIcon,
  Bell as BellIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    avatar: "https://via.placeholder.com/150",
    joinedDate: "2024-01-15",
    preferences: {
      notifications: true,
      emailNotifications: true,
      smsNotifications: false,
      currency: "INR",
      language: "English",
      darkMode: false
    }
  });

  // Mock statistics
  const userStats = {
    totalOrders: 156,
    totalSavings: 12450,
    favoriteCuisine: "Italian",
    avgRating: 4.6,
    memberSince: "Jan 2024"
  };

  // Mock order history
  const orderHistory = [
    {
      id: "ORD001",
      date: "2024-01-20",
      restaurant: "Pizza Palace",
      item: "Margherita Pizza",
      platform: "Uber Eats",
      price: 289,
      savings: 30,
      rating: 5,
      status: "Delivered"
    },
    {
      id: "ORD002",
      date: "2024-01-18",
      restaurant: "Burger House",
      item: "Chicken Burger Meal",
      platform: "Swiggy",
      price: 249,
      savings: 15,
      rating: 4,
      status: "Delivered"
    },
    {
      id: "ORD003",
      date: "2024-01-15",
      restaurant: "Biryani Bliss",
      item: "Chicken Biryani",
      platform: "Zomato",
      price: 329,
      savings: 30,
      rating: 5,
      status: "Delivered"
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "price_drop",
      title: "Price Drop Alert",
      message: "Pizza Palace now offers 25% off on your favorite pizza",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "offer",
      title: "Special Offer",
      message: "Get 20% cashback on your next order with Zomato",
      time: "1 day ago",
      read: true
    },
    {
      id: 3,
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've saved over ₹10,000 with FoodCompare!",
      time: "3 days ago",
      read: true
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleSaveProfile = () => {
    // Simulate saving profile
    setIsEditing(false);
    alert('Profile saved successfully!');
  };

  const handleLogout = () => {
    // Simulate logout
    router.push('/');
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
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

    

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-orange-600" />
              </div>
              <motion.div 
                className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full p-2 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit className="w-4 h-4" />
              </motion.div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <Star className="w-3 h-3 mr-1" />
                  {userStats.avgRating}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">Member since {userStats.memberSince}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{userStats.totalOrders}</div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">₹{userStats.totalSavings}</div>
                  <div className="text-sm text-gray-600">Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{userStats.favoriteCuisine}</div>
                  <div className="text-sm text-gray-600">Favorite</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">4.6</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-xl shadow-sm">
              <TabsTrigger 
                value="profile" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <History className="w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <BellIcon className="w-4 h-4" />
                Alerts
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <SettingsIcon className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-500" />
                      Personal Information
                    </span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={isEditing ? "destructive" : "default"}
                        size="sm"
                        onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                      >
                        {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </motion.div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="border-2 border-gray-200 focus:border-orange-400 rounded-lg"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {userData.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="border-2 border-gray-200 focus:border-orange-400 rounded-lg"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          {userData.email}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="border-2 border-gray-200 focus:border-orange-400 rounded-lg"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {userData.phone}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      {isEditing ? (
                        <Input
                          value={userData.location}
                          onChange={(e) => setUserData({...userData, location: e.target.value})}
                          className="border-2 border-gray-200 focus:border-orange-400 rounded-lg"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-gray-500" />
                          {userData.location}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isEditing && (
                    <motion.div 
                      className="flex justify-end"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-orange-500" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <motion.div
                        key={order.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">{order.restaurant}</div>
                            <div className="text-sm text-gray-600">{order.item}</div>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span>{order.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CreditCardIcon className="w-4 h-4 text-gray-500" />
                                <span>{order.platform}</span>
                              </div>
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">₹{order.price}</div>
                            <div className="text-sm text-green-600">Saved ₹{order.savings}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{order.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellIcon className="w-5 h-5 text-orange-500" />
                    Notifications & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border ${
                          notification.read 
                            ? 'bg-gray-50 border-gray-200' 
                            : 'bg-orange-50 border-orange-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </div>
                            <div className="text-xs text-gray-500">
                              {notification.time}
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-orange-500" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Push Notifications</span>
                        <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Email Notifications</span>
                        <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">SMS Notifications</span>
                        <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">General</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <Select defaultValue={userData.preferences.currency}>
                          <SelectTrigger className="border-2 border-gray-200 focus:border-orange-400 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <Select defaultValue={userData.preferences.language}>
                          <SelectTrigger className="border-2 border-gray-200 focus:border-orange-400 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Hindi">हिन्दी</SelectItem>
                            <SelectItem value="Spanish">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}