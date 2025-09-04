import { useMemo, useState } from "react";
import { getProducts, updateProduct, createProduct, deleteProduct, resetProducts } from "@/store/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@/components/ProductCard";


const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined;

async function searchUnsplashFirstImage(query: string): Promise<string | null> {
	if (!UNSPLASH_ACCESS_KEY) return null;
	try {
		const url = new URL("https://api.unsplash.com/search/photos");
		url.searchParams.set("query", query);
		url.searchParams.set("per_page", "1");
		const res = await fetch(url.toString(), {
			headers: {
				Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
			}
		});
		if (!res.ok) return null;
		const data = await res.json();
		const first = data?.results?.[0];
		const src = first?.urls?.small || first?.urls?.regular || null;
		return src ?? null;
	} catch (_) {
		return null;
	}
}

function useProductsState() {
	const [version, setVersion] = useState(0);
	const products = useMemo(() => getProducts(), [version]);
	const refresh = () => setVersion((v) => v + 1);
	return { products, refresh };
}

const emptyDraft: Omit<Product, "id"> = {
	title: "",
	description: "",
	price: "",
	image: "",
	category: "Coffee & Beverage",
	condition: "Good",
	stock: 0
};

const Admin = () => {
	const { products, refresh } = useProductsState();
	const [isAuthed, setIsAuthed] = useState<boolean>(() => {
		return localStorage.getItem("app.admin.authed") === "true";
	});
	const [password, setPassword] = useState("");
	const [editing, setEditing] = useState<Product | null>(null);
	const [draft, setDraft] = useState<Omit<Product, "id">>(emptyDraft);
	const [imgQuery, setImgQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [localFile, setLocalFile] = useState<File | null>(null);

	const doLogin = () => {
		if (password.trim() === (import.meta.env.VITE_ADMIN_PASSWORD || "admin123")) {
			localStorage.setItem("app.admin.authed", "true");
			setIsAuthed(true);
		} else {
			alert("Invalid password");
		}
	};

	const startEdit = (p: Product) => {
		setEditing(p);
		setDraft({
			title: p.title,
			description: p.description,
			price: p.price || "",
			image: p.image,
			category: p.category,
			condition: p.condition,
			stock: p.stock ?? 0
		});
	};

	const saveEdit = () => {
		if (!editing) return;
		updateProduct({ ...editing, ...draft });
		setEditing(null);
		setDraft(emptyDraft);
		refresh();
	};

	const addNew = () => {
		const created = createProduct(draft);
		setEditing(created);
		setDraft({ ...draft });
		refresh();
	};

	const remove = (id: string) => {
		if (!confirm("Delete this product?")) return;
		deleteProduct(id);
		if (editing?.id === id) {
			setEditing(null);
		}
		refresh();
	};

	const searchAndApplyImage = async () => {
		if (!editing) return;
		setIsSearching(true);
		const query = imgQuery || draft.title || editing.title;
		const url = await searchUnsplashFirstImage(query);
		if (url) {
			updateProduct({ ...editing, image: url });
			setDraft((d) => ({ ...d, image: url }));
			refresh();
		} else {
			alert("No image found or API key missing.");
		}
		setIsSearching(false);
	};

	const onLocalFileChange = async (file: File | null) => {
		setLocalFile(file);
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const url = String(reader.result || "");
			setDraft((d) => ({ ...d, image: url }));
			if (editing) {
				updateProduct({ ...editing, image: url });
				refresh();
			}
		};
		reader.readAsDataURL(file);
	};

	if (!isAuthed) {
		return (
			<div className="max-w-md mx-auto py-16 px-4">
				<Card className="border-border">
					<CardContent className="p-6 space-y-4">
						<h2 className="text-2xl font-bold">Admin Login</h2>
						<Input
							type="password"
							placeholder="Enter admin password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button onClick={doLogin} className="w-full">Login</Button>
						<p className="text-xs text-muted-foreground">Default: admin123 or set VITE_ADMIN_PASSWORD</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<div className="space-x-2">
					<Button variant="outline" onClick={() => { resetProducts(); refresh(); }}>Reset to Sample</Button>
					<Button variant="secondary" onClick={() => { localStorage.removeItem("app.admin.authed"); setIsAuthed(false); }}>Logout</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-1 border-border">
					<CardContent className="p-6 space-y-4">
						<h2 className="text-xl font-semibold">{editing ? "Edit Product" : "Add Product"}</h2>
						<Input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
						<Textarea placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
						<Input placeholder="Price" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
						<Input type="number" placeholder="Amount in stock" value={draft.stock ?? 0}
							onChange={(e) => setDraft({ ...draft, stock: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) })} />
						<Input placeholder="Image URL" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
						<label className="text-sm text-muted-foreground">Upload image from device</label>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => onLocalFileChange(e.target.files?.[0] || null)}
						/>
						<Select value={draft.category} onValueChange={(v) => setDraft({ ...draft, category: v })}>
							<SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="Coffee & Beverage">Coffee & Beverage</SelectItem>
								<SelectItem value="Baking & Cooking">Baking & Cooking</SelectItem>
							</SelectContent>
						</Select>
						<Select value={draft.condition} onValueChange={(v: any) => setDraft({ ...draft, condition: v })}>
							<SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="Excellent">Excellent</SelectItem>
								<SelectItem value="Good">Good</SelectItem>
								<SelectItem value="Fair">Fair</SelectItem>
							</SelectContent>
						</Select>
						<div className="flex gap-2">
							{editing ? (
								<>
									<Button onClick={saveEdit}>Save Changes</Button>
									<Button variant="outline" onClick={() => { setEditing(null); setDraft(emptyDraft); }}>Cancel</Button>
								</>
							) : (
								<Button onClick={addNew}>Add Product</Button>
							)}
						</div>

						<div className="pt-2 space-y-2">
							<h3 className="font-medium">Search and Replace Image</h3>
							<Input placeholder="Search image term (e.g. espresso machine)" value={imgQuery} onChange={(e) => setImgQuery(e.target.value)} />
							<Button onClick={searchAndApplyImage} disabled={!editing || isSearching}>{isSearching ? "Searching..." : "Search & Apply"}</Button>
							{!UNSPLASH_ACCESS_KEY && (
								<p className="text-xs text-muted-foreground">Set VITE_UNSPLASH_ACCESS_KEY in .env to enable image search.</p>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="lg:col-span-2 border-border">
					<CardContent className="p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{products.map((p) => (
								<div key={p.id} className="border rounded-lg overflow-hidden">
									<img src={p.image} alt={p.title} className="w-full aspect-square object-cover" />
									<div className="p-3 space-y-1">
										<p className="font-semibold line-clamp-1">{p.title}</p>
										<p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
										<div className="flex items-center justify-between pt-2">
											<Button size="sm" onClick={() => startEdit(p)}>Edit</Button>
											<Button size="sm" variant="destructive" onClick={() => remove(p.id)}>Delete</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Admin;


