import { useEffect, useRef, useState } from 'react'
import { cordasDoViolao, duracaoDaNota } from '../violao.constants'
import { somDoViolaoService } from '../services/somDoViolao.service'
import type { CordaDoViolao, NotaNoAr } from '../aulas.types'

export function useCordasTocadas() {
  const contextoDeAudio = useRef<AudioContext | null>(null)
  const contadorDeNotas = useRef(0)
  const remocoesPendentes = useRef(new Set<ReturnType<typeof setTimeout>>())
  const [notasNoAr, setNotasNoAr] = useState<NotaNoAr[]>([])

  useEffect(() => {
    const remocoes = remocoesPendentes.current
    return () => {
      remocoes.forEach(clearTimeout)
      remocoes.clear()
      void contextoDeAudio.current?.close()
      contextoDeAudio.current = null
    }
  }, [])

  // A nota sai da tela por temporizador, não pelo fim da animação: com a aba em segundo plano
  // o navegador pausa as animações e as notas se acumulariam.
  const agendarRemocaoDaNota = (idDaNota: number) => {
    const remocao = setTimeout(() => {
      remocoesPendentes.current.delete(remocao)
      setNotasNoAr((notasAtuais) => notasAtuais.filter((nota) => nota.id !== idDaNota))
    }, duracaoDaNota * 1000)
    remocoesPendentes.current.add(remocao)
  }

  const tocarCorda = (corda: CordaDoViolao, pontoTocado: number) => {
    // O navegador só libera áudio depois de um gesto do visitante, então o contexto nasce no primeiro toque.
    contextoDeAudio.current ??= new AudioContext()
    if (contextoDeAudio.current.state === 'suspended') {
      void contextoDeAudio.current.resume()
    }
    somDoViolaoService.tocarNota(contextoDeAudio.current, corda.frequencia)

    contadorDeNotas.current += 1
    const notaNova: NotaNoAr = {
      id: contadorDeNotas.current,
      nomeDaCorda: corda.nome,
      posicaoHorizontal: pontoTocado,
      posicaoVertical: ((cordasDoViolao.indexOf(corda) + 0.5) / cordasDoViolao.length) * 100,
    }
    setNotasNoAr((notasAtuais) => [...notasAtuais, notaNova])
    agendarRemocaoDaNota(notaNova.id)
  }

  return { notasNoAr, tocarCorda }
}
