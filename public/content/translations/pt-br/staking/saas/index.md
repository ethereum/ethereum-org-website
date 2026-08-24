---
title: Staking delegado (staking como serviço)
description: Uma visão geral de como começar com o staking delegado
lang: pt-br
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Operadores de nós terceirizados lidam com a operação do seu cliente validador
  - Uma ótima opção para quem tem 32 ETH e não quer lidar com a complexidade técnica de executar um nó
  - A delegação abrange um espectro, desde serviços onde você mantém suas chaves de saque até exchanges totalmente custodiais
---

## O que é staking delegado? {#what-is-staking-as-a-service}

O staking delegado representa uma categoria de serviços de staking onde você deposita seus próprios 32 ETH para um validador, mas delega as operações do nó para um operador terceirizado. O processo geralmente envolve ser guiado pela configuração inicial, incluindo a geração de chaves e o depósito, e depois o envio das suas chaves de assinatura para o operador. Você fornece o ETH, mas entrega a operação do hardware do validador para outra pessoa.

O protocolo [Ethereum](/) não suporta nativamente a delegação de stake, então uma série de serviços foram criados para atender a essa demanda. Essa categoria é mais conhecida como **staking como serviço (SaaS)**, mas abrange um espectro de arranjos que diferem na questão principal de quanto controle você mantém sobre o seu ETH em stake:

- **Staking como serviço não custodial**: você mantém suas próprias chaves de saque e delega apenas a operação do validador.
- **Staking totalmente custodial**: o provedor, geralmente uma exchange, detém tanto as chaves quanto os fundos.

Em comparação com o [staking solo](/staking/solo/), toda forma de delegação coloca um middleware entre você e o protocolo Ethereum. Esse middleware é um software e uma infraestrutura executados pela empresa de outra pessoa. Cada passo em direção à conveniência adiciona uma premissa de confiança, portanto, antes de escolher um serviço, descubra onde ele se encaixa nesse espectro.

### O que o staking delegado não é {#what-delegated-staking-is-not}

- **Staking em pool e tokens de staking líquido (LSTs)**: com pools, você combina qualquer quantia de ETH com outros stakers, geralmente recebendo um token que representa sua parte do stake da pool. Você não está delegando seu próprio validador; os contratos inteligentes da pool e os operadores de nós controlam os validadores. [Mais sobre staking em pool](/staking/pools/)
- **Operação de nó com garantia (bonded)**: alguns protocolos de staking permitem que você execute um validador em seu próprio hardware com menos de 32 ETH ao depositar uma garantia. Isso é operação de nó, o oposto de delegação, e é abordado junto com o [staking solo](/staking/solo/).

## Por que delegar seu staking? {#why-stake-with-a-service}

Se você tem 32 ETH para fazer stake, mas não se sente confortável em lidar com hardware, os serviços de staking delegado permitem que você repasse a parte técnica enquanto ganha recompensas de bloco nativas do Ethereum.

<Grid>
  <Card title="Seu próprio validador" icon={<MonitorCheck />} description="Deposite seus próprios 32 ETH para ativar seu próprio conjunto de chaves de assinatura que participarão do consenso do Ethereum. Monitore seu progresso com painéis para ver essas recompensas em ETH se acumularem." />
  <Card title="Fácil de começar" icon={<Flag />} description="Esqueça as especificações de hardware, configuração, manutenção de nós e atualizações. Os provedores permitem que você terceirize a parte difícil enviando suas próprias credenciais de assinatura, permitindo que eles executem um validador em seu nome, por um pequeno custo." />
  <Card title="Limite seu risco" icon={<ShieldHalf />} description="Com serviços não custodiais, você mantém o controle das chaves que permitem o saque ou a transferência dos fundos em stake. Elas são diferentes das chaves de assinatura e podem ser armazenadas separadamente para limitar (mas não eliminar) seu risco como staker." />
</Grid>

## Comparação das opções de staking {#comparison-of-staking-options}

<StakingComparison page="saas" />

## O espectro da delegação {#the-delegation-spectrum}

Os provedores diferem em quais chaves eles mantêm para você, e cada chave que eles mantêm é algo em que você deve confiar a eles.

### Staking como serviço não custodial {#non-custodial-staking-as-a-service}

Com o SaaS não custodial, você geralmente é guiado pela geração das chaves do seu validador e pela realização do seu próprio depósito de 32 ETH, e então você envia as _chaves de assinatura_ para o operador. As chaves de assinatura permitem que o operador execute as funções do validador (atestar e propor blocos) em seu nome. O uso indevido delas pode fazer com que seu validador seja penalizado (slashing), mas elas não podem ser usadas para sacar, transferir ou gastar seus fundos.

As _credenciais de saque_ do validador permanecem apontadas para um endereço que você controla. As recompensas e os fundos de saída só podem ir para lá (veja a seção do modelo de confiança abaixo).

### Serviços custodiais e staking em exchanges {#custodial-services-and-exchange-staking}

