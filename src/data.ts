import { MenuItem, Table } from './types';

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Salada Caesar',
    price: 32.90,
    category: 'entrada',
    description: 'Alface romana fresca, croutons, queijo parmesão e molho Caesar',
    preparationTime: 10,
    available: true,
    allergens: ['glúten', 'laticínios']
  },
  {
    id: 2,
    name: 'Bruschetta Caprese',
    price: 28.90,
    category: 'entrada',
    description: 'Pão italiano grelhado com tomate, muçarela de búfala e manjericão',
    preparationTime: 8,
    available: true,
    allergens: ['glúten', 'laticínios']
  },
  {
    id: 3,
    name: 'Salmão Grelhado',
    price: 89.90,
    category: 'principal',
    description: 'Salmão fresco com legumes da estação e molho de manteiga e limão',
    preparationTime: 25,
    available: true,
    allergens: ['peixe', 'laticínios']
  },
  {
    id: 4,
    name: 'Filé Mignon ao Molho Madeira',
    price: 92.90,
    category: 'principal',
    description: 'Filé mignon grelhado com molho madeira e purê de batatas',
    preparationTime: 30,
    available: true,
    allergens: ['laticínios']
  },
  {
    id: 5,
    name: 'Petit Gateau',
    price: 32.90,
    category: 'sobremesa',
    description: 'Bolo quente de chocolate com sorvete de baunilha',
    preparationTime: 15,
    available: true,
    allergens: ['glúten', 'laticínios', 'ovos']
  },
  {
    id: 6,
    name: 'Tiramisù',
    price: 28.90,
    category: 'sobremesa',
    description: 'Clássica sobremesa italiana com café, mascarpone e cacau',
    preparationTime: 0,
    available: true,
    allergens: ['glúten', 'laticínios', 'ovos']
  },
  {
    id: 7,
    name: 'Vinho da Casa',
    price: 32.90,
    category: 'bebida',
    description: 'Taça do nosso vinho selecionado',
    preparationTime: 2,
    available: true,
    allergens: ['sulfitos']
  },
  {
    id: 8,
    name: 'Água San Pellegrino',
    price: 18.90,
    category: 'bebida',
    description: 'Água mineral com gás importada (500ml)',
    preparationTime: 1,
    available: true,
    allergens: []
  }
];

export const waiters = [
  'João Silva',
  'Maria Santos',
  'Pedro Oliveira',
  'Ana Costa',
  'Carlos Souza'
];

export const initialTables: Table[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  number: index + 1,
  seats: index % 3 === 0 ? 6 : index % 2 === 0 ? 4 : 2,
  status: 'disponível'
}));