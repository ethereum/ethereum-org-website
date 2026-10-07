---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Saiba mais sobre a atualização do protocolo Hegotá"
lang: pt-br
template: upgrade
---

Hegotá é a atualização da rede [Ethereum](/) que deve seguir a [Glamsterdam](/roadmap/glamsterdam/). Seu nome vem da combinação de "Bogotá" (atualização da camada de execução, nomeada em homenagem a um local anterior da Devcon) e "Heze" (atualização da camada de consenso, nomeada em homenagem a uma estrela).

A Hegotá está em fase inicial de planejamento. Seu destaque principal foi escolhido e uma segunda mudança já foi programada, mas o restante do escopo ainda está sendo decidido e nenhuma data foi definida.

## Destaque principal: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

As listas de inclusão aplicadas por escolha de bifurcação (FOCIL, ou EIP-7805) tratam da [resistência à censura](/roadmap/security/#censorship-resistance): garantir que uma transação válida entre em um bloco, mesmo que as pessoas que constroem os blocos prefiram deixá-la de fora.

Hoje, um único [validador](/glossary/#validator) constrói cada bloco e decide quais transações ele contém. Portanto, qualquer pessoa que consiga influenciar construtores de blocos suficientes pode atrasar uma transação, e um usuário não tem como forçar a situação a não ser esperar e torcer.

A FOCIL distribui essa decisão entre muitos validadores. Um comitê propõe uma lista de transações que devem ser incluídas, e as regras do protocolo obrigam o construtor de blocos a honrar essas listas. Censurar uma transação deixa de ser algo que uma parte pode fazer sozinha.

## Transações de quadro {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

As transações de quadro (EIP-8141) permitem que uma [conta](/glossary/#account) decida por si mesma o que conta como uma transação válida, em vez de o protocolo insistir em um esquema de assinatura fixo.

Hoje, toda transação é autorizada da mesma forma: uma assinatura, de uma chave. As [contas de contrato inteligente](/roadmap/account-abstraction/) contornam isso roteando as transações por meio de uma infraestrutura extra, o que custa gás e adiciona partes móveis que podem falhar.

Uma transação de quadro move a verificação para a própria conta. A conta executa sua própria lógica de verificação, de modo que os recursos que atualmente precisam dessa infraestrutura extra — recuperação social, limites de gastos, exigência de várias aprovações, permitir que outra pessoa pague o gás — tornam-se coisas que o protocolo suporta diretamente.

Como a conta escolhe suas próprias regras, ela também pode escolher um esquema de assinatura que um computador quântico não conseguiria quebrar. Isso torna este um passo em direção à [resistência quântica](/roadmap/security/#quantum-resistance), bem como a melhores carteiras.

## O que mais há na Hegotá {#scope}

Ainda não foi decidido. A FOCIL e as transações de quadro são as duas mudanças programadas até agora; dezenas de outras foram propostas e nenhuma delas está definida. Esta página permanecerá curta até que o escopo se consolide — para o estado atual da discussão, consulte os recursos abaixo.

## Leitura adicional {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — status ao vivo de cada proposta
- [Meta EIP da Hegotá (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Especificação técnica da EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Especificação técnica da EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Roteiro do Ethereum](/roadmap/)
