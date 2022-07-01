import styled from "styled-components"

export const Banner = styled.div`
  width: 100%;
  display: flex;
  background: ${(props) => props.theme.colors.bannerGridGradient};

  h2 {
    margin-top: 0;
  }

  ul {
    margin-bottom: 0;
  }

  flex-flow: column nowrap;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    flex-flow: row nowrap;
  }
`

export const BannerBody = styled.div`
  flex: 4;
  padding: 40px;
`

export const BannerImage = styled.div`
  display: flex;
  justify-content: end;
  flex: 2;
  align-self: end;
`

export const BannerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`

export const BannerGridCell = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;

  border-top: 1px solid ${({ theme }) => theme.colors.searchBackground};

  border-left: none;
  &:first-child {
    border-top: none;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    border-left: 1px solid ${({ theme }) => theme.colors.searchBackground};
    &:nth-child(-n + 2) {
      border-top: none;
    }
    &:nth-child(2n + 1) {
      border-left: none;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    &:nth-child(-n + 2) {
      border-top: 1px solid ${({ theme }) => theme.colors.searchBackground};
    }
    &:nth-child(2n + 1) {
      border-left: 1px solid ${({ theme }) => theme.colors.searchBackground};
    }

    &:nth-child(-n + 3) {
      border-top: none;
      justify-content: start;
      padding-top: 0;
    }
    &:first-child,
    &:nth-child(3n + 1) {
      padding-left: 0;
      border-left: none;
    }
    &:nth-child(n + 4) {
      justify-content: start;
      padding-bottom: 0;
    }
  }
`
