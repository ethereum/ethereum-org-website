---
title: "A próxima grande carteira será privada"
description: "Sua carteira vê cada endereço que você possui, cada aplicativo descentralizado (dapp) ao qual você se conecta e cada solicitação que você faz. Essa mesma posição permite que ela proteja tudo isso. Uma visão prática das ferramentas de privacidade, padrões e ideias não lançadas que definirão a próxima geração de carteiras Ethereum."
author: "Elliott Alexander"
team: ""
tags:
  - "privacidade"
  - "carteiras"
  - "provas de conhecimento zero"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Próxima grande carteira"
lang: pt-br
---

Tire um instantâneo de dois minutos que você passa na sua carteira. Você abre o aplicativo, dá uma olhada no seu saldo, conecta-se a um aplicativo descentralizado (dapp) que estava querendo experimentar, aprova a transação que ele coloca na sua frente e envia a um amigo o ETH que você deve do almoço.

Nada nisso parece ser observado. Ninguém perguntou o seu nome. Você fecha o aplicativo e segue com o seu dia.

Agora vamos contar o que realmente vazou. Na inicialização, antes de você fazer qualquer coisa, uma pilha de serviços de análise descobriu seu endereço IP e que você usa essa carteira. O servidor pelo qual sua carteira lê a cadeia viu cada endereço que você possui, consultado a partir de um único IP — seu portfólio completo, perfeitamente agrupado para quem quer que guarde os logs. O dapp obteve seu endereço ativo, que é tudo o que alguém precisa para pesquisar todo o seu histórico. E o pagamento ao seu amigo é um registro público permanente unindo a sua carteira à dele.

Cada um desses vazamentos passou pelo mesmo software. A carteira carregou as análises, escolheu aquele servidor, entregou o endereço, construiu a transação. Mas a mesma posição funciona para os dois lados: a camada que vê tudo também é a camada que pode proteger tudo.

Muitas carteiras têm modelos de negócios baseados na coleta dessas informações, mas existem maneiras de fazer isso sem colocar os usuários em risco. Parte do que é necessário está na prateleira, funcionando e sendo ignorado. Parte disso ninguém descobriu ainda. Ambas as metades são a oportunidade, e quem quer que as assuma está construindo a próxima grande carteira.

## O que sua carteira revela onchain {#what-your-wallet-gives-away-onchain}

Comece onchain, com o que é público, não importa qual carteira você use. Um endereço não carrega nenhum nome, e esse único fato traz muito conforto. Mas cada pagamento que você recebeu, cada contrato que você tocou, o tamanho do seu saldo neste momento e a lista completa de todos com quem você já transacionou ficam abertos, livres para qualquer um consultar. Pseudonimato significa apenas que está arquivado sob um espaço reservado em vez do seu nome.

A defesa padrão é espalhar sua atividade por vários endereços, e a maioria dos usuários experientes faz isso. Isso ajuda menos do que pode parecer. Financie dois endereços da mesma fonte, ou deixe que eles paguem um ao outro uma vez, e para qualquer um executando análise de cluster, eles colapsam em uma única entidade.

