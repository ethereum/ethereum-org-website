---
title: "Staking como serviço"
description: "Aprenda sobre staking como serviço"
lang: pt-br
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie, o rinoceronte, flutuando nas nuvens.
sidebarDepth: 2
summaryPoints:
  - Operadores de nós terceirizados lidam com a operação do seu cliente validador
  - Ótima opção para quem tem 32 ETH e não se sente confortável em lidar com a complexidade técnica de executar um nó
  - Reduza a confiança e mantenha a custódia de suas chaves de saque
---

## O que é staking como serviço? {#what-is-staking-as-a-service}

O staking como serviço ("SaaS") representa uma categoria de serviços de staking onde você deposita seus próprios 32 ETH para um validador, mas delega as operações do nó a um operador terceirizado. Esse processo geralmente envolve ser guiado pela configuração inicial, incluindo a geração de chaves e o depósito, e depois fazer o upload de suas chaves de assinatura para o operador. Isso permite que o serviço opere seu validador em seu nome, geralmente por uma taxa mensal.

## Por que fazer staking com um serviço? {#why-stake-with-a-service}

O protocolo [Ethereum](/) não suporta nativamente a delegação de stake, então esses serviços foram criados para atender a essa demanda. Se você tem 32 ETH para fazer staking, mas não se sente confortável em lidar com hardware, os serviços SaaS permitem que você delegue a parte difícil enquanto ganha recompensas de bloco nativas.

<Grid>
  <Card title="Seu próprio validador" emoji=":desktop_computer:" description="Deposite seus próprios 32 ETH para ativar seu próprio conjunto de chaves de assinatura que participarão do consenso do Ethereum. Monitore seu progresso com painéis para ver essas recompensas em ETH se acumularem." />
  <Card title="Fácil de começar" emoji="🏁" description="Esqueça as especificações de hardware, configuração, manutenção de nós e atualizações. Os provedores de SaaS permitem que você terceirize a parte difícil fazendo o upload de suas próprias credenciais de assinatura, permitindo que eles executem um validador em seu nome, por um pequeno custo." />
  <Card title="Limite seu risco" emoji=":shield:" description="Em muitos casos, os usuários não precisam abrir mão do acesso às chaves que permitem sacar ou transferir fundos em stake. Elas são diferentes das chaves de assinatura e podem ser armazenadas separadamente para limitar (mas não eliminar) seu risco como staker." />
</Grid>

<StakingComparison page="saas" />

## O que considerar {#what-to-consider}

Há um número crescente de provedores de SaaS para ajudá-lo a fazer staking do seu ETH, mas todos eles têm seus próprios benefícios e riscos. Todas as opções de SaaS exigem premissas de confiança adicionais em comparação com o staking em casa (home-staking). As opções de SaaS podem ter código adicional envolvendo os clientes Ethereum que não é aberto ou auditável. O SaaS também tem um efeito prejudicial na descentralização da rede. Dependendo da configuração, você pode não controlar seu validador - o operador pode agir de forma desonesta usando seu ETH.

Indicadores de atributos são usados abaixo para sinalizar pontos fortes ou fracos notáveis que um provedor de SaaS listado possa ter. Use esta seção como referência de como definimos esses atributos enquanto você escolhe um serviço para ajudar em sua jornada de staking.

<StakingConsiderations page="saas" />

## Explore provedores de serviços de staking {#saas-providers}

Abaixo estão alguns provedores de SaaS disponíveis. Use os indicadores acima para ajudar a guiá-lo por esses serviços

<ProductDisclaimer />

### Provedores de SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Observe a importância de apoiar a [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/), pois isso melhora a segurança da rede e limita seu risco. Serviços que têm evidências de limitar o uso do cliente majoritário são indicados com <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de execução"</em> e <em style={{ textTransform: "uppercase" }}>"diversidade de clientes de consenso".</em>

### Geradores de chaves {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Tem uma sugestão de um provedor de staking como serviço que deixamos passar? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se ele se encaixaria bem e para enviá-lo para análise.

## Perguntas frequentes {#faq}

