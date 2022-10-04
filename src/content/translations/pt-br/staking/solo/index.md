---
title: Faça staking indivual com seu ETH
description: Uma visão geral de como começar a fazer staking individual com seu ETH
lang: pt-br
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-solo.png
alt: Leslie, o rinoceronte, em seu próprio chip de computador
sidebarDepth: 2
summaryPoints:
  - Receba recompensas máximas diretamente do protocolo para manter seu validador funcionando corretamente e on-line
  - Execute o hardware local e adicione pessoalmente à segurança e descentralização da rede Ethereum
  - Remova a confiança e nunca desista do controle das chaves dos seus fundos
---

## O que é staking individual? {#what-is-solo-staking}

O staking individual é o ato de [executar um nó Ethereum](/run-a-node/) conectado à Internet e depositar 32 ETH para ativar um
validador, dando a você a capacidade de participar diretamente do consenso da rede.

Um nó Ethereum consiste em um cliente de camada de execução (EL) e em um cliente de camada de consenso (CL). Esses clientes são softwares que trabalham em conjunto, juntamente com um conjunto válido de chaves de assinatura, para verificar transações e blocos, atestar o bloco correto no topo da cadeia, agregar atestações e propor blocos.

Os stakers individuais são responsáveis por operar o hardware necessário para executar esses clientes. É altamente recomendável usar uma máquina dedicada para isso, que você opera em casa – isso é extremamente benéfico para a saúde da rede.

Um staker individual recebe recompensas diretamente do protocolo por manter seu validador funcionando corretamente e on-line.

## Por que fazer staking individual? {#why-stake-solo}

O staking individual vem com mais responsabilidades, mas oferece controle máximo sobre seus fundos e configurações de staking.

<CardGrid>
  <Card title="Ganhe mais ETH" emoji="💸">
    Ganhe recompensas denominadas em ETH diretamente do protocolo quando seu validador estiver on-line, sem que nenhum intermediário leve uma parte.
  </Card>
  <Card title="Controle total" emoji="🎛️">
    Guarde suas próprias chaves. Escolha a combinação de clientes e hardware que permite minimizar o risco e contribuir melhor para a integridade e a segurança da rede. Os serviços de staking de terceiros tomam essas decisões por você e nem sempre fazem as escolhas mais seguras.
  </Card>
  <Card title="Segurança de rede" emoji="🔐">
    O staking individual é a maneira mais impactante de fazer staking. Ao executar um validador em seu próprio hardware em casa, você fortalece a robustez, a descentralização e a segurança do protocolo Ethereum.
  </Card>
</CardGrid>

## Considerações antes de fazer staking individual {#considerations-before-staking-solo}

Por mais que desejemos que o staking individual fosse acessível e sem riscos para todos, isso não é a realidade. Existem algumas considerações práticas e sérias a serem lembradas antes de optar por fazer staking individual de seu ETH.

