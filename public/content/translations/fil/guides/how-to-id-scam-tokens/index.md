---
title: Paano matukoy ang mga scam token
description: Pag-unawa sa mga scam token, paano nagmumukhang lehitimo ang mga ito, at kung paano maiiwasan ang mga ito.
lang: fil
---

# Paano matukoy ang mga scam token {#identify-scam-tokens}

One of the most common uses for Ethereum is for a group to create a tradable token, in a sense their own currency. Karaniwang sumusunod ang mga token na ito sa isang pamantayan, ang [ERC-20](/developers/docs/standards/tokens/erc-20/). Gayunpaman, saanman may mga lehitimong use case na nagpapahusay nito, mayroon ding mga kriminal na sumusubok na kunin iyon para sa kanilang sarili.

May dalawa silang paraan upang lokohin ka:

- **Pagbebentahan ka ng scam token**, na maaaring kamukha ng lehitimong token na nais mong bilhin, pero galing sa mga scammer at walang halaga ito.
- **Panlilinlang sa iyo na mag-sign ng mga hindi magandang transaksyon**, na karaniwan nilang ginagawa sa pamamagitan ng pagpapapunta sa iyo sa sarili nilang user interface. Maaari nilang subukang kumbinsihin kang bigyan ang mga contract nila ng bahagi ng iyong mga ERC-20 token, na maglalantad ng sensitibong impormasyong magbibigay sa kanila ng access sa iyong mga asset, atbp. Ang mga user interface na ito ay halos kamukhang-kamukha ng mga matapat na site, ngunit may mga nakatagong pandaraya.

Upang ipakita kung ano ang mga scam token, at kung paano matukoy ang mga ito, titingnan natin ang halimbawa nito: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Sinusubukan ng token na ito na magmukhang lehitimong [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) token.

<ExpandableCard
title="Ano ang ARB?"
contentPreview=''>

Ang Arbitrum ay isang organisasyon na nagde-develop at namamahala ng <a href="/developers/docs/scaling/optimistic-rollups/">mga optimistic rollup</a>. Sa simula, ang Arbitrum ay itinatag bilang isang for-profit na kumpanya, ngunit kumilos ito para mag-decentralize. Bilang bahagi ng prosesong iyon, naglabas ito ng tradeable na <a href="/dao/#token-based-membership">governance token</a>.

</ExpandableCard>

<ExpandableCard
title="Bakit tinatawag na wARB ang scam token?"
contentPreview=''>

May isang kasanayan sa Ethereum na kapag hindi nakakatugon sa ERC-20 ang isang asset, gumagawa tayo ng "wrapped" na bersyon nito na may pangalang nagsisimula sa "w". Halimbawa, mayroon tayong wBTC para sa bitcoin at <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH para sa ether</a>.

Hindi makatwirang gumawa ng wrapped na bersyon ng isang ERC-20 token na nasa Ethereum na, ngunit umaasa ang mga scammer sa pagmumukhang legitimate sa halip na sa katotohanan.

</ExpandableCard>

## Paano gumagana ang mga scam token? {#how-do-scam-tokens-work}

Ang layunin talaga ng Ethereum ay decentralization. Ibig sabihin nito, walang central na awtoridad na puwedeng kumumpiska ng iyong mga asset o pumigil sa iyong mag-deploy ng smart contract. Ngunit ibig sabihin rin nito, puwedeng mag-deploy ng anumang smart contract ang mga scammer.

<ExpandableCard
title="Ano ang mga matalinong kontrata?"
contentPreview=''>

Ang <a href="/developers/docs/smart-contracts/">mga smart contract</a> ang mga program na tumatakbo sa Ethereum blockchain. Halimbawa, ang bawat ERC-20 token ay ipinapatupad bilang isang smart contract.

</ExpandableCard>

Partikular dito, nag-deploy ang Arbitrum ng contract na gumagamit ng simbolong `ARB`. Ngunit, hindi nito napipigilan ang ibang tao na mag-deploy din ng contract na gumagamit ng mismong simbolong iyon, o ng katulad noon. Maitatakda ng gumagawa ng contract ang gagawin ng contract.

## Pagmumukhang lehitimo {#appearing-legitimate}

May ilang pandarayang ginagawa ang mga creator ng scam token para magmukhang lehitimo.

- **Lehitimong pangalan at simbolo**. Tulad ng nabanggit kanina, maaaring magkapareho ang simbolo at pangalan ng mga ERC-20 contract at iba pang ERC-20 contract. Hindi mo maaasahan ang mga field na iyon para sa seguridad.

