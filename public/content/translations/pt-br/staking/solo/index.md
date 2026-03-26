---
title: "Faça staking com seu ETH"
description: "Uma visão geral de como começar a fazer staking individual com seu ETH"
lang: pt-br
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "Leslie, o rinoceronte, em seu próprio chip de computador"
sidebarDepth: 2
summaryPoints:
  - Receba recompensas máximas diretamente do protocolo para manter seu validador funcionando corretamente e on-line
  - Execute o hardware local e adicione pessoalmente à segurança e descentralização da rede Ethereum
  - Remova a confiança e nunca desista do controle das chaves dos seus fundos
---

## O que é staking individual? {#what-is-solo-staking}

O staking individual é o ato de [executar um nó Ethereum](/run-a-node/) conectado à internet e depositar 32 ETH para ativar um [validador](#faq), o que lhe dá a capacidade de participar diretamente do consenso da rede.

**O staking individual aumenta a descentralização da rede Ethereum**, tornando o Ethereum mais resistente à censura e robusto contra ataques. Outros métodos de staking podem não ajudar a rede da mesma forma. O staking individual é a melhor opção de staking para proteger o Ethereum.

Um nó Ethereum consiste em um cliente da camada de execução (EL), bem como um cliente da camada de consenso (CL). Esses clientes são softwares que trabalham juntos, juntamente com um conjunto válido de chaves de assinatura, para verificar transações e blocos, atestar o cabeçalho correto da cadeia, agregar atestados e propor blocos.

Os stakers individuais são responsáveis por operar o hardware necessário para executar esses clientes. É altamente recomendável usar uma máquina dedicada para isso que você opera em casa – isso é extremamente benéfico para a saúde da rede.

Um staker individual recebe recompensas diretamente do protocolo por manter seu validador funcionando corretamente e on-line.

## Por que fazer staking de casa? {#why-stake-solo}

O staking individual vem com mais responsabilidades, mas fornece o máximo de controle sobre seus fundos e configuração de participação.

<CardGrid>
  <Card title="Ganhe ETH" emoji="💸" description="Ganhe recompensas em ETH diretamente do protocolo quando seu validador estiver online, sem que intermediários fiquem com uma parte." />
  <Card title="Controle total" emoji="🎛️" description="Mantenha suas próprias chaves. Escolha a combinação de clientes e hardware que te permita minimizar seu risco e contribuir da melhor forma para a saúde e segurança da rede. Serviços de staking de terceiros tomam essas decisões por você, e nem sempre fazem as escolhas mais seguras." />
  <Card title="Segurança da rede" emoji="🔐" description="Fazer staking em casa é a maneira mais impactante de participar. Ao rodar um validador no seu próprio hardware, você fortalece a robustez, a descentralização e a segurança do protocolo Ethereum." />
</CardGrid>

## Considerações antes do staking individual {#considerations-before-staking-solo}

Por mais que desejemos que o staking individual seja acessível e sem riscos para todos, isso não é a realidade. Existem algumas considerações práticas e sérias a serem lembradas antes de optar por fazer staking individual de seu ETH.

<InfoGrid>
<ExpandableCard title="Leitura obrigatória" eventCategory="SoloStaking" eventName="clicked required reading">
Ao operar seu próprio nó, você deve gastar algum tempo aprendendo a usar o software que escolheu. Isso envolve ler a documentação relevante e estar em sintonia com os canais de comunicação dessas equipes de desenvolvimento.

Quanto mais você entender sobre o software que está executando e como a prova de participação (proof-of-stake) funciona, menos arriscado será como um staker e mais fácil será corrigir quaisquer problemas que possam surgir ao longo do caminho como um operador de nó.
</ExpandableCard>

<ExpandableCard title="À vontade com computadores" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
A configuração do nó requer um nível de conforto razoável ao trabalhar com computadores, embora novas ferramentas estejam tornando isso mais fácil com o tempo. A compreensão da interface de linha de comando é útil, mas não é mais estritamente necessária.

Também requer uma configuração de hardware muito básica e alguma compreensão das especificações mínimas recomendadas.
</ExpandableCard>

<ExpandableCard title="Gerenciamento seguro de chaves" eventCategory="SoloStaking" eventName="clicked secure key management">
Assim como as chaves privadas protegem seu endereço Ethereum, você precisará gerar chaves especificamente para seu validador. Você deve saber como manter todas as frases de recuperação ou chaves privadas seguras e protegidas. 

[Segurança e prevenção de golpes no Ethereum](/security/)
</ExpandableCard>

<ExpandableCard title="Manutenção" eventCategory="SoloStaking" eventName="clicked maintenance">
O hardware ocasionalmente falha, as conexões de rede apresentam erros e o software do cliente ocasionalmente precisa de atualização. A manutenção do nó é inevitável e ocasionalmente exigirá sua atenção. Você deve se certificar de que está ciente de quaisquer atualizações de rede previstas ou de outras atualizações críticas do cliente.
</ExpandableCard>

<ExpandableCard title="Uptime confiável" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Suas recompensas são proporcionais ao tempo que seu validador está on-line e atestando corretamente. O tempo de inatividade incorre em penalidades proporcionais a quantos outros validadores estão offline ao mesmo tempo, mas <a href="#faq">não resulta em corte</a>. A largura de banda também importa, pois as recompensas são diminuídas para atestações que não são recebidas a tempo. Os requisitos variam, mas é recomendado um mínimo de 10 Mb/s de upload e download.
</ExpandableCard>

<ExpandableCard title="Risco de corte" eventCategory="SoloStaking" eventName="clicked slashing risk">
Diferente das penalidades de inatividade por estar offline, o <em>corte</em> é uma penalidade muito mais séria reservada para infrações maliciosas. Ao executar um cliente minoritário com suas chaves carregadas em apenas uma máquina por vez, o risco de sofrer um corte é minimizado. Dito isso, todos os stakers devem estar cientes dos riscos de corte.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Mais sobre corte e o ciclo de vida do validador</a>
</ExpandableCard>

</InfoGrid>

<StakingComparison page="solo" />

## Como funciona {#how-it-works}

<StakingHowSoloWorks />

Enquanto ativo, você ganhará recompensas ETH, que serão depositadas periodicamente no seu endereço de saque.

Se desejar, você pode parar suas atividades como um validador, o que elimina a necessidade de estar on-line e interrompe outras recompensas. O seu saldo restante será então sacado para o endereço de saque que você designar durante a configuração.

[Mais em staking withdrawals](/staking/withdrawals/)

## Comece a usar o Staking Launchpad {#get-started-on-the-staking-launchpad}

O Staking Launchpad é um aplicativo de código aberto que o ajudará a se tornar um staker. Ele o guiará na escolha de seus clientes, na geração de suas chaves e no depósito de seu ETH no contrato de depósito de staking. Uma lista de verificação é fornecida para garantir que você cobriu tudo para configurar seu validador com segurança.

<StakingLaunchpadWidget />

## O que considerar com as ferramentas de configuração de nó e cliente {#node-tool-considerations}

Há um número crescente de ferramentas e serviços para ajudar você a fazer staking de seu ETH individualmente, mas cada um vem com diferentes riscos e benefícios.

Os indicadores de atributo são usados abaixo para sinalizar pontos fortes ou fracos notáveis que uma ferramenta de staking listada pode ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe quais ferramentas ajudarão em sua jornada de staking.

<StakingConsiderations page="solo" />

## Explore as ferramentas de configuração de nó e cliente {#node-and-client-tools}

Há uma variedade de opções disponíveis para ajudá-lo na sua configuração. Use os indicadores acima para guiá-lo pelas ferramentas abaixo.

<ProductDisclaimer />

### Ferramentas do nó

<StakingProductsCardGrid category="nodeTools" />

Observe a importância de escolher um [cliente minoritário](/developers/docs/nodes-and-clients/client-diversity/), pois isso melhora a segurança da rede e limita seu risco. As ferramentas que permitem configurar um cliente minoritário são indicadas como <em style={{ textTransform: "uppercase" }}>"multicliente."</em>

### Geradores de chaves

Essas ferramentas podem ser usadas como uma alternativa à [CLI de Depósito de Staking](https://github.com/ethereum/staking-deposit-cli/) para ajudar na geração de chaves.

<StakingProductsCardGrid category="keyGen" />

Alguma sugestão de ferramenta de participação que não mencionamos? Leia a nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se a sugestão é pertinente e para enviá-la para análise.

## Explore os guias de staking individual {#staking-guides}

<StakingGuides />

## Perguntas mais frequentes {#faq}

Apresentamos algumas das perguntas mais comuns sobre staking (participação) que vale a pena saber.

<ExpandableCard title="O que é um validador?">

Um <em>validador</em> é uma entidade virtual que vive no Ethereum e participa no consenso do protocolo Ethereum. Os validadores são representados por um saldo, chave pública e outras propriedades. Um <em>cliente validador</em> é o software que atua em nome do validador mantendo e usando sua chave privada. Um único cliente validador pode conter muitos pares de chaves, controlando muitos validadores.
</ExpandableCard>

<ExpandableCard title="Posso depositar mais de 32 ETH?">
Sim, as contas de validador modernas são capazes de armazenar até 2048 ETH. O ETH adicional acima de 32 será composto gradualmente, aumentando em incrementos de números inteiros conforme seu saldo real aumenta. Isso é conhecido como seu <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efetivo</a>.

Para aumentar o saldo efetivo de uma conta e, assim, aumentar as recompensas, um buffer de 0,25 ETH acima de qualquer limite de ETH total deve ser ultrapassado. Por exemplo, uma conta com um saldo real de 32,9 e um saldo efetivo de 32 precisaria ganhar mais 0,35 ETH para elevar seu saldo real acima de 33,25 antes de acionar um aumento no saldo efetivo.

Esse buffer também evita que o saldo efetivo caia até que ele fique 0,25 ETH abaixo do seu saldo efetivo atual.

Cada par de chaves associado a um validador requer ao menos 32 ETH para ser ativado. Qualquer saldo acima disso pode ser sacado para o endereço de saque associado a qualquer momento por meio de uma transação assinada por este endereço. Quaisquer fundos acima do saldo efetivo máximo serão automaticamente sacados periodicamente.

Se o staking individual parecer muito exigente para você, considere usar um provedor de [staking como serviço](/staking/saas/), ou se você estiver trabalhando com menos de 32 ETH, confira as [pools de staking](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Sofrerei um corte se ficar offline? (resumindo: não.)">
Ficar offline quando a rede está finalizando corretamente NÃO resultará em corte. Pequenas <em>penalidades por inatividade</em> são aplicadas se o seu validador não estiver disponível para atestar uma determinada época (cada uma com 6,4 minutos de duração), mas isso é muito diferente de um <em>corte</em>. Essas penalidades são um pouco menores do que a recompensa que você ganharia se o validador estivesse disponível para atestar, e as perdas podem ser recuperadas com aproximadamente a mesma quantidade de tempo novamente on-line.

Observe que as penalidades por inatividade são proporcionais a quantos validadores estão off-line ao mesmo tempo. Nos casos em que uma grande parte da rede estiver toda off-line ao mesmo tempo, as penalidades para cada um desses validadores serão maiores que quando um único validador estiver indisponível.

Em casos extremos, se a rede parar de finalizar como resultado de mais de um terço dos validadores estarem offline, esses usuários sofrerão o que é conhecido como um <em>vazamento de inatividade quadrática</em>, que é um dreno exponencial de ETH das contas de validadores offline. Isso permite que a rede se recupere eventualmente queimando o ETH de validadores inativos até que seu saldo atinja 16 ETH, momento em que eles serão automaticamente ejetados da pool de validadores. Os validadores on-line restantes acabarão por abranger mais de 2/3 da rede novamente, satisfazendo a supermaioria necessária para finalizar mais uma vez a cadeia.
</ExpandableCard>

<ExpandableCard title="Como evito sofrer um corte?">
Em suma, isso nunca pode ser totalmente garantido, mas se você agir de boa-fé, executar um cliente minoritário e manter suas chaves de assinatura em apenas uma máquina de cada vez, o risco de sofrer um corte é quase zero.

Existem apenas algumas maneiras específicas que podem resultar no corte e na expulsão de um validador da rede. No momento da redação deste texto, os cortes que ocorreram foram exclusivamente um produto de configurações de hardware redundantes onde as chaves de assinatura são armazenadas em duas máquinas separadas ao mesmo tempo. Isso pode resultar inadvertidamente em um <em>voto duplo</em> de suas chaves, o que é uma infração passível de corte.

A execução de um cliente supermajoritário (qualquer cliente usado por mais de 2/3 da rede) também apresenta o risco de corte potencial no caso de esse cliente ter um bug que resulte em uma bifurcação da cadeia. Isso pode resultar em uma bifurcação com falha que será finalizada. Para corrigir de volta para a cadeia pretendida, seria necessário enviar um <em>voto surround</em>, tentando desfazer um bloco finalizado. Essa também é uma infração passível de corte e pode ser evitada simplesmente executando um cliente minoritário.

Falhas equivalentes em um <em>cliente minoritário jamais seriam finalizadas</em>, portanto, nunca resultariam em um voto cercado, e simplesmente resultariam em penalidades de inatividade, <em>não em cortes</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Saiba mais sobre a importância de executar um cliente minoritário.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Saiba mais sobre a prevenção de cortes</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Qual cliente é o melhor?">
Os clientes individuais podem variar um pouco em desempenho e interface do usuário, pois cada um é desenvolvido por equipes diferentes usando uma variedade de linguagens de programação. Dito isso, nenhum deles é o "melhor". Todos os clientes de produção são softwares excelentes que executam as mesmas funções principais para sincronizar e interagir com a blockchain.

Como todos os clientes de produção fornecem a mesma funcionalidade básica, é muito importante que você escolha um <strong>cliente minoritário</strong>, ou seja, qualquer cliente que NÃO esteja sendo usado atualmente pela maioria dos validadores na rede. Isso pode parecer contraintuitivo, mas executar um cliente majoritário ou supermajoritário aumenta o risco de cortes no caso de uma falha nesse cliente. A execução de um cliente minoritário limita drasticamente esses riscos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Saiba mais sobre por que a diversidade de clientes é fundamental</a>
</ExpandableCard>

<ExpandableCard title="Posso usar apenas um VPS (servidor virtual privado)?">
Embora um servidor virtual privado (VPS) possa ser usado como substituto do hardware doméstico, o acesso físico e a localização do seu cliente validador <em>importam</em>. Soluções em nuvem centralizadas como Amazon Web Services ou Digital Ocean permitem a conveniência de não ter que obter e operar hardware, à custa da centralização da rede.

Quanto mais clientes validadores forem executados em uma única solução centralizada de armazenamento em nuvem, mais perigoso se torna para esses usuários. Qualquer evento que coloque esses provedores off-line, seja por um ataque, demandas regulatórias ou apenas quedas de energia/internet, fará com que todos os clientes validadores que dependem desse servidor fiquem off-line ao mesmo tempo.

As penalidades por ficar off-line são proporcionais a quantos outros estão off-line ao mesmo tempo. O uso de um VPS aumenta muito o risco de que as penalidades por ficar offline sejam mais severas e aumenta o risco de vazamento ou corte quadrático no caso de a interrupção ser grande o suficiente. Para minimizar seu próprio risco e o risco para a rede, os usuários são fortemente encorajados a obter e operar seu próprio hardware.
</ExpandableCard>

<ExpandableCard title="Como desbloqueio minhas recompensas ou recebo meu ETH de volta?">

Saques de qualquer tipo da Beacon Chain exigem que sejam definidas credenciais de retirada.

Novos stakers definem isso no momento da geração e do depósito da chave. Os stakers existentes que ainda não definiram isso podem atualizar suas chaves para dar suporte a essa funcionalidade.

Depois que as credenciais de saque estiverem definidas, os pagamentos de recompensa (ETH acumulado sobre os 32 iniciais) serão periodicamente distribuídos para o endereço de saque automaticamente.

Para desbloquear e receber todo o seu saldo de volta, você deve concluir o processo de saída de seu validador.

<ButtonLink href="/staking/withdrawals/">Mais sobre saques de participação</ButtonLink>
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O Diretório de Participação da Ethereum](https://www.staking.directory/) - _Eridian and Spacesider_
- [O problema da diversidade de clientes do Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Ajudando na diversidade de clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidade de clientes na camada de consenso do Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Como comprar hardware de validador Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Dicas de prevenção de corte do Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
