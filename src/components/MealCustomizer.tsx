import { useState, useEffect } from 'react';
import { CustomMeal, MealTemplate, PetProfile } from '../types';
import { 
  Check, 
  Info, 
  Scale, 
  Plus, 
  Trash2, 
  AlertCircle,
  ChevronRight,
  UtensilsCrossed,
  Sparkles,
  CreditCard,
  Truck,
  Calendar as CalendarIcon,
  MapPin,
  Upload,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { PROTEIN_BASES, VEGGIES, MEDICINES } from '../constants';

interface MealCustomizerProps {
  initialTemplate?: MealTemplate;
  petProfile: PetProfile;
  onConfirm: (meal: CustomMeal) => void;
  onAddToCart: (meal: CustomMeal) => void;
}

export default function MealCustomizer({ initialTemplate, petProfile, onConfirm, onAddToCart }: MealCustomizerProps) {
  const [step, setStep] = useState(1);
  const [meal, setMeal] = useState<CustomMeal>({
    petId: petProfile.id,
    proteinBases: initialTemplate ? [initialTemplate.proteinBase] : ['Beef'],
    veggies: [],
    proportions: {
      protein: 50,
      vegetables: 30,
      grains: 15,
      supplements: 5
    },
    medicines: [],
    dailyQuantity: 400,
    frequency: 2,
    price: 15.00,
    calories: 600
  });

  useEffect(() => {
    setMeal(m => ({ ...m, calories: m.dailyQuantity * 1.5 }));
  }, [meal.dailyQuantity]);

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    date: '',
    option: 'standard'
  });

  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const totalProportion = (Object.values(meal.proportions) as number[]).reduce((a, b) => a + b, 0);

  const handleProportionChange = (key: keyof CustomMeal['proportions'], value: number) => {
    setMeal({
      ...meal,
      proportions: { ...meal.proportions, [key]: value }
    });
    
    if (key === 'protein' && value > 70) {
      setError("Protein percentage is higher than recommended. Adjust?");
    } else {
      setError(null);
    }
  };

  const applySuggestions = () => {
    setMeal({
      ...meal,
      proportions: {
        protein: 45,
        vegetables: 35,
        grains: 15,
        supplements: 5
      }
    });
    setSuccess("Custom meal plan updated with vet-recommended proportions.");
    setTimeout(() => setSuccess(null), 3000);
  };

  const toggleProtein = (base: string) => {
    setMeal({
      ...meal,
      proteinBases: meal.proteinBases.includes(base)
        ? meal.proteinBases.filter(b => b !== base)
        : [...meal.proteinBases, base]
    });
  };

  const toggleVeggie = (veggie: string) => {
    setMeal({
      ...meal,
      veggies: meal.veggies.includes(veggie)
        ? meal.veggies.filter(v => v !== veggie)
        : [...meal.veggies, veggie]
    });
  };

  const toggleMedicine = (med: string) => {
    if (meal.medicines.length >= 3) {
      setError("Dosage exceeds recommended limit. Please review.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const isAdding = !meal.medicines.includes(med);
    setMeal({
      ...meal,
      medicines: isAdding 
        ? [...meal.medicines, med]
        : meal.medicines.filter(m => m !== med)
    });
    if (isAdding) {
      setSuccess("Medicine successfully added to meal plan.");
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  if (isReviewing) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Review & Checkout</h2>
          <p className="text-slate-500 text-sm">Tailored for {petProfile.name}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-50 pb-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Proteins</p>
                <p className="text-lg font-bold text-slate-800">{meal.proteinBases.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Amount</p>
                <p className="text-lg font-bold text-slate-800">{meal.dailyQuantity}g / day</p>
                <div className="flex items-center justify-end gap-1 text-amber-500 text-[10px] font-bold mt-1">
                  <Flame size={10} fill="currentColor" />
                  {meal.calories} kcal
                </div>
              </div>
            </div>

            {meal.veggies.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Veggies</p>
                <div className="flex flex-wrap gap-2">
                  {meal.veggies.map(v => (
                    <span key={v} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">{v}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Proportions</p>
              <div className="flex h-3 rounded-full overflow-hidden">
                <div style={{ width: `${meal.proportions.protein}%` }} className="bg-primary"></div>
                <div style={{ width: `${meal.proportions.vegetables}%` }} className="bg-emerald-400"></div>
                <div style={{ width: `${meal.proportions.grains}%` }} className="bg-amber-400"></div>
                <div style={{ width: `${meal.proportions.supplements}%` }} className="bg-indigo-400"></div>
              </div>
            </div>

            {meal.medicines.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Integrated Medicine</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Info size={10} /> Medicines are measured and embedded per veterinary guidelines.
                </p>
                <div className="space-y-2">
                  {meal.medicines.map(med => (
                    <div key={med} className="flex items-center gap-2 text-sm text-slate-700 bg-red-50 p-2 rounded-xl border border-red-100">
                      <AlertCircle size={14} className="text-red-500" />
                      {med}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Truck size={18} className="text-primary" /> Delivery Details
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} /> Delivery Address
                </label>
                <input 
                  type="text" 
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                  placeholder="Enter your address"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CalendarIcon size={12} /> Date
                  </label>
                  <input 
                    type="date" 
                    value={deliveryInfo.date}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Truck size={12} /> Option
                  </label>
                  <select 
                    value={deliveryInfo.option}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, option: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none"
                  >
                    <option value="standard">Standard ($5.00)</option>
                    <option value="express">Express ($12.00)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <CreditCard size={18} /> Payment Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between opacity-70">
                <span>Custom Meal Plan</span>
                <span>${meal.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between opacity-70">
                <span>Delivery ({deliveryInfo.option})</span>
                <span>${deliveryInfo.option === 'express' ? '12.00' : '5.00'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                <span>Total</span>
                <span>${(meal.price + (deliveryInfo.option === 'express' ? 12 : 5)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setIsReviewing(false)}
            className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onConfirm(meal)}
            className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            Pay & Confirm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toasts */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-6 right-6 z-50 bg-red-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <AlertCircle size={20} />
            <p className="text-sm font-bold">{error}</p>
          </motion.div>
        )}
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <Check size={20} />
            <p className="text-sm font-bold">{success}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              i <= step ? "bg-primary" : "bg-slate-200"
            )}
          />
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Select Protein Bases</h3>
            <p className="text-sm text-slate-500">Choose one or more foundations for the meal.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {PROTEIN_BASES.map((base) => (
              <button
                key={base}
                onClick={() => toggleProtein(base)}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all text-left space-y-2",
                  meal.proteinBases.includes(base) 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-slate-100 bg-white hover:border-slate-200"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  meal.proteinBases.includes(base) ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                )}>
                  <UtensilsCrossed size={16} />
                </div>
                <span className={cn(
                  "font-bold block",
                  meal.proteinBases.includes(base) ? "text-primary" : "text-slate-600"
                )}>{base}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Select Vegetables</h3>
            <p className="text-sm text-slate-500">Add fresh, organic greens and roots.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {VEGGIES.map((veggie) => (
              <button
                key={veggie}
                onClick={() => toggleVeggie(veggie)}
                className={cn(
                  "px-4 py-2 rounded-full border-2 font-bold text-sm transition-all",
                  meal.veggies.includes(veggie)
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
                )}
              >
                {veggie}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">Nutrient Proportions</h3>
              <p className="text-sm text-slate-500">Balance the nutrients precisely.</p>
            </div>
            <button 
              onClick={applySuggestions}
              className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-2 rounded-xl hover:bg-primary/20 transition-colors"
            >
              <Sparkles size={14} /> Suggested
            </button>
          </div>
          
          <div className="space-y-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            {(Object.keys(meal.proportions) as Array<keyof CustomMeal['proportions']>).map((key) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>{key}</span>
                  <span className="text-primary">{meal.proportions[key]}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={meal.proportions[key]}
                  onChange={(e) => handleProportionChange(key, Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            ))}
            
            <div className={cn(
              "p-3 rounded-xl flex items-center gap-3 text-sm",
              totalProportion === 100 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            )}>
              {totalProportion === 100 ? <Check size={18} /> : <AlertCircle size={18} />}
              <span className="font-medium">Total: {totalProportion}% (Target 100%)</span>
            </div>
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Medicine & Supplements</h3>
            <p className="text-sm text-slate-500">Integrate prescriptions directly into the food.</p>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 space-y-3">
            <div className="flex items-center gap-3">
              <Upload className="text-primary" size={20} />
              <p className="text-xs text-primary-dark font-bold">Upload prescription to ensure safe dosage integration.</p>
            </div>
            <button className="w-full py-2 bg-white border border-primary/20 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest">
              Choose File
            </button>
          </div>

          <div className="space-y-3">
            {MEDICINES.map((med) => (
              <button
                key={med}
                onClick={() => toggleMedicine(med)}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all",
                  meal.medicines.includes(med)
                    ? "border-red-200 bg-red-50"
                    : "border-slate-100 bg-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    meal.medicines.includes(med) ? "bg-red-500 text-white" : "bg-slate-100 text-slate-400"
                  )}>
                    <Plus size={20} className={meal.medicines.includes(med) ? "rotate-45 transition-transform" : ""} />
                  </div>
                  <span className={cn(
                    "font-bold text-sm text-left",
                    meal.medicines.includes(med) ? "text-red-700" : "text-slate-600"
                  )}>{med}</span>
                </div>
                {meal.medicines.includes(med) && <Check size={20} className="text-red-500" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 5 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Portion & Schedule</h3>
            <p className="text-sm text-slate-500">Set the daily quantity and frequency.</p>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Quantity (grams)</label>
                <span className="text-primary font-bold">{meal.dailyQuantity}g</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={meal.dailyQuantity}
                onChange={(e) => setMeal({ ...meal, dailyQuantity: Number(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Meals Per Day</label>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMeal({ ...meal, frequency: num })}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-bold transition-all",
                      meal.frequency === num 
                        ? "bg-primary text-white shadow-md" 
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex gap-3">
            <Info className="text-primary flex-shrink-0" size={20} />
            <p className="text-xs text-primary-dark leading-relaxed">
              Based on {petProfile.name}'s weight ({petProfile.weight}kg), the recommended daily intake is approximately 350-450g.
            </p>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
          >
            Back
          </button>
        )}
        <button 
          onClick={() => {
            if (petProfile.weight === 0) {
              setError("Add weight details to continue.");
              setTimeout(() => setError(null), 3000);
              return;
            }
            if (step < 5) setStep(step + 1);
            else setIsReviewing(true);
          }}
          disabled={step === 3 && totalProportion !== 100}
          className={cn(
            "flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2",
            step === 3 && totalProportion !== 100 ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {step === 5 ? 'Review Order' : 'Next Step'}
          <ChevronRight size={20} />
        </button>
      </div>

      <button 
        onClick={() => {
          onAddToCart(meal);
          setSuccess("Custom meal plan added to cart.");
          setTimeout(() => setSuccess(null), 3000);
        }}
        className="w-full py-3 text-primary font-bold text-sm border-2 border-primary/20 rounded-2xl hover:bg-primary/5 transition-colors"
      >
        Save & Add to Cart
      </button>
    </div>
  );
}