- **Mga lehitimong may-ari**. Kadalasan, ine-airdrop ng mga scam token ang malalaking balanse sa mga address na parang lehitimong may-ari ng totoong token.

  Halimbawa, tingnan natin ulit ang `wARB`. [Nasa 16% ng mga token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) ang pinapangasiwaan ng address na may pampublikong tag na [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). _Hindi_ ito pekeng address, ito talaga ang address na [nag-deploy ng tunay na ARB contract sa Ethereum mainnet](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Dahil ang ERC-20 balance ng isang address ay bahagi ng storage ng ERC-20 contract, maaari itong itakda ng contract ayon sa kagustuhan ng developer ng contract. Puwede ring ipagbawal ng contract ang mga pag-transfer nang sa gayon, hindi maaalis ng mga lehitimong user ang mga scam token na iyon.

- **Mga lehitimong pag-transfer**. _Hindi magbabayad ang mga lehitimong may-ari para mag-transfer ng scam token sa iba, kaya kung may mga pag-transfer, lehitimo ito, tama?_ **Mali**. Ang mga `transfer` event ay mula sa ERC-20 contract. Madali para sa isang scammer na i-write ang contract sa paraang magsasagawa ng mga pagkilos na iyon.

## Mga scammy website {#websites}

Maaari ding gumawa ang mga scammer ng mga napakakapani-paniwalang website, na kung minsan pa ay mga eksaktong kopya ng mga tunay na site na may magkaparehong UI, ngunit may maliliit na pandaraya. Ang mga halimbawa ay mga external link na mukhang lehitimo pero dinadala pala ang user sa external scam website, o mga maling tagubilin na nagdidirekta sa user sa pag-expose ng kanyang mga key o pagpapadala ng mga pondo sa address ng attacker.

Ang pinakamagandang kagawian upang maiwasan ito ay maingat na suriin ang URL ng mga site na bibisitahin mo, at i-save ang mga address ng mga kilalang lehitimong site sa iyong mga bookmark. Pagkatapos ay maa-access mo ang tunay na site sa pamamagitan ng iyong mga bookmark nang hindi sinasadyang magkamali sa spelling o umaasa sa mga external link.

## Paano mo mapoprotektahan ang iyong sarili? {#protect-yourself}

1. **Tingnan ang address ng contract**. Ang mga lehitimong token ay nagmumula sa mga lehitimong organisasyon, at makikita mo ang mga address ng contract sa website ng organisasyon. Halimbawa, [para sa `ARB`, makikita mo ang mga lehitimong address dito](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Ang mga tunay na token ay may liquidity**. Ang isa pang opsyon ay tingnan ang laki ng liquidity pool sa [Uniswap](https://uniswap.org/), isa sa mga pinakakaraniwang protocol para sa pag-swap ng token. Ang protocol na ito ay gumagana gamit ang mga liquidity pool, kung saan idinedeposito ng mga investor ang kanilang mga token nang umaasang kikita sila mula sa mga bayarin sa trading.

Karaniwang may maliliit na liquidity pool ang mga scam token, kung mayroon man, dahil ayaw ng mga scammer na gumamit ng mga totoong asset. Halimbawa, ang `ARB`/`ETH` Uniswap pool ay nangangasiwa ng halos isang milyong dolyar ([tingnan dito ang updated na halaga](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) at hindi mababago ng pagbili o pagbebenta ng maliit na halaga ang presyo:

![Pagbili ng lehitimong token](./uniswap-real.png)

Ngunit kapag sinusubukan mong bilhin ang scam token na `wARB`, tataas ng mahigit 90% ang presyo kapag bumili ng kahit maliit na halaga:

![Pagbili ng scam token](./uniswap-scam.png)

Ito ay isa pang ebidensya na nagpapakita sa atin na ang `wARB` ay hindi lehitimong token.

3. **Tingnan sa Etherscan**. Maraming scam token ang natukoy at naiulat na ng komunidad. Ang mga ganitong token ay [minamarkahan sa Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Bagama't hindi mapagkakatiwalaang source ng katotohanan ang Etherscan (ang pagiging decentralized ng mga network ang dahilan kung bakit walang mapagkakatiwalaang source para sa pagiging lehitimo), ang mga token na matutukoy ng Etherscan bilang mga scam ay malamang na mga scam.

   ![Scam token sa Etherscan](./etherscan-scam.png)

## Conclusion {#conclusion}

Hangga't may halaga sa mundo, may mga scammer na magtatangkang nakawin ito para sa kanilang sarili, at sa isang decentralized na mundo, walang ibang magpoprotekta sa iyo kundi ikaw. Sana ay tandaan mo ang mga puntong ito para matukoy ang mga lehitimong token sa mga scam:

- Ang mga scam token ay nagpapanggap na mga lehitimong token. Maaari nilang gamitin ang parehong pangalan, simbolo, atbp.
- _Hindi_ magagamit ng mga scam token ang parehong address ng contract.
- Ang pinakamahusay na source ng addres ng lehitimong token ay ang organisasyon na nagmamay-ari sa token.
- Kung hindi ito magawa, maaari mong gamitin ang mga sikat at mapagkakatiwalaang application tulad ng [Uniswap](https://app.uniswap.org/#/swap) at [Etherscan](https://etherscan.io/).
