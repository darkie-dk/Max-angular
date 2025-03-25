export enum TipoCadastro {
  Cliente = 'Cliente',
  Fornecedor = 'Fornecedor',
  ClienteFornecedor = 'ClienteFornecedor',
  Transportadora = 'Transportadora',
  Funcionario = 'Funcionario'
}

export interface EnderecoPadrao {
  descricao: string;
  endereco: string;
  endereco_numero: string;
  endereco_bairro: string;
  endereco_cep: string;
  endereco_municipio_codigo_ibge: number;
  principal: boolean;
  cobranca: boolean;
  ie_produtor_rural: string;
}

interface ContatoPadrao {
  descricao: string;
  fone: string;
  email: string;
  enviar_orcamento: boolean;
  enviar_nf: boolean;
  enviar_boleto: boolean;
}

export interface Cliente {
  id?: string; 
  nome: string;
  fantasia: string;
  tipo_pessoa: "Fisica" | "Juridica";
  tipo_cadastro: TipoCadastro;
  cadastro_tipo_id: number;
  cpf_cnpj: string;
  rg_ie: string;
  tipo_regime_apuracao: "Simples" | "Normal";
  tipo_preco_venda: "SomenteVenda" | "VendaConsumo";
  ativo: boolean;
  cadastro_endereco_padrao: EnderecoPadrao;
  cadastro_contato_padrao: ContatoPadrao;
  dt_inclusao: string
}

export interface CadastroEnderecoPadraoRequest {
  descricao: string | null;
  endereco: string | null;
  endereco_numero: string | null;
  endereco_bairro: string | null;
  endereco_cep: string | null;
  endereco_municipio_codigo_ibge: number | null;
  principal: boolean | null;
  cobranca: boolean | null;
  ie_produtor_rural: string | null;
}

export interface CadastroContatoPadraoRequest {
  descricao: string | null;
  fone: string | null;
  email: string | null;
  enviar_orcamento: boolean | null;
  enviar_nf: boolean | null;
  enviar_boleto: boolean | null;
}

export interface ClienteRequest {
  nome: string | null;
  fantasia: string | null;
  tipo_pessoa: 'Fisica' | 'Juridica';
  tipo_cadastro: 'Cliente' | 'Fornecedor';
  cadastro_tipo_id: number | null;
  cpf_cnpj: string | null;
  rg_ie: string | null;
  tipo_regime_apuracao: 'Simples' | 'Normal';
  tipo_preco_venda: string | null;
  cadastro_endereco_padrao: CadastroEnderecoPadraoRequest | null;
  cadastro_contato_padrao: CadastroContatoPadraoRequest | null;
}
