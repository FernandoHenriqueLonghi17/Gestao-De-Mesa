import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, X } from 'lucide-react';

interface MenuProps {
  items: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
  onAddItem: (item: Omit<MenuItem, 'id'>) => void;
}

export function Menu({ items, onItemSelect, onAddItem }: MenuProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'entrada' as MenuItem['category']
  });

  const categories = ['entrada', 'principal', 'sobremesa', 'bebida'] as const;
  
  const categoryTitles = {
    entrada: 'Entradas',
    principal: 'Pratos Principais',
    sobremesa: 'Sobremesas',
    bebida: 'Bebidas'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(newItem);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: 'entrada'
    });
    setShowAddModal(false);
  };

  return (
    <div className="p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Cardápio</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Item
        </button>
      </div>

      {categories.map((category) => (
        <div key={category} className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {categoryTitles[category]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items
              .filter((item) => item.category === category)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => onItemSelect(item)}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-bold text-gray-800">
                        R$ {item.price.toFixed(2)}
                      </span>
                      <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Adicionar Item ao Cardápio</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as MenuItem['category'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="entrada">Entrada</option>
                  <option value="principal">Prato Principal</option>
                  <option value="sobremesa">Sobremesa</option>
                  <option value="bebida">Bebida</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}