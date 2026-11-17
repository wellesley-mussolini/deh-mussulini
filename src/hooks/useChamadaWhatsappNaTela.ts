import { useEffect, useState } from 'react'

// Diz se alguma chamada de WhatsApp marcada com data-chamada-whatsapp está na tela. As chamadas são
// lidas na montagem: a da abertura nasce depois (tela de carregamento), mas ali o botão flutuante
// já fica escondido pela regra de rolagem.
export function useChamadaWhatsappNaTela() {
  const [chamadasNaTela, setChamadasNaTela] = useState(0)

  useEffect(() => {
    const chamadasVisiveis = new Set<Element>()
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) chamadasVisiveis.add(target)
        else chamadasVisiveis.delete(target)
      })
      setChamadasNaTela(chamadasVisiveis.size)
    })
    document.querySelectorAll('[data-chamada-whatsapp]').forEach((chamada) => observador.observe(chamada))
    return () => observador.disconnect()
  }, [])

  return chamadasNaTela > 0
}
