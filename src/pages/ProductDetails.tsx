import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/components/ProductCard";

const ProductDetails = () => {
	const params = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			if (!params.id) return;
			try {
				const data = await apiClient.getProduct(params.id);
				setProduct(data);
			} catch (error) {
				console.error('Failed to fetch product:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [params.id]);

	if (loading) {
		return (
			<div className="max-w-3xl mx-auto py-12 px-4">
				<Card className="border-border">
					<CardContent className="p-6 space-y-4">
						<p className="text-lg">Loading product...</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="max-w-3xl mx-auto py-12 px-4">
				<Card className="border-border">
					<CardContent className="p-6 space-y-4">
						<p className="text-lg">Product not found.</p>
						<Button asChild>
							<Link to="/products">Back to Products</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
			<div className="w-full">
				<img src={product.image} alt={product.title} className="w-full aspect-square object-cover rounded-lg border border-border" />
			</div>
			<div className="space-y-4">
				<p className="text-sm text-muted-foreground">{product.category} • {product.condition}</p>
				<h1 className="text-3xl font-bold">{product.title}</h1>
				{product.price && <p className="text-2xl font-semibold text-primary">KES {product.price}</p>}
				<p className="text-base text-foreground whitespace-pre-line">{product.description}</p>
				<p className="text-sm">In stock: <span className="font-medium">{product.stock ?? 0}</span></p>
				<div className="flex gap-2 pt-2">
					<Button asChild variant="ghost"><a href="tel:+254700000000">Call</a></Button>
					<Button asChild variant="secondary"><a href={`https://wa.me/254700000000?text=Hi, I'm interested in: ${product.title}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></Button>
					<Button asChild variant="outline"><Link to="/products">Back</Link></Button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;


