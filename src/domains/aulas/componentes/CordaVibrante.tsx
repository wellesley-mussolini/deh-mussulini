import { useEffect, type MouseEvent } from 'react'
import { useAnimate, useReducedMotion } from 'motion/react'
import type { PropriedadesDaCordaVibrante } from '../types'

const alturaDoDesenho = 40
const larguraDoDesenho = 1000
const centroVertical = alturaDoDesenho / 2

const desenharCordaCurvada = (deslocamento: number) =>
  `M 0 ${centroVertical} Q ${larguraDoDesenho / 2} ${centroVertical + deslocamento} ${larguraDoDesenho} ${centroVertical}`

const cordaParada = desenharCordaCurvada(0)
// A amplitude cai a cada ida e volta, como a corda real perdendo energia.
const amplitudes = [14, -11, 8, -5, 3, -1.5, 0]
const intensidadeDoDedilhado = 0.7
const intensidadeAoPassar = 0.45
const intensidadeAoTocar = 1

const calcularVibracao = (intensidade: number) =>
  amplitudes.map((amplitude) => desenharCordaCurvada(amplitude * intensidade))

const transicaoDaVibracao = (atraso: number) => ({ duration: 0.75, ease: 'easeOut', delay: atraso }) as const

const centroDaCorda = 50

// Clique pelo teclado chega com detail 0 e sem coordenada útil: a nota nasce no meio da corda.
const calcularPontoTocado = (evento: MouseEvent<HTMLButtonElement>) => {
  if (evento.detail === 0) return centroDaCorda
  const areaDaCorda = evento.currentTarget.getBoundingClientRect()
  if (areaDaCorda.width === 0) return centroDaCorda
  return ((evento.clientX - areaDaCorda.left) / areaDaCorda.width) * 100
}

export default function CordaVibrante({ corda, atraso, aoTocar }: PropriedadesDaCordaVibrante) {
  const [cordaDesenhada, animarCorda] = useAnimate<SVGPathElement>()
  const movimentoReduzido = useReducedMotion()

  const vibrar = (intensidade: number) => {
    if (movimentoReduzido) return
    animarCorda(cordaDesenhada.current, { d: calcularVibracao(intensidade) }, transicaoDaVibracao(0))
  }

  useEffect(() => {
    if (movimentoReduzido) return
    const dedilhado = animarCorda(
      cordaDesenhada.current,
      { d: calcularVibracao(intensidadeDoDedilhado) },
      transicaoDaVibracao(atraso),
    )
    return () => dedilhado.stop()
  }, [animarCorda, cordaDesenhada, movimentoReduzido, atraso])

  return (
    <button
      type="button"
      aria-label={`Tocar a corda ${corda.nome}`}
      onPointerEnter={() => vibrar(intensidadeAoPassar)}
      onClick={(evento) => {
        vibrar(intensidadeAoTocar)
        aoTocar(corda, calcularPontoTocado(evento))
      }}
      className={`block h-9 w-full cursor-pointer sm:h-11 ${
        corda.revestidaDeMetal ? 'text-traste' : 'text-corda'
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${larguraDoDesenho} ${alturaDoDesenho}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <path
          ref={cordaDesenhada}
          d={cordaParada}
          fill="none"
          stroke="currentColor"
          strokeWidth={corda.espessura}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </button>
  )
}
