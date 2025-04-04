export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: 'entrada' | 'principal' | 'sobremesa' | 'bebida';
  description: string;
  preparationTime?: number; // Tempo estimado de preparo em minutos
  available: boolean; // Indica se o item está disponível
  allergens?: string[]; // Lista de alergênicos
}

export interface Table {
  id: number;
  number: number;
  seats: number;
  status: 'disponível' | 'ocupada' | 'reservada' | 'manutenção';
  order?: Order;
  reservationInfo?: {
    customerName: string; // Nome do cliente
    phone: string; // Telefone para contato
    date: Date; // Data da reserva
    numberOfGuests: number; // Número de pessoas
  };
}

export interface Order {
  id: number;
  tableId: number;
  items: OrderItem[];
  status: 'pendente' | 'preparando' | 'pronto' | 'entregue' | 'pago' | 'fechado' | 'cancelado';
  timestamp: Date; // Data e hora do pedido
  total?: number; // Valor total do pedido
  closedAt?: Date; // Data e hora do fechamento
  paymentMethod?: 'dinheiro' | 'cartão' | 'pix'; // Método de pagamento
  customerNotes?: string; // Observações do cliente
  splitBill?: boolean; // Indica se a conta será dividida
  waiter?: string; // Nome do garçom responsável
  discount?: number; // Valor do desconto aplicado
  serviceCharge?: number; // Valor da taxa de serviço
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
  notes?: string; // Observações específicas do item
  price: number; // Preço unitário do item
  status?: 'pendente' | 'preparando' | 'pronto' | 'entregue' | 'cancelado';
  prepStartTime?: Date; // Hora de início do preparo
  prepEndTime?: Date; // Hora de finalização do preparo
}

export interface DailySummary {
  date: string; // Data do resumo
  totalAmount: number; // Valor total das vendas
  orderCount: number; // Quantidade de pedidos
  paymentMethods: {
    dinheiro: number; // Total em dinheiro
    cartão: number; // Total em cartão
    pix: number; // Total em PIX
  };
  orders: Order[]; // Lista de pedidos do dia
  averageTicket: number; // Ticket médio
  peakHours: { hour: number; orders: number }[]; // Horários de pico
  topSellingItems: { itemId: number; quantity: number; total: number }[]; // Itens mais vendidos
  canceledOrders: number; // Quantidade de pedidos cancelados
  totalDiscount: number; // Total de descontos aplicados
  totalServiceCharge: number; // Total de taxas de serviço
}