<InfoGrid>
  <ExpandableCard title="Leitura obrigatória" eventCategory="SoloStaking" eventName="clicked required reading">
    Ao operar seu próprio nó, você deve gastar algum tempo aprendendo a usar o software que escolheu. Isso envolve ler a documentação relevante e estar em sintonia com os canais de comunicação dessas equipes de desenvolvimento.
    Quanto mais você entender sobre o software que está executando e como funciona a prova de participação (proof of sake), menos arriscado será como um staker e mais fácil será corrigir quaisquer problemas que possam surgir ao longo do caminho como operador de nó. 
  </ExpandableCard>
  <ExpandableCard title="À vontade com computadores" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
    A configuração do nó requer um nível de conforto razoável ao trabalhar com computadores, embora novas ferramentas estejam tornando isso mais fácil com o tempo. A compreensão da interface de linha de comando é útil, mas não é mais estritamente necessária.
    Também requer uma configuração de hardware muito básica e alguma compreensão das especificações mínimas recomendadas.
  </ExpandableCard>
  <ExpandableCard title="Gerenciamento seguro de chaves" eventCategory="SoloStaking" eventName="clicked secure key management">
    Assim como as chaves privadas protegem seu endereço Ethereum, você precisará gerar chaves especificamente para seu validador. Você deve entender como manter quaisquer frases iniciais ou chaves privadas seguras e protegidas.
    <p style={{marginTop: "1rem"}}><a href="/security">Segurança e prevenção de fraude do Ethereum</a></p>
  </ExpandableCard>
  <ExpandableCard title="Sem saques (por enquanto)" eventCategory="SoloStaking" eventName="clicked no withdrawing">
    O saque de ETH ou recompensas em stake de um saldo de validador ainda não é suportada. O suporte para retiradas está planejado para a próxima atualização de Xangai. Você deve esperar que seu ETH será bloqueado por pelo menos um a dois anos. Após a atualização Xangai, você poderá retirar livremente partes ou todo o seu stake, se desejar.
  </ExpandableCard>
  <ExpandableCard title="Manutenção" eventCategory="SoloStaking" eventName="clicked maintenance">
    O hardware falha ocasionalmente, as conexões de rede falham e o software cliente ocasionalmente precisa ser atualizado. A manutenção do nó é inevitável e ocasionalmente exigirá sua atenção. Você deve estar ciente de quaisquer informações de atualizações de rede ou outras atualizações críticas de clientes.
  </ExpandableCard>
  <ExpandableCard title="Tempo de atividade confiável" eventCategory="SoloStaking" eventName="clicked reliable uptime">
    Suas recompensas são proporcionais ao tempo que seu validador está on-line e atestando corretamente. O tempo de inatividade incorre em penalidades proporcionais a quantos outros validadores estão off-line ao mesmo tempo, mas <a href="#faq">não resulta em cortes</a>. A largura de banda também é importante, pois as recompensas são reduzidas para declarações que não são recebidos a tempo. Os requisitos variam, mas é recomendado um mínimo de 10 Mb/s de upload e download.
  </ExpandableCard>
  <ExpandableCard title="Risco de corte" eventCategory="SoloStaking" eventName="clicked slashing risk">
    Diferente das penalidades de inatividade por estar off-line, <em>o corte</em> é uma penalidade muito mais séria reservada para infrações maliciosas. Ao executar um cliente minoritário com suas chaves carregadas em apenas uma máquina por vez, o risco de ser cortado é minimizado. Dito isto, todos os stakers devem estar cientes dos riscos de serem cortados.
    
    <p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Mais sobre cortes e ciclo de vida do validador</a></p>
  </ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Como funciona {#how-it-works}

<StakingHowSoloWorks />

Se desejar, você pode parar suas atividades como um validador, o que elimina a necessidade de estar on-line e interrompe outras recompensas. Esteja ciente que até a atualização Xangai que está planejada, não será possível _retirar_ esses fundos.

Após a atualização Xangai, os usuários poderão retirar suas recompensas, assim como seu stake, se assim o desejarem.

## Comece a usar o Staking Launchpad {#get-started-on-the-staking-launchpad}

O Staking Launchpad é um aplicativo de código aberto que o ajudará a se tornar um staker. Ele o guiará na escolha de seus clientes, gerará suas chaves e depositará seu ETH no contrato de depósito de staking. Uma lista de verificação é fornecida para garantir que você cobriu tudo para configurar seu validador com segurança.

<StakingLaunchpadWidget />

## O que considerar com ferramentas de configuração de nó e cliente {#node-tool-considerations}

Há um número crescente de ferramentas e serviços para ajudá-lo a fazer staking individualmente de seu ETH, mas cada um vem com diferentes riscos e benefícios.

Os indicadores de atributo são usados abaixo para sinalizar pontos fortes ou fracos notáveis que uma ferramenta de staking listada pode ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe quais ferramentas ajudarão em sua jornada de staking.

<StakingConsiderations page="solo" />

## Explore as ferramentas de configuração de nós e clientes {#node-and-client-tools}

Há uma variedade de opções disponíveis para ajudá-lo na sua configuração. Use os indicadores acima para guiá-lo pelas ferramentas abaixo.

<InfoBanner emoji="⚠️" isWarning>
Observe a importância de escolher um <a href="/developers/docs/nodes-and-clients/client-diversity/">cliente minoritário</a>, pois melhora a segurança da rede e limita seu risco. As ferramentas que permitem configurar o cliente minoritário são indicadas como <em style="text-transform: uppercase;">"multicliente."</em>
</InfoBanner>

#### Ferramentas do nó

<StakingProductsCardGrid category="nodeTools" />

#### Geradores de chaves

Essas ferramentas podem ser usadas como uma alternativa ao [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) para ajudar na geração de chaves.

<StakingProductsCardGrid category="keyGen" />

Alguma sugestão de ferramenta de staking que não mencionamos? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se a sugestão é pertinente, e envie-a para análise.

## Explore os guias de staking individual {#staking-guides}

<StakingGuides />

## Perguntas frequentes {#faq}

Estas são algumas das perguntas mais comuns sobre staking que vale a pena conhecer.

<ExpandableCard title="O que é um validador?">

Um _validador_ é uma entidade virtual que vive no Ethereum e participa do consenso do protocolo Ethereum. Os validadores são representados por um saldo, chave pública e outras propriedades. Um _cliente validador_ é o software que atua em nome do validador mantendo e usando sua chave privada. Um único cliente validador pode conter muitos pares de chaves, controlando muitos validadores.

</ExpandableCard>

<ExpandableCard title="Posso depositar mais de 32 ETH?">
Cada par de chaves associado a um validador requer exatamente 32 ETH para ser ativado. Mais ETH depositado em um único conjunto de chaves não aumenta o potencial de recompensas, pois cada validador está limitado a um <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efetivo</a> de 32 ETH. Isso significa que o staking é feito em 32 incrementos de ETH, cada um com seu próprio conjunto de chaves e saldo.

Não deposite mais de 32 ETH para um único validador. Este depósito não aumentará suas recompensas e ficará bloqueado até a atualização Xangai já planejada.

Se o staking individual demandar muito de você, considere usar um provedor de <a href="/staking/saas/">staking-as-a-service</a> (staking como um serviço) ou, se estiver trabalhando com menos de 32 ETH, verifique as <a href="/staking/pools/">staking pools</a> (pools de staking).
</ExpandableCard>

<ExpandableCard title="Serei cortado se ficar off-line? (Para resumir: Não.)">
Ficar off-line quando a rede estiver finalizando corretamente NÃO resultará em cortes. Pequenas <em>penalidades por inatividade</em> são incorridas se o seu validador não estiver disponível para atestar determinado período (cada um com 6,4 minutos de duração), mas isso é muito diferente de um <em>corte</em>. Essas penalidades são um pouco menores do que a recompensa que você ganharia se o validador estivesse disponível para atestar, e as perdas podem ser recuperadas com aproximadamente a mesma quantidade de tempo novamente on-line.

Observe que as penalidades por inatividade são proporcionais a quantos validadores estão off-line ao mesmo tempo. Nos casos em que uma grande parte da rede estiver toda off-line ao mesmo tempo, as penalidades para cada um desses validadores serão maiores que quando um único validador estiver indisponível.

Em casos extremos, se a rede parar de finalizar como resultado de mais de um terço dos validadores estarem off-line, esses usuários sofrerão o sendo conhecido como <em>vazamento de inatividade quadrática</em>, sendo um dreno exponencial de ETH de contas de validador off-line. Isso permite que a rede se recupere eventualmente queimando o ETH de validadores inativos até que seu saldo atinja 16 ETH, momento em que eles serão automaticamente ejetados da pool de validadores. Os validadores on-line restantes acabarão por abranger mais de 2/3 da rede novamente, satisfazendo a maioria qualificada necessária para finalizar mais uma vez a cadeia.
</ExpandableCard>

<ExpandableCard title="Como posso garantir que não serei cortado?">
Em resumo, isso nunca pode ser totalmente garantido, mas se você agir de boa-fé, executar um cliente minoritário e manter suas chaves de assinatura em apenas uma máquina por vez, o risco de ser cortado é quase zero.

Existem apenas algumas maneiras específicas que podem resultar em um corte e expulsão de um validador da rede. No momento da redação deste texto, os cortes que ocorreram foram exclusivamente um produto de configurações de hardware redundantes onde as chaves de assinatura são armazenadas em duas máquinas separadas ao mesmo tempo. Isso pode resultar inadvertidamente em um <em>voto duplo</em> de suas chaves, o que é uma infração passível de corte.

A execução de um cliente supermajoritário (qualquer cliente usado por mais de 2/3 da rede) também apresenta o risco de cortes em potencial caso esse cliente tenha uma falha que resulte em uma bifurcação da cadeia. Isso pode resultar em uma bifurcação com falha que será finalizada. Para corrigir de volta para a cadeia pretendida, seria necessário enviar um <em>voto cercado (surround vote)</em>, na tentativa de desfazer um bloco finalizado. Essa também é uma infração que pode incorrer em um corte e pode ser evitada simplesmente por executar um cliente minoritário.

Falhas equivalentes em um <em>cliente minoritário jamais seriam finalizadas</em>, portanto, nunca resultariam em um voto cercado, e simplesmente resultariam em penalidades de inatividade, <em>não em cortes</em>.

<p><a href="https://hackernoon.com/ethereums-client-diversity-problem">Saiba mais sobre a importância de administrar um cliente minoritário.</a></p>
<p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Saiba mais sobre a prevenção de cortes</a></p>
</ExpandableCard>

<ExpandableCard title="Qual cliente é melhor?">
Os clientes individuais podem variar um pouco em desempenho e interface do usuário, pois cada um é desenvolvido por equipes diferentes usando uma variedade de linguagens de programação. Assim sendo, nenhum deles é "melhor". Todos os clientes de implantação são excelentes softwares, que executam as mesmas funções principais para sincronizar e interagir com o blockchain.

Como todos os clientes de implantação fornecem a mesma funcionalidade básica, é muito importante que você escolha um <strong>cliente minoritário</strong>, ou seja, qualquer cliente que NÃO esteja sendo usado pela maioria dos validadores na rede. Isso pode parecer contraintuitivo, mas executar um cliente majoritário ou supermajoritário aumenta o risco de cortes no caso de uma falha nesse cliente. A execução de um cliente minoritário limita drasticamente esses riscos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Saiba mais sobre a razão de a diversidade de clientes ser fundamental</a>
</ExpandableCard>

<ExpandableCard title="Posso usar apenas um VPS (servidor privado virtual)?">
Embora um servidor virtual privado (VPS) possa ser usado como substituto do hardware doméstico, o acesso físico e a localização do seu cliente validador <em>importam</em>. Soluções em nuvem centralizadas como Amazon Web Services ou Digital Ocean permitem a conveniência de não ter que obter e operar hardware, à custa da centralização da rede.

Quanto mais clientes validadores forem executados em uma única solução centralizada de armazenamento em nuvem, mais perigoso se torna para esses usuários. Qualquer evento que coloque esses provedores off-line, seja por um ataque, demandas regulatórias ou apenas quedas de energia/internet, fará com que todos os clientes validadores que dependem desse servidor fiquem off-line ao mesmo tempo.

As penalidades por ficar off-line são proporcionais a quantos outros estão off-line ao mesmo tempo. O uso de um VPS aumenta muito o risco de que as penalidades por ficar offl-ine sejam mais severas e aumenta o risco de vazamento ou corte quadrático no caso de a interrupção ser grande o suficiente. Para minimizar seu próprio risco e o risco para a rede, os usuários são fortemente encorajados a obter e operar seu próprio hardware.

<a href="https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/">Mais sobre recompensas e penalidades</a>
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Problema de diversidade de clientes da Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Ajudando a diversidade dos clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidade de clientes na camada de consenso do Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Como comprar o hardware validador do Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Passo a passo: Como ingressar na rede de testes da Ethereum 2.0](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _ Butta_
- [Dicas de prevenção de cortes Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020 _
- [Recompensas e penalidades no Ethereum 2.0](https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/) - _James Beck, Maço de 2020_
