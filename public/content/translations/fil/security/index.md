---
title: Seguridad ng Ethereum at pag-iwas sa scam
description: Pananatiling ligtas sa Ethereum
lang: fil
---

# Seguridad ng Ethereum at pag-iwas sa scam {#introduction}

Sa pag-usbong ng interes sa mga cryptocurrency, mahalagang matutunan ang pinakamagagandang kagawian sa paggamit ng cryptocurrency. Maaaring nakakatuwa at nakakasabik ang crypto, pero mayroon ding mga seryosong panganib. Kung isasagawa mo ang maliliit na gawain na ito sa simula, maiiwasan mo ang mga panganib na ito.

<Divider />

## Pangunahing kaalaman sa seguridad sa web {#web-security}

### Gumamit ng mga password na mahirap hulaan {#use-strong-passwords}

[Mahigit 80% ng mga pag-hack sa ccount ay resulta ng mga madaling hulaan o ninakaw na password](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Pinakamainam na gumamit ng mahabang kumbinasyon ng mga character, numero at simbolo para mapanatiling secure ang mga account mo.

Ang isang karaniwang pagkakamali na ginagawa ng mga indibidwal ay gumagamit sila ng kumbinasyon ng dalawang o tatlong karaniwan at magkakaugnay na salita mula sa diksyonaryo. Ang mga ganitong uri ng mga password ay hindi secure dahil malaki ang tsansang mabiktima ang mga ito ng simpleng technique sa pag-hack na kilala bilang [dictionary attack](https://tl.wikipedia.org/wiki/Dictionary_attack).

```md
Halimbawa ng password na madaling hulaan: CuteFluffyKittens!

Halimbawa ng password na mahirap hulaan: ymv\*azu.EAC8eyp8umf
```

Isa pang karaniwang pagkakamali ang paggamit ng mga password na madaling hulaan o malaman sa pamamagitan ng [social engineering](<https://tl.wikipedia.org/wiki/Social_engineering_(security)>). Hindi secure ang paglalagay ng pangalan sa pagkadalaga ng iyong nanay, mga pangalan ng iyong mga anak o alagang hayop, o mga petsa ng kapanganakan sa iyong password at mapapataas nito ang panganib na ma-hack ang password mo.

#### Mga mainam na kagawian para sa password: {#good-password-practices}

- Pahabain ang iyong mga password hangga't pinapayagan ka ng iyong password generator o ng form na sinasagutan mo na gawin ito
- Paghalo-haluin ang malalaking titik, maliliit na titik, mga numero at mga simbolo
- Huwag gamitin ang mga personal na detalye, tulad ng mga apelyido, sa iyong password
- Huwag gumamit ng mga karaniwang salita sa diksyonaryo

[Iba pang detalye tungkol sa paggawa ng mga password na mahirap hulaan](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Gumamit ng mga walang katulad na password para sa lahat {#use-unique-passwords}

Ang password na mahirap hulaan ay hindi nagbibigay ng sapat na proteksyon kung ito ay mabubunyag sa isang data breach. Sa website na [Have I Been Pwned](https://haveibeenpwned.com), matitingnan mo kung nabiktima ang iyong mga account sa anumang data breach na naka-store sa kanilang database. Kung nabiktima ang mga ito, **you dapat mong palitan kaagad ang mga apektadong password**. Kapag gumamit ng mga walang katulad na password para sa bawat account, mapapaliit ang panganib na magkaroon ng access ang mga hacker sa lahat ng account mo kapag nakompromiso ang isa sa mga password mo.

### Gumamit ng password manager {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Kapag gumamit ng password manager, ito ang bahalang gumawa ng mga password na mahirap hulaan at walang katulad, at tatandaan nito ang mga ito para sa iyo! <strong>Lubos</strong> naming inirerekomendang gumamit nito, at libre ang karamihan sa mga ito!
  </div>
</InfoBanner>

Hindi mainam na tandaan ang mga password na mahirap hulaan at walang katulad para sa bawat account mo. Ang password manager ay nag-aalok ng secure at naka-encrypt na storage para sa lahat ng iyong password na maa-access mo gamit ang isang mahirap hulaang master password. Nagmumungkahi rin ito ng mga password na mahirap hulaan kapag nagsa-sign up para sa bagong serbisyo, kaya hindi mo kailangang gumawa ng sarili mong password. Aabisuhan ka rin ng maraming password manager kung nabiktima ka sa isang data breach, para mapalitan mo ang mga password bago ang anumang mapaminsalang atake.

![Halimbawa ng paggamit ng password manager](./passwordManager.png)

#### Sumubok ng password manager: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- O tingnan ang iba pang [inirerekomendang password manager](https://www.privacytools.io/secure-password-manager)

### Gumamit ng Two-Factor Authentication {#two-factor-authentication}

Upang patunayang ikaw talaga iyan, may iba't ibang natatanging patunay na magagamit para sa pag-authenticate. Tinatawag ang mga ito na **mga factor** at ang tatlong pangunahing factor ay:

- Isang bagay na alam mo (tulad ng password o panseguridad na tanong)
- Isang bagay na nauugnay sa iyo (tulad ng fingerprint o scanner ng iris/mukha)
- Isang bagay na pagmamay-ari mo (isang security key o authentication app sa iyong telepono)

Ang paggamit ng **Two-Factor Authentication (2FA)** ay nagbibigay ng karagdagang *security factor* para sa iyong mga online account kaya hindi sapat na malaman lang ang password mo (isang bagay na alam mo) para ma-access ang isang account. Pinakakaraniwan, ang pangalawang factor ay isang randomized na 6-digit code, na kilala bilang **time-based one-time password (TOTP)**, na maa-access mo sa pamamagitan ng isang authenticator app tulad ng Google Authenticator o Authy. Ito ay gumagana bilang isang factor na "isang bagay na pagmamay-ari mo" dahil ang seed na gumagawa ng timed code ay naka-store sa iyong device.

<InfoBanner emoji=":lock:">
  <div>
    Tandaan: Ang paggamit ng SMS-based na 2FA ay madaling mabiktima ng 
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      SIM jacking
    </a>
     at hindi ito secure. Para sa pinakamaigting na seguridad, gumamit ng serbisyo tulad ng{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
     o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Mga security key {#security-keys}

Para sa mga gusto pang paigtingin ang 2FA, gumamit ng security key. Ang mga security key ay mga physical hardware authentication device na gumagana katulad ng mga authenticator app. Ang paggamit ng security key ang pinakaligtas na paraan ng 2FA. Marami sa mga key na ito ang gumagamit ng FIDO Universal 2nd Factor (U2F) standard. [Magbasa pa tungkol sa FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Manood pa tungkol sa 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### I-uninstall ang mga browser extension {#uninstall-browser-extensions}

Ang mga browser extension tulad ng mga Chrome extension o Add-on para sa Firefox ay maaaring magdagdag ng kapaki-pakinabang na functionality ng browser at mapaganda ang karanasan ng user, pero may kaakibat na panganib ang mga ito. Bilang default, ang karamihan sa mga browser extension ay humihiling ng access para 'i-read at baguhin ang data ng site', na nagbibigay sa kanila ng kakayahang gawin halos anumang bagay sa iyong data. Ang mga Chrome extension ay palaging awtomatikong naa-update, kaya ang isang dating ligtas na extension ay maaaring ma-update sa ibang pagkakataon at magdagdag ng mapaminsalang code. Hindi sinusubukang nakawin ng karamihan sa mga browser extension ang iyong data, pero dapat mong tandaan na kaya nila itong gawin.

#### Manatiling ligtas sa pamamagitan ng: {#browser-extension-safety}

- Pag-install lang ng mga browser extension mula sa mga pinagkakatiwalaang source
- Pag-aalis ng mga hindi ginagamit na browser extension
- Lokal na pag-install ng mga Chrome extension para ihinto ang awtomatikong pag-update (Advanced)

[Iba pang detalye tungkol sa mga panganib ng mga browser extension](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Pangunahing kaalaman sa seguridad ng crypto {#crypto-security}

### I-level up ang iyong kaalaman {#level-up-your-knowledge}

Ang isa sa mga pangunahing dahilan kung bakit nasa-scam ang mga tao sa crypto ay kakulangan sa pag-unawa. Halimbawa, kung hindi mo nauunawaan na ang Ethereum network ay decentralized at hindi pagmamay-ari ng kahit sino, madaling maging biktima ng isang taong nagpapanggap na customer service agent na nangangakong ibabalik ang nawawalang ETH mo kapalit ng iyong mga pribadong key. Napakagandang puhunan ng pag-aaral sa kung paano gumagana ang Ethereum.

<DocLink href="/what-is-ethereum/">
  Ano ang Ethereum?
</DocLink>

<DocLink href="/eth/">
  Ano ang ether?
</DocLink>
<Divider />

## Seguridad ng wallet {#wallet-security}

### Huwag ipamigay ang iyong mga pribadong key {#protect-private-keys}

**Huwag na huwag ibahagi ang iyong mga pribadong key!**

Ang pribadong key ng iyong wallet ang nagsisilbing password sa iyong Ethereum wallet. Ito lang ang pumipigil sa sinumang nakakaalam ng iyong wallet address na tangayin ang lahat ng asset ng iyong account!

<DocLink href="/wallets/">
  Ano ang Ethereum wallet?
</DocLink>

#### Huwag kumuha ng mga screenshot ng iyong mga seed phrase o pribadong key {#screenshot-private-keys}

Sa pagkuha ng screenshot ng iyong mga seed phrase o pribadong key, maaaring ma-sync ang mga ito sa cloud at dahil dito, posibleng ma-access ang mga ito ng mga hacker. Ang pagkuha ng mga pribadong key mula sa cloud ay karaniwang paraan ng pag-atake ng mga hacker.

### Gumamit ng hardware wallet {#use-hardware-wallet}

Ang hardware wallet ay nagbibigay ng offline na storage para sa mga pribadong key. Itinuturing ang mga ito na pinaka-secure na opsyon sa wallet para sa pag-store ng iyong mga pribadong key: hindi aabot sa internet ang iyong pribadong key at mananatili itong ganap na lokal sa iyong device.

Kapag na-store offline ang mga pribadong key, lubos na liliit ang panganib na ma-hack, kahit na makontrol ng isang hacker ang iyong computer.

#### Sumubok ng hardware wallet: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### I-double check ang mga transaksyon bago magpadala {#double-check-transactions}

Ang hindi sinasadyang pagpapadala ng mga crypto sa maling wallet address ay isang karaniwang pagkakamali. **Ang isang transaksyon na ipinadala sa Ethereum ay hindi maaaring bawiin.** Maliban kung kilala mo ang may-ari ng address at makukumbinsi mo siyang ibalik sa iyo ang pondo mo, wala nang paraan para mabawi mo ang iyong pondo.

Palaging siguraduhing eksaktong tumutugma ang address na pinapadalhan mo sa address ng inaasahang tagatanggap bago magpadala ng transaksyon. Ipinapayo rin na kapag nag-i-interact sa isang smart contract, basahin ang mensahe ng transaksyon bago mag-sign.

### Magtakda ng mga limitasyon sa paggastos ng smart contract {#spend-limits}

Kapag nag-i-interact sa mga smart contract, huwag hayaang walang limitasyon sa paggastos. Puwedeng maubos ng smart contract ang laman ng iyong wallet kapag walang limitasyon sa paggastos. Sa halip, itakda ang mga limitasyon sa paggastos sa halaga lang na kinakailangan para sa transaksyon.

Maraming Ethereum wallet ang nag-aalok ng mga proteksyon ng limitasyon para hindi maubos ang laman ng mga account.

[Paano bawiin ang smart contract access sa iyong crypto funds](/guides/how-to-revoke-token-access/)

<Divider />

## Mga karaniwang scam {#common-scams}

Ang mga scammer ay palaging naghahanap ng mga paraan upang kunin ang iyong pondo mula sa iyo. Hindi posibleng ganap na pigilan ang mga scammer, pero hindi sila masyadong magtatagumpay kung alam natin ang karamihan sa mga technique na ginagamit nila. May iba't ibang anyo ng mga scam na ito, ngunit karaniwang sumusunod ang mga ito sa mga parehong high-level pattern. Pinakamahalagang tandaan ang mga sumusunod:

- laging maging mapanuri
- walang magbibigay sa iyo ng libre o discounted na ETH
- walang nangangailangan ng access sa iyong mga pribadong key o personal na impormasyon

### Giveaway scam {#giveaway}

Isa sa mga pinakaraniwang scam sa cryptocurrency ang giveaway scam. Maraming anyo ang giveaway scam, pero ang karaniwang ideya ay kung magpapadala ka ng ETH sa ibinigay na wallet address, madodoble ang ETH na ibabalik sa iyo. *Dahil dito, kilala rin ito bilang 2-for-1 scam.*

Karaniwang tumutukoy ang mga scam na ito ng limitadong panahon para i-claim ang giveaway para magpadalos-dalos sa pagdedesisyon at pagmadaliin ang biktima.

#### Mga social media hack {#social-media-hacks}

Nangyari ang isang high-profile na bersyon nito noong Hulyo 2020, kung saan na-hack ang mga Twitter account ng mga kilalang celebrity at organisasyon. Kasabay nito, nag-post ang hacker ng Bitcoin giveaway sa mga na-hack na account. Kahit mabilis napansin at tinanggal ang mga mapanlinlang na tweet, nakapagtangay pa rin ang mga hacker ng 11 bitcoin (o katumbas ng $500,000 noong Setyembre 2021).

![Isang scam sa Twitter](./appleTwitterScam.png)

#### Celebrity giveaway {#celebrity-giveaway}

Ang celebrity giveaway ay isa pang karaniwang anyo ng giveaway scam. Ang mga scammer ay kukuha ng recorded na video interview o conference talk ng isang celebrity at ila-livestream ito sa YouTube - kaya magmumukhang nagbibigay ang celebrity ng live video interview na nag-eendorso ng cryptocurrency giveaway.

Si Vitalik Buterin ang pinakakaraniwang ginagamit sa scam na ito, ngunit marami pang ibang kilalang tao sa mundo ng crypto ang ginagamit (tulad nina Elon Musk o Charles Hoskinson). Nagmumukhang lehitimo ang livestream ng mga scammer dahil sa pagsasama ng kilalang tao (kaduda-duda ito, pero kasama naman si Vitalik, kaya ok ito!).

**Palaging mga scam ang mga giveaway. Kung ipapadala mo ang iyong pondo sa mga account na ito, hindi mo na talaga ito mababawi.**

![Isang scam sa YouTube](./youtubeScam.png)

### Mga support scam {#support-scams}

Ang cryptocurrency ay isang bago pa at hindi pa lubos na nauunawaang teknolohiya. Ang karaniwang scam na umaabuso sa ganitong sitwasyon ang support scam, kung saan ginagaya ng mga scammer ang mga support personnel para sa mga sikat na wallet, exchange, o blockchain.

Nangyayari sa Discord ang karamihan sa mga usapan tungkol sa Ethereum. Karaniwang hahanapin ng mga support scammer ang kanilang target sa pamamagitan ng paghahanap ng mga tanong na nauugnay sa suporta sa mga pampublikong channel sa discord at pagkatapos ay pagpapadala sa nagtanong ng pribadong mensahe upang mag-alok ng suporta. Sa pamamagitan ng pagkuha ng tiwala, sinusubukan kang linlangin ng mga support scammer hanggang sa ibunyag mo ang iyong mga pribadong key o magpadala ka ng pera sa kanilang mga wallet.

![Isang support scam sa Discord](./discordScam.png)

Bilang pangkalahatang panuntunan, hinding-hindi makikipag-usap sa iyo ang staff sa pamamagitan ng mga pribado at hindi opisyal na channel. Ilang simpleng bagay na dapat tandaan kapag nakikipag-ugnayan sa suporta:

- Huwag ibahagi ang iyong mga pribadong key, seed phrase o password
- Huwag hayaang magkaroon ng remote access ang kahit sino sa iyong computer
- Huwag makipag-ugnayan sa labas ng mga itinakdang channel ng organisasyon

<InfoBanner emoji=":lock:">
  <div>
    Babala: bagama't madalas mangyari sa Discord ang mga support-style na scam, maaari din itong mangyari sa anumang chat application kung saan nagaganap ang diskusyon tungkol sa crypto, kasama na ang email.
  </div>
</InfoBanner>

### 'Eth2' token scam {#eth2-token-scam}

Bago ang [The Merge](/roadmap/merge/), ginamit ng mga scammer ang kalituhan sa terminong 'Eth2' para hikayatin ang mga user na ipamalit ang kanilang ETH sa 'ETH2' token. Walang 'ETH2', at walang ibang lehitimong token na inilunsad kasabay ng The Merge. Ang ETH na pagmamay-ari mo bago ang The Merge ay kapareho ng ETH ngayon. **Walang kailangang gawin kaugnay ng ETH mo para maging patunay ng stake mula sa patunay ng gawain ang account**.

Maaaring magmukhang "suporta" ang mga scammer, na magsasabing kung idedeposito mo ang iyong ETH, makakatanggap ka ng 'ETH2' bilang kabayaran. Walang [opisyal na suporta mula sa Ethereum](/community/support/), at walang bagong token. Huwag ibahagi ang iyong wallet seed phrase sa sinuman.

_May mga derivative token/ticker na maaaring kumatawan sa staked ETH (ibig sabihin, rETH mula sa Rocket Pool, stETH mula sa Lido, ETH2 mula sa Coinbase), ngunit hindi mo kailangang "mag-migrate" patungo sa mga ito._

### Mga phishing scam {#phishing-scams}

Ang mga phishing scam ay isa pang karaniwang paraan ng mga scammer upang subukang magnakaw ng pondo mula sa iyong wallet.

Sa ilang phishing email, pinapa-click sa mga user ang mga link na magre-redirect sa kanila sa mga pekeng website, ipapalagay sa kanila ang kanilang seed phrase, ipapa-reset ang kanilang password o magpapapadala ng ETH. May ibang hihilingin sa iyong mag-install ng malware nang hindi mo nalalaman para ma-infect ang computer mo at bigyan ng access ang mga scammer sa mga file ng iyong computer.

Kung makakatanggap ka ng email mula sa hindi kilalang sender, tandaan:

- Huwag buksan ang link o attachment mula sa mga email address na hindi mo kilala
- Huwag ibunyag ang iyong personal na impormasyon o mga password sa sinuman
- I-delete ang mga email mula sa mga hindi kilalang sender

[Iba pang detalye tungkol sa pag-iwas sa mga phishing scam](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Mga crypto trading broker scam {#broker-scams}

Nagpapakilala ang mga scam crypto trading broker bilang mga specialist cryptocurrency broker na mag-aalok na kunin ang pera mo at i-invest ito para sa iyo. Karaniwang kaakibat ng alok na ito ang pangako ng hindi makatotohanang kita. Pagkatanggap ng scammer sa iyong pondo, maaari ka niyang paikutin at maaaring hilingin sa iyong magpadala pa ng pondo, upang hindi mo mapalampas ang mas malaking tubo sa investment, o maaari siyang tuluyang maglaho.

Hinahanap ng mga mapanlinlang na broker na ito ang kanilang mga target sa pamamagitan ng paggamit ng mga pekeng account sa YouTube para magsimula ng mga tila natural na usapan tungkol sa broker. Kadalasang ina-upvote ang mga pag-uusap na ito para mas maging lehitimo, pero galing sa mga bot account ang mga upvote.

**Huwag ipaubaya sa mga hindi kakilala sa internet ang pag-invest. Mawawala ang iyong crypto.**

![Isang trading broker scam sa YouTube](./brokerScam.png)

### Mga crypto mining pool scam {#mining-pool-scams}

Mula noong Setyembre 2022, hindi na maaaring magmina sa Ethereum. Ngunit mayroon pa ring mga mining pool scam. Sa mga mining pool scam, may mga taong nakikipag-ugnayan sa iyo nang basta-basta at nagsasabing malaki ang kikitain mo kapag sumali ka sa isang Ethereum mining pool. Mangangako at patuloy na makikipag-ugnayan sa iyo ang scammer kahit gaano pa katagal. Susubukan ng scammer na kumbinsihin kang kapag sumali ka sa isang Ethereum mining pool, ang iyong cryptocurrency ay gagamitin upang gumawa ng ETH at tatanggap ka ng mga dividend sa anyo ng ETH. Sa huli, mapapansin mong ang maliit ang kinikita ng iyong cryptocurrency. Simpleng hakbang ito upang maengganyo kang mag-invest pa. Sa bandang huli, ipapadala ang lahat ng pondo mo sa hindi kilalang address, at maglalaho ang scammer, o sa ilang sitwasyon, patuloy siyang makikipag-ugnayan, tulad ng nangyari sa kamakailang insidente.

Sa pangkalahatan, mag-ingat sa mga taong nakikipag-ugnayan sa iyo sa social media na hinihikayat kang sumali sa isang mining pool. Kapag nawala na ang iyong crypto, hindi na ito maibabalik.

Ilang bagay na dapat tandaan:

- Mag-ingat sa sinumang nakikipag-ugnayan sa iyo tungkol sa paraan para pagkakakitaan ang iyong crypto
- Mag-research tungkol sa staking, mga liquidity pool, o iba pang paraan ng pag-invest ng iyong crypto
- Bihirang maging lehitimo ang mga ganitong scheme. Kung lehitimo ang mga ito, malamang na mainstream na at malalaman mo ang mga ito.

[Nawalan ng $200k ang isang lalaki sa mining pool scam](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Mga airdrop scam {#airdrop-scams}

Sa mga airdrop scam, may scam project na mag-e-airdrop ng asset (NFT, token) sa iyong wallet at magpapapunta sa iyo sa isang scam website para i-claim ang in-airdrop na asset. Ipa-prompt kang mag-sign in gamit ang iyong Ethereum wallet at "aprubahan" ang isang transaksyon kapag sinusubukang mag-claim. Ikokompromiso ng transaksyong ito ang iyong account sa pamamagitan ng pagpapadala ng iyong mga pampubliko at pribadong key sa scammer. Sa alternatibong anyo ng scam na ito, maaaring ipakumpirma sa iyo ang isang transaksyon na nagpapadala ng pondo sa account ng scammer.

[Iba pang detalye tungkol sa mga airdrop scam](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Karagdagang pagbabasa {#further-reading}

### Seguridad sa web {#reading-web-security}

- [Ito ang dahilan kung bakit hindi dapat gumamit ng mga text para sa two-factor authentication](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [Hanggang 3 milyong device na na-infect ng mga Chrome at Edge add-on na may malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Paano Gumawa ng Password na Mahirap Hulaan — Na Hindi Mo Malilimutan](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Ano ang security key?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Seguridad ng Crypto {#reading-crypto-security}

- [Pagprotekta sa Sarili at sa Iyong Pondo](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [4 na Paraan Upang Manatiling Ligtas sa Crypto](https://www.coindesk.com/tech/2021/04/20/4-ways-to-stay-safe-in-crypto/) - _CoinDesk_
- [Gabay sa Seguridad para sa Mga Walang Alam at Maging sa Mga May Alam](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Seguridad sa Crypto: Mga Password at Authentication](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Pagbibigay-kaalaman tungkol sa scam {#reading-scam-education}

- [Gabay: Paano tukuyin ang mga scam token](/guides/how-to-id-scam-tokens/)
- [Pananatiling Ligtas: Mga Karaniwang Scam](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Pag-iwas sa Mga Scam](https://bitcoin.org/en/scams)- _Bitcoin.org_
- [Twitter thread tungkol sa mga karaniwang crypto phishing email at message](https://twitter.com/tayvano_/status/1516225457640787969)- _Taylor Monahan_

<QuizWidget quizKey="security" />
