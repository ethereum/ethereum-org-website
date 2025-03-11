---
title: Como usar uma carteira
description: Uma guia explicando como enviar, receber tokens e conectar-se aos projetos da web3.
lang: pt-br
---

# Como usar uma carteira

Aprenda como operar todas as funções básicas de uma carteira. Se você ainda não tem uma conta, confira o nosso guia [Como criar uma conta Ethereum](/guides/how-to-create-an-ethereum-account/).

## Abra sua conta

Você verá um painel que provavelmente mostrará seu saldo e os botões para enviar e receber tokens.

## Receber criptomoedas

Você quer receber criptomoedas na sua carteira?

Cada conta do Ethereum possui seu próprio endereço de recebimento, que é uma sequência única de números e letras. O endereço funciona como um número de conta bancária ou chave pix. Os endereços Ethereum sempre começarão com “0x”. Você pode compartilhar esse endereço com qualquer pessoa: é seguro fazê-lo.

O seu endereço é como o endereço da sua casa: você precisa dizer às pessoas para que elas possam encontrar você. É seguro fazer isso, porque você ainda pode trancar a porta da frente com outra chave que só você controla para que ninguém possa entrar, mesmo que saibam onde você mora.

Você precisa fornecer seu endereço público a quem desejar enviar dinheiro a você. Muitos aplicativos de carteira permitem que você copie seu endereço ou mostre um código QR para facilitar o uso. Evite digitar qualquer endereço Ethereum manualmente. Isso pode facilmente levar a erros administrativos e perda de fundos.

Aplicativos diferentes podem variar ou usar linguagens diferentes, mas devem conduzir você por um processo semelhante se estiver tentando transferir fundos.

1. Abra o aplicativo da sua carteira.
2. Clique em “Receber” (ou na opção com palavras semelhantes).
3. Copie o seu endereço Ethereum para a área de transferência.
4. Forneça ao remetente o seu endereço Ethereum.

## Enviar criptomoeda

Deseja enviar ETH para outra carteira?

1. Abra o aplicativo da sua carteira.
2. Obtenha o endereço de recebimento e verifique se está conectado à mesma rede do destinatário.
3. Insira o endereço de recebimento ou digitalize um código QR com a sua câmera para que você não precise escrever o endereço manualmente.
4. Clique no botão “Enviar” em sua carteira (ou uma alternativa com palavras semelhantes).

![Enviar campo para endereço cripto](./send.png)
<br/>

5. Muitos ativos, como DAI e USDC, existem em várias redes. Ao transferir tokens de criptomoedas, certifique-se de que o destinatário está usando a mesma rede que você, já que isso não pode ser alterado.
6. Certifique-se de que sua carteira tenha ETH suficiente para cobrir a taxa de transação, que varia dependendo das condições da rede. A maioria das carteiras adicionará automaticamente a taxa sugerida para a transação. Em seguida, você pode confirmar.
7. Uma vez que a transação é processada, o valor de cripto correspondente aparecerá na conta do destinatário. Isso pode demorar de alguns segundos a alguns minutos, dependendo do quanto a rede está sendo usada atualmente.

## Conectando-se a projetos

Seu endereço será o mesmo em todos os projetos do Ethereum. Você não precisa se registrar individualmente em nenhum projeto. Quando tiver uma carteira, você poderá se conectar a qualquer projeto na rede Ethereum sem quaisquer informações adicionais. Não são necessários e-mails ou outras informações pessoais.

1. Visite o website do projeto.
2. Se a página inicial do projeto for apenas uma descrição estática do projeto, você deve poder clicar em um botão “Abrir o App” no menu que irá navegar para o aplicativo web real.
3. Quando estiver no aplicativo, clique em “Conectar”

![Botão que permite ao usuário se conectar ao site com uma carteira](./connect1.png)

4. Selecione sua carteira da lista de opções fornecidas. Se você não conseguir ver sua carteira, ela pode estar escondida na a opção “WalletConnect”.

![Selecionando de uma lista de carteiras com as quais se conectar](./connect2.png)

5. Confirme o pedido de assinatura na sua carteira para estabelecer a conexão. **A assinatura desta mensagem não dever exigir o gasto de nenhum ETH**.
6. É isso! Comece a usar o app. Você pode encontrar alguns projetos interessantes em nossa [página de dApps](/dapps/#explore). <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Quer saber mais?</div>
  <ButtonLink href="/guides/">
    Veja nossos outros guias
  </ButtonLink>
</InfoBanner>

## Perguntas frequentes

### Se eu tenho um endereço de ETH, o endereço é o mesmo para outras blockchains?

Você pode utilizar o mesmo endereço em todos os blockchains compatíveis com EVM (se você tiver o tipo de carteira com uma frase de recuperação). Esta [lista](https://chainlist.org/) mostra quais blockchains você pode usar com o mesmo endereço. Algumas blockchains, como o Bitcoin, implementam um conjunto completamente separado de regras de rede e você precisará de um endereço diferente com um formato diferente. Se você tem uma carteira de contrato inteligente, você deve verificar o site do produto para mais informações sobre quais blockchains são suportadas.

### Posso usar o mesmo endereço em vários dispositivos?

Sim, você pode utilizar o mesmo endereço em diversos dispositivos. Tecnicamente, carteiras são apenas uma interface para mostrar o seu saldo e fazer transações — sua conta não está armazenada na carteira, mas na blockchain.

### Eu não recebi a criptomoeda. Onde posso verificar o status da transação?

Você pode usar [exploradores de blocos](/developers/docs/data-and-analytics/block-explorers/) para ver o status de qualquer transação em tempo real. Tudo o que você precisa fazer é pesquisar o endereço da sua carteira ou o ID da transação.

### Posso cancelar ou retornar transações?

Não, uma vez que uma transação é confirmada, você não pode cancelá-la.
