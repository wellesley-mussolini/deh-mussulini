import { AnimatePresence, motion } from 'motion/react'
import CordaVibrante from './CordaVibrante'
import { useCordasTocadas } from '../hooks/useCordasTocadas'
import { cordasDoViolao, duracaoDaNota } from '../violao.constants'
import { curvaSuave } from '../animacoes.constants'

const quantidadeDeCasas = 12
const casasMarcadas = [3, 5, 7, 9]
const alturasDaMarcacaoDupla = ['top-[30%]', 'top-[70%]']
const atrasoDoDedilhado = 1.6
const intervaloEntreCordas = 0.07

// Cada casa encurta a corda por 2^(-1/12); a 12ª casa fica na metade da corda,
// por isso dividimos pela metade para a 12ª casa ocupar 100% da largura desenhada.
const calcularPosicaoDoTraste = (casa: number) => ((1 - 2 ** (-casa / quantidadeDeCasas)) / 0.5) * 100

const calcularCentroDaCasa = (casa: number) => (calcularPosicaoDoTraste(casa - 1) + calcularPosicaoDoTraste(casa)) / 2

const casas = Array.from({ length: quantidadeDeCasas }, (_, posicao) => posicao + 1)

export default function EscalaDoViolao() {
  const { notasNoAr, tocarCorda } = useCordasTocadas()

  return (
    <div role="group" aria-label="Cordas do violão" className="relative">
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.3, delay: 0.6, ease: curvaSuave }}
        className="relative border-y-[6px] border-jacaranda-claro bg-escala py-3 shadow-[inset_0_12px_24px_rgba(0,0,0,0.35)]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-tampo-claro/90" />
        {casas.map((casa) => (
          <div
            key={casa}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-traste/30"
            style={{ left: `${calcularPosicaoDoTraste(casa)}%` }}
          />
        ))}
        {casasMarcadas.map((casa) => (
          <span
            key={casa}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tampo/25"
            style={{ left: `${calcularCentroDaCasa(casa)}%` }}
          />
        ))}
        {alturasDaMarcacaoDupla.map((altura) => (
          <span
            key={altura}
            aria-hidden="true"
            className={`pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tampo/25 ${altura}`}
            style={{ left: `${calcularCentroDaCasa(quantidadeDeCasas)}%` }}
          />
        ))}

        <ul className="relative">
          {cordasDoViolao.map((corda, posicaoDaCorda) => (
            <li key={corda.nome}>
              <CordaVibrante
                corda={corda}
                atraso={atrasoDoDedilhado + posicaoDaCorda * intervaloEntreCordas}
                aoTocar={tocarCorda}
              />
            </li>
          ))}
        </ul>
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {notasNoAr.map((nota) => (
            <motion.span
              key={nota.id}
              initial={{ opacity: 0, transform: 'translateY(0px) scale(0.6) rotate(-10deg)' }}
              animate={{ opacity: [0, 1, 1, 0], transform: 'translateY(-140px) scale(1.15) rotate(10deg)' }}
              transition={{ duration: duracaoDaNota, ease: 'easeOut' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-tampo px-3 py-1 font-titulo text-lg whitespace-nowrap text-jacaranda shadow-lg shadow-black/30"
              style={{ left: `${nota.posicaoHorizontal}%`, top: `${nota.posicaoVertical}%` }}
            >
              ♪ {nota.nomeDaCorda}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
