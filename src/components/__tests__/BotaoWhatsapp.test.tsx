import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import BotaoWhatsapp from '../BotaoWhatsapp'
import { linkDoWhatsapp } from '../../constants/contato.constants'

describe('BotaoWhatsapp', () => {
  test('é um link para a conversa com a Deh que abre fora do site', () => {
    render(<BotaoWhatsapp />)

    const chamada = screen.getByRole('link', { name: 'Chamar a Deh no WhatsApp' })

    expect(chamada).toHaveAttribute('href', linkDoWhatsapp)
    expect(chamada).toHaveAttribute('target', '_blank')
    expect(chamada).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
