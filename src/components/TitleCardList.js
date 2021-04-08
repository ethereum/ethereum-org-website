import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import Icon from "./Icon"
import Link from "./Link"

const Table = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 2px;
`

const TableHeader = styled.div`
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  font-weight: 600;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`

const StyledIcon = styled(Icon)`
  &:hover path {
    fill: transparent;
  }
`

const Item = styled.div`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary100};
    color: ${(props) => props.theme.colors.black} !important;
  }
`

const ItemLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary100};
    color: ${(props) => props.theme.colors.black} !important;
  }
`

const ItemTitle = styled.div``

const ItemDesc = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0;
  opacity: 0.7;
`

const LeftContainer = styled.div`
  flex: 1 1 75%;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`
const RightContainer = styled.div`
  flex: 1 0 25%;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  flex-wrap: wrap;
`

const Image = styled(Img)`
  min-width: 20px;
  margin-right: 1rem;
  margin-top: 4px;
`

const Red = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.fail300};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const Yellow = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.gridYellow};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const Green = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.success300};
  width: 12px;
  height: 12px;
`

const CodeBoxHeader = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: none;
  }
`

const TitleCardList = ({
  content,
  className,
  clickHandler,
  header,
  icon,
  isCode,
}) => (
  <Table isCode={isCode} className={className}>
    <TableHeader>
      {icon && <StyledIcon name={icon} />}
      {header}
      {isCode && (
        <CodeBoxHeader>
          <Red />
          <Yellow />
          <Green />
        </CodeBoxHeader>
      )}
    </TableHeader>
    {content.map((listItem, idx) => {
      const { title, description, caption, link, image, alt, id } = listItem
      const isLink = !!link
      return isLink ? (
        <ItemLink key={id || idx} to={link}>
          {image && <Image fixed={image} alt={alt} />}
          <LeftContainer>
            <ItemTitle>{title}</ItemTitle>

            <ItemDesc>{description}</ItemDesc>
          </LeftContainer>
          {caption && (
            <RightContainer>
              <ItemDesc>{caption}</ItemDesc>
            </RightContainer>
          )}
        </ItemLink>
      ) : (
        <Item key={idx} onClick={() => clickHandler(idx)}>
          {image && <Image fixed={image} alt={alt} />}
          <LeftContainer>
            <ItemTitle>{title}</ItemTitle>

            <ItemDesc>{description}</ItemDesc>
          </LeftContainer>
          {caption && (
            <RightContainer>
              <ItemDesc>{caption}</ItemDesc>
            </RightContainer>
          )}
        </Item>
      )
    })}
  </Table>
)

export default TitleCardList
