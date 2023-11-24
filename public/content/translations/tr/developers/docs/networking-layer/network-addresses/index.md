---
title: Ağ adresleri
description: Ağ adreslerine giriş.
lang: tr
sidebarDepth: 2
---

Ethereum düğümleri, eşlere bağlanmak için bazı temel bilgilerle kendilerini tanımlamalıdır. Herhangi bir potansiyel eşin bu bilgiyi yorumlayabilmesini sağlamak için, herhangi bir Ethereum düğümünün anlayabileceği üç standart formattan birinde iletilir: multiaddr, enode veya Ethereum Node Records (ENR'ler). ENR'ler, Ethereum ağ adresleri için geçerli standarttır.

## Ön koşullar {#prerequisites}

Bu sayfayı anlamak için Ethereum'un [ağ katmanı](/developers/docs/networking-layer/) hakkında biraz bilgi sahibi olmak gerekir.

## Multiaddr {#multiaddr}

Orijinal Ethereum düğüm adresi formatı 'multiaddr' idi ('çoklu adresler'in kısaltması). Multiaddr, eşler arası ağlar için tasarlanmış evrensel bir biçimdir. Adresler, eğik çizgiyle ayrılmış anahtarlar ve değerlerle birlikte anahtar/değer çiftleri olarak temsil edilir. Örneğin, IPv4 adresi `192.168.22.27` olan bir düğüm için `33000` TCP bağlantı noktasını dinleyen multiaddr şöyle görünür:

`/ip4/192.168.22.27/tcp/33000`

Bir Ethereum düğümü için multiaddr, düğüm kimliğini (ortak anahtarlarının bir karması) içerir:

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode, bir URL adres formatı kullanarak bir Ethereum düğümünü tanımlamanın bir yoludur. Onaltılık düğüm kimliği, @ işareti kullanılarak ana bilgisayardan ayrılan URL'nin kullanıcı adı bölümünde kodlanır. Ana bilgisayar adı yalnızca bir IP adresi olarak verilebilir; DNS adlarına izin verilmez. Ana bilgisayar adı bölümündeki bağlantı noktası, TCP dinleme bağlantı noktasıdır. TCP ve UDP (keşif) bağlantı noktaları farklıysa, UDP bağlantı noktası "discport" sorgu parametresi olarak belirtilir

Aşağıdaki örnekte, düğüm URL'si, IP adresi `10.3.58.6`, TCP bağlantı noktası `30303` ve UDP keşif bağlantı noktası `30301` olan bir düğümü tanımlar.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Düğüm Kayıtları (ENR'ler) {#enr}

Ethereum Düğüm Kayıtları (ENR'ler), Ethereum'daki ağ adresleri için standart bir formattır. Çoklu adreslerin ve düğümlerin yerini alırlar. Bunlar özellikle yararlıdır çünkü düğümler arasında daha fazla bilgi alışverişine izin verirler. ENR; bir imza, sıra numarası ve imzaları oluşturup doğrulamak için kullanılan kimlik şemasını detaylandıran alanları içerir. ENR, anahtar/değer çiftleri olarak düzenlenen rastgele verilerle de doldurulabilir. Bu anahtar/değer çiftleri, düğümün IP adresini ve düğümün kullanabileceği alt protokoller hakkındaki bilgileri içerir. Consensus istemcileri, önyükleme düğümlerini tanımlamak için [belirli bir ENR yapısı](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) kullanır ve ayrıca mevcut Ethereum çatalı ve doğrulama dedikodusu alt ağı hakkında bilgi içeren bir `eth2` alan içerir (bu, düğümü, onayları bir araya toplanmış belirli bir eşler grubuna bağlar).

## Daha Fazla Okuma {#further-reading}

[EIP-778: Ethereum Düğüm Kayıtları (ENR)](https://eips.ethereum.org/EIPS/eip-778) [Ethereum'daki ağ adresleri](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/) [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
