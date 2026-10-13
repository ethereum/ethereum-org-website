---
title: Um Ethereum mais seguro
description: "O roteiro do Ethereum fortalece a produção de blocos e a resistência à censura hoje, enquanto prepara o protocolo para a era quântica e décadas de operação confiável."
lang: pt-br
image: /images/roadmap/roadmap-security.png
alt: Roteiro do Ethereum
template: roadmap
summaryPoints:
  - Atualizações de fortalecimento a curto prazo, como a separação propositor-construtor (PBS) consagrada e listas de inclusão, estão em desenvolvimento ativo
  - A preparação pós-quântica está em andamento anos antes de qualquer ameaça quântica crível
  - A simplificação do protocolo remove a complexidade e reduz a superfície de ataque do Ethereum
---

O Ethereum já é uma plataforma de [contrato inteligente](/glossary/#smart-contract) descentralizada e muito segura. O roteiro visa mantê-lo assim por décadas, **fortalecendo a rede hoje enquanto se prepara para ameaças que podem aparecer apenas daqui a anos**. As atualizações de curto prazo são acompanhadas no [forkcast.org](https://forkcast.org), e o rascunho do roteiro de longo prazo é publicado no [strawmap.org](https://strawmap.org).

<ExpandableCard title="O Ethereum é seguro hoje?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Sim. O Ethereum tem funcionado continuamente desde 2015 sem tempo de inatividade. As melhorias nesta página tornam uma rede já segura mais difícil de atacar, censurar ou interromper.

</ExpandableCard>

## Construção de blocos sem necessidade de confiança {#trustless-block-building}

A maioria dos blocos do Ethereum hoje é montada por meio de uma divisão de trabalho: construtores especializados constroem o bloco mais valioso que podem, e o [validador](/glossary/#validator) cuja vez é propõe a melhor oferta. Isso evita que a construção profissional de blocos concentre o [stake](/glossary/#staking) entre os maiores operadores, mas desde 2022 ela tem dependido de software fora do protocolo que a rede não pode verificar.

A **separação propositor-construtor (PBS) consagrada (ePBS, ou EIP-7732)** move essa divisão para o protocolo, removendo a necessidade de confiar em retransmissores (relays), os intermediários terceirizados que atualmente passam blocos entre construtores e validadores. O ePBS é um dos destaques da próxima atualização [Glamsterdam](/roadmap/glamsterdam/), prevista para 2026. Nenhuma data para a Mainnet foi definida; as equipes de clientes estão testando-o em devnets (redes de teste temporárias).

<ButtonLink variant="outline" href="/roadmap/pbs/">Mais sobre a separação propositor-construtor (PBS)</ButtonLink>

## Resistência à censura {#censorship-resistance}

Uma rede resistente à censura significa que ninguém pode impedir que uma transação válida chegue à cadeia. As **listas de inclusão aplicadas por escolha de bifurcação (FOCIL, ou EIP-7805)** dão a muitos validadores uma palavra sobre o que um bloco deve incluir: eles publicam listas de transações pendentes que o construtor de blocos é obrigado a incluir. Nenhum ator individual pode deixar sua transação de fora silenciosamente.

O FOCIL é o destaque da camada de consenso da Hegotá, a atualização que segue a Glamsterdam e está prevista para 2027. Ele foi deliberadamente programado para depois da Glamsterdam para que o ePBS e o FOCIL nunca sejam lançados como uma combinação não testada. A pesquisa sobre mempools criptografados, que ocultariam o conteúdo das transações em espera até que sejam incluídas com segurança em um bloco, continua.

## Finalidade mais rápida {#faster-finality}

Para os usuários, a [finalidade](/glossary/#finality) é o momento em que uma transação se torna permanente, quando revertê-la custaria a um invasor uma quantidade enorme de ETH em staking. Hoje, a finalidade leva cerca de 15 minutos, e **os pesquisadores querem reduzir isso drasticamente**. O trabalho começou como finalidade de slot único, evoluiu para finalidade de três slots e agora continua como Minimmit, um protocolo de consenso de uma rodada no programa Lean Ethereum introduzido em julho de 2025. A finalidade em segundos é uma estrela-guia de longo prazo no rascunho do roteiro, visando aproximadamente 2029. Esta continua sendo uma pesquisa ativa, e nenhuma atualização de finalidade foi atribuída a uma bifurcação ainda.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Mais sobre a pesquisa de finalidade mais rápida</ButtonLink>

## Validadores resilientes {#resilient-validators}

Um validador geralmente é uma máquina que contém uma chave de assinatura. A **tecnologia de validador distribuído (DVT)** substitui essa única máquina por um comitê de máquinas que compartilham a chave e assinam juntas, de modo que a falha de um computador ou o roubo de uma chave não derruba o validador. A DVT está ativa em produção e é usada por operadores de staking em escala. Em janeiro de 2026, Vitalik Buterin propôs uma variante simplificada no nível do protocolo chamada DVT-lite; é uma proposta inicial sem bifurcação programada.

A rede também se protege por meio da [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/): o Ethereum é executado em várias implementações de software construídas de forma independente, de modo que um bug em um cliente deixa o resto da rede de pé.

Duas ideias de pesquisa anteriores, view-merge e eleição secreta de líder, não são mais itens ativos do roteiro.

<ButtonLink variant="outline" href="/staking/dvt/">Mais sobre a tecnologia de validador distribuído (DVT)</ButtonLink>

## Resistência quântica {#quantum-resistance}

O Ethereum usa [criptografia](/glossary/#cryptography) para manter a rede segura e proteger os fundos dos usuários. Eventualmente, alguns desses métodos criptográficos serão **vulneráveis a computadores quânticos**, que podem resolver problemas matemáticos específicos exponencialmente mais rápido do que as máquinas clássicas.

**Nenhum computador quântico pode quebrar a criptografia do Ethereum hoje.** O hardware necessário ainda não existe em escala. Mas pesquisas recentes sugerem que a lacuna está se fechando mais rápido do que o esperado anteriormente. Em março de 2026, o Google Quantum AI publicou um artigo estimando que quebrar a criptografia de curva elíptica de 256 bits (o tipo que o Ethereum usa para assinaturas de conta) poderia exigir cerca de 1.200 qubits lógicos, cerca de 20 vezes menos do que as estimativas anteriores.

As transições criptográficas levam anos para serem planejadas e executadas com segurança, portanto, a preparação está acontecendo agora, muito antes de o hardware existir. Quatro áreas foram identificadas como exigindo atualizações pós-quânticas: assinaturas de consenso do validador (BLS), os esquemas de compromisso usados para disponibilidade de dados (KZG), assinaturas de conta (ECDSA) e os sistemas de prova de conhecimento zero (ZK-proof) usados por [rollups](/glossary/#rollups).

A Fundação Ethereum formou uma **equipe de Segurança Pós-Quântica** dedicada em janeiro de 2026, e seu trabalho é acompanhado publicamente em [pq.ethereum.org](https://pq.ethereum.org). O trabalho ativo inclui assinaturas de validador baseadas em hash (leanXMSS) combinadas com uma zkVM mínima (leanVM) que agrega as assinaturas maiores e seguras contra computadores quânticos de forma eficiente, e devnets de interoperabilidade semanais com mais de 10 equipes de clientes.

Uma parte fundamental da estratégia de transição é a **EIP-8141**, que introduz a [abstração de conta](/roadmap/account-abstraction/) nativa. Isso permite que contas individuais escolham sua própria verificação de assinatura, o que significa que os usuários poderiam mudar para assinaturas seguras contra computadores quânticos sem esperar por uma única migração em todo o protocolo. A EIP-8141 está sendo considerada para a atualização Hegotá. Os marcos da infraestrutura pós-quântica principal visam a conclusão até aproximadamente 2029. Essas são metas de planejamento e podem mudar.

<ExpandableCard title="Computadores quânticos podem roubar meu ETH hoje?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Não. Nenhum computador quântico hoje pode quebrar a criptografia do Ethereum. O trabalho descrito nesta página é uma preparação inicial para uma ameaça que ainda está a anos de distância. Quando as carteiras pós-quânticas estiverem disponíveis, o software da carteira o guiará pela migração. Por enquanto, não há nada que você precise fazer.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Mais sobre a resistência quântica</ButtonLink>

## Protocolo mais simples e eficiente {#simpler-and-more-efficient-protocol}

A complexidade cria oportunidades para bugs e vulnerabilidades. Parte do roteiro se concentra em **simplificar o Ethereum e remover a dívida técnica** para que o protocolo seja mais fácil de manter, auditar e raciocinar. Um protocolo mais simples também dá aos invasores menos superfície para explorar.

Entregue até agora:

- **[Pectra (maio de 2025)](/roadmap/pectra/)**: Introduziu a EIP-7702, que permite que contas de propriedade externa deleguem temporariamente para o código de contrato inteligente, um trampolim para a abstração de conta completa.
- **[Fusaka (dezembro de 2025)](/roadmap/fusaka/)**: Implantou o PeerDAS (EIP-7594), que distribui a carga de trabalho de disponibilidade de dados pela rede. Também aumentou os parâmetros de blob, expandindo a vazão de dados para rollups.
- **[Dencun (março de 2024)](/roadmap/dencun/)**: Introduziu transações de blob (EIP-4844) para dados de rollup mais baratos e restringiu o `SELFDESTRUCT` (EIP-6780) para remover uma fonte de complexidade de longa data.
- **[Shapella (abril de 2023)](/staking/withdrawals/)**: Permitiu que os validadores retirassem ETH em staking (EIP-4895), removendo uma restrição inicial do staking de [Prova de Participação (PoS)](/glossary/#pos).
- **London (agosto de 2021)**: Reformulou a precificação de gás com a EIP-1559, introduzindo uma taxa básica e um mecanismo de queima para custos de transação mais previsíveis.

Em andamento:

- **Glamsterdam (prevista para 2026)**: Os destaques são o ePBS (EIP-7732) e as listas de acesso no nível do bloco (EIP-7928), com a reprecificação de gás também sendo considerada.
- **Hegotá (prevista para 2027)**: O FOCIL (EIP-7805) é o destaque da camada de consenso. Sendo considerada para inclusão: EIP-8141 (abstração de conta nativa).
- **Contínuo**: Os esforços para simplificar a [EVM](/developers/docs/evm/), harmonizar as implementações de clientes e eliminar gradualmente os recursos obsoletos continuam em todas as equipes de clientes. O trabalho sobre a ausência de estado (permitindo que os participantes verifiquem a cadeia sem armazenar todos os seus dados) está sendo redesenhado em torno de árvores de hash binárias seguras contra computadores quânticos, com a abordagem final ainda a ser confirmada.

## Progresso atual {#current-progress}

Em meados de 2026:

- **Construção de blocos e resistência à censura**: O ePBS e as listas de acesso no nível do bloco estão sendo executados nas devnets da Glamsterdam. O FOCIL está planejado para a Hegotá, prevista para 2027.
- **Finalidade**: O Minimmit e o trabalho mais amplo de consenso do Lean Ethereum permanecem em pesquisa ativa, sem atribuição de bifurcação ainda.
- **Resistência quântica**: Devnets de interoperabilidade pós-quântica semanais estão em execução, e os marcos da infraestrutura principal visam aproximadamente 2029.
- **Simplificação**: Pectra e Fusaka foram lançadas; Glamsterdam e Hegotá trazem a próxima rodada de limpezas.

Nenhuma parte deste trabalho está concluída, e todos os cronogramas são estimativas que podem mudar.

## Leitura adicional {#further-reading}

- [Forkcast: rastreador de atualizações da rede Ethereum](https://forkcast.org)
- [Strawmap: um rascunho do roteiro da camada 1 (l1) do Ethereum](https://strawmap.org) - _Arquitetura da EF_
- [Ethereum Pós-Quântico](https://pq.ethereum.org) - _Fundação Ethereum_
- [Rastreador do roteiro do Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Prova de Participação (PoS) e finalidade](/developers/docs/consensus-mechanisms/pos/#finality)
- [A EVM](/developers/docs/evm/)