---
title: "Ethereum Geliştirme Standartları"
description: "EIP'ler, ERC-20 ve ERC-721 gibi jeton standartları ve geliştirme kuralları da dahil olmak üzere Ethereum standartları hakkında bilgi edinin."
lang: tr
incomplete: true
---

## Standartlara genel bakış {#standards-overview}

Ethereum topluluğu, projelerin ([Ethereum istemcileri](/developers/docs/nodes-and-clients/) ve cüzdanlar gibi) uygulamalar genelinde birlikte çalışabilir kalmasına yardımcı olan ve akıllı sözleşmeler ile merkeziyetsiz uygulamaların birleştirilebilir kalmasını sağlayan birçok standardı benimsemiştir.

Genellikle standartlar, topluluk üyeleri tarafından [standart bir süreç](https://eips.ethereum.org/EIPS/eip-1) aracılığıyla tartışılan [Ethereum İyileştirme Önerileri](/eips/) (EIP'ler) olarak tanıtılır.

- [EIP'lere Giriş](/eips/)
- [EIP Listesi](https://eips.ethereum.org/)
- [EIP GitHub deposu](https://github.com/ethereum/EIPs)
- [EIP tartışma panosu](https://ethereum-magicians.org/c/eips)
- [Ethereum Yönetişimine Giriş](/governance/)
- [Ethereum Yönetişimine Genel Bakış](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 Mart 2019 - Boris Mann_
- [Ethereum Protokol Geliştirme Yönetişimi ve Ağ Yükseltme Koordinasyonu](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 Mart 2020 - Hudson Jameson_
- [Tüm Ethereum Çekirdek Geliştirici Toplantılarının Oynatma Listesi](https://www.youtube.com/@EthereumProtocol) _(YouTube Oynatma Listesi)_

## Standart türleri {#types-of-standards}

3 tür EIP vardır:

- Standart İzleme: Ethereum uygulamalarının çoğunu ya da tamamını etkileyen herhangi bir değişikliği açıklar
- [Meta İzleme](https://eips.ethereum.org/meta): Ethereum'u çevreleyen bir süreci tanımlar veya bir süreçte değişiklik önerir
- [Bilgi İzleme](https://eips.ethereum.org/informational): bir Ethereum tasarım sorununu tanımlar veya Ethereum topluluğuna genel yönergeler ya da bilgiler sağlar

Ayrıca, Standart İzleme 4 kategoriye ayrılmıştır:

- [Çekirdek](https://eips.ethereum.org/core): bir mutabakat çatalı gerektiren iyileştirmeler
- [Ağ Oluşturma](https://eips.ethereum.org/networking): devp2p ve Hafif Ethereum Alt Protokolü etrafındaki iyileştirmelerin yanı sıra whisper ve swarm'ın ağ protokolü özelliklerine yönelik önerilen iyileştirmeler.
- [Arayüz](https://eips.ethereum.org/interface): istemci API/RPC spesifikasyonları ve standartları ile ilgili iyileştirmeler ve yöntem adları ile sözleşme ABI'leri gibi belirli dil düzeyindeki standartlar.
- [ERC](https://eips.ethereum.org/erc): uygulama düzeyindeki standartlar ve kurallar

Bu farklı türler ve kategoriler hakkında daha ayrıntılı bilgi [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types) belgesinde bulunabilir.

### Jeton standartları {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Oylama jetonları, hisseleme jetonları veya sanal para birimleri gibi değiştirilebilir (birbiri yerine kullanılabilir) jetonlar için standart bir arayüz.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Jetonların ether ile aynı şekilde davranmasını sağlayan ve alıcı tarafında jeton transferlerinin işlenmesini destekleyen bir değiştirilebilir jeton standardı.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Tek bir işlemde alıcı sözleşmelerinde geri arama (callback) yürütmeyi destekleyen ERC-20 jetonları için bir uzantı arayüzü.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Bir sanat eseri veya şarkı için bir tapu gibi, değiştirilemez jetonlar için standart bir arayüz.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Ardışık jeton tanımlayıcıları kullanılarak bir veya daha fazla değiştirilemez jeton oluşturulurken/aktarılırken yayılan standartlaştırılmış bir olay.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 tüketici rolü için arayüz uzantısı.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721 jetonlarına kısıtlı izinlere sahip, zaman sınırlı bir rol ekler.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(ÖNERİLMEZ)** ERC-20'yi geliştiren bir jeton standardı.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Hem değiştirilebilir hem de değiştirilemez varlıkları içerebilen bir jeton standardı.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Getiri sağlayan kasaların teknik parametrelerini optimize etmek ve birleştirmek için tasarlanmış tokenize edilmiş bir kasa standardı.

[Jeton standartları](/developers/docs/standards/tokens/) hakkında daha fazla bilgi edinin.

## Daha fazla kaynak {#further-reading}

- [Ethereum İyileştirme Önerileri (EIP'ler)](/eips/)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
