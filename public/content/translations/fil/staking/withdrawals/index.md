---
title: Mga pag-withdraw ng stake
description: Page na nagbubuod sa kung ano ang mga pag-push withdraw sa staking, paano ito gumagana, at kung ano ang dapat gawin ng mga staker para makuha ang mga reward nila
lang: fil
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Ang rhino na si Leslie kasama ng mga natanggap niyang reward mula sa staking
sidebarDepth: 2
summaryPoints:
  - Binigyang-daan ng Shanghai/Capella upgrade ang mga pag-withdraw sa staking sa Ethereum
  - Upang magamit ang serbisyo, kinakailangan ng mga operator ng validator na magbigay ng withdrawal address
  - Ang mga reward ay awtomatikong ipinapamahagi kada ilang araw
  - Matatanggap ng mga validator na ganap na aalis sa staking ang kanilang natitirang balanse
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Ang pag-withdraw sa staking ay in-enable kasabay ng Shanghai/Capella ugrade na naganap noong Abril 12, 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Iba pang detalye tungkol sa Shanghai/Capella</a>
</UpgradeStatus>

Ang **mga pag-withdraw sa staking** ay tumutukoy sa mga pag-transfer ng ETH mula sa validator account na nasa consensus layer ng Ethereum (ang Beacon Chain), papunta sa execution layer kung saan ito magagamit sa mga transaksyon.

Ang **mga reward payment para sa sobrang balanse** na mahigit 32 ETH ay awtomatiko at regular na ipapadala sa withdrawal address na naka-link sa bawat validator, kapag ibinigay na ito ng user. Ang mga user ay puwede ring **ganap na umalis sa staking**, na nagbubukas ng kanilang buong balanse bilang validator.

## Mga reward mula sa staking {#staking-rewards}

Ang mga reward payment ay awtomatikong ipinoproseso para sa mga aktibong validator account na may maxed out na effective balance na 32 ETH.

Ang anumang balanse na mahigit 32 ETH na nakamit sa pamamagitan ng mga reward ay hindi talaga nagdadagdag sa pangunahing balanse, o hindi nagpapataas ng weight ng validator sa network, kaya, awtomatiko itong iwi-withdraw bilang reward payment kada ilang araw. Maliban sa pagbibigay ng withdrawal address isang beses, hindi kinakailangan ng anumang aksyon mula sa operator ng validator para sa mga reward na ito. Ito ay nagsisimula sa consensus layer, kung kaya, walang gas (bayarin sa transaksyon) na kinakailangan sa kahit anong hakbang.

### Paano tayo nakarating dito? {#how-did-we-get-here}

Sa mga nakaraang taon, ang Ethereum ay sumailalim sa ilang pag-upgrade sa network at nag-transition sa network na pinoprotektahan ng ETH mismo, sa halip ng energy-intensive mining tulad ng dati. Ang paglahok sa consensus sa Ethereum ay kinikilala na ngayon bilang "staking", dahil ang mga kalahok ay boluntaryong naglalagay ng kanilang ETH sa isang "stake" upang magkaroon ng kakayahan na makilahok sa network. Ang mga user na sumusunod sa mga panuntunan ay mabibigyan ng gantimpala, habang ang mga magtatangkang mandaya ay maaaring parusahan.

Mula nang ilunsad ang staking deposit contract noong Nobyembre 2020, boluntaryong naglagay ang ilang matapang na nanguna sa Ethereum ng mga pondo upang i-activate ang "mga validator", na mga espesyal na account na may karapatang pormal na patunayan ang at magmungkahi ng mga block, alinsunod sa mga panuntunan ng network.

Bago ang Shanghai/Capella upgrade, hindi mo magamit o ma-access ang iyong staked ETH. Ngunit ngayon, maaari mong piliin awtomatikong matanggap ang iyong mga reward sa isang piling account, at mawi-withdraw mo rin ang iyong staked ETH kung kailan mo gusto.

### Paano ako maghahanda? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Mahahalagang paunawa {#important-notices}

Ang pagbibigay ng withdrawal address ay isang kinakailangang hakbang para sa anumang validator account bago ito maging eligible na mag-withdraw ng ETH mula sa balanse nito.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Ang bawat validator account ay maaari lang magkaroon ng isang withdrawal address, nang isang beses lang.</strong> Kapag nakapili na ng address at naisumite na ito sa consensus layer, hindi na ito maaaring bawiin o baguhin ulit. I-double check ang pagmamay-ari at katumpakan ng address na ibinigay bago ito isumite.
</InfoBanner>

