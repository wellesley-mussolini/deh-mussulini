import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import FatosEmDestaque from '../FatosEmDestaque'
import { fatosDaAbertura } from '../../conteudo.constants'

describe('FatosEmDestaque', () => {
  test('começa mostrando o primeiro fato das aulas', () => {
    render(<FatosEmDestaque />)

    expect(screen.getByText(fatosDaAbertura[0])).toBeInTheDocument()
  })

  test('entrega a frase completa para leitores de tela, sem depender da troca animada', () => {
    render(<FatosEmDestaque />)

    const fraseCompleta = screen.getByText(/aulas de violão online/i)

    expect(fraseCompleta).toHaveTextContent(/a partir de 12 anos/i)
    expect(fraseCompleta).toHaveTextContent(/zero ou pouco conhecimento/i)
  })
})
