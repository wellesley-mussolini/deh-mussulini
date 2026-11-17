import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useFatoDaVez } from '../useFatoDaVez'

const quantidadeDeFatos = 3
const intervaloMs = 1000

describe('useFatoDaVez', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  test('avança um fato por intervalo e volta ao primeiro depois do último', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useFatoDaVez(quantidadeDeFatos, intervaloMs, false))

    expect(result.current).toBe(0)
    act(() => {
      vi.advanceTimersByTime(intervaloMs)
    })
    expect(result.current).toBe(1)
    act(() => {
      vi.advanceTimersByTime(intervaloMs)
    })
    expect(result.current).toBe(2)
    act(() => {
      vi.advanceTimersByTime(intervaloMs)
    })
    expect(result.current).toBe(0)
  })

  test('fica parado no primeiro fato quando a alternância está pausada', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useFatoDaVez(quantidadeDeFatos, intervaloMs, true))

    act(() => {
      vi.advanceTimersByTime(intervaloMs * 5)
    })

    expect(result.current).toBe(0)
  })
})
