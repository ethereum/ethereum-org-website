---
title: "Por que construir no Ethereum"
description: "Descentralização, resistência à censura, implantação não permissionada e composabilidade não são atrativos isolados. Eles se reforçam mutuamente. Um guia prático sobre por que os construtores devem escolher o Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "descentralização"
  - "resistência à censura"
  - "composabilidade"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: Por que construir no Ethereum
lang: pt-br
---

Construtores escolhem a infraestrutura pelas promessas que seus aplicativos precisam cumprir.

A maioria das promessas de software depende de um operador. Um provedor de nuvem mantém o servidor funcionando. Uma plataforma mantém a conta aberta. Um processador de pagamentos mantém o comerciante habilitado. Um provedor de API mantém a chave válida. Isso é aceitável para muitos produtos. Não é o suficiente quando o valor do produto depende de acesso neutro, estado compartilhado e compromissos que os usuários e outros desenvolvedores podem verificar por si mesmos.

O Ethereum é construído para o segundo caso, onde o acesso neutro e os compromissos verificáveis são o produto. Ninguém é dono dele. A cadeia roda em muitos países, com muitos operadores e múltiplas implementações independentes de clientes, e nenhuma empresa, validador ou fundação pode reescrever as regras silenciosamente. Para um construtor, isso significa que não é apenas um lugar para hospedar código. É um lugar para assumir compromissos públicos. Você pode lançar sem pedir a ninguém, os usuários podem continuar acessando o que você implanta, outros desenvolvedores podem construir sobre isso sem a sua permissão, e seu aplicativo pode continuar funcionando mesmo quando qualquer uma das partes, incluindo você, parar de cooperar.

## Descentralização {#decentralization}

A descentralização é a base sobre a qual essas propriedades se sustentam. O Ethereum a entrega por meio de uma rede de computadores, chamados de nós, que armazenam uma cópia da cadeia e verificam cada transação. Cada nó executa um software de cliente. Um subconjunto de nós, chamados de validadores, se revezam propondo e confirmando novos blocos por meio de um processo chamado consenso. Para participar, os validadores colocam ETH como colateral, chamado de stake, que eles perdem se quebrarem as regras. Cerca de 13.700 a 14.000 nós foram rastreados no rastreador de nós do Etherscan em abril de 2026, distribuídos pelos Estados Unidos, Alemanha, China, Reino Unido, Rússia, Japão e dezenas de outros países.

A descentralização também é econômica. Cerca de 32 a 36 milhões de ETH, em torno de 27 a 29% do fornecimento, estão em stake como colateral que o protocolo corta quando os validadores comprovadamente se comportam mal. Um invasor precisaria adquirir e arriscar uma fração significativa desse stake para corromper a cadeia. Aos preços do ETH de abril de 2026, isso significa que dezenas de bilhões de dólares estariam em risco.

A outra dimensão é o próprio software. Cada nó do Ethereum executa dois softwares lado a lado. Um cliente de execução roda a EVM e rastreia o estado do contrato. Um cliente de consenso lida com a Prova de Participação (PoS). Ele rastreia quais validadores propõem blocos, quais blocos a rede aceita e quando um bloco atinge a finalidade. Uma descentralização saudável precisa de múltiplas implementações independentes de cada um, para que um bug em um cliente não se torne automaticamente um bug no Ethereum.

A camada de execução tem cinco clientes principais em produção. O Geth roda em cerca de 50%, o Nethermind em torno de 25%, o Besu em torno de 9%, o Reth em torno de 8% e o Erigon em torno de 7%. A camada de consenso roda no Lighthouse, Prysm, Teku, Nimbus, Lodestar e outros clientes. O Ethereum não é uma cadeia de cliente único em nenhuma das camadas.

A participação de quase 50% do Geth é a verdadeira fragilidade. Um bug em um cliente minoritário é doloroso para seus operadores, mas o resto da rede pode continuar. Um bug grave em um cliente majoritário é mais perigoso. É por isso que a diversidade de clientes é uma prioridade operacional contínua.

