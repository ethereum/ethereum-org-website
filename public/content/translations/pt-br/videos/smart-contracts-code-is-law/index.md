---
title: "O código é a lei? Contratos inteligentes explicados"
description: "Explorando o conceito de 'o código é a lei' através da perspectiva dos contratos inteligentes no Ethereum e DeFi. Este vídeo aborda o que são contratos inteligentes, como funcionam e a questão filosófica de se o código deve ser o árbitro final."
lang: pt-br
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "contratos-inteligentes"
format: explainer
author: Finematics
breadcrumb: "Contratos Inteligentes"
---

Uma explicação da **Finematics** explorando o conceito de "o código é a lei" através da perspectiva dos contratos inteligentes no Ethereum, abordando o que são contratos inteligentes, como funcionam, suas vantagens sobre os contratos tradicionais e por que eles são os blocos de construção das finanças descentralizadas (DeFi).

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=pWGLtjG-F5c) publicada pela Finematics. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

Você já ouviu a expressão "o código é a lei", onde a tecnologia é usada para aplicar regras? Nesse caso, será que ainda precisamos de advogados? Ou talvez possamos viver em um mundo totalmente automatizado, onde o código dita o que podemos e não podemos fazer. Com o desenvolvimento atual dos contratos inteligentes, esse cenário futurista pode estar mais próximo do que imaginamos.

Um contrato inteligente é um pedaço de código que pode ser executado automaticamente e de forma determinística. O código do contrato inteligente geralmente é armazenado e executado na blockchain para torná-lo sem necessidade de confiança e seguro. Os contratos inteligentes também têm a capacidade de receber, armazenar e enviar fundos — e até mesmo chamar outros contratos inteligentes. Eles seguem a semântica "se-então" (if-then), o que os torna relativamente fáceis de programar.

Os contratos inteligentes visam remover o fator humano da tomada de decisões. O fator humano frequentemente se mostra o elemento mais propenso a erros e menos confiável dos contratos tradicionais padrão.

Uma máquina de venda automática surge com muita frequência como uma boa analogia para um contrato inteligente, pois compartilha algumas semelhanças. Uma máquina de venda automática típica é programada de uma forma que permite certas ações e transições de estado com base na entrada. Ela também funciona de forma totalmente determinística. Por exemplo, se você quiser comprar uma lata de Coca-Cola que custa dois dólares e tiver apenas um dólar, não importa quantas vezes tente, você não conseguirá pegar a bebida. Por outro lado, se você inserir três dólares, a máquina lhe dará uma lata de Coca-Cola e o troco adequado. Até mesmo o troco fornecido é selecionado de forma predefinida e programada com base em quais moedas estão disponíveis e de quais moedas a máquina quer se livrar primeiro.

Um contrato inteligente pode depender puramente das informações disponíveis na blockchain — por exemplo, "se você me der dez tokens A, eu lhe darei dez tokens B". Ou pode depender de uma fonte de dados externa, por exemplo, do preço do ETH ou do S&P 500. O último exemplo torna os contratos inteligentes mais difíceis, pois eles precisam confiar em dados do mundo real. A confiança necessária pode ser minimizada usando serviços de oráculo, mas até mesmo os serviços de oráculo precisam ser confiáveis. Já existem alguns projetos que, usando certos incentivos, tornam os oráculos mais propensos a fornecer dados corretos. A Chainlink é um projeto que se destaca claramente nessa categoria.

#### Contratos inteligentes do Ethereum (3:09) {#ethereum-smart-contracts-309}

O Ethereum é uma blockchain que suporta contratos inteligentes e possibilita que um programador implemente seus próprios contratos inteligentes. Um contrato inteligente pode ser escrito em uma linguagem de programação chamada Solidity, que foi criada especificamente para esse propósito. No Ethereum, todos os contratos inteligentes implantados são imutáveis — isso significa que, uma vez implantados, eles não podem ser modificados, o que cria certos riscos que discutiremos mais adiante.

Os contratos inteligentes no Ethereum também são descentralizados, o que significa que não há uma única máquina controlando o contrato. De fato, todos os nós na rede Ethereum armazenam o mesmo contrato com exatamente o mesmo estado. Embora o Ethereum seja atualmente a plataforma de contratos inteligentes de uso geral mais popular, não é a única e tem alguns concorrentes, incluindo Cardano, Tezos, EOS e Tron — mas nem todos compartilham as mesmas características.

