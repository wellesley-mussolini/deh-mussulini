import { describe, expect, test, vi } from 'vitest'
import { act, render, renderHook, screen } from '@testing-library/react'
import BotaoWhatsapp from '../../components/BotaoWhatsapp'
import { useChamadaWhatsappNaTela } from '../useChamadaWhatsappNaTela'

type AvisoDeVisibilidade = (entradas: Array<Pick<IntersectionObserverEntry, 'isIntersecting' | 'target'>>) => void

const simularObservadorDeTela = () => {
  const avisos: AvisoDeVisibilidade[] = []
  const chamadasObservadas: Element[] = []
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(aoMudar: AvisoDeVisibilidade) {
        avisos.push(aoMudar)
      }
      observe(alvo: Element) {
        chamadasObservadas.push(alvo)
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    },
  )
  const avisar = (alvo: Element, naTela: boolean) =>
    act(() => avisos.forEach((aviso) => aviso([{ isIntersecting: naTela, target: alvo }])))
  return { avisar, chamadasObservadas }
}

describe('useChamadaWhatsappNaTela', () => {
  test('acompanha as chamadas de WhatsApp da página e diz quando alguma está na tela', () => {
    const { avisar, chamadasObservadas } = simularObservadorDeTela()
    render(
      <>
        <BotaoWhatsapp />
        <BotaoWhatsapp aparencia="tampo" />
      </>,
    )
    const [chamadaDaAbertura, chamadaDoSobre] = screen.getAllByRole('link', { name: 'Chamar a Deh no WhatsApp' })

    const { result } = renderHook(() => useChamadaWhatsappNaTela())

    expect(chamadasObservadas).toEqual([chamadaDaAbertura, chamadaDoSobre])
    expect(result.current).toBe(false)

    avisar(chamadaDaAbertura, true)
    avisar(chamadaDoSobre, true)
    expect(result.current).toBe(true)

    avisar(chamadaDaAbertura, false)
    expect(result.current).toBe(true)

    avisar(chamadaDoSobre, false)
    expect(result.current).toBe(false)
  })
})
