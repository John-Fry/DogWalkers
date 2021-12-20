import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cliente } from "../../shared/model/cliente";
import { Prestador } from "../../shared/model/prestador";
import { Cachorro } from "../../shared/model/cachorro";
import { ClienteService } from "../../shared/service/serviceCliente/cliente.service";
import { PrestadorService } from "../../shared/service/servicePrestador/prestador.service";
import { Endereco } from "../../shared/model/endereco";
import { EnderecoService } from "../../shared/service/serviceEndereco/endereco.service";
import { CachorroService } from "../../shared/service/serviceCachorro/cachorro.service";


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  type: number;
  clientes = new Array<Cliente>();
  prestadores = new Array<Prestador>();
  hide1 = true;
  hide2 = true;

  validationsPrest: FormGroup;
  validationsCli: FormGroup;

  constructor(private clienteService: ClienteService, private prestadorService: PrestadorService,
              private formBuilder: FormBuilder, private enderecoService: EnderecoService,
              private cachorroService: CachorroService) {
    this.validationsPrest = formBuilder.group({
      nome: [
        '', Validators.required
      ],
      email: [
        '', [Validators.required, Validators.email]
      ],
      cpf: [
        '', [Validators.required, Validators.minLength(11)]
      ],
      dataNasc: [
        '', Validators.required
      ],
      telefone: [
        '', [Validators.required, Validators.pattern("\\([0-9]{2}\\)[\\s][0-9]{5}-[0-9]{4}")]
      ],
      rua: [
        '', Validators.required
      ],
      bairro: [
        '', Validators.required
      ],
      numero: [
        '', Validators.required
      ],
      cep: [
        '', [Validators.required, Validators.pattern("^[0-9]{8}$")]
      ],
      senha: [
        '', [Validators.required, Validators.minLength(6)]
      ],
      horario: [
        '', [Validators.required, Validators.pattern("[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}")]
      ]
    });

    this.validationsCli = formBuilder.group({
      nome: [
        '', Validators.required
      ],
      email: [
        '', [Validators.required, Validators.email]
      ],
      cpf: [
        '', [Validators.required, Validators.minLength(11)]
      ],
      dataNasc: [
        '', Validators.required
      ],
      telefone: [
        '', [Validators.required, Validators.pattern("\\([0-9]{2}\\)[\\s][0-9]{5}-[0-9]{4}")]
      ],
      rua: [
        '', Validators.required
      ],
      bairro: [
        '', Validators.required
      ],
      numero: [
        '', Validators.required
      ],
      cep: [
        '', [Validators.required, Validators.pattern("^[0-9]{8}$")]
      ],
      senha: [
        '', [Validators.required, Validators.minLength(6)]
      ]
    });
  }

  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe(
      client => this.clientes = client
    );
    this.prestadorService.listarPrestadores().subscribe(
      prestador => this.prestadores = prestador
    );
  }

  inserirPrestador(nome: HTMLInputElement, cpf: HTMLInputElement, dataNasc: HTMLInputElement,
                   tell: HTMLInputElement, rua: HTMLInputElement, bairro: HTMLInputElement,
                   num: HTMLInputElement, cep: HTMLInputElement, email: HTMLInputElement,
                   senha: HTMLInputElement, horario: HTMLInputElement) {

    let prest = new Prestador(nome.value, cpf.value, dataNasc.value, horario.value,
      tell.value, senha.value, email.value);

    this.prestadorService.inserirPrestador(prest).subscribe();

    let endereco = new Endereco(rua.value, bairro.value, cep.value, num.value);

    this.enderecoService.inserirEndereco(endereco).subscribe();

    prest.endereco = endereco;

    this.prestadores.push(prest);
    this.prestadorService.atualizarPrestador(prest);

    nome.value = "";
    cpf.value = "";
    dataNasc.value = "";
    horario.value = "";
    tell.value = "";
    senha.value = "";
    rua.value = "";
    bairro.value = "";
    cep.value = "";
    num.value = "";

  }

  inserirCliente(nome: HTMLInputElement, cpf: HTMLInputElement, dataNasc: HTMLInputElement,
                 tell: HTMLInputElement, rua: HTMLInputElement, bairro: HTMLInputElement,
                 num: HTMLInputElement, cep: HTMLInputElement, email: HTMLInputElement,
                 senha: HTMLInputElement, nomeDog: HTMLInputElement, racaDog: HTMLInputElement,
                 pesoDog: HTMLInputElement, porteDog: HTMLSelectElement) {

    let client = new Cliente(nome.value, cpf.value, dataNasc.value, tell.value, senha.value, email.value);

    this.clienteService.inserirCliente(client).subscribe();

    let dog = new Cachorro(nomeDog.value, Number.parseInt(pesoDog.value),
      porteDog.options[porteDog.selectedIndex].value, racaDog.value);

    this.cachorroService.inserirCachorro(dog).subscribe();

    let endereco = new Endereco(rua.value, bairro.value, cep.value, num.value);

    this.enderecoService.inserirEndereco(endereco).subscribe();

    client.cachorros = dog;
    client.endereco = endereco;

    this.clientes.push(client);
    this.clienteService.atualizarCliente(client).subscribe();

    nome.value = "";
    cpf.value = "";
    dataNasc.value = "";
    tell.value = "";
    senha.value = "";
    rua.value = "";
    bairro.value = "";
    cep.value = "";
    num.value = "";

    nomeDog.value = "";
    pesoDog.value = "";
    porteDog.value = "";
    racaDog.value = "";
  }
}
