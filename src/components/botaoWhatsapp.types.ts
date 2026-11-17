import type { ReactNode } from 'react'

export type AparenciaDoBotao = 'roseta' | 'tampo'

export type TamanhoDoBotao = 'compacto' | 'grande'

export interface PropriedadesDoBotaoWhatsapp {
  children: ReactNode
  aparencia?: AparenciaDoBotao
  tamanho?: TamanhoDoBotao
  comBrilho?: boolean
}
