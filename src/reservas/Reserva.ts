import type { Cliente } from "../clientes/Cliente.js";
import type { Quarto } from "../quartos/Quarto.js";
import type { PoliticaPreco, PoliticaCancelamento } from "../tarifas/Politicas.js";

// produto do Builder, o que é opcional começa false / vazio
export class Reserva {
  cliente: Cliente;
  quarto: Quarto;
  dataEntrada: Date;
  dataSaida: Date;
  politicaPreco: PoliticaPreco;
  politicaCancelamento: PoliticaCancelamento;
  cafeDaManha: boolean = false;
  estacionamento: boolean = false;
  observacoes: string = "";

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

  quantidadeDias(): number {
    const diferenca = this.dataSaida.getTime() - this.dataEntrada.getTime();
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    if (dias < 1) {
      return 1;
    }
    return dias;
  }

  valorTotal(): number {
    const dias = this.quantidadeDias();
    let total = this.politicaPreco.calcular(
      this.quarto.getPreco(),
      dias,
      this.cliente.getTipo(),
    );

    if (this.cafeDaManha) {
      total += dias * 30;
    }
    if (this.estacionamento) {
      total += dias * 25;
    }
    return total;
  }

  valorReembolso(hoje: Date): number {
    const diferenca = this.dataEntrada.getTime() - hoje.getTime();
    const diasAteEntrada = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    return this.politicaCancelamento.calcularReembolso(
      this.valorTotal(),
      diasAteEntrada,
    );
  }
}
