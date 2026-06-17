---
title: Subjetividade fraca
description: Uma explicação sobre a subjetividade fraca e seu papel no Ethereum com PoS.
lang: pt-br
---

A subjetividade em blockchains refere-se à dependência de informações sociais para concordar com o estado atual. Pode haver múltiplas bifurcações válidas que são escolhidas de acordo com as informações coletadas de outros pares na rede. O oposto é a objetividade, que se refere a cadeias onde há apenas uma cadeia válida possível com a qual todos os nós concordarão necessariamente ao aplicar suas regras codificadas. Há também um terceiro estado, conhecido como subjetividade fraca. Isso se refere a uma cadeia que pode progredir objetivamente depois que alguma semente inicial de informação é recuperada socialmente.

## Pré-requisitos {#prerequisites}

Para entender esta página, é necessário primeiro entender os fundamentos da [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Quais problemas a subjetividade fraca resolve? {#problems-ws-solves}

A subjetividade é inerente às blockchains de Prova de Participação (PoS) porque a seleção da cadeia correta a partir de múltiplas bifurcações é feita contando votos históricos. Isso expõe a blockchain a vários vetores de ataque, incluindo ataques de longo alcance (long-range attacks), em que os nós que participaram muito cedo na cadeia mantêm uma bifurcação alternativa que eles liberam muito mais tarde para sua própria vantagem. Alternativamente, se 33% dos validadores sacarem seu stake, mas continuarem a atestar e produzir blocos, eles podem gerar uma bifurcação alternativa que entra em conflito com a cadeia canônica. Novos nós ou nós que estiveram offline por um longo tempo podem não estar cientes de que esses validadores atacantes sacaram seus fundos, então os invasores poderiam enganá-los para seguir uma cadeia incorreta. O [Ethereum](/) pode resolver esses vetores de ataque impondo restrições que diminuem os aspectos subjetivos do mecanismo — e, portanto, as premissas de confiança — ao mínimo necessário.

## Pontos de verificação de subjetividade fraca {#ws-checkpoints}

A subjetividade fraca é implementada no Ethereum com Prova de Participação (PoS) usando "pontos de verificação de subjetividade fraca". Estas são raízes de estado que todos os nós na rede concordam que pertencem à cadeia canônica. Eles servem ao mesmo propósito de "verdade universal" que os blocos gênese, exceto que não ficam na posição de gênese na blockchain. O algoritmo de escolha de fork confia que o estado da blockchain definido naquele ponto de verificação está correto e que ele verifica a cadeia de forma independente e objetiva a partir desse ponto em diante. Os pontos de verificação atuam como "limites de reversão" porque os blocos localizados antes dos pontos de verificação de subjetividade fraca não podem ser alterados. Isso enfraquece os ataques de longo alcance simplesmente definindo bifurcações de longo alcance como inválidas como parte do design do mecanismo. Garantir que os pontos de verificação de subjetividade fraca sejam separados por uma distância menor que o período de saque do validador garante que um validador que bifurca a cadeia sofra uma penalização de pelo menos um valor limite antes que possa sacar seu stake e que novos participantes não possam ser enganados para bifurcações incorretas por validadores cujo stake foi sacado.

## Diferença entre pontos de verificação de subjetividade fraca e blocos finalizados {#difference-between-ws-and-finalized-blocks}

Blocos finalizados e pontos de verificação de subjetividade fraca são tratados de forma diferente pelos nós do Ethereum. Se um nó toma conhecimento de dois blocos finalizados concorrentes, ele fica dividido entre os dois - não tem como identificar automaticamente qual é a bifurcação canônica. Isso é sintomático de uma falha de consenso. Em contraste, um nó simplesmente rejeita qualquer bloco que entre em conflito com seu ponto de verificação de subjetividade fraca. Da perspectiva do nó, o ponto de verificação de subjetividade fraca representa uma verdade absoluta que não pode ser prejudicada por novos conhecimentos de seus pares.

## Quão fraca é? {#how-weak-is-weak}

O aspecto subjetivo da Prova de Participação (PoS) do Ethereum é o requisito de um estado recente (ponto de verificação de subjetividade fraca) de uma fonte confiável para realizar a sincronização. O risco de obter um ponto de verificação de subjetividade fraca ruim é muito baixo porque eles podem ser verificados em várias fontes públicas independentes, como exploradores de blocos ou múltiplos nós. No entanto, sempre há algum grau de confiança necessário para executar qualquer aplicativo de software, por exemplo, confiar que os desenvolvedores de software produziram um software honesto.

Um ponto de verificação de subjetividade fraca pode até vir como parte do software cliente. Pode-se argumentar que um invasor pode corromper o ponto de verificação no software e pode corromper o próprio software com a mesma facilidade. Não há uma rota criptoeconômica real para contornar esse problema, mas o impacto de desenvolvedores não confiáveis é minimizado no Ethereum por ter várias equipes de clientes independentes, cada uma construindo software equivalente em linguagens diferentes, todas com interesse em manter uma cadeia honesta. Exploradores de blocos também podem fornecer pontos de verificação de subjetividade fraca ou uma maneira de cruzar pontos de verificação obtidos de outros lugares com uma fonte adicional.

Por fim, pontos de verificação podem ser solicitados a outros nós; talvez outro usuário do Ethereum que execute um nó completo possa fornecer um ponto de verificação que os validadores possam então verificar em relação aos dados de um explorador de blocos. No geral, confiar no provedor de um ponto de verificação de subjetividade fraca pode ser considerado tão problemático quanto confiar nos desenvolvedores do cliente. A confiança geral necessária é baixa. É importante notar que essas considerações só se tornam importantes no evento muito improvável de que a maioria dos validadores conspire para produzir uma bifurcação alternativa da blockchain. Sob quaisquer outras circunstâncias, há apenas uma cadeia Ethereum para escolher.

## Leitura adicional {#further-reading}

- [Subjetividade fraca no Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Como aprendi a amar a subjetividade fraca](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Subjetividade fraca (documentação do Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Guia de subjetividade fraca da Fase 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Análise da subjetividade fraca no Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)