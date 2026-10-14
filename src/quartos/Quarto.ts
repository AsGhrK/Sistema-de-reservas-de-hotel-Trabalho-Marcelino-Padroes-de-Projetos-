// produto do Factory Method e também o protótipo (tem clonar)
export interface Quarto {
  getNumero(): number;
  setNumero(numero: number): void;
  getTipo(): string;
  getPreco(): number;
  getComodidades(): string[];
  adicionarComodidade(comodidade: string): void;
  clonar(): Quarto;
}
