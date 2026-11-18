import { useEffect, useState } from 'react'
import {
  animacaoDeEntradaNaBoca,
  animacaoDeSaida,
  idDaTelaDeCarregamento,
  tempoMinimoNaTelaMs,
} from '../constants/carregamento.constants'

const decodificarImagem = (endereco: string) => {
  const imagem = new Image()
  imagem.src = endereco
  return imagem.decode()
}

const esperar = (milissegundos: number) => new Promise((concluir) => setTimeout(concluir, milissegundos))

// A tela de carregamento nasce no index.html (aparece antes do JS) e este hook conduz a saída:
// espera fontes e fotos da abertura ficarem prontas, abre a boca do violão e só então revela o site,
// para a sequência de animações da abertura começar com o navegador livre.
export function useCarregamentoDoSite(imagensEssenciais: readonly string[]) {
  const [telaDeCarregamento] = useState(() => document.getElementById(idDaTelaDeCarregamento))
  const [siteRevelado, setSiteRevelado] = useState(telaDeCarregamento === null)

  useEffect(() => {
    if (!telaDeCarregamento) return
    const desmontagem = new AbortController()

    // allSettled: uma foto que falha ao decodificar aparece quebrada no site, mas não prende o visitante aqui.
    void Promise.allSettled([
      document.fonts.ready,
      ...imagensEssenciais.map(decodificarImagem),
      esperar(Math.max(0, tempoMinimoNaTelaMs - performance.now())),
    ]).then(() => {
      if (!desmontagem.signal.aborted) telaDeCarregamento.classList.add('revelando')
    })

    telaDeCarregamento.addEventListener(
      'animationend',
      (evento) => {
        if (evento.animationName === animacaoDeEntradaNaBoca) {
          setSiteRevelado(true)
          telaDeCarregamento.classList.add('sumindo')
          document.documentElement.classList.remove('carregando')
        }
        if (evento.animationName === animacaoDeSaida) telaDeCarregamento.remove()
      },
      { signal: desmontagem.signal },
    )

    return () => desmontagem.abort()
  }, [telaDeCarregamento, imagensEssenciais])

  return siteRevelado
}
