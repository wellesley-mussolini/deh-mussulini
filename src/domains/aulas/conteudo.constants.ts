import { BookOpen, MonitorPlay, Music, Sprout } from 'lucide-react'
import type { DiferencialDaAula, DuvidaFrequente, EtapaDoCaminho } from './aulas.types'

export const diferenciais: readonly DiferencialDaAula[] = [
  {
    titulo: 'Online, de onde você estiver',
    descricao: 'As aulas são online: você aprende de casa, sem precisar se deslocar.',
    icone: MonitorPlay,
  },
  {
    titulo: 'Para quem está começando',
    descricao: 'Feitas para quem tem zero ou pouco conhecimento de violão, a partir de 12 anos.',
    icone: Sprout,
  },
  {
    titulo: 'Ritmos brasileiros e internacionais',
    descricao: 'Você aprende as levadas da música brasileira e também as de fora.',
    icone: Music,
  },
  {
    titulo: 'Apostila cifrada',
    descricao: 'As aulas contam com uma apostila de música brasileira cifrada para violão.',
    icone: BookOpen,
  },
]

export const destaques: readonly string[] = [
  'Aulas online',
  'A partir de 12 anos',
  'Do zero ao primeiro acorde',
  'Ritmos brasileiros',
  'Ritmos internacionais',
  'Apostila cifrada',
  'Formada em Música pela UFMG',
]

export const etapasDoCaminho: readonly EtapaDoCaminho[] = [
  {
    titulo: 'Primeira conversa',
    descricao: 'Você chama a Deh no WhatsApp, conta o que quer aprender e combina o melhor horário.',
  },
  {
    titulo: 'Primeiros acordes',
    descricao: 'Postura, mão direita, mão esquerda e os acordes que abrem as primeiras músicas.',
  },
  {
    titulo: 'Ritmos e levadas',
    descricao: 'Os ritmos brasileiros e internacionais que fazem a música andar.',
  },
  {
    titulo: 'Músicas da apostila',
    descricao: 'Com a apostila de música brasileira cifrada, você junta acordes e ritmo nas primeiras músicas.',
  },
]

export const duvidasFrequentes: readonly DuvidaFrequente[] = [
  {
    pergunta: 'Preciso saber tocar alguma coisa?',
    resposta:
      'Não. As aulas são para quem tem zero ou pouco conhecimento de violão e começam de onde você está.',
  },
  {
    pergunta: 'As aulas são online?',
    resposta: 'Sim. Você aprende de onde estiver, pela internet.',
  },
  {
    pergunta: 'Qual a idade mínima?',
    resposta: 'As aulas são para alunos a partir de 12 anos.',
  },
  {
    pergunta: 'Tem material de apoio?',
    resposta: 'Tem. As aulas usam uma apostila de música brasileira cifrada para violão.',
  },
  {
    pergunta: 'Preciso ter um violão?',
    resposta: 'Para praticar entre as aulas, sim. Se ainda não tem, conte para a Deh na primeira conversa.',
  },
  {
    pergunta: 'Como funcionam horários e valores?',
    resposta: 'Horários e valores são combinados direto com a Deh pelo WhatsApp.',
  },
]

export const resumoDasAulas =
  'Aulas de violão online para quem tem zero ou pouco conhecimento, a partir de 12 anos, com ritmos brasileiros e internacionais e apostila de música brasileira cifrada.'

export const fatosDaAbertura: readonly string[] = [
  'online',
  'para iniciantes',
  'a partir de 12 anos',
  'com ritmos brasileiros',
  'com ritmos internacionais',
  'com apostila cifrada',
]

export const intervaloEntreFatosMs = 2400
