import { destaques } from '../conteudo.constants'

// A faixa repete a lista duas vezes: quando a primeira cópia sai pela esquerda,
// a segunda ocupa o mesmo lugar e o laço da animação fica sem emenda.
const copiasDaFaixa = [{ copiaRepetida: false }, { copiaRepetida: true }]

export default function FaixaDeDestaques() {
  return (
    <section aria-label="Destaques das aulas" className="overflow-hidden bg-tampo py-6">
      <div className="-mx-4 -rotate-2 bg-roseta py-6 shadow-xl shadow-jacaranda/20">
        <div className="flex w-max animate-faixa">
          {copiasDaFaixa.map(({ copiaRepetida }) => (
            <ul
              key={String(copiaRepetida)}
              aria-hidden={copiaRepetida || undefined}
              className="flex shrink-0 items-center"
            >
              {destaques.map((destaque) => (
                <li
                  key={destaque}
                  className="flex items-center gap-10 pr-10 font-titulo text-3xl whitespace-nowrap text-tampo-claro sm:text-5xl"
                >
                  {destaque}
                  <span aria-hidden="true" className="size-3 rounded-full bg-tampo/60" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
