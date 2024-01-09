---
title: Prova de participação versus Prova de trabalho
description: Uma comparação entre o mecanismo de consenso baseado em prova de participação e prova de trabalho do Ethereum
lang: pt-br
---

Quando o Ethereum foi lançado, a prova de participação ainda precisava de muita pesquisa e desenvolvimento antes que pudesse ser confiável para proteger o Ethereum. A prova de trabalho era um mecanismo mais simples que já havia sido comprovado pelo Bitcoin, o que significa que os principais desenvolvedores poderiam implementá-lo imediatamente para lançar o Ethereum. Levou mais oito anos para desenvolver a prova de participação até o ponto em que poderia ser implementada.

Esta página explica a lógica por trás da mudança do Ethereum para prova de participação de prova de trabalho e as compensações envolvidas.

## Segurança {#security}

Os pesquisadores da Ethereum consideram a prova de participação mais segura do que a prova de trabalho. No entanto, ele só foi implementado recentemente para a rede principal real do Ethereum e é menos comprovado pelo tempo do que a prova de trabalho. As seções a seguir discutem os prós e os contras do modelo de segurança da prova de participação, em comparação com a prova de trabalho.

### Custo de ataque {#cost-to-attack}

Na prova de participação, os validadores são obrigados a depositar ("participação") pelo menos 32 ETH em um contrato inteligente. O Ethereum pode destruir o ether em participação para punir os validadores que se comportam mal. Para chegar a um consenso, pelo menos 66% do total de ether em participação deve votar a favor de um determinado conjunto de blocos. Os blocos votados por >=66% da participação tornam-se "finalizados", o que significa que não podem ser removidos ou reorganizados.

Atacar a rede pode significar impedir a cadeia de finalizar ou garantir uma certa organização de blocos na cadeia canônica, que de alguma forma beneficia um atacante. Isso exige o atacante desviar o caminho do consenso honesto, seja acumulando uma grande quantidade de ether, seja votando diretamente com ele ou enganando os validadores honestos para que votem de uma maneira particular. Ataques sofisticados e de baixa probabilidade que enganam validadores honestos à parte, o custo para atacar o Ethereum é o custo da participação que um invasor precisa acumular para influenciar o consenso a seu favor.

O menor custo de ataque é >33% da participação total. Um atacante com >33% da participação total pode causar um atraso de finalização simplesmente ficando offline. Este é um problema relativamente menor para a rede, pois existe um mecanismo conhecido como "vazamento de inatividade" que vaza a participação dos validadores offline até que a maioria online represente 66% de participação e possa finalizar a cadeia novamente. Também é teoricamente possível para um atacante causar dupla finalidade com um pouco mais de 33% da participação total, criando dois blocos em vez de um quando ele for solicitado para ser um produtor de bloco e, em seguida, votar duas vezes com todos os seus validadores. Cada fork (bifurcação) requer apenas 50% dos validadores honestos restantes para ver cada bloco primeiro, portanto, se eles conseguirem gerenciar o tempo de suas mensagens da maneira certa, eles poderão finalizar ambos os forks. Isso tem uma baixa probabilidade de sucesso, mas se um atacante for capaz de causar dupla finalidade, a comunidade Ethereum teria que decidir seguir um fork, nesse caso, os validadores do atacante seriam necessariamente cortados no outro fork.

Com >33% da participação total, um atacante tem a chance de ter um efeito menor (atraso de finalização) ou mais grave (finalidade dupla) na rede Ethereum. Com mais de 14.000.000 ETH em participação na rede e um preço representativo de US$ 1.000/ETH, o custo mínimo para montar esses ataques é `1.000 x 14.000.000 x 0,33 = US$ 4.620.000.000`. O atacante perderia esse dinheiro cortando e seria expulso da rede. Para atacar novamente, eles teriam que acumular >33% da participação (novamente) e queimá-la (novamente). Cada tentativa de ataque à rede custaria >$ 4,6 bilhões (US$ 1.000/ETH e 14 milhões de ETH em participação). O atacante também é ejetado da rede quando ele é cortado, e precisa entrar em uma fila de ativação para entrar novamente. Isso significa que a taxa de um ataque repetido é limitado não apenas à taxa que o atacante pode acumular >33% da participação total, mas também ao tempo que leva para incluir todos os seus validadores à rede. Cada vez que o atacante ataca, eles ficam muito mais pobres e o resto da comunidade fica mais rico, graças ao choque da oferta resultante.

Outros ataques, como ataques de 51% ou reversão de finalidade com 66% da participação total, exigem substancialmente mais ETH e são muito mais caros para o atacante.

