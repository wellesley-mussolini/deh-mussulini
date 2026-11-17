import { whatsappIntegracao } from '../integracoes/whatsapp.integracao'

export const contatoDaDeh = {
  telefoneWhatsapp: '+55 31 7132-3439',
  mensagemPronta: 'Oi, Deh! Vi seu site e quero saber mais sobre as aulas de violão.',
} as const

export const linkDoWhatsapp = whatsappIntegracao.montarLinkDeConversa(
  contatoDaDeh.telefoneWhatsapp,
  contatoDaDeh.mensagemPronta,
)
