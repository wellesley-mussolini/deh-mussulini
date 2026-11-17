import { describe, expect, test } from 'vitest'
import { whatsappIntegracao } from '../whatsapp.integracao'

describe('whatsappIntegracao.montarLinkDeConversa', () => {
  test('usa só os dígitos do telefone, com código do país, no formato wa.me', () => {
    const link = whatsappIntegracao.montarLinkDeConversa('+55 (31) 7132-3439', 'Oi')

    expect(link).toBe('https://wa.me/553171323439?text=Oi')
  })

  test('codifica a mensagem pronta para chegar intacta, com acentos e espaços', () => {
    const mensagemPronta = 'Oi, Deh! Quero saber das aulas de violão & horários'

    const link = whatsappIntegracao.montarLinkDeConversa('5531971323439', mensagemPronta)

    expect(new URL(link).searchParams.get('text')).toBe(mensagemPronta)
    expect(link).not.toContain(' ')
  })

  test('falha de forma visível quando o telefone não tem dígitos', () => {
    expect(() => whatsappIntegracao.montarLinkDeConversa('sem número', 'Oi')).toThrow(/telefone/i)
  })
})
