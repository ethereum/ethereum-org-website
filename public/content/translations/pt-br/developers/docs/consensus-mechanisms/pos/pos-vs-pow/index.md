---
title: "Prova de Participação (PoS) vs Prova de Trabalho (PoW)"
description: "Uma comparação entre o mecanismo de consenso baseado em Prova de Participação e o baseado em Prova de Trabalho do Ethereum"
lang: pt-br
---

Quando o [Ethereum](/) foi lançado, a Prova de Participação (PoS) ainda precisava de muita pesquisa e desenvolvimento antes que pudesse ser confiável para proteger o Ethereum. A Prova de Trabalho (PoW) era um mecanismo mais simples que já havia sido comprovado pelo Bitcoin, o que significa que os desenvolvedores principais puderam implementá-lo imediatamente para lançar o Ethereum. Levou mais oito anos para desenvolver a Prova de Participação até o ponto em que pudesse ser implementada.

Esta página explica a lógica por trás da mudança do Ethereum da Prova de Trabalho para a Prova de Participação e as compensações envolvidas.

## Segurança {#security}

Os pesquisadores do Ethereum consideram a Prova de Participação mais segura do que a Prova de Trabalho. No entanto, ela foi implementada apenas recentemente na Rede Principal do Ethereum real e é menos comprovada pelo tempo do que a Prova de Trabalho. As seções a seguir discutem os prós e contras do modelo de segurança da Prova de Participação em comparação com a Prova de Trabalho.

### Custo para atacar {#cost-to-attack}

Na Prova de Participação, exige-se que os validadores depositem em garantia ("fazer stake") pelo menos 32 ETH em um contrato inteligente. O Ethereum pode destruir o ether em stake para punir validadores que se comportem mal. Para chegar a um consenso, pelo menos 66% do total de ether em stake deve votar a favor de um conjunto específico de blocos. Os blocos votados por >=66% do stake tornam-se "finalizados", o que significa que não podem ser removidos ou reorganizados.

Atacar a rede pode significar impedir que a cadeia seja finalizada ou garantir uma certa organização de blocos na cadeia canônica que de alguma forma beneficie um invasor. Isso exige que o invasor desvie o caminho do consenso honesto, seja acumulando uma grande quantidade de ether e votando com ele diretamente, ou enganando validadores honestos para que votem de uma maneira específica. Deixando de lado os ataques sofisticados e de baixa probabilidade que enganam validadores honestos, o custo para atacar o Ethereum é o custo do stake que um invasor precisa acumular para influenciar o consenso a seu favor.

O menor custo de ataque é >33% do stake total. Um invasor que detenha >33% do stake total pode causar um atraso na finalidade simplesmente ficando offline. Este é um problema relativamente menor para a rede, pois existe um mecanismo conhecido como "vazamento por inatividade" que drena o stake de validadores offline até que a maioria online represente 66% do stake e possa finalizar a cadeia novamente. Também é teoricamente possível que um invasor cause dupla finalidade com um pouco mais de 33% do stake total, criando dois blocos em vez de um quando for solicitado a ser um produtor de blocos e, em seguida, votando duas vezes com todos os seus validadores. Cada bifurcação exige apenas que 50% dos validadores honestos restantes vejam cada bloco primeiro, então, se eles conseguirem cronometrar suas mensagens perfeitamente, poderão finalizar ambas as bifurcações. Isso tem uma baixa probabilidade de sucesso, mas se um invasor conseguisse causar dupla finalidade, a comunidade Ethereum teria que decidir seguir uma bifurcação, caso em que os validadores do invasor seriam necessariamente penalizados na outra.

Com >33% do stake total, um invasor tem a chance de causar um efeito menor (atraso na finalidade) ou mais grave (dupla finalidade) na rede Ethereum. Com mais de 14.000.000 ETH em stake na rede e um preço representativo de US$ 1.000/ETH, o custo mínimo para montar esses ataques é `1000 x 14,000,000 x 0.33 = $4,620,000,000`. O invasor perderia esse dinheiro por meio de penalização e seria expulso da rede. Para atacar novamente, eles teriam que acumular >33% do stake (novamente) e queimá-lo (novamente). Cada tentativa de atacar a rede custaria >US$ 4,6 bilhões (a US$ 1.000/ETH e 14 milhões de ETH em stake). O invasor também é expulso da rede quando é penalizado e precisa entrar em uma fila de ativação para retornar. Isso significa que a taxa de um ataque repetido é limitada não apenas à taxa em que o invasor pode acumular >33% do stake total, mas também ao tempo que leva para integrar todos os seus validadores na rede. Cada vez que o invasor ataca, ele fica muito mais pobre, e o resto da comunidade fica mais rico, graças ao choque de oferta resultante.

Outros ataques, como ataques de 51% ou reversão de finalidade com 66% do stake total, exigem substancialmente mais ETH e são muito mais caros para o invasor.

