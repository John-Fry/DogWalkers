import { Cliente } from "./cliente";

export class Prestador extends Cliente {
  public horarioDisponibilidade: string;

  constructor(nome: string, cpf: string, nasc: string, horario: string, telefone: string, email: string,
              senha: string) {
    super(nome, cpf, nasc, telefone, senha, email);
    this.horarioDisponibilidade = horario;
  }

//   get getHorarioDisponibilidade(): string {
//     return this._horarioDisponibilidade;
//   }
//
//   set setHorarioDisponibilidade(newHora: string) {
//     this._horarioDisponibilidade = newHora;
//   }
//
//   toString(): string {
//     let output: string;
//
//     output = `Nome: ${super.getNome}
// CPF: ${super.getCpf}
// Idade: ${super.idade(super.getDataNasc)}
// Telefone: ${super.getTelefone}
// Endereço:
//   ${super.getEndereco.toString()}`;
//
//     return output;
//   }
}
