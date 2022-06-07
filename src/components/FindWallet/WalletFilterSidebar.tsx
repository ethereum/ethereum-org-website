// Libraries
import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

// Components
import Icon from "../Icon"

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FilterPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  background: ${(props) => props.theme.colors.ednBackground};
  border: 1px solid #3d3d3d;
  border-radius: 4px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 12px 1rem;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  h3 {
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

const FilterOption = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  width: 100%;
  padding: 18.5px 12px 12px 12px;
`

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 24px auto 34px;
  width: 100%;
  align-items: center;

  p {
    margin: 0;
    padding: 0 12px;
  }
`

const OptionDescription = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.text200};
`

const Image = styled(GatsbyImage)`
  height: 24px;
`

// Types

const WalletFilterSidebar = ({ data, filters, updateFilterOption }) => {
  const [filterOptions, setFilterOptions] = useState([
    {
      title: "Device",
      open: true,
      items: [
        {
          title: "Mobile",
          description: "Phone or mobile based wallets.",
          options: [
            {
              name: "Android",
              filterName: "android",
              inputType: "checkbox",
            },
            {
              name: "iOS",
              filterName: "ios",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "Desktop",
          description: "Desktop based wallets.",
          options: [
            {
              name: "Linux",
              filterName: "android",
              inputType: "checkbox",
            },
            {
              name: "Windows",
              filterName: "windows",
              inputType: "checkbox",
            },
            {
              name: "macOS",
              filterName: "macOS",
              inputType: "checkbox",
            },
          ],
        },
      ],
    },
  ])

  const setOpen = (idx) => {
    const updatedFilterOptions = [...filterOptions]
    updatedFilterOptions[idx].open = !updatedFilterOptions[idx].open
    setFilterOptions(updatedFilterOptions)
  }

  return (
    <Container>
      {filterOptions.map((filterOption, idx) => {
        return (
          <FilterPanel>
            <Header
              onClick={() => {
                setOpen(idx)
              }}
            >
              <h3>{filterOption.title}</h3>
              <StyledIcon
                name={filterOption.open ? "chevronUp" : "chevronDown"}
                size={"36"}
              />
            </Header>
            {filterOption.open &&
              filterOption.items.map((item) => {
                return (
                  <FilterOption>
                    <OptionGrid>
                      <Image
                        image={getImage(data.mobile)!}
                        objectFit="contain"
                      />
                      <p>{item.title}</p>
                      <div></div>
                    </OptionGrid>
                    <OptionGrid>
                      <div></div>
                      <OptionDescription>{item.description}</OptionDescription>
                      <div></div>
                    </OptionGrid>
                  </FilterOption>
                )
              })}
          </FilterPanel>
        )
      })}
    </Container>
  )
}

export default WalletFilterSidebar