No extremo totalmente delegado do espectro está o staking custodial, mais comumente oferecido por exchanges centralizadas. Você nunca lida com chaves; você apenas mantém ETH na conta da sua plataforma e opta por fazer staking. Esta é a experiência de usuário mais simples possível, e é uma opção legítima para pessoas que já mantêm fundos em uma exchange e aceitam o risco custodial.

Também exige a maior confiança. O provedor controla tanto as chaves de assinatura quanto as credenciais de saque; o que você tem é um saldo na plataforma deles, não um validador. Isso significa que:

- Seu ETH em stake está exposto à solvência, segurança e situação regulatória do provedor, e os saques estão sujeitos aos termos e tempos de processamento deles, não apenas às regras do protocolo Ethereum.
- Você não tem uma maneira independente de sair do validador ou recuperar fundos se o provedor falhar ou congelar os saques.
- Grandes quantidades de ETH em stake sob um punhado de operadores de exchanges contribuem para a centralização do stake, e as escolhas de clientes desses operadores afetam a saúde da rede. Fazer staking de uma forma que mantenha mais controle em suas mãos, ou escolher provedores que comprovadamente executam clientes minoritários, faz mais pela resiliência do Ethereum.

## Modelo de confiança: o que avaliar {#trust-model-what-to-evaluate}

O staking delegado sempre significa confiar a outra pessoa parte da sua configuração de staking. Responda a estas perguntas antes de entregar qualquer coisa:

