import React, { useEffect, useRef, useState } from "react"
import { Message } from "ai";
import { useChat, UseChatHelpers } from "ai/react";
import { Box, Flex,FormControl, Heading,Input, Spinner,Text } from '@chakra-ui/react';
import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  type ModalContentProps,
  ModalOverlay,
  type ModalProps,
  UseDisclosureReturn,
} from "@chakra-ui/react"

import Tag from "../Tag"

type TemplateMessageProps = {
  children: React.ReactNode; 
  role: Message["role"];
}

type RoleMessageProps = {
  role: Message["role"];
  content: Message["content"];
};

type ChatMessagesProps = {
  messages: UseChatHelpers["messages"];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean
  append: UseChatHelpers["append"];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
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

  const TemplateMessage = ({ children, role }: TemplateMessageProps) => {
    return (
    <Box whiteSpace="pre-wrap" mb="32px">
      <Text as="span" color="body.medium" fontSize="sm" fontStyle="italic">
        {role === "user" ? "You" : "Ask ethereum.org"}
      </Text>
      {children}
    </Box>  
  )
}

const RoleMessage = ({ role, content }: RoleMessageProps) => {
  return (
    <TemplateMessage role={role}>
      <Text>{content}</Text>
    </TemplateMessage>
  )
}

const LoadingMessage = () => {
  return (
    <TemplateMessage role="assistant">
      <Spinner display="block" w="1rem" h="1rem"/>
    </TemplateMessage>
)
}


// @ts-ignore
  const ChatMessages = ({ messages, messagesEndRef, isLoading, setIsLoading, append }: ChatMessagesProps) => {

    const submitLabelQuestion = (e) => {
      const labelContent = e.target.textContent
      append({ role: "user", content: labelContent })
      setIsLoading(true)
    }

    const EmptyState = () => {
      return (
        <Flex flex="1" direction="column" justifyContent="center">
          <Text mb="4" textAlign="center" fontWeight="200" fontSize="3xl" opacity="0.2" m="auto">Ask me about Ethereum!</Text>
          <Flex gap="3" justifyContent="center" flexWrap="wrap">
            <SearchTag label="What is layer 2?" />
            <SearchTag label="What is a wallet?" />
            <SearchTag label="When is the next upgrade?" />
            <SearchTag label="How can I send ETH to a friend?" />
          </Flex>
        </Flex>
      )
    }

    const ConversationState = ({ messages }) => {
      return (
        <>
          {messages.map(m => (
                <RoleMessage key={m.id} role={m.role} content={m.content} />
            ))}
          <Box>
            { isLoading ? <LoadingMessage /> : null}
          </Box>
          {/* Empty div to scroll to */}
          <Box ref={messagesEndRef}></Box>
      </>
      )
    }

    const SearchTag = ({ label }) => {
      return <Tag cursor="pointer" label={label} color="primary.highContrast" bgColor="primary.lowContrast" _hover={{ bgColor: "primary.hover", color: "background.base" }} onClick={(e) => submitLabelQuestion(e)} />
    }

    return (
      <Flex
        flex="1"
        direction="column"
        overflowY="auto"
        py={4}
        px={{ base: 4, sm: 8 }}
      >
            {messages.length > 0 
            ? 
            <ConversationState messages={messages} />
            :
            <EmptyState />
            }
      </Flex>
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
    const [isLoading, setIsLoading] = useState(false)
    const { messages, input, handleInputChange, handleSubmit, append } = useChat({ onResponse: () => { setIsLoading(false) } });
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const onSubmit = (e) => {
      setIsLoading(true);
      handleSubmit(e);
    }

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
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} isLoading={isLoading} append={append} setIsLoading={setIsLoading} />
        <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={(e) => onSubmit(e)} />
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
