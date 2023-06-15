'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import styles from './Carousel.module.scss'
import { ProductType } from '@/options/types'
import Card from '@/app/cat/[subcat]/components/Card'

interface ICarousel {
  list: ProductType[]
  title: string
  view?: number
}

const Carousel: React.FC<ICarousel> = ({ list, title, view = 4 }) => {
  
  if (!list.length) {
    return null
  }

  return (
    <div className={styles.carouselBody}>
      <div className={styles.carouselTitle}>{title}</div>

      <Swiper
        spaceBetween={20}
        slidesPerView={view}
        pagination={true}
      >
        {list.map(el => (
          <SwiperSlide key={el.id}>
            <Card el={el} slide />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}

export default Carousel