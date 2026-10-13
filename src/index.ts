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
const hotel = HotelUnico.obterInstancia("Hotel Mar do Sol", "Avenida Atlântica, 500");
console.log(hotel === HotelUnico.obterInstancia()); // true

// Factory Method
hotel.cadastrarQuarto(new CriadorQuartoSimples(), 101);
hotel.cadastrarQuarto(new CriadorQuartoDuplo(), 102);
hotel.cadastrarQuarto(new CriadorQuartoLuxo(), 201);

const ana = new Cliente("Ana Souza", "ana@email.com", "99999-1111", "vip");
const pedro = new Cliente("Pedro Lima", "pedro@email.com", "98888-2222", "normal");

// Builder + Abstract Factory
const reserva1 = new ReservaBuilder()
  .cliente(ana)
  .quarto(hotel.buscarQuarto(201))
  .periodo(new Date(2026, 8, 25), new Date(2026, 8, 29))
  .plano(new FabricaPlanoFlexivel())
  .cafeDaManha()
  .observacoes("Chegada após as 22h")
  .build();

const reserva2 = new ReservaBuilder()
  .cliente(pedro)
  .quarto(hotel.buscarQuarto(102))
  .periodo(new Date(2026, 9, 10), new Date(2026, 9, 12))
  .plano(new FabricaPlanoPromocional())
  .estacionamento()
  .build();

hotel.adicionarReserva(reserva1);
hotel.adicionarReserva(reserva2);
hotel.mostrarResumo();

const hoje = new Date(2026, 8, 20);
console.log(`\nReembolso reserva 1: R$ ${reserva1.valorReembolso(hoje).toFixed(2)}`);
console.log(`Reembolso reserva 2: R$ ${reserva2.valorReembolso(hoje).toFixed(2)}`);

// testes de validação
console.log("\n--- Testes de validação ---");
try {
  new ReservaBuilder().cliente(ana).build();
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
