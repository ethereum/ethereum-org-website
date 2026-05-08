---
title: "Explicação sobre restaking"
description: "Uma explicação sobre restaking, que usa ETH que já está em staking para fornecer segurança a protocolos e serviços adicionais além da camada base do Ethereum."
lang: pt-br
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "security"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

Uma apresentação de **Mike Neuder** em um evento do CBER Forum abordando como o restaking funciona. A apresentação define o self-staking (staking próprio), staking delegado, restaking nativo e não nativo, a mecânica do staking líquido e dos tokens de restaking líquido, e como a penalização interage com posições em restaking.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=rOJo7VwPh7I) publicada pelo CBER Forum. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

Olá a todos, eu sou o Mike. Vou falar sobre LRTs (tokens de restaking líquido) e LSTs (tokens de staking líquido). LRTs — o restaking é o novo staking? Vou começar com uma segunda pergunta e usá-la para motivar a discussão sobre LSTs e LRTs, definindo o que eles são. Esta é principalmente uma apresentação gráfica, então espero que possamos começar do início e construir isso juntos.

Um breve resumo: começando bem do início, vamos definir dois modos de staking. O primeiro é o self-staking, o segundo é o staking delegado. Depois, entraremos no conceito de restaking e o definiremos. Há quatro modelos diferentes que quero explorar — usando a separação entre próprio e delegado, e depois focando no restaking nativo versus restaking não nativo. Em seguida, entraremos na liquidez, falando sobre tokens líquidos — tokens de staking líquido e tokens de restaking líquido. Vamos motivar isso analisando a penalização e o restaking, e depois ambos os tipos de tokens. Por fim, terminaremos com alguns dados sobre o staking como ele existe hoje no Ethereum.

#### Self-staking (0:48) {#self-staking-048}

Começando bem do início, temos o staking onde a Alice está fazendo isso sozinha. Ela interage diretamente com o protocolo, coloca seu stake no protocolo e recebe uma recompensa por fazer isso por meio da emissão do token nativo. No caso do Ethereum, Alice faz o staking de 32 ETH e recebe uma recompensa em ETH por participar do consenso.

Há duas coisas para focar aqui. Primeiro, o staking serve como esse mecanismo anti-Sybil — você não pode enganar a rede dizendo que tem muitas identidades porque cada identidade custa uma certa quantia desse suprimento fixo de tokens. O segundo é o colateral em risco — isso diz respeito às regras do protocolo em termos de penalização. Se a Alice se comportar mal de acordo com alguma especificação muito bem definida, o protocolo retirará seu capital e a punirá por fazer isso.

#### Staking delegado (2:52) {#delegated-staking-252}

O staking delegado adiciona outra camada no meio entre a Alice e o protocolo. A Alice agora delega para o Bob, que faz o staking no protocolo Ethereum. As recompensas são enviadas para o Bob, e as recompensas menos as taxas são repassadas para a Alice. Esta é a versão mais simples do staking delegado — a Alice não quer executar o software sozinha, talvez ela não tenha 32 ETH inteiros, ou não tenha o hardware ou a experiência técnica para executar um validador.

Existem muitos modos diferentes dessa delegação em vários níveis de confiança. A versão de maior confiança é a custodial — você envia seu ETH para a Coinbase e diz "faça o staking em meu nome". Você efetivamente confia neles inteiramente porque eles custodiam o ativo em seu nome. Há uma versão não custodial, mas governada por uma DAO (organização autônoma descentralizada), onde você delega seu stake para alguém determinado por uma DAO que vota em quem pode executar os nós — este é o staking no estilo da Lido. A terceira é uma versão minimizada em confiança onde tanto a Alice quanto o Bob colocam algum colateral. A Alice subsidia o resto do colateral do Bob, e se o Bob se comportar mal e for penalizado, o colateral dele é a primeira parcela a ser removida. Eu digo "minimizado em confiança" e não "sem necessidade de confiança" porque, não importa o que aconteça, existem mundos nos quais o colateral da Alice é completamente eliminado dependendo do que o Bob fizer.

#### Self-restaking com ETH nativo (4:42) {#self-restaking-with-native-eth-442}

Agora podemos falar sobre o que é o restaking. Este é um conceito totalmente novo — existe desde que Sreeram e a EigenLayer introduziram o termo há talvez um ano e meio ou dois anos.

Neste modelo, a Alice faz a mesma coisa que estava fazendo antes — ela envia seu stake para o protocolo Ethereum e recebe recompensas por participar do consenso. Agora temos um novo protocolo — vamos chamá-lo de "Retheum" — no qual a Alice faz o restaking. O importante aqui é que ela está usando os mesmos tokens que está fazendo staking no protocolo Ethereum para garantir a segurança deste segundo protocolo.

Ela recebe recompensas por isso. Isso parece ótimo — a Alice agora tem potencialmente o dobro da recompensa pela mesma quantidade de stake. Mas o risco é que o capital que ela colocou em staking em ambos os protocolos agora está sobrecarregado pelas regras de ambos os protocolos. Se a Alice se comportar mal no Ethereum, ela pode perder seu capital sendo penalizada. Se ela se comportar mal no "Retheum", ela também pode ser penalizada. Com rendimento adicional vêm responsabilidades adicionais — comportamentos do protocolo que são obrigatórios e puníveis de outras maneiras se você sobrecarregar seu token de staking em muitos protocolos diferentes.

#### Restaking nativo delegado (8:28) {#delegated-native-restaking-828}

A segunda versão é o restaking delegado com ETH nativo. A Alice está fazendo staking com o Ethereum, e agora ela quer usar o Bob para delegar seu stake para o protocolo "Retheum". Ela delega para o Bob, o Bob faz o restaking, o protocolo emite recompensas para o Bob, e o Bob emite as recompensas menos as taxas para a Alice.

Sob este modelo, os 32 ETH no protocolo Ethereum são responsáveis pelas ações tanto da Alice quanto do Bob — duas pessoas que poderiam potencialmente ter esse ETH penalizado. O token está sobrecarregado por dois conjuntos diferentes de regras de protocolo.

**Pergunta do público:** Quando você faz o staking de ETH no protocolo Ethereum, o protocolo tem que te dar algo que você então apresenta — o que é esse algo?

Nesta versão nativa, a Alice faz o staking e tem o que é chamado de credencial de saque do ecossistema Ethereum. Essa credencial de saque pode ser apontada para um contrato no Ethereum que lida com a segunda camada de staking. É um contrato que controla os ativos quando você os saca do Ethereum — é como uma custódia sem necessidade de confiança no contrato inteligente que aplica a segunda camada de penalidades.

Por que isso é chamado de "nativo"? Porque a Alice ainda está interagindo diretamente com o Ethereum — seu stake são os 32 ETH que ela possui, usados para garantir a segurança da camada de consenso do Ethereum.

#### Restaking não nativo (10:57) {#non-native-restaking-1057}

Self-restaking no cenário não nativo: a Alice está interagindo apenas com o protocolo "Retheum". Ela não está executando um nó no Ethereum. Ela faz o restaking — embora eu coloque "re" entre aspas porque ela não está realmente fazendo restaking, é um staking em primeiro lugar. A única razão pela qual é chamado de restaking é porque isso ocorre por meio de um protocolo que também facilita outros tipos de restaking.

Ela pega tokens não nativos — isso pode ser USDC, uma stablecoin de euro, Bitcoin encapsulado (wrapped Bitcoin), o que for — ela os fornece como segurança econômica e resistência anti-Sybil ao protocolo e ganha recompensas. Isso está redefinindo o restaking como um mercado para confiança descentralizada, onde a confiança se refere ao valor econômico do capital em risco.

O restaking delegado com tokens não nativos segue o mesmo padrão — a Alice delega por meio do Bob e recebe recompensas menos as taxas.

#### Penalização e restaking (13:55) {#slashing-and-restaking-1355}

Antes de entrarmos na liquidez, vamos falar sobre penalização. No modo normal de penalização, a Alice está fazendo staking no protocolo Ethereum. Se ela fizer algo que o protocolo considere errado — por exemplo, uma equivocação, onde ela usa sua chave criptográfica para assinar duas informações que estão em conflito uma com a outra — isso é uma falha objetiva. Todos podem verificar que ambas as assinaturas foram feitas pela Alice, e isso é prova suficiente para penalizar seus tokens.

Como o restaking e a penalização interagem? Na versão mais simples — self-restaking com o ativo nativo — a Alice faz o staking no Ethereum e também faz o restaking por meio do "Retheum". Se a Alice continuar a fazer seu trabalho no protocolo "Retheum", mas cometer uma equivocação no Ethereum, agora temos um problema: ela é penalizada no Ethereum, mas o "Retheum" não viu nada atribuível a ela que esteja errado de acordo com as regras deles. Tem que haver alguma comunicação entre os dois protocolos.

Essa direção de comunicação é, na verdade, bem fácil porque o "Retheum" é um contrato inteligente no Ethereum — ele pode ler o estado do Ethereum e dizer "este validador foi penalizado de acordo com o Ethereum", então no protocolo de segunda ordem, a Alice também é penalizada.

A outra direção é mais difícil. Se a Alice for penalizada na plataforma de restaking, o Ethereum precisaria ser informado. Mas o Ethereum é intencionalmente alheio a tudo o que acontece em sua camada de contrato em termos do mecanismo de consenso.

**Pergunta do público:** Por que isso importaria? O Ethereum precisa do stake para o que ele faz, mas o valor do restaking é um derivativo do original.

O problema é que, se a Alice for penalizada na plataforma de restaking, ela não possui mais aquele stake de fato. Ela pode fazer o que quiser no protocolo Ethereum sem nenhum capital real em risco — o que é o objetivo principal de ter um stake em primeiro lugar. É como se você estivesse usando dinheiro para duas coisas, ele desaparecesse em uma coisa, e a outra coisa tivesse que se conscientizar de que o dinheiro não é mais seu. Ele ainda tem valor econômico em algum sentido, mas você não o controla — então você não se importa com o que acontece com ele porque ele já se foi.