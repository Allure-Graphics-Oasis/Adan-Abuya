import { Product } from "@/components/ProductCard";

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Crux Coffee Grinder",
    description: "Professional Crux coffee grinder, perfect for cafes and restaurants. Consistent grind quality.",
    price: "45,000",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Coffee & Beverage",
    condition: "Excellent",
    featured: true
  },
  {
    id: "2", 
    title: "Wega Commercial Espresso Machine",
    description: "High-performance Wega commercial espresso machine. Ex-UK quality for professional use.",
    price: "125,000",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    category: "Coffee & Beverage",
    condition: "Excellent",
    featured: true
  },
  {
    id: "3",
    title: "Double Deck Pizza Oven",
    description: "Commercial double deck pizza oven. Perfect for restaurants and pizzerias. Ex-UK import.",
    price: "185,000",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    category: "Baking & Cooking",
    condition: "Excellent",
    featured: true
  },
  {
    id: "4",
    title: "Mazzer Coffee Grinder",
    description: "Professional Mazzer type coffee grinder with precision grinding capabilities.",
    price: "52,000",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Coffee & Beverage",
    condition: "Good"
  },
  {
    id: "5",
    title: "Automatic Espresso Machine (Nespresso Style)",
    description: "High-quality automatic espresso machine with Nespresso-style functionality.",
    price: "85,000",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    category: "Coffee & Beverage",
    condition: "Excellent"
  },
  {
    id: "6",
    title: "Electric Kettle - Commercial Grade",
    description: "Heavy-duty commercial electric kettle for high-volume beverage preparation.",
    price: "15,000",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    category: "Coffee & Beverage",
    condition: "Good"
  },
  {
    id: "7",
    title: "Blodgett Commercial Convection Oven",
    description: "Professional Blodgett convection oven for commercial kitchen operations.",
    price: "225,000",
    image: "https://images.unsplash.com/photo-1574758347884-dee5619d3ef1?w=400&h=400&fit=crop",
    category: "Baking & Cooking",
    condition: "Excellent"
  },
  {
    id: "8",
    title: "Commercial Coffee Grinder - Heavy Duty",
    description: "Industrial-grade coffee grinder suitable for high-volume coffee shops.",
    price: "68,000",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Coffee & Beverage",
    condition: "Good"
  }
];

export const categories = [
  "All",
  "Coffee & Beverage",
  "Baking & Cooking"
] as const;