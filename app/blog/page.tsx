import { getBlogs } from "@/options/helpers"
import { BreadCrumbsType } from "@/options/types"
import BreadCrumbs from "../components/BreadCrumbs"
import Loadmore from "../components/Loadmore"
import BlogList from "./components/BlogList"

let crumbs: BreadCrumbsType[] = [
  { name: "Блог", slug: "blog" }
]

export default async function Blog({ searchParams }: { searchParams: any }) {
  const limitPosts = 3
  const uri = Object.entries(searchParams)
  let newUri = uri.map(el => '&' + el.join('=')).join('')
  const data = await getBlogs(limitPosts, newUri)

  console.log(data)
  

  return (
    <div>
      <BreadCrumbs list={crumbs} />
      <h1>Блог</h1>
      <BlogList list={[]} limit={limitPosts} />
      {/* <Loadmore pages={limitPosts} all={total!} /> */}
    </div>
  )
}
