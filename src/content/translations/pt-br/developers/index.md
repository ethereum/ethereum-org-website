---
title: Ethereum para Desenvolvedores
description: Guias, recursos e ferramentas para desenvolvedores na Ethereum.
lang: pt-br
sidebar: true
sidebarDepth: 2
---

# Recursos para Desenvolvedores {#developer-resources}

<div class="featured">Guias, recursos e ferramentas para desenvolvedores na Ethereum.</div>

## Introdução {#getting-started}

**Se você é novo desenvolvendo na Ethereum, você está no lugar certo.** Estes guias escritos pela comunidade da Ethereum o introduzirão aos fundamentos básicos da arquitetura da Ethereum e a conceitos que podem diferir de outras plataformas de desenvolvimento de aplicativos com os quais você está familiarizado.

Quer começar a programar imediatamente? [Começe a construir aqui](/developers/learning-tools/).

Precisa de uma introdução geral? Confira nossos [recursos de aprendizado](/learn/).

**Recursos úteis**

- [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _Aug 7, 2017 - Matt Condon_
- [Ethereum In Depth, Part 1](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) _May 11, 2018 - Facu Spagnuolo_
- [Ethereum In Depth, Part 2 ](https://blog.zeppelin.solutions/ethereum-in-depth-part-2-6339cf6bddb9) _July 24, 2018 - Facu Spagnuolo_
- [Ethereum Development Walkthrough, Parts 1-5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _Jan 14, 2018 - dev_zl_
- [Ethereum 101, Parts 1-7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _Feb 13, 2019 - Wil Barnes_
- [Full Stack Hello World Voting Ethereum Dapp Tutorial ](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) _Jan 18, 2017 - Mahesh Murthy_
- [Mastering Ethereum - A comprehensive textbook available for free online](https://github.com/ethereumbook/ethereumbook) _Dec 1, 2018 - Andreas Antonopoulos & Gavin Wood_
- [Ethereum Developer Portal - Everything you need to get started building on Ethereum](https://ethereum.consensys.net/ethereum-dev-portal) _Atualizado frequentemente - ConsenSys_
- [Deconstructing a Solidity Contract](https://blog.zeppelin.solutions/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737) _Aug 13, 2018 - Alejandro Santander & Leo Arias_
- [Full Stack Dapp Tutorial Series ](https://kauri.io/collection/5b8e401ee727370001c942e3) _Atualizado frequentemente - Joshua Cassidy_

## Linguagens para Smart Contracts {#smart-contract-languages}

Todo programa rodando na Máquina Virtual da Ethereum (EVM) é comumente chamado de "contrato inteligente" (smart contract). As linguagens mais populares para programar smart contracts na Ethereum são **Solidity** e **Vyper**, embora existam outras [em desenvolvimento](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages).

**Solidity -\*\*\***A linguagem mais popular na Ethereum, inspirada pelo C++, Python e JavaScript.\*\*\*

- [Documentação](https://solidity.readthedocs.io)
- [Github](https://github.com/ethereum/solidity/)
- [Sala de bate-papo do Gitter sobre Solidity](https://gitter.im/ethereum/solidity/)

**Vyper -\*\*\***Linguagem focada em segurança para a Ethereum, baseada em Python.\*\*\*

- [Documentação](https://vyper.readthedocs.io)
- [Github](https://github.com/ethereum/vyper)
- [Sala de bate-papo do Gitter sobre Vyper](https://gitter.im/ethereum/vyper)

**Procurando outras opções?**

- [Lista de Ferramentas do Desenvolvedor na Ethereum #SmartContractLanguages](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## Recursos específicos de linguagem {#language-specific-resources}

Estamos construindo um conjunto de páginas de linguagens específicas para programadores aprenderem sobre a Ethereum em suas linguagens de programação favoritas.

- [Ethereum para desenvolvedores Java](/java/)
- [Ethereum para desenvolvedores Python](/python/)
- [Ethereum para desenvolvedores JavaScript](/javascript/)
- [Ethereum para desenvolvedores Go](/golang/)
- [Ethereum para desenvolvedores Rust](/rust/)
- [Ethereum para desenvolvedores .NET](/dot-net/)
- Mais em breve! Não vê o seu idioma aqui? [Abra uma questão](https://github.com/ethereum/ethereum-org-website/issues/new/choose)!

## Ferramentas de desenvolvedor {#developer-tools}

Ethereum possui uma grande e crescente quantidade de ferramentas para auxiliar os desenvolvedores na compilação, no teste e na implementação de seus aplicativos. Abaixo estão as ferramentas mais populares para começar. Se você quer ir mais a fundo, dê uma olhada [na lista completa](https://github.com/ConsenSys/ethereum-developer-tools-list).

### Frameworks {#frameworks}

**Truffle -\*\*\***Um ambiente de desenvolvimento, teste de framework, compilação e outras ferramentas.\*\*\*

- [trufflesuite.com](https://www.trufflesuite.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

**Embark -\*\*\***Um ambiente de desenvolvimento, teste de framework e outras ferramentas integradas com a Ethereum, IPFS e Whisper.\*\*\*

- [Documentação](https://embark.status.im/docs/)
- [GitHub](https://github.com/embark-framework/embark)

**Waffle -\*\*\***Um framework para desenvolvimento avançado de smart contracts e testes (baseado em ethers.js).\*\*\*

- [getwaffle.io](https://getwaffle.io/)
- [Github](https://github.com/EthWorks/Waffle)

**Etherlime -** **_Framework baseado em Ethers.js para o desenvolvimento (Solidity & Vyper), implantação, debug e teste de dapps._**

- [Documentação](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### Outras Ferramentas {#other-tools}

**Hardhat -** **_Um executor de tarefas para desenvolvedores de smart contracts da Ethereum._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**OpenZeppelin SDK -** **_O Kit Completo para Smart Contracts: Um conjunto de ferramentas para o desenvolvimento, compilação, atualização, implantação e interação com smart contracts._**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Fórum da Comunidade](https://forum.openzeppelin.com/c/sdk)

**The Graph -** **_Um protocolo para indexação de dados de Ethereum e IPFS e sua consulta usando GraphQL._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Documentação](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**Tenderly -** **_Uma plataforma para facilmente monitorar seus smart contracts com rastreamento de erros, alertas, métricas de desempenho e análises detalhadas de contratos._**

- [tenderly.dev](https://tenderly.dev/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Python Tooling -** **_Variedade de bibliotecas para interação com a Ethereum via Python._**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Brownie -** **_Ambiente de desenvolvimento e framework de testes em Python._**

- [Documentação](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/iamdefinitelyahuman/brownie)

**web3j -** **_Uma biblioteca de integração para Ethereum em Java/Android/Kotlin/Scala._**

- [web3j.io](https://web3j.io)
- [GitHub](https://github.com/web3j/web3j)
- [Documentação](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**One Click Dapp -** **_Gere um frontend diretamente do ABI para desenvolvimento rápido e teste._**

- [OneClickDapp.com](https://oneclickdapp.com)
- [Plugin Truffle](https://npmjs.org/package/oneclick)
- [Plugin Remix](https://github.com/pi0neerpat/remix-plugin-one-click-dapp)
- [GitHub](https://github.com/pi0neerpat/one-click-dapp)

**Procurando outras opções?**

- [Lista de Ferramentas do Desenvolvedor da Ethereum #Frameworks](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## Ambientes Integrados de Desenvolvimento (IDEs) {#integrated-development-environments-ides}

**Ethereum Studio -** **_IDE baseada na web ideal para novos desenvolvedores procurando experimentar smart contracts. Ethereum Studio apresenta vários modelos, integração com o MetaMask, logger de transações e uma Máquina Virtual Ethereum (EVM) integrada no navegador para ajudar você a começar a desenvolver na Ethereum o mais rápido possível._**

- [studio.ethereum.org](/en/studio/)
- [superblocks.com/ethereum-studio](https://superblocks.com/ethereum-studio)
- [GitHub](https://github.com/SuperblocksHQ/ethereum-studio)

**Visual Studio Code -** **_IDE profissional multiplataforma com suporte oficial da Ethereum._**

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Blockchain Development Kit para Ethereum](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain)
- [Plug-in do Azure Blockchain Workbench](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [Amostras de código](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)
- [GitHub](https://github.com/microsoft/vscode)

**Remix -** **_IDE baseado na web com análise estática integrada e uma máquina virtual de blockchain para testes._**

- [remix.ethereum.org](https://remix.ethereum.org/)

**EthFiddle -** **_IDE baseado na web que permite que você escreva, compile e depure seu smart contract._**

- [ethfiddle.com](https://ethfiddle.com/)
- [Gitter](https://gitter.im/loomnetwork/ethfiddle)

**Procurando outras opções?**

- [Lista de Ferramentas de Desenvolvedor da Ethereum #IDEs](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## APIs de Frontend em JavaScript {#frontend-javascript-apis}

**Web3.js -** **_API de Ethereum em JavaScript._**

- [Documentação](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Utilitários e implementação completa de uma carteira Ethereum em JavaScript e TypeScript._**

- [Documentação](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**light.js -** **_Uma biblioteca em alto nível reativa em JS otimizada para clientes leves._**

- [Documentação](https://paritytech.github.io/js-libs/light.js/)
- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Alternativa ao Web3.js em Typescript._**

- [Documentação](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Procurando outras opções?**

- [Lista de Ferramentas de Desenvolvedor da Ethereum #Frontend-Ethereum-APIs](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## APIs de Backend {#backend-apis}

**Infura -** **_A API da Ethereum como um serviço._**

- [infura.io](https://infura.io)
- [Documentação](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Gateway Cloudflare de Ethereum.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_Acesso por API JSON-RPC a mainnet e testnets da Ethereum._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentação](https://nodesmith.io/docs/#/ethereum/apiRef)

**Chainstack -**Nós Ethereum compartilhados e dedicados como um serviço**\*\***

- [chainstack.com](https://chainstack.com)
- [Documentação](https://docs.chainstack.com)

## Armazenamento {#storage}

**IPFS -** **_InterPlanetary File System é um sistema descentralizado de armazenamento e referenciamento de arquivos para a Ethereum._**

- [ipfs.io](https://ipfs.io/)
- [Documentação](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Swarm -** **_Uma plataforma de armazenamento distribuído e serviço de distribuição de conteúdo para a pilha Ethereum web3._**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [GitHub](https://github.com/ethersphere/swarm)

**OrbitDB -** **_Um banco de dados descentralizado peer to peer em cima do IPFS._**

- [Documentação](https://github.com/orbitdb/field-manual)
- [GitHub](https://github.com/orbitdb/orbit-db)

## Ferramentas de Segurança {#security-tools}

### Segurança do smart contract {#smart-contract-security}

**Slither -** **_Framework de análise estática para Solidity escrito em Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API de análise de segurança para contratos inteligentes na Ethereum._**

- [mythx.io](https://mythx.io/)
- [Documentação](https://docs.mythx.io/en/latest/)

**Mythril -** **_Ferramente de análise de segurança para bytecode EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentação](https://mythril-classic.readthedocs.io/en/master/about.html)

**SmartContract.Codes -** **_Mecanismo de pesquisa para código fonte solidity verificado._**

- [smartcontract.codes (alpha)](https://smartcontract.codes/)
- [Documentação](https://github.com/ethereum-play/smartcontract.codes/blob/master/README.md)

**Manticore -** **_Uma interface de linha de comando que usa uma ferramenta de execução simbólica em smart contracts e binários._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentação](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Scanner de segurança para smart contracts na Ethereum._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Uma ferramenta de verificação usada para conferir se um contrato está de acordo com o padrão ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Fórum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verificação Formal {#formal-verification}

**Informações sobre Verificação Formal**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _July 20, 2018 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _Jan 29, 2018 - Bernard Mueller_

**Procurando outras opções?**

- [Lista de ferramentas do desenvolvedor da Ethereum #Security-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## Ferramentas de Teste {#testing-tools}

**Solidity-Coverage -** **_Ferramenta de cobertura de código alternativa para solidity._**

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**hevm -** **_Implementação do EVM feita especificamente para testes de unidade e depuração de smart contracts._**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)
- [DappHub Chat](https://dapphub.chat/)

**Whiteblock Genesis -** **_Uma sandbox de desenvolvimento completa e plataforma de testes para blockchain._**

- [Whiteblock.io](https://whiteblock.io)
- [Documentação](https://docs.whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)

**Procurando outras opções?**

- [Lista de ferramentas do desenvolvedor da Ethereum #Testing-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## Exploradores de Blocos {#block-explorers}

Exploradores de blocos são serviços que permitem que você navegue no blockchain Ethereum (e suas redes de testes), encontrando informações sobre transações específicas, blocos, contratos e outras atividades.

- [Etherscan](https://etherscan.io/)
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)

## Redes de teste e Faucets {#testnets-and-faucets}

A comunidade Ethereum mantém múltiplas redes de teste. Estas são utilizadas por desenvolvedores para testar seus aplicativos em diferentes condições antes de implementá-los na rede principal Ethereum.

**Ropsten -** **_Blockchain baseado em Proof of Work, o ether de teste pode ser minerado._**

- [Test-ether faucet](https://faucet.ropsten.be/)

**Rinkeby -** **_Blockchain baseado em Proof of Authority, mantido pela equipe de desenvolvimento do Geth._**

- [Test-ether faucet](https://faucet.rinkeby.io/)
- [Universal faucet](https://faucets.blockxlabs.com)

**Goerli -** **_Blockchain baseado em Proof of Authority com vários clientes, construído e mantido pela comunidade Goerli_**

- [Test-ether faucet](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)
- [Universal faucet](https://faucets.blockxlabs.com)

## Clientes & Executando seu próprio nó {#clients--running-your-own-node}

A rede Ethereum é composta por muitos nodos, cada um dos quais executa software compatível com o cliente. A maioria destes nodos roda [Geth](https://geth.ethereum.org/) ou [Parity](https://www.parity.io/ethereum/), e cada um deles pode ser configurado de diferentes maneiras de acordo com suas necessidades.

### Clientes {#clients}

**Geth -** **_Cliente Ethereum escrito em Go._**

- [GitHub](https://github.com/ethereum/go-ethereum)
- [Discord chat](https://discordapp.com/invite/nthXNEv)

**Parity -** **_Cliente Ethereum escrito em Rust._**

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

**Pantheon -** **_Cliente Ethereum escrito em Java._**

- [pegasys.tech](http://pegasys.tech)
- [GitHub](https://github.com/PegaSysEng/pantheon/)

**Nethermind -** **_Cliente Ethereum escrito em C# .NET Core._**

- [Nethermind.io](http://nethermind.io/)
- [GitHub](https://github.com/NethermindEth/nethermind)
- [Gitter](https://gitter.im/nethermindeth/nethermind)

### Executando seu próprio nó {#running-your-own-node}

**Ethnode -** **_Execute um nó Ethereum (Geth ou Parity) para desenvolvimento local._**

- [GitHub](https://github.com/vrde/ethnode)

**Recursos de Nodo Ethereum**

- [Node Configuration Cheat Sheet](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _Jan 5, 2019 - Afri Schoeden_

**Procurando outras opções?**

- [Lista de Ferramentas do Desenvolvedor da Ethereum #Ethereum-clients](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## Melhores Práticas, Padrões e Anti-padrões {#best-practices-patterns-and-anti-patterns}

### Contratos Inteligentes {#smart-contracts}

**DappSys -** **_Blocos de código seguros, simples e flexíveis para smart contracts._**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

**OpenZeppelin Contracts -** **_Biblioteca para o desenvolvimento de smart contracts seguros._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fórum da Comunidade](https://forum.openzeppelin.com/c/contracts)

**aragonOS -** **_Padrões para atualização & controle de permissões._**

- [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html#aragonos-provides-the-following-functionality)
- [Documentação](https://wiki.aragon.org/)

**Registro de Falhas do Contrato Inteligente**

- [Registro SWC](https://smartcontractsecurity.github.io/SWC-registry/)
- [GitHub](https://github.com/SmartContractSecurity/SWC-registry)

### Segurança {#security}

**Guia de melhores práticas de segurança para Contrato Inteligente**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Coleção agregada de recomendações de segurança e melhores práticas](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Smart Contract Security Verification Standard (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

**Procurando outras opções?**

- [Lista de Ferramentas de Desenvolvedores da Ethereum #Patterns—best-practices](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## Treinamento & Suporte ao desenvolvedor {#developer-support--training}

### Aprendizado Geral {#general-learning}

**Ethereum Stackexchange**

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)

**ConsenSys Academy -** **_Um curso de desenvolvedor Ethereum individualizado e completo aberto o ano todo._**

- [consensys.academy](https://consensys.net/academy/ondemand/)

**Sala de bate-papo sobre Solidity no Gitter**

- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)

**Todas as Salas de bate-papo sobre Ethereum no Gitter**

- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)

**Chainshot -** **_Tutoriais de programação de dapps baseados em Web._**

- [chainshot.com](https://www.chainshot.com/)

**Blockgeeks -** **_Cursos online sobre tecnologia blockchain._**

- [courses.blockgeeks.com](https://courses.blockgeeks.com/)

**DappUniversity -** **_Aprenda a criar aplicações descentralizadas (dapps) no blockchain da Ethereum._**

- [DappUniversity.com](http://www.dappuniversity.com/)

**B9lab Academy -** **_Possui o curso profissional mais antigo de desenvolvimento de dapps em Ethereum & outras leituras para auditores e dúvidas. Inclui mentorias e revisão de código._**

- [academy.b9lab.com](https://academy.b9lab.com)

### Aprendizado baseado em Jogos {#game-based-learning}

**Cryptozombies -** **_Aprenda a programar jogos na Ethereum._**

- [Cryptozombies.io](https://cryptozombies.io/)

**Ethernaut -** **_Jogo de guerra em Solidity em que cada nível é um contrato a ser hackeado._**

- [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)

**Capture the Ether -** **_O jogo de segurança de smart contracts de Ethereum._**

- [capturetheether.com](https://capturetheether.com/)

## Design UI/UX {#uiux-design}

- [Challenge of UX in Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _June 25, 2018 - Anna Rose_
- [Designing for blockchain: what’s different and what’s at stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _March 22, 2018 - Sarah Baker Mills_

**Rimble UI** **_-Componentes e padrões de design adaptáveis para aplicações descentralizadas._**

- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

## Padrões {#standards}

A comunidade Ethereum adotou muitos padrões que são úteis para os desenvolvedores. Tipicamente, estes são introduzidos como [Propostas de Melhoria na Ethereum](http://eips.ethereum.org/) (EIPs), as quais são discutidas pela comunidade através de um [processo padronizado](http://eips.ethereum.org/EIPS/eip-1).

- [Lista de EIPs](http://eips.ethereum.org/)
- [Repositório de Github de EIP](https://github.com/ethereum/EIPs)
- [Tabela de discussão de EIP](https://ethereum-magicians.org/c/eips)
- [Ethereum Governance Overview](https://blog.bmannconsulting.com/ethereum-governance/) _March 31, 2019 - Boris Mann_
- [Lista de reprodução de todas as reuniões de Ethereum Core Dev](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(YouTube Playlist)_

Determinadas EIPs dizem respeito a padrões de aplicativo (por exemplo, um formato de contrato inteligente padrão), que são introduzidos como [Ethereum Requests for Comment (ERC)](https://eips.ethereum.org/erc). Muitos dos ERCs são padrões críticos utilizados amplamente em todo o ecossistema Ethereum.

- [Lista de ERCs](http://eips.ethereum.org/erc)
- [ERC20 - Uma interface padrão para tokens](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - Uma interface padrão para tokens não fungíveis](https://eips.ethereum.org/EIPS/eip-721)
