---
title: Pag-stake bilang isang serbisyo
description: Pangkalahatang-ideya tungkol sa kung paano magsimula sa pooled staking ng ETH
lang: tl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Lumulutang sa ulap ang rhino na si Leslie.
sidebarDepth: 2
summaryPoints:
  - Ang mga third-party node operator ang nangangasiwa sa operasyon ng iyong validator client
  - Magandang opsyon para sa sinumang may 32 ETH na hindi kumportable sa pagiging teknikal at kumplikado ng pagpapatakbo ng node
  - Iwasang umasa sa iba, at panatilihing hawak mo ang iyong mga withdrawal key
---

## Ano ang staking bilang serbisyo? {#what-is-staking-as-a-service}

Ang Staking as a Service (“SaaS") ay kumakatawan sa kategorya ng mga serbisyo sa staking kung saan mo idineposito ang sarili mong 32 ETH para sa isang validator, ngunit itinatalaga mo ang operasyon ng node sa isang third-party operator. Kadalasan, sa prosesong ito, ginagabayan ka sa buong inisyal na pag-set up, na kinabibilangan ng paggawa at pag-deposit ng key, at pagkatapos ay ia-upload ng mga signing key mo sa operator. Sa tulong nito, papatakbuhin ng serbisyo ang iyong validator para sa iyo, na kadalasang may bayad bawat buwan.

## Bakit dapat mag-stake gamit ang isang serbisyo? {#why-stake-with-a-service}

Hindi natural na sinusuportahan ng Ethereum protocol ang pagtatalaga ng stake, kaya ginawa ang mga serbisyong ito para punan ang pangangailangan na ito. Kung mayroon kang 32 ETH na ise-stake, pero hindi ka kumportableng mangasiwa ng hardware, binibigyang-daan ka ng mga serbisyong SaaS na italaga ang mahirap na trabaho habang nakakakuha ka ng mga natural na block reward.

<CardGrid>
  <Card title="Iyong sariling validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Madaling simulan" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limitahan ang iyong panganib" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Ano ang dapat isaalang-alang {#what-to-consider}

Dumarami ang mga SaaS provider na tutulong sa iyong i-stake ang iyong ETH, pero may kanya-kanyang benepisyo at panganib ang mga ito. Ang lahat ng opsyon sa SaaS ay nangangailangan ng mga karagdagang trust assumption kumpara sa home-staking. Ang mga opsyon sa Saas ay maaaring naglalagay ng karagdagang code sa mga Ethereum client na hindi bukas o naa-audit. Mayroon ding hindi magandang epekto ang SaaS sa decentralization ng network. Depende sa setup, maaaring hindi mo kontrolado ang iyong validator - maaaring gamitin ng operator ang iyong ETH sa maling paraan.

Ang mga attribute indicator ay ginagamit sa ibaba para ipakita ang mga kapansin-pansing kalakasan o kahinaan ng isang nakalistang SaaS provider. Gamitin ang seksyong ito bilang sanggunian sa pagtukoy ng mga katangian na ito habang pumipili ka ng serbisyong tutulong sa iyo sa iyong pag-stake.

<StakingConsiderations page="saas" />

## Tuklasin ang mga staking service provider {#saas-providers}

Narito ang ilang mga available na mga SaaS provider. Gamitin ang mga indicator sa itaas upang tulungan kang gamitin ang mga serbisyong ito

<ProductDisclaimer />

### Mga SaaS provider

<StakingProductsCardGrid category="saas" />

Tandaan ang kahalagahan ng pagsuporta sa [client diversity](/developers/docs/nodes-and-clients/client-diversity/) dahil pinapaigting nito ang seguridad ng network, at nililimitahan nito ang iyong panganib. Matutukoy ang mga serbisyo na may patunay ng paglilimita ng pangunahing paggamit ng client sa pamamagitan ng <em style={{ textTransform: "uppercase" }}>"execution client diversity"</em> at <em style={{ textTransform: "uppercase" }}>"consensus client diversity."</em>

### Mga Generator ng Key

<StakingProductsCardGrid category="keyGen" />

Mayroong mungkahi para sa pag-stake bilang service provider na aming nakaligtaan? Tingnan ang aming [patakaran sa product listing](/contributing/adding-staking-products/) para malaman kung ito ay angkop, at isumite ito para masuri.

## Mga madalas itanong {#faq}

<ExpandableCard title="Sino ang humahawak ng aking mga key?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Mag-iiba ang mga usapan depende sa provider, pero karaniwan kang gagabayan sa pag-set up ng anumang signing key na iyong kailangan (isa bawat 32 ETH), at ia-upload ang mga ito sa iyong provider para payagan ang mga itong mag-validate para sa iyo. Hindi nagbibigay ang mga signing key ng anumang kakayahang mag-withdraw, mag-transfer, o gastusin ang iyong pondo. Gayunpaman, nagbibigay ang mga ito ng kakayahang bumoto para sa consensus, na kung hindi maayos na gagawin ay maaaring magdulot ng mga parusa offline o slashing.
</ExpandableCard>

<ExpandableCard title="May dalawang set ng mga key?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Oo. Ang bawat account ay binubuo ng mga BLS <em>signing</em> key at mga BLS <em>withdrawal</em> key. Upang magawa ng isang validator na patunayan ang kalagayan ng chain, lumahok sa mga sync committee at magmungkahi ng mga block, dapat maa-access kaagad ng validator client ang mga signing key. Dapat nakakonekta ang mga ito sa internet, at nang sa gayon ay maituturing na mga "hot" key. Isa itong kinakailangan para makapagpatunay ang iyong validator, kung kaya, pinaghihiwalay ang mga key na ginagamit para mag-transfer o mag-withdraw ng pondo para sa mga dahilang panseguridad.

Ang mga BLS withdrawal key ay ginagamit upang mag-sign ng one-time na mensahe na nagtatakda kung saang execution layer account mapupunta ang mga staking reward at inilabas na pondo. Kapag na-broadcast na ang mensaheng ito, hindi na kailangan ang mga <em>BLS withdrawal</em> key. Sa halip, permanenteng itatalaga ang kontrol sa na-withdraw na pondo sa address na iyong ibinigay. Binibigyang-daan ka nitong magtakda ng withdrawal address na naka-secure sa pamamagitan ng iyong sariling cold storage, na nagpapaliit sa posibilidad na manganib ang pondo ng iyong validator, kahit na may ibang nagkokontrol ng mga signing key ng iyong validator.

Kailangang i-update ang mga kredensyal sa pag-withdraw para makapag-withdraw\*. Sa prosesong ito, gagawin ang mga withdrawal key gamit ang iyong mnemonic seed phrase.

<strong>Tiyaking maingat mong iba-back up ang seed phrase na ito, kung hindi ay hindi mo magagawa ang iyong mga withdrawal key kapag kailangan na itong gawin.</strong>

\*Hindi ito kailangang itakda ng mga staker na nagbigay ng withdrawal address na may inisyal na deposito. Magtanong sa iyong SaaS provider para sa suporta tungkol sa kung paano ihanda ang iyong validator.
</ExpandableCard>

<ExpandableCard title="Kailan ako makaka-withdraw?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Ipinatupad ang pag-withdraw sa staking sa Shanghai/Capella upgrade noong Abril 2023. Kailangang magbigay ng mga staker ng withdrawal address (kung hindi ito ibinigay sa inisyal na deposito), at awtomatikong sisimulang ipamahagi ang mga reward payment bawat ilang araw.

Puwede ring ganap na umalis ang mga validator bilang validator, na siyang magbubukas ng natitirang nilang ETH balance para ma-withdraw. Matatanggap ng mga account na nagbigay ng execution withdrawal address at nakatapos ng proseso ng pag-alis ang kanilang buong balanse sa withdrawal address na ibinigay sa susunod na validator sweep.

<ButtonLink href="/staking/withdrawals/">Iba pang detalye tungkol sa mga pag-withdraw sa staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Ano ang mangyayari kung ako ay ma-slash?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Sa pamamagitan ng paggamit ng SaaS provider, ipinagkakatiwala mo ang operasyon ng iyong node sa iba. May kaakibat itong panganib ng hindi magandang performance ng node, na hindi mo makokontrol. Kung ma-slash ang validator mo, papatawan ng parusa ang validator balance mo at puwersahang aalisin sa validator pool.

Kapag natapos na ang proseso ng slashing/pag-alis, ililipat ang pondong ito sa withdrawal address na nakatalaga sa validator. Para gumana ito, kailangang magbigay ng withdrawal address. Maaaring naibigay na ito sa inisyal na deposito. Kung hindi, kakailanganing gamitin ang mga withdrawal key ng validator para mag-sign ng mensaheng nagdedeklara ng withdrawal address. Kung walang ibinigay na withdrawal address, hindi makukuha ang pondo hangga't hindi ito naibibigay.

Makipag-ugnayan sa indibidwal na SaaS provider para sa iba pang detalye tungkol sa anumang guarantee o opsyon sa insurance, at para sa mga tagubilin sa kung paano magbigay ng withdrawal address. Kung gusto mong ikaw lang ang nagkokontrol ng iyong validator setup, <a href="/staking/solo/">magbasa pa tungkol sa kung paano i-solo stake ang iyong ETH</a>.
</ExpandableCard>

## Karagdagang pagbabasa {#further-reading}

- [Ang Ethereum Staking Directory](https://www.staking.directory/) - _Eridian at Spacesider_
- [Pagsusuri sa Mga Serbisyo sa Staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
