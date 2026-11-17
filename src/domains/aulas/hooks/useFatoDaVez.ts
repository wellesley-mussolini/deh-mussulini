import { useEffect, useState } from 'react'

export function useFatoDaVez(quantidadeDeFatos: number, intervaloMs: number, pausado: boolean) {
  const [posicaoDoFato, setPosicaoDoFato] = useState(0)

  useEffect(() => {
    if (pausado) return
    const trocaDeFato = setInterval(
      () => setPosicaoDoFato((posicaoAtual) => (posicaoAtual + 1) % quantidadeDeFatos),
      intervaloMs,
    )
    return () => clearInterval(trocaDeFato)
  }, [quantidadeDeFatos, intervaloMs, pausado])

  return posicaoDoFato
}
