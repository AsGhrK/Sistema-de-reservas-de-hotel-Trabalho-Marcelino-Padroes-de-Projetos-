type TipoCliente = 'normal' | 'vip';
type TipoQuarto = 'simples' | 'duplo' | 'luxo';

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  tipo: TipoCliente;
}

class Quarto {
  constructor(
    public numero: number,
    public tipo: TipoQuarto,
    public preco: number,
  ) {}

  clonar(): Quarto {
    return new Quarto(this.numero, this.tipo, this.preco);
  }
}

class Reserva {
  constructor(
    public dataEntrada: Date,
    public dataSaida: Date,
    public cliente: Cliente,
    public quarto: Quarto,
  ) {}

  get quantidadeDias(): number {
    const diferenca = this.dataSaida.getTime() - this.dataEntrada.getTime();
    return Math.max(1, Math.ceil(diferenca / (1000 * 60 * 60 * 24)));
  }

  get valorTotal(): number {
    return this.quantidadeDias * this.quarto.preco;
  }
}

class FabricaCliente {
  criarCliente(nome: string, email: string, telefone: string, tipo: TipoCliente): Cliente {
    return { nome, email, telefone, tipo };
  }
}

class FabricaQuarto {
  criarQuarto(numero: number, tipo: TipoQuarto, preco: number): Quarto {
    return new Quarto(numero, tipo, preco);
  }
}

class HotelUnico {
  private static instancia: HotelUnico | null = null;
  private readonly reservas: Reserva[] = [];

  private constructor(
    public nome: string,
    public endereco: string,
  ) {}

  static obterInstancia(nome = 'Hotel Padrões', endereco = 'Rua das Flores, 123'): HotelUnico {
    if (!HotelUnico.instancia) {
      HotelUnico.instancia = new HotelUnico(nome, endereco);
    }
    return HotelUnico.instancia;
  }

  adicionarReserva(reserva: Reserva): void {
    this.reservas.push(reserva);
  }

  mostrarResumo(): void {
    console.log(`\nHotel: ${this.nome}`);
    console.log(`Endereço: ${this.endereco}`);
    console.log(`Total de reservas: ${this.reservas.length}`);

    this.reservas.forEach((reserva, indice) => {
      console.log(`\nReserva ${indice + 1}`);
      console.log(`- Cliente: ${reserva.cliente.nome} (${reserva.cliente.tipo})`);
      console.log(`- Quarto: ${reserva.quarto.tipo} - Nº ${reserva.quarto.numero}`);
      console.log(`- Período: ${reserva.dataEntrada.toLocaleDateString('pt-BR')} até ${reserva.dataSaida.toLocaleDateString('pt-BR')}`);
      console.log(`- Total: R$ ${reserva.valorTotal.toFixed(2)}`);
    });
  }
}

function demonstrarSistemaReservas(): void {
  const hotel = HotelUnico.obterInstancia('Hotel Mar do Sol', 'Avenida Atlântica, 500');
  const fabricaCliente = new FabricaCliente();
  const fabricaQuarto = new FabricaQuarto();

  const clienteVip = fabricaCliente.criarCliente('Ana Souza', 'ana@email.com', '99999-1111', 'vip');
  const clienteNormal = fabricaCliente.criarCliente('Pedro Lima', 'pedro@email.com', '98888-2222', 'normal');

  const quartoModelo = fabricaQuarto.criarQuarto(101, 'luxo', 350);
  const quartoCopia = quartoModelo.clonar();
  quartoCopia.numero = 102;

  const reserva1 = new Reserva(new Date('2026-09-25'), new Date('2026-09-29'), clienteVip, quartoModelo);
  const reserva2 = new Reserva(new Date('2026-10-10'), new Date('2026-10-12'), clienteNormal, quartoCopia);

  hotel.adicionarReserva(reserva1);
  hotel.adicionarReserva(reserva2);
  hotel.mostrarResumo();
}

demonstrarSistemaReservas();

