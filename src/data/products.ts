import { Product } from "@/components/ProductCard";

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Office Desk - Executive Model",
    description: "Large wooden executive desk with drawers. Perfect for home office or business use.",
    price: "15,000",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Business",
    condition: "Excellent",
    featured: true
  },
  {
    id: "2", 
    title: "Samsung 43\" Smart TV",
    description: "Crystal clear display with smart features. Excellent condition, barely used.",
    price: "25,000",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop",
    category: "Household",
    condition: "Excellent",
    featured: true
  },
  {
    id: "3",
    title: "Industrial Air Compressor",
    description: "Heavy-duty air compressor suitable for workshop and industrial applications.",
    price: "45,000",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=400&fit=crop",
    category: "Industrial",
    condition: "Good",
    featured: true
  },
  {
    id: "4",
    title: "Leather Office Chair",
    description: "Ergonomic leather office chair with adjustable height and lumbar support.",
    price: "8,500",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Business",
    condition: "Good"
  },
  {
    id: "5",
    title: "Refrigerator - Double Door",
    description: "Energy efficient double door refrigerator. Great for family use.",
    price: "35,000",
    image: "https://images.unsplash.com/photo-1571175351790-4565fa4bdb09?w=400&h=400&fit=crop",
    category: "Household",
    condition: "Excellent"
  },
  {
    id: "6",
    title: "Welding Machine",
    description: "Professional welding machine with accessories. Perfect for metalwork.",
    price: "22,000",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=400&fit=crop",
    category: "Industrial",
    condition: "Good"
  },
  {
    id: "7",
    title: "Dining Table Set",
    description: "Beautiful wooden dining table with 6 chairs. Great for family dining.",
    price: "18,000",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop",
    category: "Household",
    condition: "Good"
  },
  {
    id: "8",
    title: "Conference Table",
    description: "Large conference table perfect for meetings and presentations.",
    price: "28,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
    category: "Business",
    condition: "Excellent"
  }
];

export const categories = [
  "All",
  "Household",
  "Business", 
  "Industrial"
] as const;