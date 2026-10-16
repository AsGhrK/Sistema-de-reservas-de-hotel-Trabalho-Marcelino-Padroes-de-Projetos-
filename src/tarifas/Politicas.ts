// produtos da Abstract Factory
export interface PoliticaPreco {
  // devolve o valor das diárias já com o desconto do plano
  calcular(precoDiaria: number, dias: number, tipoCliente: string): number;
}

export interface PoliticaCancelamento {
  // devolve quanto do valor pago volta pro cliente
  calcularReembolso(valorPago: number, diasAteEntrada: number): number;
}
