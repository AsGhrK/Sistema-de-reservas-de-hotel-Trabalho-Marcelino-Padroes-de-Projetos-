# Sistema de reservas de hotel (Trabalho-Marcelino-Padrões de Projetos)
O trabalho consiste na construção de um sistema pequeno, porém funcional, utilizando os cinco padrões criacionais estudados durante o curso.

Aluno: Davi Casari
Disciplina: Padrões de Projeto (prof. Marcelino Garcia)

## Como rodar
Precisa do Node instalado.

```
npm i
npm start
```

Para só conferir se compila:

```
npx tsc --noEmit
```

## Estrutura
```
src/
├── clientes/   Cliente
├── quartos/    Quarto, quartos concretos e os creators (Factory Method, Prototype)
├── tarifas/    Planos tarifários (Abstract Factory)
├── reservas/   Reserva e ReservaBuilder (Builder)
├── hotel/      HotelUnico (Singleton)
└── index.ts    Demonstração de tudo funcionando
docs/
├── TEMA.md     O domínio e o planejamento
└── PADROES.md  Onde cada padrão foi usado e por quê
```

## Padrões usados
| Padrão | Onde |
|---|---|
| Factory Method | `src/quartos/CriadorQuarto.ts` |
| Abstract Factory | `src/tarifas/FabricaPlano.ts` |
| Builder | `src/reservas/ReservaBuilder.ts` |
| Prototype | `clonar()` em `src/quartos/QuartosConcretos.ts` |
| Singleton | `src/hotel/HotelUnico.ts` |

A explicação de cada um está em [docs/PADROES.md](docs/PADROES.md) e o domínio em [docs/TEMA.md](docs/TEMA.md).
