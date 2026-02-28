import { Article, MealTemplate } from "./types";

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "The Importance of Precision in Canine Nutrition",
    author: "Dr. Sarah Jenkins, DVM",
    date: "Oct 24, 2023",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    content: "Modern veterinary science shows that even small variations in nutrient proportions can significantly impact a dog's long-term health. Customizing meals allows for addressing specific metabolic needs..."
  },
  {
    id: "2",
    title: "Administering Meds: Making it Stress-Free",
    author: "Dr. Michael Chen",
    date: "Nov 12, 2023",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
    content: "Many pet parents struggle with 'pilling' their dogs. Integrating medication directly into high-quality, palatable food is often the most effective and least stressful method for both pet and owner..."
  },
  {
    id: "3",
    title: "Ethical Sourcing for Pet Food",
    author: "Vet Team Alpha",
    date: "Dec 05, 2023",
    category: "Ethics",
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800",
    content: "Choosing the right protein source isn't just about nutrition; it's about the environment. We explore how sustainable farming practices lead to better quality ingredients for your furry friend..."
  }
];

export const MEAL_TEMPLATES: MealTemplate[] = [
  {
    id: "t1",
    name: "Vitality Beef & Kale",
    description: "High-protein grass-fed beef mixed with organic kale and sweet potatoes.",
    proteinBase: "Beef",
    calories: 450,
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400",
    price: 12.50
  },
  {
    id: "t2",
    name: "Gentle Salmon & Rice",
    description: "Easily digestible wild-caught salmon with brown rice and peas.",
    proteinBase: "Salmon",
    calories: 380,
    imageUrl: "https://images.unsplash.com/photo-1544436486-c7404a494013?auto=format&fit=crop&q=80&w=400",
    price: 14.20
  },
  {
    id: "t3",
    name: "Lean Turkey Feast",
    description: "Low-fat turkey breast with carrots, spinach, and quinoa.",
    proteinBase: "Turkey",
    calories: 320,
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400",
    price: 11.80
  }
];

export const PROTEIN_BASES = ['Beef', 'Chicken', 'Salmon', 'Turkey', 'Lamb', 'Duck'];
export const VEGGIES = ['Carrots', 'Spinach', 'Kale', 'Sweet Potato', 'Peas', 'Broccoli', 'Blueberries'];
export const MEDICINES = ['Joint Support (Glucosamine)', 'Digestive Enzyme', 'Skin & Coat Oil', 'Prescribed Antibiotic', 'Heartworm Preventive'];
