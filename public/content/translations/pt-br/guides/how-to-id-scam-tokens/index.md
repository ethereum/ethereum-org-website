---
title: Como identificar tokens fraudulentos
description: Entendendo os tokens fraudulentos, como eles se passam por legítimos e como evitá-los.
lang: pt-br
---

Um dos usos mais comuns do Ethereum é a criação de um token negociável por um grupo, em certo sentido, sua própria moeda. Esses tokens geralmente seguem um padrão, o [ERC-20](/developers/docs/standards/tokens/erc-20/). No entanto, onde quer que existam casos de uso legítimos que tragam valor, também existem criminosos que tentam roubar esse valor para si mesmos.

Existem duas maneiras pelas quais eles provavelmente tentarão enganar você:

- **Vendendo um token fraudulento**, que pode se parecer com o token legítimo que você deseja comprar, mas é emitido pelos golpistas e não vale nada.
- **Enganando você para assinar transações maliciosas**, geralmente direcionando você para a própria interface de usuário deles. Eles podem tentar fazer com que você dê aos contratos deles uma permissão sobre seus tokens ERC-20, expondo informações confidenciais que lhes dão acesso aos seus ativos, etc. Essas interfaces de usuário podem ser clones quase perfeitos de sites honestos, mas com truques ocultos.

