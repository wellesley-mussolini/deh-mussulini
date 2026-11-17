import type { CordaDoViolao } from './aulas.types'

// Afinação padrão, da corda mais grossa (6ª) para a mais fina (1ª).
export const cordasDoViolao: readonly CordaDoViolao[] = [
  { nome: 'Mi grave', frequencia: 82.41, espessura: 3.4, revestidaDeMetal: true },
  { nome: 'Lá', frequencia: 110, espessura: 2.9, revestidaDeMetal: true },
  { nome: 'Ré', frequencia: 146.83, espessura: 2.4, revestidaDeMetal: true },
  { nome: 'Sol', frequencia: 196, espessura: 1.9, revestidaDeMetal: false },
  { nome: 'Si', frequencia: 246.94, espessura: 1.5, revestidaDeMetal: false },
  { nome: 'Mi agudo', frequencia: 329.63, espessura: 1.2, revestidaDeMetal: false },
]

// Em segundos: o som da corda e a nota que sobe dela duram o mesmo tempo.
export const duracaoDaNota = 1.8
