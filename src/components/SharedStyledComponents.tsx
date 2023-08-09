import styled from "@emotion/styled"
import Select from "react-select"

/**
 * @deprecated
 *
 * Will be removed when we finish the Chakra implementation of react-select.
 */
// https://react-select.com/styles#using-classnames
// Pass menuIsOpen to component to debug
export const StyledSelect = styled(Select)`
  width: 100%;
  color: black;
  /* Component */
  .react-select__control {
    border: 1px solid ${({ theme }) => theme.colors.searchBorder};
    background: ${({ theme }) => theme.colors.searchBackground};
    /* Dropdown arrow */
    .react-select__indicator {
      color: ${({ theme }) => theme.colors.searchBorder};
    }
    &.react-select__control--is-focused {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary} !important;
      .react-select__value-container {
        border-color: ${({ theme }) => theme.colors.primary} !important;
      }
    }
  }
  .react-select__placeholder {
    color: ${({ theme }) => theme.colors.text200};
  }
  .react-select__single-value {
    color: ${({ theme }) => theme.colors.text};
  }
  .react-select__menu {
    background: ${({ theme }) => theme.colors.searchBackground};
    color: ${({ theme }) => theme.colors.text};
  }
  .react-select__input {
    color: ${({ theme }) => theme.colors.text};
  }
  .react-select__option {
    &:hover {
      background-color: ${({ theme }) => theme.colors.selectHover};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.selectActive};
      color: ${({ theme }) => theme.colors.buttonColor} !important;
    }
  }
  .react-select__option--is-focused {
    background-color: ${({ theme }) => theme.colors.selectHover};
  }
  .react-select__option--is-selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.buttonColor};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`
