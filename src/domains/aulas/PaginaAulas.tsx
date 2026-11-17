import Abertura from './secoes/Abertura'
import ComoSaoAsAulas from './secoes/ComoSaoAsAulas'
import FaixaDeDestaques from './secoes/FaixaDeDestaques'
import SobreADeh from './secoes/SobreADeh'
import CaminhoDoAluno from './secoes/CaminhoDoAluno'
import Duvidas from './secoes/Duvidas'
import ChamadaFinal from './secoes/ChamadaFinal'

export default function PaginaAulas() {
  return (
    <main>
      <Abertura />
      <ComoSaoAsAulas />
      <FaixaDeDestaques />
      <SobreADeh />
      <CaminhoDoAluno />
      <Duvidas />
      <ChamadaFinal />
    </main>
  )
}
