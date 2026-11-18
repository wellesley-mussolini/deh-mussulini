import { describe, expect, test } from 'vitest'
import paginaInicial from '../../index.html?raw'

const enderecoDoSite = 'https://dehmuss.com/'

function lerAtributo(seletor: string, atributo: string) {
  const elemento = new DOMParser().parseFromString(paginaInicial, 'text/html').querySelector(seletor)
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
})
