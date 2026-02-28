import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  User, 
  Utensils, 
  PlusCircle, 
  ChevronLeft,
  Bell,
  ShoppingCart,
  Package,
  RefreshCw,
  Clock,
  CheckCircle2,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  cartCount?: number;
  onCartClick?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Layout({ 
  children, 
  activeTab, 
  onTabChange, 
  title, 
  showBack, 
  onBack,
  cartCount = 0,
  onCartClick,
  darkMode = false,
  onToggleDarkMode
}: LayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Smart Reminder', message: 'Time to reorder Buddy\'s favorite Beef Stew!', icon: <RefreshCw size={16} />, type: 'reminder' },
    { id: 2, title: 'Order Update', message: 'Your last order is out for delivery.', icon: <Package size={16} />, type: 'order' },
    { id: 3, title: 'Order Confirmed', message: 'Your custom meal plan has been received.', icon: <CheckCircle2 size={16} />, type: 'order' },
    { id: 4, title: 'System Update', message: 'New seasonal ingredients added to customizer.', icon: <Clock size={16} />, type: 'system' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-1 -ml-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
          )}
          <h1 className="text-xl font-bold text-primary tracking-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-30"
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 z-40 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800">Updates</h3>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest">3 New</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 flex gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                            n.type === 'reminder' ? "bg-primary/10 text-primary" : 
                            n.type === 'order' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                          )}>
                            {n.icon}
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-slate-800">{n.title}</p>
                            <p className="text-[11px] text-slate-500 leading-relaxed">{n.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-3 text-xs font-bold text-slate-400 hover:text-primary transition-colors bg-slate-50/30">
                      Clear All
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5 text-slate-600" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-between sticky bottom-0 z-20">
        <NavButton 
          icon={<HomeIcon />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => onTabChange('home')} 
        />
        <NavButton 
          icon={<Utensils />} 
          label="Menu" 
          active={activeTab === 'menu'} 
          onClick={() => onTabChange('menu')} 
        />
        <NavButton 
          icon={<PlusCircle />} 
          label="Custom" 
          active={activeTab === 'custom'} 
          onClick={() => onTabChange('custom')} 
        />
        <NavButton 
          icon={<User />} 
          label="Profile" 
          active={activeTab === 'profile'} 
          onClick={() => onTabChange('profile')} 
        />
      </nav>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-200",
        active ? "text-primary scale-110" : "text-slate-400 hover:text-slate-600"
      )}
    >
      <div className={cn(
        "p-1 rounded-xl transition-colors",
        active ? "bg-primary/10" : "bg-transparent"
      )}>
        {React.cloneElement(icon as React.ReactElement, { size: 22, strokeWidth: active ? 2.5 : 2 })}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );
}
