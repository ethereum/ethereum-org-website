---
title: Como revogar o acesso ao contrato inteligente aos seus fundos cripto
description: Um guia sobre como revogar o acesso explorativo ao token de contrato inteligente
lang: pt-br
---

# Como revogar o acesso ao contrato inteligente aos seus fundos cripto

Este guia ensinará como visualizar uma lista de todos os contratos inteligentes com permissão de acesso aos seus fundos e como cancelá-los.

Às vezes, desenvolvedores maliciosos constroem backdoors em contratos inteligentes que permitem acesso aos fundos de usuários desinformados que interagem com contratos inteligentes. O que muitas vezes acontece é que tais plataformas pedem permissão ao usuário para gastar um **número ilimitado de tokens** na tentativa de salvar pequenas quantidades de gás no futuro, mas isso acarreta riscos maiores.

Uma vez que uma plataforma tem direitos ilimitados de acesso a um token em sua carteira, ela pode gastar todos esses tokens mesmo se você tiver retirado seus fundos da plataforma para sua carteira. Atores maliciosos ainda podem acessar seus fundos e retirá-los para suas carteiras sem uma opção de recuperação para você.

As únicas proteções são deixar de usar novos projetos não testados, aprovar apenas o que você precisa, ou revogar o acesso regularmente. Então, como fazer isso?

## Passo 1: Usar ferramentas de revogação de acesso

Vários sites permitem que você veja e revogue os contratos inteligentes conectados ao seu endereço. Visite o site e conecte sua carteira:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (múltiplas redes)
- [Revoke](https://revoke.cash/) (múltiplas redes)
- [Unrekt](https://app.unrekt.net/) (múltiplas redes)
- [EverRevoke](https://everrise.com/everrevoke/) (múltiplas redes)

## Passo 2: Conecte sua carteira

Assim que estiver no site, clique em “Conectar carteira”. O site deverá solicitar que você conecte sua carteira.

Certifique-se de usar a mesma rede em sua carteira e site. Você verá apenas os contratos inteligentes relacionados à rede selecionada. Por exemplo, se você se conectar à Ethereum Mainnet (Rede principal do Ethereum), você verá apenas contratos do Ethereum, não contratos de outras redes, como a Polygon.

## Passo 3: Selecione um contrato inteligente que deseja revogar

Você deve ver todos os contratos aos quais é permitido acesso a seus tokens e seus limites de gastos. Encontre aquele que você deseja encerrar.

Se você não sabe qual contrato escolher, você pode revogar todos eles. Isso não criará nenhum problema para você, mas terá que conceder um novo conjunto de permissões na próxima vez que interagir com qualquer um desses contratos.

## Passo 4: Revogar o acesso aos seus fundos

Ao clicar em revogar, você verá uma nova sugestão de transação na sua carteira. Isso é o que se espera que aconteça. Você terá que pagar a tarifa para o cancelamento ser bem-sucedido. Dependendo da rede, isso pode levar de um a vários minuto para ser processado.

Aconselhamos que você atualize a ferramenta de revogação após alguns minutos e conecte sua carteira novamente para ter certeza de que o contrato revogado desapareceu da lista.

<mark>Recomendamos que você nunca permita que seus projetos tenham acesso ilimitado aos seus tokens e revogue toda permissão de acesso aos seus tokens regularmente. Revogar o acesso ao token nunca deve resultar na perda de fundos, especialmente se você usar as ferramentas listadas acima.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Quer saber mais?</div>
  <ButtonLink href="/guides/">
    Veja nossos outros guias
  </ButtonLink>
</InfoBanner>

## Perguntas frequentes

### A revogação do acesso ao token também encerrará staking, pooling, empréstimo, etc?

Não, não afetará nenhuma das suas estratégias de DeFi. Você permanecerá em suas posições e continuará recebendo recompensas, etc.

### Desconectar uma carteira de um projeto é o mesmo que remover a permissão para usar meus fundos?

Não, se você desconectar sua carteira do projeto, mas tiver concedido permissões de acesso aos tokens, eles ainda podem usar esses tokens. Você precisa revogar esse acesso.

### Quando a permissão do contrato expirará?

Não há datas de validade nas permissões do contrato. Se você conceder permissões contratuais, elas podem ser usadas, mesmo anos após serem concedidas.

### Por que os projetos definem a permissão de token ilimitada?

Projetos muitas vezes fazem isso para minimizar o número de solicitações necessárias, ou seja, o usuário só tem que aprovar uma vez e pagar a taxa de transação apenas uma vez. Embora conveniente, isso pode ser perigoso para os usuários aprovarem descuidadamente, em sites que não são comprovados com o tempo ou auditados. Algumas carteiras permitem que você restrinja manualmente a quantidade de tokens a serem aprovados para limitar o seu risco. Contate seu provedor de carteira para obter mais informações.
