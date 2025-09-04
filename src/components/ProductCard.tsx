import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  title: string;
  description: string;
  price?: string;
  image: string;
  category: string;
  condition: "Excellent" | "Good" | "Fair";
  featured?: boolean;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const conditionColor = {
    Excellent: "success",
    Good: "accent",
    Fair: "warning"
  } as const;

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <Badge 
            variant={conditionColor[product.condition] as any}
            className="text-xs"
          >
            {product.condition}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {product.price && (
          <p className="text-lg font-bold text-primary mb-3">
            KES {product.price}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <div className="flex w-full space-x-2">
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <a href="tel:+254700000000">
              <Phone className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="secondary" size="sm" className="flex-1" asChild>
            <a 
              href={`https://wa.me/254700000000?text=Hi, I'm interested in: ${product.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/product/${product.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;