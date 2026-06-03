---
title: "Construindo no Ethereum em 2026: o que mudou"
description: "Três atualizações de protocolo desde 2023 mudaram duas coisas com as quais os construtores se importam: quanto custa usar a l1 e o que as carteiras comuns podem fazer. Um guia prático para construir no Ethereum em 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "taxas de gas"
  - "abstração de conta"
  - "atualizações de protocolo"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Construindo no Ethereum em 2026
lang: pt-br
---

Se o seu modelo mental do Ethereum foi formado entre 2021 e 2023, ele está desatualizado. Três atualizações de protocolo desde então, [Dencun](/roadmap/dencun/) em março de 2024, [Pectra](/roadmap/pectra/) em maio de 2025 e [Fusaka](/roadmap/fusaka/) em dezembro de 2025, mudaram duas coisas com as quais os construtores se importam: quanto custa usar a camada 1 (l1) e o que as carteiras comuns podem fazer.

## A Mainnet está barata novamente {#mainnet-is-cheap-again}

O regime de taxas de 2021 a 2023 não é mais uma suposição padrão segura.

Em 5 de maio de 2026, o rastreador de gas do Etherscan mostra o gas padrão em torno de 0,15 gwei, com médias diárias próximas a 0,5 gwei durante abril. Uma transferência básica de ETH custa menos de um centavo nesse nível, com dias recentes típicos ficando na casa de poucos centavos. A tendência tem sido de queda em cada uma das atualizações recentes, e a próxima, [Glamsterdam](/roadmap/glamsterdam/), deve reduzir ainda mais as taxas. Isso faz com que a ideia de que "a Rede Principal do Ethereum é muito cara para a maioria dos aplicativos" seja um ponto de partida ultrapassado.

Se você quer uma regra prática simples, use a matemática do gas em vez do folclore antigo. A 0,5 gwei, a média recente de abril, e o ETH a aproximadamente US$ 2.350, os custos ilustrativos são os seguintes.

| Operação | Gas Usado | Custo Ilustrativo |
| :-------------- | :---------- | :---------------- |
| Transferência de ETH | 21.000 | **US$ 0,025** |
| Transferência de ERC-20 | \~65.000 | **US$ 0,076** |
| Aprovação de ERC-20 | \~46.000 | **US$ 0,054** |
| Swap | \~180.000 | **US$ 0,21** |
| Implantação de ERC-20 | \~1.200.000 | **US$ 1,41** |

Esses são exemplos, não garantias. Os custos variam com o preço do ETH, o preço do gás e a complexidade do contrato. As leituras de gwei podem oscilar amplamente dentro de um mês normal, enquanto o custo em dólares quase não se move, porque os rollups agora carregam cerca de 95% das transações do Ethereum e a l1 normalmente opera bem abaixo de sua meta de bloco. As taxas da Mainnet agora são baixas o suficiente para que muitos aplicativos possam ser executados de forma sensata na Mainnet.

### Por que os custos caíram {#why-costs-fell}

Três atualizações fizeram a maior parte do trabalho.

Dencun (março de 2024) introduziu a EIP-4844 e deu aos rollups sua própria via de dados por meio de blobs, com um mercado de taxas separado. Os rollups pararam de competir com o tráfego de execução comum no mesmo espaço de bloco.

A atualização Pectra foi ativada em 7 de maio de 2025. A EIP-7691 aumentou a vazão de blobs de uma meta de 3 / máximo de 6 blobs por bloco para uma meta de 6 / máximo de 9, o que expandiu a via de dados barata que os rollups usam e reduziu ainda mais as taxas da camada 2 (l2).

Fusaka foi ativada em 3 de dezembro de 2025. Sua principal mudança de capacidade foi o PeerDAS, que permite que os validadores façam amostragem de dados de blob em vez de baixar cada blob na íntegra, e essa amostragem é o que torna contagens mais altas de blobs seguras na camada de rede. Em paralelo, a comunidade aumentou o limite de gas da l1 de 30M para 60M durante 2025, e a EIP-7935 da Fusaka padronizou 60M como o novo padrão. A EIP-7825 limita qualquer transação única a \~16,78M de gas, o que a maioria dos aplicativos nunca notará, mas implantações muito grandes e multicalls monolíticas agora precisam se encaixar nisso. A EIP-7951 também adicionou verificação nativa secp256r1 (P-256) na Mainnet, o que torna as assinaturas de chave de acesso e WebAuthn muito mais baratas de verificar em fluxos de conta.

O efeito líquido é que a Mainnet não tem mais o preço de uma cadeia permanentemente congestionada.

