---
title: Staking como um serviço
description: Uma visão geral de como começar com os pools de staking de ETH
lang: pt-br
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
alt: Leslie, o rinoceronte, flutuando nas nuvens
sidebarDepth: 2
summaryPoints:
  - Operadores de nó terceirizados lidam com a operação de seu cliente validador
  - Uma ótima opção para qualquer pessoa com 32 ETH que não se sinta confortável em lidar com a complexidade técnica da execução de um nó
  - Reduza a confiança, e mantenha a posse de suas chaves de saque
---

## O que é staking como um serviço? {#what-is-staking-as-a-service}

Staking como um serviço ("SaaS") representa uma categoria de serviços de staking onde você deposita seus próprios 32 ETH para um validador, mas delega operações de nó para um operador terceirizado. Este processo geralmente envolve ser guiado pela configuração inicial, incluindo a geração de chaves e depósito, e depois enviar suas chaves de assinatura para o operador. Isso permite que o serviço opere seu validador em seu nome, geralmente com uma taxa mensal.

## Por que fazer staking com um serviço? {#why-stake-with-a-service}

O protocolo Ethereum não suporta nativamente a delegação de stake, portanto esses serviços foram construídos para cumprir esta demanda. Se você tem 32 ETH para stake, mas não se sente à vontade para lidar com hardware, os serviços SaaS permitem que você delegue a parte difícil enquanto ganha recompensas nativas do bloco.

<CardGrid>
  <Card title="Seu próprio validador" emoji=":desktop_computer:">
    Deposite os seus 32 ETH para ativar o seu próprio conjunto de chaves de assinatura que participarão do consenso Ethereum. Monitore seu progresso com painéis para ver as recompensas de ETH se acumularem.
  </Card>
  <Card title="Fácil de iniciar" emoji="🏁">
    Esqueça as especificações de hardware, configuração, manutenção do nó e atualizações.
    Provedores SaaS permitem que você terceirize a parte difícil, carregando suas próprias credenciais de assinatura, permitindo-lhes executar um validador em seu nome, por um pequeno custo.
  </Card>
  <Card title="Limite seu risco" emoji=":shield:">
    Em muitos casos, os usuários não precisam ceder o acesso às chaves que permitem a retirada ou transferência de fundos em stake. Estas são diferentes das chaves de assinatura, e podem ser armazenadas separadamente para limitar (mas não eliminar) o seu risco como staker.
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## O que considerar {#what-to-consider}

Há um número crescente de provedores de staking como serviço para ajudá-lo a fazer staking de seu ETH, mas cada um vem com diferentes riscos e benefícios.

Os indicadores de atributo são usados abaixo para sinalizar os pontos fortes ou fracos notáveis que um pool de staking pode ter. Utilize esta seção como referência de como definimos estes atributos enquanto você está escolhendo um serviço para auxiliar em sua jornada de staking.

<StakingConsiderations page="saas" />

## Explore provedores de serviços de staking {#saas-providers}

Abaixo estão alguns provedores SaaS disponíveis. Use os indicadores acima para guiá-lo pelos serviços abaixo

<InfoBanner emoji="⚠️" isWarning>
Observe a importância de escolher um serviço que leve a <a href="/developers/docs/nodes-and-clients/client-diversity/">diversidade de cliente</a> a sério, à medida que melhora a segurança da rede e limita o seu risco. Serviços que possuem evidências de limitar o uso do cliente majoritário são marcados como <em style="text-transform: uppercase;">"clientes diversos".</em>
</InfoBanner>

#### Provedores SaaS

<StakingProductsCardGrid category="saas" />

#### Geradores de chaves

<StakingProductsCardGrid category="keyGen" />

Alguma sugestão de um provedor de SaaS que deixamos de mencionar? Confira nossa [política de listagem de produtos](/contributing/adding-staking-products/) para ver se a sugestão é pertinente, e envie-a para análise.

## Perguntas frequentes {#faq}

<ExpandableCard title="Quem guarda as minhas chaves?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  As disposições diferem de provedor para provedor, mas geralmente você será guiado pela configuração de quaisquer chaves de assinatura que você precise (uma a cada 32 ETH), e terá que enviar estas para o seu provedor para permitir que validem em seu nome. Só as chaves de assinatura não oferecem nenhuma possibilidade de saque, transferência ou gasto dos seus fundos. Entretanto, elas proporcionam a capacidade de votar em consensos, o que, se não for feito adequadamente, pode resultar em sanções ou em cortes off-line.
</ExpandableCard>

<ExpandableCard title="Então, há dois conjuntos de chaves?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sim. Cada conta é composta por ambas chaves <em>de assinatura</em>, e as chaves de <em>saque</em>. Para que um validador ateste o estado da cadeia, participe de comitês de sincronização e proponha blocos, as chaves de assinatura devem estar prontamente acessíveis por um cliente validador. Elas devem estar conectadas à internet de alguma forma, portanto, são inerentemente consideradas chaves "quentes". Este é um requisito para as confirmações do seu validador, portanto, as chaves usadas para transferir ou sacar fundos são separadas por razões de segurança.

Todas essas chaves podem sempre ser regeneradas de forma reprodutível, utilizando sua frase semente mnemônica de 24 palavras. <em>Certifique-se de guardar esta frase semente com segurança ou você não poderá gerar suas chaves de saque quando chegar o momento</em>.
</ExpandableCard>

<ExpandableCard title="Quando posso sacar?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  Quando você faz staking de 32 ETH com um provedor SaaS, seu stake de ETH é ainda depositado no contrato oficial de depósito de staking. Como tal, os stakers do SaaS estão atualmente limitados pelas mesmas restrições de saque que os stakers individuais. Isso significa que o staking do seu ETH é atualmente um depósito de sentido único. Este será o caso até a atualização de Xangai.
</ExpandableCard>

<ExpandableCard title="O que acontece se eu for cortado?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Usando um provedor SaaS, você está confiando a operação do seu nó a um terceiro. Isto implica o risco de um desempenho deficiente, que não está sob o seu controle. Caso seu validador seja cortado, seu saldo do validador será penalizado e removido à força da pool do validador. Estes fundos serão bloqueados até que os saques sejam ativados no nível do protocolo.

Entre em contato com o provedor SaaS para mais detalhes sobre quaisquer garantias ou opções de seguro. Se você preferir estar no controle total da sua configuração do validador, <a href="/staking/solo/">saiba mais sobre como fazer staking individual de seu ETH</a>.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Avaliando os Serviços de Staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