Sa ngayon, <strong>walang banta sa pondo mo</strong> kung hindi mo ito ibibigay, basta't nananatiling ligtas offline ang iyong mnemonic/seed phrase, at hindi ito nakompromiso sa anumang paraan. Kung hindi maipapakita ang mga kredensyal sa pag-withdraw, hindi makukuha ang ETH sa validator account hangga't hindi nagbibigay ng withdrawal address.

## Ganap na pag-alis sa staking {#exiting-staking-entirely}

Kailangang magbigay ng withdrawal address bago ma-transfer ang _anumang_ pondo mula sa balanse ng validator account.

Ang mga user na nagnanais na ganap na umalis sa staking at i-withdraw ang kanilang buong balanse ay kinakailangan ding mag-sign at mag-broadcast ng mensahe ng "boluntaryong pag-alis" gamit ang mga key ng validator para masimulan ang proseso ng pag-alis sa staking. Ito ay ginagawa gamit ang iyong validator client at isinusumite sa iyong consensus node, at hindi nangangailangan ng gas.

Ang proseso ng pag-alis ng isang validator sa staking ay gumugugol ng iba't ibang oras, depende sa kung ilan pang validator ang umaalis sa parehong panahon. Kapag tapos na, ang account na ito ay hindi na magiging responsable sa pagganap ng mga tungkulin sa validator network, hindi na eligibile para sa mga reward, at hindi na rin nagse-"stake" ng kanilang ETH. Sa oras na ito, ang account ay ituturing na ganap nang "withdrawable".

Kapag ang isang account ay na-flag na bilang "withdrawable", at nagbigay na ng mga kredensyal sa pag-withdraw, wala nang kailangang gawin ang user kundi maghintay. Ang mga account ay awtomatiko at tuloy-tuloy na isi-sweep ng mga block proposer para sa mga eligible na exited fund, at ita-transfer ang buong balanse ng iyong account (kilala rin bilang "full withdrawal") sa susunod na <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>sweep</a>.

## Kailan pinapagana ang mga pag-withdraw sa staking? {#when}

Live na ang mga pag-withdraw sa staking! Ang functionality ng pag-withdraw ay in-enable bilang bahagi ng Shanghai/Capella upgrade na naganap noong Abril 12, 2023.

Ang Shanghai/Capella upgrade ang nagbigay-daan para maibalik ang staked ETH sa mga regular na Ethereum account. Sinubaybayan nito ang pag-stake ng liquidity, at inilapit nito ang Ethereum sa layunin nitong bumuo ng sustainable, scalable, at secure na decentralized ecosystem.

- [Iba pang detalye tungkol sa kasaysayan ng Ethereum](/history/)
- [Iba pang detalye tungkol sa roadmap ng Ethereum](/roadmap/)

## Paano gumagana ang mga withdrawal payment? {#how-do-withdrawals-work}

Ang pagiging eligible ng isang partikular na validator para sa pag-withdraw ay tinutukoy sa pamamagitan ng kalagayan mismo ng validator account. Hindi kailangan ng anumang user input anumang oras upang matukoy kung dapat magsimula ng pag-withdraw ang account o hindi—ang buong proseso ay awtomatikong ginagawa ng consensus layer sa isang tuloy-tuloy na loop.

### More of a visual learner? {#visual-learner}

Tingnan ang paliwanag ng Finematics tungkol sa mga pag-withdraw sa staking ng Ethereum:

<YouTube id="RwwU3P9n3uo" />

### "Pag-sweep" ng validator {#validator-sweeping}

Kapag nakaiskedyul ang isang validator na magmungkahi ng susunod na block, kailangan nitong gumawa ng withdrawal queue ng hanggang 16 na eligible withdrawal. Ito ay ginagawa sa pamamagitan ng pagsisimula sa validator index 0, pagtukoy kung may eligible withdrawal para sa account na ito batay sa mga panuntunan ng protocol, at pagdadagdag nito sa queue kung mayroon man. Ang validator na nakatakda na mag-propose ng susunod na bloke ay magpapatuloy kung saan iniwan ng huling bloke, at magpapatuloy ito nang sunod-sunod ng walang katapusan.

<InfoBanner emoji="🕛">
Para lang itong analog na orasan. Itinuturo ng kamay sa orasan ang oras, umuusad ito sa isang direksyon, wala itong nilalaktawang anumang oras, at sa huli ay bumabalik ito sa simula kapag naabot na nito ang huling numero.<br/><br/>
Ngayon, sa halip na 1 hanggang 12, isipin na may 0 hanggang N <em>(ang kabuuang bilang ng mga validator account na nairehistro sa consensus layer, na mahigit 500,000 mula noong Enero 2023).</em><br/><br/>
Ituturo ng kamay sa orasan ang susunod na validator na kailangang tingnan kung may mga eligible withdrawal. Nagsisimula ito sa, at umuusad paikot nang hindi nilalaktawan ang anumang account. Kapag naabot na ang huling validator, babalik ang sa simula ang cycle.
</InfoBanner>

