import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// O jsdom não implementa estas APIs do navegador: o Motion usa os observadores para animar na rolagem,
// e seguir uma âncora (#secao) chama scrollTo.
class ObservadorDeInterseccaoInerte {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

// Refeitos antes de cada teste porque o Vitest restaura os globais ao fim de cada um (unstubGlobals).
beforeEach(() => {
  vi.stubGlobal('scrollTo', () => {})
  vi.stubGlobal('IntersectionObserver', ObservadorDeInterseccaoInerte)
  vi.stubGlobal('ResizeObserver', ObservadorDeInterseccaoInerte)
  vi.stubGlobal(
    'matchMedia',
    (consulta: string) =>
      ({
        matches: false,
        media: consulta,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) satisfies MediaQueryList,
  )
})

afterEach(() => {
  cleanup()
})
