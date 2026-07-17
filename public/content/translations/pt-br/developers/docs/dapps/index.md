---
title: "Introdução técnica aos dapps"
description: 
lang: pt-br
---

Um aplicativo descentralizado (dapp) é um aplicativo construído em uma rede descentralizada que combina um [contrato inteligente](/developers/docs/smart-contracts/) e uma interface de usuário de frontend. No [Ethereum](/), os contratos inteligentes são acessíveis e transparentes – como APIs abertas – para que seu dapp possa até incluir um contrato inteligente que outra pessoa tenha escrito.

## Pré-requisitos {#prerequisites}

Antes de aprender sobre dapps, você deve cobrir o [básico sobre blockchain](/developers/docs/intro-to-ethereum/) e ler sobre a rede Ethereum e como ela é descentralizada.

## Definição de um dapp {#definition-of-a-dapp}

Um dapp tem seu código de backend rodando em uma rede ponto a ponto descentralizada. Contraste isso com um aplicativo onde o código de backend roda em servidores centralizados.

Um dapp pode ter código de frontend e interfaces de usuário escritos em qualquer linguagem (assim como um aplicativo) para fazer chamadas ao seu backend. Além disso, seu frontend pode ser hospedado em armazenamento descentralizado, como o [IPFS](https://ipfs.io/).

- **Descentralizado** - os dapps operam no Ethereum, uma plataforma descentralizada pública e aberta onde nenhuma pessoa ou grupo tem controle
- **Determinístico** - os dapps executam a mesma função independentemente do ambiente em que são executados
- **Turing completo** - os dapps podem executar qualquer ação, dados os recursos necessários
- **Isolado** - os dapps são executados em um ambiente virtual conhecido como Ethereum Virtual Machine (EVM), de modo que, se o contrato inteligente tiver um bug, ele não prejudicará o funcionamento normal da rede blockchain

### Sobre contratos inteligentes {#on-smart-contracts}

Para introduzir os dapps, precisamos introduzir os contratos inteligentes – o backend de um dapp, na falta de um termo melhor. Para uma visão geral detalhada, acesse nossa seção sobre [contratos inteligentes](/developers/docs/smart-contracts/).

Um contrato inteligente é um código que vive na blockchain do Ethereum e é executado exatamente como programado. Uma vez que os contratos inteligentes são implantados na rede, você não pode alterá-los. Os dapps podem ser descentralizados porque são controlados pela lógica escrita no contrato, não por um indivíduo ou empresa. Isso também significa que você precisa projetar seus contratos com muito cuidado e testá-los exaustivamente.

## Benefícios do desenvolvimento de dapps {#benefits-of-dapp-development}

- **Tempo de inatividade zero** – Uma vez que o contrato inteligente é implantado na blockchain, a rede como um todo sempre será capaz de atender aos clientes que desejam interagir com o contrato. Atores mal-intencionados, portanto, não podem lançar ataques de negação de serviço direcionados a dapps individuais.
- **Privacidade** – Você não precisa fornecer uma identidade do mundo real para implantar ou interagir com um dapp.
- **Resistência à censura** – Nenhuma entidade única na rede pode impedir os usuários de enviar transações, implantar dapps ou ler dados da blockchain.
- **Integridade completa dos dados** – Os dados armazenados na blockchain são imutáveis e indiscutíveis, graças às primitivas criptográficas. Atores mal-intencionados não podem forjar transações ou outros dados que já foram tornados públicos.
- **Computação sem necessidade de confiança/comportamento verificável** – Os contratos inteligentes podem ser analisados e têm a garantia de serem executados de maneira previsível, sem a necessidade de confiar em uma autoridade central. Isso não é verdade nos modelos tradicionais; por exemplo, quando usamos sistemas bancários online, devemos confiar que as instituições financeiras não farão uso indevido de nossos dados financeiros, não adulterarão registros ou não serão hackeadas.

## Desvantagens do desenvolvimento de dapps {#drawbacks-of-dapp-development}

- **Manutenção** – Os dapps podem ser mais difíceis de manter porque o código e os dados publicados na blockchain são mais difíceis de modificar. É difícil para os desenvolvedores fazerem atualizações em seus dapps (ou nos dados subjacentes armazenados por um dapp) depois de implantados, mesmo que bugs ou riscos de segurança sejam identificados em uma versão antiga.
- **Sobrecarga de desempenho** – Há uma enorme sobrecarga de desempenho e o dimensionamento é muito difícil. Para atingir o nível de segurança, integridade, transparência e confiabilidade que o Ethereum almeja, cada nó executa e armazena cada transação. Além disso, o consenso de Prova de Participação (PoS) também leva tempo.
- **Congestionamento da rede** – Quando um dapp usa muitos recursos computacionais, toda a rede fica congestionada. Atualmente, a rede só pode processar cerca de 10 a 15 transações por segundo; se as transações estiverem sendo enviadas mais rápido do que isso, o pool de transações não confirmadas pode aumentar rapidamente.
- **Experiência do usuário** – Pode ser mais difícil projetar experiências amigáveis porque o usuário final médio pode achar muito difícil configurar uma pilha de ferramentas necessária para interagir com a blockchain de maneira verdadeiramente segura.
- **Centralização** – Soluções amigáveis para usuários e desenvolvedores construídas sobre a camada base do Ethereum podem acabar parecendo serviços centralizados de qualquer maneira. Por exemplo, tais serviços podem armazenar chaves ou outras informações confidenciais no lado do servidor, servir um frontend usando um servidor centralizado ou executar lógicas de negócios importantes em um servidor centralizado antes de gravar na blockchain. A centralização elimina muitas (se não todas) as vantagens da blockchain sobre o modelo tradicional.

## Prefere aprender visualmente? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Ferramentas para criar dapps {#dapp-tools}

**Scaffold-ETH _- Experimente rapidamente com Solidity usando um frontend que se adapta ao seu contrato inteligente._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Dapp de exemplo](https://punkwallet.io/)

**Create Eth App _- Crie aplicativos baseados em Ethereum com um comando._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Ferramenta FOSS para gerar frontends de dapp a partir de uma [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Ferramenta FOSS para desenvolvedores Ethereum testarem seu nó e comporem e depurarem chamadas RPC a partir do navegador._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDKs em todas as linguagens, contratos inteligentes, ferramentas e infraestrutura para desenvolvimento Web3._**

- [Página inicial](https://thirdweb.com/)
- [Documentação](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Plataforma de desenvolvimento Web3 de nível empresarial para implantar contratos inteligentes, habilitar pagamentos com cartão de crédito e entre cadeias, e usar APIs para criar, distribuir, vender, armazenar e editar NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Documentação](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Leitura adicional {#further-reading}

- [Explorar dapps](/apps)
- [A arquitetura de um aplicativo Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Um guia de 2021 para aplicativos descentralizados](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [O que são aplicativos descentralizados?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps populares](https://www.alchemy.com/dapps) - _Alchemy_

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Introdução à pilha do Ethereum](/developers/docs/ethereum-stack/)
- [Frameworks de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais: Crie aplicativos e frontends no Ethereum {#tutorials}

- [Passo a passo do contrato Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Um passo a passo anotado dos contratos principais do Uniswap v2 explicando como o formador de mercado automatizado (AMM) funciona._
- [Construindo uma interface de usuário para o seu contrato](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Como construir um frontend moderno com React + Wagmi que se conecta ao seu contrato inteligente._
- [Contrato inteligente Hello World para iniciantes – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Tutorial de ponta a ponta: escreva, implante e construa um frontend para um contrato inteligente simples._
- [Componentes de servidor e agentes para aplicativos Web3](/developers/tutorials/server-components/) _– Como escrever componentes de servidor TypeScript que escutam eventos da blockchain e respondem com transações._
- [IPFS para interfaces de usuário descentralizadas](/developers/tutorials/ipfs-decentralized-ui/) _– Como hospedar o frontend do seu dapp no IPFS para resistência à censura._