import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import BotaoWhatsapp from '../components/BotaoWhatsapp'
import { itensDoMenu } from '../constants/navegacao.constants'

const rolagemParaFixarFundo = 40

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [paginaRolada, setPaginaRolada] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progressoDaLeitura = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useMotionValueEvent(scrollY, 'change', (posicaoVertical) => {
    setPaginaRolada(posicaoVertical > rolagemParaFixarFundo)
  })

  const fecharMenu = () => setMenuAberto(false)

  return (
    <header
      data-fundo="escuro"
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        paginaRolada || menuAberto ? 'bg-jacaranda/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <a href="#inicio" className="font-titulo text-xl text-tampo-claro">
          Deh Mussulini
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label="Navegação principal" className="flex items-center gap-8">
            {itensDoMenu.map((secao) => (
              <a
                key={secao.ancora}
                href={`#${secao.ancora}`}
                className="relative text-sm font-medium text-corda transition-colors hover:text-tampo-claro after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-tampo after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {secao.rotulo}
              </a>
            ))}
          </nav>
          <BotaoWhatsapp tamanho="compacto">WhatsApp</BotaoWhatsapp>
        </div>

        <button
          type="button"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-expanded={menuAberto}
          aria-controls="menu-do-celular"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          className="grid size-11 place-items-center rounded-full text-tampo-claro md:hidden"
        >
          {menuAberto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.nav
            id="menu-do-celular"
            aria-label="Menu do celular"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-corda/15 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pt-3 pb-6">
              {itensDoMenu.map((secao, posicao) => (
                <motion.li
                  key={secao.ancora}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * posicao + 0.1 }}
                >
                  <a
                    href={`#${secao.ancora}`}
                    onClick={fecharMenu}
                    className="block py-3 font-titulo text-2xl text-tampo-claro"
                  >
                    {secao.rotulo}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressoDaLeitura }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-tampo"
      />
    </header>
  )
}
