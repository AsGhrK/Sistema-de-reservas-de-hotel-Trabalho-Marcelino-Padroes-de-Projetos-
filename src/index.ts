// para cliente
interface cliente {
    nome: string
    email: string
    telefone: string
    tipo: string
}

abstract class criarCliente implements cliente {
    abstract criarCliente(nome: string ,email: string, telefone: string, tipo: string): cliente

}

    
class clienteVip extends criarCliente {
    beneficios: string[]
    constructor(nome: string, email: string, telefone: string, tipo: string) {
        super(nome, email, telefone, tipo)
        this.tipo = " VIP"
        this.beneficios = []
    }

        modeloVip(){
        return new criarCliente(this.nome, this.email, this.telefone, this.tipo)
    }
}

class clienteRegular extends criarCliente {
    constructor(nome: string, email: string, telefone: string, tipo: string) {
        super(nome, email, telefone, tipo)
        this.tipo = " Regular"
    }

        modeloRegular(){
        return new criarCliente(this.nome, this.email, this.telefone, this.tipo)
    }
}
 const clienteVip1 = new clienteVip("Carlos Oliveira", "carlos@example.com", "555555555", "VIP")

const clienteMestre = new criarCliente(clienteVip1)


/*


// para quarto

class Quarto {  
    private numero: number
    private tipo: string
    private preco: number

    constructor(numero: number, tipo: string, preco: number) {
        this.numero = numero
        this.tipo = tipo
        this.preco = preco
    }
}

// para reserva

class Reserva {
    private dataEntrada: Date
    private dataSaida: Date
    private cliente: cliente
    private quarto: Quarto

    constructor(dataEntrada: Date, dataSaida: Date, cliente: cliente, quarto: Quarto) {
        this.dataEntrada = dataEntrada
        this.dataSaida = dataSaida
        this.cliente = cliente
        this.quarto = quarto
    }
}


class Hotel {
    private nome: string
    private endereco: string
    private reservas: Reserva[]

    constructor(nome: string, endereco: string) {
        this.nome = nome
        this.endereco = endereco
        this.reservas = []
    }   

    public adicionarReserva(reserva: Reserva): void {
        this.reservas.push(reserva)
    }

    public listarReservas(): void {
        console.log(`Reservas do hotel ${this.nome}:`)  
        this.reservas.forEach((reserva, index) => {
            console.log(`- Reserva ${index + 1}: ${reserva.dataEntrada} a ${reserva.dataSaida}`)
        })
    }
}

class SistemaReservas extends Reserva {*/