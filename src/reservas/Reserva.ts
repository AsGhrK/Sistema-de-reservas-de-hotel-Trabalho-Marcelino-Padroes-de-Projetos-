import type { Cliente } from "../clientes/Cliente.js";
import type { Quarto } from "../quartos/Quarto.js";
import type { PoliticaPreco, PoliticaCancelamento } from "../tarifas/Politicas.js";

// produto do Builder
// o que é opcional começa false ou vazio
export class Reserva {
  // partes obrigatórias da reserva
  cliente: Cliente;
  quarto: Quarto;
  dataEntrada: Date;
  dataSaida: Date;
  politicaPreco: PoliticaPreco;
  politicaCancelamento: PoliticaCancelamento;
  // partes opcionais começam desligadas
  cafeDaManha: boolean = false;
  estacionamento: boolean = false;
  observacoes: string = "";

  // construtor da reserva só recebe o que é obrigatório
  // o resto o builder preenche
  constructor(
    cliente: Cliente,
    quarto: Quarto,
    dataEntrada: Date,
    dataSaida: Date,
    politicaPreco: PoliticaPreco,
    politicaCancelamento: PoliticaCancelamento,
  ) {
    this.cliente = cliente;
    this.quarto = quarto;
    this.dataEntrada = dataEntrada;
    this.dataSaida = dataSaida;
    this.politicaPreco = politicaPreco;
    this.politicaCancelamento = politicaCancelamento;
  }

  // diferença entre saída e entrada em dias
  // no mínimo 1 diária
  public quantidadeDias(): number {
    const diferenca = this.dataSaida.getTime() - this.dataEntrada.getTime();
    // 1000 * 60 * 60 * 24 é a quantidade de milissegundos de um dia
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    if (dias < 1) {
      return 1;
    }
    return dias;
  }

  // o preço vem do plano
  // depois soma o café 30 por dia e o estacionamento 25 por dia
  public valorTotal(): number {
    const dias = this.quantidadeDias();
    let total = this.politicaPreco.calcular(
      this.quarto.getPreco(),
      dias,
      this.cliente.getTipo(),
    );

    // soma o café de todos os dias
    if (this.cafeDaManha) {
      total += dias * 30;
    }
    // soma o estacionamento de todos os dias
    if (this.estacionamento) {
      total += dias * 25;
    }
    return total;
  }

  // quem decide quanto devolve é a política de cancelamento do plano
  public valorReembolso(hoje: Date): number {
    const diferenca = this.dataEntrada.getTime() - hoje.getTime();
    // quantos dias faltam pra entrada
    const diasAteEntrada = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    return this.politicaCancelamento.calcularReembolso(
      this.valorTotal(),
      diasAteEntrada,
    );
  }
}
