---
title: Separação propositor-construtor
description: Aprenda como e por que os validadores do Ethereum dividirão suas responsabilidades de construção e transmissão de blocos.
lang: pt-br
---

Os validadores atuais do [Ethereum](/) criam _e_ transmitem blocos. Eles agrupam as transações das quais ouviram falar através da rede de fofocas (gossip network) e as empacotam em um bloco que é enviado aos pares na rede Ethereum. A **separação propositor-construtor (PBS)** divide essas tarefas entre vários validadores. Os construtores de blocos tornam-se responsáveis por criar blocos e oferecê-los ao propositor de bloco em cada slot. O propositor de bloco não pode ver o conteúdo do bloco, ele simplesmente escolhe o mais lucrativo, recebendo uma taxa do construtor de blocos (ou o construtor paga um lance ao proponente) antes de enviar o bloco aos seus pares.

Esta é uma atualização importante por vários motivos. Primeiro, cria oportunidades para evitar a censura de transações no nível do protocolo. Segundo, evita que validadores amadores sejam superados por participantes institucionais que podem otimizar melhor a lucratividade de sua construção de blocos. Terceiro, ajuda a escalar o Ethereum ao possibilitar as atualizações do danksharding.

## PBS e resistência à censura {#pbs-and-censorship-resistance}

Separar os construtores de blocos e os propositores de blocos torna muito mais difícil para os construtores de blocos censurarem transações. Isso ocorre porque critérios de inclusão relativamente complexos podem ser adicionados para garantir que nenhuma censura tenha ocorrido antes que o bloco seja proposto. Como o propositor de bloco é uma entidade separada do construtor de blocos, ele pode assumir o papel de protetor contra construtores de blocos censores.

Por exemplo, listas de inclusão podem ser introduzidas para que, quando os validadores souberem de transações, mas não as virem incluídas nos blocos, possam impô-las como obrigatórias no próximo bloco. A lista de inclusão é gerada a partir da mempool local do propositor de bloco (a lista de transações da qual ele tem conhecimento) e enviada aos seus pares pouco antes de um bloco ser proposto. Se alguma das transações da lista de inclusão estiver faltando, o proponente pode rejeitar o bloco, adicionar as transações ausentes antes de propô-lo, ou propô-lo e deixar que seja rejeitado por outros validadores quando o receberem. Há também uma versão potencialmente mais eficiente dessa ideia que afirma que os construtores devem utilizar totalmente o espaço disponível no bloco e, se não o fizerem, as transações são adicionadas a partir da lista de inclusão do proponente. Esta ainda é uma área de pesquisa ativa e a configuração ideal para as listas de inclusão ainda não foi determinada.

[Mempools criptografadas](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) também poderiam tornar impossível para construtores e proponentes saberem quais transações estão incluindo em um bloco até depois que o bloco já tenha sido transmitido.

<ExpandableCard title="Quais tipos de censura a PBS resolve?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Organizações poderosas podem pressionar os validadores a censurar transações de ou para determinados endereços. Os validadores cedem a essa pressão detectando endereços na lista negra em seu pool de transações e omitindo-os dos blocos que propõem. Após a separação propositor-construtor (PBS), isso não será mais possível porque os propositores de blocos não saberão quais transações estão transmitindo em seus blocos. Pode ser importante para certos indivíduos ou aplicativos cumprir as regras de censura, por exemplo, quando isso se torna lei em sua região. Nesses casos, a conformidade acontece no nível do aplicativo, enquanto o protocolo permanece não permissionado e livre de censura.

</ExpandableCard>

## PBS e MEV {#pbs-and-mev}

O **valor máximo extraível (MEV)** refere-se aos validadores maximizando sua lucratividade ao ordenar transações de forma favorável. Exemplos comuns incluem a arbitragem de trocas em corretoras descentralizadas (por exemplo, antecipar-se a uma grande venda ou compra) ou identificar oportunidades para liquidar posições de finanças descentralizadas (DeFi). Maximizar o MEV exige conhecimento técnico sofisticado e software personalizado anexado a validadores normais, tornando muito mais provável que operadores institucionais superem indivíduos e validadores amadores na extração de MEV. Isso significa que os retornos de staking provavelmente serão maiores com operadores centralizados, criando uma força centralizadora que desincentiva o staking doméstico.

A PBS resolve esse problema reconfigurando a economia do MEV. Em vez de o propositor de bloco fazer sua própria busca de MEV, ele simplesmente escolhe um bloco entre muitos oferecidos a ele por construtores de blocos. Os construtores de blocos podem ter feito uma extração sofisticada de MEV, mas a recompensa por isso vai para o propositor de bloco. Isso significa que, mesmo que um pequeno grupo de construtores de blocos especializados domine a extração de MEV, a recompensa por isso pode ir para qualquer validador na rede, incluindo stakers domésticos individuais.

<ExpandableCard title="Por que não há problema em centralizar a construção de blocos?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Indivíduos poderiam ser incentivados a fazer staking com pools em vez de por conta própria devido às recompensas aprimoradas oferecidas por estratégias sofisticadas de MEV. Separar a construção de blocos da proposta de bloco significa que o MEV extraído será distribuído por mais validadores em vez de se centralizar com o buscador de MEV mais eficaz. Ao mesmo tempo, permitir a existência de construtores de blocos especializados tira o fardo da construção de blocos dos indivíduos e também evita que os indivíduos roubem MEV para si mesmos, enquanto maximiza o número de validadores individuais e independentes que podem verificar se os blocos são honestos. O conceito importante é a "assimetria provador-verificador", que se refere à ideia de que a produção centralizada de blocos é aceitável, desde que haja uma rede robusta e maximamente descentralizada de validadores capazes de provar que os blocos são honestos. A descentralização é um meio, não um objetivo final - o que queremos são blocos honestos.
</ExpandableCard>

## PBS e danksharding {#pbs-and-danksharding}

O danksharding é a maneira como o Ethereum escalará para >100.000 transações por segundo e minimizará as taxas para usuários de rollup. Ele depende da PBS porque aumenta a carga de trabalho para os construtores de blocos, que terão que computar provas para até 64 MB de dados de rollup em menos de 1 segundo. Isso provavelmente exigirá construtores especializados que possam dedicar um hardware bastante substancial à tarefa. No entanto, na situação atual, a construção de blocos poderia se tornar cada vez mais centralizada em torno de operadores mais sofisticados e poderosos de qualquer maneira devido à extração de MEV. A separação propositor-construtor é uma maneira de abraçar essa realidade e evitar que ela exerça força centralizadora na validação de bloco (a parte importante) ou na distribuição de recompensas de staking. Um grande benefício adicional é que os construtores de blocos especializados também estão dispostos e aptos a computar as provas de dados necessárias para o danksharding.

## Progresso atual {#current-progress}

A PBS está em um estágio avançado de pesquisa, mas ainda existem algumas questões importantes de design que precisam ser resolvidas antes que possa ser prototipada em clientes Ethereum. Ainda não há uma especificação finalizada. Isso significa que a PBS provavelmente está a um ano ou mais de distância. Confira o [estado da pesquisa](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) mais recente.

## Leitura adicional {#further-reading}

- [Estado da pesquisa: resistência à censura sob a PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Designs de mercado de taxas amigáveis à PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS e resistência à censura](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listas de inclusão](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)