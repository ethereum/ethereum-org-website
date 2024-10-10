---
title: A Fusão
description: Aprenda sobre A Fusão — quando a Rede principal do Ethereum adotou a prova de participação.
lang: pt-br
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: A rede principal do Ethereum usa prova de participação, mas esse nem sempre foi o caso.
summaryPoint2: A melhoria do mecanismo original de prova de trabalho para prova de participação foi chamada de The Merge, ou seja, A Fusão.
summaryPoint3: A Fusão se refere à fusão original da Rede principal do Ethereum com uma blockchain de prova de participação separada chamada Beacon Chain, agora existente como uma cadeia.
summaryPoint4: A Fusão reduziu o consumo de energia do Ethereum em cerca de 99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  A Fusão foi executada em 15 de setembro de 2022. Isto completou a transição do Ethereum para o consenso de prova de participação, depreciando oficialmente a prova de trabalho, e reduzindo o consumo de energia em ~99,95%.
</UpgradeStatus>

## O que foi A Fusão? {#what-is-the-merge}

A Fusão foi a junção da camada de execução original do Ethereum (a Rede principal que existe desde a [origem](/history/#frontier)) com a sua nova camada de consenso de prova de participação, a Beacon Chain. Ele eliminou a necessidade de mineração que faz uso intensivo de energia e, em vez disso, permitiu que a rede fosse protegida usando participação de ETH. Foi uma etapa realmente emocionante para a realização da visão do Ethereum — mais escalabilidade, segurança e sustentabilidade.

<MergeInfographic />

Inicialmente, a [Beacon Chain](/roadmap/beacon-chain/) foi enviada separadamente da [Mainnet](/glossary/#mainnet). A rede principal da Ethereum - com todas as suas contas, saldos, contratos inteligentes e estado da cadeia de blocos - continuou a ser protegida pela [prova de trabalho](/developers/docs/consensus-mechanisms/pow/), mesmo enquanto a Beacon Chain funcionava em paralelo usando a [prova de participação](/developers/docs/consensus-mechanisms/pos/). A Fusão foi quando esses dois sistemas finalmente se uniram, e a prova de trabalho foi permanentemente substituída pela prova de participação.

Imagine que o Ethereum é uma espaçonave que foi lançada antes que estivesse pronta para uma viagem interestelar. Com a Beacon Chain, a comunidade construiu um novo motor e um casco reforçado. Após muitos testes, chegou a hora de trocar o novo motor a quente pelo antigo em pleno voo. Isso integrou o novo e mais eficiente motor à nave existente, o que lhe permitiu cruzar anos-luz e conquistar o universo.

## Fusão com a Rede principal {#merging-with-mainnet}

A prova de trabalho protegeu a rede principal do Ethereum desde sua origem até A Fusão. Isso permitiu que a cadeia de blocos do Ethereum com a qual todos estamos acostumados surgisse em julho de 2015 com todos os seus recursos familiares — transações, contratos inteligentes, contas, etc.

Ao longo da história do Ethereum, os desenvolvedores se prepararam para uma eventual transição da prova de trabalho para a prova de participação. Em 1 de dezembro de 2020, a Beacon Chain foi criada como uma cadeia de blocos separada da Rede principal, rodando em paralelo.

A Beacon Chain não estava processando originalmente as transações da Rede principal. Em vez disso, ela estava chegando ao consenso sobre seu próprio estado ao concordar com validadores ativos e seus saldos de conta. Após extensos testes, chegou a hora da Beacon Chain chegar a um consenso sobre os dados do mundo real. Após A Fusão, a Beacon Chain tornou-se o mecanismo de consenso para todos os dados da rede, incluindo transações da camada de execução e saldos de contas.

A integração representou a mudança oficial para o uso da Beacon Chain como o motor de produção de blocos. A mineração não é mais o meio de produzir blocos válidos. Em vez disso, os validadores da prova de participação adotaram esse papel e agora são responsáveis por processar a validade de todas as transações e propor blocos.

Nenhuma história foi perdida na Fusão. À medida que a Rede principal se uniu com a Beacon Chain, ela também integrou todo o histórico transacional do Ethereum.

<InfoBanner>
Essa transição para a prova de participação mudou o modo como o ether é emitido. Saiba mais sobre <a href="/roadmap/merge/issuance/">Emissão de ether antes de depois do The Merge</a>.
</InfoBanner>

### Usuários e titulares {#users-holders}

**A Fusão não mudou nada para titulares/usuários.**

_Vale a pena repetir_: como usuário ou titular de ETH, ou qualquer outro ativo digital no Ethereum, bem como participantes não operantes dos nós, **você não precisa fazer nada com seus fundos ou carteira para dar conta da Fusão.** ETH é apenas ETH. Não existe algo como "ETH antigo"/"ETH novo" ou "ETH1"/"ETH2" e as carteiras funcionam exatamente da mesma forma após A Fusão como antes — pessoas dizendo a você o contrário provavelmente são golpistas.

Apesar de trocar a prova de trabalho, toda a história do Ethereum desde a origem permaneceu intacta e inalterada com a transição para a prova de participação. Quaisquer fundos mantidos em sua carteira antes da Fusão ainda estarão acessíveis após A Fusão. **Nenhuma ação é necessária da sua parte para fazer parte dessa atualização revolucionária.**

[Mais sobre segurança no Ethereum](/security/#eth2-token-scam)

### Operadores de nós e desenvolvedores de dapps {#node-operators-dapp-developers}

<ExpandableCard
title="Operadores e provedores de nós de participação"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

As principais ações incluem:

1. Execute ao mesmo tempo um cliente de consenso e um cliente de execução; pontos de extremidade de terceiros para obter dados de execução não funcionam mais desde A Fusão.
2. Autentique os clientes de execução e de consenso com um segredo JWT compartilhado para que eles possam se comunicar com segurança.
3. Defina um endereço de "destinatário das taxas" para receber dicas sobre suas taxas de transação ganhas / MEV.

Não completar os dois primeiros itens acima fará com que seu nó seja visto como "offline" até que ambas as camadas sejam sincronizadas e autenticadas.

Não definir um "destinatário de taxa" ainda permitirá que seu validador se comporte como de costume, mas você perderá comissões de taxas não queimadas e qualquer MEV que você teria ganhado em blocos que seu validador propõe.
</ExpandableCard>

<ExpandableCard
title="Operadores de nós e provedores de infraestrutura não validados"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Até a integração, um cliente de execução (como Geth, Erigon, Besu ou Nethermind) era suficiente para receber, validar devidamente e propagar blocos sendo transmitidos pela rede. _Após A Fusão_, a validade das transações contidas em uma carga de execução agora também depende da validade do "bloco de consenso" que ele contém.

Como resultado, um nó completo do Ethereum agora requer um cliente de execução e um cliente de consenso. Esses dois clientes trabalham juntos usando uma nova API do mecanismo. A API do mecanismo requer autenticação usando um segredo JTW, que é fornecido a ambos os clientes, permitindo uma comunicação segura.

Os principais itens de ação incluem:

- Instalar um cliente de consenso além de um cliente de execução
- Autenticar clientes de execução e de consenso com um segredo JWT compartilhado para que eles possam se comunicar com segurança uns com os outros.

Não completar os itens acima resultará com que seu nó pareça estar "offline" até que ambas as camadas sejam sincronizadas e autenticadas.

</ExpandableCard>

<ExpandableCard
title="Dapp e desenvolvedores de contratos inteligentes"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

A Fusão veio com alterações no consenso, que também inclui alterações relacionadas a:<

<ul>
  <li>estrutura de bloco</li>
  <li>timing de espaço/bloco</li>
  <li>alterações de opcode</li>
  <li>fontes de aleatoriedade em cadeia</li>
  <li>conceito de <em>cabeçalho seguro</em> e <em>blocos finalizados</em></li>
</ul>

Para obter mais informações, leia esta publicação de Tim Beiko sobre <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">How The Merge Impacts Ethereum’s Application Layer</a> (Como a Fusão afeta a camada de aplicação do Ethereum).

</ExpandableCard>

## A Fusão e o consumo de energia {#merge-and-energy}

A Fusão marcou o fim da prova de trabalho para o Ethereum e deu início à era de um Ethereum mais sustentável e ecológico. O consumo de energia do Ethereum reduziu cerca de 99,95%, tornando o Ethereum uma blockchain verde. Descubra mais sobre [Consumo de energia na rede Ethereum](/energy-consumption/).

## A Fusão e a escalabilidade {#merge-and-scaling}

The Merge também preparou o terreno para futuras atualizações de escalabilidade que não eram possíveis na prova de trabalho, deixando o Ethereum mais próximo de alcançar a escalabilidade, segurança e sustentabilidade descritas na [Visão do Ethereum](/roadmap/vision/).

## Concepções erradas sobre A Fusão {#misconceptions}

<ExpandableCard
title="Equívoco: &quot;executar um nó requer a participação de 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Existem dois tipos de nós no Ethereum: nós que podem propor blocos e nós que não podem.

Os nós que propõem blocos são apenas um pequeno número dos nós totais no Ethereum. Esta categoria inclui nós de mineração sob a prova de trabalho (PoW) e nós validadores sobre a prova de participação (PoS). Esta categoria requer comprometer recursos econômicos (como o poder de hash da GPU em prova de trabalho ou ETH em prova de participação) em troca da capacidade de propor, ocasionalmente, o próximo bloco e ganhar recompensas de protocolo.

Os outros nós na rede (por exemplo, a maioria) não é obrigada a comprometer quaisquer recursos econômicos para além de um computador com 1 a 2 TB de armazenamento disponível e uma conexão com a internet. Esses nós não propõem blocos, mas eles ainda desempenham um papel crítico na segurança da rede, mantendo todos os proponentes de bloco responsáveis, ouvindo novos blocos e verificando sua validade na chegada de acordo com as regras de consenso da rede. Se o bloco for válido, o nó continua a propagá-lo pela rede. Se o bloco é inválido por qualquer motivo, o software do nó irá ignorá-lo como inválido e irá parar sua propagação.

Qualquer pessoa pode executar um nó que não produz blocos, em qualquer mecanismo de consenso (prova de trabalho ou prova de participação); isso é <em>amplamente incentivado</em> para todos os usuários, se tiverem os meios. A execução de um nó é imensamente valiosa para o Ethereum e oferece benefícios adicionais a qualquer indivíduo executando um, como maior segurança, privacidade e resistência à censura.

A capacidade de qualquer pessoa de executar seu próprio nó é <em>absolutamente essencial</em> para manter a descentralização da rede Ethereum.

<a href="/run-a-node/">Mais detalhes sobre como executar seu próprio nó</a>

</ExpandableCard>

<ExpandableCard
title="Equívoco: &quot;A Fusão falhou em reduzir as taxas de gás.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Taxas de gás são um produto da demanda de rede relativa à capacidade da rede. A Fusão depreciou o uso da prova de trabalho, passando para a prova de participação por consenso, mas não alterou significativamente nenhum parâmetro que influencie diretamente a capacidade da rede ou a taxa de transferência.

Com um <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">planejamento centrado em rollup</a>, os esforços se concentram em dimensionar a atividade do usuário na <a href="/layer-2/">camada 2</a> ao habilitar a rede principal da camada 1 como uma camada de estabelecimento descentralizada e segura, otimizada para o armazenamento de dados de rollup para ajudar a fazer com que as transações de rollup sejam exponencialmente mais acessíveis. A transição para a prova de participação é um precursor crítico para a realização desse objetivo. <a href="/developers/docs/gas/">Mais informações sobre gás e taxas.</a>

</ExpandableCard>

<ExpandableCard
title="Equívoco: &quot;as transações foram aceleradas substancialmente pela Fusão.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
A "velocidade" da transação pode ser medida de poucas maneiras, incluindo o tempo para ser incluída em um bloco e o tempo para finalização. Esses dois fatores mudam ligeiramente, mas não de uma forma que os usuários perceberão.

Historicamente, na prova de trabalho, o objetivo era ter um bloco novo a cada ~13,3 segundos. Já na prova de participação, os espaços ocorrem precisamente a cada 12 segundos, e cada um deles é uma oportunidade para um validador publicar um bloco. A maioria dos espaços tem blocos, mas não necessariamente todos (isto é, um validador está offline). Na prova de participação, os blocos são produzidos ~10% mais frequentemente do que na prova de trabalho. Essa foi uma mudança bastante insignificante e é pouco provável que seja notada pelos usuários.

A prova de participação introduziu o conceito de finalidade da transação que não existia anteriormente. Na prova de trabalho, a capacidade de reverter um bloco fica exponencialmente mais difícil com cada bloco de passagem minerado em cima de uma transação, mas nunca chega a zero. Sob a prova de participação, os blocos são agrupados em épocas (períodos de tempo de 6,4 minutos contendo 32 chances de blocos) que os validadores votam. Quando uma época termina, os validadores votam se devem considerar a época "justificada". Se os validadores concordarem em justificar a época, ela será finalizada na próxima época. Desfazer transações finalizadas é economicamente inviável, pois exigiria obter e queimar mais de um terço do total de ETH colocado.

</ExpandableCard>

<ExpandableCard
title="Equívoco: &quot;A Fusão permitiu saques de participação.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Inicialmente, após a Fusão, os participantes podiam acessar apenas as comissões de taxas e o MEV obtidos como resultado de propostas de bloco. Essas recompensas são creditadas em uma conta de não participação controlada pelo validador (conhecido como <em>destinatário da taxa</em>), e ficam disponíveis imediatamente. Essas recompensas são separadas das recompensas do protocolo pela execução das obrigações do validador.

Desde a melhoria da rede Shanghai/Capella, os participantes agora podem designar um <em>endereço de saque</em> para começar a receber pagamentos automáticos de qualquer saldo de participação excedente (ETH superior a 32 de recompensas do protocolo). Essa melhoria também permitiu que um validador desbloqueasse e recuperasse todo o saldo ao sair da rede.

<a href="/staking/withdrawals/">Mais sobre saques de participação</a>

</ExpandableCard>

<ExpandableCard
title="Conceito errôneo: &quot;agora que a Fusão está concluída e os saques estão habilitados, os participantes podem sair todos de uma só vez.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Como a melhoria do Shanghai/Capella permitiu saques, os validadores são incentivados a sacar o saldo de participação superior a 32 ETH, já que esses fundos não aumentam o rendimento e são bloqueados. Dependendo da APR (determinada pelo total de ETH participado), eles podem ser incentivados a sair de seus validadores para recuperar todo o saldo ou potencialmente participar ainda mais utilizando as recompensas, de forma a obter mais rendimento.

Uma advertência importante aqui é que as saídas completas do validador são limitadas pelo protocolo, e apenas um número específico de validadores pode sair por época (a cada 6,4 minutos). Esse limite varia de acordo com o número de validadores ativos, mas chega a aproximadamente 0,33% do total de ETH participado que pode ser sacado da rede em um único dia.

Isso evita um êxodo em massa dos fundos participados. Além disso, impede que um possível invasor com acesso a uma grande parte do total de ETH participado cometa uma ofensa passível de corte e saia/saque todos os saldos do validador infrator na mesma época, antes que o protocolo possa aplicar a penalidade de corte.

A APR também é intencionalmente dinâmica, o que permite que um mercado de participantes equilibre o quanto estão dispostos a receber para ajudar a proteger a rede. Se a taxa for muito baixa, os validadores sairão a uma taxa limitada pelo protocolo. Gradualmente, isso aumentará a APR para todos os que permanecerem, atraindo participantes novos ou antigos novamente.
</ExpandableCard>

## O que aconteceu com o "Eth2"? {#eth2}

O termo "Eth2" foi descontinuado. Após unir "Eth1" e "Eth2" em uma única cadeia, não há mais necessidade de distinguir entre duas redes Ethereum; agora existe apenas o Ethereum.

Para diminuir a confusão, a comunidade atualizou estes termos:

- O "Eth1" agora é a "camada de execução", que lida com transações e execução.
- O "Eth2" é agora a "camada de consenso", que lida com o consenso da prova de participação.

Estas atualizações de terminologia apenas alteram as convenções de nomenclatura; isso não altera os objetivos ou o roteiro do Ethereum.

[Saiba mais sobre a renomeação "Eth2"](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relação entre as melhorias {#relationship-between-upgrades}

Todas as melhorias do Ethereum estão, de alguma forma, interrelacionadas. Vamos então recapitular como a fusão se relaciona com as outras melhorias.

### A Fusão e a Beacon Chain {#merge-and-beacon-chain}

A Fusão representa a adoção formal do Beacon Chain como a nova camada de consenso para a camada de execução da Rede principal original. Desde A Fusão, os validadores são designados a proteger a Rede principal do Ethereum, e a mineração na [prova de trabalho](/developers/docs/consensus-mechanisms/pow/) não é mais um meio válido de produção em bloco.

Em vez disso, os blocos são propostos validando nós que colocaram o ETH em troca do direito de participar do consenso. Essas atualizações preparam o cenário para futuras atualizações de escalabilidade, incluindo fragmentação.

<ButtonLink href="/roadmap/beacon-chain/">
  A Beacon Chain
</ButtonLink>

### A Fusão e a atualização do Shanghai {#merge-and-shanghai}

Para simplificar e maximizar o foco em uma transição bem-sucedida para a prova de participação, a atualização da Fusão não incluiu certos recursos previstos, como a possibilidade de retirar o ETH colocado. Essa funcionalidade foi habilitada separadamente com a melhoria Shanghai/Capella.

Se tiver curiosidade, assista ao vídeo [What Happens After The Merge](https://youtu.be/7ggwLccuN5s?t=101) (O que ocorre após a Fusão), apresentado por Vitalik no evento ETHGlobal de abril de 2021.

### A Fusão e a fragmentação {#merge-and-data-sharding}

Originalmente, o plano era trabalhar na fragmentação antes da Fusão para atender a escalabilidade. No entanto, com a expansão das [soluções de escalabilidade da camada 2](/layer-2/), a prioridade passou a ser a troca da prova de trabalho pela prova de participação.

Os planos para fragmentação estão evoluindo rapidamente, mas dado o surgimento e o sucesso das tecnologias de camada 2 para escalar a execução de transação, os planos de fragmentação mudaram para encontrar a maneira mais otimizada de distribuir a carga de armazenamento dos dados de chamadas compactadas em contratos rollup, permitindo um crescimento exponencial da capacidade da rede. Isso não seria possível sem uma primeira transição para a prova de participação.

<ButtonLink href="/roadmap/danksharding/">
  Fragmentação
</ButtonLink>

## Leitura adicional {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
