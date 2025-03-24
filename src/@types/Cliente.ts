export enum TipoCadastro {
  Cliente = 'Cliente',
  Fornecedor = 'Fornecedor',
  ClienteFornecedor = 'ClienteFornecedor',
  Transportadora = 'Transportadora',
  Funcionario = 'Funcionario'
}


export type Cliente = {
  id?: number
  dt_ultima_alteracao?: string
  usuario_ultima_alteracao_id?: number
  dt_inclusao?: string
  usuario_inclusao_id?: number
  ativo?: boolean
  nome: string
  fantasia?: string
  tipo_pessoa?: "Fisica" | "Juridica"
  tipo_cadastro?: TipoCadastro
  cpf_cnpj?: string
  rg_ie?: string
  dt_nascimento?: string
  fone?: string
  celular?: string
  email?: string
  sexo?: string
  naturalidade_cidade?: string
  naturalidade_uf?: string
  nome_pai?: string
  nome_mae?: string
}