#### Pagtingin kung may mga withdrawal ang account {#checking-an-account-for-withdrawals}

Habang sini-sweep ng isang proposer ang mga validator para sa mga posibleng withdrawal, inihahambing ang bawat sinusuring validator sa maikling serye ng mga tanong para tukuyin kung dapat mag-trigger ng withdrawal, at kung oo, kung gaano karaming ETH ang dapat i-withdraw.

1. **Mayroon bang ibinigay na withdrawal address?** Kung wala pang withdrawal address na ibinigay, lalaktawan ang account at hindi magsisimula ng anumang withdrawal.
2. **Inalis at mawi-withdraw ba ang validator?** Kung ganap nang inalis ang validator, at naabot na natin ang epoch kung saan maituturing nang "mawi-withdraw" ang kanilang account, magpoproseso ng full withdrawal. Ita-transfer nito ang buong natitirang balanse sa withdrawal address.
3. **Umabot na ba sa 32 ang effective balance?** Kung ang account ay may mga kredensyal sa pag-withdraw, hindi pa ganap na naiaalis, at may nakatenggang mga reward na mahigit 32, magpoproseso ng isang partial withdrawal na nagta-transfer lang ng mga reward na mahigit 32 sa withdrawal address ng user.

May dalawang aksyon lang na ginagawa ng mga validator operator sa buong life cycle ng isang validator na direktang nakakaapekto sa flow na ito:

- Magbigay ng mga kredensyal sa pag-withdraw upang ma-enable ang anumang uri ng withdrawal
- Umalis sa network, na magti-trigger ng full withdrawal

### Walang gas {#gas-free}

Sa estratehiyang ito sa mga pag-withdraw sa staking, hindi hinihiling sa mga staker na manual na magsumite ng transaksyon na nagpapa-withdraw ng partikular na dami ng ETH. Ibig sabihin nito, **hindi kailangan ng gas (bayarin sa transaksyon)**, at hindi rin nakikipag-agawan ang mga withdrawal para sa kasalukuyang execution layer block space.

### Gaano kadalas kong matatanggap ang aking mga staking reward? {#how-soon}

Maaaring magproseso ng hanggang 16 na withdrawal sa isang block. Sa bilis na 'yon, puwedeng magproseso ng 115,200 validator withdrawal kada araw (kung walang nilaktawang slot). Tulad ng nabanggit sa itaas, lalaktawan ang mga validator na walang eligible na withdrawal, na magpapabilis sa pagtatapos ng sweep.

Kapag pinalawak ang kalkulasyong ito, matatantya natin ang oras na kakailanganin upang magproseso ng partikular na bilang ng mga withdrawal:

<TableContainer>

| Bilang ng mga withdrawal | Tagal bago makumpleto |
| :-------------------: | :--------------: |
|        400,000        |     3.5 araw     |
|        500,000        |     4.3 araw     |
|        600,000        |     5.2 araw     |
|        700,000        |     6.1 araw     |
|        800,000        |     7.0 araw     |

</TableContainer>

Tulad ng nakikita mo, babagal ito habang dumarami ang mga validator sa network. Kapag dumami ang mga nilaktawang slot, babagal ito nang husto, pero karaniwan nitong kakatawanin ang mas mabagal na posibleng resulta.

## Mga karaniwang itanong {#faq}

<ExpandableCard
title="Kapag nakapagbigay na ako ng withdrawal address, puwede ko ba itong palitan ng alternatibong withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Hindi, ang proseso ng pagbibigay ng mga kredensyal sa pag-withdraw ay one-time process, at hindi na maaaring baguhin kapag naisumite na.
</ExpandableCard>

<ExpandableCard
title="Bakit isang beses lang maaaring itakda ang withdrawal address?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Sa pamamagitan ng pagtatakda ng withdrawal address ng execution layer, permanente nang nabago ang mga kredensyal sa pag-withdraw ng validator na iyon. Ito ay nangangahulugan na hindi na gagana ang mga lumang kredensyal, at sa execution layer account didirekta ang mga bagong kredensyal.

Ang mga withdrawal address ay maaaring maging smart contract (kontrolado ng code nito), o externally owned account (EOA, kontrolado ng pribadong key nito). Sa kasalukuyan, ang mga account na ito ay walang paraan para magpadala ng mensahe pabalik sa consensus layer na magpapahiwatig ng pagbabago sa mga kredensyal ng validator, at magiging kumplikado ang protocol kahit hindi naman dapat kapag idinagdag ang functionality na ito.

