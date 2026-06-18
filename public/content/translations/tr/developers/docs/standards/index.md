---
title: Ethereum Geliştirme Standartları
description: EIP'ler, ERC-20 ve ERC-721 gibi Token standartları ve geliştirme kuralları dahil olmak üzere Ethereum standartları hakkında bilgi edinin.
lang: tr
incomplete: true
---

## Standartlara genel bakış {#standards-overview}

Ethereum topluluğu, projelerin ([Ethereum istemcileri](/developers/docs/nodes-and-clients/) ve cüzdanlar gibi) uygulamalar arasında birlikte çalışabilir kalmasına yardımcı olan ve akıllı sözleşmelerin ve merkeziyetsiz uygulamaların (dapp'lerin) birleştirilebilir kalmasını sağlayan birçok standardı benimsemiştir.

Genellikle standartlar, topluluk üyeleri tarafından [standart bir süreç](https://eips.ethereum.org/EIPS/eip-1) aracılığıyla tartışılan [Ethereum İyileştirme Teklifleri](/eips/) (EIP'ler) olarak sunulur.

- [EIP'lere Giriş](/eips/)
- [EIP'lerin Listesi](https://eips.ethereum.org/)
- [EIP GitHub deposu](https://github.com/ethereum/EIPs)
- [EIP tartışma panosu](https://ethereum-magicians.org/c/eips)
- [Ethereum Yönetişimine Giriş](/governance/)
- [Ethereum Yönetişimine Genel Bakış](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 Mart 2019 - Boris Mann_
- [Ethereum Protokol Geliştirme Yönetişimi ve Ağ Yükseltme Koordinasyonu](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 Mart 2020 - Hudson Jameson_
- [Tüm Ethereum Çekirdek Geliştirici Toplantılarının Oynatma Listesi](https://www.youtube.com/@EthereumProtocol) _(YouTube Oynatma Listesi)_

## Standart türleri {#types-of-standards}

3 tür EIP vardır:

- Standartlar Yolu (Standards Track): çoğu veya tüm Ethereum uygulamalarını etkileyen herhangi bir değişikliği açıklar
- [Meta Yolu (Meta Track)](https://eips.ethereum.org/meta): Ethereum'u çevreleyen bir süreci açıklar veya bir süreçte değişiklik önerir
- [Bilgilendirme Yolu (Informational Track)](https://eips.ethereum.org/informational): bir Ethereum tasarım sorununu açıklar veya Ethereum topluluğuna genel yönergeler veya bilgiler sağlar

Ayrıca, Standartlar Yolu 4 kategoriye ayrılır:

- [Çekirdek (Core)](https://eips.ethereum.org/core): bir mutabakat çatallanması gerektiren iyileştirmeler
- [Ağ (Networking)](https://eips.ethereum.org/networking): devp2p ve Hafif Ethereum Alt Protokolü (Light Ethereum Subprotocol) etrafındaki iyileştirmelerin yanı sıra whisper ve Swarm'ın ağ protokolü spesifikasyonlarında önerilen iyileştirmeler.
- [Arayüz (Interface)](https://eips.ethereum.org/interface): istemci API/RPC spesifikasyonları ve standartları ile yöntem adları ve sözleşme ABI'leri gibi belirli dil düzeyindeki standartlar etrafındaki iyileştirmeler.
- [ERC](https://eips.ethereum.org/erc): uygulama düzeyindeki standartlar ve kurallar

Bu farklı türler ve kategoriler hakkında daha ayrıntılı bilgi [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types) içinde bulunabilir

### Token standartları {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Oy Token'ları, staking Token'ları veya sanal para birimleri gibi misli (değiştirilebilir) Token'lar için standart bir arayüz.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Token'ların Ether ile aynı şekilde davranmasını sağlayan ve alıcı tarafında Token transferlerinin işlenmesini destekleyen bir misli Token standardı.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Tek bir işlemde alıcı sözleşmelerinde geri çağırma (callback) yürütmeyi destekleyen ERC-20 Token'ları için bir uzantı arayüzü.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Bir sanat eseri veya şarkı tapusu gibi misli olmayan (non-fungible) Token'lar için standart bir arayüz.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Ardışık Token tanımlayıcıları kullanarak bir veya daha fazla misli olmayan Token oluştururken/aktarırken yayımlanan standartlaştırılmış bir olay.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 tüketici rolü için arayüz uzantısı.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721 Token'larına kısıtlı izinlere sahip, zaman sınırlı bir rol ekler.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(ÖNERİLMEZ)** ERC-20'yi geliştiren bir Token standardı.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Hem misli hem de misli olmayan varlıkları içerebilen bir Token standardı.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Getiri sağlayan kasaların teknik parametrelerini optimize etmek ve birleştirmek için tasarlanmış tokenize edilmiş bir kasa standardı.

[Token standartları](/developers/docs/standards/tokens/) hakkında daha fazla bilgi edinin.

## Daha fazla bilgi {#further-reading}

- [Ethereum İyileştirme Teklifleri (EIP'ler)](/eips/)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_