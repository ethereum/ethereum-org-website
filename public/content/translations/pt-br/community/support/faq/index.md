---
title: Perguntas frequentes
description: Perguntas comuns sobre o Ethereum relacionadas a carteiras, transações, staking e muito mais.
lang: pt-br
---

## Enviei cripto para o endereço errado {#wrong-wallet}

Uma transação enviada no Ethereum é irreversível. Infelizmente, se você enviou ETH ou tokens para a carteira errada, não há como reverter a transação.

**O que você pode fazer:**

- **Se você conhece o proprietário do endereço**, entre em contato diretamente com ele e peça que devolva os fundos
- **Se o endereço pertencer a uma corretora ou serviço conhecido**, entre em contato com a equipe de suporte deles, pois eles podem ajudar
- **Se você enviou tokens para um endereço de contrato**, verifique se o contrato tem uma função de saque ou recuperação (isso é raro)

Na maioria dos casos, não há como recuperar os fundos. Nenhuma organização central, entidade ou pessoa é dona do Ethereum, o que significa que ninguém pode reverter transações. Sempre verifique o endereço do destinatário antes de confirmar.

## Perdi o acesso à minha carteira {#lost-wallet-access}

Suas opções de recuperação dependem do tipo de carteira que você usa.

### Se você tem sua frase semente (frase de recuperação) {#if-you-have-your-seed-phrase-recovery-phrase}

Você pode restaurar sua carteira em qualquer aplicativo de carteira compatível usando sua frase semente. É por isso que é fundamental manter sua frase semente armazenada com segurança offline. Verifique a documentação do provedor da sua carteira para obter instruções de restauração.

### Se você perdeu sua frase semente {#if-you-have-lost-your-seed-phrase}

Sem sua frase semente ou chaves privadas, seus fundos não podem ser recuperados. Ninguém, incluindo o ethereum.org, pode redefinir sua senha ou restaurar o acesso a uma carteira de autocustódia.

### Se sua conta estiver em uma corretora {#if-your-account-is-on-an-exchange}

Se sua conta estiver em uma corretora centralizada como Coinbase, Binance ou Kraken, entre em contato diretamente com a equipe de suporte da corretora. Eles controlam as contas em sua plataforma e podem ajudar com redefinições de senha ou recuperação de conta.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Nunca compartilhe sua frase semente com ninguém** que afirme ajudar você a recuperar sua carteira. Esta é uma das táticas de golpe mais comuns. Nenhum serviço legítimo jamais pedirá sua frase semente.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Como usar uma carteira
</DocLink>

## Minha transação está travada ou pendente {#stuck-transaction}

As transações no Ethereum podem ficar travadas quando a taxa de gas que você definiu for menor do que a rede exige no momento. A maioria das carteiras permite que você corrija isso:

- **Acelerar:** Reenvie a mesma transação com uma taxa de gas mais alta
- **Cancelar:** Envie uma transação de 0 ETH para o seu próprio endereço usando o mesmo nonce da transação pendente

### Guias úteis {#helpful-guides}

- [Como acelerar ou cancelar uma transação pendente na MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Como cancelar transações pendentes no Ethereum](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Como posso reivindicar minha distribuição gratuita de Ethereum? {#giveaway-scam}

As distribuições gratuitas de Ethereum são golpes projetados para roubar seu ETH. Não se sinta tentado por ofertas que parecem boas demais para ser verdade. Se você enviar ETH para um endereço de distribuição gratuita, não receberá a distribuição gratuita e não conseguirá recuperar seus fundos.

[Mais sobre prevenção de golpes](/security/#common-scams)

## Como faço stake de ETH? {#how-to-stake}

Para se tornar um validador, você deve fazer stake de 32 ETH no contrato de depósito do Ethereum e configurar um nó validador. Você também pode participar com menos ETH por meio de pools de staking.

Mais informações estão disponíveis em nossas [páginas de staking](/staking/) e na [plataforma de lançamento de staking](https://launchpad.ethereum.org/).

## Como faço para minerar Ethereum? {#mining-ethereum}

A mineração de Ethereum não é mais possível. A mineração foi desativada quando o Ethereum mudou da [Prova de Trabalho (PoW)](/glossary/#pow) para a [Prova de Participação (PoS)](/glossary/#pos) durante o [The Merge](/roadmap/merge/) em setembro de 2022. Agora, em vez de mineradores, o Ethereum tem validadores. Qualquer pessoa pode fazer [stake](/glossary/#staking) de ETH e receber recompensas de staking por executar o software de validador para proteger a rede.