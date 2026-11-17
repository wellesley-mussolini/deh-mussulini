export type AparenciaDoBotao = 'roseta' | 'tampo'

export type TamanhoDoBotao = 'compacto' | 'grande'

export interface PropriedadesDoBotaoWhatsapp {
  aparencia?: AparenciaDoBotao
  tamanho?: TamanhoDoBotao
  comBrilho?: boolean
}
