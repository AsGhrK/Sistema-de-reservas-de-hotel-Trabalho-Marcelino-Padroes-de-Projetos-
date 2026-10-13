// produtos da Abstract Factory
export interface PoliticaPreco {
  calcular(precoDiaria: number, dias: number, tipoCliente: string): number;
}

export interface PoliticaCancelamento {
  calcularReembolso(valorPago: number, diasAteEntrada: number): number;
}
