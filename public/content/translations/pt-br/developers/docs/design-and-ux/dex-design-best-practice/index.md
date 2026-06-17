---
title: Melhores práticas de design para corretoras descentralizadas (DEX)
description: Um guia que explica as decisões de UX/UI para a troca de tokens.
lang: pt-br
---

Desde o lançamento do Uniswap em 2018, centenas de corretoras descentralizadas foram lançadas em dezenas de redes diferentes.
Muitas delas introduziram novos elementos ou adicionaram seu próprio toque, mas a interface permaneceu geralmente a mesma.

Um dos motivos para isso é a [Lei de Jakob](https://lawsofux.com/jakobs-law/):

> Os usuários passam a maior parte do tempo em outros sites. Isso significa que os usuários preferem que o seu site funcione da mesma forma que todos os outros sites que eles já conhecem.

Graças aos primeiros inovadores como Uniswap, Pancakeswap e Sushiswap, os usuários de finanças descentralizadas (DeFi) têm uma ideia coletiva de como é uma DEX.
Por esse motivo, algo como "melhores práticas" está surgindo agora. Vemos cada vez mais decisões de design sendo padronizadas em todos os sites. Você pode ver a evolução das DEXs como um exemplo gigante de testes na prática. As coisas que funcionaram ficaram, as que não funcionaram foram descartadas. Ainda há espaço para personalidade, mas existem certos padrões aos quais uma DEX deve se adequar.

Este artigo é um resumo de:
- o que incluir
- como torná-lo o mais utilizável possível
- as principais maneiras de personalizar o design

Todos os wireframes de exemplo foram feitos especificamente para este artigo, embora sejam todos baseados em projetos reais.

O kit do Figma também está incluído na parte inferior - sinta-se à vontade para usá-lo e acelerar seus próprios wireframes!

## Anatomia básica de uma DEX {#basic-anatomy-of-a-dex}

A interface do usuário (UI) geralmente contém três elementos:
1. Formulário principal
2. Botão
3. Painel de detalhes

![Generic DEX UI, showing the three main elements](./1.png)


## Variações {#variations}

Este será um tema comum neste artigo, mas existem várias maneiras diferentes de organizar esses elementos. O "painel de detalhes" pode estar:
- Acima do botão
- Abaixo do botão
- Oculto em um painel sanfonado (accordion)
- E/ou em um modal de "pré-visualização"
  
Nota: Um modal de "pré-visualização" é opcional, mas se você estiver mostrando muito poucos detalhes na interface principal, ele se torna essencial.

## Estrutura do formulário principal {#structure-of-the-main-form}

Esta é a caixa onde você realmente escolhe qual token deseja trocar. O componente consiste em um campo de entrada e um pequeno botão em uma linha.

As DEXs normalmente exibem detalhes adicionais em uma linha acima e uma linha abaixo, embora isso possa ser configurado de forma diferente.

![Input row, with a details row above and below](./2.png)

## Variações {#variations2}

Duas variações de interface do usuário são mostradas aqui; uma sem bordas, criando um design muito aberto, e outra onde a linha de entrada tem uma borda, criando um foco nesse elemento.

![Two UI variations of the main form](./3.png)

Essa estrutura básica permite que **quatro informações principais** sejam mostradas no design: uma em cada canto. Se houver apenas uma linha superior/inferior, haverá apenas dois pontos.

Durante a evolução das finanças descentralizadas (DeFi), muitas coisas diferentes foram incluídas aqui.

## Informações principais a incluir {#key-info-to-include}

- Saldo na carteira
- Botão de máximo (Max)
- Equivalente em moeda fiduciária
- Impacto de preço no valor "recebido"

Nos primórdios das DeFi, o equivalente em moeda fiduciária muitas vezes estava ausente. Se você estiver construindo qualquer tipo de projeto Web3, é essencial que um equivalente fiduciário seja mostrado. Os usuários ainda pensam em termos de moedas locais, portanto, para corresponder aos modelos mentais do mundo real, isso deve ser incluído.

No segundo campo (aquele onde você escolhe o token para o qual está trocando), você também pode incluir o impacto de preço ao lado do valor da moeda fiduciária, calculando a diferença entre o valor de entrada e os valores de saída estimados. Este é um detalhe bastante útil a ser incluído.

Botões de porcentagem (por exemplo, 25%, 50%, 75%) podem ser um recurso útil, mas ocupam mais espaço, adicionam mais chamadas para ação e aumentam a carga mental. O mesmo vale para controles deslizantes de porcentagem. Algumas dessas decisões de interface do usuário dependerão da sua marca e do seu tipo de usuário.

Detalhes extras podem ser mostrados abaixo do formulário principal. Como esse tipo de informação é voltado principalmente para usuários profissionais, faz sentido:
- mantê-lo o mais minimalista possível, ou;
- ocultá-lo em um painel sanfonado

![Details shown in the corners of that main form](./4.png)

## Informações extras a incluir {#extra-info-to-include}

- Preço do token
- Derrapagem
- Mínimo recebido
- Saída esperada
- Impacto de preço
- Estimativa de custo de gás
- Outras taxas
- Roteamento de ordens

Pode-se argumentar que alguns desses detalhes poderiam ser opcionais.

O roteamento de ordens é interessante, mas não faz muita diferença para a maioria dos usuários.

Alguns outros detalhes estão simplesmente reafirmando a mesma coisa de maneiras diferentes. Por exemplo, "mínimo recebido" e "derrapagem" são dois lados da mesma moeda. Se você tiver a derrapagem definida em 1%, o mínimo que você pode esperar receber = saída esperada - 1%. Algumas interfaces mostrarão o valor esperado, o valor mínimo e a derrapagem... O que é útil, mas possivelmente um exagero. 

A maioria dos usuários deixará a derrapagem padrão de qualquer maneira.

O "impacto de preço" é frequentemente mostrado entre parênteses ao lado do equivalente fiduciário no campo "para". Este é um ótimo detalhe de UX a ser adicionado, mas se for mostrado aqui, ele realmente precisa ser mostrado novamente abaixo? E depois novamente em uma tela de pré-visualização?

Muitos usuários (especialmente aqueles que trocam pequenas quantias) não se importarão com esses detalhes; eles simplesmente inserirão um número e clicarão em trocar.

![Some details show the same thing](./5.png)

Exatamente quais detalhes são mostrados dependerá do seu público e de qual sensação você deseja que o aplicativo tenha.

Se você incluir a tolerância de derrapagem no painel de detalhes, também deve torná-la editável diretamente a partir daqui. Este é um bom exemplo de um "acelerador"; um truque de UX inteligente que pode acelerar os fluxos de usuários experientes, sem impactar a usabilidade geral do aplicativo.

![Slippage can be controlled from the details panel](./6.png)

É uma boa ideia pensar cuidadosamente não apenas em uma informação específica em uma tela, mas em todo o fluxo:
Inserir números no Formulário Principal → Analisar Detalhes → Clicar para a Tela de Pré-visualização (se você tiver uma tela de pré-visualização). 
O painel de detalhes deve estar visível o tempo todo ou o usuário precisa clicar nele para expandir?
Você deve criar atrito adicionando uma tela de pré-visualização? Isso força o usuário a desacelerar e considerar sua negociação, o que pode ser útil. Mas eles querem ver todas as mesmas informações novamente? O que é mais útil para eles neste momento?

## Opções de design {#design-options}

Como mencionado, muito disso se resume ao seu estilo pessoal
Quem é o seu usuário?
Qual é a sua marca?
Você quer uma interface "profissional" mostrando todos os detalhes ou quer ser minimalista?
Mesmo se você estiver mirando nos usuários profissionais que desejam todas as informações possíveis, você ainda deve se lembrar das sábias palavras de Alan Cooper:

> Não importa o quão bonita, não importa o quão legal seja a sua interface, seria melhor se houvesse menos dela.

### Estrutura {#structure}

- tokens à esquerda ou tokens à direita
- 2 linhas ou 3
- detalhes acima ou abaixo do botão
- detalhes expandidos, minimizados ou não mostrados

### Estilo do componente {#component-style}

- vazio
- contornado
- preenchido

Do ponto de vista puramente de UX, o estilo da interface do usuário importa menos do que você pensa. As tendências visuais vêm e vão em ciclos, e muita preferência é subjetiva.

A maneira mais fácil de ter uma ideia disso - e pensar nas várias configurações diferentes - é dar uma olhada em alguns exemplos e depois fazer algumas experiências por conta própria.

O kit do Figma incluído contém componentes vazios, contornados e preenchidos.

Dê uma olhada nos exemplos abaixo para ver diferentes maneiras de juntar tudo:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Mas de que lado o token deve ficar? {#but-which-side-should-the-token-go-on}

O ponto principal é que isso provavelmente não faz uma grande diferença na usabilidade. Há algumas coisas a ter em mente, no entanto, que podem influenciar você de uma forma ou de outra.

Tem sido levemente interessante ver a moda mudar com o tempo. O Uniswap inicialmente tinha o token à esquerda, mas desde então o moveu para a direita. O Sushiswap também fez essa mudança durante uma atualização de design. A maioria dos protocolos, mas não todos, seguiu o exemplo.

A convenção financeira tradicionalmente coloca o símbolo da moeda antes do número, por exemplo, $50, €50, £50, mas nós *dizemos* 50 dólares, 50 euros, 50 libras.

Para o usuário em geral - especialmente alguém que lê da esquerda para a direita, de cima para baixo - o token à direita provavelmente parece mais natural.

![A UI with tokens on the left](./13.png)

Colocar o token à esquerda e todos os números à direita parece agradavelmente simétrico, o que é uma vantagem, mas há outra desvantagem nesse layout.

A lei da proximidade afirma que itens que estão próximos uns dos outros são percebidos como relacionados. Consequentemente, queremos colocar itens relacionados próximos uns dos outros. O saldo do token está diretamente relacionado ao próprio token e mudará sempre que um novo token for selecionado. Portanto, faz um pouco mais de sentido que o saldo do token fique ao lado do botão de seleção de token. Ele poderia ser movido para baixo do token, mas isso quebra a simetria do layout.

Em última análise, há prós e contras para ambas as opções, mas é interessante como a tendência parece ser para o token à direita.

## Comportamento do botão {#button-behavior}

Não tenha um botão separado para Aprovar. Também não tenha um clique separado para Aprovar. O usuário quer Trocar, então basta dizer "trocar" no botão e iniciar a aprovação como o primeiro passo. Um modal pode mostrar o progresso com um indicador de etapas (stepper) ou uma simples notificação "tx 1 de 2 - aprovando".

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Botão como ajuda contextual {#button-as-contextual-help}

O botão pode ter dupla função como um alerta!

Na verdade, esse é um padrão de design bastante incomum fora da Web3, mas se tornou padrão dentro dela. Esta é uma boa inovação, pois economiza espaço e mantém a atenção focada.

Se a ação principal - TROCAR - estiver indisponível devido a um erro, o motivo pode ser explicado com o botão, por exemplo:

- mudar de rede
- conectar carteira
- vários erros

O botão também pode ser **mapeado para a ação** que precisa ser executada. Por exemplo, se o usuário não puder trocar porque está na rede errada, o botão deve dizer "mudar para Ethereum" e, quando o usuário clicar no botão, ele deve mudar a rede para Ethereum. Isso acelera significativamente o fluxo do usuário.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Crie o seu próprio com este arquivo do Figma {#build-your-own-with-this-figma-file}

Graças ao trabalho árduo de vários protocolos, o design das DEXs melhorou muito. Sabemos de quais informações o usuário precisa, como devemos mostrá-las e como tornar o fluxo o mais suave possível.
Esperamos que este artigo forneça uma visão geral sólida dos princípios de UX. 

Se você quiser experimentar, sinta-se à vontade para usar o kit de wireframe do Figma. Ele é mantido o mais simples possível, mas tem flexibilidade suficiente para construir a estrutura básica de várias maneiras.

[Kit de wireframe do Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

As finanças descentralizadas (DeFi) continuarão a evoluir e sempre há espaço para melhorias. 

Boa sorte!