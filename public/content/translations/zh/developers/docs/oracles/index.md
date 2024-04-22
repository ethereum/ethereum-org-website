---
title: 预言机
description: 以太坊智能合约通过预言机访问真实数据，为用户解锁更多用例并提供更大价值。
lang: zh
---

预言机是使链下数据源可供区块链上的智能合约使用的数据馈送。 由于默认情况下，基于以太坊的智能合约无法访问存储在区块链网络外部的信息，预言机是必不可少的。

赋予智能合约使用链下数据执行的能力，扩展了去中心化应用程序的效用和价值。 例如，链上预测市场依靠预言机提供有关结果的信息，用于验证用户的预测。 假设 Alice 下注 20 个以太币赌谁将成为下一任美国 总统。 在这种情况下，预测市场去中心化应用程序需要预言机来确认选举结果，并判定 Alice 是否有资格获得付款。

## 前提条件 {#prerequisites}

本页面假设读者熟悉以太坊基础知识，例如[节点](/developers/docs/nodes-and-clients/)、[共识机制](/developers/docs/consensus-mechanisms/)和[以太坊虚拟机](/developers/docs/evm/)等。 读者还应该深刻了解[智能合约](/developers/docs/smart-contracts/)和[智能合约分析](/developers/docs/smart-contracts/anatomy/)，尤其要了解[事件](/glossary/#events)。

## 什么是区块链预言机？ {#what-is-a-blockchain-oracle}

预言机是指获取、验证外部信息（即存储在链下的信息）并将外部信息传送给在区块链上运行的智能合约的应用程序。 预言机除了“拉取”链下数据并在以太坊上广播以外，还可以将信息从区块链“推送”到外部系统，例如，一旦用户通过以太坊交易发送费用，就解锁智能锁。

如果没有预言机，智能合约将只能使用链上数据。

预言机的差别在于数据来源（一种或多种来源）、信任模型（中心化或去中心化）和系统架构（立即读取、发布-订阅和请求-响应）。 我们还可以根据以下因素区分预言机：是否检索外部数据供链上合约使用（输入预言机）、将区块链中的信息发送给链下应用程序（输出预言机）或在链下执行计算任务（计算预言机）。

## 智能合约为什么需要预言机？ {#why-do-smart-contracts-need-oracles}

许多开发者将智能合约视为在区块链上特定地址运行的代码。 然而，对[智能合约更为普遍的观点](/smart-contracts/)是，它们是自动执行的软件程序，一旦满足特定条件，就能够执行各方之间的协议 - 因此术语称为“智能合约”。

但是，使用智能合约执行人之间的协议并非易事，因为以太坊是确定性系统。 [确定性系统](https://en.wikipedia.org/wiki/Deterministic_algorithm)是指在给定初始状态和特定输入的情况下始终产生相同结果的系统，这意味着根据输入计算输出的过程不存在随机性或变化。

要实现确定性执行，区块链将节点限制为通过_仅_使用存储在区块链本身中的数据就简单的二进制 (true/false) 问题达成共识。 这类问题的示例包括：

- “帐户所有者（由公钥识别）是否使用配对私钥签署该交易?”
- “该帐户是否有足够资金支付这笔交易？”
- “这笔交易在该智能合约中是否有效？”等等。

如果区块链从外部来源（例如现实世界）接收信息，确定性将不可能实现，阻止节点就区块链状态变化的有效性达成一致。 以一个智能合约为例，该合约根据从一个传统价格应用程序接口获得的当前以太币-美元汇率执行交易。 该汇率可能会经常变动（更不用说该应用程序接口可能被弃用或遭到黑客攻击），这意味着执行相同合约代码的节点会得出不同的结果。

对于像以太坊这样在世界各地有数千个节点处理交易的公共区块链，确定性至关重要。 由于没有集中管理机构作为真实性来源，节点需要在进行相同交易后达到相同状态的机制。 节点 A 执行智能合约的代码并得到结果“3”，而节点 B 在运行相同交易后得到“7”，这将打破共识并消除以太坊作为去中心化计算平台的价值。

这种情况还突显了设计区块链从外部来源获取信息的问题。 然而，预言机解决了这一问题，它从链下来源获取信息并存储在区块链上供智能合约使用。 由于存储在链上的信息是不可更改和公开可用的，以太坊节点可以安全地使用预言机导入的链下数据计算状态变化，且不会打破共识。

为此，预言机通常由链上运行的智能合约和一些链下组件构成。 链上合约接收其他智能合约的数据请求，并将这些请求传送给链下组件（称为预言机节点）。 这类预言机节点可以查询数据源—例如使用应用程序接口 (API)—并发送交易将请求的数据存储在智能合约的存储中。

就本质而言，区块链预言机弥合了区块链和外部环境之间的信息缺口，创建了“混合智能合约”。 混合智能合约的工作原理基于链上合约代码和链下基础设施的结合。 去中心化预测市场就是混合智能合约的一个很好的示例。 其他示例可能包括作物保险智能合约，在一组预言机确定某些天气现象已经发生时这些合约做出赔付。

## 什么是预言机问题？ {#the-oracle-problem}

预言机解决了一个重要问题，但也带来了一些复杂性，例如：

- 如何验证注入信息是从正确来源提取的或者未被篡改？

- 如何确保这些数据始终可用并且定期更新？

所谓的“预言机问题”显示了使用区块链预言机给智能合约发送输入时出现的问题。 来自预言机的数据必须正确，智能合约才能正确执行。 而且，必须“信赖”预言机运营商提供准确信息，会削弱智能合约的“无需信任性”。

不同的预言机对于预言机问题有着不同的解决方案，稍后将进行探讨。 通常会根据预言机应对以下挑战的能力来评估它们：

1. **正确性**：预言机不应导致智能合约基于无效的链下数据触发状态变化。 预言机必须保证数据的_真实性_与_完整性_。 真实性是指数据是从正确来源获取的，完整性是指数据在发送到链上前保持完好无缺（即数据未修改过）。

2. **可用性**：预言机不应延迟或阻止智能合约执行操作或触发状态变化。 这意味着预言机提供的数据必须_在请求时可用_并且不会出现间断。

3. **激励兼容性**：预言机应激励链下数据提供者向智能合约提交正确的信息。 奖励兼容性包括_可归因性_和_问责性_。 可归因性指将一条外部信息与其提供者联系起来，而问责性则将数据提供者和他们提供的信息联结起来，因此能够根据提供的数据质量奖励或者惩罚数据提供者。

## 区块链预言机服务是如何运作的？ {#how-does-a-blockchain-oracle-service-work}

### 用户 {#users}

用户是指需要区块链外部的信息以完成特定操作的实体（即智能合约）。 预言机服务的基本工作流程始于用户向预言机合约发送数据请求。 数据请求通常将回答下列一部分或所有问题：

1. 链下节点可以在哪些来源中查询请求的信息？

2. 报告者如何处理数据来源中的信息并提取有用的数据点？

3. 有多少预言机节点可以参与数据检索？

4. 应如何管理预言机报告中的差异？

5. 在筛选提交并将报告聚合为单个值时应该采用什么方法?

### 预言机合约 {#oracle-contract}

预言机合约是预言机服务的链上部分。 它侦听其他合约的数据请求，将数据查询转送到预言机节点，并将返回的数据广播到客户端合约。 该合约还可以对返回的数据点进行一些计算，以产生聚合值并发送给请求合约。

预言机合约公开了一些函数，客户端合约在发出数据请求时调用它们。 收到新查询后，智能合约将触发一个[日志事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)，其中有数据请求详细信息。 这将通知订阅该日志的链下节点（通常使用类似 JSON-RPC `eth_comment` 的命令），让其继续检索日志事件中定义的数据。

下面是 Pedro Costa 提供的[预言机合约示例](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e)。 它是一个简单的预言机服务，可以在其他智能合约发出请求时查询链下应用程序接口，并在区块链上存储请求的信息：

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) answers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
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

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer as the current one
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

预言机节点是预言机服务的链下部分。 它从外部来源提取信息，例如托管在第三方服务器上的应用程序接口，并将信息放在链上供智能合约使用。 预言机节点侦听来自链上预言机合约的事件，继而完成日志中描述的任务。

预言机节点的常见任务是，向应用程序接口服务发送 [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) 请求，解析响应以提取相关数据，设置为区块链可读的输出格式，并通过将输入包含在预言机合约的交易中将其发送到链上 在利用“真实性证明”证明所提交信息的有效性和完整性时，可能也会用到预言机节点，我们稍后会对此进行探讨。

计算预言机也依赖链下节点执行计算任务，但因为燃料成本和区块大小限制，这类计算在链上执行是不切实际的。 例如，预言机节点的任务可能是生成一个可验证的随机数字（例如，用于区块链游戏）。

## 预言机设计模式 {#oracle-design-patterns}

预言机有不同的类型，包括_立即读取_、_发布-订阅_和_请求-响应_，后两者在太坊智能合约中最受欢迎。 在此我们简单描述发布-订阅和请求-响应模型。

### 发布-订阅预言机 {#publish-subscribe-oracles}

这类预言机公开了“数据馈送”，其他合约通常可以通过读取数据馈来获取信息。 在这种情况下，数据可能会频繁变化，因此客户端合约必须侦听预言机存储中数据的更新。 例如，向用户提供最新以太币-美元价格信息的预言机。

### 请求-响应预言机 {#request-response-oracles}

请求-响应设置允许客户端合约请求除发布-订阅预言机所提供数据以外的任意数据。 当数据集太大而无法存储在智能合约的存储中，并且/或者用户在任何时间点只需要一小部分数据时，请求-响应预言机是理想之选。

虽然比发布-订阅预言机复杂，但请求-响应预言机基本上和我们在上一节中描述的一样。 预言机将有一个链上组件，用于接收数据请求并传送给链下节点进行处理。

发起数据查询的用户必须承担从链下来源检索信息的费用。 客户端合约还必须提供资金，用以支付预言机合约通过请求中指定的回调函数返回响应所产生的燃料费用。

## 中心化和去中心化预言机 {#types-of-oracles}

### 中心化预言机 {#centralized-oracles}

中心化预言机由单个实体控制，该实体负责聚合链下信息并按照请求更新预言机合约的数据。 中心化预言机效率高，因为它们依赖单一真实性来源。 在专有数据集由所有者直接发布并有公认签名的情况下，中心化预言机表现更佳。 然而，它们也带来了弊端：

#### 低正确性保障 {#low-correctness-guarantees}

使用中心化预言机时，无法确认提供的信息是否正确。 甚至“信誉良好”的提供者会耍无赖或者遭遇黑客攻击。 如果预言机被破坏，智能合约将基于错误数据执行。

#### 可用性差 {#poor-availability}

中心化预言机无法保证始终向其他智能合约提供链下数据。 如果提供者决定关闭服务或者黑客劫持了预言机的链下组件，智能合约则会面临拒绝服务 (Dos) 攻击的风险。

#### 激励兼容性差 {#poor-incentive-compatibility}

中心化预言机的激励往往设计不善或根本没有激励，鼓励数据提供者发送准确/未更改的信息。 付钱给预言机以保证正确性并不能确保诚信。 随着智能合约控制的价值体量增加，这个问题愈加严重。

### 去中心化预言机 {#decentralized-oracles}

去中心化预言机旨在通过消除单点故障来打破中性化预言机的局限性。 去中心化预言机服务由对等网络中的多个参与者组成，这些参与者就链下数据达成共识，然后再将数据发送到智能合约。

理想情况下，去中心化预言机应该是无需许可、去信任且不受中心机构管理；在现实中，预言机存在着不同程度的去中心化。 有半去中心化的预言机网络，任何人都可以参与其中，但由“所有者“根据以往表现批准和移除节点。 也存在着完全去中心化的预言机网络：这些网络通常作为独立区块链运行，并且已经确定了协调节点和惩罚不良行为的共识机制。

使用去中心化预言机有以下好处：

### 高正确性保障 {#high-correctness-guarantees}

去中心化预言机尝试使用不同的方法实现数据的正确性。 其中包括使用证明来证明返回信息的真实性和完整性，以及要求多个实体就链下数据的有效性集体达成一致。

#### 真实性证明 {#authenticity-proofs}

真实性证明是一种加密机制，支持对从外部来源检索的信息进行独立验证。 这些证明可以验证信息的来源，并在检索后发现对数据可能进行的更改。

真实性证明的示例包括：

**传输层安全性 (TLS) 证明**：预言机节点通常使用基于传输层安全性 (TLS) 协议的安全 HTTP 连接从外部数据源检索数据。 一些去中心化预言机使用真实性证明验证传输层安全性会话（即，确认节点和特定服务器之间的信息交换），并确认会话内容未被改动。

**可信执行环境 (TEE) 认证**：[可信执行环境](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) 是一种沙盒计算环境，它与主机系统的操作进程隔离。 可信执行环境确保在计算环境中存储/使用的任何应用代码或数据都保持完整性、保密性和不可变性。 用户还可以生成一个认证，证明应用程序实例正在可信执行环境中运行。

某些类别的去中心化预言机要求预言机节点运营者提供可信执行环境认证。 这向用户证实，节点运营者在可信执行环境中运行预言机客户端的实例。 可信执行环境防止外部进程更改或读取应用程序的代码和数据，因此，这些认证证明预言机节点保持了信息的完整性和保密性。

#### 基于共识的信息验证 {#consensus-based-validation-of-information}

为智能合约提供数据时，中心化预言机依靠单一真实性来源，因此有可能发布不准确的信息。 去中心化预言机依靠多个预言机节点查询链下信息，解决了这个问题。 通过对多个来源的数据进行比较，去中心化预言机降低了将无效信息传递到链上合约的风险。

然而，去中心化预言机必须处理从多个链下来源检索的信息中的差异。 为了尽量减少信息差异并确保传送给预言机合约的数据反映了预言机节点的集体看法，去中心化预言机采用了下列机制：

##### 对数据的准确性进行投票/质押

一些去中心化预言机网络要求参与者对数据查询答案的准确性进行投票或质押（例如，“谁赢得了 2020 年美国大选?”） （例如，“谁赢得了 2020 年美国大选?”） 然后，聚合协议聚合投票和质押，并将多数参与者支持的答案作为有效答案。

如果节点的答案不同于多数答案，将对其进行惩罚，即将其代币分发给提供更正确值的其他节点。 强制节点在提供数据之前提供保证金将激励节点做出诚实的响应，因为假定节点是理性的经济活动参与者，意在最大限度地增加回报。

质押/投票还保护去中心化预言机免受“女巫攻击”，在这种攻击中，恶意参与者创建多个身份来利用共识系统。 然而，质押机制不能防止“揩油行为”（预言机节点从其他节点复制信息）和“懒散验证”（预言机节点随大流而不亲自验证信息）。

##### 谢林点机制

[谢林点](https://en.wikipedia.org/wiki/Focal_point_(game_theory))是一个博弈论概念，它假设在缺乏任何沟通的情况下，多个实体总是默认对一个问题选择共同解决方案。 谢林点机制常用于去中心化预言机网络，使节点对数据请求的应答达成共识。

这方面的一个早期想法是[谢林币](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)，这是一种提议的数据馈送，参与者提交“标量”问题的答案（这些问题的答案由数量描述，例如“以太币的价格是多少?”）及存款。 提供的值在第 25 和第 75 [百分位](https://en.wikipedia.org/wiki/Percentile)之间的用户将得到奖励，而提供的值大幅偏离中值的用户将受到惩罚。

虽然谢林币目前已不存在，但许多去中心化预言机—特别是 [Maker 协议预言机](https://docs.makerdao.com/smart-contract-modules/oracle-module)—仍使用谢林点机制来提高预言机数据的准确性。 每个 Maker 预言机均由提交抵押品资产的市场价格的链下对等节点网络（“中继者”和“馈送者”）和链上“中值器”合约组成，后者计算所有提供价值的中值。 规定的延迟期结束后，该中值成为相关资产的新参考价格。

使用谢林点机制的其他预言机示例包括 [Chainlink 链下报告](https://docs.chain.link/docs/off-chain-reporting/)和 [Witnet](https://witnet.io/)。 在这两种系统中，对等网络中的预言机节点的答复聚合成一个单一聚合值，如平均值或中值。 根据其答复与聚合值的一致或偏离程度奖励或惩罚节点。

谢林点机制具有吸引力，因为这类机制能够最大限度地减少对链上的影响（只需要发送一笔交易）同时又能保证去中心化。 后者是可行的，因为节点必须批准已提交答复的列表，然后再将答复输入生成平均值/中值的算法。

### 可用性 {#availability}

去中心化预言机服务确保链下数据对智能合约的高可用性。 高可用性是通过对链下信息来源和负责将信息传输到链上的节点同时去中心化实现的。

这确保了容错，因为预言机合约能够依靠多个节点（这些节点也依靠多个数据源）执行其他合约发出的查询。 在信息来源_和_节点运营商层面实现去中心化至关重要—提供从同一来源检索的信息的预言机节点网络将遇到与中心化预言机相同的问题。

基于质押的预言机也可以对未能快速响应数据请求的节点运营商进行惩罚。 这极大地激励了预言机节点投资于容错基础设施并及时提供数据。

### 激励兼容性好 {#good-incentive-compatibility}

去中心化预言机采纳了不同的激励设计，避免预言机节点中出现[拜占庭](https://en.wikipedia.org/wiki/Byzantine_fault)行为。 具体而言，它们实现了_可归因性_和_问责性_：

1. 通常，要求去中心化预言机节点对它们为了响应数据请求而提供的数据签名。 这些信息有助于评估预言机节点的历史表现，让用户在发出数据请求时筛选掉不可靠的预言机节点。 例如 Witnet 的[算法信誉系统](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system)。

2. 如前所述，去中心化预言机可能要求节点对其提交数据的真实性的可信度进行质押。 如果声明得到证实，这笔质押可以连同诚信服务的奖励一起返还。 但是如果信息不正确，也可以对节点进行惩罚，这就提供了一定程度的问责性。

## 预言机在智能合约中的应用 {#applications-of-oracles-in-smart-contracts}

以下是以太坊中预言机的常见用例：

### 检索金融数据 {#retrieving-financial-data}

[去中心化金融](/defi/) (DeFi) 应用程序允许点对点贷款、借款和资产交易。 通常，这需要获取不同的金融信息，包括汇率数据（用于计算加密货币的法币价值或比较代币的价格）和资本市场数据（用于计算代币化资产的价值，如黄金或美元）。

例如，一个去中心化金融贷款协议需要查询作为抵押品存储的资产（例如以太币）的当前市场价格。 这样，合约可以确定抵押品资产的价值，并确定它能从系统中借出多少钱。

去中心化金融中热门的“价格预言机”（常用名称）包括 Chainlink Price Feeds、Compound Protocol 的[开放式喂价工具](https://compound.finance/docs/prices)、Uniswap 的[时间加权平均价格 (TWAP) ](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)以及 [Maker 预言机](https://docs.makerdao.com/smart-contract-modules/oracle-module)。

在将这些价格预言机整合到项目中之前，构建者应该了解它们附带的注意事项。 本[文](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/)详细分析了计划使用任何上述价格预言机时要考虑的因素。

下面是一个示例，说明如何使用 Chainlink 喂价工具从智能合约中检索最新以太币价格：

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
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

某些区块链应用程序（如基于区块链的游戏或彩票方案），需要高度的不可预测性和随机性才能有效工作。 然而，区块链的确定性执行消除了任何随机性。

常见方法是采用伪随机加密函数（例如 `blockhash`）但是，它们可被[矿工操纵](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.)，对工作量证明算法求解。 此外，以太坊[过渡到权益证明](/roadmap/merge/)意味着开发者不能再依靠 `blockhash` 获得链上随机性（然而，信标链的 [RANDAO 机制](https://eth2book.info/altair/part2/building_blocks/randomness)提供了另一种随机性来源）。

可以在链下生成随机值并发送到链上，但这样做对用户有很高的信任要求。 他们必须相信值确实是通过不可预测的机制产生的，并且未在传输过程中遭到改动。

为链下计算设计的预言机解决了这一问题，它们安全地生成链下随机结果并连同证实该过程不可预测性的加密证明一起在链上广播。 [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/)（可验证随机函数）便是一个示例，它是一个可证明公平且防篡改的随机数生成器 (RNG)，用于为依靠不可预测结果的应用程序构建可靠的智能合约。 另一个示例是 [API3 QRNG](https://docs.api3.org/explore/qrng/)，它提供量子随机数生成器 (QRNG)，是基于量子现象的 Web3 量子随机数生成的公共方法，由澳大利亚国立大学 (ANU) 提供。

### 获取事件结果 {#getting-outcomes-for-events}

有了预言机，创建响应真实事件的智能合约并非难事。 预言机服务允许合约通过链下组件连接到外部应用程序接口并使用来自这些数据源的信息，实现了这一点。 例如，前面介绍的预测去中心化应用程序可能会请求预言机返回可信链下来源（如美联社）提供的选举结果。

使用预言机检索基于真实结果的数据，可以实现其他新颖的用例；例如，去中心化保险产品需要关于天气、灾害等的准确信息才能有效地工作。

### 智能合约自动化 {#automating-smart-contracts}

智能合约不会自动运行；相反，外部帐户 (EOA) 或另一个合约帐户必须触发正确的函数来执行合约代码。 大多数情况下，合约的大部分函数是公共函数，可由外部帐户和其他合约调用。

但合约中也有其他合约无法访问的_私有函数_，然而它们对于去中心化应用程序的整体功能至关重要。 示例包括定期为用户铸造新非同质化代币的 `mintERC721Token()` 函数、在预测市场中付款的函数或在去中心化交易所中解锁质押代币的函数。

开发者需要每隔一段时间触发这些函数，以保持应用程序平稳运行。 然而，这可能导致开发者在普通任务上浪费更多时间，它是智能合约自动执行吸引人的原因。

一些去中心化预言机网络提供自动化服务，允许链下预言机节点根据用户定义的参数触发智能合约函数。 通常，这需要向预言机服务“注册”目标合约，提供资金支付预言机运营商，并指定触发合约的条件或时间。

Chainlink 的 [Keeper 网络](https://chain.link/keepers)提供智能合约方案，以信任最小化和去中心化的方式将常规维护工作外包。 阅读官方 [Keeper 文档](https://docs.chain.link/docs/chainlink-keepers/introduction/)，了解有关如何使合约与 Keeper 兼容以及如何使用 Upkeep 服务的信息。

## 如何使用区块链预言机 {#use-blockchain-oracles}

许多预言机应用程序都可以集成到以太坊去中心化应用程序中，如下所示：

**[Chainlink](https://chain.link/)** - _Chainlink 去中心化预言机网络提供防篡改的输入、输出和计算，支持任何区块链上的高级智能合约。_

**[Witnet](https://witnet.io/)** - _Witnet 是一种无需许可、去中心化和抗审查的预言机，帮助智能合约对真实事件做出响应，提供强大的加密经济保障。_

**[UMA 预言机](https://uma.xyz)** - _UMA 的乐观预言机允许智能合约快速接收不同应用程序的任何类型的数据，包括保险、金融衍生品和预测市场。_

**[Tellor](https://tellor.io/)** - _Tellor 是一种透明的、无需许可的预言机协议，可以让智能合约在需要时轻松获取任何数据。_

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol 是一个跨链数据预言机平台，它将真实数据和应用程序接口聚合并连接到智能合约。_

**[Paralink](https://paralink.network/)** - _Paralink 为运行在以太坊和其他热门区块链上的智能合约提供一个开源的去中心化预言机平台。_

**[Pyth 网络](https://pyth.network/)** - _Pyth 网络是第一方金融预言机网络，旨在在防篡改、去中心化和自我可持续的环境中在链上发布连续的真实数据。_

**[API3 去中心化自治组织](https://www.api3.org/)** - _API3 去中心化自治组织提供第一方预言机解决方案，在智能合约的去中心化解决方案中实现更高的来源透明度、安全性和可扩展性_。

## 延伸阅读 {#further-reading}

**文章**

- [什么是区块链预言机？](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [什么是区块链预言机？](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [去中心化预言机：综述](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [在以太坊实现区块链预言机](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [为什么智能合约无法调用应用程序接口？](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [我们为什么需要去中心化预言机](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) — _Bankless_
- [那么，你想要使用价格预言机](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**视频**

- [预言机和区块链实用程序拓展](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_
- [第一方与第三方预言机的区别](https://blockchainoraclesummit.io/first-party-vs-third-party-oracles/) - _Blockchain Oracle Summit_

**教程**

- [如何通过 Solidity 语言在以太坊上提取当前价格](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_

**示例项目**

- [使用 Solidity 语言为以太坊编写的完整 Chainlink 启动项目y](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
