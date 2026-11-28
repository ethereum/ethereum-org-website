---
title: "ERC-7730 ile protokolünüze açık imzalama ekleyin"
description: "Kullanıcılar imzalamadan önce akıllı sözleşme etkileşimlerinizin cüzdanlarda insan tarafından okunabilir ayrıntılar göstermesi için nasıl bir ERC-7730 tanımlayıcısı yazacağınızı öğrenin."
author: Hester Bruikman
lang: tr
tags: ["ERC-7730", "güvenlik", "imzalama", "akıllı sözleşmeler", "cüzdanlar"]
skill: intermediate
breadcrumb: "Açık imzalama"
published: 2026-05-11
---

Çoğu büyük Ethereum istismarının aynı son adımı vardı: bir kullanıcının anlamlı bir şekilde anlayamadığı bir işlemi onaylaması. Donanım cüzdanları ham onaltılık çağrı verisini gösterir ve daha da kötüsü sizi kör imzalamayı açık tutmaya zorlar. Yazılım cüzdanları kodu çözülmüş alanları gösterir, ancak yalnızca sözleşmeyi tanıdıklarında. Tanımadıklarında, protokol yeni olduğu için, uygulama tehlikeye girdiği için veya cihaz çevrimdışı olduğu için kullanıcılar kör imzalama yaparlar.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730), sözleşmenizin işlev çağrılarının ne *anlama geldiğini* açıklamak için standart bir JSON formatı tanımlar. 

ERC-7730'u destekleyen bir cüzdan tanımlayıcınızı okur ve şunları gösterir:

> **Takas**  
> Gönderilen: 1.000 USDC  
> Alınan minimum: 0,42 WETH  
> Protokol: Uniswap V2

Veya hem insanlar hem de aracılar tarafından okunabilen tek bir yapılandırılmış cümle:

> En az 0,42 WETH karşılığında 1.000 USDC takas et

Bir işlev seçici ve ham tam sayı değerleri listesi yerine.

