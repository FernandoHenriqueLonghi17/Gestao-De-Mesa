import React from 'react';
import { Table } from '../types';
import { Users2, Receipt, Timer } from 'lucide-react';

interface TableGridProps {
  tables: Table[];
  onTableClick: (table: Table) => void;
}

export function TableGrid({ tables, onTableClick }: TableGridProps) {
  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'disponível':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'ocupada':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'reservada':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getStatusIcon = (status: Table['status']) => {
    switch (status) {
      case 'disponível':
        return <Users2 className="w-5 h-5" />;
      case 'ocupada':
        return <Receipt className="w-5 h-5" />;
      case 'reservada':
        return <Timer className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => onTableClick(table)}
          className={`p-4 rounded-lg border-2 ${getStatusColor(
            table.status
          )} transition-all hover:scale-105 shadow-sm hover:shadow-md`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">Mesa {table.number}</span>
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4" />
              <span className="font-medium">{table.seats}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm capitalize">
            {getStatusIcon(table.status)}
            <span className="font-medium">{table.status}</span>
          </div>
        </button>
      ))}
    </div>
  );
}