#### Definição de contrato inteligente (4:23) {#smart-contract-definition-423}

O termo "contrato inteligente" foi cunhado pelo conhecido criptógrafo Nick Szabo no início da década de 1990. O nome, embora não seja o mais autoexplicativo, pegou e é comumente usado, especialmente na indústria de blockchain. Para ver os benefícios dos contratos inteligentes, vamos comparar um contrato inteligente hipotético ao seu equivalente no espaço tradicional.

#### Exemplo de contrato inteligente (4:46) {#smart-contract-example-446}

Digamos que queremos escrever o seguinte contrato: se Alice enviar um número X de tokens A e Bob enviar o mesmo número de tokens B, os tokens serão trocados — Alice receberá os tokens de Bob e Bob receberá os tokens de Alice.

Em um mundo sem contratos inteligentes, uma maneira de conseguir isso sem que Alice tenha que confiar em Bob e Bob tenha que confiar em Alice seria criar um contrato de garantia (escrow) com um terceiro. O terceiro coletaria os tokens A de Alice, esperaria pelo mesmo número de tokens B de Bob e enviaria a Alice e Bob os respectivos tokens trocados.

#### Problemas dos contratos inteligentes (5:45) {#smart-contract-problems-545}

Essa abordagem já mostra alguns problemas que Alice e Bob podem enfrentar:

- **Confiar em intermediários** — não há garantia de que o terceiro não fugirá com os tokens após receber os fundos de Alice e Bob. Temos que confiar na reputação do intermediário e em um possível seguro.
- **Resultados não determinísticos** — se algo der errado, pode haver resultados diferentes dependendo de vários fatores, incluindo a jurisdição onde um possível caso seria resolvido.

Por outro lado, um contrato inteligente funcionaria de forma totalmente automatizada e determinística, garantindo que ambas as partes recebam os fundos quando atenderem aos critérios iniciais de depósito de tokens. Os contratos inteligentes também podem reter fundos dentro de si mesmos, o que não é possível de se conseguir no mundo tradicional.

#### Velocidade (6:47) {#speed-647}

Dependendo do intermediário, Alice e Bob podem ter que esperar até alguns dias ou semanas para liquidar a transição dos tokens. E se eles quiserem fazer a troca de tokens em um domingo e o intermediário não estiver operando? Com os contratos inteligentes, esses tipos de problemas desaparecem, e o contrato pode ser cumprido segundos após os critérios iniciais serem atendidos.

#### Custo (7:16) {#cost-716}

Os contratos tradicionais não são caros apenas por causa do intermediário que precisa ter lucro — há também um enorme risco de custos ocultos para coisas como arbitragem e execução se houver algum problema com o contrato.

A reutilização é outra vantagem: o mesmo contrato inteligente responsável pela troca dos tokens de Alice e Bob poderia ser usado por qualquer outra pessoa que queira fazer a troca de tokens. No mundo tradicional, todos teriam que assinar contratos separados e pagar as respectivas taxas ao intermediário.

#### Fraude (7:58) {#fraud-758}

A fraude é mais um custo oculto, desta vez para o próprio intermediário. O intermediário teria que se certificar de que os tokens de Alice e Bob são legítimos antes de iniciar uma troca. A fraude é muito comum nas finanças tradicionais, e a maioria das empresas tem equipes enormes trabalhando puramente na prevenção de fraudes. Com os contratos inteligentes, os tokens podem ser verificados na blockchain e, com assinaturas digitais, fica claro imediatamente se tanto Alice quanto Bob são elegíveis para gastar seus tokens.

#### Casos de uso (8:42) {#use-cases-842}

Os contratos inteligentes têm um número crescente de casos de uso, que vão desde pagamentos e finanças descentralizadas (DeFi) até cadeias de suprimentos e financiamento coletivo (crowdfunding). Os contratos inteligentes também são os blocos de construção básicos para aplicativos descentralizados (dapps).

#### DeFi (9:07) {#defi-907}

As finanças descentralizadas (DeFi) são uma das novas indústrias que dependem fortemente de contratos inteligentes. Algumas das coisas que já foram construídas neste espaço incluem:

