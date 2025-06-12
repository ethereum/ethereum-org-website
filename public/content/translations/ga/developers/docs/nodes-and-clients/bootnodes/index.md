---
title: Réamhrá ar Nóid Bhútála Ethereum
description: An fhaisnéis bhunúsach a theastaíonn uait chun nód bhútála a thuiscint
lang: ga
---

Nuair a théann nód nua isteach i líonra Ethereum ní mór dó nascadh le nóid atá ar an líonra cheana féin chun piaraí nua a aimsiú ansin. Tugtar nóid bhútála ar na pointí iontrála seo isteach i líonra Ethereum. Is gnách go mbíonn liosta de na nóid bhútála crua-chódaithe isteach ag cliaint. De ghnáth is foireann forbróirí Fhondúireacht Ethereum nó foirne cliant iad féin a reáchtálann na nóid bhútála seo. Tabhair faoi deara nach bhfuil nóid bhútála mar an gcéanna le nóid statacha. Glaoitear ar nóid statacha arís agus arís eile, ach ní ghlaoitear ar nóid bhútála ach amháin mura bhfuil go leor piaraí ann le nascadh leo agus nach mór nód chun naisc nua a bhunú.

## Ceangail le nód bútála {#connect-to-a-bootnode}

Tá liosta de na nóid bhútála ionsuite ag an gcuid is mó de na cliaint, ach b'fhéidir gur mhaith leat do nód bútála féin a rith, nó ceann a úsáid nach bhfuil mar chuid de liosta códaithe crua an chliaint. Sa chás seo, is féidir leat iad a shonrú nuair a thosaíonn tú do chliant, mar seo a leanas (mar shampla do Geth, seiceáil le do thoil doiciméadú do chliaint):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Rith nód bútála {#run-a-bootnode}

Is nóid iomlána iad nóid bhútála nach bhfuil taobh thiar de NAT ([Aistriúchán Seoltaí Líonra](https://www.geeksforgeeks.org/network-address-translation-nat/)). Is féidir le gach nód iomlán feidhmiú mar nód bútála chomh fada agus atá sé ar fáil go poiblí.

Nuair a thosaíonn tú nód, ba cheart duit do [enode](/developers/docs/networking-layer/network-addresses/#enode) a logáil, ar aitheantóir poiblí é is féidir le daoine eile a úsáid chun nascadh leis do nód.

De ghnáth déantar an r-nód a athghiniúint ar gach atosú, mar sin déan cinnte breathnú ar dhoiciméadú do chliaint maidir le conas r-nód marthanach a ghiniúint do do tosaithe.

D'fhonn a bheith ina nód bútála maith is maith an smaoineamh é líon uasta na piaraí is féidir a nascadh leis a mhéadú. Má reáchtáiltear nód bútála le go leor piaraí méadóidh sé go mór an riachtanas bandaleithead.

## Nóid bhútála atá ar fáil {#available-bootnodes}

Is féidir liosta de na nóid bhútála ionsuite laistigh de go-ethereum a fháil [anseo](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Tá na nóid bhútála seo á gcothabháil ag Fondúireacht Ethereum agus ag foireann go-ethereum.

Tá liostaí eile de nóid bhútála arna gcothabháil ag oibrithe deonacha ar fáil. Cinntigh le do thoil nód tosaithe oifigiúil amháin ar a laghad a áireamh, nó d’fhéadfaí ionsaí éiclips a dhéanamh ort.
