import { useState, useEffect } from 'react';
import { PetProfile } from '../types';
import { Save, Dog, Calendar, Weight, Activity, Plus, Trash2, Info, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfilePageProps {
  profiles: PetProfile[];
  onSave: (profiles: PetProfile[]) => void;
}

export default function ProfilePage({ profiles, onSave }: ProfilePageProps) {
  const [petList, setPetList] = useState<PetProfile[]>(profiles);
  const [editingId, setEditingId] = useState<string | null>(profiles.length > 0 ? profiles[0].id : null);
  const [isDirty, setIsDirty] = useState(false);

  const handleAddPet = () => {
    const newPet: PetProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      age: 0,
      weight: 0,
      medicalConditions: [],
      breed: ''
    };
    setPetList([...petList, newPet]);
    setEditingId(newPet.id);
    setIsDirty(true);
  };

  const handleUpdatePet = (id: string, updates: Partial<PetProfile>) => {
    setPetList(petList.map(p => p.id === id ? { ...p, ...updates } : p));
    setIsDirty(true);
  };

  const handleRemovePet = (id: string) => {
    setPetList(petList.filter(p => p.id !== id));
    if (editingId === id) setEditingId(null);
    setIsDirty(true);
  };

  const handleAddCondition = (id: string, condition: string) => {
    if (!condition.trim()) return;
    const pet = petList.find(p => p.id === id);
    if (pet && !pet.medicalConditions.includes(condition.trim())) {
      handleUpdatePet(id, { medicalConditions: [...pet.medicalConditions, condition.trim()] });
      setIsDirty(true);
    }
  };

  const removeCondition = (id: string, idx: number) => {
    const pet = petList.find(p => p.id === id);
    if (pet) {
      handleUpdatePet(id, { medicalConditions: pet.medicalConditions.filter((_, i) => i !== idx) });
      setIsDirty(true);
    }
  };

  const handleSave = () => {
    onSave(petList);
    setIsDirty(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Your Pack</h2>
        <button
          onClick={handleAddPet}
          className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors"
        >
          <Plus size={18} /> Add Pet
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
        {petList.map((pet) => (
          <button
            key={pet.id}
            onClick={() => setEditingId(pet.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all border-2 ${
              editingId === pet.id 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
            }`}
          >
            {pet.name || 'New Pet'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {editingId && (
          <motion.div
            key={editingId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {petList.find(p => p.id === editingId) && (
              <PetForm 
                pet={petList.find(p => p.id === editingId)!} 
                onUpdate={(updates) => handleUpdatePet(editingId, updates)}
                onAddCondition={(c) => handleAddCondition(editingId, c)}
                onRemoveCondition={(idx) => removeCondition(editingId, idx)}
                onRemove={() => handleRemovePet(editingId)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleSave}
        disabled={!isDirty}
        className={`w-full py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
          isDirty 
            ? "bg-primary text-white shadow-primary/20 hover:bg-primary-dark" 
            : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
        }`}
      >
        <Save size={20} />
        Save Changes
      </button>
    </div>
  );
}

function PetForm({ pet, onUpdate, onAddCondition, onRemoveCondition, onRemove }: { 
  pet: PetProfile, 
  onUpdate: (u: Partial<PetProfile>) => void,
  onAddCondition: (c: string) => void,
  onRemoveCondition: (i: number) => void,
  onRemove: () => void
}) {
  const [newCondition, setNewCondition] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-lg relative group">
          <Dog className="w-12 h-12 text-primary" />
          <button 
            onClick={onRemove}
            className="absolute -top-1 -right-1 bg-red-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Dog size={14} /> Pet Name
            </label>
            <input
              type="text"
              value={pet.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="e.g. Buddy"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Fingerprint size={14} /> Breed
            </label>
            <input
              type="text"
              value={pet.breed}
              onChange={(e) => onUpdate({ breed: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="e.g. Beagle"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={14} /> Age (Years)
            </label>
            <input
              type="number"
              value={pet.age || ''}
              onChange={(e) => onUpdate({ age: Number(e.target.value) })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Weight size={14} /> Weight (kg)
            </label>
            <input
              type="number"
              value={pet.weight || ''}
              onChange={(e) => onUpdate({ weight: Number(e.target.value) })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
            <p className="text-[10px] text-primary font-medium flex items-center gap-1">
              <Info size={10} /> Accurate weight helps us calculate portion size.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} /> Medical Conditions
          </label>
          <p className="text-[10px] text-primary font-medium flex items-center gap-1 mb-2">
            <Info size={10} /> Health conditions allow us to suggest safer combinations.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (onAddCondition(newCondition), setNewCondition(''))}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Add condition..."
            />
            <button
              onClick={() => { onAddCondition(newCondition); setNewCondition(''); }}
              className="bg-primary text-white px-4 rounded-xl font-bold hover:bg-primary-dark transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {pet.medicalConditions.map((condition, idx) => (
              <span 
                key={idx}
                className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {condition}
                <button 
                  onClick={() => onRemoveCondition(idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