Lá em 2020, [um estudo](https://fc20.ifca.ai/preproceedings/31.pdf) dos primeiros quatro anos do Ethereum já conseguia agrupar 17,9% de todas as contas de propriedade externa ativas, revelando mais de 340.000 entidades controlando múltiplos endereços. Isso foi há seis anos e um boom de IA atrás. Sua separação cuidadosa está a poucos passos de ser desfeita.

Mais cedo ou mais tarde, o cluster fica vinculado a uma pessoa real. Registre um nome ENS que ecoe seu nome de usuário nas redes sociais, faça um saque uma vez de uma corretora que guarda a digitalização do seu passaporte, ou seja pago por alguém que mantém endereços rotulados em uma planilha, e o cluster deixa de ser abstrato.

Vazamentos de dados também fazem a sua parte — um e-mail vazado junto com um endereço residencial, correspondido a um nome ENS que se parece com o e-mail. Nada disso exige mais uma intimação ou um especialista. A IA transformou a triagem de milhões de registros em busca de uma boa correspondência em um trabalho que roda da noite para o dia, e o custo está em declínio constante.

## O que sua carteira revela antes de você transacionar {#what-your-wallet-gives-away-before-you-transact}

O rastro onchain pelo menos exigia que você transacionasse. O rastro offchain começa mais cedo. No início de 2026, um pesquisador [passou treze carteiras populares por um farejador de pacotes (packet sniffer)](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) em um dispositivo limpo e registrou o que cada uma fez na primeira inicialização, antes que qualquer conta existisse. A carteira média contatou cerca de quatorze domínios. A pior contatou 26 domínios em 41 endereços IP, incluindo chamadas de infraestrutura de saldo para três provedores separados, para um usuário que ainda não havia criado uma carteira. Outra carteira no teste enviou um serviço de impressão digital de dispositivo (device-fingerprinting) junto com oito subdomínios de atribuição de marketing.

Tudo isso são pilares comuns de aplicativos de consumo — análises, relatórios de falhas, atribuição de marketing —, mas isso não é Candy Crush, é um aplicativo cuja proposta é a autossoberania. O mesmo teste encontrou [uma carteira](https://cakewallet.com/) que não enviou absolutamente nada na primeira inicialização: zero pacotes, zero solicitações DNS. Nada em uma carteira exige essa tagarelice.

Depois, há o vazamento que nunca se fecha. Sua carteira não guarda uma cópia da cadeia; sempre que lê um saldo ou envia uma transação, ela pergunta a um servidor chamado provedor RPC (Chamada de Procedimento Remoto). A menos que você execute seu próprio nó, cada solicitação passa por um desses, e o provedor padrão vê sua lista completa de endereços, seu IP e o momento de tudo o que você faz. Corresponder esse IP a um nome de assinante é uma solicitação de registros de rotina para um governo.

Quando o provedor padrão da MetaMask [reconheceu em 2022](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) que registrava IPs junto com endereços de carteira, a reação negativa o forçou a [reduzir a retenção para sete dias](https://consensys.io/blog/consensys-data-retention-update). Mérito a quem merece, mas esse remédio é uma política, e a arquitetura subjacente permanece inalterada: um servidor ainda recebe cada solicitação que você faz. E um log como esse não precisa ser solicitado para causar danos; ele só precisa existir. Bancos de dados são violados, vendidos e silenciosamente mesclados com outros, e um log que não significava nada por si só pode ser conectado a você anos depois de ter sido escrito.

O que se deve notar sobre toda essa camada é que o usuário nunca vê nada disso. Enviar dinheiro pelo menos coloca uma tela de confirmação na sua frente; os metadados não têm tela. Ninguém aprova sua lista de endereços viajando com seu IP, e nenhum prompt de assinatura cobre análises.

Esses padrões saíram do manual padrão de aplicativos de consumo — infraestrutura sólida, relatórios de falhas úteis, métricas de crescimento — aplicados sem muito pensamento a um aplicativo que guarda o dinheiro das pessoas. O que é a parte encorajadora: cada vazamento mencionado nesta seção remonta a uma decisão que um construtor de carteira pode tomar.

## Quem está olhando {#whos-looking}

Comece com os espectadores que você menos desejaria. Os criminosos descobriram que um livro-razão público funciona também como um catálogo de pessoas cujas economias podem ser tomadas à força. Ataques de chave inglesa (wrench attacks) — roubos onde a chave é extraída através de violência ou ameaça — [saltaram 75% em 2025](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), e as vítimas perderam cerca de [US$ 101 milhões apenas nos primeiros quatro meses de 2026](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report). E o padrão mudou para o que os investigadores chamam de direcionamento baseado em dados, onde os invasores traçam o perfil dos ativos de uma vítima onchain antes mesmo de baterem à porta. Em mais da metade dos incidentes recentes, eles chegaram a um cônjuge, um filho ou um pai como forma de alavancagem. Um saldo de carteira que rastreia de volta até a sua porta da frente é um convite permanente para criminosos.

Depois, há os espectadores com distintivos. Um livro-razão transparente é um sistema de vigilância que nenhum governo precisa construir: um registro completo de quem pagou a quem, quando e quanto, exposto em público, a uma consulta de distância sem necessidade de intimação. O quanto isso deve preocupar você depende de quem o governa, e para milhões de pessoas a resposta é um governo que pune uma doação ao partido de oposição, uma assinatura de VPN ou economias mantidas em uma moeda que o estado não pode imprimir.

Para esses usuários, a exposição financeira é o modelo de ameaça, e os padrões da carteira decidem o quão expostos eles estão.

Ambos os tipos de espectadores estão recebendo a mesma atualização. A IA está tornando a vigilância mais barata a cada ano, e tudo o que já foi escrito na cadeia permanece escrito, disponível para qualquer nova técnica de análise que venha a seguir. Nada disso é uma acusação ao livro-razão público; a transparência é o que permite que qualquer um verifique a cadeia. A exposição vive no rastro que conecta o registro a você — os padrões de financiamento, os endereços reutilizados, os logs do servidor.

As carteiras deixaram esse rastro no lugar até agora porque deixá-lo é o caminho de menor resistência, tanto para o software quanto para o usuário. É também exatamente a coisa que uma carteira está posicionada para dissolver.

## Por que a carteira é onde a privacidade é consertada {#why-the-wallet-is-where-privacy-gets-fixed}

É justo perguntar por que algo disso é trabalho da carteira. Existem [explorações ativas em direção à privacidade](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) na camada base do Ethereum, e o protocolo pode eventualmente carregar parte desse peso. Mas a cadeia é atualizada através de bifurcações rígidas, duas por ano na melhor das hipóteses, e as mudanças relevantes para a privacidade se espalharão por várias delas. Esse é um cronograma medido em anos e decidido por um processo que não deve ser apressado.

Enquanto isso, os indivíduos estão decidindo agora mesmo se é seguro ser pago onchain, doar, manter economias lá. Eles precisam de privacidade que chegue mais rápido do que o processo de consenso social do Ethereum e o cronograma de bifurcação podem fornecer.

A camada de aplicativo tem o formato errado para o problema. Mesmo que cada dapp lançasse seu próprio recurso de privacidade, cada um só poderia proteger a atividade dentro de suas próprias paredes, à sua própria maneira, com suas próprias peculiaridades e segredos para o usuário gerenciar. O que expõe você são as conexões que percorrem todos eles — os endereços compartilhados, os rastros de financiamento, os links de volta para você — e essas conexões vivem no espaço entre os aplicativos. Resolver a privacidade aplicativo por aplicativo significa resolvê-la em todos os lugares, exceto onde o problema realmente está. Os dapps não são onde a verdadeira solução pode viver.

Isso deixa a carteira. É o único software que vê cada dapp ao qual você se conecta, cada endereço que você controla e cada solicitação que você faz. A mesma visibilidade que torna uma carteira com vazamentos tão custosa é o que permite que uma carteira cuidadosa coordene a privacidade em tudo o que você faz: escolhendo qual endereço fica de frente para qual aplicativo, roteando leituras para que nenhum servidor obtenha o quadro completo, realizando a contabilidade que os protocolos de privacidade exigem.

E esses protocolos estão mais avançados do que a maioria dos construtores supõe. O [Railgun](https://railgun.org/) processou mais de [US$ 5 bilhões em volume acumulado](https://dune.com/railgun_project/railgun) e detém cerca de [US$ 80 milhões hoje](https://defillama.com/protocol/railgun), ferramentas de endereços furtivos (stealth addresses) como o [Umbra](https://www.techflowpost.com/en-US/article/30477) geraram dezenas de milhares de endereços de uso único, e por [uma contagem](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) mais de 35 equipes estão buscando mais de uma dúzia de abordagens distintas para transferências privadas.

Nada disso é popular ainda, e peças estão genuinamente faltando. Mas os protocolos funcionam, dinheiro real se move através deles, e o que lhes falta é um lugar no fluxo principal do usuário. É aí que entra uma carteira com visão de futuro.

## O que uma carteira que preserva a privacidade realmente faz {#what-a-privacy-preserving-wallet-actually-does}

Remova o jargão e a maior parte do trabalho de privacidade é contabilidade. Use um endereço novo aqui, roteie o depósito por ali, guarde esta nota, espere antes de sacar, nunca deixe essas duas contas se tocarem. É uma disciplina na qual os humanos são ruins e para a qual o software é construído, e hoje ela recai quase inteiramente sobre o usuário.

Uma carteira que preserva a privacidade é aquela que faz a contabilidade por si mesma em vez de colocá-la no usuário. O usuário decide o que fazer; a carteira garante que fazer isso não deixe nenhum rastro de volta para ele.

Comece com o que está ativo. Pools blindados funcionam hoje: o Railgun mantém um saldo privado ao lado do seu público, e uma vez que os fundos estão dentro, um pagamento para fora não revela nada sobre seus outros ativos. Os custos são reais — taxas mais altas do que uma transferência simples, geração de provas medida em segundos, alguma dependência de retransmissores (relayers) —, mas o protocolo carregou bilhões em volume mesmo com essas compensações.

Combine isso com um hábito para o qual nenhum protocolo é necessário: um endereço novo para cada contraparte. Quando o usuário se conecta a um novo dapp, a carteira pode oferecer um endereço dedicado para ele, financiado a partir do saldo blindado, para que o aplicativo veja uma conta sem histórico e sem irmãos. Endereços furtivos ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) estendem o mesmo movimento para o recebimento de pagamentos. Misturadores (mixers) como o [Tornado Cash](https://tornadocash.eth.limo/) e o [Privacy Pools](https://privacypools.com/) fazem um trabalho mais simples e restrito: os fundos entram de um endereço e saem para outro, com o link entre os dois cortado. Essa é a ferramenta para financiar um endereço novo que ninguém pode rastrear até você — e a peça que falta é a carteira produzindo tal endereço sob demanda em vez de deixar o ritual para o usuário. Nada disso espera por uma bifurcação rígida ou uma bolsa de pesquisa. Espera por uma carteira disposta a realizar a contabilidade em nome dos usuários.

O lado da rede é principalmente decisões. Lançar com zero análises de terceiros é uma escolha, e pelo menos uma carteira no mercado já a fez. Sobre a exposição RPC, a maioria das carteiras já permite que você troque de provedores, então a opcionalidade existe, escondida em uma página de configurações que usuários avançados visitam e todos os outros nunca encontram.

O movimento não lançado é a separação: atribuir provedores diferentes a endereços diferentes para que nenhum servidor veja a lista completa, e colocar um proxy entre a carteira e o provedor para que o IP e os endereços nunca viajem juntos. Um cliente leve como o [Helios](https://github.com/a16z/helios) ou o [Colibri](https://github.com/corpus-core/colibri-stateless) permite que a carteira verifique as respostas que obtém em vez de aceitá-las com base na fé. Cada um desses custa algo em infraestrutura, latência ou tempo de engenharia, mas nenhum deles requer nova criptografia.

Depois, há a fronteira. Ler seus saldos hoje significa revelar seu conjunto de endereços para quem quer que atenda à consulta, e o trabalho para consertar isso está acontecendo agora mesmo: Ambientes de Execução Confiáveis (Trusted Execution Environments) combinados com RAM Alheia (Oblivious RAM), recuperação de informações privadas e clientes leves alcançando leituras totalmente privadas. Nada disso está estabelecido o suficiente para copiar de uma implementação de referência ainda, o que é exatamente o que o torna um terreno que vale a pena reivindicar.

O lado da escrita tem a mesma forma: transmissão ponto a ponto e mixnets impediriam que uma transação levasse seu IP para um servidor. As carteiras que implementarem essas peças primeiro são aquelas contra as quais o resto do campo será medido.

Aqui está o padrão, e note que é um padrão de experiência do usuário em vez de um de criptografia inovadora. Pegue a seção com a qual este artigo abriu — iniciar, conectar, aprovar, pagar — e mantenha-a reconhecidamente como aquela sessão. Haverá compensações; uma prova leva segundos para ser gerada, uma transferência blindada custa mais, e um ou dois conceitos novos podem precisar de um nome na interface.

O quão pequenas essas diferenças parecem é a arte da integração, e isso separará as carteiras que acertam nisso daquelas que tecnicamente o oferecem, mas de maneiras que dificultam a vida dos usuários. O que tem que mudar completamente: nenhuma análise é disparada no lançamento, cada novo dapp encontra um endereço sem histórico, e o pagamento a um amigo não revela nada sobre as contas por trás dele.

A privacidade que pede ao usuário para se tornar uma pessoa diferente nunca se espalha. Quando ela chega dentro de uma experiência que os usuários já entendem, é apenas uma carteira melhor.

## Ideias que valem a pena roubar {#ideas-worth-stealing}

Além dos fundamentos, há uma camada de recursos que, até onde posso dizer, ninguém lançou. Apenas algumas ideias, mas cada uma é o tipo de coisa que poderia tornar uma carteira a escolha óbvia.

Comece com o tempo. Conjuntos de anonimato precisam de tempo para crescer entre as etapas, e seus carimbos de data/hora (timestamps) divulgam silenciosamente mais do que você imagina — quando você está acordado, qual fuso horário você mantém, em quais dias você transaciona. Uma carteira poderia colocar na fila o que não for urgente e disparar em horários incomuns: o depósito de blindagem é liquidado durante a noite, os fundos ficam prontos pela manhã, e nenhum ritmo da sua vida se forma onchain.

Depois, o botão fácil. Um usuário que aparece hoje está totalmente exposto — uma frase semente bem usada, anos de história por trás dela. Deixe-os inseri-la, e a carteira elabora um plano de migração para eles aprovarem — tanto para o Railgun, tanto para o Privacy Pools, ajuste a divisão como quiser. Mais tarde, sempre que fundos forem necessários abertamente, eles surgem prontos e não expostos: um endereço novo, uma hora incomum, uma quantia que não ecoa o que entrou. E muitas vezes não há necessidade de saída. Dentro do ecossistema do Railgun, um usuário pode transferir e negociar sem nunca vir à tona, economizando as taxas de saída além disso. Um usuário que era um livro aberto na segunda-feira é ilegível na sexta-feira, e tudo o que ele fez foi aprovar um plano.

Uma carteira também poderia fazer uma verificação (lint) de privacidade. As heurísticas de agrupamento na primeira metade deste artigo são públicas, então aponte-as para a própria transação pendente do usuário e avise antes da assinatura: este pagamento vinculará estas duas contas, este saque corresponde ao seu depósito até o centavo. As carteiras já simulam transações para capturar fundos drenados. Simular o que um espectador aprende é o mesmo movimento voltado para um risco diferente.

E mostre às pessoas o que o observador já vê. Um painel que executa análise de cluster nas próprias contas do usuário transforma uma ameaça abstrata em algo sobre o qual os usuários sentem a necessidade de agir: esses cinco endereços são uma entidade para um observador, esta conta está limpa, este nome ENS conecta os dois. Isso também dá ao recurso do botão fácil mencionado acima o seu antes e depois.

## Passos de ação {#action-steps}

### Para construtores {#for-builders}

Cada seção deste artigo termina no mesmo lugar: uma escolha que a carteira pode fazer.

A maneira de fazer essas escolhas são padrões sensatos que o usuário pode substituir, cada um deles. O padrão deve ser o caminho privado, porque o padrão é com o que a maioria dos usuários viverá. Mas deixe aberto à opcionalidade liderada pelo usuário, porque um usuário que não pode apontar sua carteira para um servidor RPC diferente, ou para seu próprio nó, não recebeu realmente a soberania.

Você não precisa começar do zero. O [Kohaku SDK](https://github.com/ethereum/kohaku) empacota várias das primitivas neste artigo — saldos blindados, misturadores, clientes leves — para que uma carteira possa adotá-las sem reconstruir cada protocolo do zero. As peças estão na prateleira. Algumas coisas importam muito antes que alguém as peça. Ninguém viu massas fazendo petições por criptografia de ponta a ponta também; ela foi lançada como padrão, bilhões de pessoas a obtiveram sem perceber ou se importar, e agora um aplicativo de mensagens sem ela parece quebrado e violador.

Dinheiro que não pode ser usado para encontrar você, traçar seu perfil ou direcionar você pertence à mesma categoria. A carteira que o tratar dessa forma será a próxima grande carteira.

### Para usuários {#for-users}

A carteira que você usa é a que você está promovendo como norma. Escolha carteiras que levem sua privacidade e segurança a sério. Isso pode significar sacrificar a interface mais suave pela mais segura e privada. No momento, isso provavelmente significa acompanhar as novidades no [Walletbeat](https://www.walletbeat.fyi/), ver quais carteiras estão fazendo uma mudança em direção à habilitação da privacidade do usuário e reservar um tempo para experimentá-las.

## Para exploração adicional {#for-further-exploration}

- [Placar de privacidade de carteiras](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - Exposição de rede na primeira inicialização de 13 carteiras
- [ERC-5564: Endereços Furtivos (Stealth Addresses)](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) e [Tornado Cash](https://tornadocash.eth.limo/)
- Clientes leves [Helios](https://github.com/a16z/helios) e [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku) - SDK de privacidade para construtores de carteiras
- [Walletbeat](https://www.walletbeat.fyi/) - Como as carteiras existentes se comparam