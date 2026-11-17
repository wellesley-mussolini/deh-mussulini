import { describe, expect, test, vi } from 'vitest'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { contatoDaDeh } from '../constants/contato.constants'
import { animacaoDeEntradaNaBoca, idDaTelaDeCarregamento } from '../constants/carregamento.constants'

describe('site das aulas de violão', () => {
  test('os botões de WhatsApp das seções chamam a ação pelo mesmo nome', () => {
    render(<App />)

    const chamadasDasSecoes = within(screen.getByRole('main')).getAllByRole('link', { name: /whatsapp/i })

    expect(chamadasDasSecoes.length).toBeGreaterThanOrEqual(3)
    chamadasDasSecoes.forEach((chamada) => expect(chamada).toHaveTextContent('Chamar a Deh no WhatsApp'))
  })

  test('toda chamada de WhatsApp abre a conversa com a Deh em nova aba, com a mensagem pronta', () => {
    render(<App />)

    const chamadasWhatsapp = screen.getAllByRole('link', { name: /whatsapp/i })

    expect(chamadasWhatsapp.length).toBeGreaterThanOrEqual(3)
    chamadasWhatsapp.forEach((chamada) => {
      const destino = new URL(chamada.getAttribute('href') ?? '')
      expect(destino.origin + destino.pathname).toBe('https://wa.me/5531971323439')
      expect(destino.searchParams.get('text')).toBe(contatoDaDeh.mensagemPronta)
      expect(chamada).toHaveAttribute('target', '_blank')
      expect(chamada.getAttribute('rel')).toContain('noopener')
    })
  })

  test('apresenta as condições das aulas e a formação da Deh', () => {
    render(<App />)

    const conteudoVisivel = document.body.textContent ?? ''

    expect(conteudoVisivel).toMatch(/aulas de violão online/i)
    expect(conteudoVisivel).toMatch(/a partir de 12 anos/i)
    expect(conteudoVisivel).toMatch(/zero ou pouco conhecimento/i)
    expect(conteudoVisivel).toMatch(/ritmos brasileiros e internacionais/i)
    expect(conteudoVisivel).toMatch(/apostila de música brasileira cifrada/i)
    expect(conteudoVisivel).toMatch(/formada em música pela ufmg/i)
    expect(conteudoVisivel).toMatch(/aula de violão para mulheres/i)
  })

  test('os títulos animados palavra por palavra mantêm os espaços entre as palavras', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Como são as aulas' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Prazer, Deh Muss' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Do primeiro acorde às primeiras músicas' })).toBeInTheDocument()
  })

  test('a página apresenta a professora pelo nome artístico, Deh Muss', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Deh Muss' })).toBeInTheDocument()
    expect(document.body).not.toHaveTextContent(/mussulini/i)
  })

  test('o Instagram da Deh abre o perfil @deh.muss em nova aba', () => {
    render(<App />)

    const linkDoInstagram = screen.getByRole('link', { name: /instagram/i })

    expect(linkDoInstagram).toHaveAttribute('href', 'https://www.instagram.com/deh.muss/')
    expect(linkDoInstagram).toHaveAttribute('target', '_blank')
    expect(linkDoInstagram.getAttribute('rel')).toContain('noopener')
  })

  test('cada link da navegação leva a uma seção que existe na página', () => {
    render(<App />)

    const navegacaoPrincipal = screen.getByRole('navigation', { name: /principal/i })
    const linksDeSecao = within(navegacaoPrincipal).getAllByRole('link')

    expect(linksDeSecao.length).toBeGreaterThan(0)
    linksDeSecao.forEach((linkDeSecao) => {
      const ancora = linkDeSecao.getAttribute('href') ?? ''
      expect(ancora).toMatch(/^#/)
      expect(document.getElementById(ancora.slice(1))).not.toBeNull()
    })
  })

  test('no celular, o menu abre pelo botão e fecha ao escolher uma seção', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    const botaoMenu = screen.getByRole('button', { name: /abrir menu/i })
    expect(botaoMenu).toHaveAttribute('aria-expanded', 'false')

    await usuario.click(botaoMenu)

    const menuCelular = screen.getByRole('navigation', { name: /menu do celular/i })
    expect(screen.getByRole('button', { name: /fechar menu/i })).toHaveAttribute('aria-expanded', 'true')

    await usuario.click(within(menuCelular).getByRole('link', { name: /dúvidas/i }))

    expect(screen.getByRole('button', { name: /abrir menu/i })).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: /menu do celular/i })).not.toBeInTheDocument()
    })
  })

  test('uma dúvida mostra a resposta ao ser aberta e esconde ao ser fechada', async () => {
    const usuario = userEvent.setup()
    render(<App />)

    const pergunta = screen.getByRole('button', { name: /preciso saber tocar/i })
    expect(pergunta).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/começam de onde você está/i)).not.toBeInTheDocument()

    await usuario.click(pergunta)

    expect(pergunta).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/começam de onde você está/i)).toBeInTheDocument()

    await usuario.click(pergunta)

    expect(pergunta).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => {
      expect(screen.queryByText(/começam de onde você está/i)).not.toBeInTheDocument()
    })
  })

  test('tocar uma corda soa a nota da afinação padrão daquela corda', async () => {
    const frequenciasTocadas: number[] = []
    const parametroDeAudio = () => ({
      value: 0,
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
    })
    const noDeAudio = () => ({ connect: vi.fn(() => noDeAudio()) })
    class ContextoDeAudioFalso {
      currentTime = 0
      destination = noDeAudio()
      state = 'running'
      resume = vi.fn()
      close = vi.fn(() => Promise.resolve())
      createOscillator() {
        const frequencia = parametroDeAudio()
        return {
          ...noDeAudio(),
          type: 'sine',
          frequency: frequencia,
          start: vi.fn(() => frequenciasTocadas.push(frequencia.value)),
          stop: vi.fn(),
        }
      }
      createGain() {
        return { ...noDeAudio(), gain: parametroDeAudio() }
      }
      createBiquadFilter() {
        return { ...noDeAudio(), type: 'lowpass', frequency: parametroDeAudio() }
      }
    }
    vi.stubGlobal('AudioContext', ContextoDeAudioFalso)
    const usuario = userEvent.setup()
    render(<App />)

    await usuario.click(screen.getByRole('button', { name: /tocar a corda mi grave/i }))
    await usuario.click(screen.getByRole('button', { name: /tocar a corda lá/i }))

    expect(frequenciasTocadas).toContain(82.41)
    expect(frequenciasTocadas).toContain(110)

    const escalaDoViolao = screen.getByRole('group', { name: /cordas do violão/i })
    expect(within(escalaDoViolao).getByText('♪ Mi grave')).toBeInTheDocument()
    expect(within(escalaDoViolao).getByText('♪ Lá')).toBeInTheDocument()
  })

  test('a abertura só entra em cena quando a boca do violão termina de abrir', async () => {
    const telaDeCarregamento = document.createElement('div')
    telaDeCarregamento.id = idDaTelaDeCarregamento
    document.body.append(telaDeCarregamento)
    Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve() } })
    vi.stubGlobal('Image', class { src = ''; decode = () => Promise.resolve() })
    const relogioDaPagina = vi.spyOn(performance, 'now').mockReturnValue(Number.MAX_SAFE_INTEGER)

    render(<App />)

    expect(screen.queryByRole('heading', { level: 1, name: 'Deh Muss' })).not.toBeInTheDocument()
    await waitFor(() => expect(telaDeCarregamento).toHaveClass('revelando'))
    // O jsdom não implementa AnimationEvent: o evento do navegador é recriado com o nome da animação.
    act(() => {
      telaDeCarregamento.dispatchEvent(
        Object.assign(new Event('animationend', { bubbles: true }), { animationName: animacaoDeEntradaNaBoca }),
      )
    })
    expect(screen.getByRole('heading', { level: 1, name: 'Deh Muss' })).toBeInTheDocument()
    telaDeCarregamento.remove()
    relogioDaPagina.mockRestore()
  })
})
