import type { PoliticaPreco, PoliticaCancelamento } from "./Politicas.js";

// fábrica abstrata
// preço e cancelamento sempre do mesmo plano
export interface FabricaPlano {
  criarPoliticaPreco(): PoliticaPreco;
  criarPoliticaCancelamento(): PoliticaCancelamento;
}

// plano flexível
// preço cheio
class PrecoFlexivel implements PoliticaPreco {
  public calcular(precoDiaria: number, dias: number, tipoCliente: string): number {
    const total = precoDiaria * dias;
    if (tipoCliente === "vip") {
      // vip ganha 10 por cento de desconto
      return total * 0.9;
    }
    return total;
  }
}

// cancelamento com reembolso
class CancelamentoFlexivel implements PoliticaCancelamento {
  public calcularReembolso(valorPago: number, diasAteEntrada: number): number {
    // ainda falta pelo menos um dia pra entrada
    if (diasAteEntrada >= 1) {
      return valorPago;
    }
    // em cima da hora devolve só metade
    return valorPago * 0.5;
  }
}

// só essa fábrica conhece as classes do plano flexível
export class FabricaPlanoFlexivel implements FabricaPlano {
  public criarPoliticaPreco(): PoliticaPreco {
    return new PrecoFlexivel();
  }

  public criarPoliticaCancelamento(): PoliticaCancelamento {
    return new CancelamentoFlexivel();
  }
}

// plano promocional
// 15% de desconto
class PrecoPromocional implements PoliticaPreco {
  public calcular(precoDiaria: number, dias: number, tipoCliente: string): number {
    const total = precoDiaria * dias * 0.85;
    if (tipoCliente === "vip") {
      // vip ganha mais 5 por cento em cima do desconto do plano
      return total * 0.95;
    }
    return total;
  }
}

// não devolve nada se cancelar
class CancelamentoPromocional implements PoliticaCancelamento {
  public calcularReembolso(valorPago: number, diasAteEntrada: number): number {
    return 0;
  }
}

// só essa fábrica conhece as classes do plano promocional
export class FabricaPlanoPromocional implements FabricaPlano {
  public criarPoliticaPreco(): PoliticaPreco {
    return new PrecoPromocional();
  }

  public criarPoliticaCancelamento(): PoliticaCancelamento {
    return new CancelamentoPromocional();
  }
}
