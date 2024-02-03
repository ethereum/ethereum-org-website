// Libraries
import React from "react"
import {
  Box,
  ListItem,
  OrderedList as ChakraOrderedList,
  SystemStyleObject,
} from "@chakra-ui/react"

export type OrderedListProps = {
  listData: Array<React.ReactNode>
}

/**
 * The custom ordered list numbers in a solid circular background
 */
const liCustomType: SystemStyleObject = {
  content: `counter(li-counter)`,
  position: "absolute",
  top: "-3px", // adjusts circle + number up and down
  insetInlineStart: "-3rem",
  width: "34px",
  height: "1.6rem",
  pt: "9px", // adjusts number up and down,
  lineHeight: "100%",
  borderRadius: "50%",
  background: "grayBackground",
  textAlign: "center",
}

// `listData` should be a list of strings, or HTML components
// ex: [<p>string<p>] or ['string']
const OrderedList = ({ listData }: OrderedListProps) => {
  return (
    <Box mb="1.45rem">
      <ChakraOrderedList
        styleType="none"
        ps={8}
        mb="0"
        ms="1.45rem"
        sx={{
          counterReset: "li-counter",
        }}
      >
        {listData.map((data, idx) => {
          return (
            <ListItem
              key={idx}
              m="0 0 1rem 0"
              position="relative" // For the custom list types
              sx={{
                counterIncrement: "li-counter",
              }}
              _before={liCustomType}
            >
              {data}
            </ListItem>
          )
        })}
      </ChakraOrderedList>
    </Box>
  )
}

export default OrderedList
