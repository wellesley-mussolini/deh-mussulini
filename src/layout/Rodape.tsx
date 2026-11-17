import IconeInstagram from '../components/icones/IconeInstagram'
import IconeWhatsapp from '../components/icones/IconeWhatsapp'
import { contatoDaDeh, linkDoWhatsapp } from '../constants/contato.constants'

const estiloDoContato = 'group flex items-center gap-3 text-corda transition-colors hover:text-tampo-claro'
const estiloDoCirculo =
  'grid size-11 shrink-0 place-items-center rounded-full border border-tampo/30 transition duration-300 group-hover:-rotate-6 group-hover:border-tampo group-hover:bg-tampo group-hover:text-jacaranda'

export default function Rodape() {
  return (
    <footer data-fundo="escuro" className="bg-jacaranda text-corda">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-titulo text-3xl text-tampo-claro">Deh Muss</p>
            <p className="mt-2 text-sm">Aulas de violão online</p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            <li>
              <a href={contatoDaDeh.instagram} target="_blank" rel="noopener noreferrer" className={estiloDoContato}>
                <span className={estiloDoCirculo}>
                  <IconeInstagram className="size-5" />
                </span>
                <span>
                  <span className="sr-only">Instagram </span>@deh.muss
                </span>
              </a>
            </li>
            <li>
              <a
                href={linkDoWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-chamada-whatsapp
                className={estiloDoContato}
              >
                <span className={estiloDoCirculo}>
                  <IconeWhatsapp className="size-5" />
                </span>
                <span>
                  <span className="sr-only">WhatsApp </span>
                  {contatoDaDeh.telefoneWhatsapp}
                </span>
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-10 border-t border-traste/15 pt-6 text-xs text-traste">
          © {new Date().getFullYear()} Deh Muss
        </p>
      </div>
    </footer>
  )
}
