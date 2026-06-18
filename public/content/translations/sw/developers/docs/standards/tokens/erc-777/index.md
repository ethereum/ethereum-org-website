---
title: Kiwango cha Tokeni cha ERC-777
description: Jifunze kuhusu ERC-777, kiwango kilichoboreshwa cha tokheni mbadala chenye ndoano (hooks), ingawa ERC-20 inapendekezwa kwa usalama.
lang: sw
---

## Onyo {#warning}

**ERC-777 ni ngumu kutekeleza ipasavyo, kutokana na [uwezekano wake wa kushambuliwa kwa njia tofauti](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Inapendekezwa kutumia [ERC-20](/developers/docs/standards/tokens/erc-20/) badala yake.** Ukurasa huu unasalia kama kumbukumbu ya kihistoria.

## Utangulizi? {#introduction}

ERC-777 ni kiwango cha tokheni mbadala kinachoboresha kiwango kilichopo cha [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Je, ERC-777 inapendekeza maboresho gani dhidi ya ERC-20? {#-erc-777-vs-erc-20}

ERC-777 inatoa maboresho yafuatayo dhidi ya ERC-20.

### Ndoano (Hooks) {#hooks}

Ndoano (Hooks) ni kipengele cha utendaji kilichofafanuliwa katika msimbo wa mkataba mahiri. Ndoano huitwa wakati tokeni zinatumwa au kupokelewa kupitia mkataba. Hii inaruhusu mkataba mahiri kujibu tokeni zinazoingia au kutoka.

Ndoano hizi husajiliwa na kugunduliwa kwa kutumia kiwango cha [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Kwa nini ndoano ni nzuri? {#why-are-hooks-great}

1. Ndoano zinaruhusu kutuma tokeni kwenye mkataba na kuuarifu mkataba katika muamala mmoja, tofauti na [ERC-20](https://eips.ethereum.org/EIPS/eip-20), ambayo inahitaji wito mara mbili (`approve`/`transferFrom`) ili kufanikisha hili.
2. Mikataba ambayo haijasajili ndoano haiendani na ERC-777. Mkataba unaotuma utakatisha muamala wakati mkataba unaopokea haujasajili ndoano. Hii inazuia uhamishaji wa bahati mbaya kwenda kwenye mikataba mahiri isiyo ya ERC-777.
3. Ndoano zinaweza kukataa miamala.

### Desimali {#decimals}

Kiwango hiki pia kinatatua mkanganyiko kuhusu `decimals` uliosababishwa katika ERC-20. Ufafanuzi huu unaboresha uzoefu wa msanidi programu.

### Utangamano wa kurudi nyuma na ERC-20 {#backwards-compatibility-with-erc-20}

Mikataba ya ERC-777 inaweza kuingiliana kana kwamba ni mikataba ya ERC-20.

## Usomaji Zaidi {#further-reading}

[EIP-777: Kiwango cha Tokeni](https://eips.ethereum.org/EIPS/eip-777)