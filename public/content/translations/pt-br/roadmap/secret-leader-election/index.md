---
title: Eleição secreta de líder
description: Explicação de como a eleição secreta de líder pode ajudar a proteger os validadores contra ataques
lang: pt-br
summaryPoints:
  - O endereço IP dos propositores de bloco pode ser conhecido com antecedência, tornando-os vulneráveis a ataques
  - A eleição secreta de líder oculta a identidade dos validadores para que não sejam conhecidos com antecedência
  - Uma extensão dessa ideia é tornar a seleção de validadores aleatória em cada slot.
---

No mecanismo de consenso baseado em [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos) atual, a lista dos próximos propositores de bloco é pública e é possível mapear seus endereços IP. Isso significa que invasores poderiam identificar quais validadores devem propor um bloco e alvejá-los com um ataque de negação de serviço (DOS) que os deixa incapazes de propor seu bloco a tempo.

Isso poderia criar oportunidades para um invasor lucrar. Por exemplo, um propositor de bloco selecionado para o slot `n+1` poderia fazer um ataque DOS no proponente do slot `n` para que ele perca sua oportunidade de propor um bloco. Isso permitiria que o propositor de bloco invasor extraísse o MEV de ambos os slots, ou pegasse todas as transações que deveriam ter sido divididas em dois blocos e, em vez disso, as incluísse todas em um só, ganhando todas as taxas associadas. É provável que isso afete mais os validadores domésticos do que os validadores institucionais sofisticados, que podem usar métodos mais avançados para se proteger de ataques DOS, e poderia, portanto, ser uma força centralizadora.

Existem várias soluções para esse problema. Uma delas é a [tecnologia de validador distribuído (DVT)](https://github.com/ethereum/distributed-validator-specs), que visa distribuir as várias tarefas relacionadas à execução de um validador em várias máquinas, com redundância, para que seja muito mais difícil para um invasor impedir que um bloco seja proposto em um slot específico. No entanto, a solução mais robusta é a **Eleição Secreta de Único Líder (SSLE)**.

## Eleição secreta de único líder {#secret-leader-election}

Na SSLE, uma criptografia inteligente é usada para garantir que apenas o validador selecionado saiba que foi selecionado. Isso funciona fazendo com que cada validador envie um compromisso para um segredo que todos compartilham. Os compromissos são embaralhados e reconfigurados para que ninguém possa mapear os compromissos aos validadores, mas cada validador sabe qual compromisso pertence a ele. Em seguida, um compromisso é escolhido aleatoriamente. Se um validador detectar que seu compromisso foi escolhido, ele saberá que é a sua vez de propor um bloco.

A principal implementação dessa ideia é chamada de [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Que funciona da seguinte forma:

1. Os validadores se comprometem com um segredo compartilhado. O esquema de compromisso é projetado de forma que possa ser vinculado à identidade de um validador, mas também randomizado para que nenhum terceiro possa fazer engenharia reversa da vinculação e ligar um compromisso específico a um validador específico.
2. No início de uma época, um conjunto aleatório de validadores é escolhido para amostrar compromissos de 16.384 validadores, usando o RANDAO.
3. Para os próximos 8.182 slots (1 dia), os propositores de bloco embaralham e randomizam um subconjunto dos compromissos usando sua própria entropia privada.
4. Após o término do embaralhamento, o RANDAO é usado para criar uma lista ordenada dos compromissos. Essa lista é mapeada nos slots do Ethereum.
5. Os validadores veem que seu compromisso está anexado a um slot específico e, quando esse slot chega, eles propõem um bloco.
6. Repita essas etapas para que a atribuição de compromissos aos slots esteja sempre muito à frente do slot atual.

Isso impede que os invasores saibam com antecedência qual validador específico proporá o próximo bloco, evitando a capacidade de ataques DOS.

## Eleição secreta de líder não único (SnSLE) {#secret-non-single-leader-election}

Há também uma proposta separada que visa criar um cenário em que cada validador tenha uma chance aleatória de propor um bloco em cada slot, de forma semelhante a como a proposta de bloco era decidida sob a Prova de Trabalho (PoW), conhecida como **eleição secreta de líder não único (SnSLE)**. Uma maneira simples de fazer isso é usar a função RANDAO usada para selecionar validadores aleatoriamente no protocolo atual. A ideia com o RANDAO é que um número suficientemente aleatório seja gerado misturando hashes enviados por muitos validadores independentes. Na SnSLE, esses hashes poderiam ser usados para escolher o próximo propositor de bloco, por exemplo, escolhendo o hash de menor valor. O intervalo de hashes válidos poderia ser restrito para ajustar a probabilidade de validadores individuais serem selecionados em cada slot. Ao afirmar que o hash deve ser menor que `2^256 * 5 / N` onde `N` = número de validadores ativos, a chance de qualquer validador individual ser selecionado em cada slot seria `5/N`. Neste exemplo, haveria uma chance de 99,3% de pelo menos um proponente gerar um hash válido em cada slot.

## Progresso atual {#current-progress}

A SSLE e a SnSLE estão ambas na fase de pesquisa. Ainda não há uma especificação finalizada para nenhuma das ideias. A SSLE e a SnSLE são propostas concorrentes que não poderiam ser implementadas juntas. Antes de serem lançadas, elas precisam de mais pesquisa e desenvolvimento, prototipagem e implementação em testnets públicas.

## Leitura adicional {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)