Bilang alternatibo sa pagbabago ng withdrawal address para sa partikular na validator, maaaring piliin ng mga user na magtakda ng isang smart contract bilang kanilang withdrawal address na maaaring pangasiwaan ang pag-rotate ng key, tulad ng Safe. Ang mga user na nagtatakda ng kanilang pondo sa kanilang sariling EOA ay maaaring magsagawa ng ganap na pag-alis para i-withdraw ang lahat ng kanilang na-stake na pondo, at pagkatapos ay mag-stake ulit gamit ang mga bagong kredensyal.
</ExpandableCard>

<ExpandableCard
title="Paano kung sumali ako sa pag-stake ng mga token o sa pooled staking"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Kung bahagi ka ng isang <a href="/staking/pools/">staking pool</a> o may hawak kang mga staking token, dapat kang magtanong sa iyong provider ng iba pang detalye tungkol sa kung paano pinapangasiwaan ang mga pag-withdraw sa staking, dahil magkakaiba ang paraan ng pangangasiwa ng bawat serbisyo.

Sa pangkalahatan, dapat malaya ang mga user na kunin ang kasalukuyan nilang staked ETH, o magpalit ng staking provider na ginagamit nila. Kung masyado nang nagiging malaki ang isang partikular na pool, puwedeng alisin, i-redeem, at i-stake ulit ang pondo sa <a href="https://rated.network/">mas maliit na provider</a>. O, kung nakalikom ka na ng sapat na ETH, maaari kang <a href="/staking/solo/">mag-stake mula sa bahay</a>.

</ExpandableCard>

<ExpandableCard
title="Awtomatiko bang nangyayari ang mga reward payment (mga partial withdrawal)?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Oo, basta't may ibinigay na withdrawal address ang iyong validator. Dapat itong ibigay nang isang beses para inisyal na ma-enable ang anumang withdrawal, pagkatapos ay awtomatikong mati-trigger kada ilang araw ang mga reward payment sa bawat validator sweep.
</ExpandableCard>

<ExpandableCard
title="Awtomatiko bang nangyayari ba ang full withdrawal?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Hindi, kung ang iyong validator ay aktibo pa sa network, hindi magaganap nang awtomatiko ang full withdrawal. Para mangyari ito, kailangang manual na magsimula ng boluntaryong pag-alis.

Kapag natapos na ng validator ang proseso ng pag-alis, at kung may mga kredensyal sa pag-withdraw ang account, ang natitirang balanse ay <em>saka</em> iwi-withdraw sa susunod na <a href="#validator-sweeping">validator sweep</a>.

</ExpandableCard>

<ExpandableCard title="Puwede ba akong mag-withdraw ng custom na halaga?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Ang mga withdrawal ay idinisenyo upang awtomatikong maiproseso, at ililipat nito ang anumang ETH na hindi aktibong nagko-contribute sa stake. Kasama dito ang mga kumpletong balanse para sa mga account na natapos na ang proseso ng pag-alis.

Hindi posibleng manual na hilingin ang partikular na halaga ng ETH na iwi-withdraw.
</ExpandableCard>

<ExpandableCard
title="Nagpapatakbo ako ng validator. Saan ako makakakita ng iba pang impormasyon tungkol sa pagpapagana ng mga withdrawal?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Ang mga operator ng validator ay inirerekomenda na bisitahin ang <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a>na pahina kung saan matatagpuan mo ang tungkol sa kung paano ihanda ang iyong validator para sa pag-withdraw, timing ng mga pangyayari, at higit pang mga detalye tungkol sa kung paano gumagana ang mga withdrawal.

Upang subukan muna ang iyong setup sa isang testnet, bisitahin ang <a href="http://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a> para magsimula.

</ExpandableCard>

<ExpandableCard
title="Puwede ko bang i-reactivate ang aking validator matapos umalis sa pamamagitan ng pagdeposito pa ng ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Hindi. Kapag umalis na ang isang validator at na-wtihdraw na ang kumpletong balanse nito, awtomatikong ita-transfer ang anumang karagdagang pondong idineposito sa validator na iyon sa withdrawal address sa susunod na validator sweep. Upang mag-stake ulit ng ETH, kailangang mag-activate ng bagong validator.
</ExpandableCard>

## Karagdagang pagbabasa {#further-reading}

- [Mga Pag-withdraw sa Staking sa Launchpad](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Mga Beacon chain push withdrawal bilang mga operasyon](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Pag-withdraw sa Staked ETH (Testing) kasama sina Potuz at Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Itinutulak ng beacon chain ang mga withdrawal bilang mga operasyon kasama si Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Pag-unawa sa Validator Effective Balance](https://www.attestant.io/posts/understanding-validator-effective-balance/)