Essa prioridade foi testada. O Ethereum nunca teve uma interrupção total da cadeia desde a sua gênese em 30 de julho de 2015. O mais perto que chegou de um grande incidente foi em 11 a 12 de maio de 2023, quando a camada de consenso, chamada de Beacon Chain, falhou em finalizar por cerca de 25 minutos e, mais tarde, por cerca de 64 minutos. A causa foi um bug no cliente Prysm. A finalidade exige que mais de dois terços dos validadores atestem, e a participação do Prysm na época era alta o suficiente para que seu problema puxasse brevemente a rede para baixo desse limite.

Uma paralisação na finalidade não é o mesmo que uma interrupção da cadeia. Novos blocos continuaram sendo produzidos, transações continuaram sendo incluídas e a maioria dos usuários e aplicativos continuou funcionando. O que paralisou foi a garantia de liquidação mais forte do Ethereum. Sob suposições normais de consenso, um bloco com mais de 13 minutos não pode ser revertido. Pontes, exchanges e outros sistemas que esperam pela finalidade antes de creditar depósitos teriam pausado esses fluxos. A própria cadeia se recuperou automaticamente assim que validadores suficientes se atualizaram, sem intervenção manual.

Para os construtores, essa história é importante. Se outras pessoas vão manter ativos em seus contratos, rotear ordens através do seu mercado ou construir sobre a sua primitiva, elas precisam que a base por baixo continue funcionando em meio a bugs, falhas de clientes e pressão institucional.

## Resistência à censura {#censorship-resistance}

A descentralização é a estrutura. A resistência à censura é uma das coisas práticas que ela proporciona. Os usuários não devem precisar de permissão de uma empresa, governo, retransmissor, validador, provedor de RPC ou operador de aplicativo para enviar uma transação válida para seus contratos.

Isso não significa que toda transação entra no próximo bloco. Significa que nenhuma parte isolada pode manter uma transação válida fora da cadeia para sempre. Cada bloco é proposto por um validador diferente, que trabalha com partes externas, chamadas de construtores e retransmissores, para montá-lo. Se um deles filtrar sua transação, o próximo slot terá um conjunto diferente e, eventualmente, um deles a incluirá. A censura tem que persistir por todo esse elenco rotativo, o que é muito mais difícil do que um único operador dizendo não. O período pós-Tornado Cash mostrou como isso se parece sob pressão.

O Tornado Cash é um contrato de mixagem de privacidade que quebra o vínculo onchain entre depósito e saque. Depois que a OFAC o sancionou em agosto de 2022, vários dos principais retransmissores do MEV-Boost se recusaram a encaminhar blocos contendo transações de endereços sancionados. A proporção de blocos construídos por meio desses retransmissores em conformidade com a OFAC atingiu um pico de quase 79% em novembro de 2022. Os outros 21% vieram de retransmissores e construtores que não filtravam, então as transações do Tornado Cash ainda entravam, apenas mais devagar. A espera esperada subiu de cerca de 12 segundos para cerca de um minuto.

Isso parecia alarmante, e era. Então a proporção caiu. Novos retransmissores foram lançados explicitamente sem filtros, incluindo Ultra Sound e Agnostic, e os proponentes estavam livres para adicioná-los à sua configuração do MEV-Boost. Ninguém poderia forçar todos os proponentes a usar um retransmissor com filtro, então a proporção não poderia permanecer em seu pico. No início de 2023, estava abaixo de 50% e, durante o resto de 2023, variou entre 27% e 47%. A OFAC removeu o Tornado Cash da lista de sanções em março de 2025. O episódio continua sendo o teste de estresse de resistência à censura mais claro do Ethereum.

O Ethereum também está movendo mais dessa garantia para o próprio protocolo. Uma atualização planejada chamada FOCIL (EIP-7805) adiciona listas de inclusão. Validadores selecionados aleatoriamente publicam transações que veem na mempool pública, e espera-se que o próximo bloco satisfaça essas listas. Se um bloco as ignorar, o resto da rede pode rejeitá-lo. Portanto, ninguém pode impedir seus usuários de usar seu aplicativo.

