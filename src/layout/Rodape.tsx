import { contatoDaDeh, linkDoWhatsapp } from '../constants/contato.constants'

export default function Rodape() {
  return (
    <footer data-fundo="escuro" className="bg-jacaranda text-corda">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-titulo text-2xl text-tampo-claro">Deh Mussulini</p>
          <p className="mt-1 text-sm">Aulas de violão</p>
        </div>
        <div className="flex flex-col gap-1 text-sm sm:items-end">
          <a
            href={linkDoWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-tampo-claro hover:underline"
          >
            WhatsApp {contatoDaDeh.telefoneWhatsapp}
          </a>
          <a
            href={contatoDaDeh.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-tampo-claro hover:underline"
          >
            Instagram @deh.muss
          </a>
          <p className="text-traste">© {new Date().getFullYear()} Deh Mussulini</p>
        </div>
      </div>
    </footer>
  )
}
