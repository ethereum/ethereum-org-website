---
title: "Ağ adresleri"
description: "Ağ adreslerine giriş."
lang: tr
sidebarDepth: 2
---

[Ethereum](/) düğümleri, eşlere bağlanmak için kendilerini bazı temel bilgilerle tanımlamak zorundadır. Herhangi bir potansiyel eşin bu bilgiyi yorumlayabilmesini sağlamak için, bu bilgi herhangi bir Ethereum düğümünün anlayabileceği üç standartlaştırılmış formattan birinde iletilir: multiaddr, enode veya Ethereum Düğüm Kayıtları (ENR'ler). ENR'ler, Ethereum ağ adresleri için mevcut standarttır.

## Ön Koşullar {#prerequisites}

Bu sayfayı anlamak için Ethereum'un [ağ katmanı](/developers/docs/networking-layer/) hakkında biraz bilgi sahibi olmak gereklidir.

## Multiaddr {#multiaddr}

Orijinal Ethereum düğüm adres formatı 'multiaddr' ('çoklu adresler'in kısaltması) idi. Multiaddr, eşler arası ağlar için tasarlanmış evrensel bir formattır. Adresler, anahtarlar ve değerlerin bir eğik çizgi ile ayrıldığı anahtar-değer çiftleri olarak temsil edilir. Örneğin, TCP bağlantı noktası `33000`'yi dinleyen `192.168.22.27` IPv4 adresine sahip bir düğüm için multiaddr şuna benzer:

`/ip4/192.168.22.27/tcp/33000`

Bir Ethereum düğümü için multiaddr, düğüm kimliğini (açık anahtarlarının bir hash'i) içerir:

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Bir enode, bir URL adres formatı kullanarak bir Ethereum düğümünü tanımlamanın bir yoludur. Onaltılık düğüm kimliği, URL'nin kullanıcı adı kısmında kodlanır ve ana bilgisayardan (host) bir @ işareti kullanılarak ayrılır. Ana bilgisayar adı yalnızca bir IP adresi olarak verilebilir; DNS adlarına izin verilmez. Ana bilgisayar adı bölümündeki bağlantı noktası, TCP dinleme bağlantı noktasıdır. TCP ve UDP (keşif) bağlantı noktaları farklıysa, UDP bağlantı noktası bir sorgu parametresi olan "discport" olarak belirtilir.

Aşağıdaki örnekte, düğüm URL'si `10.3.58.6` IP adresine, `30303` TCP bağlantı noktasına ve `30301` UDP keşif bağlantı noktasına sahip bir düğümü tanımlar.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Düğüm Kayıtları (ENR'ler) {#enr}

Ethereum Düğüm Kayıtları (ENR'ler), Ethereum'daki ağ adresleri için standartlaştırılmış bir formattır. Multiaddr'lerin ve enode'ların yerini alırlar. Bunlar, düğümler arasında daha fazla bilgi alışverişine izin verdikleri için özellikle yararlıdır. ENR; bir imza, sıra numarası ve imzaları oluşturmak ve doğrulamak için kullanılan kimlik şemasını detaylandıran alanlar içerir. ENR ayrıca anahtar-değer çiftleri olarak düzenlenen rastgele verilerle de doldurulabilir. Bu anahtar-değer çiftleri, düğümün IP adresini ve düğümün kullanabileceği alt protokoller hakkındaki bilgileri içerir. Mutabakat istemcileri, önyükleme (boot) düğümlerini tanımlamak için [belirli bir ENR yapısı](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) kullanır ve ayrıca mevcut Ethereum çatallanması ve onay dedikodu alt ağı (bu, düğümü onayları birlikte toplanan belirli bir eş kümesine bağlar) hakkında bilgi içeren bir `eth2` alanı içerir.

## Daha Fazla Okuma {#further-reading}

- [EIP-778: Ethereum Düğüm Kayıtları (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)