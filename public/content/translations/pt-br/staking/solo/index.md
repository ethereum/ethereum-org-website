---
title: Faça staking do seu ETH em casa
description: Uma visão geral de como começar a fazer staking do seu ETH em casa
lang: pt-br
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Receba recompensas máximas diretamente do protocolo por manter seu validador funcionando corretamente e online
  - Execute hardware em casa e contribua pessoalmente para a segurança e descentralização da rede Ethereum
  - Remova a necessidade de confiança e nunca abra mão do controle das chaves dos seus fundos
---

## O que é staking em casa? {#what-is-solo-staking}

Fazer staking em casa é o ato de [executar um nó Ethereum](/run-a-node/) conectado à internet e depositar pelo menos 32 ETH para ativar um [validador](#faq), dando a você a capacidade de participar diretamente do consenso da rede.

O staking em casa é a maneira mais direta de fazer staking. Nenhum contrato inteligente, operador ou custodiante fica entre você e o protocolo. Você mantém suas próprias chaves, participa ativamente da validação da rede [Ethereum](/) e recebe recompensas da rede diretamente. Todos os outros métodos de staking adicionam camadas de tecnologia, middleware ou serviços sobre essa atividade principal da rede.

**O staking em casa aumenta a descentralização da rede Ethereum**, tornando o Ethereum mais resistente à censura e robusto contra ataques. Outros métodos de staking podem não ajudar a rede da mesma forma. O staking em casa é a melhor opção de staking para proteger o Ethereum.

Um nó Ethereum consiste em um cliente da camada de execução (EL), bem como um cliente da camada de consenso (CL). Esses clientes são softwares que trabalham juntos, juntamente com um conjunto válido de chaves de assinatura, para verificar transações e blocos, atestar a ponta correta da cadeia, agregar atestações e propor blocos.

Os stakers em casa são responsáveis por operar o hardware necessário para executar esses clientes. É altamente recomendável usar uma máquina dedicada para isso que você opere de casa – isso é extremamente benéfico para a saúde da rede.

Um staker em casa recebe recompensas diretamente do protocolo por manter seu validador funcionando corretamente e online.

## Por que fazer staking de casa? {#why-stake-solo}

O staking em casa traz mais responsabilidade, mas fornece a você o controle máximo sobre seus fundos e configuração de staking.

<Grid>
  <Card title="Keep all rewards" icon={<HandCoins />} description="Os stakers em casa recebem 100% das recompensas do protocolo, pagas diretamente pelo protocolo enquanto o seu validador estiver online." />
  <Card title="Soberania própria" icon={<KeyRound />} description="Mantenha suas próprias chaves e a custódia total de seus fundos em todos os momentos. Escolha a combinação de clientes e hardware que permite minimizar seu risco. Nenhum terceiro pode tomar essas decisões por você ou restringir seus saques." />
  <Card title="Client and geographic diversity" icon={<GlobeLock />} description="Stakers em casa executando clientes minoritários em hardware espalhado por muitos locais fortalecem a descentralização e a segurança da rede." />
</Grid>

## Considerações antes de fazer staking em casa {#considerations-before-staking-solo}

Por mais que desejássemos que o staking em casa fosse acessível e livre de riscos para todos, essa não é a realidade. Existem algumas considerações práticas e sérias a serem lembradas antes de escolher fazer staking do seu ETH em casa.

<ExpandableCard title="Leitura obrigatória" eventCategory="SoloStaking" eventName="clicked required reading">
Ao operar seu próprio nó, você deve passar algum tempo aprendendo a usar o software que escolheu. Isso envolve a leitura da documentação relevante e estar atento aos canais de comunicação dessas equipes de desenvolvimento.

Quanto mais você entender sobre o software que está executando e como a Prova de Participação (PoS) funciona, menos arriscado será como um staker e mais fácil será corrigir quaisquer problemas que possam surgir ao longo do caminho como um operador de nó.
</ExpandableCard>

<ExpandableCard title="Familiaridade com computadores" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
A configuração do nó exige um nível razoável de conforto ao trabalhar com computadores, embora novas ferramentas estejam tornando isso mais fácil com o tempo. A compreensão da interface de linha de comando é útil, mas não é mais estritamente necessária.

Também exige uma configuração de hardware muito básica e alguma compreensão das especificações mínimas recomendadas.
</ExpandableCard>

<ExpandableCard title="Requisitos de hardware" eventCategory="SoloStaking" eventName="clicked hardware requirements">
A orientação atual da comunidade para hardware e largura de banda do validador é mantida nas [recomendações de hardware e largura de banda (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). Como um guia geral, planeje um SSD NVMe de 4 TB, 64 GB de RAM (menos pode funcionar, mas esta é a margem recomendada), uma CPU multi-core moderna e sólida e uma conexão de internet de cerca de 50 Mbps de download / 25 Mbps de upload.

Como a atualização Fusaka introduziu o PeerDAS, um nó de staking só precisa armazenar e baixar uma fração dos dados de blob da rede, reduzindo significativamente os requisitos de disco e largura de banda para stakers em casa.
</ExpandableCard>

<ExpandableCard title="Gerenciamento seguro de chaves" eventCategory="SoloStaking" eventName="clicked secure key management">
Assim como as chaves privadas protegem seu endereço Ethereum, você precisará gerar chaves especificamente para o seu validador. Você deve entender como manter quaisquer frases semente ou chaves privadas seguras e protegidas.{' '}

[Segurança do Ethereum e prevenção de golpes](/security/)
</ExpandableCard>

<ExpandableCard title="Manutenção" eventCategory="SoloStaking" eventName="clicked maintenance">
Ocasionalmente, o hardware falha, as conexões de rede apresentam erros e o software do cliente ocasionalmente precisa de atualização. A manutenção do nó é inevitável e ocasionalmente exigirá sua atenção. Você vai querer ter certeza de estar ciente de quaisquer atualizações de rede antecipadas ou outras atualizações críticas de clientes.
</ExpandableCard>

<ExpandableCard title="Tempo de atividade confiável" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Suas recompensas são proporcionais ao tempo que seu validador está online e atestando corretamente. O tempo de inatividade incorre em penalidades proporcionais a quantos outros validadores estão offline ao mesmo tempo, mas [não resulta em slashing](#faq). A largura de banda também é importante, pois as recompensas são diminuídas para atestações que não são recebidas a tempo. Os requisitos variam, mas as atuais [recomendações de hardware e largura de banda (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) sugerem cerca de 50 Mbps de download e 25 Mbps de upload.
</ExpandableCard>

<ExpandableCard title="Risco de penalização" eventCategory="SoloStaking" eventName="clicked slashing risk">
Diferente das penalidades de inatividade por estar offline, o <em>slashing</em> (penalização) é uma penalidade muito mais séria reservada para ofensas maliciosas. Ao executar um cliente minoritário com suas chaves carregadas em apenas uma máquina por vez, seu risco de sofrer slashing é minimizado. Dito isso, todos os stakers devem estar cientes dos riscos de slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mais sobre slashing e o ciclo de vida do validador</a>
</ExpandableCard>

## Comparação de opções de staking {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Como funciona {#how-it-works}

<StakingHowSoloWorks />

Assim que o seu nó estiver sincronizado e suas chaves forem geradas, você deposita o seu stake para ativar o seu validador. Um único validador exige um mínimo de 32 ETH e pode conter até 2048 ETH. A rede reconhece os depósitos em cerca de 13 minutos, mas os novos validadores passam por uma fila de ativação antes de começarem a atestar; sua duração varia de acordo com a demanda.

Enquanto estiver ativo, você ganhará recompensas em ETH. Com credenciais de saque de composição (0x02), as recompensas são adicionadas ao seu stake automaticamente; com credenciais de saques regulares (0x01), as recompensas acima dos 32 ETH iniciais são periodicamente varridas para o seu endereço de saque.

Se desejar, você pode solicitar a saída como um validador, o que elimina a exigência de estar online e interrompe quaisquer recompensas adicionais. Seu saldo restante será então sacado para o endereço de saque que você designar durante a configuração. As saídas podem ser iniciadas com as chaves de assinatura do seu validador ou acionadas diretamente do seu endereço de saque com uma transação da camada de execução, de modo que o controle final de seus fundos sempre permaneça com seu endereço de saque.

### Composição e o máximo de 2048 ETH {#compounding}

Os validadores têm um de dois tipos de credenciais de saque:

- **Saques regulares (0x01)**: o saldo efetivo do validador é limitado a 32 ETH, e qualquer saldo acima disso é automaticamente varrido para o seu endereço de saque a cada poucos dias.
- **Composição (0x02)**: o saldo efetivo do validador pode crescer até 2048 ETH. As recompensas são compostas automaticamente, e você ganha recompensas sobre cada ETH inteiro acima do mínimo de 32 ETH, para que você possa fazer stake de quantias flexíveis como 40 ETH, não apenas múltiplos de 32. Apenas o saldo acima de 2048 ETH é varrido automaticamente; sacar qualquer outra coisa significa acionar manualmente um saque parcial do seu endereço de saque, o que custa gás.

Se você executar vários validadores, poderá consolidá-los em um único validador de composição sem sair e entrar novamente na rede, reduzindo sua sobrecarga de manutenção. A consolidação é solicitada a partir do seu endereço de saque e está sujeita a filas de processamento. Mudar um validador de credenciais 0x01 para 0x02 usa esse mesmo mecanismo e **não pode ser revertido** sem sair totalmente e depositar novamente.

[Mais sobre saques de staking](/staking/withdrawals/)

## Comece no Staking Launchpad {#get-started-on-the-staking-launchpad}

O Staking Launchpad é um aplicativo de código aberto que o ajudará a se tornar um staker. Ele o guiará na escolha de seus clientes, na geração de suas chaves e no depósito de seu ETH no contrato de depósito de staking. Uma lista de verificação é fornecida para garantir que você cobriu tudo para configurar seu validador com segurança.

<StakingLaunchpadWidget />

## O que considerar com as ferramentas de configuração de nó e cliente {#node-tool-considerations}

Há um número crescente de ferramentas e serviços para ajudá-lo a fazer staking do seu ETH em casa, mas cada um vem com diferentes riscos e benefícios.

Indicadores de atributos são usados abaixo para sinalizar pontos fortes ou fracos notáveis que uma ferramenta de staking listada pode ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe quais ferramentas ajudarão em sua jornada de staking.

<StakingConsiderations page="solo" />

## Explore as ferramentas de configuração de nó e cliente {#node-and-client-tools}

Há uma variedade de opções disponíveis para ajudá-lo com sua configuração. Use os indicadores acima para ajudar a guiá-lo pelas ferramentas abaixo.

<ProductDisclaimer />

### Ferramentas de nó {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Observe a importância de escolher um [cliente minoritário](/developers/docs/nodes-and-clients/client-diversity/), pois isso melhora a segurança da rede e limita seu risco. As ferramentas que permitem configurar um cliente minoritário são indicadas como <em style={{ textTransform: "uppercase" }}>"multi-client" (multicliente).</em>

### Geradores de chaves {#key-generators}

Essas ferramentas podem ser usadas como uma alternativa à [CLI de depósito de staking](https://github.com/ethereum/staking-deposit-cli/) para ajudar na geração de chaves.

<StakingProductsCardGrid category="keyGen" />

Tem uma sugestão de uma ferramenta de staking que deixamos passar? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se ela se encaixaria bem e para enviá-la para análise.

## Explore os guias de staking em casa {#staking-guides}

<StakingGuides />

## Squad staking: staking em casa com tolerância a falhas {#squad-staking}

A **tecnologia de validador distribuído (DVT)** permite que um único validador seja executado em um cluster de máquinas em vez de apenas uma. A chave do validador é dividida em partes usando a geração de chaves distribuídas, e um limite do cluster (por exemplo, quaisquer 3 de 4 nós) deve assinar em conjunto; a chave completa nunca existe em nenhuma máquina única. Se uma máquina falhar, ficar offline ou for configurada incorretamente, o restante do cluster manterá o validador atestando.

Para stakers em casa, isso permite o "squad staking" (staking em esquadrão): juntar-se a amigos ou outros membros da comunidade para executar validadores juntos, removendo os pontos únicos de falha de uma configuração solo e reduzindo o risco de slashing de uma única máquina com mau comportamento. Obol e SSV Network fornecem implementações de DVT em produção, usadas hoje em staking em casa, staking como serviço e pools de staking.

[Mais sobre a tecnologia de validador distribuído](/staking/dvt/)

## Execute validadores para um protocolo de staking {#run-validators-for-a-staking-protocol}

Se você tem o hardware e as habilidades para executar um nó, mas menos de 32 ETH, alguns protocolos de staking combinarão seu validador com ETH de seus stakers em pool. Você deposita um título menor como colateral e executa o validador em sua própria máquina; o protocolo fornece o restante do stake e você ganha uma parte das recompensas.

Esta é uma abordagem híbrida: você mantém as responsabilidades (e a satisfação) de operar seu próprio hardware, mas seu validador opera sob os contratos inteligentes, governança e regras de desempenho do protocolo, o que é um perfil de confiança diferente de fazer staking do seu próprio ETH diretamente.

Saiba mais sobre como esses protocolos funcionam, incluindo suas premissas de confiança e mecânica de token, na [página de staking em pool](/staking/pools/).

## Mais maneiras de usar o seu nó {#more-ways-to-use-your-node}

Você não precisa fazer staking para colocar as habilidades de operação de nó em prática. Qualquer pessoa pode [executar um nó Ethereum](/run-a-node/) sem depositar nenhum ETH. Você obtém uma visão autoverificada da cadeia, seu próprio endpoint privado para enviar transações e interagir com aplicativos, e contribui para a saúde e resiliência da rede. Executar um nó também é uma boa maneira de ganhar experiência antes de ativar um validador, sem nenhum ETH em risco.

<StakingCommunityCallout className="my-16" />

## Perguntas frequentes {#faq}

Estas são algumas das perguntas mais comuns sobre staking que vale a pena conhecer.

<ExpandableCard title="O que é um validador?">

Um <em>validador</em> é uma entidade virtual que vive no Ethereum e participa do consenso do protocolo Ethereum. Os validadores são representados por um saldo, chave pública e outras propriedades. Um <em>cliente validador</em> é o software que atua em nome do validador, mantendo e usando sua chave privada. Um único cliente validador pode conter muitos pares de chaves, controlando muitos validadores.

</ExpandableCard>

<ExpandableCard title="Posso depositar mais de 32 ETH?">
Sim. Um validador com credenciais de saque de _composição_ (0x02) pode manter um saldo efetivo de até 2048 ETH, enquanto o mínimo para ativar permanece 32 ETH. As recompensas em um validador de composição são adicionadas ao seu stake automaticamente, e ele ganha recompensas sobre cada ETH inteiro acima do mínimo de 32 ETH, para que você possa fazer stake de quantias que não são múltiplos de 32. Consulte [Composição e o máximo de 2048 ETH](#compounding).

Validadores com credenciais de _saques regulares_ (0x01) permanecem limitados a um saldo efetivo de 32 ETH, com qualquer saldo acima disso varrido automaticamente para o endereço de saque a cada poucos dias.

Para um validador de composição, apenas o saldo acima do máximo de 2048 ETH é varrido automaticamente. Para sacar qualquer coisa abaixo disso, você aciona um saque parcial do seu endereço de saque (uma transação que custa gás), que pode retirar qualquer saldo acima do mínimo de 32 ETH. Se você executar vários validadores, também poderá consolidá-los em um único validador de composição sem sair da rede.

[Mais sobre saques de staking](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Serei penalizado se ficar offline? (tldr: Não.)">
Ficar offline quando a rede está finalizando corretamente NÃO resultará em slashing. Pequenas <em>penalidades de inatividade</em> são incorridas se o seu validador não estiver disponível para atestar em uma determinada época (cada uma com 6,4 minutos de duração), mas isso é muito diferente de <em>slashing</em>. Essas penalidades são um pouco menores do que a recompensa que você teria ganho se o validador estivesse disponível para atestar, e as perdas podem ser recuperadas com aproximadamente a mesma quantidade de tempo de volta online.

Observe que as penalidades por inatividade são proporcionais a quantos validadores estão offline ao mesmo tempo. Nos casos em que uma grande parte da rede está toda offline de uma vez, as penalidades para cada um desses validadores serão maiores do que quando um único validador está indisponível.

Em casos extremos, se a rede parar de finalizar como resultado de mais de um terço dos validadores estarem offline, esses usuários sofrerão o que é conhecido como um <em>vazamento por inatividade quadrático</em>, que é um dreno exponencial de ETH de contas de validadores offline. Isso permite que a rede eventualmente se cure sozinha ao queimar o ETH de validadores inativos até que seu saldo atinja 16 ETH, ponto em que eles serão ejetados automaticamente do pool de validadores. Os validadores online restantes eventualmente compreenderão mais de 2/3 da rede novamente, satisfazendo a supermaioria necessária para finalizar a cadeia mais uma vez.
</ExpandableCard>

<ExpandableCard title="Como garanto que não serei penalizado?">
Resumindo, isso nunca pode ser totalmente garantido, mas se você agir de boa fé, executar um cliente minoritário e mantiver suas chaves de assinatura em apenas uma máquina por vez, o risco de sofrer slashing é quase zero.

Existem apenas algumas maneiras específicas que podem resultar em um validador sofrendo slashing e sendo ejetado da rede. No momento em que este artigo foi escrito, os slashings que ocorreram foram exclusivamente um produto de configurações de hardware redundantes, onde as chaves de assinatura são armazenadas em duas máquinas separadas ao mesmo tempo. Isso pode resultar inadvertidamente em um <em>voto duplo</em> de suas chaves, o que é uma ofensa passível de slashing.

A execução de um cliente de supermaioria (qualquer cliente usado por mais de 2/3 da rede) também apresenta o risco de um possível slashing no caso de esse cliente ter um bug que resulte em uma bifurcação da cadeia. Isso pode resultar em uma bifurcação defeituosa que é finalizada. Para corrigir de volta para a cadeia pretendida, seria necessário enviar um <em>voto de cerco (surround vote)</em> tentando desfazer um bloco finalizado. Esta também é uma ofensa passível de slashing e pode ser evitada simplesmente executando um cliente minoritário.

Bugs equivalentes em um <em>cliente minoritário nunca seriam finalizados</em> e, portanto, nunca resultariam em um voto de cerco, e simplesmente resultariam em penalidades de inatividade, <em>não em slashing</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Saiba mais sobre a importância de executar um cliente minoritário.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Saiba mais sobre recompensas, penalidades e slashing</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Qual é o melhor cliente?">
Os clientes individuais podem variar ligeiramente em termos de desempenho e interface de usuário, pois cada um é desenvolvido por equipes diferentes usando uma variedade de linguagens de programação. Dito isso, nenhum deles é o "melhor". Todos os clientes de produção são excelentes softwares, que executam as mesmas funções principais para sincronização e interação com a blockchain.

Como todos os clientes de produção fornecem a mesma funcionalidade básica, é muito importante que você escolha um <strong>cliente minoritário</strong>, ou seja, qualquer cliente que NÃO esteja sendo usado atualmente pela maioria dos validadores na rede. Isso pode parecer contra-intuitivo, mas executar um cliente de maioria ou supermaioria coloca você em um risco maior de slashing no caso de um bug nesse cliente. A execução de um cliente minoritário limita drasticamente esses riscos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Saiba mais sobre por que a diversidade de clientes é fundamental</a>
</ExpandableCard>

<ExpandableCard title="Posso simplesmente usar um VPS (servidor virtual privado)?">
Embora um servidor virtual privado (VPS) possa ser usado como substituto do hardware doméstico, o acesso físico e a localização do seu cliente validador <em>são importantes</em>. Soluções de nuvem centralizadas, como Amazon Web Services ou Digital Ocean, permitem a conveniência de não ter que obter e operar hardware, às custas da centralização da rede.

Quanto mais clientes validadores executados em uma única solução de armazenamento em nuvem centralizada, mais perigoso se torna para esses usuários. Qualquer evento que deixe esses provedores offline, seja por um ataque, demandas regulatórias ou apenas quedas de energia/internet, resultará em todos os clientes validadores que dependem deste servidor ficarem offline ao mesmo tempo.

As penalidades offline são proporcionais a quantos outros estão offline ao mesmo tempo. O uso de um VPS aumenta muito o risco de que as penalidades offline sejam mais severas e aumenta o risco de vazamento quadrático ou slashing no caso de a interrupção ser grande o suficiente. Para minimizar seu próprio risco e o risco para a rede, os usuários são fortemente encorajados a obter e operar seu próprio hardware.
</ExpandableCard>

<ExpandableCard title="Como desbloqueio minhas recompensas ou recebo meu ETH de volta?">

Todo saque exige que o seu validador tenha um endereço de saque definido. Novos stakers definem isso no momento da geração da chave e do depósito. Os stakers dos primeiros dias da rede que ainda não definiram um endereço de saque precisarão atualizar suas credenciais de saque antes de sacar.

Para validadores com credenciais de saques regulares (0x01), os pagamentos de recompensas (ETH acumulado sobre os 32 iniciais) são distribuídos periodicamente para o endereço de saque automaticamente. Para validadores de composição (0x02), as recompensas permanecem em stake e são compostas automaticamente. Você pode sacar qualquer saldo acima de 32 ETH acionando um saque parcial do seu endereço de saque.

Para desbloquear e receber todo o seu saldo de volta, você deve solicitar a saída do seu validador. Você pode fazer isso usando as chaves de assinatura do seu validador ou acioná-lo diretamente do seu endereço de saque com uma transação da camada de execução, o que significa que seus fundos permanecem recuperáveis mesmo se suas chaves de assinatura forem perdidas.

<ButtonLink href="/staking/withdrawals/">Mais sobre saques de staking</ButtonLink>
</ButtonLink>

## Leitura adicional {#further-reading}

- [Estatísticas de diversidade de clientes e guias de migração](https://clientdiversity.org/)
- [Ajudando a diversidade de clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidade de clientes na camada de consenso do Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Como fazer: comprar hardware de validador Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Recomendações de hardware e largura de banda](https://eips.ethereum.org/EIPS/eip-7870)
- [A atualização Pectra: saldo efetivo máximo e mais](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />