---
title: Agentes de IA
metaTitle: Agentes de IA | Agentes de IA no Ethereum
description: Uma visão geral dos agentes de IA no Ethereum
lang: pt-br
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Pessoas reunidas em uma mesa com terminal
summaryPoints:
  - "IA que interage com a blockchain e negocia de forma independente"
  - "Controla carteiras e fundos onchain"
  - "Contrata humanos ou outros agentes para trabalhar"
buttons:
  - content: O que são agentes de IA?
    toId: what-are-ai-agents
  - content: Explorar agentes
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Imagine navegar no Ethereum com um assistente de IA que estuda as tendências de mercado onchain 24 horas por dia, 7 dias por semana, responde a perguntas e até executa transações em seu nome. Bem-vindo ao mundo dos Agentes de IA — sistemas inteligentes projetados para simplificar sua vida digital.

No Ethereum, estamos vendo inovações de agentes de IA que variam de influenciadores virtuais e criadores de conteúdo autônomos a plataformas de análise de mercado em tempo real, capacitando os usuários ao fornecer insights, entretenimento e eficiência operacional.

## O que são agentes de IA? {#what-are-ai-agents}

Agentes de IA são programas de software que usam inteligência artificial para realizar tarefas ou tomar as próprias decisões. Eles aprendem com dados, adaptam-se a mudanças e lidam com tarefas complexas. Eles operam sem parar e podem detectar oportunidades instantaneamente.

### Como os agentes de IA funcionam com blockchains {#how-ai-agents-work-with-blockchains}

Nas finanças tradicionais, os agentes de IA frequentemente operam em ambientes centralizados com entradas de dados limitadas. Isso prejudica sua capacidade de aprender ou gerenciar ativos de forma autônoma.

Em contraste, o ecossistema descentralizado do Ethereum oferece várias vantagens importantes:

- <strong>Dados transparentes:</strong> Acesso a informações da blockchain em tempo real.
- <strong>Verdadeira propriedade de ativos:</strong> Os ativos digitais são de propriedade total dos agentes de IA.
- <strong>Funcionalidade onchain robusta:</strong> Permite que os Agentes de IA executem transações, interajam com contratos inteligentes, forneçam liquidez e colaborem entre protocolos.

Esses fatores transformam os agentes de IA de simples bots em sistemas dinâmicos e de autoaperfeiçoamento que oferecem valor significativo em vários setores:

<Grid>
  <Card title="DeFi automatizado" emoji=":money_with_wings:" description="Os agentes de IA acompanham de perto as tendências do mercado, executam negociações e gerenciam portfólios — tornando o complexo mundo do DeFi muito mais acessível."/>
  <Card title="Nova economia de agentes de IA" emoji="🌎" description="Os agentes de IA podem contratar outros agentes (ou humanos) com habilidades diferentes para realizar tarefas especializadas para eles." />
  <Card title="Gestão de risco" emoji="🛠️" description="Ao monitorar atividades transacionais, os agentes de IA podem ajudar a detectar golpes e proteger seus ativos digitais melhor e mais rápido." />
</Grid>

## IA verificável {#verifiable-ai}

Agentes de IA executados offchain frequentemente se comportam como "caixas pretas" — seu raciocínio, entradas e saídas não podem ser verificados de forma independente. O Ethereum muda isso. Ao ancorar o comportamento do agente onchain, os desenvolvedores podem construir agentes que são _trustless_ (não dependem de confiança), _transparentes_ e _economicamente autônomos_. As ações de tais agentes podem ser auditadas, restringidas e comprovadas.

### Inferência verificável {#verifiable-inference}

A inferência de IA tradicionalmente acontece offchain, onde a execução é barata, mas a execução do modelo é opaca. No Ethereum, os desenvolvedores podem combinar agentes com computação verificável usando várias técnicas:

- [**zkML (aprendizado de máquina de conhecimento zero)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) permite que os agentes provem que um modelo foi executado corretamente sem revelar o modelo ou as entradas
- [**Atestados de TEE (ambiente de execução confiável)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) permitem provas apoiadas por hardware de que um agente executou um modelo ou caminho de código específico
- A **imutabilidade onchain** garante que essas provas e atestados possam ser referenciados, reproduzidos e confiáveis por qualquer contrato ou agente

## Pagamentos e comércio com x402 {#x402}

