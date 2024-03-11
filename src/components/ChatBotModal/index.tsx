import React from "react"
import { useChat } from "ai/react";
import { Box, Flex,FormControl,Heading,Input, Text } from '@chakra-ui/react';
import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  type ModalContentProps,
  ModalOverlay,
  type ModalProps,
  UseDisclosureReturn,
} from "@chakra-ui/react"

type ChatBotModalProps = ModalContentProps &
  Pick<ModalProps, "size"> & {
    isOpen: UseDisclosureReturn["isOpen"]
    onClose: UseDisclosureReturn["onClose"]
    children?: React.ReactNode
  }

  const Chat = () => {
    'use client';

    const { messages, input, handleInputChange, handleSubmit } = useChat();
    console.log(messages)

    return (
      <Flex
        direction="column"
        justifyContent="space-between"
        mx="auto"
        w="full"
        maxW="md"
        h="full"
        paddingTop="18"
      >
      <Box overflowY="auto">
          {messages.length > 0 && messages.map(m => (
              <Box key={m.id} whiteSpace="pre-wrap">
                  <Text as="span">{m.role === "user" ? "User: " : "AI: "}</Text>
                  {m.content}
              </Box>
          ))}
      </Box>
      {/* @ts-ignore */}
      <FormControl as="form" onSubmit={handleSubmit} my="4">
          <Input
              borderColor="gray.300"
              borderRadius="md"
              shadow="xl"
              p="2"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
          />
      </FormControl>
  </Flex>
    );
  }

export const ChatBotModal = ({
  isOpen,
  onClose,
  size,
  ...restProps
}: ChatBotModalProps) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="full"
      scrollBehavior="inside"
    >
      <ModalOverlay bgColor="blackAlpha.700" />
      <ModalContent
        py={8}
        px={{ base: 4, sm: 8 }}
        shadow="md"
        border="1px"
        borderColor="border"
        borderRadius="md"
        overflowY="auto"
        overflowX="hidden"
        minH="unset"
        h="100%"
        maxH={{
          base: "calc(100vh - 1rem)",
          md: "min(calc(100vh - 2rem), 792px)",
        }}
        maxW={{
          base: "calc(100vw - 1rem)",
          md: "min(calc(100vw - 2rem), 1000px)",
        }}
        {...restProps}
      >
        <ModalCloseButton />
        <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} textAlign={"center"}>Ethereum.org AI</Heading>
        <Chat />
      </ModalContent>
    </ChakraModal>
  )
}