## Como a EIP-7702 muda o modelo de conta {#how-eip-7702-changes-the-account-model}

A Pectra também lançou a EIP-7702, que dá às carteiras comuns acesso ao comportamento de conta inteligente, como processamento em lote, patrocínio de gas, chaves de sessão, fluxos de recuperação e experiência do usuário (UX) amigável para chave de acesso, sem fazer com que o usuário migre para uma nova conta.

Ela funciona adicionando um novo tipo de transação (tipo `0x04`, `SetCode`) que permite que uma EOA defina um ponteiro para o código de contrato já implantado. O usuário mantém o mesmo endereço, a chave EOA original mantém o controle final sobre a conta e a delegação pode ser alterada posteriormente ou redefinida para o endereço nulo.

Para os construtores de aplicativos, a mudança prática é pedir à carteira o resultado, não a configuração de baixo nível da EIP-7702. Se um usuário precisar aprovar e fazer um swap em um único fluxo, solicite um lote por meio da ERC-5792 `wallet_sendCalls`. A carteira pode decidir se usará a EIP-7702, a ERC-4337 ou outro sistema de conta.

O código delegado é um limite de segurança. Se uma carteira apontar uma EOA para um código com bugs ou malicioso, esse código poderá fazer chamadas como o usuário, incluindo aprovações de token, transferências e interações de aplicativos. Os construtores devem tratar os alvos de delegação como infraestrutura de carteira, confiando em implementações avaliadas pela carteira e não pedindo aos usuários que deleguem casualmente para códigos controlados por aplicativos.

## O que isso muda sobre como construir {#what-this-changes-about-how-to-build}

A pergunta padrão do construtor costumava ser "qual l2 é barata o suficiente?". Essa pergunta ainda tem respostas, mas não é a única. Com as taxas da l1 na faixa de centavos por transação durante a carga normal, e a EIP-7702 permitindo que qualquer carteira exponha a UX de conta inteligente sem migrar endereços, o padrão mais útil é se o aplicativo deve viver na Mainnet ou se uma l2 específica oferece uma vantagem real de distribuição, liquidez ou UX que a l1 não pode oferecer.

A suposição de conta também muda. Não projete novos aplicativos como se cada conta de usuário fosse uma EOA ECDSA simples que deve conter ETH antes de fazer qualquer coisa útil. Prefira interfaces de processamento em lote no nível da carteira, como a ERC-5792 `wallet_sendCalls`, assuma que o patrocínio de gas e as chaves de sessão se tornarão recursos normais da carteira e trate as chaves de acesso e os fluxos de recuperação como parte da superfície de UX da conta, em vez de gambiarras de integração separadas.

## O que vem a seguir {#whats-next}

