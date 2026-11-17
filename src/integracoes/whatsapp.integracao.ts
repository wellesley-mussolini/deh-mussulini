import { textoUtils } from '../utils/texto.utils'

// Formato de link de conversa definido pelo WhatsApp: https://wa.me/<número com código do país>?text=<mensagem>
// (https://faq.whatsapp.com/5913398998672934).
export const whatsappIntegracao = {
  montarLinkDeConversa: (telefone: string, mensagem: string) => {
    const digitos = textoUtils.extrairDigitos(telefone)
    if (digitos.length === 0) {
      throw new Error(`Telefone sem dígitos para o link do WhatsApp: "${telefone}"`)
    }
    return `https://wa.me/${digitos}?text=${encodeURIComponent(mensagem)}`
  },
}
