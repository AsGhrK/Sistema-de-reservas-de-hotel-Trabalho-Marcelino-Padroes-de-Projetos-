import type { Quarto } from "../quartos/Quarto.js";
import type { CriadorQuarto } from "../quartos/CriadorQuarto.js";
import type { Reserva } from "../reservas/Reserva.js";

export class HotelUnico {
  private static instancia: HotelUnico;
  private nome: string;
  private endereco: string;
  private quartos: Quarto[] = [];
  private reservas: Reserva[] = [];

  private constructor(nome: string, endereco: string) {
    this.nome = nome;
    this.endereco = endereco;
  }

  static obterInstancia(
    nome: string = "Hotel Padrões",
    endereco: string = "Rua das Flores, 123",
  ): HotelUnico {
    if (!HotelUnico.instancia) {
      HotelUnico.instancia = new HotelUnico(nome, endereco);
    }
    return HotelUnico.instancia;
  }

  getNome(): string {
    return this.nome;
  }

  getEndereco(): string {
    return this.endereco;
  }

  // usa só o creator abstrato, não sabe qual quarto vai ser criado
  cadastrarQuarto(criador: CriadorQuarto, numero: number): Quarto {
    const quarto = criador.criarQuarto(numero);
    this.quartos.push(quarto);
    return quarto;
  }

  // Prototype: clona um quarto que já existe em vez de criar do zero
  cadastrarCopia(numeroModelo: number, novoNumero: number): Quarto {
    const copia = this.buscarQuarto(numeroModelo).clonar();
    copia.setNumero(novoNumero);
    this.quartos.push(copia);
    return copia;
  }

  buscarQuarto(numero: number): Quarto {
    const quarto = this.quartos.find((q) => q.getNumero() === numero);
    if (!quarto) {
      throw new Error(`Quarto ${numero} não cadastrado.`);
    }
    return quarto;
  }

  adicionarReserva(reserva: Reserva): void {
    this.reservas.push(reserva);
  }

  mostrarResumo(): void {
    console.log(`\nHotel: ${this.nome}`);
    console.log(`Endereço: ${this.endereco}`);
    console.log(`Quartos cadastrados: ${this.quartos.length}`);
    console.log(`Total de reservas: ${this.reservas.length}`);

    this.reservas.forEach((reserva, indice) => {
      console.log(`\nReserva ${indice + 1}`);
      console.log(`- Cliente: ${reserva.cliente.getNome()} (${reserva.cliente.getTipo()})`);
      console.log(`- Quarto: ${reserva.quarto.getTipo()} - Nº ${reserva.quarto.getNumero()}`);
      console.log(
        `- Período: ${reserva.dataEntrada.toLocaleDateString("pt-BR")} até ${reserva.dataSaida.toLocaleDateString("pt-BR")} (${reserva.quantidadeDias()} diárias)`,
      );
      console.log(`- Café da manhã: ${reserva.cafeDaManha ? "sim" : "não"}`);
      console.log(`- Estacionamento: ${reserva.estacionamento ? "sim" : "não"}`);
      if (reserva.observacoes) {
        console.log(`- Observações: ${reserva.observacoes}`);
      }
      console.log(`- Total: R$ ${reserva.valorTotal().toFixed(2)}`);
    });
  }
}
