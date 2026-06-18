---
title: Faça staking do seu ETH em casa
description: Uma visão geral de como começar a fazer staking do seu ETH em casa
lang: pt-br
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie, o rinoceronte, em seu próprio chip de computador.
sidebarDepth: 2
summaryPoints:
  - Receba recompensas máximas diretamente do protocolo por manter seu validador funcionando corretamente e online
  - Execute hardware em casa e contribua pessoalmente para a segurança e descentralização da rede Ethereum
  - Remova a necessidade de confiança e nunca abra mão do controle das chaves dos seus fundos
---

## O que é staking em casa? {#what-is-solo-staking}

Fazer staking em casa é o ato de [executar um nó Ethereum](/run-a-node/) conectado à internet e depositar 32 ETH para ativar um [validador](#faq), dando a você a capacidade de participar diretamente do consenso da rede.

**O staking em casa aumenta a descentralização da rede Ethereum**, tornando o [Ethereum](/) mais resistente à censura e robusto contra ataques. Outros métodos de staking podem não ajudar a rede da mesma forma. O staking em casa é a melhor opção de staking para proteger o Ethereum.

Um nó Ethereum consiste em um cliente da camada de execução (EL), bem como um cliente da camada de consenso (CL). Esses clientes são softwares que trabalham juntos, juntamente com um conjunto válido de chaves de assinatura, para verificar transações e blocos, atestar a ponta correta da cadeia, agregar atestados e propor blocos.

Os stakers em casa são responsáveis por operar o hardware necessário para executar esses clientes. É altamente recomendável usar uma máquina dedicada para isso que você opera de casa – isso é extremamente benéfico para a saúde da rede.

Um staker em casa recebe recompensas diretamente do protocolo por manter seu validador funcionando corretamente e online.

## Por que fazer staking de casa? {#why-stake-solo}

O staking em casa traz mais responsabilidade, mas fornece a você o controle máximo sobre seus fundos e configuração de staking.

<Grid>
  <Card title="Ganhe novos ETH" emoji="💸" description="Ganhe recompensas denominadas em ETH diretamente do protocolo quando seu validador estiver online, sem intermediários cobrando uma parte." />
  <Card title="Controle total" emoji="🎛️" description="Mantenha suas próprias chaves. Escolha a combinação de clientes e hardware que permite minimizar seu risco e contribuir da melhor forma para a saúde e a segurança da rede. Serviços de staking de terceiros tomam essas decisões por você, e nem sempre fazem as escolhas mais seguras." />
  <Card title="Segurança da rede" emoji="🔐" description="O staking em casa é a maneira mais impactante de fazer staking. Ao executar um validador em seu próprio hardware em casa, você fortalece a robustez, a descentralização e a segurança do protocolo Ethereum." />
</Grid>

## Considerações antes de fazer staking em casa {#considerations-before-staking-solo}

Por mais que desejássemos que o staking em casa fosse acessível e livre de riscos para todos, essa não é a realidade. Existem algumas considerações práticas e sérias a serem lembradas antes de escolher fazer staking do seu ETH em casa.

<ExpandableCard title="Leitura obrigatória" eventCategory="SoloStaking" eventName="clicked required reading">
Ao operar seu próprio nó, você deve passar algum tempo aprendendo a usar o software que escolheu. Isso envolve a leitura da documentação relevante e estar atento aos canais de comunicação dessas equipes de desenvolvimento.

Quanto mais você entender sobre o software que está executando e como a Prova de Participação (PoS) funciona, menos arriscado será como staker e mais fácil será corrigir quaisquer problemas que possam surgir ao longo do caminho como operador de nó.
</ExpandableCard>

<ExpandableCard title="Familiaridade com computadores" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
A configuração do nó exige um nível razoável de conforto ao trabalhar com computadores, embora novas ferramentas estejam facilitando isso com o tempo. A compreensão da interface de linha de comando é útil, mas não é mais estritamente necessária.

Também requer uma configuração de hardware muito básica e alguma compreensão das especificações mínimas recomendadas.
</ExpandableCard>

<ExpandableCard title="Gerenciamento seguro de chaves" eventCategory="SoloStaking" eventName="clicked secure key management">
Assim como as chaves privadas protegem seu endereço Ethereum, você precisará gerar chaves especificamente para o seu validador. Você deve entender como manter quaisquer frases semente ou chaves privadas seguras e protegidas.{' '}

[Segurança do Ethereum e prevenção de golpes](/security/)
</ExpandableCard>

<ExpandableCard title="Manutenção" eventCategory="SoloStaking" eventName="clicked maintenance">
Ocasionalmente, o hardware falha, as conexões de rede apresentam erros e o software do cliente precisa de atualização. A manutenção do nó é inevitável e ocasionalmente exigirá sua atenção. Você vai querer ter certeza de estar ciente de quaisquer atualizações de rede antecipadas ou outras atualizações críticas do cliente.
</ExpandableCard>

<ExpandableCard title="Tempo de atividade confiável" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Suas recompensas são proporcionais ao tempo que seu validador está online e atestando corretamente. O tempo de inatividade incorre em penalidades proporcionais a quantos outros validadores estão offline ao mesmo tempo, mas <a href="#faq">não resulta em penalização (slashing)</a>. A largura de banda também é importante, pois as recompensas são reduzidas para atestados que não são recebidos a tempo. Os requisitos variam, mas recomenda-se um mínimo de 10 Mb/s de upload e download.
</ExpandableCard>

<ExpandableCard title="Risco de penalização" eventCategory="SoloStaking" eventName="clicked slashing risk">
Diferente das penalidades de inatividade por estar offline, a <em>penalização (slashing)</em> é uma penalidade muito mais séria reservada para ofensas maliciosas. Ao executar um cliente minoritário com suas chaves carregadas em apenas uma máquina por vez, seu risco de ser penalizado é minimizado. Dito isso, todos os stakers devem estar cientes dos riscos de penalização.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mais sobre penalização e o ciclo de vida do validador</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Como funciona {#how-it-works}

<StakingHowSoloWorks />

Enquanto estiver ativo, você ganhará recompensas em ETH, que serão depositadas periodicamente em seu endereço de saque.

Se desejar, você pode realizar a saída como um validador, o que elimina a exigência de estar online e interrompe quaisquer recompensas adicionais. Seu saldo restante será então sacado para o endereço de saque que você designar durante a configuração.

[Mais sobre saques de staking](/staking/withdrawals/)

## Comece no Staking Launchpad {#get-started-on-the-staking-launchpad}

O Staking Launchpad é um aplicativo de código aberto que ajudará você a se tornar um staker. Ele o guiará na escolha de seus clientes, na geração de suas chaves e no depósito de seu ETH no contrato de depósito de staking. Uma lista de verificação é fornecida para garantir que você cobriu tudo para configurar seu validador com segurança.

<StakingLaunchpadWidget />

## O que considerar com ferramentas de configuração de nó e cliente {#node-tool-considerations}

Há um número crescente de ferramentas e serviços para ajudá-lo a fazer staking do seu ETH em casa, mas cada um vem com diferentes riscos e benefícios.

Indicadores de atributos são usados abaixo para sinalizar pontos fortes ou fracos notáveis que uma ferramenta de staking listada pode ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe quais ferramentas ajudarão em sua jornada de staking.

<StakingConsiderations page="solo" />

## Explore ferramentas de configuração de nó e cliente {#node-and-client-tools}

Há uma variedade de opções disponíveis para ajudá-lo com sua configuração. Use os indicadores acima para ajudar a guiá-lo pelas ferramentas abaixo.

<ProductDisclaimer />

### Ferramentas de nó {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Observe a importância de escolher um [cliente minoritário](/developers/docs/nodes-and-clients/client-diversity/), pois isso melhora a segurança da rede e limita seu risco. As ferramentas que permitem configurar um cliente minoritário são indicadas como <em style={{ textTransform: "uppercase" }}>"multi-client" (multicliente).</em>

### Geradores de chaves {#key-generators}

Essas ferramentas podem ser usadas como uma alternativa à [CLI de depósito de staking](https://github.com/ethereum/staking-deposit-cli/) para ajudar na geração de chaves.

<StakingProductsCardGrid category="keyGen" />

Tem uma sugestão de uma ferramenta de staking que deixamos passar? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se ela se encaixaria bem e para enviá-la para análise.

## Explore guias de staking em casa {#staking-guides}

<StakingGuides />

## Perguntas frequentes {#faq}

Estas são algumas das perguntas mais comuns sobre staking que vale a pena conhecer.

<ExpandableCard title="O que é um validador?">

Um <em>validador</em> é uma entidade virtual que vive no Ethereum e participa do consenso do protocolo Ethereum. Os validadores são representados por um saldo, chave pública e outras propriedades. Um <em>cliente validador</em> é o software que atua em nome do validador, mantendo e usando sua chave privada. Um único cliente validador pode conter muitos pares de chaves, controlando muitos validadores.

</ExpandableCard>

<ExpandableCard title="Posso depositar mais de 32 ETH?">
Sim, as contas de validador modernas são capazes de reter até 2048 ETH. O ETH adicional acima de 32 será composto de maneira gradual, aumentando em incrementos de números inteiros à medida que seu saldo real aumenta. Isso é conhecido como seu <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efetivo</a>.

Para aumentar o saldo efetivo de uma conta e, assim, aumentar as recompensas, um buffer de 0,25 ETH acima de qualquer limite de ETH completo deve ser ultrapassado. Por exemplo, uma conta com um saldo real de 32,9 e um saldo efetivo de 32 precisaria ganhar mais 0,35 ETH para elevar seu saldo real acima de 33,25 antes de acionar um aumento no saldo efetivo.

Esse buffer também impede que um saldo efetivo caia até que tenha ficado 0,25 ETH abaixo de seu saldo efetivo atual.

Cada par de chaves associado a um validador exige pelo menos 32 ETH para ser ativado. Qualquer saldo acima disso pode ser sacado para o endereço de saque associado a qualquer momento por meio de uma transação assinada por esse endereço. Quaisquer fundos acima do saldo efetivo máximo serão sacados automaticamente de forma periódica.

Se o staking em casa parecer muito exigente para você, considere usar um provedor de [staking como serviço](/staking/saas/), ou se você estiver trabalhando com menos de 32 ETH, confira os [pools de staking](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Serei penalizado se ficar offline? (tldr: Não.)">
Ficar offline quando a rede está sendo finalizada corretamente NÃO resultará em penalização (slashing). Pequenas <em>penalidades de inatividade</em> são incorridas se o seu validador não estiver disponível para atestar em uma determinada época (cada uma com 6,4 minutos de duração), mas isso é muito diferente de <em>penalização</em>. Essas penalidades são um pouco menores do que a recompensa que você teria ganho se o validador estivesse disponível para atestar, e as perdas podem ser recuperadas com aproximadamente a mesma quantidade de tempo online novamente.

Observe que as penalidades por inatividade são proporcionais a quantos validadores estão offline ao mesmo tempo. Nos casos em que uma grande parte da rede está toda offline de uma vez, as penalidades para cada um desses validadores serão maiores do que quando um único validador está indisponível.

Em casos extremos, se a rede parar de ser finalizada como resultado de mais de um terço dos validadores estarem offline, esses usuários sofrerão o que é conhecido como um <em>vazamento por inatividade quadrático</em>, que é um dreno exponencial de ETH de contas de validadores offline. Isso permite que a rede eventualmente se cure sozinha ao queimar o ETH de validadores inativos até que seu saldo atinja 16 ETH, ponto em que eles serão ejetados automaticamente do pool de validadores. Os validadores online restantes eventualmente compreenderão mais de 2/3 da rede novamente, satisfazendo a supermaioria necessária para finalizar a cadeia mais uma vez.
</ExpandableCard>

<ExpandableCard title="Como garanto que não serei penalizado?">
Resumindo, isso nunca pode ser totalmente garantido, mas se você agir de boa fé, executar um cliente minoritário e mantiver suas chaves de assinatura em apenas uma máquina por vez, o risco de ser penalizado é quase zero.

Existem apenas algumas maneiras específicas que podem resultar em um validador sendo penalizado e ejetado da rede. No momento em que este artigo foi escrito, as penalizações que ocorreram foram exclusivamente um produto de configurações de hardware redundantes, onde as chaves de assinatura são armazenadas em duas máquinas separadas ao mesmo tempo. Isso pode resultar inadvertidamente em um <em>voto duplo</em> de suas chaves, o que é uma ofensa passível de penalização.

A execução de um cliente de supermaioria (qualquer cliente usado por mais de 2/3 da rede) também traz o risco de penalização potencial no caso de esse cliente ter um bug que resulte em uma bifurcação da cadeia. Isso pode resultar em uma bifurcação defeituosa que é finalizada. Para corrigir de volta para a cadeia pretendida, seria necessário enviar um <em>voto de cerco (surround vote)</em> tentando desfazer um bloco finalizado. Esta também é uma ofensa passível de penalização e pode ser evitada simplesmente executando um cliente minoritário.

Bugs equivalentes em um <em>cliente minoritário nunca seriam finalizados</em> e, portanto, nunca resultariam em um voto de cerco, e simplesmente resultariam em penalidades de inatividade, <em>não em penalização</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Saiba mais sobre a importância de executar um cliente minoritário.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Saiba mais sobre a prevenção de penalização</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Qual cliente é o melhor?">
Os clientes individuais podem variar um pouco em termos de desempenho e interface de usuário, pois cada um é desenvolvido por equipes diferentes usando uma variedade de linguagens de programação. Dito isso, nenhum deles é o "melhor". Todos os clientes de produção são excelentes softwares, que executam as mesmas funções principais para sincronização e interação com a blockchain.

Como todos os clientes de produção fornecem a mesma funcionalidade básica, na verdade é muito importante que você escolha um <strong>cliente minoritário</strong>, ou seja, qualquer cliente que NÃO esteja sendo usado atualmente pela maioria dos validadores na rede. Isso pode parecer contra-intuitivo, mas executar um cliente de maioria ou supermaioria coloca você em um risco maior de penalização no caso de um bug nesse cliente. A execução de um cliente minoritário limita drasticamente esses riscos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Saiba mais sobre por que a diversidade de clientes é fundamental</a>
</ExpandableCard>

<ExpandableCard title="Posso usar apenas um VPS (servidor virtual privado)?">
Embora um servidor virtual privado (VPS) possa ser usado como substituto do hardware doméstico, o acesso físico e a localização do seu cliente validador <em>são importantes</em>. Soluções de nuvem centralizadas, como Amazon Web Services ou Digital Ocean, permitem a conveniência de não ter que obter e operar hardware, às custas da centralização da rede.

Quanto mais clientes validadores executando em uma única solução de armazenamento em nuvem centralizada, mais perigoso se torna para esses usuários. Qualquer evento que deixe esses provedores offline, seja por um ataque, demandas regulatórias ou apenas quedas de energia/internet, resultará em todos os clientes validadores que dependem desse servidor ficarem offline ao mesmo tempo.

As penalidades offline são proporcionais a quantos outros estão offline ao mesmo tempo. O uso de um VPS aumenta muito o risco de que as penalidades offline sejam mais severas e aumenta o risco de vazamento quadrático ou penalização caso a interrupção seja grande o suficiente. Para minimizar seu próprio risco e o risco para a rede, os usuários são fortemente encorajados a obter e operar seu próprio hardware.
</ExpandableCard>

<ExpandableCard title="Como desbloqueio minhas recompensas ou recupero meu ETH?">

Saques de qualquer tipo da Beacon Chain exigem que as credenciais de saque sejam definidas.

Novos stakers definem isso no momento da geração da chave e do depósito. Os stakers existentes que ainda não definiram isso podem atualizar suas chaves para oferecer suporte a essa funcionalidade.

Depois que as credenciais de saque forem definidas, os pagamentos de recompensa (ETH acumulado sobre os 32 iniciais) serão distribuídos periodicamente para o endereço de saque de forma automática.

Para desbloquear e receber todo o seu saldo de volta, você também deve concluir o processo de saída do seu validador.

<ButtonLink href="/staking/withdrawals/">Mais sobre saques de staking</ButtonLink>
</ButtonLink>

## Leitura adicional {#further-reading}

- [O Diretório de Staking do Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [O Problema de Diversidade de Clientes do Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Ajudando a Diversidade de Clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidade de clientes na camada de consenso do Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Como: Comprar Hardware de Validador Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Dicas de Prevenção de Penalização no Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />