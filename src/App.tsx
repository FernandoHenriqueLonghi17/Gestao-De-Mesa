import React, { useState, useEffect } from 'react';
import { TableGrid } from './components/TableGrid';
import { Menu } from './components/Menu';
import { TableDetails } from './components/TableDetails';
import { DailySummary } from './components/DailySummary.tsx';
import { initialTables, menuItems as initialMenuItems } from './data';
import { Table, Order, MenuItem, DailySummary as DailySummaryType } from './types';
import { LayoutGrid, UtensilsCrossed, ClipboardList, Receipt, BarChart } from 'lucide-react';

function App() {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeTab, setActiveTab] = useState<'tables' | 'menu' | 'orders' | 'summary'>('tables');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showTableDetails, setShowTableDetails] = useState(false);
  const [dailySummaries, setDailySummaries] = useState<DailySummaryType[]>([]);

  useEffect(() => {
    updateDailySummary();
  }, [orders]);

  const updateDailySummary = () => {
    const today = new Date().toISOString().split('T')[0];
    const closedOrders = orders.filter(
      order => order.status === 'fechado' && 
      new Date(order.closedAt!).toISOString().split('T')[0] === today
    );

    if (closedOrders.length === 0) return;

    const summary: DailySummaryType = {
      date: today,
      totalAmount: closedOrders.reduce((sum, order) => sum + (order.total || 0), 0),
      orderCount: closedOrders.length,
      paymentMethods: {
        dinheiro: closedOrders.filter(order => order.paymentMethod === 'dinheiro')
          .reduce((sum, order) => sum + (order.total || 0), 0),
        cartão: closedOrders.filter(order => order.paymentMethod === 'cartão')
          .reduce((sum, order) => sum + (order.total || 0), 0),
        pix: closedOrders.filter(order => order.paymentMethod === 'pix')
          .reduce((sum, order) => sum + (order.total || 0), 0),
      },
      orders: closedOrders,
    };

    setDailySummaries([summary]);
  };

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setShowTableDetails(true);
  };

  const handleTableStatusChange = (status: Table['status']) => {
    if (selectedTable) {
      const updatedTables = tables.map((t) =>
        t.id === selectedTable.id ? { ...t, status } : t
      );
      setTables(updatedTables);
      setSelectedTable({ ...selectedTable, status });
    }
  };

  const handleAddMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: menuItems.length + 1
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleItemSelect = (item: MenuItem) => {
    if (!selectedTable) {
      alert('Por favor, selecione uma mesa primeiro');
      return;
    }

    const existingOrder = orders.find((order) => order.tableId === selectedTable.id);

    if (existingOrder) {
      const existingItem = existingOrder.items.find((i) => i.menuItemId === item.id);
      
      if (existingItem) {
        const updatedOrders = orders.map((order) =>
          order.tableId === selectedTable.id
            ? {
                ...order,
                items: order.items.map((i) =>
                  i.menuItemId === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                ),
                total: (order.total || 0) + item.price,
              }
            : order
        );
        setOrders(updatedOrders);
      } else {
        const updatedOrders = orders.map((order) =>
          order.tableId === selectedTable.id
            ? {
                ...order,
                items: [...order.items, { menuItemId: item.id, quantity: 1, price: item.price }],
                total: (order.total || 0) + item.price,
              }
            : order
        );
        setOrders(updatedOrders);
      }
    } else {
      const newOrder: Order = {
        id: orders.length + 1,
        tableId: selectedTable.id,
        items: [{ menuItemId: item.id, quantity: 1, price: item.price }],
        status: 'pendente',
        timestamp: new Date(),
        total: item.price,
      };
      setOrders([...orders, newOrder]);
    }
  };

  const handleUpdateQuantity = (menuItemId: number, change: number) => {
    if (!selectedTable) return;

    const updatedOrders = orders.map((order) => {
      if (order.tableId !== selectedTable.id) return order;

      const item = order.items.find((i) => i.menuItemId === menuItemId);
      if (!item) return order;

      const newQuantity = item.quantity + change;
      if (newQuantity < 1) return order;

      const updatedItems = order.items.map((i) =>
        i.menuItemId === menuItemId
          ? { ...i, quantity: newQuantity }
          : i
      );

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...order,
        items: updatedItems,
        total: newTotal,
      };
    });

    setOrders(updatedOrders);
  };

  const handleRemoveItem = (menuItemId: number) => {
    if (!selectedTable) return;

    const updatedOrders = orders.map((order) => {
      if (order.tableId !== selectedTable.id) return order;

      const updatedItems = order.items.filter((i) => i.menuItemId !== menuItemId);
      
      if (updatedItems.length === 0) {
        return null;
      }

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...order,
        items: updatedItems,
        total: newTotal,
      };
    }).filter((order): order is Order => order !== null);

    setOrders(updatedOrders);
  };

  const handleCloseOrder = (paymentMethod: Order['paymentMethod']) => {
    if (!selectedTable) return;

    const updatedOrders = orders.map((order) =>
      order.tableId === selectedTable.id
        ? {
            ...order,
            status: 'fechado',
            closedAt: new Date(),
            paymentMethod,
          }
        : order
    );

    setOrders(updatedOrders);
    handleTableStatusChange('disponível');
    setShowTableDetails(false);
  };

  const getCurrentOrder = () => {
    if (!selectedTable) return undefined;
    return orders.find((order) => order.tableId === selectedTable.id && order.status !== 'fechado');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciador de Restaurante
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('tables')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'tables'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LayoutGrid className="w-5 h-5 mr-2" />
                Mesas
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'menu'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mr-2" />
                Cardápio
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'orders'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ClipboardList className="w-5 h-5 mr-2" />
                Pedidos
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'summary'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart className="w-5 h-5 mr-2" />
                Resumo Diário
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {selectedTable && !showTableDetails && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Mesa {selectedTable.number}
                </h2>
                <p className="text-gray-600">
                  {selectedTable.seats} lugares • Status: {selectedTable.status}
                </p>
              </div>
              {orders.find((order) => order.tableId === selectedTable.id) && (
                <div className="flex items-center text-green-600">
                  <Receipt className="w-5 h-5 mr-2" />
                  <span className="font-medium">Pedido ativo</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <TableGrid tables={tables} onTableClick={handleTableClick} />
        )}
        {activeTab === 'menu' && (
          <Menu 
            items={menuItems} 
            onItemSelect={handleItemSelect}
            onAddItem={handleAddMenuItem}
          />
        )}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Pedido #{order.id} - Mesa {order.tableId}
                      </h3>
                      <p className="text-gray-600">
                        {new Date(order.timestamp).toLocaleString('pt-BR')}
                      </p>
                      {order.closedAt && (
                        <p className="text-gray-600">
                          Fechado em: {new Date(order.closedAt).toLocaleString('pt-BR')}
                          {order.paymentMethod && ` • ${order.paymentMethod}`}
                        </p>
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium capitalize" 
                      style={{
                        backgroundColor: 
                          order.status === 'pendente' ? '#FEF3C7' :
                          order.status === 'preparando' ? '#DBEAFE' :
                          order.status === 'pronto' ? '#D1FAE5' :
                          order.status === 'entregue' ? '#E0E7FF' :
                          order.status === 'fechado' ? '#F3F4F6' :
                          '#F3F4F6',
                        color:
                          order.status === 'pendente' ? '#92400E' :
                          order.status === 'preparando' ? '#1E40AF' :
                          order.status === 'pronto' ? '#065F46' :
                          order.status === 'entregue' ? '#3730A3' :
                          order.status === 'fechado' ? '#1F2937' :
                          '#1F2937'
                      }}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => {
                      const menuItem = menuItems.find((m) => m.id === item.menuItemId);
                      return (
                        <div key={index} className="flex justify-between items-center text-gray-700">
                          <span>{menuItem?.name} x{item.quantity}</span>
                          <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      R$ {order.total?.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <ClipboardList className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pedido ainda
                </h3>
                <p className="text-gray-600">
                  Os pedidos aparecerão aqui quando forem feitos
                </p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'summary' && (
          <DailySummary summaries={dailySummaries} />
        )}

        {showTableDetails && selectedTable && (
          <TableDetails
            table={selectedTable}
            onClose={() => setShowTableDetails(false)}
            onStatusChange={handleTableStatusChange}
            menuItems={menuItems}
            onItemSelect={handleItemSelect}
            currentOrder={getCurrentOrder()}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCloseOrder={handleCloseOrder}
          />
        )}
      </main>
    </div>
  );
}

export default App;