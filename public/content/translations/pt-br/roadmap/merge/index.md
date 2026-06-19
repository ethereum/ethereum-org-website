---
title: The Merge
description: Aprenda sobre The Merge - quando a Mainnet do Ethereum adotou a Prova de Participação (PoS).
lang: pt-br
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "A Rede Principal do Ethereum usa a Prova de Participação (PoS), mas nem sempre foi assim."
  - "A atualização do mecanismo original de Prova de Trabalho (PoW) para a Prova de Participação (PoS) foi chamada de The Merge."
  - "The Merge refere-se à fusão da Rede Principal do Ethereum original com uma blockchain separada de Prova de Participação (PoS) chamada Beacon Chain, existindo agora como uma única cadeia."
  - "The Merge reduziu o consumo de energia do Ethereum em ~99,95%."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  The Merge foi executado em 15 de setembro de 2022. Isso concluiu a transição do Ethereum para o consenso de Prova de Participação (PoS), descontinuando oficialmente a Prova de Trabalho (PoW) e reduzindo o consumo de energia em ~99,95%.
</UpgradeStatus>

## O que foi The Merge? {#what-is-the-merge}

The Merge foi a união da camada de execução original do Ethereum (a Mainnet que existe desde a [gênese](/ethereum-forks/#frontier)) com sua nova camada de consenso de Prova de Participação (PoS), a Beacon Chain. Ele eliminou a necessidade de mineração com alto consumo de energia e, em vez disso, permitiu que a rede fosse protegida usando ETH em staking. Foi um passo verdadeiramente empolgante na realização da visão do [Ethereum](/) — mais escalabilidade, segurança e sustentabilidade.

<MergeInfographic />

Inicialmente, a [Beacon Chain](/roadmap/beacon-chain/) foi lançada separadamente da [Mainnet](/glossary/#mainnet). A Rede Principal do Ethereum - com todas as suas contas, saldos, contratos inteligentes e estado da blockchain - continuou a ser protegida pela [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/), mesmo enquanto a Beacon Chain funcionava em paralelo usando a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/). The Merge foi quando esses dois sistemas finalmente se uniram, e a Prova de Trabalho (PoW) foi permanentemente substituída pela Prova de Participação (PoS).

Imagine que o Ethereum é uma nave espacial que foi lançada antes de estar totalmente pronta para uma viagem interestelar. Com a Beacon Chain, a comunidade construiu um novo motor e um casco reforçado. Após testes significativos, chegou a hora de trocar o motor antigo pelo novo em pleno voo. Isso fundiu o novo motor, mais eficiente, à nave existente, permitindo que ela percorresse muitos anos-luz e conquistasse o universo.

## Fusão com a Mainnet {#merging-with-mainnet}

A Prova de Trabalho (PoW) protegeu a Rede Principal do Ethereum desde a gênese até The Merge. Isso permitiu que a blockchain do Ethereum que todos conhecemos surgisse em julho de 2015 com todos os seus recursos familiares — transações, contratos inteligentes, contas, etc.

Ao longo da história do Ethereum, os desenvolvedores se prepararam para uma eventual transição da Prova de Trabalho (PoW) para a Prova de Participação (PoS). Em 1º de dezembro de 2020, a Beacon Chain foi criada como uma blockchain separada da Mainnet, funcionando em paralelo.

A Beacon Chain não processava originalmente as transações da Mainnet. Em vez disso, ela estava alcançando consenso sobre seu próprio estado, concordando com os validadores ativos e os saldos de suas contas. Após testes extensivos, chegou a hora de a Beacon Chain alcançar consenso sobre dados do mundo real. Após The Merge, a Beacon Chain se tornou o motor de consenso para todos os dados da rede, incluindo transações da camada de execução e saldos de contas.

The Merge representou a mudança oficial para o uso da Beacon Chain como o motor de produção de blocos. A mineração não é mais o meio de produzir blocos válidos. Em vez disso, os validadores de Prova de Participação (PoS) adotaram esse papel e agora são responsáveis por processar a validade de todas as transações e propor blocos.

Nenhum histórico foi perdido no The Merge. À medida que a Mainnet se fundiu com a Beacon Chain, ela também fundiu todo o histórico transacional do Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Essa transição para a Prova de Participação (PoS) mudou a forma como o ether é emitido. Saiba mais sobre a [emissão de ether antes e depois do The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Usuários e detentores {#users-holders}

**The Merge não mudou nada para detentores/usuários.**

_Vale a pena repetir_: Como usuário ou detentor de ETH ou qualquer outro ativo digital no Ethereum, bem como stakers que não operam nós, **você não precisa fazer nada com seus fundos ou carteira para se adaptar ao The Merge.** ETH é apenas ETH. Não existe 'ETH antigo'/'novo ETH' ou 'Eth1'/'Eth2' e as carteiras funcionam exatamente da mesma forma após The Merge como funcionavam antes — pessoas dizendo o contrário provavelmente são golpistas.

Apesar de substituir a Prova de Trabalho (PoW), todo o histórico do Ethereum desde a gênese permaneceu intacto e inalterado pela transição para a Prova de Participação (PoS). Quaisquer fundos mantidos em sua carteira antes do The Merge ainda estão acessíveis após The Merge. **Nenhuma ação é necessária da sua parte para a atualização.**

[Mais sobre a segurança do Ethereum](/security/#eth2-token-scam)

### Operadores de nós e desenvolvedores de dapps {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Os principais itens de ação incluem:

1. Execute _ambos_ um cliente de consenso e um cliente de execução; endpoints de terceiros para obter dados de execução não funcionam mais desde The Merge.
2. Autentique os clientes de execução e de consenso com um segredo JWT compartilhado para que eles possam se comunicar com segurança.
3. Defina um endereço `fee recipient` para receber suas gorjetas de taxa de transação/MEV ganhas.

Não concluir os dois primeiros itens acima resultará em seu nó sendo visto como "offline" até que ambas as camadas estejam sincronizadas e autenticadas.

Não definir um `fee recipient` ainda permitirá que seu validador se comporte normalmente, mas você perderá gorjetas de taxas não queimadas e qualquer MEV que você teria ganho nos blocos que seu validador propõe.
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Até The Merge, um cliente de execução (como Go Ethereum (Geth), Erigon, Besu ou Nethermind) era suficiente para receber, validar adequadamente e propagar blocos sendo transmitidos pela rede. _Após The Merge_, a validade das transações contidas em uma carga de execução agora também depende da validade do "bloco de consenso" no qual ela está contida.

Como resultado, um nó completo do Ethereum agora exige tanto um cliente de execução quanto um cliente de consenso. Esses dois clientes trabalham juntos usando uma nova Engine API. A Engine API exige autenticação usando um segredo JWT, que é fornecido a ambos os clientes, permitindo uma comunicação segura.

Os principais itens de ação incluem:

- Instale um cliente de consenso além de um cliente de execução
- Autentique os clientes de execução e de consenso com um segredo JWT compartilhado para que eles possam se comunicar com segurança entre si.

Não concluir os itens acima resultará em seu nó parecendo estar "offline" até que ambas as camadas estejam sincronizadas e autenticadas.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

The Merge veio com mudanças no consenso, o que também inclui mudanças relacionadas a:

<ul>
  <li>estrutura do bloco</li>
  <li>tempo de slot/bloco</li>
  <li>mudanças de código de operação</li>
  <li>fontes de aleatoriedade onchain</li>
  <li>conceito de <em>cabeçalho seguro</em> e <em>blocos finalizados</em></li>
</ul>

Para mais informações, confira esta postagem no blog de Tim Beiko sobre <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">Como The Merge Impacta a Camada de Aplicação do Ethereum</a>.

</ExpandableCard>

## The Merge e o consumo de energia {#merge-and-energy}

The Merge marcou o fim da Prova de Trabalho (PoW) para o Ethereum e iniciou a era de um Ethereum mais sustentável e ecológico. O consumo de energia do Ethereum caiu cerca de 99,95%, tornando o Ethereum uma blockchain verde. Saiba mais sobre o [consumo de energia do Ethereum](/energy-consumption/).

## The Merge e a escalabilidade {#merge-and-scaling}

The Merge também preparou o terreno para futuras atualizações de escalabilidade que não eram possíveis sob a Prova de Trabalho (PoW), deixando o Ethereum um passo mais perto de alcançar a escala total, segurança e sustentabilidade que [seu roteiro](/roadmap/) está construindo.

## Equívocos sobre The Merge {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Existem dois tipos de nós do Ethereum: nós que podem propor blocos e nós que não podem.

Os nós que propõem blocos são apenas um pequeno número do total de nós no Ethereum. Esta categoria inclui nós de mineração sob a Prova de Trabalho (PoW) e nós validadores sob a Prova de Participação (PoS). Esta categoria exige o comprometimento de recursos econômicos (como poder de hash de GPU na Prova de Trabalho ou ETH em staking na Prova de Participação) em troca da capacidade de ocasionalmente propor o próximo bloco e ganhar recompensas do protocolo.

Os outros nós na rede (ou seja, a maioria) não são obrigados a comprometer quaisquer recursos econômicos além de um computador de nível de consumidor com 1-2 TB de armazenamento disponível e uma conexão com a internet. Esses nós não propõem blocos, mas ainda desempenham um papel crítico na proteção da rede, responsabilizando todos os proponentes de blocos ao ouvir novos blocos e verificar sua validade na chegada, de acordo com as regras de consenso da rede. Se o bloco for válido, o nó continua propagando-o pela rede. Se o bloco for inválido por qualquer motivo, o software do nó o desconsiderará como inválido e interromperá sua propagação.

A execução de um nó que não produz blocos é possível para qualquer pessoa sob qualquer mecanismo de consenso (Prova de Trabalho ou Prova de Participação); é <em>fortemente encorajado</em> para todos os usuários, se tiverem os meios. Executar um nó é imensamente valioso para o Ethereum e oferece benefícios adicionais a qualquer indivíduo que o execute, como maior segurança, privacidade e resistência à censura.

A capacidade de qualquer pessoa executar seu próprio nó é <em>absolutamente essencial</em> para manter a descentralização da rede Ethereum.

[Mais sobre como executar seu próprio nó](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

As taxas de gás são um produto da demanda da rede em relação à capacidade da rede. The Merge descontinuou o uso da Prova de Trabalho (PoW), fazendo a transição para a Prova de Participação (PoS) para o consenso, mas não alterou significativamente nenhum parâmetro que influencie diretamente a capacidade ou a vazão da rede.

Com um <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">roteiro centrado em rollup</a>, os esforços estão focados em escalar a atividade do usuário na [camada 2 (l2)](/layer-2/), enquanto habilita a Mainnet da camada 1 (l1) como uma camada de liquidação descentralizada segura otimizada para armazenamento de dados de rollup para ajudar a tornar as transações de rollup exponencialmente mais baratas. A transição para a Prova de Participação (PoS) é um precursor crítico para a realização disso. [Mais sobre gás e taxas.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
A "velocidade" de uma transação pode ser medida de algumas maneiras, incluindo o tempo para ser incluída em um bloco e o tempo para a finalidade. Ambos mudam ligeiramente, mas não de uma forma que os usuários percebam.

Historicamente, na Prova de Trabalho (PoW), a meta era ter um novo bloco a cada ~13,3 segundos. Sob a Prova de Participação (PoS), os slots ocorrem precisamente a cada 12 segundos, cada um dos quais é uma oportunidade para um validador publicar um bloco. A maioria dos slots tem blocos, mas não necessariamente todos (ou seja, um validador está offline). Na Prova de Participação (PoS), os blocos são produzidos ~10% mais frequentemente do que na Prova de Trabalho (PoW). Esta foi uma mudança bastante insignificante e é improvável que seja notada pelos usuários.

A Prova de Participação (PoS) introduziu o conceito de finalidade de transação que não existia anteriormente. Na Prova de Trabalho (PoW), a capacidade de reverter um bloco fica exponencialmente mais difícil a cada bloco minerado em cima de uma transação, mas nunca chega a zero. Sob a Prova de Participação (PoS), os blocos são agrupados em épocas (períodos de 6,4 minutos contendo 32 chances para blocos) nas quais os validadores votam. Quando uma época termina, os validadores votam se devem considerar a época 'justificada'. Se os validadores concordarem em justificar a época, ela será finalizada na próxima época. Desfazer transações finalizadas é economicamente inviável, pois exigiria obter e queimar mais de um terço do total de ETH em staking.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Inicialmente após The Merge, os stakers só podiam acessar gorjetas de taxas e MEV que foram ganhos como resultado de propostas de blocos. Essas recompensas são creditadas em uma conta sem staking controlada pelo validador (conhecida como <em>recebedor de taxas</em>) e estão disponíveis imediatamente. Essas recompensas são separadas das recompensas do protocolo por realizar as funções de validador.

Desde a atualização da rede Shanghai/Capella, os stakers agora podem designar um <em>endereço de saque</em> para começar a receber pagamentos automáticos de qualquer saldo de staking excedente (ETH acima de 32 das recompensas do protocolo). Esta atualização também permitiu a capacidade de um validador desbloquear e recuperar todo o seu saldo ao sair da rede.

[Mais sobre saques de staking](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Como a atualização Shanghai/Capella permitiu saques, os validadores são incentivados a sacar seu saldo de staking acima de 32 ETH, pois esses fundos não aumentam o rendimento e, de outra forma, ficam bloqueados. Dependendo da APR (determinada pelo total de ETH em staking), eles podem ser incentivados a sair de seu(s) validador(es) para recuperar todo o seu saldo ou potencialmente fazer staking de ainda mais usando suas recompensas para ganhar mais rendimento.

Uma ressalva importante aqui: as saídas completas de validadores são limitadas por taxa pelo protocolo, e apenas um certo número de validadores pode sair por época (a cada 6,4 minutos). Esse limite flutua dependendo do número de validadores ativos, mas chega a aproximadamente 0,33% do total de ETH em staking que pode sair da rede em um único dia.

Isso evita um êxodo em massa de fundos em staking. Além disso, evita que um invasor em potencial com acesso a uma grande parte do total de ETH em staking cometa uma ofensa passível de penalização e saia/saque todos os saldos dos validadores infratores na mesma época antes que o protocolo possa aplicar a penalização.

A APR também é intencionalmente dinâmica, permitindo que um mercado de stakers equilibre o quanto eles estão dispostos a receber para ajudar a proteger a rede. Se a taxa for muito baixa, os validadores sairão a uma taxa limitada pelo protocolo. Gradualmente, isso aumentará a APR para todos que permanecerem, atraindo novos stakers ou stakers que retornam mais uma vez.
</ExpandableCard>

## O que aconteceu com o 'Eth2'? {#eth2}

O termo 'Eth2' foi descontinuado. Após a fusão do 'Eth1' e 'Eth2' em uma única cadeia, não há mais necessidade de distinguir entre duas redes Ethereum; existe apenas o Ethereum.

Para limitar a confusão, a comunidade atualizou estes termos:

- 'Eth1' agora é a 'camada de execução', que lida com transações e execução.
- 'Eth2' agora é a 'camada de consenso', que lida com o consenso de Prova de Participação (PoS).

Essas atualizações de terminologia alteram apenas as convenções de nomenclatura; isso não altera os objetivos ou o roteiro do Ethereum.

[Saiba mais sobre a renomeação do 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Relação entre as atualizações {#relationship-between-upgrades}

As atualizações do Ethereum estão todas de certa forma inter-relacionadas. Então, vamos recapitular como The Merge se relaciona com as outras atualizações.

### The Merge e a Beacon Chain {#merge-and-beacon-chain}

The Merge representa a adoção formal da Beacon Chain como a nova camada de consenso para a camada de execução original da Mainnet. Desde The Merge, os validadores são designados para proteger a Rede Principal do Ethereum, e a mineração na [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/) não é mais um meio válido de produção de blocos.

Em vez disso, os blocos são propostos por nós validadores que fizeram staking de ETH em troca do direito de participar do consenso. Essas atualizações preparam o terreno para futuras atualizações de escalabilidade, incluindo a cadeia de fragmentos.

<ButtonLink href="/roadmap/beacon-chain/">
  A Beacon Chain
</ButtonLink>

### The Merge e a atualização Shanghai {#merge-and-shanghai}

A fim de simplificar e maximizar o foco em uma transição bem-sucedida para a Prova de Participação (PoS), a atualização The Merge não incluiu certos recursos previstos, como a capacidade de sacar ETH em staking. Essa funcionalidade foi habilitada separadamente com a atualização Shanghai/Capella.

Para os curiosos, saiba mais sobre [O que acontece após The Merge](https://youtu.be/7ggwLccuN5s?t=101), apresentado por Vitalik no evento ETHGlobal de abril de 2021.

### The Merge e a cadeia de fragmentos {#merge-and-data-sharding}

Originalmente, o plano era trabalhar na cadeia de fragmentos antes do The Merge para lidar com a escalabilidade. No entanto, com o boom das [soluções de escalabilidade da camada 2 (l2)](/layer-2/), a prioridade mudou para trocar a Prova de Trabalho (PoW) pela Prova de Participação (PoS) primeiro.

Os planos para a cadeia de fragmentos estão evoluindo rapidamente, mas dado o aumento e o sucesso das tecnologias da camada 2 (l2) para escalar a execução de transações, os planos da cadeia de fragmentos mudaram para encontrar a maneira mais ideal de distribuir o fardo de armazenar dados de chamada compactados de contratos de rollup, permitindo um crescimento exponencial na capacidade da rede. Isso não seria possível sem primeiro fazer a transição para a Prova de Participação (PoS).

<ButtonLink href="/roadmap/danksharding/">
  Cadeia de fragmentos
</ButtonLink>

## Leitura adicional {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />