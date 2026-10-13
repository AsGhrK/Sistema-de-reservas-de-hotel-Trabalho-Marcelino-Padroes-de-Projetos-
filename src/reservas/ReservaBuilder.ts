import type { Cliente } from "../clientes/Cliente.js";
import type { Quarto } from "../quartos/Quarto.js";
import type { FabricaPlano } from "../tarifas/FabricaPlano.js";
import { Reserva } from "./Reserva.js";

export class ReservaBuilder {
  private clienteReserva?: Cliente;
  private quartoReserva?: Quarto;
  private entradaReserva?: Date;
  private saidaReserva?: Date;
  private planoReserva?: FabricaPlano;
  private cafeReserva: boolean = false;
  private estacionamentoReserva: boolean = false;
  private observacoesReserva: string = "";

  cliente(c: Cliente) {
    this.clienteReserva = c;
    return this;
  }

  quarto(q: Quarto) {
    this.quartoReserva = q;
    return this;
  }

  periodo(entrada: Date, saida: Date) {
    this.entradaReserva = entrada;
    this.saidaReserva = saida;
    return this;
  }

  // o plano é a Abstract Factory
  plano(fabrica: FabricaPlano) {
    this.planoReserva = fabrica;
    return this;
  }

  cafeDaManha() {
    this.cafeReserva = true;
    return this;
  }

  estacionamento() {
    this.estacionamentoReserva = true;
    return this;
  }

  observacoes(texto: string) {
    this.observacoesReserva = texto;
    return this;
  }

  build(): Reserva {
    if (!this.clienteReserva) {
      throw new Error("Reserva sem cliente.");
    }
    if (!this.quartoReserva) {
      throw new Error("Reserva sem quarto.");
    }
    if (!this.entradaReserva || !this.saidaReserva) {
      throw new Error("Reserva sem período.");
    }
    if (this.saidaReserva <= this.entradaReserva) {
      throw new Error("A saída tem que ser depois da entrada.");
    }
    if (!this.planoReserva) {
      throw new Error("Reserva sem plano.");
    }

    const r = new Reserva(
      this.clienteReserva,
      this.quartoReserva,
      this.entradaReserva,
      this.saidaReserva,
      this.planoReserva.criarPoliticaPreco(),
      this.planoReserva.criarPoliticaCancelamento(),
    );

    // só entra o que foi configurado
    if (this.cafeReserva) r.cafeDaManha = true;
    if (this.estacionamentoReserva) r.estacionamento = true;
    if (this.observacoesReserva) r.observacoes = this.observacoesReserva;
    return r;
  }
}
