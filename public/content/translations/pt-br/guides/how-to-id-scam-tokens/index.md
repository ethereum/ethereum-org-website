---
title: Como identificar tokens fraudulentos
description: Compreender tokens fraudulentos, como se fazem passar por legítimos e como evitá-los.
lang: pt-br
---

# Como identificar tokens fraudulentos {#identify-scam-tokens}

Um dos usos mais comuns do Ethereum é para que um grupo possa criar sua própria moeda negociável. Esses tokens normalmente seguem um padrão, [ERC-20](/developers/docs/standards/tokens/erc-20/). Entretanto, sempre onde há casos de uso legítimos que agregam valor, também haverá criminosos que tentam roubar esse valor.

É possível enganar você de duas formas:

- **Por meio da venda de um token fraudulento**, que pode se parecer com o token legítimo que você quer comprar, mas que é emitido por golpistas e não vale nada.
- **Enganar você para assinar transações inadequadas**, geralmente direcionando você para a interface de usuário da fraude. Eles podem tentar convencer você a permitir que os contratos deles acessem os tokens ERC-20, o que poderá expor informações confidenciais com as quais eles terão acesso aos seus ativos etc. Essas interfaces de usuário podem ser clones quase perfeitos de sites honestos, mas com truques ocultos.

Para ilustrar o que são tokens fraudulentos e como identificá-los, veremos um exemplo: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Esse token tenta se parecer com o token [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) legítimo.

<ExpandableCard
title="O que é ARB?"
contentPreview=''>

Arbitrum é uma organização que desenvolve e gerencia <a href="/developers/docs/scaling/optimistic-rollups/">rollups otimistas</a>. Inicialmente, a Arbitrum foi organizada como uma empresa com fins lucrativos, mas depois tomou medidas para se descentralizar. Como parte desse processo, a empresa emitiu um <a href="/dao/#token-based-membership">token de governança</a> negociável.

</ExpandableCard>

<ExpandableCard
title="Por que o token fraudulento é chamado wARB?"
contentPreview=''>

Há uma convenção no Ethereum de que, quando um ativo não está em conformidade com o ERC-20, criamos uma versão "enrolada" dele, com o nome começando com "w". Por exemplo, temos wBTC para bitcoin e <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH para ether</a>.

Não faz sentido criar uma versão enrolada de um token ERC-20 que já está no Ethereum, mas os golpistas confiam na aparência de legitimidade em vez da realidade subjacente.

</ExpandableCard>

## Como funcionam os tokens fraudulentos? {#how-do-scam-tokens-work}

O ponto principal do Ethereum é a descentralização. Isso significa que não há uma autoridade central que possa confiscar os seus ativos ou impedir você de implantar um contrato inteligente. Mas isso também significa que os golpistas podem implementar qualquer contrato inteligente.

<ExpandableCard
title="O que são contratos inteligentes?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Os contratos inteligentes</a> são programas que são executados no blockchain Ethereum. Cada token ERC-20, por exemplo, é implementado como um contrato inteligente.

</ExpandableCard>

Especificamente, a Arbitrum implantou um contrato que utiliza o símbolo `ARB`. Mas isso não impede que outras pessoas também implantem um contrato que use exatamente o mesmo símbolo, ou um semelhante. Quem elabora o contrato pode definir o que o contrato fará.

## Aparência de legitimidade {#appearing-legitimate}

Os criadores de tokens fraudulentos têm diversos truques para fazer com que os tokens passem por legítimos.

- **Nome e símbolo legítimos**. Conforme mencionado anteriormente, os contratos ERC-20 podem ter o mesmo símbolo e nome que outros contratos ERC-20. Você não pode confiar na segurança desses campos.

