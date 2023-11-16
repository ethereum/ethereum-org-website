import React, { ReactNode } from "react"
import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  TextProps,
} from "@chakra-ui/react"

import { ButtonLink } from "./Buttons"
import { Image } from "@/components/Image"
import Text from "./OldText"
import { StaticImageData } from "next/image"

const SubjectBadge: React.FC<{
  subject: string
  children: React.ReactNode
}> = ({ subject, children }) => {
  const backgroundProp = () => {
    switch (subject) {
      case "Solidity":
        return "tagYellow"
      case "Vyper":
        return "tagBlue"
      case "web3":
        return "tagTurquoise"
      case "JavaScript":
        return "tagRed"
      case "TypeScript":
        return "tagBlue"
      case "Go":
        return "tagTurquoise"
      case "Python":
        return "tagMint"
      case "Rust":
        return "tagOrange"
      case "C#":
        return "tagBlue"
      case "Java":
        return "tagPink"
      default:
        return "tagGray"
    }
  }
  return (
    <Badge size="sm" textTransform="unset" background={backgroundProp()}>
      {children}
    </Badge>
  )
}

export interface IProps {
  children?: React.ReactNode
  url: string
  background: string
  image: StaticImageData
  name: string
  description?: ReactNode
  note?: string
  alt?: string
  subjects?: Array<string>
}

const ProductCard: React.FC<IProps> = ({
  url,
  background: bgProp,
  image,
  name,
  description,
  note = "",
  alt = "",
  children,
  subjects,
}) => {

  const DESCRIPTION_STYLES: TextProps = {
    opacity: 0.8,
    fontSize: "sm",
    mb: 2,
    lineHeight: "140%",
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      color="text"
      background="searchBackground"
      boxShadow="0px 14px 66px rgba(0, 0, 0, 0.07)"
      borderRadius="base"
      border="1px"
      borderColor="lightBorder"
      textDecoration="none"
      _hover={{
        transition: "transform 0.1s",
        transform: "scale(1.02)",
      }}
    >
      <Center
        background={bgProp}
        boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
        minH="200px"
      >
        <Image
          src={image}
          alt={alt}
          height="100"
          alignSelf="center"
          maxW={{ base: "311px", sm: "372px" }}
          maxH="257px"
        />
      </Center>
      <Flex flexDirection="column" p={6} textAlign="left" height="100%">
        <Heading
          as="h3"
          fontSize="2xl"
          fontWeight={600}
          mt={8}
          mb={3}
        >
          {name}
        </Heading>
        {description && <Text {...DESCRIPTION_STYLES}>{description}</Text>}
        {note.length > 0 && <Text {...DESCRIPTION_STYLES}>Note: {note}</Text>}
        {children && <Box mt={4}>{children}</Box>}
      </Flex>
      <HStack mt={5} mb={2} px={6} spacing={3}>
        {subjects &&
          subjects.map((subject, idx) => (
            <SubjectBadge key={idx} subject={subject}>
              {subject}
            </SubjectBadge>
          ))}
      </HStack>
      <ButtonLink to={url} m={4} height={20}>
        Open {name}
      </ButtonLink>
    </Flex>
  )
}

export default ProductCard
