import { BreadCrumbsType } from "@/options/types"
import BreadCrumbs from "../components/BreadCrumbs"

let crumbs: BreadCrumbsType[] = [
  { name: "Блог", slug: "blog" }
]

export default function Blog() {
  return (
    <div>
      <BreadCrumbs list={crumbs} />
      <h1>Блог</h1>
    </div>
  )
}