Bu [açık imzalama](https://clearsigning.org/)dır (clear signing) — "Ne Görüyorsan Onu İmzalarsın." Bu eğitim, kendi sözleşmeniz için bir tanımlayıcı yazma, onu resmi CLI aracıyla doğrulama ve açık kayıt defterine gönderme konusunda size rehberlik eder.

## Ön koşullar {#prerequisites}

- Solidity ve akıllı sözleşme ABI'lerine aşinalık
- Doğrulanmış bir ABI'ye sahip dağıtılmış bir akıllı sözleşme (bir tanımlayıcı kayıt defterine kabul edilmeden önce [Sourcify](https://sourcify.dev) doğrulaması gereklidir) 
- Doğrulama CLI'si için Python 3.12 (sabitlenmiş `erc7730` paketi Python 3.13 veya sonraki sürümlere yüklenmez). Sisteminizdeki Python farklı bir sürümse, [uv](https://docs.astral.sh/uv/) sizin için Python 3.12'yi indirebilir ve çalıştırabilir
- Temel JSON bilgisi

## ERC-7730 tanımlayıcısı nedir? {#what-is-an-erc-7730-descriptor}

Bir tanımlayıcı, üç bölümden oluşan tek bir JSON dosyasıdır:

| Bölüm | Amaç |
| :---- | :---- |
| `context` | Tanımlayıcıyı zincir kimliği ve adresine göre belirli sözleşme dağıtımlarına bağlar |
| `metadata` | Projeyi adlandırır ve yeniden kullanılabilir sabitleri tanımlar |
| `display` | Her işlev imzasını insan tarafından okunabilir etiketlerle ve alan formatlarıyla eşler |

Tanımlayıcı sözleşmenin kendisinden ayrı olduğu için, yeniden dağıtım yapmadan mevcut herhangi bir protokole açık imzalama desteği ekleyebilirsiniz. Cüzdanlar tanımlayıcıları kayıt defterinden alır ve imzalama sırasında kullanır.

## 1. Adım: Dosya iskeletini oluşturun {#step-1-create-the-file-skeleton}

`calldata-<ContractName>.json` adında bir dosya oluşturun, örneğin `calldata-SwapRouter.json`. `calldata-` öneki, kayıt defterine bu tanımlayıcının türlü veri (typed-data) mesajları için olan `eip712-`'nin aksine sözleşme işlev çağrılarını kapsadığını söyler. Bir sözleşmenin birkaç sürümünü açıklamanız gerekiyorsa, kayıt defterinin `calldata-UniswapV3Router02.json` dosyasında olduğu gibi sözleşme sürümünü ada ekleyin.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## 2. Adım: Bağlam bölümünü yazın {#step-2-write-the-context-section}

`context` bölümü, tanımlayıcıyı bir veya daha fazla sözleşme dağıtımına bağlar. Cüzdanlar bunu, gelen bir işlemi doğru tanımlayıcıyla eşleştirmek için kullanır.

```json
"context": {
  "$id": "example-swap-router",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Bağlam alanları {#context-fields}

- `context.$id` — Bu tanımlayıcı belgesi veya dağıtım yapılandırması için benzersiz bir tanımlayıcı.
- `contract.deployments` — Bu tanımlayıcının uygulandığı dağıtımlar kümesi.
- `deployments[].chainId` — Bir dağıtım için EVM zincir kimliği. Sözleşmenizin dağıtıldığı her zinciri ekleyin.
- `deployments[].address` — Cüzdanların bu tanımlayıcıyla ilişkilendirmesi gereken sözleşme adresi. Bu, kullanıcıların işlemleri fiilen gönderdiği adrestir. Sözleşmeniz yükseltilebilir (upgradeable) ise, bu uygulama (implementation) adresi değil, proxy adresidir; `display.formats` içindeki işlev imzaları ise uygulamanın ABI'sinden gelir.

## 3. Adım: Meta veri bölümünü yazın {#step-3-write-the-metadata-section}

Meta veri bölümü, bu dosya tarafından açıklanan proje ve sözleşme hakkında insan tarafından okunabilir bilgiler sağlar. Cüzdanlar bu bilgileri imzalama sırasında protokol adlarını, bağlantıları ve diğer bağlamsal ayrıntıları görüntülemek için kullanabilir.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Meta veri alanları {#metadata-fields}

- `owner` — Bu tanımlayıcıdan sorumlu proje, protokol, kuruluş veya sürdürücü.
- `info.url` — Cüzdanların ek bağlam için kullanıcılara gösterebileceği kurallı bir proje veya belgelendirme URL'si.
- `contractName` — Bu dosya tarafından açıklanan, genellikle doğrulanmış kaynak kodu veya ABI ile eşleşen sözleşme veya uygulama adı.

ERC-7730 dosyanız bir ERC-20 sözleşmesini açıklıyorsa, bir token nesnesi de eklemelisiniz. 

## 4. Adım: Görüntüleme formatları bölümünü yazın {#step-4-write-the-displayformats-section}

`display.formats` nesnesi, işlev imzalarını insan tarafından okunabilir imzalama talimatlarıyla eşler. Cüzdanlar, kullanıcılar bir işlemi onaylamadan önce işlevinizi bu şekilde gösterir!

Her anahtar, insan tarafından okunabilir bir ABI parçasıdır — hem parametre adlarını hem de parametre türlerini tam olarak ABI'nizde göründükleri gibi içeren işlev imzası.


### Örnek: Bir token takasını açıklama {#eg-describing-token-swap}

Bu örnek, Uniswap V2 `Router02` sözleşmesinden `swapExactTokensForTokens` işlevini açıklar. Girdi token'ı `path` dizisinin ilk elemanıdır ve çıktı token'ı son elemandır (`path`, çok atlamalı (multi-hop) bir takas için ikiden fazla elemana sahip olabilir).

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}
```

### Görüntüleme alanları {#display-fields}

- **`intent`** — **(Gerekli)** Eylemin "Takas" gibi kısa, kullanıcı dostu bir açıklaması.
- **`interpolatedIntent`** — **(Önerilen)** `"Swap {amountIn} for at least {amountOutMin}"` gibi biçimlendirilmiş alan değerlerini gömen daha zengin bir cümle şablonu. Cüzdanların herhangi bir görüntüleme kısıtlaması olması durumunda göstermeyi seçebileceği daha da kullanıcı dostu bir tanımlayıcı sağlamak için bunu `intent` ile birlikte ekleyin.
- **`fields`** — **(Gerekli)** Cüzdanların kullanıcılara göstermesi gereken işlem alanlarının sıralı listesi.
  - **`path`** — **(Gerekli)** İşlem verilerine bir referans. `#.fieldName`, ABI'deki adına göre kodu çözülmüş bir çağrı verisi parametresini işaret eder. `@.value`, işlemle birlikte gönderilen ETH değerini ifade eder. Dizi elemanları parantezlerden önce bir `.` ile yazılır: `#.path.[0]` ilk elemandır ve `#.path.[-1]` son elemandır. `#.path[0]` (nokta olmadan) linter tarafından reddedilir.
  - **`label`** — **(Gerekli)** Değerin yanında gösterilen, insan tarafından okunabilir etiket.
  - **`format`** — **(Önerilen)** Değerin nasıl işleneceğini kontrol eder. Yaygın formatlar şunları içerir:
    - `tokenAmount`
    - `addressName`
    - `date`

    Ek bir biçimlendirme gerekmediğinde `raw` kullanın. Bazı formatlar ek **`params`** yapılandırmasını kabul eder. Örneğin:

    - `tokenAmount`, hangi token adresinin ondalık sayıları ve borsa sembolü (ticker) meta verilerini sağladığını belirlemek için `tokenPath` kullanabilir.
    - `date`, zaman damgasının nasıl kodlandığını açıklamak için `encoding` kullanabilir.

    Seçilen format ekstra bilgi gerektirmiyorsa, `params` kısmını atlayın.

## Tam tanımlayıcı {#the-complete-descriptor}

Yer tutucu adreslerini dağıtılmış sözleşmenizin adresleriyle değiştirin. Linter, tanımlayıcıyı bu adreslerdeki doğrulanmış ABI'ye karşı kontrol eder, bu nedenle siz bunu yapana kadar hatalar bildirir.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## 5. Adım: Kayıt defterine gönderin {#step-5-submit-to-the-registry}

[ERC-7730 kayıt defteri](https://github.com/ethereum/clear-signing-erc7730-registry), tarafsız bir yönetici olarak [Ethereum Vakfı](/foundation/) tarafından barındırılan açık bir depodur. İsteyen herkes onu klonlamakta ve kendi sunucusunda barındırmakta özgürdür — cüzdanlar hangi kayıt defteri örneklerine güveneceklerine bağımsız olarak karar verirler.

1. GitHub'da depoyu çatallayın
2. `registry/<your-project-name>/` konumunda bir klasör oluşturun
3. Dosyanızı içine yerleştirin: `registry/myproject/calldata-SwapRouter.json`
4. `$schema` alanını depo içinde kullanılan göreli yolla güncelleyin: `"../../specs/erc7730-v2.schema.json"`. CI burada bir URL'yi reddeder.
5. Bir test dosyası ekleyin (aşağıya bakın)
6. Dosyalarınızı yerel olarak doğrulayın (aşağıya bakın)
7. Bir çekme isteği (PR) açın. Her çekme isteği `registry/` altındaki yalnızca bir klasörü değiştirebilir

### Bir test dosyası ekleyin {#add-a-test-file}

Eklediğiniz veya değiştirdiğiniz her tanımlayıcının bir test dosyasına ihtiyacı vardır, böylece açık imzalama uygulamaları buna karşı kontrol edilebilir. `display.formats` içindeki her işlev için en az bir test senaryosu içeren `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` oluşturun. CI, her formatın işlev seçicisini türetir ve hiçbir test işlemi onu çağırmazsa başarısız olur.

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx`, yalnızca çağrı verisi değil, tam serileştirilmiş **imzasız** işlemdir (burada kısaltılmıştır). Sözleşmenize yapılan gerçek işlemler en iyi test senaryolarıdır.
- `dataProvider`, testlerin ağ erişimine ihtiyaç duymaması için token meta verilerini (ve isteğe bağlı olarak adres ve ENS adlarını) sağlar.
- `expected`, bir cüzdanın göstermesi gereken şeydir. CI, her test senaryosunu açık imzalama uygulamalarıyla işler ve çekme isteğindeki farklılıkları bildirir.

EIP-712 tanımlayıcıları için test dosyaları da dahil olmak üzere tam format için kayıt defteri README'sindeki [Referans test senaryoları](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) bölümüne bakın.

### Yerel olarak doğrulayın {#validate-locally}

Kayıt defteri, tanımlayıcıları `.github/requirements.txt` içinde sabitlenmiş [`erc7730`](https://github.com/sourcifyeth/python-erc7730) komut satırı aracıyla kontrol eder. Bunu çatalınızın kök dizininden, bir Python 3.12 ortamında çalıştırın:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

[uv](https://docs.astral.sh/uv/) kullanıyorsanız, sanal ortamı atlayabilirsiniz ve uv gerekirse Python 3.12'yi indirir:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Linter, tanımlayıcıyı şemaya ve sözleşmenizin doğrulanmış ABI'sine karşı kontrol eder. Her hatayı düzeltin. `Missing display format` gibi uyarılar, sözleşmenin tanımlayıcınızın henüz açıklamadığı işlevlere sahip olduğu anlamına gelir. `$schema` yollarını ve test dosyasını CI'ın yaptığı gibi kontrol etmek için kayıt defteri README'sindeki [Nasıl doğrulanır](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) bölümüne bakın.

PR'ı açtığınızda, CI otomatik olarak şema doğrulamasını çalıştırır, işlev imzalarının geçerli seçiciler ürettiğini kontrol eder, sözleşme adresinin Sourcify'da doğrulandığını onaylar ve ABI tutarsızlıklarını işaretler. Kontrol sonuçları PR üzerinde satır içi olarak görünür. Kayıt defteri sürdürücüleri, hatalı biçimlendirilmiş veya potansiyel olarak kötü niyetli tanımlayıcılar için gönderimleri inceler. Kayıt defterine dahil edilmek, denetim veya onay anlamına gelmez.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Not:** PR'ınızın kabul edilebilmesi için sözleşmenizin <a href="https://repo.sourcify.dev">Sourcify</a> üzerinde doğrulanmış olması gerekir. Henüz doğrulanmadıysa, önce <a href="https://verify.sourcify.dev/">doğrulama gönderin</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Birleştirmeden sonra ne olur? {#what-happens-after-merging}

Kayıt defterindeki tüm tanımlayıcılar denetçilere açıktır. PR'ınız birleştirildikten sonra, herhangi bir denetçi tanımlayıcınızı inceleyebilir ve doğruluğunu onaylayan kriptografik bir onay ([ERC-8176](https://eips.ethereum.org/EIPS/eip-8176) altında) yayınlayabilir. 

Bu onay sinyalleri, cüzdanların kendi güven politikalarını uygulamalarına olanak tanır — birden fazla bağımsız onaya sahip bir tanımlayıcı, onayı olmayan bir tanımlayıcıdan daha fazla ağırlık taşır. Denetçi topluluğuna [clearsigning.org](https://clearsigning.org) üzerinden ulaşabilirsiniz.

Cüzdanlar hangi kayıt defterini destekleyeceklerini seçerler. Tanımlayıcınız kayıt defterine girdikten sonra, ERC-7730'u destekleyen cüzdanlar, kendi kayıt defterlerinde varsa onu getirmeye başlayacak ve kullanıcılar sözleşmenizle etkileşime girdiğinde insan tarafından okunabilir veriler gösterecektir.

## Daha fazla bilgi {#further-reading}

- [ERC-7730 spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 kayıt defteri](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — araçlar, ekosistem durumu ve yönetişim  
- [Sourcify sözleşme doğrulaması](https://sourcify.dev)  
- [Trilyon Dolarlık Güvenlik girişimi](https://trilliondollarsecurity.org)