Para ilustrar o que são tokens fraudulentos e como identificá-los, vamos analisar um exemplo: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Este token tenta se parecer com o token legítimo [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="O que é ARB?"
contentPreview=''>

A Arbitrum é uma organização que desenvolve e gerencia [rollups otimistas](/developers/docs/scaling/optimistic-rollups/). Inicialmente, a Arbitrum foi organizada como uma empresa com fins lucrativos, mas depois tomou medidas para se descentralizar. Como parte desse processo, eles emitiram um [token de governança](/dao/#token-based-membership) negociável.

</ExpandableCard>

<ExpandableCard
title="Por que o token de golpe se chama wARB?"
contentPreview=''>

Existe uma convenção no Ethereum de que, quando um ativo não é compatível com ERC-20, criamos uma versão "empacotada" (wrapped) dele com o nome começando com "w". Então, por exemplo, temos wBTC para bitcoin e <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH para ether</a>.

Não faz sentido criar uma versão empacotada de um token ERC-20 que já está no Ethereum, mas os golpistas confiam na aparência de legitimidade em vez da realidade subjacente.

</ExpandableCard>

## Como funcionam os tokens fraudulentos? {#how-do-scam-tokens-work}

O objetivo principal do Ethereum é a descentralização. Isso significa que não há uma autoridade central que possa confiscar seus ativos ou impedir você de implantar um contrato inteligente. Mas isso também significa que os golpistas podem implantar qualquer contrato inteligente que desejarem.

<ExpandableCard
title="O que são contratos inteligentes?"
contentPreview=''>

Os [contratos inteligentes](/developers/docs/smart-contracts/) são os programas executados na blockchain do Ethereum. Todo token ERC-20, por exemplo, é implementado como um contrato inteligente.

</ExpandableCard>

Especificamente, a Arbitrum implantou um contrato que usa o símbolo `ARB`. Mas isso não impede que outras pessoas também implantem um contrato que use exatamente o mesmo símbolo, ou um semelhante. Quem escreve o contrato pode definir o que o contrato fará.

## Parecendo legítimo {#appearing-legitimate}

Existem vários truques que os criadores de tokens fraudulentos usam para parecerem legítimos.

- **Nome e símbolo legítimos**. Como mencionado antes, os contratos ERC-20 podem ter o mesmo símbolo e nome que outros contratos ERC-20. Você não pode contar com esses campos para segurança.

- **Proprietários legítimos**. Tokens fraudulentos frequentemente fazem airdrop de saldos significativos para endereços que se espera que sejam detentores legítimos do token real.

  Por exemplo, vamos olhar para `wARB` novamente. [Cerca de 16% dos tokens](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) são mantidos por um endereço cuja tag pública é [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Este _não_ é um endereço falso, é realmente o endereço que [implantou o contrato ARB real na Rede Principal do Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Como o saldo ERC-20 de um endereço faz parte do armazenamento do contrato ERC-20, ele pode ser especificado pelo contrato para ser o que o desenvolvedor do contrato desejar. Também é possível que um contrato proíba transferências para que os usuários legítimos não consigam se livrar desses tokens fraudulentos.

- **Transferências legítimas**. _Proprietários legítimos não pagariam para transferir um token fraudulento para outras pessoas, então, se houver transferências, deve ser legítimo, certo?_ **Errado**. Os eventos `Transfer` são produzidos pelo contrato ERC-20. Um golpista pode facilmente escrever o contrato de forma que ele produza essas ações.

## Sites fraudulentos {#websites}

Os golpistas também podem produzir sites muito convincentes, às vezes até clones precisos de sites autênticos com interfaces de usuário idênticas, mas com truques sutis. Exemplos podem ser links externos que parecem legítimos, mas na verdade enviam o usuário para um site fraudulento externo, ou instruções incorretas que orientam o usuário a expor suas chaves ou enviar fundos para o endereço de um invasor.

A melhor prática para evitar isso é verificar cuidadosamente o URL dos sites que você visita e salvar os endereços de sites autênticos conhecidos em seus favoritos. Assim, você pode acessar o site real por meio de seus favoritos sem cometer erros de ortografia acidentalmente ou depender de links externos.

## Como você pode se proteger? {#protect-yourself}

1. **Verifique o endereço do contrato**. Tokens legítimos vêm de organizações legítimas, e você pode ver os endereços dos contratos no site da organização. Por exemplo, [para `ARB` você pode ver os endereços legítimos aqui](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Tokens reais têm liquidez**. Outra opção é observar o tamanho do pool de liquidez no [Uniswap](https://uniswap.org/), um dos protocolos de troca de tokens mais comuns. Este protocolo funciona usando pools de liquidez, nos quais os investidores depositam seus tokens na esperança de obter um retorno das taxas de negociação.

Tokens fraudulentos geralmente têm pools de liquidez minúsculos, se houver, porque os golpistas não querem arriscar ativos reais. Por exemplo, o pool do Uniswap `ARB`/`ETH` detém cerca de um milhão de dólares ([veja aqui o valor atualizado](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) e comprar ou vender uma pequena quantia não vai alterar o preço:

![Buying a legitimate token](./uniswap-real.png)

Mas quando você tenta comprar o token fraudulento `wARB`, até mesmo uma compra minúscula alteraria o preço em mais de 90%:

![Buying a scam token](./uniswap-scam.png)

Esta é outra evidência que nos mostra que `wARB` provavelmente não é um token legítimo.

3. **Procure no Etherscan**. Muitos tokens fraudulentos já foram identificados e denunciados pela comunidade. Esses tokens são [marcados no Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Embora o Etherscan não seja uma fonte oficial de verdade (é da natureza das redes descentralizadas que não possa haver uma fonte oficial de legitimidade), os tokens identificados pelo Etherscan como golpes provavelmente são golpes.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Conclusão {#conclusion}

Enquanto houver valor no mundo, haverá golpistas que tentarão roubá-lo para si mesmos, e em um mundo descentralizado não há ninguém para protegê-lo, exceto você mesmo. Esperamos que você se lembre destes pontos para ajudar a diferenciar os tokens legítimos dos golpes:

- Tokens fraudulentos se passam por tokens legítimos, eles podem usar o mesmo nome, símbolo, etc.
- Tokens fraudulentos _não podem_ usar o mesmo endereço de contrato.
- A melhor fonte para o endereço do token legítimo é a organização à qual o token pertence.
- Na falta disso, você pode usar aplicativos populares e confiáveis, como o [Uniswap](https://app.uniswap.org/#/swap) e o [Blockscout](https://eth.blockscout.com/).
