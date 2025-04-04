# GestãoMesa - Sistema de Gerenciamento de Restaurante

Sistema completo para gerenciamento de restaurantes, desenvolvido com React, TypeScript e Tailwind CSS, focado em proporcionar uma experiência eficiente para gestão de mesas, pedidos e controle financeiro.

![GestãoMesa Preview](https://github.com/user-attachments/assets/a0e023e9-b52a-4b19-8eef-9f9e05af4949)

![GestãoMesa Preview](https://github.com/user-attachments/assets/f1fc1cc2-d987-4ae1-b714-25e7323dc3de)

![GestãoMesa Preview](https://github.com/user-attachments/assets/693a0a1a-f17a-4750-b2d6-e5b57852f1b6)

![GestãoMesa Preview](https://github.com/user-attachments/assets/cc09e3c4-5860-41bd-b5e5-43bd5b5b4494)

![GestãoMesa Preview](https://github.com/user-attachments/assets/8565aa52-0e7b-49ed-a079-f8e8cb629d89)
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
