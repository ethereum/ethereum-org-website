import styled from "styled-components"

export const PageContainer = styled.div`
  width: 85vw;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding-top: 6rem;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 10rem;
  }
`
