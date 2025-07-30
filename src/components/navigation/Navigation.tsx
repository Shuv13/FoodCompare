'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Search, 
  Target, 
  Zap, 
  Utensils, 
  User, 
  Settings, 
  Bell,
  Heart,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationProps {
  user?: {
    name: string;
    avatar?: string;
    notifications?: number;
  };
}

export default function Navigation({ user }: NavigationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home, description: 'Find the best food deals' },
    { href: '/search', label: 'Search', icon: Search, description: 'Search restaurants & food' },
    { href: '/compare', label: 'Compare', icon: Target, description: 'Compare prices across platforms' },
    { href: '/quick-delivery', label: 'Quick Delivery', icon: Zap, description: '10-minute delivery comparison' },
    { href: '/dining', label: 'Dining', icon: Utensils, description: 'Restaurant reservations' },
  ];

  // Page-specific configurations
  const getPageConfig = () => {
    switch (pathname) {
      case '/':
        return {
          showBackButton: false,
          title: 'FoodCompare',
          subtitle: 'Compare prices & save money',
          icon: Sparkles,
          gradient: 'from-orange-500 to-red-500'
        };
      case '/search':
        return {
          showBackButton: true,
          title: 'Search',
          subtitle: 'Find restaurants & food',
          icon: Search,
          gradient: 'from-blue-500 to-purple-500'
        };
      case '/compare':
        return {
          showBackButton: true,
          title: 'Price Comparison',
          subtitle: 'Compare across platforms',
          icon: Target,
          gradient: 'from-orange-500 to-red-500'
        };
      case '/quick-delivery':
        return {
          showBackButton: true,
          title: '10-Minute Delivery',
          subtitle: 'Lightning fast delivery',
          icon: Zap,
          gradient: 'from-blue-500 to-purple-500'
        };
      case '/dining':
        return {
          showBackButton: true,
          title: 'Dining Reservations',
          subtitle: 'Book your table',
          icon: Utensils,
          gradient: 'from-purple-500 to-pink-500'
        };
      case '/profile':
        return {
          showBackButton: true,
          title: 'My Profile',
          subtitle: 'Manage your account',
          icon: User,
          gradient: 'from-orange-500 to-red-500'
        };
      case '/auth':
        return {
          showBackButton: true,
          title: 'Sign In',
          subtitle: 'Welcome back',
          icon: User,
          gradient: 'from-blue-500 to-purple-500'
        };
      default:
        return {
          showBackButton: true,
          title: 'FoodCompare',
          subtitle: 'Compare prices & save money',
          icon: Sparkles,
          gradient: 'from-orange-500 to-red-500'
        };
    }
  };

  const pageConfig = getPageConfig();
  const IconComponent = pageConfig.icon;

  const floatVariants = {
    float: {
      y: [-3, 3, -3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Page Title */}
            <div className="flex items-center gap-3">
              {pageConfig.showBackButton && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
              
              <Link href="/" className="flex items-center gap-3">
                <motion.div 
                  className={`w-10 h-10 bg-gradient-to-br ${pageConfig.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <motion.span 
                    className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {pageConfig.title}
                  </motion.span>
                  {pageConfig.subtitle && (
                    <motion.p 
                      className="text-xs text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {pageConfig.subtitle}
                    </motion.p>
                  )}
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <Button
                      variant="ghost"
                      className={`h-10 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                        pathname === item.href 
                          ? 'text-orange-600 bg-orange-50' 
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                    
                    {/* Tooltip */}
                    <motion.div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 0, y: -5 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      {item.description}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              {user && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    {user.notifications && user.notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                        {user.notifications}
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              )}

              {/* User Profile */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/profile">
                    <motion.div 
                      className="flex items-center gap-2 cursor-pointer group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-orange-600">
                        {user.name}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-orange-600" />
                    </motion.div>
                  </Link>
                </div>
              ) : (
                <Link href="/auth">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300"
                    >
                      <User className="w-4 h-4" />
                      Sign In
                    </Button>
                  </motion.div>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${pageConfig.gradient} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-xl font-bold text-gray-900">{pageConfig.title}</span>
                      <p className="text-xs text-gray-600">{pageConfig.subtitle}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* User Info */}
                {user && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">Member since Jan 2024</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-start h-12 px-4 rounded-lg transition-all duration-300 ${
                            pathname === item.href 
                              ? 'text-orange-600 bg-orange-50' 
                              : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                          }`}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Button>
                      </motion.div>
                    </Link>
                  ))}
                </nav>

                {/* Additional Items */}
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-2">
                  {user ? (
                    <>
                      <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-12 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-300"
                        >
                          <User className="w-5 h-5 mr-3" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="default"
                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg"
                      >
                        <User className="w-5 h-5 mr-3" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  );
}