O [protocolo x402](https://www.x402.org/), implantado no Ethereum e em L2s, oferece aos agentes uma maneira nativa de pagar por recursos e interagir economicamente sem intervenção humana. Os agentes podem:

- Pagar por computação, dados e chamadas de API usando stablecoins
- Solicitar ou verificar atestados de outros agentes ou serviços
- Participar do comércio de agente para agente, comprando e vendendo computação, dados ou saídas de modelo

O x402 transforma o Ethereum em uma camada econômica programável para agentes autônomos, permitindo interações de pagamento por uso em vez de contas, assinaturas ou faturamento centralizado.

### Segurança financeira de agentes {#agentic-finance-security}

Agentes autônomos precisam de proteções. O Ethereum as fornece no nível da carteira e do contrato:

- [Contas inteligentes (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) permitem que os desenvolvedores imponham limites de gastos, listas de permissões, chaves de sessão e permissões granulares
- Restrições programadas em contratos inteligentes podem limitar o que um agente tem permissão para fazer
- Limites baseados em inferência (por exemplo, exigir uma prova zkML antes de executar uma ação de alto risco) adicionam outra camada de segurança

Esses controles permitem a implantação de agentes autônomos que não são ilimitados.

### Registros onchain: ERC-8004 {#erc-8004}

O [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) define registros onchain para identidade, reputação e validação de agentes. Coautorado por colaboradores da MetaMask, Fundação Ethereum, Google e Coinbase, ele está implantado em 16 redes, incluindo a Rede Principal do Ethereum, Base, Polygon, Arbitrum e outras.

Ele fornece:

- Um **registro de identidade** para identificadores de agentes portáteis e resistentes à censura
- Um **registro de reputação** para sinais de feedback padronizados em todos os aplicativos
- Um **registro de validação** para solicitar verificação independente (zkML, TEE, reexecução com stake)

O ERC-8004 torna mais fácil para os agentes descobrirem, verificarem e transacionarem entre si em um ambiente totalmente descentralizado.

## Agentes de IA no Ethereum {#ai-agents-on-ethereum}

Estamos começando a explorar todo o potencial dos agentes de IA, e os projetos já estão aproveitando a sinergia entre IA e blockchain — particularmente em transparência e monetização.

<AiAgentProductLists list="ai-agents" />

<strong>A primeira aparição de Luna como convidada de um podcast</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Carteiras controladas por agentes {#agent-controlled-wallets}

Agentes como Luna ou AIXBT controlam sua própria carteira onchain ([carteira do AIXBT](https://clusters.xyz/aixbt), [carteira da Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), permitindo que eles deem gorjetas aos fãs e participem de atividades econômicas.

Durante a campanha social da Luna no X, #LunaMuralChallenge, a Luna selecionou e recompensou os vencedores por meio de sua carteira na Base — marcando <strong>o primeiro caso de uma IA contratando humanos por uma recompensa em cripto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Bom saber</strong></strong>
<p className="mt-2">Os agentes de IA e as ferramentas relacionadas ainda estão em desenvolvimento inicial e são muito experimentais — use com cautela.</p>
</AlertContent>
</Alert>

## Controle sua carteira usando comandos de bate-papo {#control-your-wallet-using-chat-commands}

Você pode pular as interfaces complicadas de finanças descentralizadas (DeFi) e gerenciar suas cripto com comandos simples de bate-papo.

Essa abordagem intuitiva torna as transações mais rápidas, fáceis e menos propensas a erros, como enviar fundos para o endereço errado ou pagar taxas a mais.

<AiAgentProductLists list="chat" />

## Agentes de IA vs. bots de IA {#ai-agents-vs-ai-bots}

A distinção entre agentes de IA e bots de IA às vezes pode ser confusa, pois ambos executam ações automatizadas com base em entradas.

- Os bots de IA são como assistentes automatizados — Eles seguem instruções específicas e pré-programadas para realizar tarefas rotineiras.
- Os agentes de IA são mais como companheiros inteligentes — Eles aprendem com a experiência, adaptam-se a novas informações e tomam decisões por conta própria.

|                     | Agentes de IA                                                          | Bots de IA                                  |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interações**      | Complexas, adaptáveis, autônomas                                       | Simples, escopo predefinido, codificadas    |
| **Aprendizado**     | Aprende continuamente, pode experimentar e se adaptar a novos dados em tempo real | Opera com dados pré-treinados ou regras fixas |
| **Conclusão de tarefas** | Visa atingir objetivos mais amplos                                     | Concentra-se apenas em tarefas específicas  |

## Aprofunde-se {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Você pode construir seu próprio agente de IA {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />