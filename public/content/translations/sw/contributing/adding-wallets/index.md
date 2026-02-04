---
title: Kuongeza Pochi za Kidijitali
description: Sera tunazotumia katika kuongeza pochi za kidijitali kwenye ethereum.org
lang: sw
---

# Kuongeza mikoba {#adding-wallets}

Tunataka kuhakikisha tunaonesha aina mbalimbali za pochi za kidijitali zinazohusisha huduma tofauti ili watumiaji waweze kutumia Ethereum kwa namna ya kujiamini.

Mtu yeyote yuko huru kupendekeza kuongeza pochi za kidijitali kwenye ethereum.org. Kama kuna pochi ambayo hatujaiweka, tafadhali ipendekeze!

Kwa sasa pochi zimeorodheshwa kwenye:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Pochi za kidijitali hubadilika kwa haraka sana kwenye Ethereum. ''Tumejaribu kuunda mfumo wa haki wa kuzingatia kwenye ethereum.org, lakini vigezo vya kuorodhesha vitabadilika na kubadilika kadri muda unavyopita.''.

## Mfumo wa uamuzi{#the-decision-framework}

### Vigezo vya kujumuishwa: Mahitaji ya lazima {#the-must-haves}

- **Bidhaa iliyojaribiwa kiusalama** - iwe kupitia ukaguzi, timu ya ndani ya usalama, msimbo wa chanzo wazi, au njia nyingine yoyote, usalama wa mkoba wako lazima uwe wa kuaminika. Hii kupunguza hatari kwa watumiaji wetu na inaonyesha kuwa unachukua usalama kwa makini.
- **Mkoba ambao umekuwa "live" kwa zaidi ya miezi sita AU umetolewa na kundi lenye rekodi ya sifa nzuri** - hii ni ishara nyingine ya usalama. Miezi sita ni muda mzuri wa makosa muhimu na mianya ya usalama kugunduliwa. Tunaomba miezi sita ili kusaidia kuchuja miradi iliyogawanyika ambayo mara nyingi husalitiwa haraka.
- **Kushughulikiwa na timu hai** - hii husaidia kuhakikisha ubora na kwamba mtumiaji atapata usaidizi kwa maswali yake.
- **Taarifa ya uorodheshaji iliyo ya kweli na sahihi** - inatarajiwa kuwa orodha zozote zinazopendekezwa kutoka kwa miradi zinakuja na taarifa za kweli na sahihi. Bidhaa zitakazodanganya taarifa za orodha, kama kudai bidhaa yako ni "chanzo wazi" wakati siyo, zitatolewa.
- **Anwani ya mawasiliano** - Anwani ya mawasiliano ya mkoba itatusaidia sana kupata taarifa sahihi pindi mabadiliko yanapofanywa. Hii itaendelea kuhuisha ethereum.org ili iwe rahisi kusimamia wakati wa kukusanya taarifa za baadaye.
- **Miamala ya EIP-1559 (aina ya 2)** - mkoba wako lazima uunge mkono miamala ya EIP-1559 (aina ya 2) kwa ajili ya miamala kwenye Mtandao Mkuu wa Ethereum.
- **Uzoefu mzuri wa mtumiaji** - Ingawa UX ni suala la kibinafsi, ikiwa wanachama kadhaa wa timu ya msingi watajaribu bidhaa na kuiona ni ngumu kutumia, tunahifadhi haki ya kuukataa mkoba huo na badala yake tutatoa mapendekezo muhimu ya kuboresha. Hii inafanywa ili kulinda msingi wetu wa watumiaji ambao mara nyingi unajumuishwa na wanaoanza.
- **Unaolenga Ethereum** - Mkoba lazima utoe uzoefu wa kimsingi unaolenga Ethereum. Hii inamaanisha Ethereum (au L2 yoyote) imewekwa kama mtandao chaguo-msingi, mali za ERC zinaungwa mkono ipasavyo, na vipengele vinaendana na mfumo ekolojia wa Ethereum. Mikoba inayopa kipaumbele safu mbadala za 1 (alternative layer 1s) katika kiolesura cha mtumiaji (UI) haitaorodheshwa.

### Kuondoa bidhaa {#product-removals}

- **Taarifa zilizosasishwa** - Watoa huduma za mikoba wana jukumu la kuwasilisha tena taarifa za mikoba yao kila baada ya miezi 6 ili kuhakikisha uhalali na umuhimu wa taarifa zilizotolewa (hata kama hakuna mabadiliko kwenye bidhaa zao). Kama timu ya bidhaa itashindwa kufanya hivyo, ethereum.org inaweza kuondoa mradi huo kutoka kwenye ukurasa.

### Vigezo vingine: Yanayopendeza kuwa nayo {#the-nice-to-haves}

