---
title: Glossário do Ethereum
description: Um glossário incompleto de termos técnicos e não técnicos relacionados ao Ethereum
lang: pt-br
sidebarDepth: 2
---

# Glossário {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### Ataque de 51% {#51-attack}

Um tipo de ataque em uma [rede descentralizada](#network), durante a qual um grupo obtém o controle da maioria dos [nós](#node). Isso permitiria que eles fraudassem a cadeia de blocos revertendo [transações](#transaction) e gastando duplamente [ether](#ether) e outros tokens.

## A {#section-a}

### conta {#account}

Um objeto contendo um [endereço](#address), um saldo, [um nonce](#nonce), bem como armazenamento e código opcionais. Uma conta pode ser uma [conta de contrato](#contract-account) ou uma [conta de propriedade externa (EOA)](#eoa).

<DocLink href="/developers/docs/accounts">
  Contas Ethereum
</DocLink>

### endereço {#address}

Geralmente, isso representa um [EOA](#eoa) ou [contrato](#contract-account) que pode receber (endereço de destino) ou enviar (endereço de origem) [transações](#transaction) na cadeia de blocos. Mais especificamente, são os 160 bits mais à direita de um [hash Keccak](#keccak-256) de uma [chave pública](#public-key) [ECDSA](#ecdsa).

### interface binária de aplicação (ABI) {#abi}

A maneira padrão de interagir com [contratos](#contract-account) no ecossistema Ethereum, tanto de fora da cadeia de blocos quanto para interações contrato a contrato.

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  IAB
</DocLink>

### application programming interface {#api}

Uma Interface de Programação de Aplicativo (API) é um conjunto de definições sobre como usar um software. Uma API fica entre um aplicativo e um servidor web e facilita a transferência de dados entre eles.

### CIAEs {#asic}

Circuito integrado de aplicação específica. Isso geralmente se refere a um circuito integrado, construído sob medida para mineração de criptomoedas.

### asserção {#assert}

Em [Solidity](#solidity), `assert(false)` compila para `0xfe`, um código de operação inválido que usa todo o [gás](#gas) restante e reverte todas as mudanças. Quando o comando `assert()` falhar, algo muito errado e inesperado está acontecendo, e você precisará corrigir seu código. Você deve usar `assert()` para evitar condições que nunca deveriam ocorrer.

<DocLink href="/developers/docs/smart-contracts/security/">
  Segurança do contrato inteligente
</DocLink>

### atestação {#attestation}

Uma afirmação feita por uma entidade de que algo é verdade. No contexto do Ethereum, os validadores de consenso devem afirmar o que eles acreditam ser o estado da cadeia. Em momentos determinados, cada validador é responsável por publicar diferentes atestações que declaram formalmente a visão deste validador da cadeia, incluindo o último ponto de verificação finalizado e a cabeça atual da cadeia.

<DocLink href="/developers/docs/consensus-mechanisms/pos/attestations/">
  Atestações
</DocLink>

<Divider />

## B {#section-b}

### Taxa Base {#base-fee}

Cada [bloco](#block) tem um preço de reserva conhecido como "taxa base". É a taxa mínima de [gás](#gas) que o usuário deve pagar para incluir uma transação no próximo bloco.

<DocLink href="/developers/docs/gas/">
  Gás e taxas
</DocLink>

### Beacon Chain {#beacon-chain}

A Beacon Chain foi a cadeia de blocos que apresentou o conceito de [prova de participação](#pos) e [validadores](#validator) para o Ethereum. Ela era executada em paralelo com a prova de trabalho da Rede principal Ethereum desde dezembro de 2020, até que as duas cadeias foram fusionadas em setembro de 2022 para formar o Ethereum de hoje.

<DocLink href="/roadmap/beacon-chain/">
  Beacon Chain
</DocLink>

### big-endian {#big-endian}

Uma representação de números posicionais, na qual o algarismo mais significativo é o primeiro na memória. O oposto do "little-endian", no qual o dígito menos significativo é o primeiro.

### bloco {#block}

Um bloco é uma unidade de informação agregada que inclui uma lista ordenada de transações e informações relacionadas ao consenso. Blocos são propostos pelos validadores de prova de participação e, em que ponto eles são compartilhados em toda a rede ponto a ponto, na qual eles podem ser facilmente verificados de modo independente por todos os outros nós. As regras de consenso regem quais conteúdos de um bloco são considerados válidos, e todos os blocos inválidos são ignorados pela rede. A ordem desses blocos e as transações nela criam uma cadeia de eventos determinística, com o fim representando o estado atual da rede.

<DocLink href="/developers/docs/blocks/">
  Blocos
</DocLink>

### explorador de blocos {#block-explorer}

Uma interface que permite que um usuário procure informação de e sobre uma cadeia de blocos. Isso inclui a recuperação de transações individuais, atividade associada a endereços específicos e informações sobre a rede.

### cabeçalho do bloco {#block-header}

O cabeçalho do bloco é uma coleção de metadados sobre um bloco e um resumo das transações incluídas na carga de execução.

### propagação de blocos {#block-propagation}

O processo de transmissão de um bloco confirmado para todos os outros nós da rede.

### proponente de bloco {#block-proposer}

O validador específico escolhido para criar um bloco em um determinado [espaço](#slot).

### recompensa de bloco {#block-reward}

A quantidade de ether recompensada ao proponente de um novo bloco válido.

### estado do bloco {#block-status}

Os estados em que um bloco pode existir. Os estados possíveis incluem:

- proposto: o bloco foi proposto por um validador
- programado: os validadores estão enviando dados no momento
- ausente/ignorado: o proponente não propôs um bloco dentro do período de tempo elegível.
- órfão: o bloco foi reorganizado pelo [algoritmo de escolha de bifurcação](#fork-choice-algorithm)

### tempo de bloco {#block-time}

O intervalo de tempo entre blocos sendo adicionados à cadeia de blocos.

### validação de bloco {#block-validation}

O processo de verificação de que um novo bloco contém transações e assinaturas válidas, construídas sobre a cadeia histórica mais pesada, e que seguem todas as outras regras de consenso. Blocos válidos são adicionados ao fim da cadeia e propagados a outros na rede. Blocos inválidos são ignorados.

### cadeia de blocos {#blockchain}

Uma sequência de [blocos](#block), cada um se conectando ao seu antecessor até o [bloco de início](#genesis-block), fazendo referência ao hash do bloco anterior. A integridade da cadeia de blocos é economicamente protegida com a ajuda de um mecanismo de consenso baseado em prova de participação.

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  O que é uma cadeia de blocos?
</DocLink>

### nó de inicialização {#bootnode}

Os nós que podem ser usados para iniciar o processo de descoberta ao executar um nó. Os pontos de extremidade desses nós são salvos no código-fonte do Ethereum.

### bytecode {#bytecode}

Um conjunto de instruções abstratas, projetado para uma execução eficiente por um interpretador de software ou uma máquina virtual. Ao contrário do código-fonte legível, o bytecode é expresso em formato numérico.

### Bifurcação Byzantium {#byzantium-fork}

A primeiro das duas ["bifurcações permanentes"](#hard-fork) para o estágio de desenvolvimento do [Metropolis](#metropolis). Isso inclui o atraso da [bomba de dificuldade](#difficulty-bomb) e a redução de recompensa por bloco do Metropolis EIP-649, em que a [Ice Age](#ice-age) foi atrasada por 1 ano e a recompensa de bloco foi reduzida de 5 para 3 ethers.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG é um protocolo de consenso de prova de participação usado em conjunto com o algorítimo de escolha de bifurcação [LMD-GHOST](#lmd-ghost) para permitir que [clientes de consenso](#consensus-client) concordem com a cabeça da Beacon Chain.

### ponto de verificação {#checkpoint}

A [Beacon Chain](#beacon-chain) tem um intervalo dividido em espaços (12 segundos) e épocas (32 espaços). O primeiro espaço em cada época é um ponto de verificação. Quando uma [grande maioria](#supermajority) de validadores atesta a ligação entre dois pontos de verificação, eles podem ser [fundamentados](#justification) e, em seguida, quando outro ponto de verificação é fundamentado sobre isso, eles podem ser [finalizados](#finality).

### compilação {#compiling}

Conversão de código escrito em uma linguagem de programação de alto nível (por exemplo, [Solidity](#solidity)) em uma linguagem de baixo nível (por exemplo, [bytecode](#bytecode) EVM).

<DocLink href="/developers/docs/smart-contracts/compiling/">
  Compilação de contratos inteligentes
</DocLink>

### comitê {#committee}

Um grupo de pelo menos 128 [validadores](#validator) atribuídos para validar blocos em cada espaço. Um dos validadores no comitê é o agregador, responsável por agregar as assinaturas de todos os outros validadores no comitê que concorda com uma atestação. Não confundir com [comitê de sincronização](#sync-committee).

### inviabilidade computacional {#computational-infeasibility}

Um processo é inviável do ponto de vista computacional se levar um tempo impraticavelmente longo (por exemplo, bilhões de anos) para ser realizado por qualquer pessoa que possa ter algum interesse em executá-lo.

### consenso {#consensus}

Quando a grande maioria dos nós da rede têm todos os mesmos blocos na sua melhor cadeia de blocos validada localmente. Não confundir com [regras de consenso](#consensus-rules).

### cliente de consenso {#consensus-client}

Clientes de consenso (como Prysm, Teku, Nimbus, Lighthouse, Lodestar) executam o algoritmo de consenso [prova de participação](#pos) do Ethereum, permitindo que a rede chegue a um acordo sobre a cabeça da Beacon Chain. Os clientes de consenso não participam de validação/transmissão de transações ou de execuções de transições de estado. Isso é feito pelos [clientes de execução](#execution-client).

### camada de consenso {#consensus-layer}

A camada de consenso do Ethereum é a rede de [clientes de consenso](#consensus-client).

### regras de consenso {#consensus-rules}

As regras de validação de bloco que os nós completos seguem para se manter em consenso com outros nós. Não confundir com [regras de consenso](#consensus).

### Considerado para inclusão (CPI) {#cfi}

Um [EIP](#eip) principal que ainda não está ativo na Rede principal e desenvolvedores de clientes são geralmente positivos para a ideia. Supondo que atenda a todos os requisitos para a inclusão da rede principal, ele pode ser potencialmente incluído em uma atualização de rede (não necessariamente a próxima).

### Bifurcação Constantinople {#constantinople-fork}

A segunda parte do estágio [Metropolis](#metropolis), originalmente planejada para meados de 2018. Espera-se incluir uma mudança para um algoritmo de consenso híbrido de [prova de trabalho](#pow)/[prova de participação](#pos), entre outras alterações.

### conta de contrato {#contract-account}

Uma conta que contém código que é executado sempre que recebe uma [transação](#transaction) de outra [conta](#account) ([EOA](#eoa) ou [contrato](#contract-account)).

### criação de contrato transacional {#contract-creation-transaction}

Uma [transação](#transaction) especial que inclui o código de inicialização de um contrato. O destinatário está definido como `null` e o contrato é implantado em um endereço gerado a partir do endereço de usuário e `nonce`. que é usado para registrar um [contrato](#contract-account) e registrá-lo na cadeia de blocos Ethereum.

### criptoeconomia {#cryptoeconomics}

A economia das criptomoedas.

## D {#section-d}

### Đ {#d-with-stroke}

Đ (D com traço) é usado em inglês arcaico, inglês médio, islandês e faroês para representar uma letra maiúscula "Eth". Ele é usado em palavras como ĐEV ou Đapp (aplicação descentralizada), em que Đ é a letra nórdica "eth". A letra maiúscula (Đ) também é usada para simbolizar a criptomoeda Dogecoin. Isso é comumente visto na literatura Ethereum mais antiga, mas atualmente é usado com menos frequência.

### DAG {#dag}

DAG significa Grafo de Direção Acíclica. É uma estrutura de dados composta por nós e ligações entre eles. Antes da Fusão, o Ethereum usou um DAG no algoritmo de [prova de trabalho](#pow), [Ethash](#ethash), mas não é mais usado na [prova de participação](#pos).

### Dapp {#dapp}

Aplicação descentralizada. No mínimo, trata-se de um [contrato inteligente](#smart-contract) e uma interface de usuário web. De forma mais ampla, um Dapp é um aplicativo Web construído sobre serviços de infraestrutura abertos, descentralizados e ponto-a-ponto. Além disso, muitos dapps incluem armazenamento descentralizado e/ou um protocolo e plataforma de mensagem.

<DocLink href="/developers/docs/dapps/">
  Introdução aos dapps
</DocLink>

### disponibilidade de dados {#data-availability}

A propriedade de um estado que permite que todos os nós conectados à rede possam baixar qualquer parte específica do estado que desejarem.

### descentralização {#decentralization}

O conceito de afastamento do controle e da execução dos processos de uma entidade central.

### organização autônoma descentralizada (DAOs) {#dao}

Uma empresa ou outra organização que opera sem gerenciamento hierárquico. DAO também pode se referir a um contrato chamado "The DAO" lançado em 30 de abril de 2016, que foi então hackeado em junho de 2016; isso finalmente motivou um [bifurcação permanente](#hard-fork) (apelidada de DAO) no bloco 1.192.000, que reverteu o contrato DAO hackeado e fez com que a Ethereum e o Ethereum Classic se dividissem em dois sistemas concorrentes.

<DocLink href="/dao/">
  Organizações autônomas descentralizadas (DAOs)
</DocLink>

### corretora descentralizada (DEX) {#dex}

Um tipo de [dapp](#dapp) que permite que você troque tokens com pares na rede. Você precisa de [ethers](#ether) para usar um (para pagar as [taxas de transação](#transaction-fee)), mas eles não estão sujeitos a restrições geográficas, como corretoras centralizadas – qualquer pessoa pode participar.

<DocLink href="/get-eth/#dex">
  Câmbios descentralizados
</DocLink>

### ação {#deed}

Ver [token não fungível (NFT)](#nft).

### contrato de depósito {#deposit-contract}

O caminho para participação na Ethereum. O contrato de depósito é um contrato inteligente no Ethereum que aceita depósitos de ETH e gerencia saldos validadores. Um validador não pode ser ativado sem depositar ETH neste contrato. O contrato requer ETH e dados de entrada. Esses dados de entrada incluem a chave pública validadora e a chave pública de saque, assinada pela chave privada do validador. Esses dados são necessários para que um validador seja identificado e aprovado pela rede de [prova de participação](#pos).

### DeFi {#defi}

Abreviação de "finanças descentralizadas", uma ampla categoria de [dapps](#dapp) que visa fornecer serviços financeiros apoiados pela cadeia de blocos, sem quaisquer intermediários, para que qualquer pessoa com conexão à internet possa participar.

<DocLink href="/defi/">
  Finanças descentralizadas (DeFi)
</DocLink>

### dificuldade {#difficulty}

Uma configuração geral de rede em redes de [prova de trabalho](#pow) que controla a média do cálculo necessário para encontrar um nonce válido. A dificuldade é representada pelo número de zeros à esquerda que são necessários no hash do bloco resultante para que ele seja considerado válido. Esse conceito está obsoleto no Ethereum desde a transição para a prova de participação.

### bomba de dificuldade {#difficulty-bomb}

Aumento exponencial planejado na definição da [dificuldade](#difficulty) da [prova de trabalho](#pow) projetada para motivar a transição para a [prova-de-participação](#pos), reduzindo as chances de uma [bifurcação](#hard-fork). A bomba de dificuldade foi descontinuada com a [transição para a prova de participação](/roadmap/merge).

### assinatura digital {#digital-signatures}

Uma pequena cadeia de dados que um usuário produz para um documento usando uma [chave privada](#private-key) de modo que qualquer pessoa com a [chave pública](#public-key), a assinatura e o documento correspondente possa verificar que (1) o documento foi "assinado" pelo proprietário daquela chave privada em particular, e (2) o documento não foi alterado depois de ter sido assinado.

<Divider />

### descoberta {#discovery}

O processo pelo qual um nó Ethereum encontra outros nós para se conectar.

### tabela de hash distribuída (DHT) {#distributed-hash-table}

Uma estrutura de dados contendo pares `(key, value)` usados por nós do Ethereum para identificar pontos para se conectar e determinar quais protocolos usar para se comunicar.

### gasto dobrado {#double-spend}

Uma bifurcação deliberada de cadeia de blocos, na qual um usuário com uma quantidade de poder de mineração/participação suficientemente grande envia uma transação movendo alguma moeda fora da cadeia (por exemplo, saindo em dinheiro fiduciário ou fazendo compras fora da cadeia) e reorganiza a cadeia de blocos para remover essa transação. Um gasto dobrado bem-sucedido deixa o invasor com seus ativos tanto na cadeira quanto fora dela.

## E {#section-e}

### algoritmo de assinatura digital de curva elíptica (ECDSA) {#ecdsa}

Um algoritmo criptográfico usado pelo Ethereum para garantir que os fundos só possam ser gastos pelos seus proprietários. É o método preferido para a criação de chaves públicas e privadas. Relevante para a geração do [endereço](#address) da conta e verificação da [transação](#transaction).

### criptografia {#encryption}

Criptografia é a conversão de dados eletrônicos em uma forma ilegível para qualquer pessoa, exceto para o proprietário da chave de descriptografia correta.

### entropia {#entropy}

No contexto da criptografia, falta de previsibilidade ou nível de aleatoriedade. Ao gerar informações secretas, como [chaves privadas](#private-key), os algoritmos geralmente dependem de uma fonte de entropia alta para garantir que a saída não seja previsível.

### época {#epoch}

Um período de 32 [espaços](#slot), cada espaço equivalendo a 12 segundos, totalizando 6,4 minutos. [Comitês](#committee) validadores são embaralhados a cada época por razões de segurança. Cada época tem uma oportunidade para a cadeia ser [finalizada](#finality). A cada validador são atribuídas novas responsabilidades no início de cada período.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prova de participação
</DocLink>

### equívoco {#equivocation}

Um validador enviando duas mensagens que se contradizem. Um exemplo simples é um remetente de uma transação enviando duas transações com o mesmo nonce. Outro é um proponente de blocos, propondo dois blocos na mesma altura de bloco (ou para o mesmo espaço).

### Eth1 {#eth1}

"Eth1" é um termo que se refere à Rede Principal Ethereum, uma cadeira de blocos de prova de trabalho existente. Esse termo já foi descontinuado e substituído por "camada de execução". [Saiba mais sobre essa mudança de nome](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Mais sobre as atualizações do Ethereum
</DocLink>

### Eth2 {#eth2}

"Eth2" é um termo que se refere a um conjunto de atualizações do protocolo Ethereum, incluindo a transição do Ethereum para a prova de participação. Esse termo foi descontinuado e substituído por "camada de consenso". [Saiba mais sobre essa mudança de nome](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Mais sobre as atualizações do Ethereum
</DocLink>

### Proposta de Melhoria do Ethereum (PME) {#eip}

Um documento de design que fornece informações para a comunidade Ethereum, descrevendo um novo recurso proposto, seus processos ou ambiente (consulte [ERC](#erc)).

<DocLink href="/eips/">
  Introdução às EIPs
</DocLink>

### Nomes de Serviço Ethereum (NSE) {#ens}

O registro NSE é um único [contrato](#smart-contract) central que fornece um mapeamento de nomes de domínio para proprietários e resolvedores, conforme descrito na [EIP](#eip) 137.

[Leia mais em ens.domains](https://ens.domains)

### cliente de execução {#execution-client}

Clientes de execução (anteriormente conhecidos como clientes Eth1), como Besu, Erigon, Go-Ethereum (Geth) e Nethermind, são encarregadas de processar e transmitir transações, bem como gerenciar o estado do Ethereum. Eles executam a computação de cada transação na [Máquina Virtual Ethereum](#evm) para garantir que as regras do protocolo sejam seguidas.

### camada de execução {#execution-layer}

A camada de execução do Ethereum é a rede de [clientes de execução](#execution-client).

### conta de propriedade externa (EOA) {#eoa}

Contas de propriedade externa (EOAs) são [contas](#account) controladas por [chaves privadas](#private-key), geradas tipicamente por meio de uma [frase semente](#hd-wallet-seed). Ao contrário dos contratos inteligentes, as contas de propriedade externa são contas sem qualquer código associado a elas. Normalmente, essas contas são gerenciadas com uma [carteira](#wallet).

### Solicitação para Comentários Ethereum (SCE) {#erc}

Uma etiqueta dada a alguns [EIPs](#eip) que tentam definir um padrão específico de uso do Ethereum.

<DocLink href="/eips/">
  Introdução às EIPs
</DocLink>

### Ethash {#ethash}

Um algoritmo de [prova de trabalho](#pow) que foi usado no Ethereum antes de ele ter mudado para [prova de participação](#pos).

[Leia mais](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)

### ether {#ether}

A criptomoeda nativa usada pelo ecossistema Ethereum, que cobre os custos de [gás](#gas) ao executar transações. Também escrito como ETH ou seu símbolo Ξ, o caractere maiúsculo Xi em grego.

<DocLink href="/eth/">
  Moeda para nosso futuro digital
</DocLink>

### eventos {#events}

Permite o uso de recursos de registro da [EVM](#evm). Os [Dapps](#dapp) podem detectar eventos e usá-los para acionar retornos de chamada JavaScript na interface do usuário.

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Eventos e Logs
</DocLink>

### Máquina Virtual Ethereum (EVM) {#evm}

Uma máquina virtual baseada em pilha que executa [bytecode](#bytecode). No Ethereum, o modelo de execução especifica como o estado do sistema é alterado, dada uma série de instruções em bytecode e uma pequena tupla de dados ambientais. Isso é especificado por meio de um modelo formal de uma máquina de estado virtual.

<DocLink href="/developers/docs/evm/">
  Máquina Virtual Ethereum
</DocLink>

### Linguagem de conjunto EVM {#evm-assembly-language}

Uma forma legível de [bytecode](#bytecode) da EVM.

<Divider />

## F {#section-f}

### função de reserva {#fallback-function}

Uma função padrão chamada na ausência de dados ou um nome de função declarado.

### faucet {#faucet}

Um serviço realizado por meio de [contrato inteligente](#smart-contract) que dispensa fundos na forma de um ether de teste gratuito que pode ser usado em uma rede de teste.

<DocLink href="/developers/docs/networks/#testnet-faucets">
  Faucets de rede de teste
</DocLink>

### finalidade {#finality}

Finalidade é a garantia de que um conjunto de transações não mudará antes de um determinado tempo e não poderá ser revertida.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalidade de prova de participação
</DocLink>

### finney {#finney}

Uma denominação de [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### bifurcação {#fork}

Uma mudança no protocolo causando a criação de uma cadeia alternativa, ou uma divergência temporal em dois caminhos de blocos potenciais.

### algoritmo de seleção de bifurcação {#fork-choice-algorithm}

O algoritmo usado para identificar a cabeça da cadeia de blocos. Na camada de execução, a cabeça da cadeia é identificada como a que possui a maior dificuldade total por trás dela. Isto significa que a verdadeira cabeça da cadeia é aquela que exigiu mais trabalho para minerar. Na camada de consenso, o algoritmo observa as atestações acumuladas dos validadores ([LMD_GHOST](#lmd-ghost)).

### prova de fraude {#fraud-proof}

Um modelo de segurança para certas soluções de [camada 2](#layer-2) no qual, para aumentar a velocidade, transações são [agrupadas](#rollups) em lotes e enviadas para o Ethereum em uma única transação. Elas são consideradas válidas, mas podem ser contestadas se houver alguma suspeita de fraude. Uma prova de fraude irá então executar a transação para ver se ocorreu uma fraude. Esse método aumenta a quantidade de transações possíveis, enquanto mantém a segurança. Alguns desses [agrupamentos](#rollups) usam [provas de validade](#validity-proof).

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Rollups otimistas
</DocLink>

### frontier {#frontier}

A fase inicial de testes de desenvolvimento do Ethereum, que durou de julho de 2015 a março de 2016.

<Divider />

## G {#section-g}

### gás {#gas}

Um combustível virtual usado no Ethereum para executar contratos inteligentes. A [EVM](#evm) usa um mecanismo de contabilidade para medir o consumo de gás e limitar o consumo de recursos de computação (veja [Turing completo](#turing-complete)).

<DocLink href="/developers/docs/gas/">
  Gás e taxas
</DocLink>

### limite de gás {#gas-limit}

A quantidade máxima de [gás](#gas) que um [bloco](#block) ou uma [transação](#transaction) pode consumir.

### preço do gás {#gas-price}

Preço em ether de uma unidade de gás especificada em uma transação.

### bloco de início {#genesis-block}

O primeiro bloco em uma [cadeia de blocos](#blockchain), usado para inicializar uma rede específica e suas criptomoedas.

### geth {#geth}

Go Ethereum. Uma das implementações mais importantes do protocolo Ethereum, escrita em Go.

[Leia mais em geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Diminutivo para gigawei, uma denominação de [ether](#ether), comumente utilizado para o preço do [gás](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### bifurcação permanente {#hard-fork}

Uma divergência permanente na [cadeia de blocos](#blockchain), também conhecida como uma mudança de "bifurcação permanente". Normalmente ocorre quando nós não atualizados não podem validar blocos criados por nós atualizados que seguem as [regras de consenso](#consensus-rules) mais recentes. Não deve ser confundido com bifurcação, bifurcação sutil, bifurcação de software ou bifurcação do Git.

### hash {#hash}

Uma impressão digital de tamanho fixo com uma entrada de tamanho variável, produzida por uma função hash. (Ver [keccak-256](#keccak-256)).

### taxa de hash {#hash-rate}

O número de cálculos de hash feitos por segundo pelos computadores que executam o software de mineração.

### Carteira HD {#hd-wallet}

Uma [carteira](#wallet) que usa o protocolo de transferência e criação de chave hierárquico determinístico (HD).

[Leia mais em github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD wallet seed {#hd-wallet-seed}

Um valor usado para gerar a [chave privada](#private-key) mestre e o código de cadeia mestre para uma [carteira](#wallet) HD. A semente de carteira pode ser representada por palavras mnemônicas, tornando mais fácil para os humanos copiar, fazer backup e restaurar as chaves privadas.

### homestead {#homestead}

A segunda fase de desenvolvimento do Ethereum, lançada em março de 2016 no bloco 1.150.000.

<Divider />

## I {#section-i}

### índice {#index}

Uma estrutura de rede destinada a otimizar a consulta de informações na [cadeia de blocos](#blockchain), fornecendo um caminho eficiente para sua fonte de armazenamento.

### Protocolo de Endereço de Intercâmbio de Cliente (ICAP) {#icap}

Uma codificação de endereço Ethereum que é parcialmente compatível com a codificação do Número de Conta Bancária Internacional (IBAN), oferecendo uma codificação versátil, com soma de verificação e interoperável para endereços Ethereum. Os endereços ICAP usam um novo código IBAN de um país fictício, o XE, abreviação de "eXtended Ethereum", como usado em moedas não jurisdicionais (por exemplo, XBT, XRP, XCP).

### Ice Age {#ice-age}

Uma [bifurcação permanente](#hard-fork) do Ethereum no bloco 200.000.000 para introduzir um aumento de [dificuldade](#difficulty) exponencial (também conhecida como [bomba de dificuldade](#difficulty-bomb)), motivando uma transição para a [prova de participação](#pos).

### ambiente integrado de desenvolvimento (IDE) {#ide}

Uma interface de usuário que normalmente combina um editor de código, compilador, tempo de execução e depurador.

<DocLink href="/developers/docs/ides/">
  Ambientes Integrados de Desenvolvimento
</DocLink>

### problema de código implantado imutável {#immutable-deployed-code-problem}

Quando o código de um [contrato](#smart-contract) (ou [biblioteca](#library)) é implantado, ele se torna imutável. As práticas de desenvolvimento de software padrão se baseiam na capacidade de corrigir possíveis bugs e adicionar novos recursos, então, isso representa um desafio para o desenvolvimento de contratos inteligentes.

<DocLink href="/developers/docs/smart-contracts/deploying/">
  Implantação de contratos inteligentes
</DocLink>

### transação interna {#internal-transaction}

Uma [transação](#transaction) enviada de uma [conta do contrato](#contract-account) para outra conta do contrato ou uma [EOA](#eoa) (consulte [mensagem](#message)).

<Divider />

### emissão

A cunhagem de um novo ether para recompensar a proposta de bloco, o certificado e a denúncia.

## K {#section-k}

### função de derivação de chave (KDF) {#kdf}

Também conhecido como um "algoritmo de expansão de senha", é usado por formatos de [repositório de chaves](#keystore-file) para proteger contra ataques de força bruta, dicionário e tabela de arco-íris na encriptação da frase secreta, realizando repetidamente o hash da frase secreta.

<DocLink href="/developers/docs/smart-contracts/security/">
  Segurança do contrato inteligente
</DocLink>

### repositório de chaves {#keyfile}

Cada par de chave privada/endereço de conta existe como um único arquivo de chave em um cliente Ethereum. Estes são arquivos de texto JSON que contêm a chave privada criptografada da conta, que só pode ser descriptografada com a senha digitada durante a criação da conta.

### keccak-256 {#keccak-256}

Função [hash](#hash) criptográfica usada no Ethereum. Keccak-256 foi padronizado como [SHA](#sha)-3.

<Divider />

## L {#section-l}

### camada 2 {#layer-2}

Uma área de desenvolvimento focada em melhorias de camadas em cima do protocolo Ethereum. Essas melhorias estão relacionadas às velocidades de [transação](#transaction), [taxas de transação](#transaction-fee) menores e privacidade de transações.

<DocLink href="/layer-2/">
  Camada 2
</DocLink>

### LevelDB {#level-db}

Um armazenamento de código aberto de valor-chave em disco, implementado como uma [biblioteca](#library) leve e de finalidade única, vinculado a várias plataformas.

### biblioteca {#library}

Um tipo especial de [contrato](#smart-contract) que não tem funções pagáveis, nenhuma função de contingência e sem armazenamento de dados. Portanto, não pode receber ou manter ether, nem armazenar dados. Uma biblioteca serve como código implantado anteriormente que outros contratos podem chamar para uma computação somente de leitura.

<DocLink href="/developers/docs/smart-contracts/libraries/">
  Bibliotecas de Contratos Inteligentes
</DocLink>

### cliente leve {#light-client}

Um cliente Ethereum que não armazena uma cópia local da [cadeia de blocos](#blockchain), nem valida blocos e [transações](#transaction). Ele oferece as funções de uma [carteira](#wallet) e pode criar e transmitir transações.

<Divider />

### LMD_GHOST {#lmd-ghost}

O [algoritmo de seleção de bifurcação](#fork-choice-algorithm) usado pelos clientes de consenso do Ethereum para identificar a cabeça da cadeia. LMD-GHOST é um acrônimo para "Latest Message Driven Greediest Heaviest Observed SubTree", o que significa que a cabeça da cadeia é o bloco com maior acumulação de [atestações](#attestation) em sua história.

## M {#section-m}

### Rede principal {#mainnet}

Esta é a principal [cadeia de blocos](#blockchain) pública do Ethereum. ETH real, valor real e consequências reais. Também conhecido como camada 1, quando se discute soluções de escalabilidade da [camada 2](#layer-2). (Ver também [rede de teste](#testnet)).

<DocLink href="/developers/docs/networks/">
  Redes Ethereum
</DocLink>

### memory-hard {#memory-hard}

Funções rígidas de memória são processos que experimentam uma redução drástica na velocidade ou viabilidade quando a quantidade de memória disponível até diminui ligeiramente. Um exemplo é o algoritmo de mineração do Ethereum [Ethash](#ethash).

### Árvore de Merkle Patricia {#merkle-patricia-tree}

Uma estrutura de dados usada no Ethereum para armazenar eficientemente pares de chave-valor.

### mensagem {#message}

Uma [transação interna](#internal-transaction) que nunca é serializada e enviada apenas dentro da [EVM](#evm).

### chamada de mensagem {#message-call}

O ato de enviar uma [mensagem](#message) de uma conta para outra. Se a conta de destino estiver associada ao código [EVM](#evm), a VM será iniciada com o estado desse objeto e a mensagem será aplicada.

### Metropolis {#metropolis}

A terceira fase de desenvolvimento do Ethereum, lançada em outubro de 2017.

### mineração {#mining}

O processo repetido de fazer hash de um cabeçalho de bloco enquanto incrementa um [nonce](#nonce) até o resultado conter um número arbitrário de zeros binários à esquerda. Este é o processo pelo qual novos [blocos](#block) são adicionados a uma [cadeia de blocos](#blockchain) de prova de trabalho. Essa era a maneira como o Ethereum era protegido antes de ter mudado para a [prova de participação](#pos).

### minerador {#miner}

Um [nó](#node) de rede que encontra a [prova de trabalho](#pow) válida para novos blocos, por repetidas passagens de hash (ver [Ethash](#ethash)). Os mineradores já não fazem parte do Ethereum – eles foram substituídos por validadores quando o Ethereum mudou para a [prova de participação](#pos).

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  Mineração
</DocLink>

### cunhagem {#mint}

Cunhagem é o processo de criar novos tokens e colocá-los em circulação para poderem ser utilizados. É um mecanismo descentralizado para criar um novo token sem o envolvimento da autoridade central.

<Divider />

## N {#section-n}

### rede {#network}

Referindo-se à rede Ethereum, uma rede ponto a ponto que propaga transações e blocos para todos os nós Ethereum (participante da rede).

<DocLink href="/developers/docs/networks/">
  Redes
</DocLink>

### taxa de hash da rede {#network-hashrate}

A [taxa de hash](#hashrate) coletiva produzida por toda uma rede de mineração. A mineração no Ethereum foi desligada quando o Ethereum mudou para a [prova de participação](#pos).

### token não fungível (NFT) {#nft}

Também conhecido como uma "ação", este é um padrão de token introduzido pela proposta ERC-721. Os NFTs podem ser rastreados e negociados, mas cada token é único e distinto; eles não são intercambiáveis como ETH e [tokens ERC-20](#token-standard). Os NFTs podem representar a propriedade de ativos digitais ou físicos.

<DocLink href="/nft/">
  Tokens Não Fungíveis (NFTs)
</DocLink>
<DocLink href="/developers/docs/standards/tokens/erc-721/">
  Norma de Token Não Fungível ERC-721
</DocLink>

### nó {#node}

Um software cliente que participa da rede.

<DocLink href="/developers/docs/nodes-and-clients/">
  Nós e Clientes
</DocLink>

### nonce {#nonce}

Em criptografia, um valor que só pode ser usado uma vez. O nonce de conta é um contador de transações em cada conta, usado para evitar ataques de repetição.

<Divider />

## O {#section-o}

### bloco ommer (tio) {#ommer}

Quando um [minerador](#miner) de prova de trabalho encontra um [bloco](#block) válido, outro minerador pode ter publicado um bloco concorrente, que é primeiro adicionado à ponta da cadeia de blocos. Este bloco válido, mas obsoleto, pode ser incluído por blocos mais recentes como _ommers_ e receber uma recompensa parcial de bloco. O termo "ommer" é o termo neutro de gênero preferido para o irmão de um bloco pai, mas às vezes também é chamado de "tio". Isso era relevante para o Ethereum quando ele era uma rede de [prova de trabalho](#pow), mas os ommers não são um recurso de [prova de participação](#pos) do Ethereum porque, precisamente, um proponente de blocos é selecionado em cada espaço.

### rollup otimista {#optimistic-rollup}

Um [rollup](#rollups) de transações que usam [provas de fraude](#fraud-proof) para oferecer maior taxa de transferência de transações da [camada 2](#layer-2), usando a segurança fornecida pela[Rede principal](#mainnet) (camada 1). Ao contrário de [Plasma](#plasma), uma solução similar de camada 2, rollups otimistas podem lidar com tipos de transações mais complexos ou qualquer coisa que seja possível na [EVM](#evm). Eles têm problemas de latência em comparação com [rollups de conhecimento zero](#zk-rollups) porque uma transação pode ser desafiada por meio da prova de fraude.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Rollups otimistas
</DocLink>

### Oráculo {#oracle}

Um oráculo é uma ponte entre a [cadeia de blocos](#blockchain) e o mundo real. Eles atuam como [APIs](#api) em cadeia, que podem ser consultadas sobre informações e usadas nos [contratos inteligentes](#smart-contract).

<DocLink href="/developers/docs/oracles/">
  Oráculos
</DocLink>

<Divider />

## P {#section-p}

### paridade {#parity}

Uma das implementações interoperáveis mais proeminentes do software cliente Ethereum.

### ponto {#peer}

Computadores conectados executando o software do cliente Ethereum que possuem cópias idênticas da [cadeia de bloco](#blockchain).

### rede ponto a ponto {#peer-to-peer-network}

Uma rede de computadores ([pares](#peer)) capazes de executar funcionalidades coletivamente sem a necessidade de serviços centralizados baseados em servidor.

### Plasma {#plasma}

Uma solução de escalonamento fora da cadeia que usa [provas de fraude](#fraud-proof), como [rollups otimistas](#optimistic-rollups). O Plasma está limitado a transações simples como transferências e trocas básicas de tokens.

<DocLink href="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### chave privada (chave secreta) {#private-key}

Um número secreto que permite aos usuários do Ethereum provarem a propriedade de uma conta ou contratos, produzindo uma assinatura digital (ver [chave pública](#public-key), [endereço](#address), [ECDSA](#ecdsa)).

### cadeia privada {#private-chain}

Uma cadeia de blocos totalmente privada é uma com acesso autorizado, não disponível publicamente para uso.

### prova de participação {#pos}

Um método pelo qual o protocolo de cadeia de blocos de criptomoeda visa alcançar o [consenso](#consensus) distribuído. A PoS pede que os usuários forneçam a propriedade de uma certa quantidade de criptomoedas (sua "participação" na rede), a fim de poder participar da validação das transações.

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  Prova de participação
</DocLink>

### prova de trabalho (PoW) {#pow}

Um dado (a prova) que requer cálculos significativos para ser encontrado.

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
  Prova de trabalho
</DocLink>

### chave pública {#public-key}

Um número, derivado de uma função unidirecional de uma [chave privada](#private-key), que pode ser compartilhado publicamente e usado por qualquer pessoa para verificar uma assinatura digital feita com a chave privada correspondente.

<Divider />

## R {#section-r}

### recibo {#receipt}

Dado retornado pelo cliente Ethereum para representar o resultado de uma [transação](#transaction) particular, incluindo um [hash](#hash) de transação, seu número de [bloco](#block), a quantidade de [gás](#gas) usada e, em caso de desenvolvimento de um [contrato inteligente](#smart-contract), o [endereço](#address) do contrato.

### ataque de reentrância {#re-entrancy-attack}

Um ataque que consiste em um contrato de um invasor chamando uma função de contrato da vítima de tal forma que, durante a execução, a vítima chama o contrato do invasor novamente, recursivamente. Isto pode resultar, por exemplo, no roubo de fundos mediante a omissão de partes do contrato da vítima que atualizam os saldos ou contam os montantes de saque.

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  Reentrância
</DocLink>

### recompensa {#reward}

Uma quantidade de ether incluída em cada novo bloco como uma recompensa da rede para o [minerador](#miner) que encontrou a solução da [prova de trabalho](#pow).

### Prefixo de Comprimento Recursivo (RLP) {#rlp}

Um padrão de codificação projetado pelos desenvolvedores da Ethereum para codificar e serializar objetos (estruturas de dados) de complexidade e tamanho arbitrários.

### rollups {#rollups}

Um tipo de solução de redimensionamento da [camada 2](#layer-2) que agrupa várias transações e as submete para a [cadeia principal do Ethereum](#mainnet) em uma única transação. Isso permite reduzir os custos de [gás](#gas) e aumentar em taxa de transferência de [transações](#transaction). Existem os rollups otimistas e de conhecimento zero que utilizam diferentes métodos de segurança para oferecer esses ganhos de escalabilidade.

<DocLink href="/developers/docs/scaling/#rollups">
  Rollups
</DocLink>

<Divider />

### RPC {#rpc}

A **chamada de procedimento remota (RPC)** é um protocolo usado por um programa para solicitar um serviço de um programa localizado em outro computador em uma rede sem precisar entender os detalhes da rede.

## S {#section-s}

### Algoritmo de Hash Seguro (SHA) {#sha}

Uma família de funções hash criptográficas publicada pelo Instituto Nacional de Normas e Tecnologia (NIST) dos Estados Unidos.

### Serenity {#serenity}

O estágio de desenvolvimento do Ethereum que iniciou um conjunto de atualizações de redimensionamento e sustentabilidade, anteriormente conhecido como "Ethereum 2.0" ou "Eth2".

<DocLink href="/roadmap/">
  Melhorias no Ethereum
</DocLink>

### serialização {#serialization}

O processo de conversão de uma estrutura de dados em uma sequência de bytes.

### fragmento / cadeia de fragmentos {#shard}

As cadeias de fragmentos são seções discretas da blockchain total pelas quais os subconjuntos dos validadores podem ser responsáveis. Isso oferecerá maior taxa de transferência de transações para o Ethereum e melhorará a disponibilidade de dados para soluções de [camada 2](#layer-2), como [rollups otimistas](#optimistic-rollups) e [rollups ZK](#zk-rollups).

<DocLink href="/roadmap/danksharding">
  Danksharding
</DocLink>

### cadeia lateral {#sidechain}

Uma solução de escala que usa uma cadeia separada com [regras de consenso](#consensus-rules) diferentes, geralmente mais rápidas. Uma ponte é necessária para conectar essas cadeias laterais à [Rede principal](#mainnet). [Rollups](#rollups) também usam cadeias laterais, mas, ao invés disso, eles operam em colaboração com a [Rede principal](#mainnet).

<DocLink href="/developers/docs/scaling/sidechains/">
  Cadeias laterais
</DocLink>

### assinatura {#signing}

Demonstrando criptograficamente que uma transação foi aprovada pelo titular de uma chave privada específica.

### singleton {#singleton}

Um termo de programação de computadores que descreve um objeto no qual apenas uma instância pode existir.

### slasher {#slasher}

Um removedor é uma entidade que escaneia as atestações procurando por ofensas passíveis de remoção. As remoções são transmitidas para a rede, e o próximo proponente de bloco adiciona a prova ao bloco. O proponente de blocos recebe então uma recompensa por remover o validador malicioso.

### espaço {#slot}

Um período de tempo (12 segundos) no qual um novo bloco pode ser proposto por um [validador](#validator) no sistema de [prova de participação](#pos). Um espaço pode estar vazio. 32 espaços formam uma [época](#epoch).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prova de participação
</DocLink>

### contrato inteligente {#smart-contract}

Um programa executado na infraestrutura de computação do Ethereum.

<DocLink href="/developers/docs/smart-contracts/">
  Introdução aos Contratos Inteligentes
</DocLink>

### SNARK {#snark}

Abreviação de "succinct non-interactive argument of knowledge", um SNARK é um tipo de [prova de conhecimento zero](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollups de conhecimento zero
</DocLink>

### bifurcação sutil {#soft-fork}

Uma divergência em uma [cadeia de blocos](#blockchain) que ocorre quando as [regras de consenso](#consensus-rules) mudam. Ao contrário de uma [bifurcação permanente](#hard-fork), uma bifurcação sutil é compatível com versões anteriores. Os nós atualizados podem validar blocos criados por nós não atualizados, contanto que eles sigam as novas regras de consenso.

### Solidity {#solidity}

Uma linguagem de programação procedural (obrigatória) com sintaxe semelhante ao JavaScript, C++ ou Java. A linguagem mais popular e mais utilizada para [contratos inteligentes](#smart-contract) no Ethereum. Criado pelo Dr. Gavin Wood.

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Montagem embutida do Solidity {#solidity-inline-assembly}

Linguagem de montagem da [EVM](#evm) inserida em um programa [Solidity](#solidity). O suporte do Solidity para montagem embutida facilita a escrita de certas operações.

### Spurious Dragon {#spurious-dragon}

Uma [bifurcação permanente](#hard-fork) da cadeia de blocos do Ethereum, que ocorreu no bloco 2.675.000 para abordar mais vetores de ataque de negação de serviço e estado claro (ver [Tangerine Whistle](#tangerine-whistle)). Além disso, um mecanismo de proteção ao ataque de repetição (consulte [nonce](#nonce)).

### moeda estável {#stablecoin}

Um [token ERC-20](#token-standard) com um valor derivado do valor de outro ativo. Existem moedas estáveis apoiadas por moeda fiduciária, como dólares, metais preciosos como ouro e outras criptomoedas, como o Bitcoin.

<DocLink href="/eth/#tokens">
  ETH não é a única criptomoeda no Ethereum
</DocLink>

### participação {#staking}

O depósito de uma quantidade de [ether](#ether) (sua participação) para se tornar um validador e proteger a [rede](#network). Um validador verifica as [transações](#transaction) e propõe [blocos](#block) sob um modelo de consenso de [prova de participação](#pos). A participação oferece um incentivo econômico para agir no melhor interesse da rede. Você receberá recompensas por cumprir suas funções de [validador](#validator), mas perderá diferentes quantidades de ETH se você não o fizer.

<DocLink href="/staking/">
  Participe com seus ETH para se tornar um validador Ethereum
</DocLink>

### pool de participação {#staking-pool}

O ETH combinado com mais de um participante Ethereum, usado para alcançar os 32 ETH necessários para ativar um conjunto de chaves de validador. Um operador de nó usa essas chaves para participar de consenso e as [recompensas de bloco](#block-reward) são divididas entre os participantes que contribuem com elas. Pools de participação ou delegação de participação não são nativos do protocolo Ethereum, mas muitas soluções foram construídas pela comunidade.

<DocLink href="/staking/pools/">
  Participação em pool
</DocLink>

### STARK {#stark}

Abreviação de "scalable transparent argument of knowledge", um SNARK é um tipo de [prova de conhecimento zero](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollups de conhecimento zero
</DocLink>

### estado {#state}

Uma imagem instantânea de todos os saldos e dados em um determinado momento na cadeia de blocos, normalmente se referindo à condição em um determinado bloco.

### canais de estado {#state-channels}

Uma solução de [camada 2](#layer-2), na qual um canal é configurado entre os participantes, para que eles possam realizar transações de forma livre e barata. Apenas uma [transação](#transaction) para configurar o canal e fechar o canal é enviada para a [Rede principal](#mainnet). Isso permite uma taxa de transferência de transação muito alta, mas depende do conhecimento prévio do número de participantes e do bloqueio de fundos.

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  Canais de estado
</DocLink>

### supermaioria {#supermajority}

Supermaioria é o termo dado para um montante superior a 2/3 (66%) do total de ether colocado em participação para proteger o Ethereum. Uma votação por supermaioria é necessária para que os blocos sejam [finalizados](#finality) na Beacon Chain.

### sincronização {#syncing}

O processo de baixar toda a versão mais recente de uma cadeia de blocos para um nó.

### comitê de sincronização {#sync-committee}

Um comitê de sincronização é um grupo de [validadores](#validator) selecionado aleatoriamente que é atualizado a cada ~27 horas. Sua finalidade é adicionar suas assinaturas nos cabeçalhos de blocos válidos. Os comitês de sincronização permitem que [clientes leves](#light-client) tenham controle da cabeça da cadeia de blocos, sem ter que acessar todo o conjunto do validador.

### szabo {#szabo}

Uma denominação de [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Uma [bifurcação permanente](#hard-fork) da cadeia de blocos Ethereum, que ocorreu no bloco 2.463.000 para alterar o cálculo de [gás](#gas) para certas operações de E/S intensivas e para limpar o estado acumulado de um ataque de negação de serviço, que explorou o baixo custo de gás dessas operações.

### dificuldade total terminal (TTD) {#terminal-total-difficulty}

A dificuldade total é a soma da dificuldade de mineração do Ethash para todos os blocos até algum ponto específico da cadeia de blocos. A dificuldade total terminal é um valor específico para a dificuldade total que foi usada como gatilho para que os clientes de execução desliguem suas funções de mineração e de gossip de blocos, permitindo a rede transicionar para a prova de participação.

### rede de teste {#testnet}

Uma rede usada para simular o comportamento da rede principal do Ethereum (ver [Rede principal](#mainnet)).

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  Redes de teste
</DocLink>

### token {#token}

Um bem virtual negociável definido em contratos inteligentes na cadeia de blocos Ethereum.

### norma de token {#token-standard}

Apresentada na proposta ERC-20, fornece uma estrutura normatizada de [contrato inteligente](#smart-contract) para tokens fungíveis. Tokens do mesmo contrato podem ser rastreados, negociados e são intercambiáveis, ao contrário dos [NFTs](#nft).

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  Norma de Token ERC-20
</DocLink>

### transação {#transaction}

Dados enviados para a cadeia de blocos Ethereum, assinados por uma [conta](#account) de origem, visando um [endereço](#address) específico. A transação contém metadados, como o [limite de gás](#gas-limit) para essa transação.

<DocLink href="/developers/docs/transactions/">
  Transações
</DocLink>

### tarifa de transação {#transaction-fee}

Uma taxa que você precisa pagar sempre que usar a rede Ethereum. Os exemplos incluem o envio de fundos da sua [carteira](#wallet) ou uma interação [dapp](#dapp), como trocar tokens ou comprar um item colecionável. Você pode pensar nisso como uma taxa de serviço. Essa taxa será alterada conforme a ocupação da rede. Isso ocorre porque os [validadores](#validator), pessoas responsáveis pelo processamento da sua transação, provavelmente irão priorizar transações com taxas mais altas, portanto, o congestionamento força o preço a subir.

Do ponto de vista técnico, sua taxa de transação está relacionada a quanto [gás](#gas) a sua transação exige.

A redução de taxas de transação é um assunto de grande interesse no momento. Ver [Camada 2](#layer-2).

### sem confiança {#trustlessness}

A capacidade de uma rede para mediar transações sem que nenhuma das partes envolvidas precise confiar em uma terceira parte.

### Turing-completo {#turing-complete}

Um conceito com o nome do matemático e cientista da computação inglês Alan Turing. Um sistema de regras de manipulação de dados (como o conjunto de instruções de um computador, uma linguagem de programação ou um autômato celular) é chamado de "Turing completo" ou "computacionalmente universal" se ele puder ser usado para simular qualquer máquina de Turing.

<Divider />

## V {#section-v}

### validador {#validator}

Um [nó](#node) em um sistema de [prova de participação](#pos) responsável por armazenar dados, processar transações e adicionar novos blocos à cadeia de blocos. Para ativar um software de validação, você precisa conseguir colocar em [participação](#staking) 32 ETH.

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  Prova de participação
</DocLink>
<DocLink href="/staking/">
  Participação no Ethereum
</DocLink>

### ciclo de vida do validador {#validator-lifecycle}

A sequência de estados em que um validador pode existir. Ela inclui:

- depositado: pelo menos 32 ETH foram depositados no [contrato de depósito](#deposit-contract) pelo validador
- pendente: o validador está na fila de ativação à espera de ser votado na rede por validadores existentes
- ativo: atualmente atestando e propondo blocos
- remoção: o validador se comportou mal e está sendo removido
- saindo: o validador foi sinalizado para sair da rede, seja voluntariamente ou porque foi expulso.

### prova de validação {#validity-proof}

Um modelo de segurança para determinadas soluções de [camada 2](#layer-2) em que, para aumentar a velocidade, as transações são [agrupadas](/#rollups) em lotes e enviadas ao Ethereum em uma única transação. O cálculo da transação é feito fora da cadeia e, em seguida, fornecido à cadeia principal com uma prova de sua validade. Esse método aumenta a quantidade de transações possíveis, enquanto mantém a segurança. Alguns [rollups](#rollups) usam [provas de fraude](#fraud-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollups de conhecimento zero
</DocLink>

### valido {#validium}

Uma solução fora da cadeia que usa [provas de validade](#validity-proof) para melhorar a taxa de transferência das transações. Ao contrário dos [rollups de conhecimento zero](#zk-rollup), os dados do valido não são armazenados na [Rede principal](#mainnet) da camada 1.

<DocLink href="/developers/docs/scaling/validium/">
  Valido
</DocLink>

### Vyper {#vyper}

Uma linguagem de programação de alto nível com sintaxe semelhante ao Python. Seu objetivo é se aproximar de uma linguagem puramente funcional. Criado por Vitalik Buterin.

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### carteira {#wallet}

Software que contém as [chaves privadas](#private-key). Usado para acessar e controlar as [contas](#account) do Ethereum e interagir com [contratos inteligentes](#smart-contract). As chaves não precisam ser armazenadas em uma carteira e, em vez disso, podem ser recuperadas no armazenamento offline (ou seja, um cartão de memória ou papel) para melhorar a segurança. Apesar do nome, as carteiras nunca armazenam moedas ou tokens reais.

<DocLink href="/wallets/">
  Carteiras Ethereum
</DocLink>

### Web3 {#web3}

A terceira versão da web. Proposta primeiramente pelo Dr. Gavin Wood, a Web3 representa uma nova visão e foco para aplicativos web: de aplicativos de propriedade centralizada e gerenciados, a aplicativos construídos sobre protocolos descentralizados (ver [dapp](#dapp)).

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2 vs Web3
</DocLink>

### wei {#wei}

A menor denominação de [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### endereço zero {#zero-address}

Um endereço Ethereum, composto inteiramente de zeros, que é frequentemente usado como um endereço, para remover tokens de circulação própria. Uma distinção é feita entre tokens formalmente removidos do índice de um contrato inteligente, através do método burn() e os enviados para este endereço.

### prova de conhecimento zero {#zk-proof}

Uma prova de conhecimento zero é um método criptográfico que permite a um indivíduo provar que uma declaração é verdadeira sem transmitir nenhuma informação adicional.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollups de conhecimento zero
</DocLink>

### rollup de conhecimento zero {#zk-rollup}

Um [rollup](#rollups) de transações que usam [provas de validade](#validity-proof) para oferecer maior capacidade de transação da [camada 2](#layer-2) ao usar a segurança fornecida pela [Rede principal](#mainnet) (camada 1). Embora não possam lidar com tipos de transações complexos, como [Rollups otimistas](#optimistic-rollups), eles não têm problemas de latência porque as transações provavelmente são válidas quando enviadas.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollups de conhecimento zero
</DocLink>

<Divider />

## Fontes {#sources}

_Fornecido parcialmente pela [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) por [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) sob licença da CC-BY-SA_

<Divider />

## Contribua para esta página {#contribute-to-this-page}

Esquecemos algo? Algo está errado? Ajude-nos a melhorar contribuindo com este glossário no GitHub!

[Saiba mais sobre como contribuir](/contributing/adding-glossary-terms)
