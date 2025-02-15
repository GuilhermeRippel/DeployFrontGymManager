import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Pagination, Autoplay } from 'swiper/modules'
import ImagemCarrosel from '../../assets/img/ImagemCarrosel_Main.jpg'
import ImagemCarrosel2 from '../../assets/img/ImagemCarrosel2_Main.jpg'
import ImagemCarrosel3 from '../../assets/img/ImagemCarrosel3_Main.jpg'
import ImagemCarrosel4 from '../../assets/img/ImagemCarrosel4_Main.jpg'

interface className {
  style: string;
}

function ImageGalery({ style }: className) {
  return (
    <div className={style}>
      <Swiper
        modules={[ Pagination, Autoplay]}
        direction="horizontal"
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full flex items-center justify-center rounded-2xl border-2 border-black"
      >
        <SwiperSlide>
          <img
            src={ImagemCarrosel}
            alt="Imagem 1"
            className="w-full h-full object-cover rounded-xl aspect-video"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={ImagemCarrosel2}
            alt="Imagem 2"
            className="w-full h-full object-cover rounded-xl aspect-video"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={ImagemCarrosel3}
            alt="Imagem 3"
            className="w-full h-full object-cover rounded-xl aspect-video"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={ImagemCarrosel4}
            alt="Imagem 4"
            className="w-full h-full object-cover rounded-xl aspect-video"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageGalery;
