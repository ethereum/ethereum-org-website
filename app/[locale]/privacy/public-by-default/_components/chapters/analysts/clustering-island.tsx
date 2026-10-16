"use client"

import WalletClusteringGraphLazy from "@/components/PrivacyWidgets/WalletClusteringGraph/lazy"

import { persona } from "@/data/privacy-lesson/persona"

import { useLesson } from "../../lesson-provider"

/** The clustering widget in lesson mode, feeding the dossier */
const ClusteringIsland = () => {
  const { collect } = useLesson()
  return (
    <WalletClusteringGraphLazy
      variant="lesson"
      ensName={persona.ens}
      onCollect={(ids) => collect(...ids)}
    />
  )
}

export default ClusteringIsland
