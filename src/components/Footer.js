import React from "react"
import styled from "styled-components"

// const linkSections = ({ langVersion, langPath }) => {
//   const contentVersion = translate('version', this.$lang)
//   const langPath = translate('path', this.$lang)

//   return [
//     {
//       title: 'page-individuals',
//       links: [
//         {
//           to: `/what-is-ethereum/`,
//           text: 'page-home-section-individuals-item-one',
//           display: true
//         },
//         {
//           to: `/use/`,
//           text: 'page-use',
//           display: langVerions < 1.1
//         },

//     ]
//   }
// ]
// }

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 3rem;
  padding-bottom: 4rem;
  width: 85vw;
  max-width: 1440px;
  margin: 0 auto;
`

const FooterTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const Footer = () => {
  return (
    <StyledFooter>
      <FooterTop>
        <div>Last updated: Today</div>
        <div>Social icons</div>
      </FooterTop>
      <div>
        <h3>Individuals</h3>
        <ul>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
        </ul>
      </div>
      <div>
        <h3>Individuals</h3>
        <ul>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
        </ul>
      </div>
      <div>
        <h3>Individuals</h3>
        <ul>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
        </ul>
      </div>
      <div>
        <h3>Individuals</h3>
        <ul>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
          <li>What is Ethereum?</li>
        </ul>
      </div>
    </StyledFooter>
  )
}

export default Footer
