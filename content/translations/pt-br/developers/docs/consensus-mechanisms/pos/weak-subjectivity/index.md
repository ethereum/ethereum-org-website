---
title: Subjetividade fraca
description: Uma explicação de subjetividade fraca e o seu papel na prova de participação do Ethereum.
lang: pt-br
---

Subjetividade em blockchains refere-se à dependência de informações sociais para concordar com o estado atual. Pode haver vários forks válidos que são escolhidos de acordo com as informações coletadas de outros pares na rede. A questão é a objetividade a que se refere às cadeias onde existe apenas uma cadeia válida possível e que todos os nós necessariamente concordarão aplicando as suas regras codificadas. Há também um terceiro estado, conhecido como subjetivo fraco. Isso se refere a uma cadeia que pode progredir objetivamente após alguma semente inicial de informação ser recuperada socialmente.

## Pré-Requisitos {#prerequisites}

Para entender esta página é necessário primeiro entender os fundamentos de [prova de participação](/developers/docs/consensus-mechanisms/pos/).

## Quais são os problemas que a subjetividade fraca resolve? {#problems-ws-solves}

A subjetividade é inerente às blockchains de prova de participação porque a seleção da cadeia correta de vários forks é feita contando votos históricos. Isso expõe a blockchain a vários vetores de ataque, incluindo ataques de longo alcance em que nós que participaram muito cedo na cadeia mantêm um fork alternativo que eles liberam muito mais tarde para sua própria vantagem. Como alternativa, se 33% dos validadores retirarem seus stakes mas continuarem a atestar e produzir blocos, eles poderão gerar um fork alternativo que entra em conflito com a cadeia canônica. Novos nós ou nós que ficaram offline por um longo tempo podem não estar cientes de que estes validadores atacantes retiraram seus fundos, para que os atacantes possam enganá-los para que sigam uma cadeia incorreta. O Ethereum pode resolver estes vetores de ataque impondo restrições que diminuem ao mínimo los aspectos subjetivos do mecanismo, e com isso as suposições de confiança.

## Pontos de verificação de subjetividade fraca {#ws-checkpoints}

A subjetividade fraca é implementada na prova de participação do Ethereum usando "pontos de verificação de subjetividade fraca". Estes são raízes de estado que todos os nós da rede concordam em integrar à cadeia canônica. Eles servem o mesmo propósito de "verdade universal" para blocos de início, exceto que eles não se colocam na posição de início na blockchain. O algoritmo de escolha de fork confia em que o estado definido naquele ponto de verificação é correto e que ele verifica a cadeia de forma independente e objetiva a partir desse ponto. Os pontos de verificação atuam como "limites de reversão" porque os blocos localizados antes dos pontos de verificação de subjetividade fraca não podem ser alterados. Isto mina os ataques de longo alcance simplesmente definindo forks de longo alcance como inválidos como parte do modelo do mecanismo. Garantir que os pontos de verificação de subjetividade fraca sejam separados por uma distância menor que o período de retirada do validador garante que um validador que faz o fork da cadeia tenha removido pelo menos algum valor limite antes que eles possam retirar seu stake e que novos participantes não possam ser enganados em forks incorretos por validadores cuja participação foi retirada.

## Diferença entre pontos de verificação de subjetividade fraca e blocos finalizados {#difference-between-ws-and-finalized-blocks}

Blocos finalizados e pontos de verificação de subjetividade fraca são tratados de forma diferente pelos nós de Ethereum. Se um nó percebe que há de dois blocos finalizados concorrentes, então está dividida entre os dois – não tem como identificar automaticamente qual é o fork canônico. Isto indica uma falha de consenso. Por outro lado, um nó simplesmente rejeita qualquer bloco que esteja em conflito com seu ponto de verificação subjetividade fraca. Do ponto de vista do nó, o ponto de verificação de subjetividade fraca representa uma verdade absoluta que não pode ser minada por novos conhecimentos de seus pares.

## Quão fraco é fraco? {#how-weak-is-weak}

O aspecto subjetivo da prova de participação do Ethereum é o requisito de um estado recente (ponto de verificação de subjetividade fraca) a partir de uma fonte confiável com a qual se sincronizar. O risco de obter um ponto de verificação de subjetividade fraca incorreto é muito baixo, porque eles podem ser verificados contra várias fontes públicas independentes, como exploradores de blocos ou vários nós. No entanto, sempre há algum grau de confiança necessário para executar qualquer aplicativo de software, por exemplo, confiando que os desenvolvedores de software produziram software honesto.

Um ponto de verificação de subjetividade fraca pode até vir como parte do software cliente. Sem dúvida, um atacante pode corromper o checkpoint no software e pode simplesmente corromper o próprio software. Não existe nenhum caminho criptoeconômico em torno deste problema, mas o impacto dos desenvolvedores não confiáveis é minimizado no Ethereum, tendo várias equipes de clientes independentes, cada uma desenvolvendo software equivalente em diferentes línguagens, tudo com um interesse em manter uma cadeia honesta. Exploradores de blocos também podem fornecer pontos de verificação de subjetividade fraca ou uma maneira de fazer referência cruzada de pontos de verificação obtidos de outros lugares em relação a uma fonte adicional.

Finalmente, os pontos de verificação podem ser solicitados a partir de outros nós; talvez outro usuário Ethereum que execute um full node possa fornecer um ponto de verificação que os validadores possam verificar em relação ao dados de um explorador de bloco. Em geral, confiar no provedor de um ponto de verificação de subjetividade fraca pode ser considerado tão problemático quanto confiar nos desenvolvedores do cliente. A confiança geral que é necessária é baixa. É importante notar que essas considerações só se tornam importantes no caso muito improvável em que a maioria dos validadores conspire para produzir um fork alternativo da blockchain. Em qualquer outra circunstância, existe apenas uma cadeia Ethereum para se escolher.

## Leitura adicional {#further-reading}

- [Subjetividade fraca em Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Como eu aprendi a amar a subjetividade fraca](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Subjetividade fraca (documentos Teku)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [Guia de subjetividade fraca: fase-0](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Análise de subjetividade fraca no Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
