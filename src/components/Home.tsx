import { Article, MealTemplate } from '../types';
import { ARTICLES, MEAL_TEMPLATES } from '../constants';
import { ChevronRight, Star, ShieldCheck, Heart, Flame, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomePageProps {
  onArticleClick: (article: Article) => void;
  onMealClick: (meal: MealTemplate) => void;
  onAddToCart: (meal: MealTemplate) => void;
  petName: string;
}

export default function HomePage({ onArticleClick, onMealClick, onAddToCart, petName }: HomePageProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section>
        <h2 className="text-3xl font-bold text-slate-800 leading-tight">
          Hello, <span className="text-primary">{petName || 'Pet Parent'}</span>!
        </h2>
        <p className="text-slate-500 mt-1">Ready to craft the perfect meal today?</p>
      </section>

      {/* Vet Articles Carousel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Vet Insights</h3>
          <button className="text-primary text-sm font-bold flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-6 px-6">
          {ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onArticleClick(article)}
              className="flex-shrink-0 w-72 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer"
            >
              <div className="h-40 relative">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                  {article.category}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-bold text-slate-800 line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="font-medium">{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activity / Recommendation (Daily Tip) */}
      <section className="bg-primary p-6 rounded-[2rem] text-white relative overflow-hidden shadow-xl shadow-primary/20">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Heart size={18} fill="white" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Daily Tip</span>
          </div>
          <p className="text-lg font-medium leading-relaxed">
            Adding a touch of steamed pumpkin can aid digestion for {petName || 'your dog'} during seasonal changes.
          </p>
          <button className="bg-white text-primary px-4 py-2 rounded-xl text-sm font-bold">
            Learn More
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      {/* Curated Meals Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Curated Menu</h3>
          <button className="text-primary text-sm font-bold flex items-center gap-1">
            Explore <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {MEAL_TEMPLATES.slice(0, 2).map((meal) => (
            <div 
              key={meal.id}
              className="bg-white rounded-3xl p-4 flex gap-4 shadow-sm border border-slate-100 items-center group"
            >
              <div 
                className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => onMealClick(meal)}
              >
                <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 truncate">{meal.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">
                    ${meal.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
                    <Flame size={10} fill="currentColor" />
                    {meal.calories} kcal
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onAddToCart(meal)}
                className="p-3 bg-primary/10 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats / Trust Badges (Safety and Quality) */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100 flex flex-col gap-2">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <ShieldCheck className="text-emerald-600" size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Safety</p>
            <p className="text-sm text-emerald-600 font-medium">Vet-Approved</p>
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-3xl border border-amber-100 flex flex-col gap-2">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Star className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Quality</p>
            <p className="text-sm text-amber-600 font-medium">Premium Sourcing</p>
          </div>
        </div>
      </section>
    </div>
  );
}
