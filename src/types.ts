export interface PetProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  medicalConditions: string[];
  breed: string;
}

export interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
  category: string;
}

export interface MealTemplate {
  id: string;
  name: string;
  description: string;
  proteinBase: string;
  calories: number;
  imageUrl: string;
  price: number;
}

export interface CustomMeal {
  id?: string;
  petId: string;
  proteinBases: string[];
  veggies: string[];
  proportions: {
    protein: number;
    vegetables: number;
    grains: number;
    supplements: number;
  };
  medicines: string[];
  dailyQuantity: number; // in grams
  frequency: number; // meals per day
  price: number;
  calories?: number;
}

export interface CartItem {
  id: string;
  type: 'template' | 'custom';
  data: MealTemplate | CustomMeal;
  quantity: number;
  petId?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'delivered' | 'processing';
  deliveryDate: string;
  address: string;
}
