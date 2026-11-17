import { describe, expect, test } from 'vitest'
import { textoUtils } from '../texto.utils'

describe('textoUtils.extrairDigitos', () => {
  test('mantém só os dígitos, na ordem em que aparecem', () => {
    expect(textoUtils.extrairDigitos('+55 (31) 7132-3439')).toBe('553171323439')
  })

  test('devolve texto vazio quando não há dígitos', () => {
    expect(textoUtils.extrairDigitos('sem número')).toBe('')
  })
})
