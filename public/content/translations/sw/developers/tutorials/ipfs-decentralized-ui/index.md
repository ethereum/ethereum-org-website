---
title: IPFS kwa violesura vya mtumiaji vilivyogatuliwa
description: Mafunzo haya yanamfundisha msomaji jinsi ya kutumia IPFS kuhifadhi kiolesura cha mtumiaji kwa ajili ya dapp. Ingawa data ya programu na mantiki ya biashara imegatuliwa, bila kiolesura cha mtumiaji kinachostahimili udhibiti watumiaji wanaweza kupoteza ufikiaji wake hata hivyo.
author: Ori Pomerantz
tags:
  - ipfs
  - dapps
  - sehemu ya mbele
skill: beginner
breadcrumb: IPFS kwa violesura vya dapp
lang: sw
published: 2024-06-29
---

Umeandika programu tumizi iliyogatuliwa (dapp) mpya na nzuri sana. Umeandika hata [kiolesura cha mtumiaji](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kwa ajili yake. Lakini sasa unahofia kwamba mtu atajaribu kuidhibiti kwa kuangusha kiolesura chako cha mtumiaji, ambacho ni seva moja tu kwenye wingu. Katika mafunzo haya utajifunza jinsi ya kuepuka udhibiti kwa kuweka kiolesura chako cha mtumiaji kwenye **[mfumo wa faili kati ya sayari (IPFS)](https://ipfs.tech/developers/)** ili mtu yeyote anayevutiwa aweze kuibandika kwenye seva kwa ufikiaji wa baadaye.

Unaweza kutumia huduma ya wahusika wengine kama vile [Fleek](https://resources.fleek.xyz/docs/) kufanya kazi yote. Mafunzo haya ni kwa ajili ya watu wanaotaka kufanya vya kutosha ili kuelewa kile wanachofanya hata kama ni kazi zaidi.

## Kuanza kwenye kompyuta yako {#getting-started-locally}

Kuna [watoa huduma wa IPFS wa wahusika wengine](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service) wengi, lakini ni vyema kuanza kwa kuendesha IPFS kwenye kompyuta yako kwa ajili ya majaribio.

1. Sakinisha [kiolesura cha mtumiaji cha IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Unda saraka yenye tovuti yako. Ikiwa unatumia [Vite](https://vite.dev/), tumia amri hii:

   ```sh
   pnpm vite build
   ```

3. Katika IPFS Desktop, bofya **Import > Folder** (Ingiza > Folda) na uchague saraka uliyounda katika hatua iliyotangulia.

4. Chagua folda uliyopakia hivi punde na ubofye **Rename** (Badilisha jina). Ipe jina lenye maana zaidi.

5. Ichague tena na ubofye **Share link** (Shiriki kiungo). Nakili URL kwenye ubao klipu. Kiungo kitakuwa sawa na `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Bofya **Status** (Hali). Panua kichupo cha **Advanced** (Kina) ili kuona anwani ya lango. Kwa mfano, kwenye mfumo wangu anwani ni `http://127.0.0.1:8080`.

7. Unganisha njia kutoka kwa hatua ya kiungo na anwani ya lango ili kupata anwani yako. Kwa mfano, kwa mfano hapo juu, URL ni `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Fungua URL hiyo kwenye kivinjari ili kuona tovuti yako.

## Kupakia {#uploading}

Kwa hivyo sasa unaweza kutumia IPFS kutoa faili kwenye kompyuta yako, jambo ambalo halifurahishi sana. Hatua inayofuata ni kuzifanya zipatikane kwa ulimwengu unapokuwa nje ya mtandao.

Kuna idadi ya [huduma za kubandika](https://docs.ipfs.tech/concepts/persistence/#pinning-services) zinazojulikana sana. Chagua mojawapo. Huduma yoyote unayotumia, unahitaji kuunda akaunti na kuipatia **kitambulisho cha maudhui (CID)** katika IPFS desktop yako.

Binafsi, niliona [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) kuwa rahisi zaidi kutumia. Hapa kuna maelekezo yake:

1. Vinjari hadi kwenye [dashibodi](https://dashboard.4everland.org/overview) na uingie ukitumia mkoba wako.

2. Katika upau wa kando wa kushoto bofya **Storage > 4EVER Pin** (Hifadhi > 4EVER Pin).

3. Bofya **Upload > Selected CID** (Pakia > CID Iliyochaguliwa). Ipe maudhui yako jina na utoe CID kutoka kwenye IPFS desktop. Kwa sasa CID ni mfuatano unaoanza na `Qm` ukifuatiwa na herufi na tarakimu 44 zinazowakilisha heshi [iliyosimbwa kwa base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), kama vile `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, lakini [hiyo inaelekea kubadilika](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Hali ya awali ni **Queued** (Imepangwa). Pakia upya hadi ibadilike kuwa **Pinned** (Imebandikwa).

5. Bofya CID yako ili kupata kiungo. Unaweza kuona programu yangu [hapa](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Huenda ukahitaji uanzishaji wa akaunti yako ili iweze kubandikwa kwa zaidi ya mwezi mmoja. Uanzishaji wa akaunti unagharimu takriban $1. Ikiwa uliifunga, toka na uingie tena ili uulizwe kuanzisha tena.

## Kutumia kutoka kwa IPFS {#using-from-ipfs}

Kufikia hapa una kiungo cha lango lililowekwa kati ambalo linatoa maudhui yako ya IPFS. Kwa ufupi, kiolesura chako cha mtumiaji kinaweza kuwa salama kidogo lakini bado hakistahimili udhibiti. Kwa uwezo halisi unaostahimili udhibiti, watumiaji wanahitaji kutumia IPFS [moja kwa moja kutoka kwenye kivinjari](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Mara tu unapokuwa umesakinisha hiyo (na IPFS desktop inafanya kazi), unaweza kwenda kwenye [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) kwenye tovuti yoyote na utapata maudhui hayo, yakitolewa kwa njia iliyogatuliwa.

## Hasara {#drawbacks}

Huwezi kufuta faili za IPFS kwa uhakika, kwa hivyo mradi tu unarekebisha kiolesura chako cha mtumiaji, labda ni vyema kukiacha kikiwa kimewekwa kati, au kutumia [mfumo wa majina kati ya sayari (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), mfumo unaotoa uwezo wa kubadilika juu ya IPFS. Bila shaka, chochote kinachoweza kubadilika kinaweza kudhibitiwa, katika kesi ya IPNS kwa kumshinikiza mtu aliye na ufunguo wa siri ambao unalingana nao.

Zaidi ya hayo, baadhi ya vifurushi vina tatizo na IPFS, kwa hivyo ikiwa tovuti yako ni ngumu sana hilo linaweza lisiwe suluhisho zuri. Na bila shaka, chochote kinachotegemea ujumuishaji wa seva hakiwezi kugatuliwa kwa kuwa tu na upande wa mteja kwenye IPFS.

## Ugunduzi kupitia ENS {#discoverability}

Ikiwa utaelekeza jina la ENS (kama vitalik.eth) kwenye tovuti yako, itachukuliwa kuwa ukurasa wa wavuti uliogatuliwa kikamilifu na itabandikwa kiotomatiki na huduma ya [dweb3.wtf](https://dweb3.wtf), na pia kufanywa itafutike kupitia injini ya utafutaji ya [web3compass.net](https://web3compass.net), sawa na vile DuckDuckGo, Brave Search au Google inavyofanya kwa wavuti wa kitamaduni.

## Hitimisho {#conclusion}

Kama vile Ethereum inavyokuruhusu kugatua hifadhidata na vipengele vya mantiki ya biashara vya programu tumizi iliyogatuliwa (dapp) yako, IPFS inakuruhusu kugatua kiolesura cha mtumiaji. Hii inakuruhusu kufunga vekta moja zaidi ya mashambulizi dhidi ya dapp yako.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).