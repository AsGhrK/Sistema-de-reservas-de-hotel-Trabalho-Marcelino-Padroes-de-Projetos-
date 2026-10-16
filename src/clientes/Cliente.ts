// tipo pode ser normal ou vip
export class Cliente {
  private nome: string;
  private email: string;
  private telefone: string;
  private tipo: string;

  // construtor do cliente valida o nome e o tipo antes de guardar
  constructor(nome: string, email: string, telefone: string, tipo: string) {
    // nome vazio ou só com espaços não vale
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do cliente não pode ser vazio.");
    }
    // só existem dois tipos de cliente
    if (tipo !== "normal" && tipo !== "vip") {
      throw new Error("Tipo do cliente deve ser normal ou vip.");
    }

    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.tipo = tipo;
  }

  // getters
  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public getTipo(): string {
    return this.tipo;
  }
}
