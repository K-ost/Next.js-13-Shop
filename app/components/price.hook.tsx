import { url_packages } from "@/options/helpers"
import { featPackType, packType } from "@/options/types"
import { useEffect, useState } from "react"

interface usePriceImgType {
  img: string
  price: number
  choosePack: (id: number, name: string) => void
  currentPack: string
  packNames: featPackType[]
}

export const usePriceImg = ({ packs }: { packs: packType[] }): usePriceImgType => {
  const [img, setImg] = useState<string>(packs[0].img)
  const [price, setPrice] = useState<number>(packs[0].price)
  const [currentPackID, setCurrentPackID] = useState<number>(packs[0].packID)
  const [packNames, setPackNames] = useState<featPackType[]>([])
  const [currentPack, setCurrentPack] = useState<string>('')

  // ID of packages
  const packIDs: string = packs.map(el => `id=${el.packID}`).join('&')

  useEffect(() => {
    const findedPack = packs.find(el => el.packID === currentPackID)
    setImg(findedPack!.img)
    setPrice(findedPack!.price)
  }, [currentPackID])

  useEffect(() => {
    fetch(`${url_packages}?${packIDs}`)
      .then(response => response.json())
      .then(data => {
        setPackNames(data)
        setCurrentPack(data[0].name)
      })
  }, [])

  // choosePack
  const choosePack = (id: number, name: string) => {
    setCurrentPackID(id)
    setCurrentPack(name)
  }

  return {
    img, price, choosePack, currentPack, packNames
  }
}