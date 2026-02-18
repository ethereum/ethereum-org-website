---
title: "Melhores práticas de design para exchanges descentralizadas (DEX)"
description: "Um guia que explica decisões de UX/UI para troca de tokens."
lang: pt-br
---

Desde o lançamento do Uniswap em 2018, centenas de exchanges descentralizadas foram lançadas em dezenas de cadeias diferentes.
Muitos deles introduziram novos elementos ou adicionaram seu próprio toque, mas a interface permaneceu, em geral, a mesma.

Um dos motivos para isso é a [Lei de Jakob](https://lawsofux.com/jakobs-law/):

> Os usuários passam a maior parte do tempo em outros sites. Isso significa que os usuários preferem que o seu site funcione da mesma maneira que os outros sites com os quais já estão familiarizados.

Graças a inovadores pioneiros como Uniswap, Pancakeswap e Sushiswap, os usuários de DeFi têm uma ideia coletiva de como uma DEX deve ser.
Por essa razão, está surgindo o conceito de "práticas recomendadas". Vemos cada vez mais decisões de design sendo padronizadas entre os sites. A evolução das exchanges descentralizadas pode ser vista como um grande exemplo de teste em tempo real. O que funcionou permaneceu, o que não funcionou foi descartado. Ainda há espaço para personalização, mas existem certos padrões que uma DEX deve seguir.

Este artigo é um resumo de:

- o que deve ser incluído
- como torná-lo o mais utilizável possível
- as principais formas de personalizar o design

Todos os wireframes de exemplo foram desenvolvidos especialmente para este artigo, embora se baseiem em projetos reais.

O kit do Figma também está incluído ao final. Sinta-se à vontade para usá-lo e acelerar a criação dos seus próprios wireframes!

## Anatomia básica de um DEX {#basic-anatomy-of-a-dex}

A interface do usuário geralmente contém três elementos:

1. Formulário principal
2. Botão
3. Painel de detalhes

![Interface de usuário genérica da DEX, mostrando os três elementos principais](./1.png)

## Variações {#variations}

Esse será um tema comum neste artigo, mas existem várias maneiras diferentes de organizar esses elementos. O “painel de detalhes” pode ser:

- Acima do botão
- Abaixo do botão
- Escondido em um painel sanfonado
- E/ou em um modal de “pré-visualização”

Nota: Um modal de “pré-visualização” é opcional, mas se você está mostrando poucos detalhes na interface de usuário principal, ele se torna essencial.

## Estrutura do formulário principal {#structure-of-the-main-form}

É nesta caixa em que você escolhe o token que deseja trocar. O componente é composto de um campo de entrada e um botão pequeno dispostos em linha.

Normalmente, as exchanges descentralizadas exibem detalhes adicionais em uma linha acima e outra abaixo, embora isso possa ser configurado de forma diferente.

![Linha de entrada, com uma linha de detalhes acima e abaixo](./2.png)

## Variações {#variations2}

Duas variações de interface do usuário são mostradas aqui: uma sem bordas, criando um design muito aberto, e outra em que a linha de entrada tem uma borda, criando um foco nesse elemento.

![Duas variações de UI do formulário principal](./3.png)

Essa estrutura básica permite que **quatro informações importantes** sejam exibidas no design: uma em cada canto. Se houver apenas uma linha superior/inferior, haverá apenas dois pontos.

Durante a evolução do DeFi, muitas coisas diferentes foram incluídas aqui.

## Informações importantes a serem incluídas {#key-info-to-include}

- Saldo na carteira
- Botão máximo
- Equivalente em moeda fiduciária
- Impacto do preço no valor “recebido”

No início do DeFi, o equivalente em moeda fiduciária muitas vezes não era exibido. Se você está desenvolvendo qualquer tipo de projeto Web3, é essencial que o equivalente em moeda fiduciária seja exibido. Os usuários ainda pensam em termos de moedas locais, então, para alinhar com os modelos mentais do mundo real, isso deve ser incluído.

No segundo campo (aquele onde você escolhe o token para o qual está trocando), você também pode incluir o impacto no preço ao lado do valor em moeda fiduciária, calculando a diferença entre o valor de entrada e os valores estimados de saída. Esse é um detalhe bastante útil a ser incluído.

Botões de porcentagem (p. ex., 25%, 50%, 75%) podem ser um recurso útil, mas ocupam mais espaço, adicionam mais chamadas para ação e adicionam mais carga mental. O mesmo se aplica aos controles deslizantes de porcentagem. Algumas dessas decisões de interface dependerão da sua marca e do tipo de usuário.

Detalhes adicionais podem ser exibidos abaixo do formulário principal. Como esse tipo de informação é voltado principalmente para usuários profissionais, faz sentido optar por:

- mantê-la o mínimo possível, ou;
- escondê-la em um painel sanfonado

![Detalhes mostrados nos cantos do formulário principal](./4.png)

## Informações extras a serem incluídas {#extra-info-to-include}

- Preço do token
- Derrapagem
- Mínimo recebido
- Resultado esperado
- Impacto no preço
- Estimativa de custo de transação
- Outras taxas
- Roteamento de pedidos

Certamente, alguns desses detalhes poderiam ser opcionais.

O roteamento de pedidos é interessante, mas não faz muita diferença para a maioria dos usuários.

Alguns outros detalhes estão simplesmente reafirmando a mesma coisa de maneiras diferentes. Por exemplo, "mínimo recebido" e "derrapagem" são dois lados da mesma moeda. Se você tiver uma derrapagem definida em 1%, então o mínimo que você pode esperar receber = resultado esperado-1%. Algumas interfaces de usuário mostrarão o valor esperado, o valor mínimo e a derrapagem. O que é útil, mas possivelmente excessivo.

A maioria dos usuários deixará a derrapagem predefinida de qualquer maneira.

O “impacto no preço” é geralmente mostrado entre parênteses ao lado do equivalente em moeda fiduciária no campo “para”. Este é um ótimo detalhe de experiência do usuário para adicionar, mas se ele é mostrado aqui, realmente precisa ser mostrado novamente abaixo? E depois novamente em uma tela de pré-visualização?

Muitos usuários (especialmente os que trocam pequenos valores) não se preocuparão com esses detalhes; eles vão apenas inserir um valor e trocar.

![Alguns detalhes mostram a mesma coisa](./5.png)

Quais detalhes serão exibidos exatamente dependerá do seu público e da sensação que você deseja que o aplicativo transmita.

Se você incluir a tolerância de derrapagem no painel de detalhes, também deverá torná-la editável diretamente daqui. Este é um bom exemplo de um “acelerador”; um truque inteligente de experiência do usuário que pode agilizar o fluxo de usuários experientes, sem comprometer a usabilidade geral do aplicativo.

![A derrapagem pode ser controlada no painel de detalhes](./6.png)

É uma boa ideia pensar cuidadosamente não apenas em uma informação específica em uma tela, mas em todo o fluxo, considerando:
Introduzir os números no formulário principal → Verificar os detalhes → Clicar na tela de pré-visualização (se houver uma tela de pré-visualização).
O painel de detalhes deve estar visível o tempo todo ou o usuário precisa clicar para expandi-lo?
Você deve criar atrito ao adicionar uma tela de pré-visualização? Isso força o usuário a desacelerar e considerar sua troca, o que pode ser útil. Mas eles querem ver todas as mesmas informações novamente? O que é mais útil para eles neste momento?

## Opções de design {#design-options}

Como mencionado, muito disso depende do seu estilo pessoal
Quem é o seu usuário?
Qual é a sua marca?
Você quer uma interface “profissional” mostrando todos os detalhes ou quer ser minimalista?
Mesmo que você esteja considerando os usuários profissionais que querem todas as informações possíveis, você ainda deve se lembrar das sábias palavras de Alan Cooper:

> Não importa quão bonita ou legal seja sua interface, seria melhor que ela fosse mais simples.

### Estrutura {#structure}

- tokens à esquerda ou tokens à direita
- 2 linhas ou 3
- detalhes acima ou abaixo do botão
- detalhes expandidos, minimizados ou não mostrados

### Estilo do componente {#component-style}

- vazio
- delineado
- preenchido

De um ponto de vista puramente UX, o estilo da interface do usuário é menos importante do que você pensa. As tendências visuais vêm e vão em ciclos e muitas preferências são subjetivas.

A maneira mais fácil de ter uma ideia disso – e pensar nas várias configurações diferentes – é dar uma olhada em alguns exemplos e depois fazer alguns experimentos você mesmo.

O kit Figma incluído contém componentes vazios, contornados e preenchidos.

Dê uma olhada nos exemplos abaixo para ver diferentes maneiras de juntar tudo:

![3 linhas em estilo preenchido](./7.png)

![3 linhas em estilo contornado](./8.png)

![2 linhas em estilo vazio](./9.png)

![3 filas em estilo contornado, com um painel de detalhes](./10.png)

![3 linhas com uma linha de entrada em stilo contornado](./11.png)

![2 linhas em estilo preenchido](./12.png)

## Mas de que lado o token deve ficar? {#but-which-side-should-the-token-go-on}

O ponto principal é que isso provavelmente não faz uma grande diferença na usabilidade. No entanto, há alguns aspectos que você deve ter em mente que podem fazer você decidir de uma forma ou de outra.

Tem sido um pouco interessante ver a mudança de comportamento com o tempo. Inicialmente, o Uniswap tinha o token à esquerda, mas desde então o moveu para a direita. O Sushiswap também fez essa alteração durante uma atualização de design. A maioria dos protocolos, mas não todos, seguiu o exemplo.

A convenção financeira tradicionalmente coloca o símbolo da moeda antes do número, p. ex., $50, €50, £50, mas nós _dizemos_ 50 dólares, 50 euros, 50 libras.

Para o usuário em geral, especialmente alguém que lê da esquerda para a direita, de cima para baixo, o token à direita provavelmente parece mais natural.

![A IU com tokens à esquerda](./13.png)

Colocar o token à esquerda e todos os números à direita parece agradavelmente simétrico, o que é uma vantagem, mas há uma desvantagem neste layout.

A lei da proximidade afirma que os itens que estão próximos são percebidos como relacionados. Dessa forma, nós queremos colocar os itens relacionados próximos uns dos outros. O saldo do token está diretamente relacionado ao próprio token e será alterado sempre que um novo token for selecionado. Portanto, faz um pouco mais de sentido que o saldo do token esteja próximo ao botão de seleção do token. Ele poderia ser movido para debaixo do token, mas isso quebraria a simetria do layout.

Em última análise, há vantagens e desvantagens em ambas as opções, mas é interessante como a tendência parece estar se voltando para o token à direita.

## Comportamento do botão {#button-behavior}

Não tenha um botão separado para Aprovar. Também não tenha um clique separado para Aprovar. O usuário deseja trocar, então basta dizer “trocar” no botão e iniciar a aprovação como primeiro passo. Um modal pode mostrar o progresso com um passo a passo ou uma simples notificação “tx 1 de 2 - aprovando”.

![IU com botões separados para Aprovar e Trocar](./14.png)

![IU com um botão que diz "Aprovar"](./15.png)

### Botão como ajuda contextual {#button-as-contextual-help}

O botão também pode servir de alerta!

Esse é, na verdade, um padrão de design bastante incomum fora da Web3, mas que se tornou padrão dentro dela. Essa é uma boa inovação, pois economiza espaço e mantém a atenção focalizada.

Se a ação principal – SWAP – não está disponível devido a um erro, o motivo pode ser explicado com o botão, por exemplo.:

- trocar de rede
- conectar carteira
- vários erros

O botão também pode ser **correlacionado à ação** que precisa ser executada. Por exemplo, se o usuário não puder trocar porque está na rede errada, o botão deverá dizer “mudar para Ethereum” e, quando o usuário clicar no botão, ele deverá mudar a rede para Ethereum. Isso acelera significativamente o fluxo do usuário.

![Ações fundamentais sendo iniciadas na chamada para ação principal](./16.png)

![Mensagem de erro mostrada na chamada para ação principal](./17.png)

## Construa o seu próprio com este arquivo figma {#build-your-own-with-this-figma-file}

Graças ao trabalho intenso de vários protocolos, o design do DEX melhorou muito. Sabemos quais informações o usuário precisa, como devemos mostrá-las e como tornar o fluxo o mais fluido possível.
Esperamos que este artigo forneça uma visão geral sólida dos princípios de UX.

Se você quiser experimentar, sinta-se à vontade para usar o kit de wireframe (diagramas) do Figma. Ele é mantido o mais simples possível, mas tem flexibilidade suficiente para construir a estrutura básica de várias maneiras.

[Kit de wireframe Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

O DeFi continuará a evoluir e sempre há espaço para melhorias.

Boa sorte!