- **Proprietários legítimos**. Os tokens fraudulentos geralmente lançam saldos significativos em endereços que deveriam ser titulares legítimos do token real.

  Por exemplo, vamos ver o `wARB` novamente. [Cerca de 16% dos tokens](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) são mantidos por um endereço cuja tag pública é [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). Isso _não_ é um endereço falso, na verdade é o endereço que [implantou o contrato ARB real na rede principal do Ethereum](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Como o saldo ERC-20 de um endereço faz parte do armazenamento do contrato ERC-20, ele pode ser especificado pelo contrato como sendo o que o desenvolvedor do contrato desejar. Também é possível um contrato proibir transferências, fazendo com que os usuários legítimos não consigam eliminar esses tokens fraudulentos.

- **Transferências legítimas**. _Os proprietários legítimos não pagarão terceiros para transferir um token fraudulento. Portanto, se há transferências, elas devem ser legítimas, certo?_ **Errado**. Eventos de `transferência` são produzidos pelo contrato ERC-20. Um golpista pode facilmente elaborar o contrato de forma que ele produza essas ações.

## Sites fraudulentos {#websites}

Os golpistas também podem criar sites muito convincentes, às vezes até clones exatos de sites autênticos, com interfaces de usuário idênticas, mas com truques sutis. Os exemplos podem incluir links externos que parecem legítimos e que, na verdade, enviam o usuário para um site externo fraudulento, ou instruções incorretas que orientam o usuário a expor as chaves ou enviar fundos para o endereço de um invasor.

A melhor prática para evitar isso é verificar cuidadosamente o URL dos sites que você visita e salvar os endereços de sites autênticos conhecidos nos seus favoritos. Assim, você pode acessar o site real por meio dos seus favoritos, sem cometer erros de ortografia acidentalmente ou depender de links externos.

## Como você pode se proteger? {#protect-yourself}

1. **Verificação do endereço do contrato**. Os tokens legítimos derivam de organizações legítimas, e você pode ver os endereços do contrato no site da organização. Por exemplo, [do `ARB`, os endereços legítimos estão disponíveis aqui](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Os tokens reais têm liquidez**. Outra opção é observar o tamanho do pool de liquidez no [Uniswap](https://uniswap.org/), um dos protocolos de troca de tokens mais comuns. Esse protocolo funciona usando pools de liquidez, nos quais os investidores depositam os tokens na esperança de obter um retorno das taxas de negociação.

Os tokens fraudulentos normalmente têm pools de liquidez minúsculos, quando têm, porque os golpistas não querem arriscar ativos reais. Por exemplo, o pool `ARB`/`ETH` do Uniswap detém aproximadamente um milhão de dólares ([consulte o valor atualizado aqui](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) e comprar ou vender uma pequena quantidade não mudará o preço:

![Comprar um token legítimo](./uniswap-real.png)

Mas quando você tenta comprar o token fraudulento `wARB`, mesmo uma compra minúscila alterará o preço em mais de 90%:

![Comprar um token fraudulento](./uniswap-scam.png)

Essa é outra evidência que nos mostra que esse `wARB` provavelmente não é um token legítimo.

3. **Confira no Etherscan**. Muitos tokens fraudulentos já foram identificados e denunciados pela comunidade. Esses tokens estão [marcados no Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Embora o Etherscan não seja uma fonte de verdade autorizada (é da natureza das redes descentralizadas não poder haver uma fonte de legitimidade autorizada), os tokens identificados pelo Etherscan como fraudes provavelmente serão fraudes.

   ![Token fraudulento no Etherscan](./etherscan-scam.png)

## Conclusão {#conclusion}

Enquanto houver valor no mundo, haverá golpistas que tentarão roubá-lo e, em um mundo descentralizado, não há ninguém para protegê-lo além de você. Esperamos que você se lembre desses pontos para ajudar a distinguir os tokens legítimos dos fraudulentos:

- Os tokens fraudulentos se fazem passar por tokens legítimos, podendo usar o mesmo nome, símbolo etc.
- Os tokens fraudulentos _não podem_ utilizar o mesmo endereço de contrato.
- A melhor fonte do endereço do token legítimo é a organização proprietária do token.
- Caso contrário, você pode usar aplicativos populares e confiáveis, como [Uniswap](https://app.uniswap.org/#/swap) e [Etherscan](https://etherscan.io/).