- **Inapatikana ulimwenguni kote** - mkoba wako hauna vikwazo vya kijiografia au mahitaji ya KYC yanayowatenga baadhi ya watu kupata huduma yako.
- **Inapatikana katika lugha nyingi** - mkoba wako umetafsiriwa katika lugha nyingi na kuruhusu watumiaji kote ulimwenguni kuufikia.
- **Chanzo huria** - msimbo mzima wa mradi wako (sio moduli tu) unapaswa kupatikana na unapaswa kukubali Maombi ya Uunganishaji (PRs) kutoka kwa jamii pana.
- **Isiyo na Mlinzi** - watumiaji hudhibiti fedha zao wenyewe. Kama bidhaa yako kutoweka, watumiaji bado wanaweza kupata na kuhamisha fedha zao.
- **Usaidizi wa mkoba wa maunzi** - watumiaji wanaweza kuunganisha mkoba wao wa maunzi ili kutia saini miamala.
- **WalletConnect** - watumiaji wanaweza kuunganisha kwenye mifumo mtawanyo ya kimamlaka (dapps) wakitumia WalletConnect.
- **Kuingiza vituo vya mwisho vya Ethereum RPC** - watumiaji wanaweza kuingiza data za RPC za nodi, na kuwaruhusu kuungana na nodi ya chaguo lao, au mitandao mingine inayoendana na EVM.
- **NFTs** - watumiaji wanaweza kutazama na kuingiliana na NFTs zao kwenye mkoba.
- **Kuunganisha kwenye programu za Ethereum** - watumiaji wanaweza kuunganisha na kutumia programu za Ethereum.
- **Staking** - watumiaji wanaweza kufanya staking moja kwa moja kupitia mkoba.
- **Ubadilishaji** - watumiaji wanaweza kubadilisha tokeni kupitia mkoba.
- **Mitandao ya Multichain** - mkoba wako unawezesha watumiaji kufikia mitandao mingi ya mnyororo wa bloku kwa chaguo-msingi.
- **Mitandao ya Safu ya 2 (Layer 2)** - mkoba wako unawezesha watumiaji kufikia mitandao ya safu ya 2 kwa chaguo-msingi.
- **Kubinafsisha ada za gesi** - mkoba wako unawaruhusu watumiaji kubinafsisha ada zao za gesi za miamala (ada ya msingi, ada ya kipaumbele, ada ya juu).
- **Usaidizi wa ENS** - mkoba wako unawaruhusu watumiaji kutuma miamala kwenda kwa majina ya ENS.
- **Usaidizi wa ERC-20** - mkoba wako unawaruhusu watumiaji kuingiza mikataba ya tokeni za ERC-20, au unauliza na kuonyesha tokeni za ERC-20 kiotomatiki.
- **Nunua sarafu ya kidigitali** - mkoba wako unawezesha watumiaji kununua na kuanza kutumia sarafu za kidigitali moja kwa moja.
- **Uza kwa fiat** - mkoba wako unawezesha watumiaji kuuza na kutoa kwa fedha za serikali (fiat) moja kwa moja kwenye kadi au akaunti ya benki.
- **Multisig** - mkoba wako unaunga mkono sahihi nyingi ili kutia saini muamala.
- **Urejeshaji wa kijamii** - mkoba wako unaunga mkono walinzi na mtumiaji anaweza kurejesha mkoba wake ikiwa atapoteza funguo la maneno (seed phrase) kwa kutumia walinzi hawa.
- **Timu maalum ya usaidizi** - mkoba wako una timu maalum ya usaidizi ambapo watumiaji wanaweza kwenda wanapopata matatizo.
- **Nyenzo/nyaraka za kielimu** - bidhaa yako inapaswa kuwa na uzoefu mzuri wa kumkaribisha mtumiaji ili kusaidia na kuelimisha watumiaji. Au ushahidi wa jinsi-ya maudhui kama makala au filamu.

## Kuongeza mkoba {#adding-a-wallet}

Kama unataka kuongeza pochi kwenye ethereum.org, tengeneza suala kwenye Github.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Unda suala
</ButtonLink>

## Matengenezo{#maintenance}

Kama ni asili ya maji ya Ethereum, timu na bidhaa kuja na kwenda na uvumbuzi hutokea kila siku, hivyo tutaweza kufanya ukaguzi wa kawaida wa maudhui yetu ya:

- hakikisha kwamba pochi na dapps zote zilizoorodheshwa bado zinakidhi vigezo vyetu
- kuthibitisha hakuna bidhaa ambazo kupendekeza ambazo hukutana zaidi ya vigezo vyetu kuliko wao kwenye orodha sasa

ethereum.org inatunzwa na jamii ya chanzo huria na tunategemea jamii kusaidia kuiweka ikiwa imesasishwa. Ukiona taarifa yoyote kuhusu mikoba iliyoorodheshwa inayohitaji kusasishwa, tafadhali [fungua hoja](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) au [ombi la uunganishaji](https://github.com/ethereum/ethereum-org-website/pulls)!

## Masharti ya matumizi {#terms-of-use}

Tafadhali pia rejelea [masharti yetu ya matumizi](/terms-of-use/). Taarifa juu ya ethereum.org hutolewa tu kwa madhumuni ya taarifa ya jumla.
