import type { Quarto } from "./Quarto.js";
import { QuartoSimples, QuartoDuplo, QuartoLuxo } from "./QuartosConcretos.js";

// creator do Factory Method
// as subclasses decidem qual quarto criar
export abstract class CriadorQuarto {
  // não tem corpo porque cada creator concreto escreve o seu
  abstract criarQuarto(numero: number): Quarto;
}

// cada creator só sabe criar um tipo de quarto
export class CriadorQuartoSimples extends CriadorQuarto {
  public criarQuarto(numero: number): Quarto {
    return new QuartoSimples(numero);
  }
}

export class CriadorQuartoDuplo extends CriadorQuarto {
  public criarQuarto(numero: number): Quarto {
    return new QuartoDuplo(numero);
  }
}

export class CriadorQuartoLuxo extends CriadorQuarto {
  public criarQuarto(numero: number): Quarto {
    return new QuartoLuxo(numero);
  }
}
