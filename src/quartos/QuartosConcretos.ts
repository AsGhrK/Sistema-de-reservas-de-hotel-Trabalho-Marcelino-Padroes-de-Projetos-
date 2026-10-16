import type { Quarto } from "./Quarto.js";

// produtos concretos do Factory Method
// os 3 tipos de quarto do hotel
export class QuartoSimples implements Quarto {
  // cada quarto guarda número tipo preço e a lista de comodidades
  private numero: number;
  private tipo: string;
  private preco: number;
  private comodidades: string[] = [];

  // construtor do quarto
  // o tipo e o preço já vêm definidos
  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "simples";
    this.preco = 150;
  }

  // getters e setter
  public getNumero(): number {
    return this.numero;
  }

  public setNumero(numero: number): void {
    this.numero = numero;
  }

  public getTipo(): string {
    return this.tipo;
  }

  public getPreco(): number {
    return this.preco;
  }

  public getComodidades(): string[] {
    return this.comodidades;
  }

  // guarda uma comodidade nova na lista do quarto
  public adicionarComodidade(comodidade: string): void {
    this.comodidades.push(comodidade);
  }

  // Prototype
  // a lista vira uma cópia nova senão os dois quartos dividiam a mesma
  public clonar(): Quarto {
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

  // construtor do quarto
  // o tipo e o preço já vêm definidos
  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "duplo";
    this.preco = 250;
  }

  // getters e setter
  public getNumero(): number {
    return this.numero;
  }

  public setNumero(numero: number): void {
    this.numero = numero;
  }

  public getTipo(): string {
    return this.tipo;
  }

  public getPreco(): number {
    return this.preco;
  }

  public getComodidades(): string[] {
    return this.comodidades;
  }

  // guarda uma comodidade nova na lista do quarto
  public adicionarComodidade(comodidade: string): void {
    this.comodidades.push(comodidade);
  }

  // Prototype
  // copia a lista de comodidades
  public clonar(): Quarto {
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

  // construtor do quarto
  // o tipo e o preço já vêm definidos
  constructor(numero: number) {
    this.numero = numero;
    this.tipo = "luxo";
    this.preco = 350;
  }

  // getters e setter
  public getNumero(): number {
    return this.numero;
  }

  public setNumero(numero: number): void {
    this.numero = numero;
  }

  public getTipo(): string {
    return this.tipo;
  }

  public getPreco(): number {
    return this.preco;
  }

  public getComodidades(): string[] {
    return this.comodidades;
  }

  // guarda uma comodidade nova na lista do quarto
  public adicionarComodidade(comodidade: string): void {
    this.comodidades.push(comodidade);
  }

  // Prototype
  // copia a lista de comodidades
  public clonar(): Quarto {
    const copia = new QuartoLuxo(this.numero);
    copia.comodidades = [...this.comodidades];
    return copia;
  }
}
