import { DappData } from "@/lib/types"

const DappCard = ({ dapp }: { dapp: DappData }) => {
  return <div>{dapp.name}</div>
}

export default DappCard
