import IconeWhatsapp from './icones/IconeWhatsapp'
import { linkDoWhatsapp } from '../constants/contato.constants'
import type { AparenciaDoBotao, PropriedadesDoBotaoWhatsapp, TamanhoDoBotao } from './botaoWhatsapp.types'

const coresPorAparencia: Record<AparenciaDoBotao, string> = {
  roseta: 'bg-roseta text-tampo-claro hover:bg-roseta-escuro',
  tampo: 'bg-tampo-claro text-jacaranda hover:bg-white',
}

const medidasPorTamanho: Record<TamanhoDoBotao, string> = {
  compacto: 'gap-2 px-4 py-2 text-sm',
  grande: 'gap-3 px-7 py-4 text-lg',
}

// Uma ação, um nome: o botão é dono do rótulo, e nenhuma seção inventa outro nome para a mesma conversa.
const rotulosPorTamanho: Record<TamanhoDoBotao, string> = {
  compacto: 'WhatsApp',
  grande: 'Chamar a Deh no WhatsApp',
}

export default function BotaoWhatsapp({
  aparencia = 'roseta',
  tamanho = 'grande',
  comBrilho = false,
}: PropriedadesDoBotaoWhatsapp) {
  return (
    <a
      href={linkDoWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-chamada-whatsapp
      className={`group relative isolate inline-flex items-center overflow-hidden rounded-full font-semibold shadow-lg shadow-jacaranda/20 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${coresPorAparencia[aparencia]} ${medidasPorTamanho[tamanho]}`}
    >
      {comBrilho && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 animate-brilho bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />
      )}
      <IconeWhatsapp className="size-[1.2em] transition-transform duration-300 group-hover:-rotate-12" />
      {rotulosPorTamanho[tamanho]}
    </a>
  )
}
