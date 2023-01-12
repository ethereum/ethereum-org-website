import React from "react"
import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import Translation from "./Translation"

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-left: 0.5rem;

  &:first-child {
    margin-left: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    margin-left: 1rem;
  }
`

const Cell = styled.div<{ color?: string }>`
  border: 1px solid ${({ theme, color }) => (color ? color : theme.colors.text)};
  color: ${({ theme, color }) => (color ? color : theme.colors.text)};
  padding: 0.8rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;

  &:last-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  &:nth-child(-n + 2) {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 0.8rem 1.2rem;
  }
`

const ColumnName = styled(Cell)`
  border: 0;
  padding-top: 1.5rem;
`

interface IProps {}

const AdoptionChart: React.FC<IProps> = () => {
  const { isDark } = useTheme()

  return (
    <Container>
      <Column>
        <ColumnName>2010</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          <Translation id="adoption-chart-investors-label" />
        </Cell>
      </Column>

      <Column>
        <ColumnName>2014</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          <Translation id="adoption-chart-investors-label" />
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          <Translation id="adoption-chart-developers-label" />
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          <Translation id="adoption-chart-companies-label" />
        </Cell>
      </Column>

      <Column>
        <ColumnName>
          <Translation id="adoption-chart-column-now-label" />
        </ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          <Translation id="adoption-chart-investors-label" />
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          <Translation id="adoption-chart-developers-label" />
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          <Translation id="adoption-chart-companies-label" />
        </Cell>
        <Cell color={isDark ? "#8EA8CA" : "#5E7492"}>
          <Translation id="adoption-chart-artists-label" />
        </Cell>
        <Cell color={isDark ? "#AC85C2" : "#88669B"}>
          <Translation id="adoption-chart-musicians-label" />
        </Cell>
        <Cell color={isDark ? "#CA928E" : "#985955"}>
          <Translation id="adoption-chart-writers-label" />
        </Cell>
        <Cell color={isDark ? "#B9B9B9" : "#9E9E9E"}>
          <Translation id="adoption-chart-gamers-label" />
        </Cell>
        <Cell color={isDark ? "#E2B79E" : "#E78A54"}>
          <Translation id="adoption-chart-refugees-label" />
        </Cell>
      </Column>
    </Container>
  )
}

export default AdoptionChart
