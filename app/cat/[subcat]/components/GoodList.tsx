'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Card from "./Card"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store/store"
import { setLoadSort, setLoadFilter, setLoadPager } from "@/app/store/appSlice"
import { url_products } from "@/options/fetches"
import { ProductType } from "@/options/types"

interface IGoodList {
  list: ProductType[]
  catID: number
  limit: number
}

const GoodList: React.FC<IGoodList> = ({ catID, limit, list }) => {
  const [products, setProducts] = useState<ProductType[]>(list)
  const load = useSelector((state: RootState) => state.app.loadSort)
  const load2 = useSelector((state: RootState) => state.app.loadFilter)
  const load3 = useSelector((state: RootState) => state.app.loadPager)
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()

  // Search params
  const searchURI = searchParams.toString()
  const isLimit = searchURI.includes('limit')
  const isOrder = searchURI.includes('ordering')
  
  const uriLimit = isLimit ? `limit=${searchParams.get('limit')}` : `limit=${limit}`
  const uriOrder = isOrder ? `ordering=${searchParams.get('ordering')}` : `ordering=-id`
  

  useEffect(() => {
    fetch(`${url_products}?categories=${catID}&${uriLimit}&${uriOrder}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.results)
        dispatch(setLoadFilter(false))
        dispatch(setLoadSort(false))
        dispatch(setLoadPager(false))
      })
  }, [searchURI])
  
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