import React, { useState } from 'react';
import { Table, MenuItem, Order } from '../types';
import { X, Users2, Coffee, Clock, Trash2, Plus, Minus, DollarSign, CreditCard, Smartphone } from 'lucide-react';

interface TableDetailsProps {
  table: Table;
  onClose: () => void;
  onStatusChange: (status: Table['status']) => void;
  menuItems: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
  currentOrder: Order | undefined;
  onUpdateQuantity: (menuItemId: number, change: number) => void;
  onRemoveItem: (menuItemId: number) => void;
  onCloseOrder: (paymentMethod: Order['paymentMethod']) => void;
}

export function TableDetails({
  table,
  onClose,
  onStatusChange,
  menuItems,
  onItemSelect,
  currentOrder,
  onUpdateQuantity,
  onRemoveItem,
  onCloseOrder
}: TableDetailsProps) {
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const categories = ['entrada', 'principal', 'sobremesa', 'bebida'] as const;
  
  const categoryTitles = {
    entrada: 'Entradas',
    principal: 'Pratos Principais',
    sobremesa: 'Sobremesas',
    bebida: 'Bebidas'
  };

  const handleCloseOrder = (paymentMethod: Order['paymentMethod']) => {
    onCloseOrder(paymentMethod);
    setShowPaymentMethods(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden m-4 flex">
        {/* Menu Section */}
        <div className="flex-1 overflow-y-auto border-r border-gray-200">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Mesa {table.number}</h2>
              <p className="text-gray-600">{table.seats} lugares</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => onStatusChange('disponível')}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    table.status === 'disponível'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users2 className="w-4 h-4" />
                  Livre
                </button>
                <button
                  onClick={() => onStatusChange('ocupada')}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    table.status === 'ocupada'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Coffee className="w-4 h-4" />
                  Ocupada
                </button>
                <button
                  onClick={() => onStatusChange('reservada')}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    table.status === 'reservada'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Reservada
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-4">{categoryTitles[category]}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onItemSelect(item)}
                          className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                        >
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <span className="font-bold">R$ {item.price.toFixed(2)}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Section */}
        <div className="w-96 flex flex-col bg-gray-50">
          <div className="p-4 bg-white border-b border-gray-200">
            <h3 className="text-xl font-bold">Comanda</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {currentOrder?.items.length ? (
              <div className="space-y-4">
                {currentOrder.items.map((orderItem) => {
                  const menuItem = menuItems.find(m => m.id === orderItem.menuItemId);
                  if (!menuItem) return null;
                  
                  return (
                    <div key={orderItem.menuItemId} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{menuItem.name}</h4>
                        <button
                          onClick={() => onRemoveItem(orderItem.menuItemId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(orderItem.menuItemId, -1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            disabled={orderItem.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{orderItem.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(orderItem.menuItemId, 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-medium">
                          R$ {(orderItem.price * orderItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhum item adicionado
              </div>
            )}
          </div>
          {currentOrder && currentOrder.items.length > 0 && (
            <div className="p-4 bg-white border-t border-gray-200 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>R$ {currentOrder.total?.toFixed(2)}</span>
              </div>
              {!showPaymentMethods ? (
                <button
                  onClick={() => setShowPaymentMethods(true)}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Fechar Comanda
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleCloseOrder('dinheiro')}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    Dinheiro
                  </button>
                  <button
                    onClick={() => handleCloseOrder('cartão')}
                    className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Cartão
                  </button>
                  <button
                    onClick={() => handleCloseOrder('pix')}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    PIX
                  </button>
                  <button
                    onClick={() => setShowPaymentMethods(false)}
                    className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}