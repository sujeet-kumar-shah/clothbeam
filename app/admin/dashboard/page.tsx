"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Settings, 
  Plus, 
  LogOut, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Search,
  Bell,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories, getProducts } from "@/lib/actions/admin";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  // Simple auth check for demo
  useEffect(() => {
    const isAuth = localStorage.getItem("clothbeam_admin_auth");
    if (!isAuth) {
      router.push("/admin/login");
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    const [cats, prods] = await Promise.all([getCategories(), getProducts()]);
    setCategories(cats);
    setProducts(prods);
  };

  const handleLogout = () => {
    localStorage.removeItem("clothbeam_admin_auth");
    router.push("/admin/login");
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Layers },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-brand-black text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col sticky top-0 h-screen`}>
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-gold rounded-xl flex items-center justify-center shrink-0">
            <span className="font-bold text-xl">C</span>
          </div>
          {isSidebarOpen && <span className="font-heading text-xl font-bold tracking-tight">Clothbeam</span>}
        </div>

        <nav className="flex-grow mt-8 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-brand-gold text-white shadow-lg shadow-brand-gold/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-brand-black capitalize">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-gold/20 w-64"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-brand-black transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-brand-beige overflow-hidden border border-gray-100"></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === "overview" && <OverviewContent stats={{
            revenue: "₹2,45,000",
            orders: 24,
            products: products.length,
            customers: 64
          }} />}
          {activeTab === "products" && (
            <ProductsContent 
              products={products} 
              onAddClick={() => setIsProductDialogOpen(true)} 
            />
          )}
          {activeTab === "categories" && (
            <CategoriesContent 
              categories={categories} 
              onAddClick={() => setIsCategoryDialogOpen(true)} 
            />
          )}
        </div>

        {/* Dialogs */}
        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSuccess={() => {
              setIsProductDialogOpen(false);
              fetchData();
            }} />
          </DialogContent>
        </Dialog>

        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm onSuccess={() => {
              setIsCategoryDialogOpen(false);
              fetchData();
            }} />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

function OverviewContent({ stats }: { stats: any }) {
  const displayStats = [
    { title: "Total Revenue", value: stats.revenue, change: "+12.5%", icon: TrendingUp, color: "text-green-600" },
    { title: "Active Orders", value: stats.orders, change: "+4", icon: ShoppingBag, color: "text-blue-600" },
    { title: "Total Products", value: stats.products, change: "+12", icon: Package, color: "text-brand-gold" },
    { title: "New Customers", value: stats.customers, change: "+8.2%", icon: Users, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center font-bold text-xs">#120{i}</div>
                    <div>
                      <p className="font-bold text-sm">Rahul Sharma</p>
                      <p className="text-xs text-gray-400">Emerald Green Kurta • Size L</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">₹4,500</p>
                    <p className="text-xs text-green-500 font-medium">Delivered</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-64 flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
               <p className="text-gray-400 text-sm">Sales distribution chart</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProductsContent({ products, onAddClick }: { products: any[], onAddClick: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Inventory</h2>
        <Button onClick={onAddClick} className="bg-brand-black text-white hover:bg-brand-gold">
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">No products added yet</td>
              </tr>
            ) : products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                      {product.images.split(',')[0] && (
                        <Image src={product.images.split(',')[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                      )}
                    </div>
                    <span className="font-bold text-brand-black">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.category.name}</td>
                <td className="px-6 py-4 text-sm font-bold">₹{product.price.toLocaleString("en-IN")}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-brand-gold font-bold hover:underline cursor-pointer">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoriesContent({ categories, onAddClick }: { categories: any[], onAddClick: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Product Categories</h2>
        <Button onClick={onAddClick} className="bg-brand-black text-white hover:bg-brand-gold">
          <Plus className="h-4 w-4 mr-2" /> New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 italic">No categories created yet</div>
        ) : categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-brand-gold transition-all">
            <div className="h-40 bg-gray-50 rounded-2xl mb-4 overflow-hidden relative">
               {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="300px" />}
            </div>
            <h3 className="font-heading text-xl font-bold mb-1">{cat.name}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{cat.description || `Collection of ${cat.name}`}</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 text-sm">Edit</Button>
              <Button variant="outline" className="flex-1 text-sm border-red-100 text-red-500 hover:bg-red-50">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
