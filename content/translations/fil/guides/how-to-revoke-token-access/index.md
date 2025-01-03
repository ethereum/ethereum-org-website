---
title: Paano bawiin ang smart contract access sa iyong crypto funds
description: Gabay sa kung paano bawiin ang access ng mga mapanlamang na smart contract token
lang: fil
---

# Paano bawiin ang smart contract access sa iyong crypto funds

Ituturo sa iyo sa gabay na ito kung paano tingnan ang listahan ng lahat ng smart contract na pinahintulutan mong i-access ang iyong pondo at kung paano kanselahin ang mga ito.

Kung minsan, naglalagay ng mga backdoor ang mga mapaminsalang developer sa mga smart contract na nagbibigay sa kanila ng access sa mga pondo ng mga walang kamalay-malay na user na nag-interact sa smart contract. Kadalasan, ang nangyayari ay humihiling ang mga naturang platform ng pahintulot mula sa user na gumastos ng **walang limitasyong bilang ng mga token** upang makatipid ng kaunting gas sa hinaharap, pero may kaakibat itong mas malaking panganib.

Kapag mayroon nang karapatan ang platform na i-access nang walang limitasyon ang token sa iyong wallet, puwede nitong gastusin ang lahat ng token na iyon kahit na-withdraw mo sa wallet mo ang mga pondo mula sa platform nito. Maa-access pa rin ng mga mapaminsalang actor ang mga pondo mo at mawi-withdraw nito ang mga ito sa kanilang mga wallet, at wala ka nang opsyon para i-recover ito.

Ang mga proteksyon lang ay iwasang gamitin ang mga hindi pa nate-test na bagong proyekto, aprubahan lang ang kailangan mo, o regular na bawiin ang access. Paano mo ito gagawin?

## Hakbang 1: Gamitin ang mga tool para sa pagbawi sa access

May ilang website na pinapayagan kang tingnan at bawiin ang mga smart contract na konektado sa iyong address. Pumunta sa website at ikonekta ang iyong wallet:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (maraming network)
- [Revoke](https://revoke.cash/) (maraming network)
- [Unrekt](https://app.unrekt.net/) (maraming network)
- [EverRevoke](https://everrise.com/everrevoke/) (maraming network)

## Hakbang 2: Ikonekta ang iyong wallet

Kapag nasa website ka na, i-click ang "Ikonekta ang wallet". Ipo-prompt ka ng website na ikonekta ang iyong wallet.

Siguraduhin mong gagamitin mo ang parehong network sa iyong wallet at website. Makikita mo lang ang mga smart contract na nauugnay sa network na pinili. Halimbawa, kung kokonekta ka sa Ethereum Mainnet, mga Ethereum contract lang ang makikita mo at hindi ang mga contract mula sa iba pang chain tulad ng Polygon.

## Hakbang 3: Piliin ang smart contract na gusto mong bawiin

Makikita mo ang lahat ng contract na binibigyan mo ng access sa mga token mo at ang mga spending limit ng mga ito. Piliin ang gusto mong i-terminate.

Kung hindi mo alam kung aling contract ang pipiliin, puwede mong bawiin ang lahat ng ito. Hindi ito magdudulot ng anumang problema sa iyo, ngunit kailangan mong magbigay ng bagong set ng mga pahintulot sa susunod na mag-interact ka sa alinman sa mga contract na ito.

## Hakbang 4: Bawiin ang access sa mga pondo mo

Kapag na-click mo na ang bawiin, may makikita kang suhestyon sa bagong transaksyon sa wallet mo. Normal lang ito. Kakailanganin mong magbayad para maisagawa ang pagkansela. Depende sa network, maaaring tumagal nang isang minuto hanggang ilang minuto bago ito maiproseso.

Ipinapayo naming i-refresh mo ang tool para sa pagbawi pagkalipas ng ilang minuto at ikonekta ulit ang iyong wallet para i-double check kung nawala na sa listahan ang binawing contract.

<mark>Inirerekomenda rin naming huwag mong bigyan ng walang limitasyong access sa iyong mga token ang mga proyekto at regular na bawiin ang lahat ng access sa token allowance. Hindi ka dapat mawalan ng pondo kapag binawi mo ang access sa token, lalo na kung ginamit mo ang mga tool na nakalista sa itaas.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Gusto mong magbasa pa?</div>
  <ButtonLink href="/guides/">
    Tingnan ang iba pa naming gabay
  </ButtonLink>
</InfoBanner>

## Mga karaniwang itanong

### Kapag binawi ang access sa token, nate-terminate din ba ang staking, pooling, pagpapautang, atbp?

Hindi nito maaapektuhan ang alinman sa mga estratehiya mo sa DeFi. Mananatili ka sa iyong mga posisyon at patuloy kang makakatanggap ng mga reward, atbp.

### Magkapareho lang ba ang pagdiskonekta ng wallet sa proyekto at ang pag-aalis ng pahintulot na gamitin ang aking mga pondo?

Hindi, kung ididiskonekta mo ang wallet mo sa proyekto, pero nagbigay ka ng mga pahintulot sa token allowance, magagamit pa rin ng mga ito ang mga token na iyon. Kailangan mong bawiin ang access na iyon.

### Kailan mag-e-expire ang pahintulot ng contract?

Walang expiration date sa mga pahintulot ng contract. Kung binigyan ka ng mga pahintulot sa contract, magagamit ang mga ito kahit lumipas na ang maraming taon mula nang ibinigay ang mga ito.

### Bakit nagtatakda ang mga proyekto ng walang limitasyong token allowance?

Kadalasang ginagawa ito ng mga proyekto para mapaliit ang bilang ng mga kahilingang kinakailangan. Ibig sabihin, isang beses lang kailangang magpahintulot ng user at isang beses lang niya kailangang bayaran ang bayarin sa transaksyon. Bagama't magiging madali ito, delikado para sa mga user na aprubahan ito nang basta-basta, sa mga site na hindi pa lubos na napatunayan o nao-audit. Pinapayagan ka ng ilang wallet na manual na limitahan ang bilang ng mga token na inaaprubahan para malimitahan ang iyong panganib. Magtanong sa iyong wallet provider para sa iba pang impormasyon.