Compare isso com a prova de trabalho. O custo de lançar um ataque à prova de trabalho Ethereum era o custo de possuir consistentemente >50% da taxa total de hash da rede. Isso somado aos custos de hardware e funcionamento do poder de computação suficiente, para superar outros mineradores a computar soluções de prova de trabalho de forma consistente. O Ethereum foi minerado principalmente usando GPUs em vez de ASICs, o que manteve o custo baixo (embora o Ethereum tivesse continuado na prova de trabalho, a mineração ASIC poderia ter se tornado mais popular). Um adversário teria que adquirir muito hardware e pagar pela eletricidade para executá-lo para atacar uma rede Ethereum de prova de trabalho, mas o custo total seria menor que o custo necessário para acumular ETH suficiente para lançar um ataque. Um ataque de 51% é ~[20 vezes mais barato](https://youtu.be/1m12zgJ42dI?t=1562) na prova de trabalho do que na prova de participação. Se o ataque for detectado e a cadeia realizasse o fork para remover suas alterações, o atacante poderia usar repetidamente o mesmo hardware para atacar o novo fork.

### Complexidade {#complexity}

A prova de participação é muito mais complexa do que a prova de trabalho. Isso poderia ser um ponto a favor da prova de trabalho, pois é mais difícil de introduzir bugs ou efeitos não intencionais em protocolos mais simples acidentalmente. No entanto, a complexidade tem sido domada por anos de pesquisa e desenvolvimento, simulações e implementações na rede de teste. O protocolo de prova de participação tem sido implementado independentemente por cinco equipes separadas (em cada uma das camadas de execução e consenso) em cinco linguagens de programação, fornecendo resiliência contra bugs de cliente.

Para desenvolver e testar com segurança a lógica de consenso da prova de participação, a Beacon Chain foi lançada dois anos antes da prova de participação ser implementada na rede principal do Ethereum. A Beacon Chain atuou como um ambiente para testes da prova de participação, já que era uma blockchain ativa implementando a lógica de consenso da prova de participação, mas sem tocar em transações reais do Ethereum - apenas efetivamente chegando a um consenso sobre si mesmo. Uma vez que isso tem sido estável e livre de bugs por tempo suficiente, a Beacon Chain foi "fundida" com a rede principal do Ethereum. Tudo isso contribuiu para domar a complexidade da prova de participação a ponto que o risco de consequências não intencionais ou bugs de cliente serem muito baixos.

### Superfície de Ataque {#attack-surface}

A prova de participação é mais complexa do que a prova de trabalho, o que significa que há mais vetores de ataque em potencial a tratar. Em vez de uma rede ponto-a-ponto conectando clientes, há duas, cada uma implementando um protocolo separado. Ter um validador específico pré-selecionado para propor um bloco em cada slot, cria o potencial de negação de serviço quando grandes quantidades de tráfego de rede colocam esse validador específico off-line.

Também há maneiras pelos quais atacantes podem programar cuidadosamente a liberação de seus blocos ou atestações, para que sejam recebidos por uma certa proporção da rede honesta, influenciando-os a votar em certas maneiras. Por fim, um atacante pode simplesmente acumular ETH suficiente para participar e dominar o mecanismo de consenso. Cada um desses [vetores de ataque tem defesas associadas](/developers/docs/consensus-mechanisms/pos/attack-and-defense), mas eles não existem para serem defendidos sob a prova de trabalho.

## Descentralização {#decentralization}

A prova de participação é mais descentralizada do que a prova de trabalho, por isso que as corridas armamentistas de hardware para mineração tendem a prejudicar indivíduos e pequenas organizações. Enquanto qualquer pessoa possa tecnicamente começar a minerar com hardware modesto, sua probabilidade de receber qualquer recompensa é muito pequena comparada com as operações de mineração institucionais. Com a prova de participação, o custo de staking (participação) e a porcentagem de retorno dessa participação são os mesmos para todos. Atualmente, custa 32 ETH para executar um validador.

Por outro lado, a invenção de derivativos de staking líquido levou a preocupações de centralização, porque alguns grandes provedores gerenciam grandes quantidades de ETH em participação. Isso é problemático e precisa ser corrigido o mais rápido possível, mas também tem mais nuances do que parece. Provedores de staking centralizados não têm necessariamente controle centralizado de validadores - muitas vezes é apenas uma maneira de criar um pool central de ETH que muitos operadores de nós independentes podem participar sem que cada participante exija seus 32 ETH próprios.

A melhor opção para o Ethereum é que os validadores sejam executados localmente em computadores domésticos, maximizando a descentralização. É por isso que o Ethereum resiste a mudanças que aumentam os requisitos de hardware para executar um nó/validador.

## Sustentabilidade {#sustainability}

A prova de participação é uma forma barata de proteger a blockchain. Na prova de trabalho, os mineradores competem pelo direito de minerar um bloco. Os mineradores são mais bem-sucedidos quando podem realizar cálculos mais rápidos, incentivando o investimento em hardware e o consumo de energia. Isso foi observado no Ethereum antes de mudar para a prova de participação. Pouco antes da transição para prova de participação, o Ethereum consumia aproximadamente 78 TWh/ano - tanto quanto um pequeno país. No entanto, a mudança para a prova de participação reduziu esse gasto de energia em ~99,98%. A prova de participação tornou o Ethereum uma plataforma de baixo carbono e eficiência energética.

[Saiba mais sobre o consumo energético do Ethereum](/energy-consumption)

## Emissão {#issuance}

A prova de participação do Ethereum pode pagar por sua segurança emitindo muito menos moedas do que a prova de trabalho do Ethereum, porque os validadores não precisam pagar altos custos de eletricidade. Como resultado, o ETH pode reduzir sua inflação ou até mesmo se tornar deflacionário quando grandes quantidades de ETH são queimadas. Níveis mais baixos de inflação significam que a segurança do Ethereum é mais barata do que era na prova de trabalho.

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

Assista Justin Drake explicando os benefícios da prova de participação em relação à prova de trabalho:

<YouTube id="1m12zgJ42dI" />

## Leitura adicional {#further-reading}

- [Filosofia de design da prova de participação de Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Perguntas frequentes sobre a prova de participação de Vitalik](https://vitalik.ca/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Vídeo "Simplesmente Explicado" sobre pos vs pow](https://www.youtube.com/watch?v=M3EFi_POhps)