## Não permissionado {#permissionless}

A resistência à censura tem a ver com a capacidade dos usuários de continuarem acessando seu aplicativo depois que você o lança. Ser não permissionado tem a ver com a possibilidade de você lançá-lo em primeiro lugar.

Fazer o deploy no Ethereum não exige uma parceria, conta, aprovação de listagem, revisão de loja de aplicativos ou acordo comercial. Qualquer pessoa pode implantar código, chamar um contrato, executar um nó, indexar dados, construir uma carteira ou publicar uma interface. A camada base não sabe se você é uma startup, um banco, um desenvolvedor solo, um agente, uma DAO ou um usuário sem nenhuma empresa.

Isso muda o modelo do construtor. Em uma plataforma, o proprietário da plataforma pode alterar os termos, revogar chaves, bloquear regiões, remover aplicativos ou condicionar o acesso a um relacionamento comercial. No Ethereum, o protocolo avalia as transações pelas mesmas regras públicas para qualquer chamador. Um contrato implantado hoje funciona de acordo com essas regras públicas para todos os endereços, desde que a cadeia continue funcionando.

Isso não remove todas as dependências. A maioria dos usuários não acessa seus contratos diretamente. Eles passam por um frontend, uma carteira e um provedor de RPC, e qualquer uma dessas camadas pode quebrar ou filtrar. Frontends podem ser retirados do ar. Provedores de RPC, os serviços que roteiam a maioria das solicitações de aplicativos e carteiras para a cadeia, podem se recusar a encaminhar transações ou bloquear regiões e endereços específicos. As carteiras podem escolher o que exibem.

O ambiente de execução base permanece aberto por baixo. Se o seu frontend cair, um usuário ainda pode chamar o contrato diretamente, e outro desenvolvedor pode construir uma nova interface. Se uma carteira parar de suportar o seu token, o contrato ainda funciona. Se um provedor de RPC filtrar, um aplicativo pode rotear através de outro ou executar seu próprio nó para alcançar a rede.

## Composabilidade {#composability}

A natureza não permissionada coloca seu código na cadeia. Uma vez lá, ninguém pode retirá-lo, então outros desenvolvedores podem construir em cima dos seus contratos, e você pode construir nos deles.

O WETH é o exemplo mais claro. É um contrato que empacota o ETH para que ele possa ser usado como um token padrão em outros contratos. Ele fica em um endereço fixo do Ethereum, detém cerca de 1,8 milhão de WETH em maio de 2026, tem aproximadamente 3,25 milhões de detentores e atua como uma unidade comum em DEXs, mercados de empréstimo, cofres e pontes. É um código que milhares de outros contratos e aplicativos podem usar diretamente.

Esse padrão se repete em todo o ecossistema. Da gênese ao início de 2025, o Ethereum viu dezenas de milhões de implantações de contratos e cerca de 2,5 milhões de bytecodes exclusivos, de acordo com a contagem da Zellic. Padrões como o ERC-20 para tokens fungíveis e o ERC-721 para tokens não fungíveis (NFTs) tornaram-se camadas de coordenação. Um token que seu contrato emite pode ser negociado em uma DEX, usado como colateral para empréstimo em um mercado monetário, indexado por ferramentas de análise, exibido em carteiras e transferido por ponte ou empacotado por outros sistemas sem que cada equipe negocie um acordo personalizado.

Em maio de 2026, cerca de US$ 46 bilhões estavam em finanças descentralizadas (DeFi) no Ethereum. Esse dinheiro está bloqueado dentro de milhares de protocolos em funcionamento, incluindo ativos, mercados, oráculos, carteiras, sistemas de contas, contratos de governança, pontes, análises e ferramentas de desenvolvedor. Tudo isso é código que você pode chamar diretamente no primeiro dia, em vez de construir do zero ou esperar por parcerias.

## A economia dos agentes {#the-agent-economy}

