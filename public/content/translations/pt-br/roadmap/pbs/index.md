---
title: Separação de Proponente-Construtor
description: Saiba como e por que os validadores do Ethereum dividirão suas responsabilidades de construção e transmissão de blocos.
lang: pt-br
---

# Separação de Proponente-Construtor {#proposer-builder-separation}

Os validadores atuais do Ethereum criam _e_ transmitem blocos. Eles agrupam as transações de que tomaram conhecimento por meio da rede de transmissão e as empacotam em um bloco que é enviado a pares na rede Ethereum. A **separação entre proponente e construtor (PBS)** divide essas tarefas entre diversos validadores. Os construtores de blocos se tornam responsáveis por criar blocos e oferecê-los ao proponente de blocos em cada espaço. O proponente de blocos não pode ver o conteúdo do bloco, ele simplesmente escolhe o mais lucrativo e paga uma taxa ao construtor do bloco antes de enviar o bloco aos seus pares.

Essa é uma importante melhoria por diversos motivos. Primeiro, cria oportunidades para evitar a censura das transações no nível do protocolo. Em segundo lugar, evita que validadores amadores sejam superados por participantes institucionais que podem otimizar melhor a lucratividade da construção de blocos. Em terceiro lugar, ajuda na escalabilidade do Ethereum, permitindo melhorias do Danksharding.

## PBS e resistência à censura {#pbs-and-censorship-resistance}

A separação entre os construtores e os proponentes de blocos faz com que seja muito mais difícil para os construtores de blocos censurar as transações. Isso ocorre porque é possível adicionar critérios de inclusão relativamente complexos que garantem que não houve censura antes da proposição do bloco. Como o proponente do bloco é uma entidade separada do construtor do bloco, ele pode assumir o papel de protetor contra censurar construtores de blocos.

Por exemplo, podem ser introduzidas listas de inclusão para que, quando os validadores souberem das transações, mas não as virem incluídas nos blocos, possam impô-las como obrigatórias no próximo bloco. A lista de inclusão é gerada a partir do mempool local (a lista de transações conhecidas) dos proponentes do bloco e enviada aos pares imediatamente antes da proposição de um bloco. Se alguma das transações da lista de inclusão estiver faltando, o proponente poderá rejeitar o bloco, adicionar as transações faltantes antes de propô-lo, ou propô-lo e permitir que ele seja rejeitado por outros validadores assim que o receberem. Há também uma versão potencialmente mais eficiente dessa ideia que afirma que os construtores devem utilizar totalmente o espaço de bloco disponível e, se não o fizerem, as transações serão adicionadas a partir da lista de inclusão do proponente. Essa ainda é uma área de pesquisa ativa e a configuração ideal das listas de inclusão ainda não foi determinada.

[Mempools criptografados](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) também pode impossibilitar que os criadores e proponentes saibam quais transações estão sendo incluídas em um bloco até que o bloco já tenha sido transmitido.

<ExpandableCard title="Que tipos de censura a PBS resolve?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Organizações poderosas podem pressionar os validadores a censurar transações de ou para determinados endereços. Os validadores aceitam essa pressão ao detectar endereços que fazem parte da lista de endereços não permitidos no pool de transações, omitindo-os dos blocos que propõem. Depois da PBS, isso não será mais possível, porque os proponentes de blocos não saberão quais transações estão transmitindo em seus blocos. Pode ser importante que indivíduos ou aplicativos específicos estejam em conformidade com as regras de censura, por exemplo, quando isso se torna uma lei na respectiva região. Nesses casos, a conformidade ocorre no nível do aplicativo, enquanto o protocolo permanece sem permissão e sem censura.

</ExpandableCard>

## PBS e MEV {#pbs-and-mev}

**Valor máximo extraível (MEV)** se refere a validadores que maximizam a lucratividade ao ordenar transações favoravelmente. Exemplos comuns incluem trocas de arbitragem de swaps em corretoras descentralizadas (por exemplo, antecipação de uma grande venda ou compra) ou a identificação de oportunidades para liquidar posições de DeFi. Maximizar o MEV exige conhecimento técnico sofisticado e software personalizado anexado a validadores comuns, o que faz com que seja muito mais provável que os operadores institucionais superem os validadores e amadores individuais na extração do MEV. Isso significa que os retornos das participações provavelmente serão maiores com operadores centralizados, criando uma força centralizadora que desincentiva a participação interna.

O PBS resolve esse problema ao reconfigurar a economia do MEV. Em vez de o proponente do bloco fazer sua própria pesquisa de MEV, ele simplesmente escolhe um bloco dentre os muitos oferecidos pelos construtores de blocos. Os construtores de blocos podem ter feito uma extração sofisticada do MEV, mas a recompensa vai para o proponente de bloco. Isso significa que, mesmo que um pequeno grupo de construtores de blocos especializados domine a extração do MEV, a recompensa pode ir para qualquer validador na rede, incluindo participantes internos individuais.

<ExpandableCard title="Por que não há problema em centralizar a construção de blocos?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Os indivíduos poderiam ser incentivados a realizar participações com pools em vez de por conta própria devido às recompensas maiores oferecidas por estratégias sofisticadas de MEV. Separar a construção do bloco da proposta do bloco significa que o MEV extraído será distribuído entre mais validadores, em vez de ser centralizado no pesquisador de MEV mais eficiente. Ao mesmo tempo, permitir a existência de construtores de blocos especializados retira o ônus da construção de blocos dos indivíduos e também evita que roubem o MEV, o que maximiza o número de validadores individuais e independentes que podem verificar se os blocos são honestos. O conceito importante é a "assimetria entre provador e verificador", que se refere à ideia de que a produção centralizada de blocos é aceitável, desde que haja uma rede eficiente e descentralizada ao máximo de validadores capazes de provar que os blocos são honestos. A descentralização é um meio, não um objetivo fina. O que queremos são blocos honestos.
</ExpandableCard>

## PBS e Danksharding {#pbs-and-danksharding}

Danksharding é a maneira pela qual o Ethereum será dimensionado para >100.000 transações por segundo e minimizará as taxas para usuários de rollup. Ele depende da PBS porque aumenta a carga de trabalho dos construtores de blocos, que precisarão calcular provas de até 64 MB de dados de rollup em menos de 1 segundo. Isso provavelmente exigirá construtores especializados que possam dedicar um hardware bastante considerável à tarefa. Entretanto, na situação atual, o desenvolvimento de blocos pode se tornar cada vez mais centralizado em torno de operadores mais sofisticados e poderosos, devido à extração de MEV. A separação entre proponente e construtor é uma forma de aceitar essa realidade e evitar que exerça uma força centralizadora na validação do bloco (a parte importante) ou na distribuição das recompensas de participação. Um grande benefício adicional é que os construtores de blocos especializados também estão dispostos e têm a capacidade de calcular as provas de dados necessárias para o Danksharding.

## Progresso atual {#current-progress}

A PBS está em uma etapa avançada de pesquisa, mas ainda há algumas questões importantes de design que precisam ser resolvidas antes da abordagem poder ser prototipada em clientes Ethereum. Ainda não há uma especificação finalizada. Isso significa que a PBS está provavelmente a um ano de distância ou mais. Confira o [estado da pesquisa](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) mais recente.

## Leitura adicional {#further-reading}

- [Estado da pesquisa: resistência à censura na PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Designs de mercado de taxas compatíveis com a PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS e resistência à censura](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listas de inclusão](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
