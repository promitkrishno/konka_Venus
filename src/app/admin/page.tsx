import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Plus } from "lucide-react";

export default async function AdminDashboard() {
  // 1. Fetch all existing products directly from the Prisma database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Define the Server Action to handle form submission securely
  async function createProduct(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;

    // Insert the new product into SQLite
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
      },
    });

    // Refresh the page data automatically so the new product appears
    revalidatePath("/admin");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <Package className="h-8 w-8 text-kv-forest" />
        <h1 className="font-serif text-3xl font-bold text-kv-forest">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add Product Form */}
        <div className="lg:col-span-1 bg-kv-sage/20 p-6 rounded-xl border border-kv-sage">
          <h2 className="font-medium text-kv-forest text-xl mb-4">Add New Product</h2>
          
          <form action={createProduct} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-kv-forest">Product Name</label>
              <Input name="name" placeholder="e.g., Emerald Handwoven Saree" required className="mt-1 bg-white" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-kv-forest">Category</label>
              <select 
                name="category" 
                required 
                className="w-full mt-1 flex h-10 rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest"
              >
                <option value="Sarees">Sarees</option>
                <option value="Kurtis">Kurtis</option>
                <option value="Tops">Tops</option>
                <option value="Bags">Bags</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-kv-forest">Price (৳)</label>
              <Input name="price" type="number" min="0" placeholder="3200" required className="mt-1 bg-white" />
            </div>

            <div>
              <label className="text-sm font-medium text-kv-forest">Description</label>
              <textarea 
                name="description" 
                required 
                rows={3}
                placeholder="Details about the aesthetic and material..."
                className="w-full mt-1 flex rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest"
              />
            </div>

            <Button type="submit" className="w-full mt-2 bg-kv-forest hover:bg-kv-forest/90 text-kv-offwhite gap-2">
              <Plus className="h-4 w-4" /> Save Product
            </Button>
          </form>
        </div>

        {/* Right Column: Inventory List */}
        <div className="lg:col-span-2">
          <h2 className="font-medium text-kv-forest text-xl mb-4">Current Inventory</h2>
          
          {products.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-kv-sage rounded-xl text-kv-olive">
              No products found. Add your first item to the left.
            </div>
          ) : (
            <div className="bg-white border border-kv-sage rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-kv-sage/30 text-kv-forest font-medium border-b border-kv-sage">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kv-sage text-kv-forest">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-kv-sage/10 transition-colors">
                      <td className="px-4 py-4 font-medium">{product.name}</td>
                      <td className="px-4 py-4">{product.category}</td>
                      <td className="px-4 py-4">৳ {product.price.toLocaleString()}</td>
                      <td className="px-4 py-4 text-right">
                        <span className="inline-flex items-center rounded-full bg-kv-sage px-2 py-1 text-xs font-medium text-kv-forest">
                          {product.isActive ? 'Active' : 'Draft'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}