---
title: Introdução às Propostas de Melhoria do Ethereum (EIPs)
metaTitle: Propostas de Melhoria do Ethereum (EIPs)
description: As informações básicas que você precisa para entender as EIPs
lang: pt-br
---

## O que são EIPs? {#what-are-eips}

[Propostas de Melhoria do Ethereum (EIPs)](https://eips.ethereum.org/) são padrões que especificam potenciais novos recursos ou processos para o Ethereum. As EIPs contêm especificações técnicas para as mudanças propostas e atuam como a "fonte da verdade" para a comunidade. Atualizações da rede e padrões de aplicativos para o [Ethereum](/) são discutidos e desenvolvidos por meio do processo de EIP.

Qualquer pessoa na comunidade do Ethereum tem a capacidade de criar uma EIP. As diretrizes para escrever EIPs estão incluídas na [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Uma EIP deve fornecer principalmente uma especificação técnica concisa com uma pequena quantidade de motivação. O autor da EIP é responsável por alcançar o consenso dentro da comunidade e documentar opiniões alternativas. Dada a alta barreira técnica para enviar uma EIP bem formulada, historicamente, a maioria dos autores de EIPs são tipicamente desenvolvedores de aplicativos ou de protocolo.

## Por que as EIPs são importantes? {#why-do-eips-matter}

As EIPs desempenham um papel central em como as mudanças acontecem e são documentadas no Ethereum. Elas são a maneira de as pessoas proporem, debaterem e adotarem mudanças. Existem [diferentes tipos de EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types), incluindo EIPs principais (core) para mudanças de protocolo de baixo nível que afetam o consenso e exigem uma atualização da rede, como a [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), e ERCs para padrões de aplicativos, como a [EIP-20](https://eips.ethereum.org/EIPS/eip-20) e a [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Cada atualização da rede consiste em um conjunto de EIPs que precisam ser implementadas por cada [cliente Ethereum](/learn/#clients-and-nodes) na rede. Isso significa que, para permanecer em consenso com outros clientes na Rede Principal do Ethereum, os desenvolvedores de clientes precisam garantir que todos implementaram as EIPs exigidas.

Além de fornecer uma especificação técnica para as mudanças, as EIPs são a unidade em torno da qual a governança acontece no Ethereum: qualquer pessoa é livre para propor uma, e então várias partes interessadas na comunidade debaterão para determinar se ela deve ser adotada como um padrão ou incluída em uma atualização da rede. Como as EIPs não principais não precisam ser adotadas por todos os aplicativos (por exemplo, é possível criar um token fungível que não implemente a EIP-20), mas as EIPs principais devem ser amplamente adotadas (porque todos os nós devem ser atualizados para continuar fazendo parte da mesma rede), as EIPs principais exigem um consenso mais amplo dentro da comunidade do que as EIPs não principais.

## História das EIPs {#history-of-eips}

O [repositório no GitHub das Propostas de Melhoria do Ethereum (EIPs)](https://github.com/ethereum/EIPs) foi criado em outubro de 2015. O processo de EIP é baseado no processo das [Propostas de Melhoria do Bitcoin (BIPs)](https://github.com/bitcoin/bips), que por sua vez é baseado no processo das [Propostas de Aprimoramento do Python (PEPs)](https://www.python.org/dev/peps/).

Os editores de EIPs têm a tarefa de revisar as EIPs quanto à solidez técnica, problemas de formatação e correção de ortografia, gramática e estilo de código. Martin Becze, Vitalik Buterin, Gavin Wood e alguns outros foram os editores originais de EIPs de 2015 até o final de 2016.

Os atuais editores de EIPs são

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Os editores eméritos de EIPs são

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Se você gostaria de se tornar um editor de EIP, consulte a [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Os editores de EIPs decidem quando uma proposta está pronta para se tornar uma EIP e ajudam os autores de EIPs a levar suas propostas adiante. Os [Ethereum Cat Herders](https://www.ethereumcatherders.com/) ajudam a organizar reuniões entre os editores de EIPs e a comunidade (veja [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

O processo completo de padronização, juntamente com um fluxograma, é descrito na [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Saiba mais {#learn-more}

Se você estiver interessado em ler mais sobre as EIPs, confira o [site das EIPs](https://eips.ethereum.org/) e a [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Aqui estão alguns links úteis:

- [Uma lista de todas as Propostas de Melhoria do Ethereum](https://eips.ethereum.org/all)
- [Uma descrição de todos os tipos de EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Uma descrição de todos os status das EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Projetos de educação da comunidade {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP é uma série de vídeos educacionais que discute as Propostas de Melhoria do Ethereum (EIPs) e os principais recursos das próximas atualizações.*
- [EIPs.wtf](https://www.eips.wtf/) — *O EIPs.wtf fornece informações extras sobre as Propostas de Melhoria do Ethereum (EIPs), incluindo seu status, detalhes de implementação, pull requests relacionados e feedback da comunidade.* 
- [EIP.Fun](https://eipfun.substack.com/) — *O EIP.Fun fornece as últimas notícias sobre as Propostas de Melhoria do Ethereum (EIPs), atualizações sobre reuniões de EIPs e muito mais.*
- [EIPs Insight](https://eipsinsight.com/) — *O EIPs Insight é uma representação do estado do processo e das estatísticas das Propostas de Melhoria do Ethereum (EIPs) de acordo com informações coletadas de diferentes recursos.*

## Participe {#participate}

Qualquer pessoa pode criar uma EIP. Antes de enviar uma proposta, deve-se ler a [EIP-1](https://eips.ethereum.org/EIPS/eip-1), que descreve o processo de EIP e como escrever uma EIP, e solicitar feedback no [Ethereum Magicians](https://ethereum-magicians.org/), onde as propostas são discutidas primeiro com a comunidade antes que um rascunho seja enviado.

## Referências {#references}

<cite class="citation">

Conteúdo da página fornecido em parte por [Governança de Desenvolvimento do Protocolo Ethereum e Coordenação de Atualização da Rede](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) de Hudson Jameson

</cite>