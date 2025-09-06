import { Product } from "@/components/ProductCard";

// Coffee machine and spare parts products for Dawa Coffee
export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Dawa Commercial Espresso Machine",
    description: "Professional 2-group espresso machine perfect for cafes and restaurants. Consistent extraction and reliable performance.",
    price: "85,000",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    category: "Coffee Machines",
    condition: "Excellent",
    featured: true
  },
  {
    id: "2", 
    title: "Dawa Coffee Grinder - Professional Grade",
    description: "Heavy-duty coffee grinder with precise grind settings. Perfect for commercial coffee operations.",
    price: "35,000",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Coffee Machines",
    condition: "Excellent",
    featured: true
  },
  {
    id: "3",
    title: "Espresso Machine Group Head Gasket Set",
    description: "Complete gasket set for Dawa espresso machines. Includes all necessary seals and gaskets for maintenance.",
    price: "2,500",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Spare Parts",
    condition: "New",
    featured: true
  },
  {
    id: "4",
    title: "Dawa Coffee Machine Portafilter",
    description: "Professional portafilter for Dawa espresso machines. High-quality stainless steel construction.",
    price: "8,500",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Spare Parts",
    condition: "New"
  },
  {
    id: "5",
    title: "Dawa Automatic Coffee Machine",
    description: "Fully automatic coffee machine with built-in grinder. Perfect for offices and small cafes.",
    price: "65,000",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    category: "Coffee Machines",
    condition: "Excellent"
  },
  {
    id: "6",
    title: "Coffee Machine Water Filter System",
    description: "Professional water filtration system for coffee machines. Extends machine life and improves coffee quality.",
    price: "12,000",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    category: "Accessories",
    condition: "New"
  },
  {
    id: "7",
    title: "Dawa Milk Frother Wand",
    description: "Replacement milk frother wand for Dawa espresso machines. Stainless steel construction.",
    price: "4,500",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Spare Parts",
    condition: "New"
  },
  {
    id: "8",
    title: "Coffee Machine Descaling Kit",
    description: "Professional descaling solution and cleaning kit for Dawa coffee machines. Maintains optimal performance.",
    price: "3,200",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Accessories",
    condition: "New"
  },
  {
    id: "9",
    title: "Dawa Coffee Machine Pump",
    description: "High-pressure pump replacement for Dawa espresso machines. OEM quality part.",
    price: "15,000",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Spare Parts",
    condition: "New"
  },
  {
    id: "10",
    title: "Commercial Coffee Machine Drip Tray",
    description: "Stainless steel drip tray for Dawa commercial coffee machines. Easy to clean and maintain.",
    price: "5,800",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Spare Parts",
    condition: "New"
  },
  {
    id: "11",
    title: "Dawa Coffee Machine Thermostat",
    description: "Temperature control thermostat for Dawa espresso machines. Ensures consistent brewing temperature.",
    price: "7,200",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Spare Parts",
    condition: "New"
  },
  {
    id: "12",
    title: "Coffee Machine Cleaning Brushes Set",
    description: "Professional cleaning brush set for coffee machine maintenance. Includes all necessary brushes.",
    price: "1,800",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Accessories",
    condition: "New"
  }
];

export const categories = [
  "All",
  "Coffee Machines",
  "Spare Parts",
  "Accessories"
] as const;