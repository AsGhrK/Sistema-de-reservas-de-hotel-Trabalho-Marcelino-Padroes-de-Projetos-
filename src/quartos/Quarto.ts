// produto do Factory Method e também o protótipo tem clonar
export interface Quarto {
  getNumero(): number;
  setNumero(numero: number): void; // a cópia precisa de um número novo
  getTipo(): string;
  getPreco(): number; // preço da diária
  getComodidades(): string[];
  adicionarComodidade(comodidade: string): void;
  clonar(): Quarto; // Prototype
}
