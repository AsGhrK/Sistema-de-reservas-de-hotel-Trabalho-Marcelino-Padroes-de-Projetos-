import { Cliente } from "./clientes/Cliente.js";
import { HotelUnico } from "./hotel/HotelUnico.js";
import {
  CriadorQuartoSimples,
  CriadorQuartoDuplo,
  CriadorQuartoLuxo,
} from "./quartos/CriadorQuarto.js";
import { ReservaBuilder } from "./reservas/ReservaBuilder.js";
import { FabricaPlanoFlexivel, FabricaPlanoPromocional } from "./tarifas/FabricaPlano.js";

// Singleton
// as duas chamadas devolvem o mesmo hotel
const hotel = HotelUnico.obterInstancia("Hotel Mar do Sol", "Avenida Atlântica, 500");
console.log(hotel === HotelUnico.obterInstancia()); // true

// Factory Method
// cada creator cria um tipo de quarto
hotel.cadastrarQuarto(new CriadorQuartoSimples(), 101);
hotel.cadastrarQuarto(new CriadorQuartoDuplo(), 102);
hotel.cadastrarQuarto(new CriadorQuartoLuxo(), 201);

// Prototype
// clona o quarto 201 como 202 e só a cópia ganha a banheira
const quarto1 = hotel.buscarQuarto(201);
quarto1.adicionarComodidade("ar-condicionado");
quarto1.adicionarComodidade("frigobar");

const quarto2 = hotel.cadastrarCopia(201, 202);
quarto2.adicionarComodidade("banheira");

console.log(`Modelo ${quarto1.getNumero()}: ${quarto1.getComodidades().join(", ")}`);
console.log(`Cópia ${quarto2.getNumero()}: ${quarto2.getComodidades().join(", ")}`);

// clientes de teste
const cliente1 = new Cliente("Ana Souza", "ana@email.com", "99999-1111", "vip");
const cliente2 = new Cliente("Pedro Lima", "pedro@email.com", "98888-2222", "normal");

// Builder + Abstract Factory
// reserva 1 com plano flexível café e observação
const reserva1 = new ReservaBuilder()
  .cliente(cliente1)
  .quarto(hotel.buscarQuarto(201))
  .periodo(new Date(2026, 8, 25), new Date(2026, 8, 29))
  .plano(new FabricaPlanoFlexivel())
  .cafeDaManha()
  .observacoes("Chegada após as 22h")
  .build();

// reserva 2 com plano promocional e estacionamento
const reserva2 = new ReservaBuilder()
  .cliente(cliente2)
  .quarto(hotel.buscarQuarto(102))
  .periodo(new Date(2026, 9, 10), new Date(2026, 9, 12))
  .plano(new FabricaPlanoPromocional())
  .estacionamento()
  .build();

// o hotel guarda as reservas e mostra o resumo
hotel.adicionarReserva(reserva1);
hotel.adicionarReserva(reserva2);
hotel.mostrarResumo();

// data de hoje fixa só pra testar o reembolso
// o mês começa em 0 então 8 é setembro
const hoje = new Date(2026, 8, 20);
console.log(`\nReembolso reserva 1: R$ ${reserva1.valorReembolso(hoje).toFixed(2)}`);
console.log(`Reembolso reserva 2: R$ ${reserva2.valorReembolso(hoje).toFixed(2)}`);

// os três testes abaixo têm que mostrar erro
console.log("\n--- Testes de validação ---");
try {
  new ReservaBuilder().cliente(cliente1).build();
} catch (e) {
  if (e instanceof Error) console.error(`Erro: ${e.message}`);
}

try {
  new Cliente("", "x@email.com", "0000", "vip");
} catch (e) {
  if (e instanceof Error) console.error(`Erro: ${e.message}`);
}

try {
  hotel.buscarQuarto(999);
} catch (e) {
  if (e instanceof Error) console.error(`Erro: ${e.message}`);
}
