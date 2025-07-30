'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Chrome, Mail, Smartphone, ArrowLeft, Sparkles, Shield, Zap, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
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

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowOTP(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      router.push('/');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // Simulate Google auth
    setTimeout(() => {
      router.push('/');
      setIsLoading(false);
    }, 1000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate email auth
    setTimeout(() => {
      router.push('/');
      setIsLoading(false);
    }, 1000);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-48 h-48 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={floatVariants}
            transition={{ delay: i * 0.5 }}
          />
        ))}
      </div>

      <motion.div 
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div 
          className="mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            className="hover:bg-orange-100 rounded-lg transition-all duration-300"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl bg-white/90 backdrop-blur-sm border-0 overflow-hidden">
            <CardHeader className="text-center pb-6 bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <motion.div 
                className="flex justify-center mb-4"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl font-bold">
                Welcome to FoodCompare
              </CardTitle>
              <p className="text-orange-100">
                Sign in to start comparing food prices and saving money
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger 
                    value="phone" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
                  >
                    <Smartphone className="w-4 h-4" />
                    Phone
                  </TabsTrigger>
                  <TabsTrigger 
                    value="email" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={showOTP ? "otp" : "phone"}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="phone" className="space-y-4">
                      {!showOTP ? (
                        <motion.form 
                          onSubmit={handlePhoneSubmit} 
                          className="space-y-4"
                          variants={itemVariants}
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Enter your phone number
                            </label>
                            <motion.div whileHover={{ scale: 1.02 }}>
                              <Input
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-lg"
                                required
                              />
                            </motion.div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              type="submit" 
                              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg rounded-lg transition-all duration-300"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto" />
                                </motion.div>
                              ) : (
                                'Send OTP'
                              )}
                            </Button>
                          </motion.div>
                        </motion.form>
                      ) : (
                        <motion.form 
                          onSubmit={handleOTPSubmit} 
                          className="space-y-4"
                          variants={itemVariants}
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Enter OTP sent to {phone}
                            </label>
                            <motion.div whileHover={{ scale: 1.02 }}>
                              <Input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-lg text-center text-lg tracking-widest"
                                maxLength={6}
                                required
                              />
                            </motion.div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              type="submit" 
                              className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg rounded-lg transition-all duration-300"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto" />
                                </motion.div>
                              ) : (
                                'Verify OTP'
                              )}
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="w-full h-12 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-all duration-300"
                              onClick={() => setShowOTP(false)}
                            >
                              Change Phone Number
                            </Button>
                          </motion.div>
                        </motion.form>
                      )}
                    </TabsContent>

                    <TabsContent value="email" className="space-y-4">
                      <motion.form 
                        onSubmit={handleEmailSubmit} 
                        className="space-y-4"
                        variants={itemVariants}
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-lg"
                              required
                            />
                          </motion.div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                          </label>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 rounded-lg"
                              required
                            />
                          </motion.div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg rounded-lg transition-all duration-300"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto" />
                              </motion.div>
                            ) : (
                              'Sign In'
                            )}
                          </Button>
                        </motion.div>
                      </motion.form>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>

              {/* Google Auth */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-12 mt-4 flex items-center gap-2 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg transition-all duration-300"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                  >
                    <Chrome className="w-5 h-5" />
                    Continue with Google
                  </Button>
                </motion.div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <Button variant="link" className="p-0 h-auto text-orange-500 hover:text-orange-600">
                      Sign up
                    </Button>
                  </motion.div>
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <motion.div 
                  className="flex items-center gap-2"
                  variants={itemVariants}
                >
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    ✓
                  </Badge>
                  <span className="text-sm text-gray-600">Compare prices across all platforms</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  variants={itemVariants}
                >
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                    ✓
                  </Badge>
                  <span className="text-sm text-gray-600">Get exclusive deals and offers</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  variants={itemVariants}
                >
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                    ✓
                  </Badge>
                  <span className="text-sm text-gray-600">Track price drops in real-time</span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Badge */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-green-200 text-green-700 px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 mr-2" />
            Secure & Private
          </Badge>
        </motion.div>
      </motion.div>
    </div>
  );
}