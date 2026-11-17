import type { LucideIcon } from 'lucide-react'

export interface CordaDoViolao {
  nome: string
  frequencia: number
  espessura: number
  revestidaDeMetal: boolean
}

export interface DiferencialDaAula {
  titulo: string
  descricao: string
  icone: LucideIcon
}

export interface EtapaDoCaminho {
  titulo: string
  descricao: string
}

export interface DuvidaFrequente {
  pergunta: string
  resposta: string
}

export interface PropriedadesDaCordaVibrante {
  corda: CordaDoViolao
  atraso: number
  aoTocar: (corda: CordaDoViolao, pontoTocado: number) => void
}

export interface PropriedadesDoTituloRevelado {
  texto: string
  className?: string
}

export interface PropriedadesDaPaginaAulas {
  siteRevelado: boolean
}

export interface NotaNoAr {
  id: number
  nomeDaCorda: string
  posicaoHorizontal: number
  posicaoVertical: number
}