A próxima atualização nomeada do Ethereum é Glamsterdam, com Listas de Acesso em Nível de Bloco (BALs) e a separação propositor-construtor (PBS) consagrada (ePBS) como itens principais. Juntos, eles tornam seguro aumentar o limite de gas do bloco dos 60 milhões atuais para cerca de 200 milhões, deixando mais capacidade na l1 para os construtores trabalharem. A ativação é esperada para o segundo semestre de 2026. Depois de Glamsterdam, planeja-se que [Hegotá](https://forkcast.org/upgrade/hegota/) venha a seguir, com as Listas de Inclusão Aplicadas por Escolha de Bifurcação (FOCIL) selecionadas como seu recurso principal.

Para os construtores, os itens que valem a pena acompanhar são mais capacidade na l1 (BALs), inclusão de transação mais confiável (FOCIL) e o caminho em direção à abstração de conta nativa. A ePBS, o outro destaque de Glamsterdam, é principalmente uma mudança de infraestrutura que remove uma dependência de confiança sob a inclusão de transações na l1. A mudança direta na superfície no nível do aplicativo é pequena.

As BALs servem para manter a l1 barata à medida que o uso cresce. Em termos simples, um bloco viria com um mapa das contas e do armazenamento que ele toca. Os clientes podem usar esse mapa para buscar dados antecipadamente e executar transações independentes em paralelo, o que torna mais seguro aumentar o limite de gas da l1 sem tornar os blocos muito lentos para verificar. O efeito prático para os construtores é que mais atividades podem voltar para a Mainnet sem recriar automaticamente o regime de gas de 2021 a 2023.

A FOCIL trata de colocar transações válidas em blocos, mesmo quando um produtor de bloco preferiria deixá-las de fora. Hoje, se a parte que está construindo um bloco ignora uma transação, o resto do protocolo tem maneiras limitadas de forçar sua inclusão. Com a EIP-7805, vários validadores diriam, na prática: "vimos essas transações válidas esperando na mempool pública". O próximo bloco então tem que incluí-las, ou os validadores podem se recusar a apoiar esse bloco. Para os construtores, isso é importante quando o acesso confiável à l1 faz parte do produto, incluindo ferramentas de privacidade, rampas de acesso regulamentadas ou aplicativos que atendem a usuários que podem ser filtrados por alguns provedores de infraestrutura.

Para os construtores de aplicativos, o item de Hegotá a ser observado mais de perto é a abstração de conta. A EIP-8141, Transações de Quadro (Frame Transactions), adicionaria um tipo de transação em que a validação, a execução e o pagamento de gas são divididos em quadros. Na prática, isso significa que uma conta inteligente poderia verificar uma transação por si mesma, definir suas próprias regras de assinatura, aprovar quem paga o gas e executar uma ou mais ações sem depender do EntryPoint da ERC-4337, empacotadores (bundlers) ou retransmissores (relayers) executados por aplicativos.

Isso muda as suposições do produto. O patrocínio de gas se torna um padrão de conta nativo em vez de uma infraestrutura que cada aplicativo precisa organizar separadamente. Esquemas de assinatura alternativos tornam-se mais facilmente suportados, incluindo chaves de acesso hoje e um caminho para longe do ECDSA se a migração pós-quântica se tornar necessária. Se a EIP-8141 ou um design semelhante de abstração de conta nativa for implementado, o modelo do construtor muda de "uma EOA assina uma transação" para "uma conta define como ela valida, paga e executa uma transação".

Essa é a direção, não uma promessa. A EIP-8141 é um Rascunho (Draft) e, a partir de maio de 2026, é apenas "considerada para inclusão" em Hegotá, o que significa que as equipes de clientes estão discutindo-a, mas não se comprometeram a lançá-la nessa atualização. O caminho prático de construção em 2026 para a UX de conta ainda é a EIP-7702 mais os fluxos de carteira da ERC-4337, mas os construtores devem projetar como se as contas programáveis estivessem se tornando o modelo de conta padrão.

## O que construir de forma diferente agora {#what-to-build-differently-now}

Comece verificando novamente as antigas suposições de taxas. Se o seu manual de implantação ainda trata a Rede Principal do Ethereum como um ambiente de 10 a 30 gwei por padrão, provavelmente está desviando muito trabalho da l1. Vale a pena considerar a Mainnet primeiro quando seu aplicativo depende de liquidez compartilhada, composabilidade com protocolos existentes, neutralidade ou estado de alto valor que deve viver onde a segurança e o consenso social do Ethereum são mais fortes.

Use as l2s pelos motivos que ainda importam, incluindo distribuição, volume de transações muito alto, ecossistemas específicos de aplicativos ou custos por ação que precisam ser o mais próximo possível de zero. O ponto não é "Mainnet para tudo". O ponto é que "a Mainnet é muito cara" não deve mais ser o primeiro filtro.

No lado da conta, construa com base nos recursos da carteira em vez de EOAs brutas. Seu frontend deve estar pronto para chamadas em lote, gas patrocinado, chaves de sessão, chaves de acesso e fluxos de recuperação que chegam por meio de carteiras. A EIP-7702 e a ERC-4337 são as ferramentas práticas hoje. A abstração de conta nativa é a direção a ser acompanhada a seguir.

Pare de tratar a Rede Principal do Ethereum como a cara camada de liquidação que você só toca no final, e pare de tratar as contas de usuário como chaves ECDSA estáticas que devem conter ETH antes que possam fazer qualquer coisa. O Ethereum em 2026 está se movendo em direção a uma execução mais barata na l1 e contas programáveis. Construa para esse mundo.

## Leitura adicional {#further-reading}

- [Anúncio da Mainnet Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Anúncio da Mainnet Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Atualização de Prioridades do Protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Ponto de verificação #9 (Abril de 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Diretrizes da Pectra 7702 no ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702: Definir Código para EOAs](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928: Listas de Acesso em Nível de Bloco](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805: Listas de Inclusão Aplicadas por Escolha de Bifurcação (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141: Transação de Quadro](https://eips.ethereum.org/EIPS/eip-8141)
- [Forkcast: Atualização Hegotá](https://forkcast.org/upgrade/hegota/)
- [Rastreador de Gas do Etherscan](https://etherscan.io/gastracker)
- [EIP-7773: Meta do Hardfork Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Roteiro de Glamsterdam no ethereum.org](https://ethereum.org/roadmap/glamsterdam/)