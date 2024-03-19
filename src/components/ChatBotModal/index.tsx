import React, { useEffect, useRef } from "react"
import { useChat } from "ai/react";
import { Box, Flex,FormControl, Heading,Input, Text } from '@chakra-ui/react';
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
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
      <Flex
        direction="column"
        justifyContent="space-between"
        w="full"
        h="full"
      >
        {/* Modal header */}
        <Box
          pt={8}
          px={{ base: 4, sm: 8 }}
          zIndex="sticky"
          position="sticky"
          top="0"
        >
          <Flex
            pb={4}
            borderBottom="1px"
            borderColor="body.medium"
            direction="column"
            alignItems="center"
            w="full"
          >
            <ModalCloseButton />
            <Heading as="h2" fontSize={{ base: "xl", md: "xl" }} textAlign="center">
                Ask Ethereum.org
            </Heading>
            <Text fontSize="sm">Ethereum.org AI Prototype</Text>
          </Flex>
        </Box>
        {/* Chat messages */}
        <Box
          flex="1"
          overflowY="auto"
          py={4}
          px={{ base: 4, sm: 8 }}
        >
          {/* Messages */}
          {messages.length > 0 && messages.map(m => (
              <Box key={m.id} whiteSpace="pre-wrap" mb="32px">
                  <Text as="span" color="body.medium" fontSize="sm" fontStyle="italic">
                    {m.role === "user" ? "You" : "Ask ethereum.org"}
                  </Text>
                  <Text>{m.content}</Text>
              </Box>
          ))}
        {/* Empty div to scroll to */}
          <Box ref={messagesEndRef}></Box>
        </Box>
        {/* Chat input */}
        <FormControl 
          as="form" 
          // @ts-ignore
          onSubmit={handleSubmit}
          position="sticky"
          bottom="0"
          pt={2}
          pb={8}
          px={{ base: 4, sm: 8 }}
          bg="background.base" // Add background color to match modal
          zIndex="sticky"
        >
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
        bgColor="background.base"
        shadow="md"
        border="1px"
        borderColor="border"
        borderRadius="md"
        overflowX="hidden"
        minH="unset"
        h="100%"
        maxH={{
          base: "calc(100vh - 1rem)",
          md: "min(calc(100vh - 2rem), 790px)",
        }}
        maxW={{
          base: "calc(100vw - 1rem)",
          md: "min(calc(100vw - 2rem), 679px)",
        }}
        {...restProps}
      >
        <Chat />
      </ModalContent>
    </ChakraModal>
  )
}
