import type { Quarto } from "../quartos/Quarto.js";
import type { CriadorQuarto } from "../quartos/CriadorQuarto.js";
import type { Reserva } from "../reservas/Reserva.js";

// Singleton
// só existe um hotel e ele guarda os quartos e as reservas
export class HotelUnico {
  private static instancia: HotelUnico; // guarda o único hotel
  // dados do hotel e as listas de quartos e reservas
  private nome: string;
  private endereco: string;
  private quartos: Quarto[] = [];
  private reservas: Reserva[] = [];

  // construtor privado
  // ninguém consegue dar new HotelUnico de fora
  private constructor(nome: string, endereco: string) {
    this.nome = nome;
    this.endereco = endereco;
  }

  // cria o hotel só na primeira vez
  // depois devolve sempre o mesmo
  // o nome e o endereço só valem na primeira chamada
  // depois são ignorados
  public static obterInstancia(
    nome = "Hotel Padrões",
    endereco = "Rua das Flores, 123",
  ): HotelUnico {
    if (!HotelUnico.instancia) {
      HotelUnico.instancia = new HotelUnico(nome, endereco);
    }
    return HotelUnico.instancia;
  }

  // getters
  public getNome(): string {
    return this.nome;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  // usa só o creator abstrato
  // não sabe qual quarto vai ser criado
  public cadastrarQuarto(criador: CriadorQuarto, numero: number): Quarto {
    const quarto = criador.criarQuarto(numero);
    this.quartos.push(quarto);
    return quarto;
  }

  // Prototype
  // clona um quarto que já existe em vez de criar do zero
  public cadastrarCopia(numeroModelo: number, novoNumero: number): Quarto {
    const copia = this.buscarQuarto(numeroModelo).clonar();
    // a cópia precisa de um número diferente do modelo
    copia.setNumero(novoNumero);
    this.quartos.push(copia);
    return copia;
  }

  // procura o quarto pelo número
  // dá erro se não achar
  public buscarQuarto(numero: number): Quarto {
    // find devolve o primeiro quarto com esse número
    const quarto = this.quartos.find((q) => q.getNumero() === numero);
    if (!quarto) {
      throw new Error(`Quarto ${numero} não cadastrado.`);
    }
    return quarto;
  }

  // guarda a reserva que o builder montou
  public adicionarReserva(reserva: Reserva): void {
    this.reservas.push(reserva);
  }

  // mostra os dados do hotel e cada reserva com o total
  public mostrarResumo(): void {
    console.log(`\nHotel: ${this.nome}`);
    console.log(`Endereço: ${this.endereco}`);
    console.log(`Quartos cadastrados: ${this.quartos.length}`);
    console.log(`Total de reservas: ${this.reservas.length}`);

    // numero só serve pra mostrar Reserva 1 e Reserva 2
    let numero = 1;
    for (const reserva of this.reservas) {
      console.log(`\nReserva ${numero}`);
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
      numero++;
    }
  }
}
