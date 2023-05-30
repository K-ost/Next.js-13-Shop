import { NextPage } from "next"
import { BreadCrumbsType } from "@/options/types"
import BreadCrumbs from "../components/BreadCrumbs"

const crumbs: BreadCrumbsType[] = [
  { name: "Контакты", slug: "contacts" }
]

const Contacts: NextPage = () => {
  return (
    <div>
      <BreadCrumbs list={crumbs} />
      <h1>Контакты</h1>
    </div>
  )
}

export default Contacts