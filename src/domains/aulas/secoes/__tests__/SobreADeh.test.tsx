import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import SobreADeh from '../SobreADeh'

const espacoInquebravel = String.fromCharCode(0xa0)
const espacoDeLarguraZero = String.fromCharCode(0x200b)

describe('SobreADeh', () => {
  // O SVG descarta o espaço comum no fim do texto, e o textLength só reparte folga entre
  // caracteres vizinhos. No selo circular o fim encosta no começo, então a estrela colava em "Formada".
  test('o selo da UFMG deixa a estrela com o mesmo respiro dos dois lados onde o círculo fecha', () => {
    const { container } = render(<SobreADeh />)

    const textoDoSelo = container.querySelector('textPath')?.textContent

    expect(textoDoSelo).toBe(
      `Formada em Música pela UFMG${espacoInquebravel}✦${espacoInquebravel}${espacoDeLarguraZero}`,
    )
  })
})
