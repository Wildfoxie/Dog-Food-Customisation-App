import { Order } from '../types';
import { Package, Calendar, MapPin, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrdersPageProps {
  orders: Order[];
}

export default function OrdersPage({ orders }: OrdersPageProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <Package size={40} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-800">No orders yet</h3>
          <p className="text-sm text-slate-500">Your pet's meal history will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Order History</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order #{order.id.slice(-6)}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                    order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800">
                  {order.items.length} {order.items.length === 1 ? 'Meal' : 'Meals'}
                </h4>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                <p className="text-[10px] text-slate-400 font-medium">{order.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-50">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{order.deliveryDate}</span>
              </div>
              <div className="flex items-center gap-1 truncate">
                <MapPin size={14} />
                <span className="truncate">{order.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img 
                      src={item.type === 'template' ? (item.data as any).imageUrl : 'https://ui-avatars.com/api/?name=Custom&background=0F766E&color=fff'} 
                      alt="item" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <button className="text-primary font-bold text-xs flex items-center gap-1">
                Details <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 space-y-3">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-primary" size={20} />
          <p className="text-sm font-bold text-primary-dark">Freshly prepared. Quality checked. Delivered safely.</p>
        </div>
      </div>
    </div>
  );
}
