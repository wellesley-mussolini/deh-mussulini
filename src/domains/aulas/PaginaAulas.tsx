import Abertura from './secoes/Abertura'
import ComoSaoAsAulas from './secoes/ComoSaoAsAulas'
import FaixaDeDestaques from './secoes/FaixaDeDestaques'
import SobreADeh from './secoes/SobreADeh'
import CaminhoDoAluno from './secoes/CaminhoDoAluno'
import Duvidas from './secoes/Duvidas'
import ChamadaFinal from './secoes/ChamadaFinal'
import type { PropriedadesDaPaginaAulas } from './aulas.types'

export default function PaginaAulas({ siteRevelado }: PropriedadesDaPaginaAulas) {
  return (
    <main>
      {/* A abertura monta só quando a boca do violão abre: a sequência de animações dela começa nesse instante. */}
      {siteRevelado ? <Abertura /> : <div aria-hidden="true" className="min-h-svh bg-jacaranda" />}
      <ComoSaoAsAulas />
      <FaixaDeDestaques />
      <SobreADeh />
      <CaminhoDoAluno />
      <Duvidas />
      <ChamadaFinal />
    </main>
  )
}
