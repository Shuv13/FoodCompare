'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Star, TrendingUp, Zap, Utensils, User, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Price Comparison",
      description: "Compare prices across Swiggy, Zomato, Uber Eats and find the best deals"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "10-min Delivery",
      description: "Compare quick delivery options from Zepto, Blinkit and more"
    },
    {
      icon: <Utensils className="w-8 h-8 text-green-500" />,
      title: "Dining Deals",
      description: "Find the best restaurant offers and table booking deals"
    }
  ];

  const stats = [
    { value: "40%", label: "Average Savings", color: "text-orange-500" },
    { value: "10K+", label: "Restaurants", color: "text-blue-500" },
    { value: "50K+", label: "Happy Users", color: "text-green-500" },
    { value: "24/7", label: "Price Tracking", color: "text-purple-500" }
  ];

  const popularSearches = ['Pizza', 'Burger', 'Biryani', 'Chinese', 'North Indian', 'South Indian'];

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
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={floatVariants}
            transition={{ delay: i * 0.5 }}
          />
        ))}
      </div>

  

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-red-400/10 to-pink-400/10"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Find the Best{' '}
              <motion.span 
                className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Food Deals
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Compare prices across all platforms and save up to 40% on every order
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="shadow-2xl bg-white/90 backdrop-blur-sm border-0">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          placeholder="Search for food, restaurants, or cuisines..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-xl"
                        />
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          placeholder="Enter your location..."
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-xl"
                        />
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className="h-14 px-8 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg rounded-xl transition-all duration-300"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        Search Deals
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Popular Searches */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-600 mb-4 text-lg">Popular searches:</p>
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {popularSearches.map((item, index) => (
                <motion.div key={item} variants={itemVariants}>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300 border-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodCompare
            </span>?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Save time and money with our intelligent price comparison engine
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 group">
                <CardContent className="p-8">
                  <motion.div 
                    className="flex justify-center mb-6"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center hover:shadow-xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <motion.div 
                    className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 10, 
                      delay: 0.1 * index 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-600 text-lg font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-16 md:py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to Start Saving?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-orange-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join thousands of users who save money on every food order
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-10 py-4 bg-white text-orange-600 hover:bg-orange-50 font-semibold rounded-xl shadow-2xl transition-all duration-300"
            >
              Get Started Now
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}