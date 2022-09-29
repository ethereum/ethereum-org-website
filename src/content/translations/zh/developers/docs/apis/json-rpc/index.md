---
title: JSON-RPC 应用程序接口
description: 用于以太坊客户端的无状态、轻量级远程过程调用协议。
lang: zh
---

为了使软件应用程序能够与以太坊区块链进行交互（读取区块链数据或发送交易信息到网络），软件必须连接到以太坊节点。

为此目的，每个[以太坊客户端](/developers/docs/nodes-and-clients/#execution-clients)都执行 [JSON-RPC 规范](http://www.jsonrpc.org/specification)，所以应用可以依赖统一的方法集。

JSON-RPC 是无状态、轻量级远程程序调用协议。 规范主要界定了若干数据结构和围绕其处理的规则。 它与传输无关，因为这些概念可以在同一进程，通过接口、超文本传输协议或许多不同的消息传递环境中使用。 它使用 JSON (RFC 4627) 作为数据格式。

## JSON-RPC 资源 {#json-rpc-resources}

- [以太坊 JSON-RPC 规范](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema[appBar][ui:splitView]=true&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false)
- [以太坊 JSON-RPC 规范 GitHub 代码库](https://github.com/ethereum/eth1.0-apis)

## 客户端实现 {#client-implementations}

每个客户端在执行 JSON-RPC 规范时可以使用不同的编程语言。 更多与特定编程语言相关的详细信息，请查阅[客户端文档](/developers/docs/nodes-and-clients/#execution-clients)。 我们建议查看每个客户端文档以获取最新的应用程序接口支持信息。

## 便利性库 {#convenience-libraries}

虽然您可以选择通过 JSON 应用程序接口直接与以太坊客户端交互，但是对于去中心化应用程序开发者来说，常常有更容易的选项。 许多 [JavaScript](/developers/docs/apis/javascript/#available-libraries) 和[后端应用程序接口](/developers/docs/apis/backend/#available-libraries)库已经存在，可以在 JSON-RPC 应用程序接口之上提供封装。 通过这些库，开发者可以方便地写下直观的一行函数来初始化（后端的）JSON RPC 请求并用于与以太坊进行交互。

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [JavaScript 应用程序接口](/developers/docs/apis/javascript/)
- [后端应用程序接口](/developers/docs/apis/backend/)
