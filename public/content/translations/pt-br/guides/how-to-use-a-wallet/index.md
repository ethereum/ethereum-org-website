---
title: Como usar uma carteira
metaTitle: Como usar carteiras Ethereum | Passo a passo
description: Um guia explicando como enviar e receber tokens e se conectar a projetos web3.
lang: pt-br
---

Aprenda a operar todas as funções básicas de uma carteira. Se você ainda não tem uma, confira nosso guia [Como criar uma conta Ethereum](/guides/how-to-create-an-ethereum-account/).

## Abra sua carteira {#open-your-wallet}

Você deve ver um painel que provavelmente mostrará seu saldo e conterá botões para enviar e receber tokens.

## Receber criptomoeda {#receive-cryptocurrency}

Você quer receber cripto na sua carteira?

Cada conta Ethereum tem seu próprio endereço de recebimento, que é uma sequência única de números e letras. O endereço funciona como o número de uma conta bancária. Os endereços Ethereum sempre começarão com "0x". Você pode compartilhar esse endereço com qualquer pessoa: é seguro fazer isso.

Seu endereço é como o endereço da sua casa: você precisa dizer às pessoas qual é para que elas possam encontrá-lo. É seguro fazer isso, porque você ainda pode trancar a porta da frente com outra chave que só você controla, para que ninguém possa entrar, mesmo que saibam onde você mora.

Você precisa fornecer seu endereço público a quem quiser lhe enviar dinheiro. Muitos aplicativos de carteira permitem que você copie seu endereço ou mostre um código QR para escanear, facilitando o uso. Evite digitar qualquer endereço Ethereum manualmente. Isso pode facilmente levar a erros de digitação e perda de fundos.

Diferentes aplicativos podem variar ou usar uma linguagem diferente, mas eles devem guiá-lo por um processo semelhante se você estiver tentando transferir fundos.

1. Abra seu aplicativo de carteira.
2. Clique em "Receber" (ou em uma opção com palavras semelhantes).
3. Copie seu endereço Ethereum para a área de transferência.
4. Forneça ao remetente o seu endereço Ethereum de recebimento.

## Enviar criptomoeda {#send-cryptocurrency}

Você gostaria de enviar ETH para outra carteira?

1. Abra seu aplicativo de carteira.
2. Obtenha o endereço de recebimento e certifique-se de estar conectado à mesma rede que o destinatário.
3. Insira o endereço de recebimento ou escaneie um código QR com sua câmera para não precisar escrever o endereço manualmente.
4. Clique no botão "Enviar" na sua carteira (ou em uma alternativa com palavras semelhantes).

![Send field for crypto address](./send.png)
<br/>

5. Muitos ativos, como DAI ou USDC, existem em várias redes. Ao transferir tokens cripto, certifique-se de que o destinatário esteja usando a mesma rede que você, pois eles não são intercambiáveis.
6. Certifique-se de que sua carteira tenha ETH suficiente para cobrir a taxa de transação, que varia dependendo das condições da rede. A maioria das carteiras adicionará automaticamente a taxa sugerida à transação, que você poderá confirmar em seguida.
7. Assim que sua transação for processada, a quantia correspondente de cripto aparecerá na conta do destinatário. Isso pode levar de alguns segundos a alguns minutos, dependendo do quanto a rede está sendo usada no momento.

## Conectando-se a projetos {#connecting-to-projects}

Seu endereço será o mesmo em todos os projetos Ethereum. Você não precisa se registrar individualmente em nenhum projeto. Depois de ter uma carteira, você pode se conectar a qualquer projeto Ethereum sem nenhuma informação adicional. Não são necessários e-mails ou quaisquer outras informações pessoais.

1. Visite o site de qualquer projeto.
2. Se a página inicial do projeto for apenas uma descrição estática do projeto, você deve conseguir clicar em um botão "Abrir o aplicativo" no menu, que o levará ao aplicativo da web real.
3. Quando estiver no aplicativo, clique em "Conectar".

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. Selecione sua carteira na lista de opções fornecida. Se você não conseguir ver sua carteira, ela pode estar oculta na opção "WalletConnect".

![Selecting from a list of wallets to connect with](./connect2.png)

5. Confirme a solicitação de assinatura na sua carteira para estabelecer a conexão. **Assinar esta mensagem não deve exigir o gasto de nenhum ETH**.
6. É isso! Comece a usar o aplicativo. Você pode encontrar alguns projetos interessantes em nossa [página de aplicativos descentralizados (dapps)](/apps/#explore).
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Quer aprender mais?</div>
  <ButtonLink href="/guides/">
    Veja nossos outros guias
  </ButtonLink>
</AlertContent>
</Alert>

## Perguntas frequentes {#frequently-asked-questions}

### Se eu possuo um endereço ETH, eu possuo o mesmo endereço em outras blockchains? {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

Você pode usar o mesmo endereço em todas as blockchains compatíveis com a EVM (se você tiver o tipo de carteira com uma frase de recuperação). Esta [lista](https://chainlist.org/) mostrará quais blockchains você pode usar com o mesmo endereço. Algumas blockchains, como o Bitcoin, implementam um conjunto completamente separado de regras de rede e você precisará de um endereço diferente com um formato diferente. Se você tiver uma carteira de contrato inteligente, verifique o site do produto para obter mais informações sobre quais blockchains são suportadas.

### Posso usar o mesmo endereço em vários dispositivos? {#can-i-use-the-same-address-on-multiple-devices}

Sim, você pode usar o mesmo endereço em vários dispositivos. As carteiras são tecnicamente apenas uma interface para mostrar seu saldo e fazer transações; sua conta não é armazenada dentro da carteira, mas na blockchain.

### Não recebi a cripto, onde posso verificar o status de uma transação? {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

Você pode usar [exploradores de blocos](/developers/docs/data-and-analytics/block-explorers/) para ver o status de qualquer transação em tempo real. Tudo o que você precisa fazer é pesquisar o endereço da sua carteira ou o ID da transação.

### Posso cancelar ou devolver transações? {#can-i-cancel-or-return-transactions}

Não, uma vez que uma transação é confirmada, você não pode cancelar a transação.
