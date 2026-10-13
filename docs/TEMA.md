# Tema: Sistema de reservas de hotel

## Domínio
Um hotel recebe clientes (normais ou VIP) que reservam quartos (simples, duplo ou luxo) por um período de datas. Cada reserva pode ter itens opcionais (café da manhã, estacionamento, observações) e segue um plano tarifário, que define o preço e a regra de cancelamento.

## Planejamento: onde cada padrão será usado

| Padrão | Onde | Problema que resolve |
|---|---|---|
| Singleton | `HotelUnico` | O hotel é um só e guarda quartos e reservas; todo o sistema precisa enxergar o mesmo estado. |
| Factory Method | `CriadorQuarto` e subclasses | Cada tipo de quarto é criado por um creator próprio; o hotel cadastra quartos sem conhecer as classes concretas. |
| Abstract Factory | `FabricaPlano` (flexível e promocional) | Preço e cancelamento precisam ser do mesmo plano; a fábrica garante que não se misturem. |
| Builder | `ReservaBuilder` | A reserva tem partes obrigatórias e várias opcionais; evita um construtor com `undefined` demais. |
| Prototype | `Quarto` (a implementar na Aula 4) | Clonar um quarto modelo e ajustar só o que muda (número, comodidades). |

## Cronograma
- Aula 1: planejamento (este arquivo).
- Aula 2: Factory Method e Singleton.
- Aula 3: Abstract Factory e Builder.
- Aula 4: Prototype, revisão e `docs/PADROES.md`.
