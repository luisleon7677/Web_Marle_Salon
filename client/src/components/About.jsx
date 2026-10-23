import { useRef } from 'react'

const VIDEO_URL = 'https://br-withered-tree-b5jjxkkj.storage.c-7.us-east-2.aws.neon.tech/marlestore/video.mp4'

export default function About() {
  const dialogRef = useRef(null)
  const videoRef = useRef(null)

  function openVideo() {
    videoRef.current.src = VIDEO_URL
    dialogRef.current.showModal()
    videoRef.current.play().catch(() => {})
  }

  function closeVideo() {
    dialogRef.current.close()
  }

  return (
    <>
    <section className="site-section" id="about-section">
      <div className="container">
        <div className="about-row">
          <div className="about-media">
            <img src="/images/about_1.jpg" alt="Conoce Marle Store" />
            <div className="experience">
              <span className="year">Llevando belleza</span>
              <span className="caption">a todo el Perú</span>
            </div>
          </div>
          <div>
            <h3 className="section-sub-title">Marle Store</h3>
            <h2 className="section-title mb-3">Nosotros</h2>
            <p className="mb-4">
            En Marle Store nos dedicamos a la venta de productos capilares de alta calidad y ofrecemos servicios profesionales en nuestro salón de belleza. Somos distribuidores autorizados de las mejores marcas para el cuidado y la belleza del cabello.
            </p>
            <p>
              <button type="button" className="btn btn-black btn-black--hover rounded-0" onClick={openVideo}>
                Conoce más
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
    <dialog ref={dialogRef} className="about-video-dialog" aria-label="Video de Marle Store" onClose={() => {
      videoRef.current.pause()
      videoRef.current.removeAttribute('src')
      videoRef.current.load()
    }} onClick={(event) => {
      if (event.target === event.currentTarget) closeVideo()
    }}>
      <button type="button" className="about-video-close" onClick={closeVideo} aria-label="Cerrar video">×</button>
      <video ref={videoRef} controls playsInline preload="none" />
    </dialog>
    </>
  )
}
