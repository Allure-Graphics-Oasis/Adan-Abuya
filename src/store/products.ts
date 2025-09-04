import { sampleProducts } from "@/data/products";
import type { Product } from "@/components/ProductCard";

const STORAGE_KEY = "app.products.v1";

export type ProductsState = {
	products: Product[];
};

function loadProductsFromStorage(): Product[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw) as Product[];
			if (Array.isArray(parsed)) return parsed;
		}
	} catch (_) {}
	return sampleProducts;
}

function saveProductsToStorage(products: Product[]) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
	} catch (_) {}
}

let productsCache: Product[] | null = null;

export function getProducts(): Product[] {
	if (!productsCache) {
		productsCache = loadProductsFromStorage();
	}
	return productsCache;
}

export function setProducts(next: Product[]): void {
	productsCache = next;
	saveProductsToStorage(next);
}

export function updateProduct(updated: Product): void {
	const current = getProducts();
	const next = current.map((p) => (p.id === updated.id ? { ...p, ...updated } : p));
	setProducts(next);
}

export function createProduct(newProduct: Omit<Product, "id">): Product {
	const current = getProducts();
	const id = String(Date.now());
	const created: Product = { id, ...newProduct } as Product;
	const next = [created, ...current];
	setProducts(next);
	return created;
}

export function deleteProduct(id: string): void {
	const current = getProducts();
	const next = current.filter((p) => p.id !== id);
	setProducts(next);
}

export function resetProducts(): void {
	setProducts(sampleProducts);
}


