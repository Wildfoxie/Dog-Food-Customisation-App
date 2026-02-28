/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/Home';
import ProfilePage from './components/PetProfile';
import MealMenu from './components/MealMenu';
import MealCustomizer from './components/MealCustomizer';
import ArticleDetail from './components/ArticleDetail';
import OrdersPage from './components/OrdersPage';
import CartPage from './components/CartPage';
import { PetProfile, Article, MealTemplate, CustomMeal, CartItem, Order } from './types';
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';

type View = 'home' | 'profile' | 'menu' | 'custom' | 'article' | 'success' | 'orders' | 'cart';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<MealTemplate | undefined>(undefined);
  const [darkMode, setDarkMode] = useState(false);
  
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>([{
    id: '1',
    name: 'Buddy',
    age: 3,
    weight: 12,
    medicalConditions: ['Sensitive Stomach'],
    breed: 'Beagle'
  }]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentView(tab as View);
    setSelectedTemplate(undefined);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const handleSelectTemplate = (template: MealTemplate) => {
    setSelectedTemplate(template);
    setCurrentView('custom');
    setActiveTab('custom');
  };

  const handleAddToCart = (item: MealTemplate | CustomMeal, type: 'template' | 'custom') => {
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: item,
      quantity: 1,
      petId: type === 'custom' ? (item as CustomMeal).petId : petProfiles[0].id
    };
    setCart([...cart, newItem]);
  };

  const handleConfirmOrder = (customMeal?: CustomMeal) => {
    const itemsToOrder = customMeal 
      ? [{ id: 'temp', type: 'custom' as const, data: customMeal, quantity: 1 }]
      : cart;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items: [...itemsToOrder],
      total: itemsToOrder.reduce((sum, item) => sum + (item.data.price * item.quantity), 0) + 5,
      status: 'processing',
      deliveryDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString(),
      address: '123 Puppy Lane, Barktown'
    };

    setOrders([newOrder, ...orders]);
    if (!customMeal) setCart([]);
    setCurrentView('success');
  };

  const getTitle = () => {
    switch (currentView) {
      case 'home': return 'PawFection';
      case 'profile': return 'Your Pack';
      case 'menu': return 'Meal Menu';
      case 'custom': return 'Customize Meal';
      case 'article': return 'Vet Insights';
      case 'success': return 'Order Confirmed';
      case 'orders': return 'My Orders';
      case 'cart': return 'Cart';
      default: return 'PawFection';
    }
  };

  return (
    <div className={cn("relative min-h-screen", darkMode && "dark")}>
      <Layout 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        title={getTitle()}
        showBack={['article', 'cart', 'orders'].includes(currentView) || (currentView === 'custom' && !!selectedTemplate)}
        onBack={() => {
          if (currentView === 'article') setCurrentView('home');
          else if (currentView === 'cart') setCurrentView('home');
          else if (currentView === 'orders') setCurrentView('profile');
          else if (currentView === 'custom') setCurrentView('menu');
        }}
        cartCount={cart.length}
        onCartClick={() => setCurrentView('cart')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      >
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <HomePage 
                petName={petProfiles[0]?.name} 
                onArticleClick={handleArticleClick} 
                onMealClick={handleSelectTemplate}
                onAddToCart={(m) => handleAddToCart(m, 'template')}
              />
            </motion.div>
          )}

          {currentView === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <ProfilePage 
                profiles={petProfiles} 
                onSave={(p) => {
                  setPetProfiles(p);
                }} 
              />
              <button 
                onClick={() => setCurrentView('orders')}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                View Order History
              </button>
            </motion.div>
          )}

          {currentView === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <MealMenu 
                onSelectTemplate={handleSelectTemplate} 
                onCustomClick={() => {
                  setCurrentView('custom');
                  setActiveTab('custom');
                }}
              />
            </motion.div>
          )}

          {currentView === 'custom' && (
            <motion.div 
              key="custom"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <MealCustomizer 
                petProfile={petProfiles[0]}
                initialTemplate={selectedTemplate}
                onConfirm={handleConfirmOrder}
                onAddToCart={(m) => handleAddToCart(m, 'custom')}
              />
            </motion.div>
          )}

          {currentView === 'article' && selectedArticle && (
            <motion.div 
              key="article"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ArticleDetail 
                article={selectedArticle} 
                onBack={() => setCurrentView('home')} 
              />
            </motion.div>
          )}

          {currentView === 'orders' && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <OrdersPage orders={orders} />
            </motion.div>
          )}

          {currentView === 'cart' && (
            <motion.div 
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <CartPage 
                items={cart} 
                onUpdateQuantity={(id, delta) => {
                  setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
                }}
                onRemove={(id) => setCart(cart.filter(item => item.id !== id))}
                onCheckout={() => handleConfirmOrder()}
              />
            </motion.div>
          )}

          {currentView === 'success' && (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center space-y-6"
            >
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-emerald-600 w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">Order Confirmed!</h2>
                <p className="text-slate-500">
                  Your pet's meal plan has been confirmed and sent to our kitchen.
                </p>
                <p className="text-xs text-primary font-bold pt-2">
                  Freshly prepared. Quality checked. Delivered safely.
                </p>
              </div>
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setActiveTab('home');
                }}
                className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20"
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </div>
  );
}