- **Stablecoins descentralizadas** — com o uso inteligente de contratos inteligentes e certos incentivos, podemos criar uma stablecoin atrelada ao dólar americano sem ter que armazenar dólares no mundo real. A MakerDAO é um dos projetos que torna isso possível.
- **Provisão automatizada de liquidez** — um conjunto de contratos inteligentes pode permitir que os usuários forneçam liquidez e façam a troca de tokens de maneira totalmente não permissionada e descentralizada. O Uniswap e a Kyber Network são bons exemplos de tais protocolos.

#### Financiamento coletivo e cadeias de suprimentos (10:05) {#crowdfunding-and-supply-chains-1005}

Outro caso de uso é fornecer mais transparência às cadeias de suprimentos, onde protocolos como o OriginTrail entram em ação. Quando se trata de financiamento coletivo, você pode imaginar um contrato que desbloqueia fundos assim que certas metas são atingidas e verificadas pela comunidade.

#### Futuros contratos inteligentes (10:29) {#future-smart-contracts-1029}

E se os contratos inteligentes pudessem facilitar coisas como compartilhamento de viagens, aluguel de apartamentos e muito mais? E quanto à caridade? Você pode imaginar um fundo totalmente automatizado que enviaria dinheiro diretamente para as pessoas que mais precisam, sem intermediários. Por exemplo, o fundo poderia determinar que uma certa região foi atingida por um furacão e redirecionar os fundos para essa parte do mundo. Por enquanto, parece quase impossível, mas todos os elementos necessários para fazer algo assim acontecer estão sendo construídos neste exato momento.

Os casos de uso para contratos inteligentes são quase infinitos, mas antes que possamos alcançar tudo isso, temos que lidar com alguns problemas:

- **Bugs** — um dos principais riscos quando se trata de contratos inteligentes é algo que assombra qualquer outro software. O melhor exemplo é o hack da DAO, que resultou na perda de milhões de dólares em ether, já que o invasor conseguiu drenar os fundos do contrato inteligente. Isso fez com que o Ethereum passasse por uma bifurcação rígida e criou muita discordância na comunidade Ethereum. Desde o hack da DAO, a comunidade Ethereum criou muitas medidas de segurança extras. Hoje em dia, praticamente todos os contratos inteligentes populares passaram por uma auditoria de segurança, muitas vezes por várias equipes. Há também uma tendência de usar métodos de verificação formal para provar que certos contratos sempre se comportarão da maneira esperada.
- **Mudanças de protocolo** — mesmo que um contrato inteligente não tenha bugs e tenha sido auditado, ainda não podemos garantir que uma mudança no nível da plataforma não causará problemas. Uma atualização no próprio protocolo pode fazer com que certos contratos inteligentes comecem a se comportar de maneira diferente do esperado.
- **Dados do mundo real** — os serviços de oráculo podem fornecer uma maneira confiável de obter informações do mundo real para a blockchain. Mas imagine que você alugou um apartamento ou um carro e causou algum dano acidental. Como um contrato inteligente, sem nenhuma intervenção humana, poderia saber disso? Existem vários exemplos em que é difícil imaginar como algo inesperado que acontece no mundo real pode ser visível para um contrato inteligente.

Além do que foi mencionado acima, também existem riscos envolvendo regulamentação e impostos, mas todos eles podem ser resolvidos eventualmente.

#### Podemos substituir os advogados? (13:58) {#can-we-replace-lawyers-1358}

Então, podemos realmente substituir advogados por código? Não exatamente — pelo menos não agora. No futuro, é provável que cada vez mais contratos sejam automatizados, especialmente em finanças. Mas mesmo em um mundo totalmente automatizado, os advogados podem fornecer conhecimentos valiosos que podem ser traduzidos em código. Há também muitos desafios regulatórios em torno da indústria cripto que manterão os advogados muito ocupados por um tempo. No entanto, se eu fosse um advogado, começaria a aprender sobre contratos inteligentes e programação, pois eles desempenharão um grande papel no futuro.

#### Resumo (14:53) {#summary-1453}

Prós dos contratos inteligentes:

- Totalmente automatizados
- Resultados determinísticos
- Sem necessidade de confiança
- Rápidos, precisos e seguros
- Econômicos e transparentes

Contras dos contratos inteligentes:

- Bugs de software
- Mudanças de protocolo
- Incerteza regulatória e tributária

Embora os contratos inteligentes apresentem certos riscos, ainda estamos muito no início, e a maioria dos problemas atuais pode ser resolvida.