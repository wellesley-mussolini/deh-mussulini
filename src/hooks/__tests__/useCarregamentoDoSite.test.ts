import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useCarregamentoDoSite } from '../useCarregamentoDoSite'
import {
  animacaoDeEntradaNaBoca,
  animacaoDeSaida,
  idDaTelaDeCarregamento,
  tempoMinimoNaTelaMs,
} from '../../constants/carregamento.constants'

const imagensEssenciais = ['/foto-da-abertura.webp'] as const

// O jsdom não implementa AnimationEvent: o evento do navegador é recriado com o nome da animação.
const terminarAnimacao = (elemento: HTMLElement, nomeDaAnimacao: string) => {
  const fimDaAnimacao = Object.assign(new Event('animationend', { bubbles: true }), { animationName: nomeDaAnimacao })
  elemento.dispatchEvent(fimDaAnimacao)
}

const montarTelaDeCarregamento = () => {
  const telaDeCarregamento = document.createElement('div')
  telaDeCarregamento.id = idDaTelaDeCarregamento
  document.body.append(telaDeCarregamento)
  document.documentElement.classList.add('carregando')
  return telaDeCarregamento
}

const criarEsperaControlada = () => {
  const controle: { resolve: () => void; reject: (erro: Error) => void } = { resolve: () => {}, reject: () => {} }
  const promise = new Promise<void>((resolver, rejeitar) => {
    controle.resolve = resolver
    controle.reject = rejeitar
  })
  return { promise, ...controle }
}

const simularNavegadorCarregando = () => {
  const fontesProntas = criarEsperaControlada()
  const imagensDecodificadas: string[] = []
  const decodificacao = criarEsperaControlada()
  Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: fontesProntas.promise } })
  vi.stubGlobal(
    'Image',
    class {
      set src(endereco: string) {
        imagensDecodificadas.push(endereco)
      }
      decode = () => decodificacao.promise
    },
  )
  // O tempo mínimo conta desde a abertura da página, que no teste acabou de acontecer.
  vi.spyOn(performance, 'now').mockReturnValue(0)
  return { fontesProntas, decodificacao, imagensDecodificadas }
}

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  document.getElementById(idDaTelaDeCarregamento)?.remove()
  document.documentElement.classList.remove('carregando')
})

describe('useCarregamentoDoSite', () => {
  test('sem tela de carregamento na página, o site já nasce revelado', () => {
    const { result } = renderHook(() => useCarregamentoDoSite(imagensEssenciais))

    expect(result.current).toBe(true)
  })

  test('só abre a boca do violão depois das fontes, da foto da abertura e do tempo mínimo', async () => {
    vi.useFakeTimers()
    const telaDeCarregamento = montarTelaDeCarregamento()
    const { fontesProntas, decodificacao, imagensDecodificadas } = simularNavegadorCarregando()

    const { result } = renderHook(() => useCarregamentoDoSite(imagensEssenciais))

    expect(imagensDecodificadas).toEqual(['/foto-da-abertura.webp'])
    await act(async () => {
      fontesProntas.resolve()
      decodificacao.resolve()
    })
    expect(telaDeCarregamento).not.toHaveClass('revelando')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(tempoMinimoNaTelaMs)
    })
    expect(telaDeCarregamento).toHaveClass('revelando')
    expect(result.current).toBe(false)
  })

  test('revela o site quando a boca termina de abrir e some com a tela no fim do esmaecer', async () => {
    vi.useFakeTimers()
    const telaDeCarregamento = montarTelaDeCarregamento()
    const { fontesProntas, decodificacao } = simularNavegadorCarregando()
    const { result } = renderHook(() => useCarregamentoDoSite(imagensEssenciais))
    await act(async () => {
      fontesProntas.resolve()
      decodificacao.resolve()
      await vi.advanceTimersByTimeAsync(tempoMinimoNaTelaMs)
    })

    act(() => {
      terminarAnimacao(telaDeCarregamento, animacaoDeEntradaNaBoca)
    })
    expect(result.current).toBe(true)
    expect(telaDeCarregamento).toHaveClass('sumindo')
    expect(document.documentElement).not.toHaveClass('carregando')

    act(() => {
      terminarAnimacao(telaDeCarregamento, animacaoDeSaida)
    })
    expect(document.getElementById(idDaTelaDeCarregamento)).toBeNull()
  })

  test('uma foto que falha ao decodificar não prende o visitante na tela de carregamento', async () => {
    vi.useFakeTimers()
    const telaDeCarregamento = montarTelaDeCarregamento()
    const { fontesProntas, decodificacao } = simularNavegadorCarregando()
    renderHook(() => useCarregamentoDoSite(imagensEssenciais))

    await act(async () => {
      fontesProntas.resolve()
      decodificacao.reject(new Error('foto corrompida'))
      await vi.advanceTimersByTimeAsync(tempoMinimoNaTelaMs)
    })

    expect(telaDeCarregamento).toHaveClass('revelando')
  })

  test('num celular lento, que passou do tempo mínimo baixando o site, não agenda espera com tempo negativo', () => {
    montarTelaDeCarregamento()
    simularNavegadorCarregando()
    vi.spyOn(performance, 'now').mockReturnValue(tempoMinimoNaTelaMs + 2600)
    const agendamentos = vi.spyOn(globalThis, 'setTimeout')

    renderHook(() => useCarregamentoDoSite(imagensEssenciais))

    const atrasosAgendados = agendamentos.mock.calls.map(([, atraso]) => atraso)
    expect(atrasosAgendados).toContain(0)
    expect(atrasosAgendados.every((atraso) => atraso === undefined || atraso >= 0)).toBe(true)
  })
})