<ExpandableCard title="Quem guarda minhas chaves?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Os arranjos diferem de provedor para provedor, mas geralmente você será guiado na configuração de quaisquer chaves de assinatura necessárias (uma por 32 ETH) e no upload delas para o seu provedor para permitir que eles validem em seu nome. As chaves de assinatura sozinhas não dão nenhuma capacidade de sacar, transferir ou gastar seus fundos. No entanto, elas fornecem a capacidade de emitir votos para o consenso, o que, se não for feito corretamente, pode resultar em penalidades offline ou penalização (slashing).
</ExpandableCard>

<ExpandableCard title="Então existem dois conjuntos de chaves?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sim. Cada conta é composta por chaves de <em>assinatura</em> BLS e chaves de <em>saque</em> BLS. Para que um validador ateste o estado da cadeia, participe de comitês de sincronização e proponha blocos, as chaves de assinatura devem estar prontamente acessíveis por um cliente validador. Elas devem estar conectadas à internet de alguma forma e, portanto, são inerentemente consideradas chaves "quentes" (hot keys). Este é um requisito para que seu validador possa atestar e, portanto, as chaves usadas para transferir ou sacar fundos são separadas por motivos de segurança.

As chaves de saque BLS são usadas para assinar uma mensagem única que declara para qual conta da camada de execução as recompensas de staking e os fundos de saída devem ir. Uma vez que esta mensagem é transmitida, as chaves de <em>saque BLS</em> não são mais necessárias. Em vez disso, o controle sobre os fundos sacados é permanentemente delegado ao endereço que você forneceu. Isso permite que você defina um endereço de saque protegido por meio de seu próprio armazenamento frio (cold storage), minimizando o risco para os fundos do seu validador, mesmo que outra pessoa controle as chaves de assinatura do seu validador.

Atualizar as credenciais de saque é uma etapa exigida para habilitar os saques\*. Esse processo envolve a geração das chaves de saque usando sua frase semente mnemônica.

<strong>Certifique-se de fazer o backup desta frase semente com segurança ou você não conseguirá gerar suas chaves de saque quando chegar a hora.</strong>

\*Os stakers que forneceram um endereço de saque com o depósito inicial não precisam definir isso. Verifique com seu provedor de SaaS para obter suporte sobre como preparar seu validador.
</ExpandableCard>

<ExpandableCard title="Quando posso sacar?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Os stakers precisam fornecer um endereço de saque (se não for fornecido no depósito inicial), e os pagamentos de recompensas começarão a ser distribuídos automaticamente de forma periódica a cada poucos dias.

Os validadores também podem sair totalmente como um validador, o que desbloqueará seu saldo restante de ETH para saque. As contas que forneceram um endereço de saque de execução e concluíram o processo de saída receberão todo o seu saldo no endereço de saque fornecido durante a próxima varredura do validador.

<ButtonLink href="/staking/withdrawals/">Mais sobre saques de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="O que acontece se eu for penalizado?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Ao usar um provedor de SaaS, você está confiando a operação do seu nó a outra pessoa. Isso vem com o risco de baixo desempenho do nó, o que não está sob seu controle. No caso de seu validador ser penalizado (slashed), o saldo do seu validador será penalizado e removido à força do pool de validadores.

Após a conclusão do processo de penalização/saída, esses fundos serão transferidos para o endereço de saque atribuído ao validador. Isso exige o fornecimento de um endereço de saque para ser habilitado. Isso pode ter sido fornecido no depósito inicial. Caso contrário, as chaves de saque do validador precisarão ser usadas para assinar uma mensagem declarando um endereço de saque. Se nenhum endereço de saque tiver sido fornecido, os fundos permanecerão bloqueados até que seja fornecido.

Entre em contato com o provedor de SaaS individual para obter mais detalhes sobre quaisquer garantias ou opções de seguro e para obter instruções sobre como fornecer um endereço de saque. Se você preferir ter controle total sobre a configuração do seu validador, [saiba mais sobre como fazer staking solo do seu ETH](/staking/solo/).
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O Diretório de Staking do Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Avaliando Serviços de Staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
