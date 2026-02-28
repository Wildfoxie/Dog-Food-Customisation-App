import { CartItem } from '../types';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartPage({ items, onUpdateQuantity, onRemove, onCheckout }: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.data.price * item.quantity), 0);
  const delivery = items.length > 0 ? 5.00 : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <ShoppingBag size={40} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
          <p className="text-sm text-slate-500">Add some delicious meals to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Shopping Cart</h2>

      <div className="space-y-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-3xl p-4 flex gap-4 shadow-sm border border-slate-100"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img 
                  src={item.type === 'template' ? (item.data as any).imageUrl : 'https://ui-avatars.com/api/?name=Custom&background=0F766E&color=fff'} 
                  alt="item" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 truncate max-w-[120px]">
                    {item.type === 'template' ? (item.data as any).name : 'Custom Meal'}
                  </h4>
                  <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
                    <Flame size={10} fill="currentColor" />
                    {item.data.calories} kcal
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-primary font-bold">${item.data.price.toFixed(2)}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-slate-400 hover:text-primary">
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-slate-400 hover:text-primary">
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">${(item.data.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <CreditCard size={18} /> Order Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between opacity-70">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between opacity-70">
            <span>Delivery</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary-dark transition-all"
      >
        Checkout Now <ArrowRight size={20} />
      </button>
    </div>
  );
}
