---
title: "预言机"
description: "预言机为以太坊智能合约提供访问现实世界数据的途径，从而解锁更多用例并为用户创造更大价值。"
lang: zh
authors: ["帕特里克·柯林斯"]
---

预言机是生成数据源的应用程序，使链下数据源可供区块链上的智能合约使用。这是必要的，因为默认情况下，基于以太坊的智能合约无法访问存储在区块链网络外部的信息。

赋予智能合约使用链下数据执行的能力，扩展了去中心化应用 (dapp) 的效用和价值。例如，链上预测市场依赖预言机提供有关结果的信息，它们使用这些信息来验证用户的预测。假设爱丽丝 (Alice) 押注 20 ETH 赌谁将成为下一任美国总统。在这种情况下，预测市场 dapp 需要一个预言机来确认选举结果，并确定爱丽丝是否有资格获得赔付。

## 先决条件 {#prerequisites}

本页面假设读者熟悉[以太坊](/)基础知识，包括[节点](/developers/docs/nodes-and-clients/)、[共识机制](/developers/docs/consensus-mechanisms/)和 [EVM](/developers/docs/evm/)。您还应该很好地掌握[智能合约](/developers/docs/smart-contracts/)和[智能合约剖析](/developers/docs/smart-contracts/anatomy/)，尤其是[事件](/glossary/#events)。

## 什么是区块链预言机？ {#what-is-a-blockchain-oracle}

预言机是获取、验证外部信息（即存储在链下的信息）并将其传输给在区块链上运行的智能合约的应用程序。除了“拉取”链下数据并在以太坊上广播之外，预言机还可以将信息从区块链“推送”到外部系统，例如，一旦用户通过以太坊交易发送费用，就解锁智能锁。

如果没有预言机，智能合约将完全局限于链上数据。

预言机根据数据源（单一或多个数据源）、信任模型（中心化或去中心化）和系统架构（立即读取、发布-订阅和请求-响应）而有所不同。我们还可以根据预言机是检索外部数据供链上合约使用（输入预言机）、将信息从区块链发送到链下应用程序（输出预言机），还是在链下执行计算任务（计算预言机）来进行区分。

## 为什么智能合约需要预言机？ {#why-do-smart-contracts-need-oracles}

许多开发者将智能合约视为在区块链上特定地址运行的代码。然而，对智能合约更[普遍的看法](/smart-contracts/)是，它们是能够在一旦满足特定条件时强制执行各方之间协议的自动执行软件程序——因此被称为“智能合约”。

但是，鉴于以太坊是确定性的，使用智能合约来强制执行人与人之间的协议并不简单。[确定性系统](https://en.wikipedia.org/wiki/Deterministic_algorithm)是指在给定初始状态和特定输入的情况下始终产生相同结果的系统，这意味着在从输入计算输出的过程中没有随机性或变化。

为了实现确定性执行，区块链限制节点*仅*使用存储在区块链本身上的数据来对简单的二元（真/假）问题达成共识。此类问题的示例包括：

- “账户所有者（由公钥标识）是否使用配对的私钥签署了此交易？”
- “此账户是否有足够的资金来支付交易费用？”
- “在当前智能合约的上下文中，此交易是否有效？”，等等。

如果区块链从外部来源（即现实世界）接收信息，确定性将无法实现，从而阻碍节点对区块链状态更改的有效性达成共识。以一个基于从传统价格 API 获取的当前 ETH-USD 汇率执行交易的智能合约为例。这个数字可能会频繁变化（更不用说 API 可能会被弃用或遭到黑客攻击），这意味着执行相同合约代码的节点将得出不同的结果。

对于像以太坊这样的公共区块链，全世界有成千上万的节点在处理交易，确定性至关重要。由于没有中央机构作为事实来源，节点需要一种机制，以便在应用相同的交易后达到相同的状态。如果节点 A 执行智能合约的代码并得到结果“3”，而节点 B 在运行相同的交易后得到“7”，这种情况将导致共识崩溃，并消除以太坊作为去中心化计算平台的价值。

这种情况也凸显了将区块链设计为从外部来源拉取信息所存在的问题。然而，预言机通过从链下来源获取信息并将其存储在区块链上供智能合约使用，从而解决了这个问题。由于存储在链上的信息具有不可变性且公开可用，以太坊节点可以安全地使用预言机导入的链下数据来计算状态变化，而不会破坏共识。

为此，预言机通常由在链上运行的智能合约和一些链下组件组成。链上合约接收来自其他智能合约的数据请求，并将其传递给链下组件（称为预言机节点）。该预言机节点可以查询数据源（例如，使用应用程序编程接口 (API)），并发送交易以将请求的数据存储在智能合约的存储中。

本质上，区块链预言机弥合了区块链与外部环境之间的信息鸿沟，创建了“混合智能合约”。混合智能合约是基于链上合约代码和链下基础设施组合运行的合约。去中心化预测市场是混合智能合约的绝佳示例。其他示例可能包括农作物保险智能合约，当一组预言机确定发生了某些天气现象时，该合约就会进行赔付。

## 什么是预言机问题？ {#the-oracle-problem}

预言机解决了一个重要问题，但也引入了一些复杂性，例如：

- 我们如何验证注入的信息是从正确的来源提取的，或者没有被篡改？

- 我们如何确保这些数据始终可用并定期更新？

所谓的“预言机问题”展示了使用区块链预言机向智能合约发送输入时带来的问题。预言机的数据必须正确，智能合约才能正确执行。此外，必须“信任”预言机运营商提供准确信息，这破坏了智能合约“无须信任”的特性。

不同的预言机为预言机问题提供了不同的解决方案，我们将在稍后探讨。预言机通常根据它们应对以下挑战的能力进行评估：

1. **正确性**：预言机不应导致智能合约基于无效的链下数据触发状态更改。预言机必须保证数据的*真实性*和*完整性*。真实性意味着数据是从正确的来源获取的，而完整性意味着数据在发送到链上之前保持完好（即未被更改）。

2. **可用性**：预言机不应延迟或阻止智能合约执行操作和触发状态更改。这意味着来自预言机的数据必须*按需可用*且不中断。

3. **激励相容性**：预言机应激励链下数据提供者向智能合约提交正确的信息。激励相容性涉及*可归因性*和*问责制*。可归因性允许将一条外部信息链接到其提供者，而问责制将数据提供者与他们提供的信息绑定在一起，因此可以根据提供的信息质量对他们进行奖励或惩罚。

## 区块链预言机服务是如何工作的？ {#how-does-a-blockchain-oracle-service-work}

### 用户 {#users}

用户是需要区块链外部信息来完成特定操作的实体（即智能合约）。预言机服务的基本工作流程始于用户向预言机合约发送数据请求。数据请求通常会回答以下部分或全部问题：

1. 链下节点可以查询哪些来源以获取请求的信息？

2. 报告者如何处理来自数据源的信息并提取有用的数据点？

3. 有多少个预言机节点可以参与检索数据？

4. 应该如何管理预言机报告中的差异？

5. 在过滤提交内容并将报告聚合为单个值时应实施什么方法？

### 预言机合约 {#oracle-contract}

预言机合约是预言机服务的链上组件。它监听来自其他合约的数据请求，将数据查询中继到预言机节点，并将返回的数据广播给客户端合约。该合约还可以对返回的数据点执行一些计算，以生成一个聚合值发送给请求合约。

预言机合约公开了一些函数，客户端合约在发出数据请求时会调用这些函数。收到新查询后，智能合约将发出一个包含数据请求详细信息的[日志事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)。这会通知订阅了该日志的链下节点（通常使用类似 JSON-RPC `eth_subscribe` 命令），它们随后会继续检索日志事件中定义的数据。

下面是 Pedro Costa 编写的[预言机合约示例](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e)。这是一个简单的预言机服务，可以根据其他智能合约的请求查询链下 API，并将请求的信息存储在区块链上：

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //发送到合约的请求列表
  uint currentId = 0; //递增的请求 ID
  uint minQuorum = 2; //宣布最终结果前需要接收的最小响应数量
  uint totalOracleCount = 3; // 硬编码的预言机数量

  // 定义一个通用的 API 请求
  struct Request {
    uint id;                            //请求 ID
    string urlToQuery;                  //API URL
    string attributeToFetch;            //要在响应中检索的 JSON 属性（键）
    string agreedValue;                 //键对应的值
    mapping(uint => string) answers;     //预言机提供的答案
    mapping(address => uint) quorum;    //将查询答案的预言机（1=预言机未投票，2=预言机已投票）
  }

  //触发区块链外部预言机的事件
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //当对最终结果达成共识时触发
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // 硬编码的预言机地址
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // 发起一个事件，以便被区块链外部的预言机检测到
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // 增加请求 ID
    currentId++;
  }

  //由预言机调用以记录其答案
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //检查预言机是否在受信任的预言机列表中
    //并且预言机是否尚未投票
    if(currRequest.quorum[address(msg.sender)] == 1){

      //标记该地址已投票
      currRequest.quorum[msg.sender] = 2;

      //遍历答案“数组”，直到找到空闲位置并保存检索到的值
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //找到第一个空槽
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //遍历预言机列表并检查是否有足够的预言机（最小法定人数）
      //投了与当前答案相同的票
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### 预言机节点 {#oracle-nodes}

预言机节点是预言机服务的链下组件。它从外部来源（例如托管在第三方服务器上的 API）提取信息，并将其放到链上供智能合约使用。预言机节点监听来自链上预言机合约的事件，并继续完成日志中描述的任务。

预言机节点的一项常见任务是向 API 服务发送 [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) 请求，解析响应以提取相关数据，将其格式化为区块链可读的输出，并通过将其包含在发送给预言机合约的交易中将其发送到链上。预言机节点可能还需要使用“真实性证明”来证明提交信息的有效性和完整性，我们将在稍后探讨。

鉴于 Gas 成本和区块大小限制，计算预言机也依赖链下节点来执行在链上执行不切实际的计算任务。例如，预言机节点的任务可能是生成一个可验证的随机数（例如，用于基于区块链的游戏）。

## 预言机设计模式 {#oracle-design-patterns}

预言机有不同的类型，包括*立即读取*、*发布-订阅*和*请求-响应*，后两者在以太坊智能合约中最受欢迎。在这里，我们简要描述发布-订阅和请求-响应模型。

### 发布-订阅预言机 {#publish-subscribe-oracles}

这种类型的预言机公开了一个“数据源”，其他合约可以定期读取该数据源以获取信息。在这种情况下，数据预计会频繁变化，因此客户端合约必须监听预言机存储中数据的更新。一个例子是向用户提供最新 ETH-USD 价格信息的预言机。

### 请求-响应预言机 {#request-response-oracles}

请求-响应设置允许客户端合约请求发布-订阅预言机提供的以外的任意数据。当数据集太大而无法存储在智能合约的存储中，和/或用户在任何时间点只需要一小部分数据时，请求-响应预言机是理想的选择。

尽管比发布-订阅模型更复杂，但请求-响应预言机基本上就是我们在上一节中描述的内容。预言机将有一个链上组件，该组件接收数据请求并将其传递给链下节点进行处理。

发起数据查询的用户必须承担从链下来源检索信息的成本。客户端合约还必须提供资金，以支付预言机合约通过请求中指定的回调函数返回响应时产生的 Gas 成本。

## 中心化与去中心化预言机 {#types-of-oracles}

### 中心化预言机 {#centralized-oracles}

中心化预言机由单个实体控制，该实体负责聚合链下信息并根据请求更新预言机合约的数据。中心化预言机效率很高，因为它们依赖于单一的事实来源。在所有者使用广泛接受的签名直接发布专有数据集的情况下，它们可能会发挥更好的作用。然而，它们也带来了缺点：

#### 正确性保证低 {#low-correctness-guarantees}

对于中心化预言机，无法确认提供的信息是否正确。即使是“信誉良好”的提供商也可能作恶或遭到黑客攻击。如果预言机损坏，智能合约将基于错误数据执行。

#### 可用性差 {#poor-availability}

中心化预言机不能保证始终将链下数据提供给其他智能合约。如果提供商决定关闭服务，或者黑客劫持了预言机的链下组件，您的智能合约将面临拒绝服务 (DoS) 攻击的风险。

#### 激励相容性差 {#poor-incentive-compatibility}

中心化预言机通常对数据提供者发送准确/未更改信息的激励设计得很差或根本不存在。为正确性向预言机付费并不能保证其诚实。随着智能合约控制的价值量增加，这个问题会变得更加严重。

### 去中心化预言机 {#decentralized-oracles}

去中心化预言机旨在通过消除单点故障来克服中心化预言机的局限性。去中心化预言机服务由点对点网络中的多个参与者组成，他们在将链下数据发送到智能合约之前对其达成共识。

去中心化预言机（理想情况下）应该是无需许可、无须信任且不受中心化机构管理的；在现实中，预言机之间的去中心化程度处于一个光谱上。存在半去中心化的预言机网络，任何人都可以参与，但有一个“所有者”根据历史表现批准和移除节点。也存在完全去中心化的预言机网络：这些网络通常作为独立的区块链运行，并具有定义的共识机制来协调节点和惩罚不当行为。

使用去中心化预言机具有以下好处：

### 高正确性保证 {#high-correctness-guarantees}

去中心化预言机试图使用不同的方法来实现数据的正确性。这包括使用证明返回信息的真实性和完整性的证明，并要求多个实体共同同意链下数据的有效性。

#### 真实性证明 {#authenticity-proofs}

真实性证明是密码学机制，能够独立验证从外部来源检索到的信息。这些证明可以验证信息的来源，并检测检索后数据可能发生的更改。

真实性证明的示例包括：

**传输层安全 (TLS) 证明**：预言机节点通常使用基于传输层安全 (TLS) 协议的安全 HTTP 连接从外部来源检索数据。一些去中心化预言机使用真实性证明来验证 TLS 会话（即确认节点与特定服务器之间的信息交换），并确认会话内容未被更改。

**可信执行环境 (TEE) 证明**：[可信执行环境](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) 是一个沙盒计算环境，与其主机系统的操作进程隔离。TEE 确保在计算环境中存储/使用的任何应用程序代码或数据都保持完整性、机密性和不可变性。用户还可以生成证明，以证明应用程序实例正在可信执行环境中运行。

某些类别的去中心化预言机要求预言机节点运营商提供 TEE 证明。这向用户确认节点运营商正在可信执行环境中运行预言机客户端实例。TEE 防止外部进程更改或读取应用程序的代码和数据，因此，这些证明可以证明预言机节点保持了信息的完整性和机密性。

#### 基于共识的信息验证 {#consensus-based-validation-of-information}

中心化预言机在向智能合约提供数据时依赖于单一的事实来源，这引入了发布不准确信息的可能性。去中心化预言机通过依赖多个预言机节点查询链下信息来解决这个问题。通过比较来自多个来源的数据，去中心化预言机降低了将无效信息传递给链上合约的风险。

然而，去中心化预言机必须处理从多个链下来源检索到的信息中的差异。为了最大限度地减少信息差异并确保传递给预言机合约的数据反映预言机节点的集体意见，去中心化预言机使用以下机制：

##### 对数据准确性进行投票/质押

一些去中心化预言机网络要求参与者使用网络的原生代币对数据查询答案的准确性（例如，“谁赢得了 2020 年美国大选？”）进行投票或质押。然后，聚合协议会聚合投票和质押，并将多数人支持的答案作为有效答案。

答案偏离多数答案的节点将受到惩罚，其代币将被分配给提供更正确值的其他节点。强制节点在提供数据之前提供保证金可以激励诚实的响应，因为假设它们是意图最大化回报的理性经济参与者。

质押/投票还可以保护去中心化预言机免受[女巫攻击](/glossary/#sybil-attack)，在女巫攻击中，恶意行为者会创建多个身份来操纵共识系统。然而，质押不能防止“搭便车”（预言机节点复制他人的信息）和“懒惰验证”（预言机节点在不自行验证信息的情况下跟随多数）。

##### 谢林点机制

[谢林点](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>)是一个博弈论概念，假设在没有任何沟通的情况下，多个实体将始终默认采用问题的共同解决方案。

对此的一个早期想法是 [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)，这是一个提议的数据源，参与者在其中提交对“标量”问题（答案由数量级描述的问题，例如“ETH 的价格是多少？”）的响应，并附带一笔存款。提供介于第 25 和第 75 [百分位数](https://en.wikipedia.org/wiki/Percentile)之间值的用户将获得奖励，而那些其值大幅偏离中位数的用户将受到惩罚。

虽然 SchellingCoin 今天已不存在，但许多去中心化预言机——特别是 [Maker 协议的预言机](https://docs.makerdao.com/smart-contract-modules/oracle-module)——使用谢林点机制来提高预言机数据的准确性。每个 Maker 预言机由一个链下 P2P 节点网络（“中继者”和“数据源”）和一个链上“Medianizer”合约组成，前者提交抵押品资产的市场价格，后者计算所有提供值的中位数。一旦指定的延迟期结束，该中位数将成为相关资产的新参考价格。

使用谢林点机制的预言机的其他示例包括 [切恩林克链下报告](https://docs.chain.link/architecture-overview/off-chain-reporting)和 [Witnet](https://witnet.io/)。在这两个系统中，来自点对点网络中预言机节点的响应被聚合为单个聚合值，例如平均值或中位数。节点根据其响应与聚合值一致或偏离的程度受到奖励或惩罚。

谢林点机制之所以具有吸引力，是因为它们在保证去中心化的同时最大限度地减少了链上足迹（只需发送一笔交易）。后者之所以可能，是因为节点必须在提交的响应列表被输入到产生平均值/中位数的算法之前对其进行签名。

### 可用性 {#availability}

去中心化预言机服务确保链下数据对智能合约的高可用性。这是通过去中心化链下信息的来源和负责将信息传输到链上的节点来实现的。

这确保了容错性，因为预言机合约可以依赖多个节点（这些节点也依赖多个数据源）来执行来自其他合约的查询。在来源*和*节点运营商层面的去中心化至关重要——一个提供从同一来源检索到的信息的预言机节点网络将遇到与中心化预言机相同的问题。

基于质押的预言机也有可能罚没未能快速响应数据请求的节点运营商。这极大地激励了预言机节点投资于容错基础设施并及时提供数据。

### 良好的激励相容性 {#good-incentive-compatibility}

去中心化预言机实施各种激励设计，以防止预言机节点之间出现[拜占庭](https://en.wikipedia.org/wiki/Byzantine_fault)行为。具体来说，它们实现了*可归因性*和*问责制*：

1. 去中心化预言机节点通常需要对它们为响应数据请求而提供的数据进行签名。此信息有助于评估预言机节点的历史表现，以便用户在发出数据请求时可以过滤掉不可靠的预言机节点。一个例子是 Witnet 的[算法声誉系统](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system)。

2. 如前所述，去中心化预言机可能要求节点对它们提交的数据真实性的信心进行质押。如果声明属实，该质押可以连同诚实服务的奖励一起退还。但如果信息不正确，它也可能被罚没，这提供了一定程度的问责制。

## 预言机在智能合约中的应用 {#applications-of-oracles-in-smart-contracts}

以下是预言机在以太坊中的常见用例：

### 检索金融数据 {#retrieving-financial-data}

[去中心化金融](/defi/) (DeFi) 应用允许点对点借贷和资产交易。这通常需要获取不同的金融信息，包括汇率数据（用于计算加密货币的法定价值或比较代币价格）和资本市场数据（用于计算代币化资产的价值，例如黄金或美元）。

例如，DeFi 借贷协议需要查询作为抵押品存入的资产（例如 ETH）的当前市场价格。这使得合约能够确定抵押品资产的价值，并确定它可以从系统中借款多少。

DeFi 中流行的“价格预言机”（通常这样称呼）包括切恩林克喂价 (Chainlink Price Feeds)、Compound 协议的[开放喂价 (Open Price Feed)](https://compound.finance/docs/prices)、尤尼斯瓦普的[时间加权平均价格 (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) 以及 [Maker 预言机](https://docs.makerdao.com/smart-contract-modules/oracle-module)。

构建者在将这些价格预言机集成到他们的项目之前，应该了解它们附带的注意事项。这篇[文章](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/)详细分析了在计划使用上述任何价格预言机时应考虑的事项。

下面是一个示例，说明如何使用切恩林克喂价在智能合约中检索最新的 ETH 价格：

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * 网络: Kovan
     * 聚合器: ETH/USD
     * 地址: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * 返回最新价格
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### 生成可验证的随机性 {#generating-verifiable-randomness}

某些区块链应用，例如基于区块链的游戏或彩票计划，需要高度的不可预测性和随机性才能有效工作。然而，区块链的确定性执行消除了随机性。

最初的方法是使用伪随机密码学函数，例如 `blockhash`，但这些可能会被解决工作量证明算法的矿工[操纵](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.)。此外，以太坊[转向权益证明](/roadmap/merge/)意味着开发者不能再依赖 `blockhash` 来获取链上随机性。信标链的 [RANDAO 机制](https://eth2book.info/altair/part2/building_blocks/randomness)提供了一种替代的随机性来源。

可以在链下生成随机值并将其发送到链上，但这样做对用户提出了很高的信任要求。他们必须相信该值确实是通过不可预测的机制生成的，并且在传输过程中没有被更改。

专为链下计算设计的预言机通过在链下安全地生成随机结果来解决这个问题，它们将这些结果连同证明该过程不可预测性的密码学证明一起广播到链上。一个例子是 [切恩林克 VRF](https://docs.chain.link/docs/chainlink-vrf/)（可验证随机函数），它是一个可证明公平且防篡改的随机数生成器 (RNG)，可用于为依赖不可预测结果的应用程序构建可靠的智能合约。

### 获取事件结果 {#getting-outcomes-for-events}

借助预言机，创建响应现实世界事件的智能合约变得很容易。预言机服务通过允许合约通过链下组件连接到外部 API 并使用来自这些数据源的信息，使这成为可能。例如，前面提到的预测 dapp 可能会请求预言机从受信任的链下来源（例如美联社）返回选举结果。

使用预言机根据现实世界的结果检索数据，可以实现其他新颖的用例；例如，去中心化保险产品需要有关天气、灾害等的准确信息才能有效运作。

### 自动化智能合约 {#automating-smart-contracts}

智能合约不会自动运行；相反，外部拥有账户 (EOA) 或另一个合约账户必须触发正确的函数来执行合约的代码。在大多数情况下，合约的大部分函数都是公开的，可以被 EOA 和其他合约调用。

但合约中也有一些其他人无法访问的*私有函数*，但它们对 dapp 的整体功能至关重要。示例包括定期为用户铸造新 NFT 的 `mintERC721Token()` 函数、在预测市场中奖励赔付的函数，或在 DEX 中解锁质押代币的函数。

开发者需要定期触发此类函数以保持应用程序平稳运行。然而，这可能会导致开发者在繁琐的任务上浪费更多时间，这就是为什么自动化执行智能合约具有吸引力的原因。

一些去中心化预言机网络提供自动化服务，允许链下预言机节点根据用户定义的参数触发智能合约函数。通常，这需要向预言机服务“注册”目标合约，提供资金以支付预言机运营商，并指定触发合约的条件或时间。

切恩林克的 [Keeper 网络](https://chain.link/keepers)为智能合约提供了一种以信任最小化和去中心化的方式外包定期维护任务的选项。阅读官方的 [Keeper 文档](https://docs.chain.link/docs/chainlink-keepers/introduction/)，了解有关使您的合约与 Keeper 兼容并使用 Upkeep 服务的信息。

## 如何使用区块链预言机 {#use-blockchain-oracles}

您可以将多个预言机应用程序集成到您的以太坊 dapp 中：

**[切恩林克](https://chain.link/)** - *切恩林克去中心化预言机网络提供防篡改的输入、输出和计算，以支持任何区块链上的高级智能合约。*

**[RedStone 预言机](https://redstone.finance/)** - *RedStone 是一个去中心化的模块化预言机，提供经过 Gas 优化的喂价。它专门为新兴资产提供喂价，例如流动性质押代币 (LST)、流动性再质押代币 (LRT) 和比特币质押衍生品。*

**[Chronicle](https://chroniclelabs.org/)** - *Chronicle 通过开发真正可扩展、具有成本效益、去中心化且可验证的预言机，克服了当前在链上传输数据的局限性。*

**[Witnet](https://witnet.io/)** - *Witnet 是一个无需许可、去中心化且抗审查的预言机，帮助智能合约以强大的加密经济保证对现实世界事件做出反应。*

**[UMA 预言机](https://uma.xyz)** - *UMA 的乐观预言机允许智能合约快速接收任何类型的数据，用于不同的应用程序，包括保险、金融衍生品和预测市场。*

**[泰勒](https://tellor.io/)** - *泰勒是一个透明且无需许可的预言机协议，可让您的智能合约在需要时轻松获取任何数据。*

**[Band 协议](https://bandprotocol.com/)** - *Band 协议是一个跨链数据预言机平台，它将现实世界的数据和 API 聚合连接到智能合约。*

**[Pyth 网络](https://pyth.network/)** - *Pyth 网络是一个第一方金融预言机网络，旨在在防篡改、去中心化和自我维持的环境中在链上发布连续的现实世界数据。*

**[API3 DAO](https://www.api3.org/)** - *API3 DAO 正在提供第一方预言机解决方案，在智能合约的去中心化解决方案中提供更高的来源透明度、安全性和可扩展性。*

**[Supra](https://supra.com/)** - 一个垂直集成的跨链解决方案工具包，互连所有区块链，无论是公共的（L1 和 L2）还是私有的（企业），提供可用于链上和链下用例的去中心化预言机喂价。

**[Gas Network](https://gas.network/)** - 一个分布式预言机平台，提供跨区块链的实时 Gas 价格数据。通过将来自领先 Gas 价格数据提供商的数据引入链上，Gas Network 正在帮助推动互操作性。Gas Network 支持超过 35 条链的数据，包括以太坊主网和许多领先的 L2。

**[DIA](https://www.diadata.org/)** - 一个跨链预言机网络，为所有主要资产类别的 20,000 多种资产提供可验证的喂价。DIA 直接从 100 多个主要市场获取原始交易数据并在链上进行计算，通过针对任何用例的自定义配置确保完整的数据透明度和可验证性。

**[Stork](https://stork.network)** - Stork 以超低延迟提供价格数据，支持广泛的用例，包括永续合约市场、借贷协议和 DeFi 生态系统，并在上市时快速支持新资产。

## 进一步阅读 {#further-reading}

**文章**

- [什么是区块链预言机？](https://chain.link/education/blockchain-oracles) — *切恩林克*
- [什么是区块链预言机？](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — *Patrick Collins*
- [去中心化预言机：全面概述](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — *Julien Thevenard*
- [在以太坊上实现区块链预言机](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – *Pedro Costa*
- [为什么智能合约不能进行 API 调用？](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — *StackExchange*
- [所以你想使用价格预言机](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — *samczsun*

**视频**

- [预言机与区块链效用的扩展](https://youtu.be/BVUZpWa8vpw) — *Real Vision Finance*

**教程**

- [如何在 Solidity 中获取以太坊的当前价格](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — *切恩林克*
- [使用预言机数据](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — *Chronicle*
- [预言机挑战](https://speedrunethereum.com/challenge/oracles) - *Speedrun Ethereum*

**示例项目**

- [Solidity 中以太坊的完整切恩林克入门项目](https://github.com/hackbg/chainlink-fullstack) — *HackBG*