- **Quem detém as chaves de saque?** As credenciais de saque de um validador (tipo 0x01 ou 0x02) apontam para um endereço da camada de execução que, em última análise, controla o stake. Se esse endereço for seu, o arranjo é não custodial; o operador pode executar (ou administrar mal) o validador, mas o ETH só poderá ser sacado para você. Se as credenciais apontarem para o endereço do provedor, você tem uma promessa, não um stake.
- **Você pode sair sem o operador?** Desde a [atualização Pectra](/roadmap/pectra/), os [saques acionados pela camada de execução (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) permitem que o endereço de saque acione a saída de um validador (ou, para validadores de composição 0x02, um saque parcial do saldo acima de 32 ETH) diretamente da camada de execução, sem as chaves de assinatura. Isso exige uma transação e custa gás, mas significa que um operador que não responde ou que deixou de existir não pode mais manter seu validador como refém, desde que as credenciais de saque sejam suas.
- **Qual é a estrutura de taxas?** Os serviços cobram uma taxa mensal fixa ou uma porcentagem das recompensas. Verifique como as taxas interagem com o tempo de inatividade e as penalizações: quem arca com o custo se o operador tiver um desempenho inferior e se alguma garantia ou seguro é oferecido.
- **Quais clientes o operador executa?** Um operador que executa [clientes de execução ou de consenso](/developers/docs/nodes-and-clients/client-diversity/) majoritários expõe tanto o seu stake quanto a rede a falhas correlacionadas se esse cliente tiver um bug. Dê preferência a provedores que documentam o uso de clientes minoritários.
- **O serviço é aberto e auditado?** Os provedores podem executar softwares adicionais em torno dos clientes padrão do Ethereum que não são de código aberto ou auditáveis. Procure por auditorias públicas, um histórico operacional estabelecido e um registro limpo de penalizações (slashing).
- **O que acontece se o provedor desaparecer?** Um provedor responsável documenta seu processo de desligamento (offboarding), fornecendo instruções claras sobre como você sai do seu validador, recupera suas chaves ou aciona uma saída por conta própria. Se a resposta depender inteiramente de o provedor continuar no mercado, trata-se de um arranjo custodial.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Alguns provedores podem executar seu validador usando a tecnologia de validador distribuído (DVT)**, dividindo a chave de assinatura em vários nós para que nenhuma máquina ou operador único seja um ponto de falha. [Mais sobre a tecnologia de validador distribuído](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## O que considerar {#what-to-consider}

Há um número crescente de provedores para ajudá-lo a delegar a operação do seu validador, mas todos eles têm seus próprios benefícios e riscos. Todas as opções delegadas exigem premissas de confiança adicionais em comparação com o staking solo. As opções delegadas podem ter códigos adicionais envolvendo os clientes do Ethereum que não são abertos ou auditáveis. A delegação também tem um efeito prejudicial na descentralização da rede. Dependendo da configuração, você pode não controlar seu validador, e o operador pode agir de forma desonesta usando seu ETH.

Os indicadores de atributos são usados abaixo para sinalizar pontos fortes ou fracos notáveis que um provedor listado pode ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe um serviço de staking.

<StakingConsiderations page="saas" />

## Explore provedores de serviços de staking {#saas-providers}

Abaixo estão alguns provedores de staking como serviço disponíveis. Use os indicadores acima para ajudá-lo a se guiar por esses serviços.

<ProductDisclaimer />

### Provedores de SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Observe a importância de apoiar a [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/), pois isso melhora a segurança da rede e limita o seu risco. Os serviços que têm evidências de limitar o uso de clientes majoritários são indicados com <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de execução"</em> e <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de consenso".</em>

### Geradores de chaves {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Tem uma sugestão de um provedor de staking como serviço que deixamos passar? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se ele se encaixaria bem e para enviá-lo para análise.

<StakingCommunityCallout className="my-16" />

## Perguntas frequentes {#faq}

<ExpandableCard title="Quem detém minhas chaves?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Os arranjos diferem de provedor para provedor. Com serviços não custodiais, você será guiado pela geração das chaves de assinatura para o seu validador (cada validador detém 32 ETH, ou até 2048 ETH com credenciais de composição (0x02) desde a atualização Pectra), e pelo envio delas para o seu provedor para permitir que eles validem em seu nome. As chaves de assinatura por si só não dão nenhuma capacidade de sacar, transferir ou gastar seus fundos. No entanto, elas fornecem a capacidade de emitir votos para o consenso, o que, se não for feito corretamente, pode resultar em penalidades offline ou slashing.

Com serviços custodiais, como o staking por meio de uma exchange centralizada, o provedor detém todas as chaves: as chaves de assinatura e as credenciais de saque. Nesse caso, você está confiando os próprios fundos ao provedor, e não apenas a operação do validador.
</ExpandableCard>

<ExpandableCard title="Então existem dois conjuntos de chaves?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sim. Cada validador tem chaves de _assinatura_ e _credenciais de saque_ separadas. Para que um validador ateste o estado da cadeia, participe de comitês de sincronização e proponha blocos, as chaves de assinatura devem estar prontamente acessíveis por um cliente validador. Elas devem estar conectadas à internet de alguma forma e, portanto, são inerentemente consideradas chaves "quentes" (hot keys). As chaves que controlam os fundos sacados são mantidas separadas por motivos de segurança.

As credenciais de saque designam o endereço da camada de execução para o qual vão as recompensas de staking e os fundos de saída. As ferramentas de depósito modernas permitem que você defina esse endereço no momento do depósito, como uma credencial regular (0x01) ou de composição (0x02), e deve ser um endereço que você controla, idealmente protegido em armazenamento frio (cold storage). Isso protege seus fundos mesmo que outra pessoa controle as chaves de assinatura do seu validador e, desde a atualização Pectra, também permite que você saia do validador diretamente desse endereço.

Os validadores configurados nos primeiros dias da rede sem um endereço de saque de execução usam chaves de saque BLS legadas e devem assinar uma mensagem única declarando um endereço de saque antes que os saques possam começar. Isso envolve a regeneração das chaves de saque a partir da frase semente mnemônica criada na configuração.

**Certifique-se de fazer o backup dessa frase semente com segurança ou você não conseguirá gerar suas chaves de saque quando chegar a hora.**

Verifique com seu provedor o suporte sobre como preparar seu validador.
</ExpandableCard>

<ExpandableCard title="Quando posso sacar?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Como os saques funcionam depende do tipo de credencial de saque do seu validador. Para validadores regulares (0x01), qualquer saldo acima de 32 ETH é automaticamente varrido para o endereço de saque periodicamente a cada poucos dias. Para validadores de composição (0x02), as recompensas são compostas no saldo do validador até 2048 ETH, e sacar abaixo disso exige o acionamento de um saque parcial do seu endereço de saque, o que custa gás.

Os validadores também podem sair totalmente, o que desbloqueia todo o saldo de ETH restante. Após concluir o processo de saída, o saldo total é transferido para o endereço de saque durante uma varredura subsequente do validador.

<ButtonLink href="/staking/withdrawals/">Mais sobre saques de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="E se meu provedor desaparecer ou não sair do meu validador?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Se suas credenciais de saque apontarem para um endereço que você controla, você mesmo pode sair do validador e recuperar seu stake; veja [Modelo de confiança: o que avaliar](#trust-model-what-to-evaluate).

Se o provedor detiver as credenciais de saque (como no staking custodial e em exchanges), não há uma maneira no nível do protocolo para você recuperar os fundos de forma independente; seu recurso é limitado aos próprios processos do provedor.
</ExpandableCard>

<ExpandableCard title="O que acontece se eu for penalizado?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Ao usar um provedor de staking delegado, você está confiando a operação do seu nó a outra pessoa. Isso vem com o risco de baixo desempenho do nó, o que não está sob seu controle. No caso de seu validador ser penalizado (slashed), uma penalidade inicial proporcional ao saldo do seu validador é aplicada (tornada significativamente menor na atualização Pectra), e seu validador é forçado a sair do conjunto de validadores.

Após a conclusão do processo de penalização/saída, os fundos restantes são transferidos para o endereço de saque atribuído ao validador.

Entre em contato com provedores individuais para obter mais detalhes sobre quaisquer garantias ou opções de seguro. Se você preferir ter controle total da configuração do seu validador, [saiba mais sobre como fazer o staking solo do seu ETH](/staking/solo/).
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O que é Staking como Serviço?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [O Diretório de Staking do Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Avaliando Serviços de Staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Saques acionáveis pela camada de execução](https://eips.ethereum.org/EIPS/eip-7002) - _a especificação para a saída de um validador a partir do seu endereço de saque_