import prisma from "@/lib/prisma";
import { Package, ClipboardList, Image as ImageIcon } from "lucide-react";
import { AddProductForm } from "@/components/features/admin/AddProductForm";

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      
      {/* SECTION 1: INVENTORY MANAGEMENT */}
      <div className="flex items-center gap-3 mb-8">
        <Package className="h-8 w-8 text-kv-forest" />
        <h1 className="font-serif text-3xl font-bold text-kv-forest">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Interactive Add Product Form */}
        <div className="lg:col-span-1 bg-kv-sage/20 p-6 rounded-xl border border-kv-sage h-fit">
          <h2 className="font-medium text-kv-forest text-xl mb-4">Add New Product</h2>
          <AddProductForm />
        </div>

        {/* Right: Inventory List */}
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
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kv-sage text-kv-forest">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-kv-sage/10 transition-colors">
                      <td className="px-4 py-3">
                        {product.imageUrl ? (
                           // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.imageUrl} alt={product.name} className="h-10 w-10 rounded object-cover border border-kv-sage" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-kv-sage flex items-center justify-center text-kv-olive">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">৳ {product.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: RECENT ORDERS */}
      <div className="mt-16 border-t border-kv-sage pt-12">
        <div className="flex items-center gap-3 mb-8">
          <ClipboardList className="h-8 w-8 text-kv-forest" />
          <h2 className="font-serif text-3xl font-bold text-kv-forest">Recent Orders</h2>
        </div>
        {/* ... (Existing Orders code remains exactly the same logic) ... */}
        {orders.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-kv-sage rounded-xl text-kv-olive">
            No orders have been placed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-kv-sage rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start border-b border-kv-sage pb-4">
                  <div>
                    <p className="text-xs text-kv-olive font-medium uppercase tracking-wider mb-1">Order #{order.id.slice(-8)}</p>
                    <p className="font-medium text-kv-forest text-lg">৳ {order.totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-kv-olive mt-1">Paid via: {order.paymentMethod}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-kv-sage px-3 py-1 text-xs font-semibold text-kv-forest uppercase tracking-wider">
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-kv-forest">Order Details:</p>
                  {order.items.map((item) => (
                    <div key={item.id} className="bg-kv-sage/20 p-3 rounded-md text-sm border border-kv-sage/50">
                      <p className="font-medium text-kv-forest text-base mb-1">
                        {item.product.name} <span className="text-kv-olive font-normal text-sm">(Qty: {item.quantity})</span>
                      </p>
                      {item.customMeasurements ? (
                        <div className="mt-2 p-2 bg-white rounded border border-kv-terracotta/30">
                          <p className="text-kv-terracotta text-xs font-bold uppercase tracking-wider mb-1">Custom Measurements:</p>
                          <p className="text-kv-forest font-medium">{item.customMeasurements}</p>
                        </div>
                      ) : (
                        <p className="text-kv-olive mt-1">Standard Fit</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}