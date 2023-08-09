// Libraries
import React from "react"
import {
  Box,
  ListItem,
  OrderedList as ChakraOrderedList,
  SystemStyleObject,
} from "@chakra-ui/react"

export interface IProps {
  listData: Array<React.ReactNode>
  className?: string
}

/**
 * The custom ordered list numbers in a solid circular background
 */
const liCustomType: SystemStyleObject = {
  content: `counter(li-counter)`,
  position: "absolute",
  top: "-3px", // adjusts circle + number up and down
  left: "-3rem",
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
const OrderedList: React.FC<IProps> = ({ listData, className }) => {
  return (
    <Box mb="1.45rem" className={className}>
      <ChakraOrderedList
        styleType="none"
        pl={8}
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
