import { describe, expect, test } from 'vitest'
import { resolveConfig } from 'vite'
import paginaInicial from '../../index.html?raw'

const enderecoDoSite = 'https://www.aulaviolaoparamulheres.com/'
const documentoDaPagina = new DOMParser().parseFromString(paginaInicial, 'text/html')

function lerAtributo(seletor: string, atributo: string) {
  const elemento = documentoDaPagina.querySelector(seletor)
  if (!elemento) throw new Error(`${seletor} não encontrado no index.html`)
  return elemento.getAttribute(atributo)
}

describe('endereço do site', () => {
  test('o link compartilhado no WhatsApp e no Instagram aponta para o domínio próprio', () => {
    expect(lerAtributo('meta[property="og:url"]', 'content')).toBe(enderecoDoSite)
    expect(lerAtributo('meta[property="og:image"]', 'content')).toBe(`${enderecoDoSite}compartilhamento.jpg`)
  })

  test('o ícone da aba sai da raiz do domínio', () => {
    expect(lerAtributo('link[rel="icon"]', 'href')).toBe('/palheta.svg')
  })

  // O Vitest força base '/' em import.meta.env.BASE_URL; só a configuração resolvida do build mostra o base real.
  test('o build publica os arquivos na raiz do domínio', async () => {
    const configuracaoDoBuild = await resolveConfig({ configFile: 'vite.config.ts', logLevel: 'silent' }, 'build')
    expect(configuracaoDoBuild.base).toBe('/')
  })
})
