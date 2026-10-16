import type { Cliente } from "../clientes/Cliente.js";
import type { Quarto } from "../quartos/Quarto.js";
import type { FabricaPlano } from "../tarifas/FabricaPlano.js";
import { Reserva } from "./Reserva.js";

// Builder monta a reserva passo a passo e só entrega pronta no build
export class ReservaBuilder {
  // o estado vive aqui dentro
  // o ? é porque começa sem nada
  private clienteReserva?: Cliente;
  private quartoReserva?: Quarto;
  private entradaReserva?: Date;
  private saidaReserva?: Date;
  private planoReserva?: FabricaPlano;
  private cafeReserva: boolean = false;
  private estacionamentoReserva: boolean = false;
  private observacoesReserva: string = "";

  // cada método guarda uma parte e devolve this para dar pra encadear
  public cliente(c: Cliente) {
    this.clienteReserva = c;
    return this;
  }

  public quarto(q: Quarto) {
    this.quartoReserva = q;
    return this;
  }

  public periodo(entrada: Date, saida: Date) {
    this.entradaReserva = entrada;
    this.saidaReserva = saida;
    return this;
  }

  // o plano é a Abstract Factory
  public plano(fabrica: FabricaPlano) {
    this.planoReserva = fabrica;
    return this;
  }

  // partes opcionais só entram na reserva se forem chamadas
  public cafeDaManha() {
    this.cafeReserva = true;
    return this;
  }

  public estacionamento() {
    this.estacionamentoReserva = true;
    return this;
  }

  public observacoes(texto: string) {
    this.observacoesReserva = texto;
    return this;
  }

  // confere o que é obrigatório e só aqui a reserva é criada
  public build(): Reserva {
    if (!this.clienteReserva) {
      throw new Error("Reserva sem cliente.");
    }
    if (!this.quartoReserva) {
      throw new Error("Reserva sem quarto.");
    }
    if (!this.entradaReserva || !this.saidaReserva) {
      throw new Error("Reserva sem período.");
    }
    // a saída precisa ser depois da entrada
    if (this.saidaReserva <= this.entradaReserva) {
      throw new Error("A saída tem que ser depois da entrada.");
    }
    if (!this.planoReserva) {
      throw new Error("Reserva sem plano.");
    }

    // o plano entrega o preço e o cancelamento da mesma família
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
