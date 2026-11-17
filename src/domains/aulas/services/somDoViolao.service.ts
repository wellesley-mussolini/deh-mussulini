import { duracaoDaNota } from '../violao.constants'

const volumeDoAtaque = 0.3
// Rampa exponencial não aceita zero: este é o "silêncio" audível mais próximo.
const volumeDeSilencio = 0.0001

export const somDoViolaoService = {
  tocarNota: (contextoDeAudio: AudioContext, frequencia: number) => {
    const inicio = contextoDeAudio.currentTime
    const fim = inicio + duracaoDaNota

    const oscilador = contextoDeAudio.createOscillator()
    oscilador.type = 'triangle'
    oscilador.frequency.value = frequencia

    // O filtro fecha ao longo da nota: o brilho do ataque some como numa corda de náilon.
    const filtroDeBrilho = contextoDeAudio.createBiquadFilter()
    filtroDeBrilho.type = 'lowpass'
    filtroDeBrilho.frequency.setValueAtTime(frequencia * 8, inicio)
    filtroDeBrilho.frequency.exponentialRampToValueAtTime(frequencia * 1.5, fim)

    const volume = contextoDeAudio.createGain()
    volume.gain.setValueAtTime(volumeDeSilencio, inicio)
    volume.gain.exponentialRampToValueAtTime(volumeDoAtaque, inicio + 0.008)
    volume.gain.exponentialRampToValueAtTime(volumeDeSilencio, fim)

    oscilador.connect(filtroDeBrilho).connect(volume).connect(contextoDeAudio.destination)
    oscilador.start(inicio)
    oscilador.stop(fim)
  },
}
