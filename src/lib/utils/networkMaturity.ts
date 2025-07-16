const getMaturityPoints = (l2beatData) => {
  const data = l2beatData.risks.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: curr.sentiment,
    }
  }, {})

  let maturityPoints = 0

  if (data["Sequencer Failure"] === "good") {
    maturityPoints += 1
  }

  if (data["Sequencer Failure"] === "warning") {
    maturityPoints += 0.5
  }

  if (data["State Validation"] === "good") {
    maturityPoints += 1
  }

  if (data["State Validation"] === "warning") {
    maturityPoints += 0.5
  }

  if (data["Data Availability"] === "good") {
    maturityPoints += 1
  }

  if (data["Exit Window"] === "good") {
    maturityPoints += 1
  }

  if (data["Exit Window"] === "warning") {
    maturityPoints += 0.5
  }

  if (data["Proposer Failure"] === "good") {
    maturityPoints += 1
  }

  if (data["Proposer Failure"] === "warning") {
    maturityPoints += 0.5
  }

  return maturityPoints
}

export const networkMaturity = (l2beatData) => {
  const maturityPoints = getMaturityPoints(l2beatData)

  if (
    maturityPoints >= 5 &&
    l2beatData.stage === "Stage 2" &&
    l2beatData.tvl.total > 1000000000
  ) {
    return "robust"
  }

  if (
    maturityPoints >= 3 &&
    (l2beatData.stage === "Stage 2" || l2beatData.stage === "Stage 1")
  ) {
    return "maturing"
  }

  if (maturityPoints >= 3) {
    return "developing"
  }

  return "emerging"
}
