import {
  Box,
  Flex,
  List,
  ListItem,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import { Image, type ImageProps } from "@/components/Image"
import OldHeading from "@/components/OldHeading"

type Content = {
  title: string
  description: string
  link?: string
  image?: ImageProps["src"]
  alt: string
  id?: string
}

export type ProductListProps = {
  content: Content[]
  category: string
  actionLabel: string
}

const ProductList = ({ actionLabel, content, category }: ProductListProps) => {
  const shadow = useColorModeValue("tableBox.light", "tableBox.dark")

  const CATEGORY_NAME = "category-name"

  return (
    <Box boxSize="full">
      <OldHeading
        as="h3"
        id={CATEGORY_NAME}
        fontSize="2xl"
        borderBottom="2px solid"
        borderColor="border"
        paddingBottom={4}
        marginBottom={0}
      >
        {category}
      </OldHeading>
      <Flex
        as={List}
        aria-labelledby={CATEGORY_NAME}
        m={0}
        flexDirection="column"
        height="inherit"
      >
        {content.map(({ title, description, link, image, alt, id }, idx) => (
          <Flex
            as={ListItem}
            key={id || idx}
            color="text"
            marginBottom="px"
            marginTop={8}
            height="inherit"
          >
            <Box width="5rem">
              {image && (
                <Image
                  src={image}
                  alt={alt}
                  width={66}
                  boxShadow={shadow}
                  borderRadius="sm"
                />
              )}
            </Box>
            <Flex
              justifyContent="space-between"
              flexDir={{ base: "column", sm: "row" }}
              paddingBottom={4}
              width="full"
              ms={{ base: 4, sm: 6 }}
              borderBottom="1px solid"
              borderColor="border"
            >
              <Box flex={1}>
                <Box>{title}</Box>
                <Box fontSize="sm" marginBottom={0} opacity="0.6">
                  {description}
                </Box>
              </Box>
              {link && (
                <ButtonLink
                  variant="outline"
                  href={link}
                  alignSelf="center"
                  ms={{ base: 0, sm: 8 }}
                  paddingY={1}
                  paddingX={6}
                  borderRadius="sm"
                  marginTop={{ base: 4, sm: 0 }}
                >
                  {actionLabel}
                  <VisuallyHidden>to {title} website</VisuallyHidden>
                </ButtonLink>
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default ProductList
