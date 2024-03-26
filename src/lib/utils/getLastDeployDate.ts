import published from "@/data/published.json"

export const getLastDeployDate = () => new Date(published.date).toISOString()
