import { Package, ShoppingBag, DollarSign, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import { useAdminDashboard } from '../../hooks/admin/useAdminDashboard';
import { Link } from 'react-router-dom';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

function fmt(n: number) {
  return `₦${Number(n).toLocaleString('en-NG')}`;
}

export default function DashboardPage() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const d = data ?? {};
  const orders = d.orders ?? {};
  const revenue = d.revenue ?? {};
  const recentOrders = d.recentOrders ?? [];
  const lowStockProducts = d.lowStockProducts ?? [];

  const orderStatusData = [
    { name: 'Pending', value: orders.pending ?? 0, fill: '#F59E0B' },
    { name: 'Confirmed', value: orders.confirmed ?? 0, fill: '#3B82F6' },
    { name: 'Processing', value: orders.processing ?? 0, fill: '#8B5CF6' },
    { name: 'Shipped', value: orders.shipped ?? 0, fill: '#6366F1' },
    { name: 'Delivered', value: orders.delivered ?? 0, fill: '#10B981' },
    { name: 'Cancelled', value: orders.cancelled ?? 0, fill: '#EF4444' },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      subtitle={`Welcome back! Here's what's happening today.`}
    >
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Products"
          value={d.products?.total ?? 0}
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Total Orders"
          value={orders.total ?? 0}
          icon={ShoppingBag}
          color="purple"
        />
        <StatsCard
          title="Monthly Revenue"
          value={fmt(revenue.month ?? 0)}
          icon={DollarSign}
          trend={revenue.growth}
          trendLabel="vs last month"
          color="green"
        />
        <StatsCard
          title="Pending Orders"
          value={orders.pending ?? 0}
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Today's Revenue" value={fmt(revenue.today ?? 0)} icon={TrendingUp} color="red" />
        <StatsCard title="Today's Orders" value={revenue.todayOrders ?? 0} icon={ShoppingBag} color="blue" />
        <StatsCard title="Categories" value={d.categories ?? 0} icon={Package} color="purple" />
        <StatsCard title="Low Stock Items" value={d.products?.lowStock ?? 0} icon={AlertCircle} color="orange" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Order status distribution */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-navy-900 mb-4 text-sm">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={orderStatusData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => [v, 'Orders']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {orderStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent orders table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-navy-900 text-sm">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-gold-600 hover:text-gold-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3 uppercase tracking-wide">Order</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3 uppercase tracking-wide">Customer</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3 uppercase tracking-wide">Total</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 text-sm py-8">No orders yet</td>
                  </tr>
                ) : (
                  recentOrders.map((order: { id: string; orderNumber: string; customerName: string; total: number; status: string }) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-xs font-mono font-medium text-navy-900">{order.orderNumber}</td>
                      <td className="px-5 py-3 text-sm text-gray-700">{order.customerName}</td>
                      <td className="px-5 py-3 text-sm font-medium text-navy-900">{fmt(order.total)}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Low stock alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-orange-50 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <h2 className="font-semibold text-navy-900 text-sm">Low Stock Products</h2>
            <Link to="/admin/products" className="ml-auto text-xs text-gold-600 hover:text-gold-700 font-medium">
              Manage →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3 uppercase tracking-wide">Product</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3 uppercase tracking-wide">Brand</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3 uppercase tracking-wide">Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((p: { id: string; name: string; brand: string; stockCount: number }) => (
                  <tr key={p.id} className="border-b border-gray-50">
                    <td className="px-5 py-3 text-sm font-medium text-navy-900">{p.name}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{p.brand}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                        p.stockCount === 0 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {p.stockCount === 0 ? 'Out of stock' : `${p.stockCount} left`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
