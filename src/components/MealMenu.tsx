import { MEAL_TEMPLATES } from '../constants';
import { MealTemplate } from '../types';
import { Plus, Info, Flame, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MealMenuProps {
  onSelectTemplate: (template: MealTemplate) => void;
  onCustomClick: () => void;
}

export default function MealMenu({ onSelectTemplate, onCustomClick }: MealMenuProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Chef's Selection</h2>
        <p className="text-slate-500 text-sm">Curated templates for specific dietary needs.</p>
      </div>

      <div className="space-y-4">
        {MEAL_TEMPLATES.map((meal) => (
          <motion.div
            key={meal.id}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-[2rem] p-4 flex gap-4 shadow-sm border border-slate-100 items-center group cursor-pointer"
            onClick={() => onSelectTemplate(meal)}
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src={meal.imageUrl} 
                alt={meal.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800">{meal.name}</h4>
                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Flame size={12} fill="currentColor" />
                  <span className="text-[10px] font-bold">{meal.calories} kcal</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {meal.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
                  {meal.proteinBase} Base
                </span>
                <button className="text-primary hover:bg-primary/10 p-1 rounded-full transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div 
        onClick={onCustomClick}
        className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-slate-200 cursor-pointer hover:bg-slate-800 transition-colors"
      >
        <div className="space-y-1">
          <h4 className="font-bold">Need something unique?</h4>
          <p className="text-xs text-slate-400">Start from scratch with our customizer.</p>
        </div>
        <button className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/40">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
