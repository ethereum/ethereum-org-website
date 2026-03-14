---
title: IPFS kwa violesura vya mtumiaji vilivyogatuliwa
description: Tutorial hii inamfundisha msomaji jinsi ya kutumia IPFS kuhifadhi kiolesura cha mtumiaji kwa dApp. Ingawa data na mantiki ya biashara ya Application imegatuliwa, bila kiolesura cha mtumiaji kinachostahimili udhibiti watumiaji wanaweza kupoteza ufikiaji wake hata hivyo.
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: sw
published: 2024-06-29
---

Umeandika dApp mpya ya ajabu. Umeandika hata [kiolesura cha mtumiaji](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kwa ajili yake. Lakini sasa unaogopa kwamba mtu atajaribu kuidhibiti kwa kuzima kiolesura chako cha mtumiaji, ambayo ni seva moja tu iliyo mbali kwenye Cloud. Katika Tutorial hii utajifunza jinsi ya kuepuka udhibiti kwa kuweka kiolesura chako cha mtumiaji kwenye **[interplanetary file system (IPFS)](https://ipfs.tech/developers/)** ili mtu yeyote anayevutiwa aweze kukibandika kwenye seva kwa ufikiaji wa siku zijazo.

Unaweza kutumia huduma ya wahusika wengine kama vile [Fleek](https://resources.fleek.xyz/docs/) kufanya kazi yote. Tutorial hii ni kwa ajili ya watu wanaotaka kufanya vya kutosha kuelewa wanachofanya hata kama ni kazi zaidi.

## Kuanza ndani ya nchi {#getting-started-locally}

Kuna [watoa huduma wengi wa IPFS wa wahusika wengine](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), lakini ni bora kuanza na kuendesha IPFS ndani ya nchi kwa ajili ya majaribio.

1. Sakinisha [kiolesura cha mtumiaji cha IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Tengeneza saraka na tovuti yako. Ikiwa unatumia [Vite](https://vite.dev/), tumia amri hii:

   ```sh
   pnpm vite build
   ```

3. Katika IPFS Desktop, bofya **Import > Folder** na uchague saraka uliyotengeneza katika hatua iliyopita.

4. Chagua folda uliyopakia na bofya **Rename**. Ipe jina lenye maana zaidi.

5. Ichague tena na ubofye **Share link**. Nakili URL kwenye ubao wa kunakili. Kiungo kitakuwa sawa na `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Bofya **Status**. Panua kichupo cha **Advanced** ili kuona anwani ya lango. Kwa mfano, kwenye mfumo wangu anwani ni `http://127.0.0.1:8080`.

7. Changanya njia kutoka hatua ya kiungo na anwani ya lango ili kupata anwani yako. Kwa mfano, kwa mfano hapo juu, URL ni `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Fungua URL hiyo kwenye kivinjari ili kuona tovuti yako.

## Inapakia {#uploading}

Kwa hivyo sasa unaweza kutumia IPFS kuhudumia faili ndani ya nchi, ambayo haifurahishi sana. Hatua inayofuata ni kuzifanya zipatikane kwa ulimwengu ukiwa nje ya mtandao.

Kuna idadi ya [huduma za kubandika](https://docs.ipfs.tech/concepts/persistence/#pinning-services) zinazojulikana sana. Chagua mmoja wao. Huduma yoyote unayotumia, unahitaji kuunda akaunti na kuipatia **kitambulisho cha maudhui (CID)** katika IPFS desktop yako.

Binafsi, niligundua [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) kuwa rahisi zaidi kutumia. Hapa kuna maelekezo yake:

1. Vinjari hadi [kwenye dashibodi](https://dashboard.4everland.org/overview) na uingie na pochi yako.

2. Katika upau wa kando wa kushoto bofya **Ghala > 4EVER Pin**.

3. Bofya **Upload > Selected CID**. Ipe maudhui yako jina na utoe CID kutoka kwa IPFS desktop. Kwa sasa CID ni mfuatano unaoanza na `Qm` ikifuatiwa na herufi na tarakimu 44 zinazowakilisha hashi ya [base-58 encoded](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), kama vile `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, lakini [hilo linaweza kubadilika](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Hali ya awali ni **Queued**. Pakia upya hadi ibadilike na kuwa **Pinned**.

5. Bofya CID yako ili kupata kiungo. Unaweza kuona Application yangu [hapa](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/).

6. Huenda ukahitaji kuwezesha akaunti yako ili iwekwe alama kwa zaidi ya mwezi mmoja. Uwezeshaji wa akaunti hugharimu takriban $1. Ikiwa umeifunga, toka nje na uingie tena ili uulizwe kuiwezesha tena.

## Kutumia kutoka IPFS {#using-from-ipfs}

Kwa wakati huu una kiungo cha lango la kati linalohudumia maudhui yako ya IPFS. Kwa kifupi, kiolesura chako cha mtumiaji kinaweza kuwa salama zaidi lakini bado hakiwezi kustahimili udhibiti. Kwa upinzani halisi wa udhibiti, watumiaji wanahitaji kutumia IPFS [moja kwa moja kutoka kwa kivinjari](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Mara tu unapokuwa umesakinisha hiyo (na IPFS ya desktop inafanya kazi), unaweza kwenda kwa [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) kwenye tovuti yoyote na utapata maudhui hayo, yakitolewa kwa njia iliyogatuliwa.

## Hasara {#drawbacks}

Huwezi kufuta faili za IPFS kwa uhakika, kwa hivyo mradi tu unarekebisha kiolesura chako cha mtumiaji, pengine ni bora kuiacha iwe ya kati, au utumie [mfumo wa majina wa interplanetary (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), mfumo unaotoa uwezo wa kubadilika juu ya IPFS. Bila shaka, chochote kinachoweza kubadilika kinaweza kudhibitiwa, katika kesi ya IPNS kwa kumshinikiza mtu aliye na ufunguo binafsi unaolingana nayo.

Zaidi ya hayo, baadhi ya vifurushi vina tatizo na IPFS, kwa hivyo ikiwa tovuti yako ni ngumu sana hiyo inaweza isiwe suluhisho zuri. Na bila shaka, chochote kinachotegemea ujumuishaji wa seva hakiwezi kugatuliwa kwa kuwa tu na upande wa mteja kwenye IPFS.

## Hitimisho {#conclusion}

Kama vile Ethereum inavyokuruhusu kugatua hifadhidata na vipengele vya mantiki ya biashara ya dApp yako, IPFS hukuruhusu kugatua kiolesura cha mtumiaji. Hii inakuwezesha kuzima vekta moja zaidi ya mashambulizi dhidi ya dApp yako.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
