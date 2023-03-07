import React, { ChangeEvent, FormEvent } from "react"
import { useIntl } from "react-intl"
import { connectSearchBox } from "react-instantsearch-dom"
import {
  Box,
  Input as ChakraInput,
  InputGroup,
  Text,
  InputLeftElement,
  InputRightElement,
  InputProps,
  BoxProps,
  TextProps,
} from "@chakra-ui/react"
import { MdSearch } from "react-icons/md"

import { translateMessageId } from "../../utils/translations"

const SearchSlash = (props: TextProps) => (
  <Text
    m={0}
    px="6px"
    border="1px solid"
    borderColor="searchBorder"
    borderRadius="base"
    {...props}
  >
    /
  </Text>
)

const SearchIcon = (props: BoxProps) => (
  <Box fontSize="2xl" color="secondary" {...props}>
    <MdSearch />
  </Box>
)

interface IInputProps extends InputProps {
  query: string
  setQuery: (query: string) => void
  refine: (query: string) => void
  inputRef: React.RefObject<HTMLInputElement>
}

const Input: React.FC<IInputProps> = ({
  query,
  setQuery,
  refine,
  inputRef,
  ...rest
}) => {
  const intl = useIntl()
  const searchString = translateMessageId("search", intl)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    refine(value)
    setQuery(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement
          display={{ base: "none", lg: "flex" }}
          children={<SearchIcon />}
        />
        <ChakraInput
          ref={inputRef}
          paddingStart={{ base: 2, lg: 8 }}
          bg="searchBackground"
          border="1px solid"
          borderColor="searchBorder"
          borderRadius="base"
          type="text"
          placeholder={searchString}
          value={query}
          onChange={handleInputChange}
          _focus={{
            outline: "1px auto",
            outlineColor: "primary",
          }}
          {...rest}
        />
        <InputRightElement>
          <SearchSlash display={{ base: "none", lg: "block" }} />
          <SearchIcon display={{ base: "block", lg: "none" }} />
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

// HOC to interact with InstantSearch context, e.g. with refine()
// https://www.algolia.com/doc/api-reference/widgets/search-box/react/#connector
export default connectSearchBox(Input)
