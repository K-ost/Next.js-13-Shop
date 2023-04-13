import { attrType, featPackType, NavItemType, packType, SortItemType } from "./types"

export const serverURL = 'http://localhost:5000'
export const url_cats = `${serverURL}/categories`
export const url_products = `${serverURL}/products`
export const url_features = `${serverURL}/features`
export const url_packages = `${serverURL}/packages`

// CATEGORY PAGE
// get category
export async function getCat(slug: string) {
  const response = await fetch(`${url_cats}?slug=${slug}`, { cache: 'no-cache' })
  const data = await response.json()
  return data[0]
}

// get parent category
export async function getParentCat(id: number) {
  const response = await fetch(`${url_cats}?id=${id}`, { cache: 'no-cache' })
  const data = await response.json()
  return data[0]
}

// get sub categories
export async function getSubcats(id: number) {
  const response = await fetch(`${url_cats}?parentID=${id}`, { cache: 'no-cache' })
  const data = await response.json()
  return data
}

// getProducts of category
export async function getProducts(id: number, uri: string, limit: number) {
  const response = await fetch(`${url_products}?category_like=${id}${uri}&_limit=${limit}`, {
    cache: 'no-cache'
  })
  const total = response.headers.get('X-Total-Count')
  const data = await response.json()
  return { data, total }
}


// PRODUCT PAGE
// get product
export async function getProduct(slug: string) {
  const response = await fetch(`${url_products}?slug=${slug}`, { cache: 'no-cache' })
  const data = await response.json()
  return data[0]
}

// get category for product
export async function getCatForProduct(cats: number[]) {
  const uri = cats.map(el => `id=${el}`).join('&')
  const response = await fetch(`${url_cats}?${uri}`, { cache: 'no-cache' })
  const data = await response.json()
  return data
}

// get keys of attributes of product
export async function getAttributes(arr: number[]) {
  const uri = arr.map(el => `id=${el}`).join('&')
  const response = await fetch(`${url_features}?${uri}`)
  const data = await response.json()
  return data
}

// get packages of product
export async function getPackages(arr: packType[]) {
  const uri = arr.map(el => `id=${el.packID}`).join('&')
  const response = await fetch(`${url_packages}?${uri}`)
  const data = await response.json()
  return data
}


// Debounce
export function debounce(cb: any, delay: number) {
  let timeout: any
  return function(...args: any) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}


// create Attributes
export function createAttributes(keys: featPackType[], feats: attrType[]): featPackType[] {
  const output = keys.map(el => {
    const val = feats.find(attr => attr.featuresID === el.id)?.value
    el['value'] = val
    return el
  })
  return output
}


// SortItems
export const SortItems: SortItemType[] = [
  { name: 'От дешевых', value: 'price-asc' },
  { name: 'От дорогих', value: 'price-desc' },
  { name: 'По алфавиту [А-Я]', value: 'title-asc' },
  { name: 'По алфавиту [Я-А]', value: 'title-desc' }
]

// navItems
export const navItems: NavItemType[] = [
  { id: 1, title: "Главная", path: "/" },
  { id: 2, title: "Блог", path: "/blog" },
  { id: 3, title: "О компании", path: "/about" },
  { id: 4, title: "Доставка и оплата", path: "/about" },
  { id: 5, title: "Контакты", path: "/contacts" },
]