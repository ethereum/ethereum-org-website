---
title: Propostas de Melhorias do Ethereum (EIPs)
description: As informações básicas de que você precisa para entender as EIPs
lang: pt-br
---

# Introdução às Propostas de Melhoria do Ethereum (EIPs) {#introduction-to-ethereum-improvement-proposals}

## O que são EIPs? {#what-are-eips}

As [Propostas de Melhoria do Ethereum (EIPs)](https://eips.ethereum.org/) são padrões que especificam possíveis novos recursos ou processos para o Ethereum. As EIPs contêm especificações técnicas para as mudanças propostas e agem como a "fonte da verdade" para a comunidade. Atualizações de rede e padrões de aplicativos para Ethereum são discutidos e desenvolvidos através do processo EIP.

Qualquer um da comunidade Ethereum tem a capacidade de criar uma EIP. As diretrizes para escrever EIPs estão incluídas no [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Uma EIP deve fornecer principalmente uma especificação técnica concisa com um pouco de motivação. O autor da EIP é responsável por obter consenso dentro da comunidade e documentar opiniões alternativas. Dada a alta barreira técnica para enviar uma EIP bem-elaborada, historicamente, a maioria dos autores de EIP são geralmente desenvolvedores de aplicativos ou protocolos.

## Por que as EIPs são importantes? {#why-do-eips-matter}

As EIPs desempenham um papel central em como as mudanças acontecem e são documentadas no Ethereum. Elas são a forma como as pessoas podem propor, debater e adotar mudanças. Existem [diferentes tipos de EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types), incluindo EIPs de núcleo para alterações de protocolo de baixo nível que afetam o consenso e exigem uma atualização da rede, como a [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), e ERCs para padrões de aplicação, como a [EIP-20](https://eips.ethereum.org/EIPS/eip-20) e a [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Toda atualização de rede consiste em um conjunto de EIPs que precisam ser implementados por cada [cliente Ethereum](/learn/#clients-and-nodes) na rede. Isso significa que para estar em consenso com outros clientes na rede principal do Ethereum, os desenvolvedores do cliente precisam ter certeza de que todos implementaram as EIPs necessárias.

Além de fornecer uma especificação técnica para mudanças, as EIPs são a unidade em torno da qual a governança acontece no Ethereum: qualquer um pode propor uma EIP e, em seguida, vários stakeholders da comunidade discutirão para determinar se ela deve ser adotada como padrão ou incluída em uma melhoria da rede. Como as EIPs não centrais não precisam ser adotadas por todos os aplicativos (por exemplo, é possível criar um token diferente do ERC20), embora as EIPs centrais devam ser amplamente adotadas (porque todos os nós devem ser atualizados para se manterem parte da mesma rede), as EIPs centrais exigem um consenso mais amplo dentro da comunidade do que as EIPs não centrais.

## História das EIPs {#history-of-eips}

O [repositório GitHub das Propostas de Melhoria do Ethereum (EIPs)](https://github.com/ethereum/EIPs) foi criado em outubro de 2015. O processo de EIPs é baseado no processo das [Propostas de Melhoria do Bitcoin (BIPs)](https://github.com/bitcoin/bips), que por sua vez é baseado no processo das [Propostas de Melhoria do Python (PEPs)](https://www.python.org/dev/peps/).

Os editores de EIP têm a tarefa de revisar os processos das EIPs quanto a coerência técnica, problemas de formatação e correção de ortografia, gramática e estilo de código. Martin Becze, Vitalik Buterin, Gavin Wood e alguns outros foram os editores originais de EIP de 2015 até o final de 2016.

Os editores atuais de EIP são

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Os editores eméritos da EIP são

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Se você quiser se tornar um editor de EIP, verifique a [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Os editores de EIP decidem quando uma proposta está pronta para se tornar uma EIP e ajudam os autores da EIP a avançar com suas propostas. Os [Ethereum Cat Herders](https://www.ethereumcatherders.com/) ajudam a organizar reuniões entre os editores de EIPs e a comunidade (veja o [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

O processo de padronização completo, juntamente com o gráfico, está descrito na [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Saiba mais {#learn-more}

Se você estiver interessado em ler mais sobre EIPs, confira o [site das EIPs](https://eips.ethereum.org/) e a [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Aqui estão alguns links úteis:

- [Uma lista de todas as Propostas de Melhoria do Ethereum](https://eips.ethereum.org/all)
- [Uma descrição de todos os tipos de EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Uma descrição de todos os status de EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Projetos de educação da comunidade {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _O PEEPanEIP é uma série de vídeos educativos que discute as Propostas de Melhoria do Ethereum (EIPs) e os principais recursos das próximas atualizações._
- [EIPs.wtf](https://www.eips.wtf/) — _O EIPs.wtf fornece informações extras para as Propostas de Melhoria do Ethereum (EIPs), incluindo seu status, detalhes de implementação, pull requests relacionados e feedback da comunidade._
- [EIP.Fun](https://eipfun.substack.com/) — _O EIP.Fun fornece as últimas notícias sobre as Propostas de Melhoria do Ethereum (EIPs), atualizações sobre as reuniões de EIP e muito mais._
- [EIPs Insight](https://eipsinsight.com/) — _O EIPs Insight é uma representação do estado do processo e das estatísticas das Propostas de Melhoria do Ethereum (EIPs), de acordo com as informações coletadas de diferentes fontes._

## Participe {#participate}

Qualquer pessoa pode criar uma EIP. Antes de enviar uma proposta, é preciso ler a [EIP-1](https://eips.ethereum.org/EIPS/eip-1), que descreve o processo de EIP e como escrever uma EIP, e solicitar feedback no fórum [Ethereum Magicians](https://ethereum-magicians.org/), onde as propostas são discutidas primeiro com a comunidade antes que uma versão preliminar seja enviada.

## Referências {#references}

<cite class="citation">

Conteúdo da página fornecido em parte de [Governança de Desenvolvimento do Protocolo Ethereum e Coordenação de Atualização de Rede](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) por Hudson Jameson

</cite>
