'use client'

import { useEffect, useState } from "react"
import Card from "./Card"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store/store"
import { setLoadSort, setLoadFilter, setLoadPager } from "@/app/store/appSlice"
import { getProducts } from "@/options/fetches"
import { ProductType } from "@/options/types"

interface IGoodList {
  list: ProductType[]
  catID: number
  limit: number
  uri: string
}

const GoodList: React.FC<IGoodList> = ({ catID, limit, list, uri }) => {
  const [products, setProducts] = useState<ProductType[]>(list)
  const load = useSelector((state: RootState) => state.app.loadSort)
  const load2 = useSelector((state: RootState) => state.app.loadFilter)
  const load3 = useSelector((state: RootState) => state.app.loadPager)
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    const getData = async () => {
      const { products } = await getProducts(catID, uri, limit)
      setProducts(products)
      dispatch(setLoadFilter(false))
      dispatch(setLoadSort(false))
      dispatch(setLoadPager(false))
    }
    getData()
  }, [uri])
  
  return (
    <div className="goods-row">
      <div className="row">
        {products.map(el => <Card key={el.id} el={el} />)}
      </div>
      {products.length === 0 && <p>В данной категории нет товаров</p>}
    </div>
  )
}

export default GoodList