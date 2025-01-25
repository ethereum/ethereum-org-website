---
title: Abstração de conta
description: Uma visão geral dos planos do Ethereum para tornar as contas de usuário mais simples e seguras
lang: pt-br
summaryPoints:
  - A abstração da conta facilita muito a criação de carteiras de contratos inteligentes
  - As carteiras de contratos inteligentes facilitam muito o gerenciamento do acesso às contas do Ethereum
  - Chaves perdidas e expostas podem ser recuperadas usando vários backups
---

# Abstração de conta {#account-abstraction}

Os usuários interagem com o Ethereum por meio de **[contas de propriedade externa (EOAs)](/glossary/#eoa)**. Essa é a única maneira de iniciar uma transação ou executar um contrato inteligente. Isso limita a maneira como os usuários podem interagir com o Ethereum. Por exemplo, dificulta a realização de lotes de transações e exige que os usuários sempre mantenham um saldo de ETH para cobertura do gás.

A abstração de contas é uma maneira de resolver esses problemas, permitindo que os usuários programem com flexibilidade mais segurança e melhores experiências de usuário nas respectivas contas. Isso pode ocorrer por meio da [melhoria de EOAs](https://eips.ethereum.org/EIPS/eip-3074) para que possam ser controladas por contratos inteligentes ou pela [melhoria de contratos inteligentes](https://eips.ethereum.org/EIPS/eip-2938) para que possam iniciar transações. Ambas as opções exigem alterações no protocolo Ethereum. Há também um terceiro caminho que envolve a adição de um [segundo sistema de transações separado](https://eips.ethereum.org/EIPS/eip-4337) para ser executado em paralelo ao protocolo existente. Independentemente da rota, o resultado é o acesso ao Ethereum por meio de carteiras de contratos inteligentes, seja com suporte nativo como parte do protocolo existente ou por meio de uma rede de transações complementar.

As carteiras de contratos inteligentes oferecem muitos benefícios ao usuário, incluindo:

- definição das próprias regras de segurança flexíveis
- recuperação da conta, se o usuário perder as chaves
- compartilhamento da segurança da conta entre dispositivos ou indivíduos confiáveis
- pagamento do gás de outra pessoa ou solicitar o pagamento do respectivo gás a um terceiro
- transações em lote juntas (por exemplo, aprovar e executar uma troca de uma só vez)
- mais oportunidades para que os desenvolvedores de dApps e carteiras inovem as experiências do usuário

Atualmente, esses benefícios não têm compatibilidade nativa porque apenas contas de propriedade externa ([EOAs](/glossary/#eoa)) podem iniciar transações. As EOAs são simplesmente pares de chaves públicas-privadas. Elas funcionam assim:

- se você tiver a chave privada, poderá fazer _qualquer coisa_ de acordo com as regras da Máquina Virtual do Ethereum (EVM)
- se você não tiver a chave privada, não poderá fazer _nada_.

Se você perder as suas chaves, elas não poderão ser recuperadas, e as chaves roubadas dão aos ladrões acesso imediato a todos os fundos de uma conta.

As carteiras de contratos inteligentes são a solução para esses problemas, mas atualmente são difíceis de programar porque, no final, qualquer lógica que elas implementem precisa ser traduzida em um conjunto de transações EOA antes que possam ser processadas pelo Ethereum. A abstração de conta permite que contratos inteligentes iniciem as próprias transações. Dessa forma, qualquer lógica que o usuário queira implementar poderá ser codificada na própria carteira de contrato inteligente e executada no Ethereum.

Na realidade, é a abstração de contas que melhora o suporte a carteiras de contratos inteligentes, tornando-as mais fáceis de criar e mais seguras de usar. No final, com a abstração de conta, os usuários podem aproveitar todos os benefícios do Ethereum sem precisar conhecer ou se preocupar com a tecnologia subjacente.

## Além das frases sementes {#beyond-seed-phrases}

As contas de hoje são protegidas por meio de chaves privadas que são calculadas a partir de frases sementes. Qualquer pessoa que tenha acesso a uma frase semente pode descobrir facilmente a chave privada que protege uma conta e obter acesso a todos os ativos que ela protege. Se uma chave privada e uma frase semente forem perdidas, elas nunca poderão ser recuperadas e os ativos que elas controlam ficarão congelados para sempre. Proteger essas frases semente é difícil, mesmo para usuários experientes, e o phishing de frases semente é uma das maneiras mais comuns de enganar os usuários.

A abstração de conta resolverá esse problema ao utilizar um contrato inteligente para manter ativos e autorizar transações. Esses contratos inteligentes podem ser decorados com lógica personalizada para torná-los tão seguros e adaptados ao usuário quanto possível. Em última análise, você ainda usa chaves privadas para controlar o acesso à sua conta, mas com redes de segurança que as tornam mais fáceis e seguras de gerenciar.

Por exemplo, as chaves de backup podem ser adicionadas a uma carteira para que, se você perder ou expor acidentalmente a sua chave principal, ela possa ser substituída por uma nova e segura, com a permissão das chaves de backup. Você pode proteger cada uma dessas chaves de uma maneira diferente ou dividi-las entre guardiões confiáveis. Isso faz com que seja muito mais difícil para um ladrão obter controle total dos seus fundos. Da mesma forma, você pode adicionar regras à carteira para reduzir o impacto se sua chave principal for comprometida; por exemplo, você pode permitir que transações de baixo valor sejam verificadas por uma única assinatura, enquanto as transações de valor mais alto exigem a aprovação de vários signatários autenticados. Também existem outras formas em que carteiras de contratos inteligentes podem ajudar a impedir a ação de ladrões, por exemplo, uma lista de permissões pode ser usada para bloquear todas as transações, a menos que sejam para um endereço confiável ou verificadas por várias de suas chaves pré-aprovadas.

### Exemplos de lógica de segurança que podem ser incorporados em uma carteira de contrato inteligente:

- **Autorização multisig**: você pode compartilhar credenciais de autorização entre várias pessoas ou dispositivos confiáveis. Em seguida, o contrato pode ser configurado de modo que as transações superiores a um valor predefinido exijam autorização de uma proporção específica (por exemplo, 3/5) das partes confiáveis. Por exemplo, transações de alto valor podem exigir a aprovação de um dispositivo móvel e de uma carteira de hardware, ou assinaturas de contas distribuídas a familiares confiáveis.
- **Congelamento de conta**: se um dispositivo for perdido ou comprometido, a conta pode ser bloqueada a partir de outro dispositivo autorizado, protegendo os ativos do usuário.
- **Recuperação de conta**: perdeu um dispositivo ou esqueceu uma senha? No paradigma atual, isso significa que os seus ativos podem ser congelados para sempre. Com uma carteira de contrato inteligente, você pode configurar uma lista de permissões de contas que podem autorizar novos dispositivos e redefinir o acesso.
- **Definição de limites de transações**: especifique limites diários de transferência de valores da conta em um dia/semana/mês. Isso significa que, se um invasor obtiver acesso à sua conta, ele não poderá ficar com tudo de uma vez e você terá oportunidades de congelar e redefinir o acesso.
- **Criar listas de permissões**: apenas permitir transações para determinados endereços que você sabe que são seguros. Isso significa que _mesmo que_ sua chave privada fosse roubada, o invasor só poderia enviar fundos para contas de destino que estão em sua lista. Essas listas de permissões exigiriam várias assinaturas para alterá-las, de modo que um invasor não pudesse adicionar seu próprio endereço à lista, a menos que tivesse acesso a várias de suas chaves de backup.

## Melhor experiência do usuário {#better-user-experience}

A abstração de conta permite uma **melhor experiência geral do usuário**, bem como uma **segurança reforçada**, porque adiciona suporte para carteiras de contratos inteligentes no nível do protocolo. O motivo mais importante para isso é que isso proporcionará aos desenvolvedores de contratos inteligentes, carteiras e aplicativos muito mais liberdade para inovar a experiência do usuário de maneiras que talvez ainda não possamos prever. Alguns aprimoramentos óbvios que ocorrerão com a abstração de contas incluem o agrupamento de transações para aumentar a velocidade e a eficiência. Por exemplo, uma simples troca deveria ser uma operação de um clique, mas atualmente é necessário assinar várias transações para aprovar o gasto de tokens individuais antes que a troca seja executada. A abstração da conta remove esse atrito ao permitir o agrupamento de transações. Além disso, a transação agrupada poderia aprovar exatamente o valor correto dos tokens exigidos para cada transação e, em seguida, revogar as aprovações após a conclusão da transação, o que oferece uma segurança adicional.

O gerenciamento de gás também é muito aprimorado com a abstração de conta. Não só os aplicativos podem se oferecer para pagar as taxas de gás de seus usuários, mas as taxas de gás podem ser pagas em tokens além de ETH, o que libera os usuários da necessidade de manter um saldo de ETH para financiar as transações. Isso funcionaria por meio da troca de tokens do usuário por ETH no contrato e, em seguida, usar o ETH para pagar o gás.

<ExpandableCard title="Como a abstração de contas pode ajudar com o gás?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

O gerenciamento de gás é um dos principais atritos para os usuários do Ethereum, principalmente porque o ETH é o único ativo que pode ser usado para pagar as transações. Imagine que você tem uma carteira com saldo USDC, mas sem ETH. Você não pode mover ou trocar esses tokens USDC porque não pode pagar o gás. Você também não pode trocar o USDC por ETH, porque isso custa gás. Para resolver o problema, você teria de enviar mais ETH para a sua conta a partir de uma corretora ou outro endereço. Com carteiras de contrato inteligentes, você pode simplesmente pagar o gás em USDC e liberar a conta. Você não precisa mais que manter um saldo de ETH em todas as suas contas.

A abstração de conta também permite que desenvolvedores de dApps sejam criativos com o gerenciamento de gás. Por exemplo, você pode começar a pagar ao seu DEX favorito uma taxa fixa por mês para transações ilimitadas. As dApps podem se oferecer para pagar todas as suas taxas de gás em seu nome, como recompensa, pelo uso da plataforma ou como uma oferta de boas-vindas. Será muito mais fácil para os desenvolvedores realizarem inovações com relação ao gás quando houver compatibilidade com as carteiras de contratos inteligentes no nível do protocolo.

</ExpandableCard>

As sessões confiáveis também são potencialmente transformadoras para experiências do usuário, especialmente para aplicativos como jogos, em que um grande número de pequenas transações pode precisar de aprovação em um curto espaço de tempo. Aprovar individualmente cada transação prejudicaria a experiência do jogo, mas uma aprovação permanente é insegura. Uma carteira de contrato inteligente pode aprovar transações específicas por um período fixo, até um valor específico ou apenas para endereços específicos.

Também é interessante considerar como as compras poderiam mudar com a abstração da conta. Hoje, cada transação precisa ser aprovada e executada a partir de uma carteira pré-financiada com uma quantidade suficiente do token correto. Com a abstração da conta, a experiência poderia ser mais parecida com uma compra online conhecida, em que um usuário poderia colocar itens no "carrinho" e clicar uma vez para comprar tudo junto, e o contrato processaria toda a lógica exigida, não o usuário.

Esses são apenas alguns exemplos de como as experiências do usuário podem ser aprimoradas pela abstração de contas, mas haverá muitos outros que ainda nem imaginamos. A abstração de contas libera os desenvolvedores das restrições dos EOAs atuais, permite que tragam os aspectos positivos da web2 para a web3 sem sacrificar a autocustódia e criar novas experiências de usuário inovadoras.

## Como a abstração da conta será implementada? {#how-will-aa-be-implemented}

Atualmente, existem carteiras de contratos inteligentes, mas a implementação é difícil porque a EVM não tem compatibilidade com as carteiras. Em vez disso, elas dependem do agrupamento ("enrolamento") de códigos relativamente complexos em torno de transações padrão da Ethereum. O Ethereum pode mudar isso ao permitir que contratos inteligentes iniciem transações, processando a lógica necessária em contratos inteligentes Ethereum em vez de fora da cadeia. Colocar lógica em contratos inteligentes também aumenta a descentralização do Ethereum, pois elimina a necessidade de "retransmissores" executados por desenvolvedores de carteiras para traduzir mensagens assinadas pelo usuário em transações regulares do Ethereum.

<ExpandableCard title="EIP-2771: abstração de conta por meio de meta-transações" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

O EIP-2771 introduz o conceito de meta-transações que permitem que terceiros paguem o custo do gás do usuário sem fazer alterações no protocolo Ethereum. A ideia é que as transações assinadas por um usuário sejam enviadas para um contrato "Encaminhador" (Forwarder). O encaminhador é uma entidade confiável que verifica se as transações são válidas antes de enviá-las a um retransmissor de gás. Isso é feito fora da cadeia, evitando a necessidade de pagar gás. O retransmissor de gás envia a transação para um contrato "Destinatário" (Recipient), pagando o gás necessário para tornar a transação executável no Ethereum. A transação é executada se o "Destinatário" conhecer e confiar no "Encaminhador". Esse modelo torna mais fácil para os desenvolvedores implementarem transações sem gás para os usuários.

</ExpandableCard>

<ExpandableCard title="EIP-4337: abstração de conta sem alterar o protocolo Ethereum" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

O EIP-4337 é o primeiro passo em direção ao suporte nativo à carteira de contrato inteligente de forma descentralizada, <em>sem exigir alterações no protocolo Ethereum</em>. Em vez de modificar a camada de consenso para oferecer suporte a carteiras de contrato inteligente, um novo sistema é adicionado em separado ao protocolo normal de transmissão de transações. Esse sistema de nível mais alto é construído em torno de um novo objeto chamado <code>UserOperation</code>, que empacota as ações de um usuário juntamente com as assinaturas relevantes. Esses objetos <code>UserOperation</code> são então transmitidos para um mempool dedicado, em que os validadores podem coletá-los em uma "transação de pacote". A transação de pacote representa uma sequência de muitas <code>UserOperations</code> individuais e pode ser incluída em blocos Ethereum, como uma transação normal, e seria coletada por validadores usando um modelo de seleção de maximização de taxas semelhante.

A maneira como as carteiras funcionariam também mudaria no EIP-4337. Em vez de cada carteira reimplementar a lógica de segurança comum, mas complexa, essas funções seriam terceirizadas para um contrato de carteira global conhecido como &quot;ponto de entrada&quot;. Isso processaria operações como pagamento de taxas e execução do código EVM para que os desenvolvedores de carteiras possam se concentrar em oferecer excelentes experiências ao usuário.

<strong>Obs.:</strong> o contrato do ponto de entrada EIP 4337 foi implantado na rede principal do Ethereum em 1º de março de 2023. O contrato está disponível no <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: alterar o protocolo Ethereum para oferecer suporte à abstração da conta" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">O EIP-2938</a> visa atualizar o protocolo Ethereum introduzindo um novo tipo de transação, <code>AA_TX_TYPE</code>, que inclui três campos: <code>nonce</code>, <code>target</code> e <code>data</code>, em que <code>nonce</code> é um contador de transações, <code>target</code> é o endereço do contrato do ponto de entrada e <code>data</code> é o bytecode da EVM. Para executar essas transações, duas novas instruções (conhecidas como opcodes) precisam ser agregadas à EVM: <code>NONCE</code> e <code>PAYGAS</code>. O opcode <code>NONCE</code> rastreia a sequência da transação e o <code>PAYGAS</code> calcula e saca do saldo do contrato o gás necessário para executar a transação. Essas novas funcionalidades permitem que o Ethereum ofereça suporte a carteiras de contratos inteligentes de forma nativa, pois a infraestrutura necessária é incorporada ao protocolo do Ethereum.

Observe que o protocolo EIP-2938 não está ativo no momento. A comunidade atualmente está a favor do EIP-4337, porque não exige alterações no protocolo.

</ExpandableCard>

<ExpandableCard title="EIP-3074: melhoria de contas de propriedade externa para a abstração da conta" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

O <a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> visa atualizar as contas de propriedade externa do Ethereum, permitindo a delegação do controle a um contrato inteligente. Isso significa que a lógica do contrato inteligente poderia aprovar transações originadas de um EOA. Isso permitiria recursos como o patrocínio de gás e transações em lote. Para isso funcionar, dois novos opcodes precisam ser agregados à EVM: <code>AUTH</code> e <code>AUTHCALL</code>. Com o EIP-3074, os benefícios de uma carteira de contrato inteligente são disponibilizados <em>sem a necessidade de um contrato</em>. Em vez disso, um tipo específico de contrato sem estado, sem confiança e não atualizável, conhecido como "invocador" (invoker), processa as transações.

Observe que o protocolo EIP-3074 não está ativo no momento. A comunidade atualmente está a favor do EIP-4337, porque não exige alterações no protocolo.

</ExpandableCard>

## Progresso atual {#current-progress}

As carteiras de contratos inteligentes já estão disponíveis, mas são necessárias mais melhorias para torná-las o mais descentralizadas e sem permissão possível. O EIP-4337 é uma proposta desenvolvida que não exige nenhuma alteração no protocolo Ethereum, portanto, é possível que isso seja implementado rapidamente. Entretanto, as melhorias que alteram o protocolo Ethereum não estão em desenvolvimento ativo no momento. Portanto, ainda pode demorar muito para a implementação dessas alterações. Também é possível que EIP-4337 alcance a abstração da conta de uma maneira suficientemente adequada, e nenhuma alteração de protocolo será necessária.

## Leitura adicional {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Discussão do painel sobre abstração de conta da Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- ["Por que a abstração de contas é um agente de mudança para dApps", Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- ["Abstração de conta ELI5", Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Notas sobre o "Caminho para abstração de contas", Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Publicação do blog de Vitalik sobre carteiras de recuperação social](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Notas EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Documentação EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Notas EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Documentação EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentação EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- ["Fundamentos sobre abstração de contas" -- O que é abstração de contas, Parte I](https://www.alchemy.com/blog/account-abstraction)
