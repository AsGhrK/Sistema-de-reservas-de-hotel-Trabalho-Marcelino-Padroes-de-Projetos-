import type { Quarto } from "./Quarto.js";

export class QuartoSimples implements Quarto {
  private numero: number;
  private tipo: string;
  private preco: number;

  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "simples";
    this.preco = 150;
  }

  getNumero(): number {
    return this.numero;
  }

  getTipo(): string {
    return this.tipo;
  }

  getPreco(): number {
    return this.preco;
  }
}

export class QuartoDuplo implements Quarto {
  private numero: number;
  private tipo: string;
  private preco: number;

  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "duplo";
    this.preco = 250;
  }

  getNumero(): number {
    return this.numero;
  }

  getTipo(): string {
    return this.tipo;
  }

  getPreco(): number {
    return this.preco;
  }
}

export class QuartoLuxo implements Quarto {
  private numero: number;
  private tipo: string;
  private preco: number;

  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "luxo";
    this.preco = 350;
  }

  getNumero(): number {
    return this.numero;
  }

  getTipo(): string {
    return this.tipo;
  }

  getPreco(): number {
    return this.preco;
  }
}
