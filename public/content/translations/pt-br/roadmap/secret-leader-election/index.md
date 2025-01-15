---
title: Eleição de líder secreto
description: Explicação de como a eleição de líder secreto pode ajudar a proteger os validadores contra ataques
lang: pt-br
summaryPoints:
  - O endereço IP dos proponentes de blocos pode ser conhecido antecipadamente, o que os torna vulneráveis a ataques
  - A eleição de líder secreto oculta a identidade dos validadores para que eles não possam ser conhecidos antecipadamente
  - Uma extensão dessa ideia é tornar a seleção do validador aleatória em cada espaço.
---

# Eleição de líder secreto {#single-secret-leader-election}

No mecanismo atual de consenso baseado em [prova de participação](/developers/docs/consensus-mechanisms/pos), a lista de proponentes de blocos futuros é pública e é possível mapear os endereços IP. Isso significa que os invasores podem identificar quais validadores devem propor um bloco e atacá-los com um ataque de negação de serviço (DOS) que os impeça de propor o bloco a tempo.

Isso pode criar oportunidades de lucro para um invasor. Por exemplo, um proponente de bloco selecionado para o espaço `n+1` poderia aplicar um ataque de DoS contra o proponente no espaço `n` para que perca a oportunidade de propor um bloco. Isso permitiria que o proponente do bloco atacante extraísse o MEV de ambos os espaços ou pegasse todas as transações que deveriam ter sido divididas em dois blocos e, em vez disso, as incluísse em um só, ganhando todas as taxas associadas. É provável que isso afete mais os validadores internos do que os validadores institucionais experientes, que podem usar métodos mais avançados para se proteger de ataques de DOS e, portanto, podem ser uma força centralizadora.

Há várias soluções para esse problema. Uma delas é a [tecnologia de validador distribuído](https://github.com/ethereum/distributed-validator-specs), que visa distribuir as várias tarefas relacionadas à execução de um validador entre várias máquinas, com redundância, de modo que seja muito mais difícil para um invasor impedir que um bloco seja proposto em um espaço específico. Entretanto, a solução mais eficiente é a **eleição de um único líder secreto (Single Secret Leader Election, SSLE)**.

## Eleição secreta de um único líder {#secret-leader-election}

Na SSLE, uma criptografia inteligente é usada para garantir que apenas o validador selecionado saiba que foi selecionado. Isso funciona fazendo com que cada validador envie um compromisso com um segredo que todos compartilham. Os compromissos são embaralhados e reconfigurados para que ninguém possa mapear compromissos a validadores, mas cada validador sabe qual compromisso pertence a ele. Em seguida, um compromisso é escolhido aleatoriamente. Se um validador detectar que o compromisso dele foi escolhido, ele saberá que é a vez dele de propor um bloco.

A principal implementação dessa ideia é chamada [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Funciona da seguinte forma:

1. Os validadores se comprometem com um segredo compartilhado. O esquema de compromisso é projetado de forma que possa ser vinculado a uma identidade de validador, mas também randomizado para que nenhum terceiro possa fazer engenharia reversa do vínculo e associar um compromisso específico a um validador específico.
2. No início de uma época, o RANDAO é utilizado para escolher um conjunto aleatório de 16.384 validadores para uma amostra de compromissos.
3. Para os próximos 8182 espaços (1 dia), os proponentes do bloco embaralham e randomizam um subconjunto dos compromissos usando a respectiva entropia privada.
4. Após o término do embaralhamento, o RANDAO é usado para criar uma lista ordenada dos compromissos. Essa lista é mapeada para espaços Ethereum.
5. Os validadores observam que o compromisso está vinculado a um espaço específico e, quando esse espaço chega, eles propõem um bloco.
6. Repita essas etapas para que a atribuição de compromissos aos espaços esteja sempre muito à frente do espaço atual.

Isso impede que os invasores saibam com antecedência qual validador específico proporá o próximo bloco, evitando a possibilidade de ataques DoS.

## Eleição de líder secreto não único (SnSLE) {#secret-non-single-leader-election}

Há também uma proposta separada que visa criar um cenário em que os validadores têm uma chance aleatória de propor um bloco em cada espaço, de forma semelhante à maneira como a proposta de bloco foi decidida na prova de trabalho, conhecida como **eleição de líder secreto não único (secret non-single leader election, SnSLE)**. Uma maneira simples de fazer isso é utilizar a função RANDAO usada para selecionar validadores aleatoriamente no protocolo atual. A ideia do RANDAO é que um número suficientemente aleatório seja gerado pela combinação de hashes enviados por diversos validadores independentes. Na SnSLE, esses hashes poderiam ser utilizados para escolher o próximo proponente de bloco, por exemplo, ao escolher o hash de menor valor. O intervalo de hashes válidos pode ser restringido para ajustar a probabilidade de validadores individuais serem selecionados em cada espaço. Ao declarar que o hash deve ser inferior a `2^256 * 5 / N`, em que `N` é o número de validadores ativos, a possibilidade de qualquer validador individual ser selecionado em cada espaço seria de `5/N`. Nesse exemplo, haveria uma chance de 99,3% de pelo menos um proponente gerar um hash válido em cada espaço.

## Progresso atual {#current-progress}

SSLE e SnSLE estão ambas em fase de pesquisa. Ainda não há especificações finalizadas para nenhuma das ideias. A SSLE e a SnSLE são propostas concorrentes que não podem ser implementadas conjuntamente. Antes da implementação, elas precisam de mais pesquisa e desenvolvimento, criação de protótipos e implementação em redes de testes públicas.

## Leitura adicional {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
