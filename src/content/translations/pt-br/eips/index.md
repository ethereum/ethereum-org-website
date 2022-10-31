---
title: Propostas de Melhorias do Ethereum (EIPs)
description: As informações básicas que você precisa entender nas Propostas de Melhorias do Ethereum (EIPs).
lang: pt-br
---

# Introdução às Propostas de Melhorias do Ethereum (EIPs) {#introduction-to-ethereum-improvement-proposals-eips}

## O que são EIPs? {#what-are-eips}

[Propostas de Melhorias do Ethereum (EIPs)](https://eips.ethereum.org/) são padrões especificando novos recursos ou processos potenciais para o Ethereum. As EIPs contêm especificações técnicas para as mudanças propostas e agem como a "fonte da verdade" para a comunidade. Atualizações de rede e padrões de aplicativos para Ethereum são discutidos e desenvolvidos através do processo EIP.

Qualquer um da comunidade Ethereum tem a capacidade de criar uma EIP. Diretrizes para escrever EIPs estão incluídas na [EIP 1](https://eips.ethereum.org/EIPS/eip-1). A EIP deve fornecer uma especificação técnica concisa do recurso que propõe. O autor da EIP é responsável por criar consenso dentro da comunidade e documentar opiniões discordantes. Dada as altas exigências técnicas para o envio de uma EIP bem-elaborada, a maioria dos autores de EIP são desenvolvedores de aplicativos ou protocolos.

## Por que as EIPs são importantes? {#why-do-eips-matter}

As EIPs desempenham um papel central na forma como as mudanças acontecem e são documentadas no Ethereum. São a forma de as pessoas proporem, debaterem e adoptarem alterações. Existem [diferentes tipos de EIPs](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), incluindo as principais EIPs para alterações de protocolo de baixo nível que afetam o consenso e exigem um upgrade de rede, bem como os ERCs para os padrões de aplicativo. Por exemplo, os padrões para criar tokens, como [ERC20](https://eips.ethereum.org/EIPS/eip-20) ou [ERC721](https://eips.ethereum.org/EIPS/eip-721) permitem que os aplicativos que interagem com esses tokens tratem todos os tokens usando as mesmas regras, o que facilita a criação de aplicativos interoperáveis.

Cada atualização de rede consiste em um conjunto de EIPs que precisam ser implementadas por cada [cliente Ethereum](/learn/#clients-and-nodes) na rede. Isso significa que para entrar em consenso com outros clientes na rede principal do Ethereum, os desenvolvedores do cliente precisam se certificar de que todos implementaram as EIPs necessárias.

Além de fornecer uma especificação técnica para mudanças, as EIPs são a unidade em torno da qual a governança acontece no Ethereum: qualquer um pode propor uma EIP e, em seguida, vários stakeholders da comunidade discutirão para determinar se ela deve ser adotada como padrão ou incluída em uma melhoria da rede. Como as EIPs não centrais não precisam ser adotadas por todos os aplicativos (por exemplo, você pode criar um token diferente de[ERC20](https://eips.ethereum.org/EIPS/eip-20)), mas as EIPs centrais devem ser amplamente adotadas (porque todos os nós devem atualizar para se manter parte da mesma rede), as EIPs nativas requerem um consenso mais amplo dentro da comunidade do que as EIPs não centrais.

## Histórico de EIPs {#history-of-eips}

O repositório GitHub [Propostas de Melhorias do Ethereum (EIPs)](https://github.com/ethereum/EIPs) foi criado em outubro de 2015. O processo EIP é baseado no processo de [Propostas de Melhorias do Bitcoin (BIPs)](https://github.com/bitcoin/bips) que, por sua vez, é baseado no processo [Propostas de Melhorias do Python (PEPs)](https://www.python.org/dev/peps/).

Os editores da EIP têm a tarefa de analisar EIPs por coerência técnica, ortografia/gramática corretas e estilo de código. Martin Becze, Vitalik Buterin, Gavin Wood e alguns outros foram os editores originais de EIP de 2015 até o final de 2016. Os editores atuais de EIP são:

- Alex Beregszaszi (EWASM/Fundação Ethereum)
- Greg Colvin (Comunidade)
- Casey Detrio (EWASM/Fundação Ethereum)
- Matt Garnett (Quilt)
- Hudson James (Fundação Ethereum)
- Nick Johnson (ENS)
- Nick Savers (Comunidade)
- Micah Zoltu (Comunidade)

Editores da EIP juntamente com membros da comunidade de [Ethereum Cat Herders](https://ethereumcatherders.com/) e [Ethererum Magicians](https://ethereum-magicians.org/) estão decidindo quais EIP serão implementadas e quais serão responsáveis pela facilitação das EIPs e pela transferência delas para os estágios "Final" ou "Retirada".

O processo completo de padronização juntamente com o gráfico é descrito em [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Saiba mais {#learn-more}

Se estiver interessado em ler mais sobre EIPs, confira o [site das EIPs](https://eips.ethereum.org/) onde você pode encontrar informações adicionais, incluindo:

- [Os diferentes tipos de EIPs](https://eips.ethereum.org/)
- [Uma lista de todas as EIP criadas](https://eips.ethereum.org/all)
- [Status da EIP e o que eles significam](https://eips.ethereum.org/)

## Participar {#participate}

Qualquer pessoa pode criar EIP ou ERC, embora você deva ler [EIP-1](https://eips.ethereum.org/EIPS/eip-1), que descreve o processo EIP, o que é EIP, tipos de EIPs, o que o documento EIP deve conter, formato EIP e modelo, lista de editores EIP e tudo o que você precisa saber sobre EIPs antes de criar uma. Sua nova EIP deve definir uma nova funcionalidade que não seja muito complexa nem muito específica, e que possa ser usada por projetos no ecossistema Ethereum. A parte mais difícil é a facilitação. Como autor, você precisa ajudar as pessoas a entender sua EIP, coletar feedback, escrever artigos descrevendo problemas que sua EIP resolve e colaborar com projetos para implementá-la.

Se estiver interessado em acompanhar ou compartilhar sua opinião sobre EIPs, confira o [fórum do Ethereum Magicians](https://ethereum-magicians.org/), onde as EIPs são discutidas com a comunidade.

Veja também:

- [Como criar uma EIP](https://eips.ethereum.org/EIPS/eip-1)

## Referências {#references}

<cite class="citation">

Conteúdo da página retirado parcialmente do artigo [Coordenação do upgrade da rede e governança do desenvolvimento do protocolo Ethereum (em inglês)](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-network-upgrade-coordination/) por Hudson Jameson

</cite>
