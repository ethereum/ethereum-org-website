---
title: Caighdeáin Fhorbartha Ethereum
description:
lang: ga
incomplete: true
---

## Forbhreathnú ar chaighdeáin {#standards-overview}

Tá go leor caighdeáin glactha ag pobal Ethereum a chuidíonn le tionscadail (amhail [Cliant Ethereum](/developers/docs/nodes-and-clients/) agus sparán) a choinneáil idir-inoibritheach trasna feidhmiúcháin, agus a chinntíonn go bhfanann conarthaí cliste agus dapps in-chomhdhéanta.

De ghnáth tugtar isteach caighdeáin mar [Tograí Feabhsúcháin Ethereum](/eips/) (EIPs), a phléann baill an phobail trí [phróiseas caighdeánach](https://eips.ethereum.org/EIPS/eip-1).

- [Réamhrá do EIPanna](/eips/)
- [Liosta EIPanna](https://eips.ethereum.org/)
- [EIP stóras GitHub](https://eips.ethereum.org)
- [Bord plé an EIP](https://ethereum-magicians.org/c/eips)
- [Réamhrá ar Rialachas Ethereum](/governance/)
- [Forbhreathnú ar Rialachas Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _ 31 Márta, 2019 - Boris Mann_
- [Prótacal Ethereum, Rialachas Forbartha agus Comhordú Uasghrádaithe Líonra](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _ 23 Márta, 2020 - Hudson Jameson_
- [Seinnliosta de Chruinnithe Core Dev Ethereum go léir](https://www.youtube.com/@EthereumProtocol) _(Seinnliosta YouTube)_

## Cineálacha caighdeán {#types-of-standards}

Tá 3 chineál EIP ann:

- Rian Caighdeán: cur síos ar aon athrú a dhéanann difear don chuid is mó de nó do gach feidhmiú Ethereum
- [Meta Track](https://eips.ethereum.org/meta): próiseas a bhaineann le Ethereum nó a mholann athrú ar phróiseas
- [Rian Faisnéise](https://eips.ethereum.org/informational): déanann sé cur síos ar shaincheist dearaidh Ethereum nó soláthraíonn sé treoirlínte ginearálta nó faisnéis do phobal Ethereum

Ina theannta sin, tá an Rian Caighdeánach foroinnte i 4 chatagóir:

- [Croí](https://eips.ethereum.org/core): feabhsuithe a éilíonn forc comhthola
- [Líonrú:](https://eips.ethereum.org/networking): feabhsuithe timpeall devp2p agus Fophrótacal Éadrom Ethereum, chomh maith le feabhsuithe molta ar shonraíochtaí prótacail líonra cogar agus scaoth.
- [Comhéadan](https://eips.ethereum.org/interface): feabhsuithe ar shonraíochtaí agus ar chaighdeáin API/RPC na gcliant, agus caighdeáin áirithe ag leibhéal teanga amhail ainmneacha modha agus ABIanna conartha.
- [ERC](https://eips.ethereum.org/erc): caighdeáin agus coinbhinsiúin ar leibhéal an fheidhmchláir

Tá faisnéis níos mionsonraithe ar na cineálacha agus na catagóirí éagsúla seo le fáil in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Caighdeáin comharthaí {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Comhéadan caighdeánach le haghaidh comharthaí idirmhalartaithe, amhail comharthaí vótála, comharthaí gill nó airgeadraí fíorúla.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Caighdeán comharthaí idirmhalartacha a fhágann go bhfeidhmíonn comharthaí mar éitear agus a thacaíonn le láimhseáil aistrithe comharthaí ar thaobh an fhaighteora.
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363) - Sainmhíníonn sé comhéadan chomharthaí le haghaidh comharthaí ERC-20 a thacaíonn le cód faighteora a fhorghníomhú tar éis aistrithe nó aistrithe Ó, nó cód caiteachais tar éis é a fhaomhadh.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Comhéadan caighdeánach do chomharthaí neamh-idirmhalartacha, amhail gníomhas le haghaidh saothar ealaíne nó amhrán.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Ócáid chaighdeánaithe a astaítear nuair a bhíonn ceann amháin, nó go leor comharthaí neamh-idirmhalartacha á gcruthú/aistriú, ag úsáid aitheantóirí comharthaí comhleanúnacha.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Síneadh comhéadan le haghaidh ról tomhaltóra EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Cuir ról a bhfuil teorainn ama leis le ceadanna srianta le comharthaí ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NÍ MHOLTAR)** Caighdeán chomhartha ag feabhsú thar ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Caighdeán chomhartha a bhféadfaidh sócmhainní idirmhalartacha agus neamh-idirmhalartacha a bheith ann.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Caighdeán boghta comharthaithe atá deartha chun paraiméadair theicniúla boghtaí a bhfuil toradh orthu a bharrfheabhsú agus a aontú.

Foghlaim tuilleadh faoi [caighdeáin chomharthaí](/developers/docs/standards/tokens/).

## Tuilleadh léitheoireachta {#further-reading}

- [Moltaí Feabhsúcháin Ethereum (EIPs)](/eips/)

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_
