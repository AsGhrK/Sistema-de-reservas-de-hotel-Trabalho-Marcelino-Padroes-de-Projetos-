import type { PoliticaPreco, PoliticaCancelamento } from "./Politicas.js";

// fábrica abstrata, preço e cancelamento sempre do mesmo plano
export interface FabricaPlano {
  criarPoliticaPreco(): PoliticaPreco;
  criarPoliticaCancelamento(): PoliticaCancelamento;
}

// plano flexível
class PrecoFlexivel implements PoliticaPreco {
  calcular(precoDiaria: number, dias: number, tipoCliente: string): number {
    const total = precoDiaria * dias;
    if (tipoCliente === "vip") {
      return total * 0.9;
    }
    return total;
  }
}

class CancelamentoFlexivel implements PoliticaCancelamento {
  calcularReembolso(valorPago: number, diasAteEntrada: number): number {
    if (diasAteEntrada >= 1) {
      return valorPago;
    }
    return valorPago * 0.5;
  }
}

export class FabricaPlanoFlexivel implements FabricaPlano {
  criarPoliticaPreco(): PoliticaPreco {
    return new PrecoFlexivel();
  }

  criarPoliticaCancelamento(): PoliticaCancelamento {
    return new CancelamentoFlexivel();
  }
}

// plano promocional
class PrecoPromocional implements PoliticaPreco {
  calcular(precoDiaria: number, dias: number, tipoCliente: string): number {
    const total = precoDiaria * dias * 0.85;
    if (tipoCliente === "vip") {
      return total * 0.95;
    }
    return total;
  }
}

class CancelamentoPromocional implements PoliticaCancelamento {
  calcularReembolso(valorPago: number, diasAteEntrada: number): number {
    return 0;
  }
}

export class FabricaPlanoPromocional implements FabricaPlano {
  criarPoliticaPreco(): PoliticaPreco {
    return new PrecoPromocional();
  }

  criarPoliticaCancelamento(): PoliticaCancelamento {
    return new CancelamentoPromocional();
  }
}
