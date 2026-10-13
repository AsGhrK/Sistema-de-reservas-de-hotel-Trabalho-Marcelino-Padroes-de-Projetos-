import type { Quarto } from "./Quarto.js";
import { QuartoSimples, QuartoDuplo, QuartoLuxo } from "./QuartosConcretos.js";

// creator do Factory Method, as subclasses decidem qual quarto criar
export abstract class CriadorQuarto {
  abstract criarQuarto(numero: number): Quarto;
}

export class CriadorQuartoSimples extends CriadorQuarto {
  criarQuarto(numero: number): Quarto {
    return new QuartoSimples(numero);
  }
}

export class CriadorQuartoDuplo extends CriadorQuarto {
  criarQuarto(numero: number): Quarto {
    return new QuartoDuplo(numero);
  }
}

export class CriadorQuartoLuxo extends CriadorQuarto {
  criarQuarto(numero: number): Quarto {
    return new QuartoLuxo(numero);
  }
}
