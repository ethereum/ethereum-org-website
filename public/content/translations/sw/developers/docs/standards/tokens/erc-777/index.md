---
title: ERC-777 Ishara kiwango
description: Kujifunza kuhusu ERC-777, kueneza badilishwa ishara kiwango na ndoano, ingawa ERC-20 ni kupendekeza kwa ajili ya usalama.
lang: sw
---

## Onyo {#warning}

\*\* ERC-777 ni vigumu kutekeleza vizuri, kutokana na yake [usumbufu kwa aina mbalimbali za mashambulizi](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Kushauriwa kutumia [ERC-20]
(/developers/docs/standards/tokens/erc-20/) badala yake.\*\* Ukurasa huu kubaki kuwa hifadhi ya kihistoria.

## Utangulizi? {#introduction}

ERC-777 ni badilishwa ishara kiwango kueneza zipo [ERC-20]
(/developers/docs/standards/tokens/erc-20/) kiwango.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa vizuri ukurasa huu, kupendekeza wewe kwanza kusoma kuhusu [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Ni uenezaji gani ERC-777 kupendekeza juu ya ERC-20? {#-erc-777-vs-erc-20}

ERC-777 hutoa uenezaji yafuatayo juu ya ERC-20.

### Vidokezo {#hooks}

Vidokezo ni kazi ilivyoelezwa katika kanuni ya mkataba erevu. Vidokezo kupata kuitwa wakati ishara ni kutumwa au kupokea kwa njia ya mkataba. Hii kuruhusu mkataba erevu kuguswa kwa ishara kuingia au zinazotoka.

Vidokezo ni rekodi na gunduliwa kutumia [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)kiwango.

#### Kwa nini ndoano ni nzuri? {#why-are-hooks-great}

1. Hooki huruhusu kutuma tokeni kwa mkataba na kuuarifu mkataba huo katika muamala mmoja, tofauti na [ERC-20](https://eips.ethereum.org/EIPS/eip-20), ambayo inahitaji simu mbili (`idhinisha`/`hamishaKutoka`) ili kufanikisha hili.
2. Mikataba ambayo haijasajili hooki haiendani na ERC-777. Mkataba unaotuma utaghairi muamala wakati mkataba unaopokea haujasajili hooki. Hii inazuia uhamishaji wa bahati mbaya kwa mikataba-erevu isiyo ya ERC-777.
3. Hooki zinaweza kukataa miamala.

### Nukta desimali {#decimals}

Kiwango hiki pia kinatatua mkanganyiko kuhusu `decimals` uliosababishwa katika ERC-20. Uwazi huu unaboresha uzoefu wa msanidi programu.

### Upatanifu wa nyuma na ERC-20 {#backwards-compatibility-with-erc-20}

Mikataba ya ERC-777 inaweza kuingiliana nayo kana kwamba ni mikataba ya ERC-20.

## Masomo zaidi {#further-reading}

[EIP-777: Kiwango cha Tokeni](https://eips.ethereum.org/EIPS/eip-777)
