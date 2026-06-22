---
title: Como revogar o acesso de contratos inteligentes aos seus fundos de criptomoedas
description: Um guia prático sobre como revogar o acesso exploratório de contratos inteligentes a tokens
lang: pt-br
---

Este guia ensinará como visualizar uma lista de todos os [contratos inteligentes](/glossary/#smart-contract) aos quais você permitiu acesso aos seus fundos e como cancelá-los.

Às vezes, desenvolvedores mal-intencionados criam backdoors em contratos inteligentes que permitem o acesso aos fundos de usuários desavisados que interagem com o contrato inteligente. O que frequentemente acontece é que essas plataformas pedem ao usuário permissão para gastar um **número ilimitado de tokens** em uma tentativa de economizar pequenas quantidades de [gás](/glossary/#gas) no futuro, mas isso traz um risco maior.

Uma vez que uma plataforma tem direitos de acesso ilimitado a um token na sua [carteira](/glossary/#wallet), eles podem gastar todos esses tokens, mesmo que você tenha retirado seus fundos da plataforma deles para a sua carteira. Agentes mal-intencionados ainda podem acessar seus fundos e retirá-los para as carteiras deles, sem deixar nenhuma opção de recuperação para você.

As únicas proteções são evitar o uso de novos projetos não testados, aprovar apenas o que você precisa ou revogar o acesso regularmente. Então, como você faz isso?

## Passo 1: Use ferramentas de revogação de acesso {#step-1-use-revoke-access-tools}

Vários sites permitem que você visualize e revogue contratos inteligentes conectados ao seu endereço. Visite o site e conecte sua carteira:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (várias redes)
- [Unrekt](https://app.unrekt.net/) (várias redes)
- [EverRevoke](https://everrise.com/everrevoke/) (várias redes)

## Passo 2: Conecte sua carteira {#step-2-connect-your-wallet}

Assim que estiver no site, clique em “Connect wallet” (Conectar carteira). O site deve solicitar que você conecte sua carteira.

Certifique-se de usar a mesma rede na sua carteira e no site. Você verá apenas os contratos inteligentes relacionados à rede selecionada. Por exemplo, se você se conectar à Rede Principal do Ethereum, verá apenas contratos do Ethereum, não contratos de outras cadeias, como a Polygon.

## Passo 3: Selecione um contrato inteligente que você deseja revogar {#step-3-select-a-smart-contract-you-wish-to-revoke}

Você deve ver todos os contratos que têm acesso permitido aos seus tokens e o limite de gastos deles. Encontre aquele que você deseja encerrar.

Se você não sabe qual contrato escolher, pode revogar todos eles. Isso não criará nenhum problema para você, mas você terá que conceder um novo conjunto de permissões na próxima vez que interagir com qualquer um desses contratos.

## Passo 4: Revogue o acesso aos seus fundos {#step-4-revoke-access-to-your-funds}

Assim que você clicar em revogar, deverá ver uma nova sugestão de transação na sua carteira. Isso é esperado. Você terá que pagar a taxa para que o cancelamento seja bem-sucedido. Dependendo da rede, isso pode levar de um a vários minutos para ser processado.

Aconselhamos que você atualize a ferramenta de revogação após alguns minutos e conecte sua carteira novamente para verificar se o contrato revogado desapareceu da lista.

<mark>Recomendamos que você nunca permita que projetos tenham acesso ilimitado aos seus tokens e revogue todo o acesso de permissão de tokens regularmente. Revogar o acesso a tokens nunca deve resultar em perda de fundos, especialmente se você usar as ferramentas listadas acima.</mark>

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

### Revogar o acesso ao token também encerra staking, pooling, empréstimo, etc.? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Não, isso não afetará nenhuma das suas estratégias de [finanças descentralizadas (DeFi)](/glossary/#defi). Você permanecerá em suas posições e continuará recebendo recompensas, etc.

### Desconectar uma carteira de um projeto é o mesmo que remover a permissão para usar meus fundos? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Não, se você desconectar sua carteira do projeto, mas tiver concedido permissões de token, eles ainda poderão usar esses tokens. Você precisa revogar esse acesso.

### Quando a permissão do contrato expirará? {#when-will-the-contract-permission-expire}

Não há datas de validade nas permissões de contrato. Se você conceder permissões de contrato, elas poderão ser usadas, mesmo anos após serem concedidas.

### Por que os projetos definem permissão de token ilimitada? {#why-do-projects-set-unlimited-token-allowance}

Os projetos costumam fazer isso para minimizar o número de solicitações necessárias, o que significa que o usuário só precisa aprovar uma vez e pagar a taxa de transação apenas uma vez. Embora conveniente, pode ser perigoso para os usuários aprovar de forma descuidada, em sites que não foram comprovados com o tempo ou auditados. Algumas carteiras permitem que você restrinja manualmente a quantidade de tokens sendo aprovados para limitar seu risco. Verifique com o provedor da sua carteira para obter mais informações.