O acesso não permissionado e a resistência à censura, com a descentralização por baixo deles, importam ainda mais para a próxima onda de usuários que entram no Ethereum. Os agentes de IA são essa onda, e eles pagam por serviços, mantêm capital e fazem a liquidação com outros agentes por meio de transações e chamadas de contrato, tudo sem um humano no circuito. Um agente não tem cartão para cobrar, nenhuma conta de plataforma para suspender e nenhum humano para ligar quando um retransmissor se recusa a encaminhar uma transação. É por isso que ambos deixam de ser opcionais para esse tipo de software, e as propriedades do Ethereum são uma correspondência direta para o que um agente realmente precisa. O Ethereum é onde se espera que essa economia se desenrole, e isso pode aumentar imensamente a base de usuários.

Quer você lance o agente ou lance os contratos que o agente chama, os mesmos problemas aparecem. Em uma pilha hospedada típica, a identidade do agente é alugada de uma conta de plataforma que pode ser revogada. Seus pagamentos dependem do cartão ou da chave de API de um humano. Suas regras são executadas em um servidor que um operador controla. Sua continuidade depende de um host que pode desaparecer. Cada uma dessas dependências é o que a camada base do Ethereum foi projetada para remover.

No Ethereum, nada disso depende de um operador. As chaves do agente são suas próprias, e as regras contra as quais ele assina não podem ser reescritas unilateralmente. Suas transações passam pelo mesmo elenco rotativo de validadores, construtores e retransmissores que protege qualquer outro endereço de bloqueio direcionado. As transições de estado acontecem em público, de modo que os contratos do outro lado da chamada não precisam confiar em um operador para relatar o que aconteceu.

Os trilhos já estão no lugar. Contratos inteligentes, stablecoins e abstração de conta dão a um ator autônomo um endereço funcional, um saldo funcional e limites de gastos programáveis hoje. Os padrões para identidade de agente e pagamentos nativos de máquina estão se atualizando. O ERC-8004 define registros onchain para identidade, reputação e validação de agentes. O x402 usa o código de status HTTP 402 para permitir que clientes, incluindo agentes, paguem APIs e serviços digitais em stablecoins sem contas tradicionais. A adoção é inicial, mas está em movimento, e a superfície de integração é pequena. Aceite pagamentos x402 em seus endpoints, registre ou verifique a identidade por meio do ERC-8004 e trate os endereços de agentes como usuários de primeira classe em seus contratos.

Para qualquer construtor escolhendo uma cadeia para lançar, os agentes são a próxima classe de usuários em formação, e os trilhos já estão ativos. Os contratos que você implanta hoje podem atendê-los amanhã sem esperar por um protocolo futuro.

## Conclusão {#conclusion}

Descentralização, resistência à censura, implantação não permissionada e composabilidade não são atrativos isolados. Eles se reforçam mutuamente. A descentralização torna a resistência à censura crível e permite que os usuários continuem acessando o que é lançado. A implantação não permissionada permite que os construtores façam lançamentos. A composabilidade transforma esses aplicativos em infraestrutura compartilhada. Agentes autônomos podem transacionar por meio dela e ninguém pode detê-los. O que você lança é um compromisso público. Ele continua funcionando sem você.

## Leitura adicional {#further-reading}

- [Checkpoint #9 da Fundação Ethereum (abril de 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Rastreador de Nós do Etherscan](https://etherscan.io/nodetracker)
- [validadores do beaconcha.in](https://beaconcha.in/charts/validators)
- [Post-mortem: finalidade da Mainnet em maio de 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: blocos em conformidade com a OFAC caem para 27%](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Proposta Hegotá Headliner: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Listas de Inclusão aplicadas por escolha de bifurcação (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Identidade de Agente Onchain](https://eips.ethereum.org/EIPS/eip-8004)
- [GitHub do coinbase/x402](https://github.com/coinbase/x402)
- [CoinDesk: a demanda pelo x402 não se materializou](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH no Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Todos os contratos do Ethereum](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: cadeia Ethereum](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Avaliação de Risco Técnico em Redes Blockchain (abril de 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)