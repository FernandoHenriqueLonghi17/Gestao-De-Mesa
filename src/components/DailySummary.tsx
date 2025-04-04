import React from 'react';
import { DailySummary as DailySummaryType } from '../types';
import { DollarSign, CreditCard, Smartphone, Receipt, TrendingUp, Clock, Award, AlertCircle } from 'lucide-react';

interface DailySummaryProps {
  summaries: DailySummaryType[];
}

export function DailySummary({ summaries }: DailySummaryProps) {
  if (summaries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <Receipt className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma venda hoje
        </h3>
        <p className="text-gray-600">
          O resumo das vendas aparecerá aqui quando houver comandas fechadas
        </p>
      </div>
    );
  }

  const summary = summaries[0]; // Sempre mostra o resumo do dia atual

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Resumo do Dia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Total de Vendas</h3>
            <p className="text-2xl font-bold text-blue-800">
              R$ {summary.totalAmount.toFixed(2)}
            </p>
            <div className="mt-2 text-sm text-blue-600">
              {summary.orderCount} pedidos
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-700" />
              <h3 className="text-lg font-semibold text-green-700">Dinheiro</h3>
            </div>
            <p className="text-2xl font-bold text-green-800">
              R$ {summary.paymentMethods.dinheiro.toFixed(2)}
            </p>
            <div className="mt-2 text-sm text-green-600">
              {((summary.paymentMethods.dinheiro / summary.totalAmount) * 100).toFixed(1)}% do total
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-purple-700" />
              <h3 className="text-lg font-semibold text-purple-700">Cartão</h3>
            </div>
            <p className="text-2xl font-bold text-purple-800">
              R$ {summary.paymentMethods.cartão.toFixed(2)}
            </p>
            <div className="mt-2 text-sm text-purple-600">
              {((summary.paymentMethods.cartão / summary.totalAmount) * 100).toFixed(1)}% do total
            </div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-indigo-700" />
              <h3 className="text-lg font-semibold text-indigo-700">PIX</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-800">
              R$ {summary.paymentMethods.pix.toFixed(2)}
            </p>
            <div className="mt-2 text-sm text-indigo-600">
              {((summary.paymentMethods.pix / summary.totalAmount) * 100).toFixed(1)}% do total
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-700">Ticket Médio</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              R$ {summary.averageTicket.toFixed(2)}
            </p>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-700">Horário de Pico</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {summary.peakHours[0]?.hour}:00
            </p>
            <div className="mt-2 text-sm text-gray-600">
              {summary.peakHours[0]?.orders} pedidos
            </div>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-700">Mais Vendido</h3>
            </div>
            {summary.topSellingItems[0] && (
              <>
                <p className="text-xl font-bold text-gray-800">
                  Item #{summary.topSellingItems[0].itemId}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  {summary.topSellingItems[0].quantity} unidades
                </div>
              </>
            )}
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-700">Cancelamentos</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {summary.canceledOrders}
            </p>
            <div className="mt-2 text-sm text-gray-600">
              pedidos cancelados
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Pedidos Fechados ({summary.orderCount})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {summary.orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Pedido #{order.id} - Mesa {order.tableId}</h4>
                      <p className="text-sm text-gray-600">
                        Fechado em: {new Date(order.closedAt!).toLocaleString('pt-BR')}
                      </p>
                      {order.waiter && (
                        <p className="text-sm text-gray-600">
                          Atendente: {order.waiter}
                        </p>
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {order.paymentMethod}
                    </span>
                  </div>
                  {(order.discount || order.serviceCharge) && (
                    <div className="text-sm text-gray-600 mb-2">
                      {order.discount && (
                        <div>Desconto: R$ {order.discount.toFixed(2)}</div>
                      )}
                      {order.serviceCharge && (
                        <div>Taxa de Serviço: R$ {order.serviceCharge.toFixed(2)}</div>
                      )}
                    </div>
                  )}
                  <div className="text-right">
                    <span className="font-bold">
                      R$ {order.total?.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Itens Mais Vendidos</h3>
            <div className="space-y-4">
              {summary.topSellingItems.map((item) => (
                <div key={item.itemId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Item #{item.itemId}</h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity} unidades vendidas
                      </p>
                    </div>
                    <span className="font-bold">
                      R$ {item.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}