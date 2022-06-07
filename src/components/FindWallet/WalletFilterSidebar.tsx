// Libraries
import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

// Components
import Checkbox from "../Checkbox"
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

const CheckboxGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto;
  margin-top: 14px;
  gap: 0.5rem;
`

const CheckboxGridOption = styled.div`
  display: flex;
  gap: 0.5rem;

  p {
    margin: 0;
  }
`

const ToggleIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
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
          filterKey: undefined,
          options: [
            {
              name: "Android",
              filterKey: "android",
              inputType: "checkbox",
            },
            {
              name: "iOS",
              filterKey: "ios",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "Desktop",
          description: "Desktop based wallets.",
          filterKey: undefined,
          options: [
            {
              name: "Linux",
              filterKey: "linux",
              inputType: "checkbox",
            },
            {
              name: "Windows",
              filterKey: "windows",
              inputType: "checkbox",
            },
            {
              name: "macOS",
              filterKey: "macOS",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "Browser",
          description: "Browser extension wallets.",
          filterKey: undefined,
          options: [
            {
              name: "Firefox",
              filterKey: "firefox",
              inputType: "checkbox",
            },
            {
              name: "Chromium",
              filterKey: "chromium",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "Hardware",
          description: "Hardware baesd wallets.",
          filterKey: "hardware",
          options: [],
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
                      <div>
                        {item.filterKey && (
                          // TODO: Make actual toggle component
                          <div
                            onClick={() => {
                              updateFilterOption(item.filterKey)
                            }}
                          >
                            <ToggleIcon
                              name={
                                filters[item.filterKey]
                                  ? "toggleOn"
                                  : "toggleOff"
                              }
                              size="30"
                            />
                          </div>
                        )}
                      </div>
                    </OptionGrid>
                    <OptionGrid>
                      <div></div>
                      <OptionDescription>{item.description}</OptionDescription>
                      <div></div>
                    </OptionGrid>
                    {item.options.length > 0 && (
                      <CheckboxGrid>
                        {item.options.map((option) => {
                          return (
                            <CheckboxGridOption>
                              <Checkbox
                                callback={() => {
                                  updateFilterOption(option.filterKey)
                                }}
                                checked={filters[option.filterKey]}
                                size={1.5}
                              />
                              <p>{option.name}</p>
                            </CheckboxGridOption>
                          )
                        })}
                      </CheckboxGrid>
                    )}
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
