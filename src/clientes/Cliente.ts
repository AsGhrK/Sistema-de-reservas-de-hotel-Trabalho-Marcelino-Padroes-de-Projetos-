// tipo pode ser "normal" ou "vip"
export class Cliente {
  private nome: string;
  private email: string;
  private telefone: string;
  private tipo: string;

  constructor(nome: string, email: string, telefone: string, tipo: string) {
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do cliente não pode ser vazio.");
    }
    if (tipo !== "normal" && tipo !== "vip") {
      throw new Error("Tipo do cliente deve ser normal ou vip.");
    }

    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.tipo = tipo;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getTipo(): string {
    return this.tipo;
  }
}
