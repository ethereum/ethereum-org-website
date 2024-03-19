import React, { useEffect, useRef } from "react"
import { useChat, UseChatHelpers } from "ai/react";
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

type ChatMessagesProps = {
  messages: UseChatHelpers["messages"];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

type ChatInputProps = {
  input: UseChatHelpers["input"];
  handleInputChange: UseChatHelpers["handleInputChange"];
  handleSubmit: UseChatHelpers["handleSubmit"];
}

type ChatBotModalProps = ModalContentProps &
  Pick<ModalProps, "size"> & {
    isOpen: UseDisclosureReturn["isOpen"]
    onClose: UseDisclosureReturn["onClose"]
  }

  const ChatHeader = () => {
    return  (
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
    )
  }

  const ChatMessages = ({ messages, messagesEndRef }: ChatMessagesProps) => {
    return (
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
    )
  }

  const ChatInput = ({ input, handleInputChange, handleSubmit }: ChatInputProps) => {
    return (
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
    )
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
        <ChatHeader />
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
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
