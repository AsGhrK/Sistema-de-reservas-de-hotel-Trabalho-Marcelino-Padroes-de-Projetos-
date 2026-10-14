import type { Quarto } from "./Quarto.js";

export class QuartoSimples implements Quarto {
  private numero: number;
  private tipo: string;
  private preco: number;
  private comodidades: string[] = [];

  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "simples";
    this.preco = 150;
  }

  getNumero(): number {
    return this.numero;
  }

  setNumero(numero: number): void {
    this.numero = numero;
  }

  getTipo(): string {
    return this.tipo;
  }

  getPreco(): number {
    return this.preco;
  }

  getComodidades(): string[] {
    return this.comodidades;
  }

  adicionarComodidade(comodidade: string): void {
    this.comodidades.push(comodidade);
  }

  // Prototype: a lista vira uma cópia nova, senão os dois quartos dividiam a mesma
  clonar(): Quarto {
    const copia = new QuartoSimples(this.numero);
    copia.comodidades = [...this.comodidades];
    return copia;
  }
}

export class QuartoDuplo implements Quarto {
  private numero: number;
  private tipo: string;
  private preco: number;
  private comodidades: string[] = [];

  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "duplo";
    this.preco = 250;
  }

  getNumero(): number {
    return this.numero;
  }

  setNumero(numero: number): void {
    this.numero = numero;
  }

  getTipo(): string {
    return this.tipo;
  }

  getPreco(): number {
    return this.preco;
  }

  getComodidades(): string[] {
    return this.comodidades;
  }

  adicionarComodidade(comodidade: string): void {
    this.comodidades.push(comodidade);
  }

  clonar(): Quarto {
    const copia = new QuartoDuplo(this.numero);
    copia.comodidades = [...this.comodidades];
    return copia;
  }
}

export class QuartoLuxo implements Quarto {
  private numero: number;
  private tipo: string;
  private preco: number;
  private comodidades: string[] = [];

  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "luxo";
    this.preco = 350;
  }

  getNumero(): number {
    return this.numero;
  }

  setNumero(numero: number): void {
    this.numero = numero;
  }

  getTipo(): string {
    return this.tipo;
  }

  getPreco(): number {
    return this.preco;
  }

  getComodidades(): string[] {
    return this.comodidades;
  }

  adicionarComodidade(comodidade: string): void {
    this.comodidades.push(comodidade);
  }

  clonar(): Quarto {
    const copia = new QuartoLuxo(this.numero);
    copia.comodidades = [...this.comodidades];
    return copia;
  }
}
