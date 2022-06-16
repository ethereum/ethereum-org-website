import styled from "styled-components"

import PageHero from "../../components/PageHero"
import OriginalCard from "../../components/Card"

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const HeroBackground = styled.div`
  background: ${(props) => props.theme.colors.layer2Gradient};
`

export const HeroContainer = styled.div``

export const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

export const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

export const InfoColumn = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 330px;
  margin: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

export const InfoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: left;
    font-size: 2.5rem
    display: none;
  }
`

export const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.l};
  position: relative;
  padding: 2rem;
  padding-top: 0rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
    h2:first-of-type {
      margin-top: 0;
    }
  }

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
`
export const Card = styled(OriginalCard)`
  border-radius: 10px;
  justify-content: space-between;
  h3 {
    margin-top: 0;
  }
`

export const CardGradient = styled(Card)`
  justify-content: start;
  background: ${(props) => props.theme.colors.cardGradient};

  ul {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-bottom: 0;
  }
`

export const Center = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DocsContainer = styled.div`
  margin: 0 135px;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0;
  }
`

export const AdditionalReadingHeader = styled.h4`
  margin-top: 40px;
  font-weight: 700;
  text-align: center;
`

export const Banner = styled.div`
  margin: 50px 0;
  display: flex;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.cardGradient};

  h3 {
    margin-top: 0;
  }

  ul {
    margin-bottom: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-flow: column nowrap;
  }
`

export const BannerBody = styled.div`
  padding: 40px;
`

export const BannerImage = styled.div`
  align-self: end;
`

export const Section = styled.section`
  margin-top: 100px;
  &:first-child {
    margin-top: 0;
  }
`