Compare isso com a Prova de Trabalho. O custo de lançar um ataque no Ethereum de Prova de Trabalho era o custo de possuir consistentemente >50% da taxa de hash total da rede. Isso equivalia aos custos de hardware e operação de poder de computação suficiente para superar outros mineradores no cálculo de soluções de Prova de Trabalho de forma consistente. O Ethereum era minerado principalmente usando GPUs em vez de ASICs, o que mantinha o custo baixo (embora, se o Ethereum tivesse permanecido na Prova de Trabalho, a mineração com ASIC pudesse ter se tornado mais popular). Um adversário teria que comprar muito hardware e pagar pela eletricidade para executá-lo a fim de atacar uma rede Ethereum de Prova de Trabalho, mas o custo total seria menor do que o custo necessário para acumular ETH suficiente para lançar um ataque. Um ataque de 51% é ~[20x menos](https://youtu.be/1m12zgJ42dI?t=1562) caro na Prova de Trabalho do que na Prova de Participação. Se o ataque fosse detectado e a cadeia sofresse uma bifurcação rígida para remover suas alterações, o invasor poderia usar repetidamente o mesmo hardware para atacar a nova bifurcação.

### Complexidade {#complexity}

A Prova de Participação é muito mais complexa do que a Prova de Trabalho. Isso poderia ser um ponto a favor da Prova de Trabalho, pois é mais difícil introduzir bugs ou efeitos indesejados acidentalmente em protocolos mais simples. No entanto, a complexidade foi domada por anos de pesquisa e desenvolvimento, simulações e implementações em redes de teste. O protocolo de Prova de Participação foi implementado de forma independente por cinco equipes separadas (em cada uma das camadas de execução e consenso) em cinco linguagens de programação, fornecendo resiliência contra bugs de clientes.

Para desenvolver e testar com segurança a lógica de consenso da Prova de Participação, a Beacon Chain foi lançada dois anos antes de a Prova de Participação ser implementada na Rede Principal do Ethereum. A Beacon Chain atuou como um ambiente de testes para a Prova de Participação, pois era uma blockchain ativa implementando a lógica de consenso da Prova de Participação, mas sem tocar em transações reais do Ethereum - efetivamente apenas chegando a um consenso sobre si mesma. Uma vez que isso se manteve estável e livre de bugs por um tempo suficiente, a Beacon Chain foi "fundida" com a Rede Principal do Ethereum. Tudo isso contribuiu para domar a complexidade da Prova de Participação a ponto de o risco de consequências indesejadas ou bugs de clientes ser muito baixo.

### Superfície de ataque {#attack-surface}

A Prova de Participação é mais complexa do que a Prova de Trabalho, o que significa que há mais vetores de ataque em potencial para lidar. Em vez de uma rede ponto a ponto conectando clientes, existem duas, cada uma implementando um protocolo separado. Ter um validador específico pré-selecionado para propor um bloco em cada slot cria o potencial para negação de serviço, onde grandes quantidades de tráfego de rede derrubam esse validador específico, deixando-o offline.

Também existem maneiras pelas quais os invasores podem cronometrar cuidadosamente a liberação de seus blocos ou atestados para que sejam recebidos por uma certa proporção da rede honesta, influenciando-os a votar de certas maneiras. Por fim, um invasor pode simplesmente acumular ETH suficiente para fazer stake e dominar o mecanismo de consenso. Cada um desses [vetores de ataque tem defesas associadas](/developers/docs/consensus-mechanisms/pos/attack-and-defense), mas eles não existem para serem defendidos sob a Prova de Trabalho.

## Descentralização {#decentralization}

A Prova de Participação é mais descentralizada do que a Prova de Trabalho porque as corridas armamentistas de hardware de mineração tendem a excluir indivíduos e pequenas organizações devido ao preço. Embora qualquer pessoa possa tecnicamente começar a minerar com hardware modesto, a probabilidade de receber qualquer recompensa é incrivelmente pequena em comparação com as operações de mineração institucionais. Com a Prova de Participação, o custo do staking e o retorno percentual sobre esse stake são os mesmos para todos. Atualmente, custa 32 ETH para executar um validador.

Por outro lado, a invenção de derivativos de staking líquido levou a preocupações de centralização porque alguns grandes provedores gerenciam grandes quantidades de ETH em stake. Isso é problemático e precisa ser corrigido o mais rápido possível, mas também é mais sutil do que parece. Provedores de staking centralizados não têm necessariamente controle centralizado de validadores - muitas vezes é apenas uma maneira de criar um pool central de ETH que muitos operadores de nó independentes podem fazer stake sem que cada participante exija 32 ETH próprios.

A melhor opção para o Ethereum é que os validadores sejam executados localmente em computadores domésticos, maximizando a descentralização. É por isso que o Ethereum resiste a mudanças que aumentam os requisitos de hardware para executar um nó/validador.

## Sustentabilidade {#sustainability}

A Prova de Participação é uma maneira de baixo custo de carbono para proteger a blockchain. Sob a Prova de Trabalho, os mineradores competem pelo direito de minerar um bloco. Os mineradores são mais bem-sucedidos quando podem realizar cálculos mais rapidamente, incentivando o investimento em hardware e consumo de energia. Isso foi observado no Ethereum antes de mudar para a Prova de Participação. Pouco antes da transição para a Prova de Participação, o Ethereum consumia aproximadamente 78 TWh/ano - tanto quanto um país pequeno. No entanto, a mudança para a Prova de Participação reduziu esse gasto de energia em ~99,98%. A Prova de Participação tornou o Ethereum uma plataforma de baixo carbono e com eficiência energética.

[Mais sobre o consumo de energia do Ethereum](/energy-consumption)

## Emissão {#issuance}

O Ethereum de Prova de Participação pode pagar por sua segurança emitindo muito menos moedas do que o Ethereum de Prova de Trabalho porque os validadores não precisam pagar altos custos de eletricidade. Como resultado, o ETH pode reduzir sua inflação ou até mesmo se tornar deflacionário quando grandes quantidades de ETH são queimadas. Níveis de inflação mais baixos significam que a segurança do Ethereum é mais barata do que era sob a Prova de Trabalho.

## Prefere aprender visualmente? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Leitura adicional {#further-reading}

- [Filosofia de design da Prova de Participação de Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Perguntas frequentes sobre a Prova de Participação de Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Vídeo "Simply Explained" sobre PoS vs PoW](https://www.youtube.com/watch?v=M3EFi_POhps)