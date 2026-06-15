import { useState } from 'react';
import { Search, Eye, ShoppingBag } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminOrders, useUpdateOrderStatus } from '../../hooks/admin/useAdminOrders';

const STATUSES = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const NEXT_STATUS: Record<string, string> = {
  pending: 'confirmed',
  confirmed: 'processing',
  processing: 'shipped',
  shipped: 'delivered',
};

function fmt(n: number) {
  return `₦${Number(n).toLocaleString('en-NG')}`;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useAdminOrders({
    page,
    limit: 15,
    ...(search ? { search } : {}),
    ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
  });
  const updateStatus = useUpdateOrderStatus();

  const orders: Order[] = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <AdminLayout
      title="Orders"
      subtitle={`${data?.total ?? 0} orders total`}
    >
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search order # or customer..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {STATUSES.map(s => (
              <button
                type="button"
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  statusFilter === s
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
            <p className="text-gray-400 text-sm">No orders found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Order #</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Customer</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Total</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Payment</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <>
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono font-semibold text-navy-900">{order.orderNumber}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-navy-900">{order.customerName}</p>
                          <p className="text-xs text-gray-400">{order.customerEmail}</p>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-navy-900">{fmt(order.total)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 capitalize">{order.paymentMethod.replace(/_/g, ' ')}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status] ?? ''}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {NEXT_STATUS[order.status] && (
                              <button
                                type="button"
                                onClick={() => updateStatus.mutate({ id: order.id, status: NEXT_STATUS[order.status] })}
                                disabled={updateStatus.isPending}
                                className="px-2.5 py-1 text-xs bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors capitalize"
                                title={`Mark as ${NEXT_STATUS[order.status]}`}
                              >
                                → {NEXT_STATUS[order.status]}
                              </button>
                            )}
                            {order.status !== 'cancelled' && order.status !== 'delivered' && (
                              <button
                                type="button"
                                onClick={() => updateStatus.mutate({ id: order.id, status: 'cancelled' })}
                                disabled={updateStatus.isPending}
                                className="px-2.5 py-1 text-xs bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {expandedId === order.id && (
                        <tr key={`${order.id}-detail`}>
                          <td colSpan={7} className="bg-gray-50 px-4 py-4 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-semibold text-navy-900 mb-2">Customer Info</p>
                                <p className="text-gray-600">{order.customerName}</p>
                                <p className="text-gray-500">{order.customerEmail}</p>
                                <p className="text-gray-500">{order.customerPhone}</p>
                                <p className="text-gray-500 mt-1">{order.address}, {order.city}, {order.state}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-navy-900 mb-2">Items Ordered</p>
                                {(Array.isArray(order.items) ? order.items : []).map((item, i) => (
                                  <div key={i} className="flex items-center gap-2 mb-1">
                                    <span className="text-gray-600">{item.quantity}×</span>
                                    <span className="text-gray-700">{item.name}</span>
                                    <span className="text-gray-500 ml-auto">{fmt(item.price * item.quantity)}</span>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <p className="font-semibold text-navy-900 mb-2">Order Summary</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{fmt(order.subtotal)}</span>
                                  </div>
                                  <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span>{order.deliveryFee === 0 ? 'Free' : fmt(order.deliveryFee)}</span>
                                  </div>
                                  <div className="flex justify-between font-semibold text-navy-900 pt-1 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>{fmt(order.total)}</span>
                                  </div>
                                </div>
                                {order.notes && (
                                  <p className="text-gray-500 text-xs mt-3 bg-white rounded-lg p-2 border border-gray-200">
                                    Note: {order.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors">Previous</button>
                  <button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
