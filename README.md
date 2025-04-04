# Gestão de Mesa - Sistema de Gerenciamento de Restaurante

Sistema completo para gerenciamento de restaurantes, desenvolvido com React, TypeScript e Tailwind CSS, focado em proporcionar uma experiência eficiente para gestão de mesas, pedidos e controle financeiro.

![GestãoMesa Preview](https://github.com/user-attachments/assets/eb48cd62-b7dd-460e-a514-aa401967bbd1)

![GestãoMesa Preview](https://github.com/user-attachments/assets/f95736c5-1b3c-4768-bd04-aa4420f27a9d)

![GestãoMesa Preview](https://github.com/user-attachments/assets/93ceffb2-fa70-43cf-bf67-5e7aa1d87720)

![GestãoMesa Preview](https://github.com/user-attachments/assets/7c31eef5-2639-42a9-9a1e-778da63dcd20)

![GestãoMesa Preview](https://github.com/user-attachments/assets/1bd01193-13e0-4243-ab94-5ddbddacf68d)

## 🚀 Funcionalidades

### Gestão de Mesas
- Visualização em grid de todas as mesas do estabelecimento
- Status em tempo real (disponível, ocupada, reservada)
- Informações detalhadas por mesa (número de lugares, status)
- Sistema de reservas com dados do cliente

### Cardápio Digital
- Categorização de itens (entradas, pratos principais, sobremesas, bebidas)
- Informações detalhadas dos pratos (descrição, preço, tempo de preparo)
- Controle de disponibilidade
- Identificação de alergênicos
- Adição rápida de novos itens

### Gestão de Pedidos
- Abertura e fechamento de comandas
- Adição/remoção de itens
- Controle de quantidade
- Observações por item
- Status do pedido (pendente, preparando, pronto, entregue)
- Múltiplas formas de pagamento (dinheiro, cartão, PIX)

### Controle Financeiro
- Resumo diário de vendas
- Análise por método de pagamento
- Ticket médio
- Horários de pico
- Itens mais vendidos
- Controle de cancelamentos
- Relatório de descontos e taxas de serviço

### Recursos Adicionais
- Interface responsiva
- Design moderno e intuitivo
- Suporte a múltiplos atendentes
- Sistema de divisão de conta
- Controle de taxas de serviço

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (ícones)

## ⚙️ Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gestao-mesa.git
cd gestao-mesa
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

O sistema estará disponível em `http://localhost:5173`

## 📦 Estrutura do Projeto

```
src/
  ├── components/         # Componentes React
  │   ├── TableGrid      # Grid de mesas
  │   ├── Menu           # Cardápio digital
  │   ├── TableDetails   # Detalhes da mesa
  │   └── DailySummary   # Resumo financeiro
  ├── types/             # Definições de tipos TypeScript
  ├── data/             # Dados mockados para desenvolvimento
  └── App.tsx           # Componente principal
```


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Próximos Passos

- [ ] Implementação de autenticação de usuários
- [ ] Integração com impressoras térmicas
- [ ] Sistema de fidelidade
- [ ] App mobile para clientes
- [ ] Integração com sistemas de delivery
- [ ] Módulo de controle de estoque
- [ ] Sistema de comandas por QR Code

## 📧 Contato

Para sugestões, dúvidas ou contribuições, entre em contato através das issues do GitHub.
