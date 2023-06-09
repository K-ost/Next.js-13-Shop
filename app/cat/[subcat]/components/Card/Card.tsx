import AddCart from "@/app/components/AddCart"
import Packages from "@/app/components/Packages/Packages"
import { usePriceImg } from "@/app/components/price.hook"
import Tag from "@/app/components/Tag/Tag"
import { RootState } from "@/app/store/store"
import { set_currency } from "@/options/settings"
import { ProductType } from "@/options/types"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import styles from './Card.module.scss'

interface ICard {
  el: ProductType
  slide?: boolean
}

const Card: React.FC<ICard> = ({ el, slide }) => {
  const view = useSelector((state: RootState) => state.app.view)
  const classGrid = `col-12 col-sm-6 col-md-4 ${styles.goodGrid}`
  const classList = `col-12 ${styles.goodList}`
  const parentClass = (view === 'list') ? classList : classGrid

  const { choosePack, img, price, oldprice, currentPack } = usePriceImg(el.relatedPacks)

  // isSale
  const isSale = el.relatedPacks.some(el => el.oldPrice !== null)

  return (
    <div className={!slide ? parentClass : ''}>
      <div className={styles.good}>
        <div className={styles.goodTop}>
          <div className={styles.goodImage}>
            <Link href={`/product/${el.slug}`}>
              <Image src={img} alt="" height={120} width={140} />
            </Link>
          </div>
          <div className={styles.goodDetails}>
            <div className={styles.goodTitle}>
              <Link href={`/product/${el.slug}`}>{el.title}</Link>
              <div className={styles.goodIcons}>
                {el.hit && <Tag type='hit' />}
                {isSale && <Tag type='sale' />}
                {el.new && <Tag type='new' />}
              </div>
            </div>
            <div className={styles.goodPrice}>
              {price} <small>{set_currency}</small>

              {oldprice && <div className={styles.goodOldPrice}>
                {oldprice} <small>{set_currency}</small>
              </div>}
            </div>
            <div className={styles.goodPack}>
              <Packages goodID={el.id} handler={choosePack} packs={el.relatedPacks} />
            </div>
          </div>
        </div>
        <div className={styles.goodBottom}>
          <AddCart el={el} img={img} pack={currentPack} price={price} />
        </div>
      </div>
    </div>
  )
}

export default Card