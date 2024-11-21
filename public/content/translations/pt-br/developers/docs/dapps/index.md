---
title: Introdução à aplicativos descentralizados (dapps)
description:
lang: pt-br
---

Um aplicativo descentralizado (dapp) é um aplicativo construído em uma rede descentralizada que combina um [contrato inteligente](/developers/docs/smart-contracts/) e uma interface de usuário de front-end. Observe que no Ethereum os contratos inteligentes são acessíveis e transparentes – como APIs abertas — então, seu dapp pode até incluir um contrato inteligente que outra pessoa escreveu.

## Pré-requisitos {#prerequisites}

Antes de aprender sobre dapps, você deve entender sobre os [fundamentos da blockchain](/developers/docs/intro-to-ethereum/), ler sobre a rede Ethereum e como ela é descentralizada.

## Definição de dapp {#definition-of-a-dapp}

Um dapp tem seu código de back-end em execução em uma rede peer-to-peer descentralizada. Contraste isso com um aplicativo no qual o código de back-end está sendo executado em servidores centralizados.

Um dapp pode ter código front-end e interfaces de usuário escritas em qualquer linguagem (como um aplicativo) que podem fazer chamadas para seu back-end. Além disso, o front-end dele pode ser hospedado em um sistema de armazenamento descentralizado, como [IPFS](https://ipfs.io/).

- **Descentralizado**: os dapps operam no Ethereum, uma plataforma descentralizada pública aberta onde ninguém ou grupo tem controle
- **Determinista** ou seja, eles desempenham a mesma função independentemente do ambiente em que são executados.
- **Turing completo**: os dapps podem executar qualquer ação, dados os recursos necessários
- **Isolado**: significa que eles são executados em um ambiente virtual conhecido como Ethereum Virtual Machine para que, se o contrato inteligente tiver um bug, não dificultará o funcionamento normal da rede blockchain

### Sobre contratos inteligentes {#on-smart-contracts}

Para introduzir dapps, precisamos introduzir contratos inteligentes (que são dapps de back-end, para assim dizer). Para obter uma visão geral detalhada, vá para a nossa seção sobre [ contratos inteligentes](/developers/docs/smart-contracts/).

Um contrato inteligente é um código presente na blockchain Ethereum e funciona exatamente como programado. Uma vez que eles são implantados na rede, você não pode alterá-los. Os dapps podem ser descentralizados porque são controlados pela lógica escrita no contrato, não por um indivíduo ou empresa. Isso também significa que você precisa projetar seus contratos com muito cuidado e testá-los cuidadosamente.

## Benefícios do desenvolvimento de dapps {#benefits-of-dapp-development}

- **Zero tempo de inatividade**: uma vez que o contrato inteligente é implementado na base de um aplicativo e na blockchain, a rede como um todo sempre será capaz de atender clientes que procuram interagir com o contrato. Os atores mal-intencionados, portanto, não podem lançar ataques de negação de serviço direcionados a dapps individuais.
- **Privacidade**: você não precisa fornecer identidade real para implantar ou interagir com um dapp.
- **Resistância à censura**: nenhuma entidade na rede pode impedir que os usuários enviem transações, implantem dapps ou leiam dados da blockchain.
- **Completar a integridade dos dados**: os dados armazenados na blockchain são imutáveis e indiscutíveis, graças aos primitivos criptográficos. Atores mal-intencionados não podem forjar transações ou outros dados que já foram tornados públicos.
- **Computação sem confiança/comportamento verificável** – Contratos inteligentes podem ser analisados e têm garantia de execução de maneiras previsíveis, sem a necessidade de confiar em uma autoridade central. Isso não é verdade nos modelos tradicionais; por exemplo, quando usamos sistemas bancários on-line, temos que confiar que as instituições financeiras não usarão indevidamente nossos dados financeiros, adulterarão registros ou serão hackeadas.

## Benefícios do desenvolvimento de dapps {#drawbacks-of-dapp-development}

- **Manutenção**: os dapps podem ser mais difíceis de manter, porque o código e os dados publicados na blockchain são mais difíceis de modificar. É difícil para os desenvolvedores fazerem atualizações em seus dapps (ou nos dados armazenados sob um dapp) uma vez que eles foram implantados, mesmo se bugs ou riscos de segurança forem identificados em uma versão antiga.
- **Impactos no desempenho**: há um grande impacto no desempenho, e o dimensionamento é realmente difícil. Para alcançar o nível de segurança, integridade, transparência e confiabilidade que o Ethereum aspira, cada nó executa e armazena cada transação. Além disso, o consenso de prova de participação também leva tempo.
- **Congestionamento da rede **: pelo menos no modelo atual, se um dapp estiver usando muitos recursos computacionais, toda a rede é apoiada. Atualmente, a rede só é capaz de processar cerca de 10 transações por segundo; se as transações estiverem sendo enviadas mais rápido do que isso, o pool de transações não confirmadas poderá aumentar rapidamente.
- **Experiência do usuário**: pode ser mais difícil projetar experiências amigáveis ao usuário porque o usuário final pode achar muito difícil configurar uma pilha de ferramentas necessária para interagir com a blockchain de uma forma verdadeiramente segura.
- **Centralização**: soluções amigáveis para o usuário e amigáveis ao desenvolvedor construídas sobre a camada base do Ethereum podem acabar parecendo serviços centralizados. Por exemplo, tais serviços podem armazenar chaves ou outros pontos sensíveis do servidor de informações, servir um front-end usando um servidor centralizado ou executar uma lógica de negócios importante em um servidor centralizado antes de escrever na blockchain. A centralização elimina muitas (se não todas) das vantagens da blockchain sobre o modelo tradicional.

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Ferramentas para criar dapps {#dapp-tools}

**Scaffold-ETH _: experimente rápido com Solidity usando um front-end que se adapta ao seu contrato inteligente._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Exemplo de dapp](https://punkwallet.io/)

**Crie um aplicativo Eth_: crie aplicativos com a tecnologia Ethereum apenas com um comando._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _: ferramenta FOSS para gerar front-end de dapp de um [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _: ferramenta FOSS para desenvolvedores de Ethereum testar seus nós e compor e depurar chamadas RPC do navegador._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDKs em todos os idiomas, contratos inteligentes, ferramentas e infraestrutura para o desenvolvimento da web3._**

- [Página inicial](https://thirdweb.com/)
- [Documentação](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint - _Plataforma de desenvolvimento web3 de nível empresarial para implantar contratos inteligentes, habilitar pagamentos com cartão de crédito e entre cadeias, e usar APIs para criar, distribuir, vender, armazenar e editar NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Documentação](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Leitura adicional {#further-reading}

- [Ver dapps](/dapps)
- [A arquitetura de um aplicativo Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Um guia de 2021 para aplicativos descentralizados](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [O que são aplicativos descentralizados?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps populares](https://www.alchemy.com/dapps) - _Alchemy_

_Conhece um recurso da comunidade que te ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Introdução à pilha de Ethereum](/developers/docs/ethereum-stack/)
- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
