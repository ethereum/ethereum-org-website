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

Çoğu büyük Ethereum istismarının aynı son adımı vardı: bir kullanıcının anlamlı bir şekilde anlayamadığı bir işlemi onaylaması. Donanım cüzdanları ham onaltılık (hex) çağrı verisini gösterir ve daha da kötüsü sizi kör imzalamayı (blind signing) açık tutmaya zorlar. Yazılım cüzdanları çözülmüş alanları gösterir, ancak yalnızca sözleşmeyi tanıdıklarında. Tanımadıklarında, protokol yeni olduğu için, uygulama tehlikeye girdiği için veya cihaz çevrimdışı olduğu için kullanıcılar körü körüne imzalama yaparlar.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730), sözleşmenizin işlev çağrılarının ne *anlama geldiğini* açıklamak için standart bir JSON formatı tanımlar. 

ERC-7730'u destekleyen bir cüzdan tanımlayıcınızı okur ve şunları gösterir:

> **Takas**  
> Gönderilen: 1.000 USDC  
> Alınan minimum: 0,42 WETH  
> Protokol: Uniswap V3

Veya hem insanlar hem de aracılar tarafından okunabilen tek bir yapılandırılmış cümle:

> 1.000 USDC'yi en az 0,42 WETH ile takas et

Bir işlev seçici ve ham tam sayı değerleri listesi yerine.

Bu [açık imzalama](https://clearsigning.org/)dır — "Ne Görüyorsan Onu İmzalarsın." Bu eğitim, kendi sözleşmeniz için bir tanımlayıcı yazma, onu resmi CLI aracıyla doğrulama ve açık kayıt defterine gönderme adımlarında size rehberlik eder.

## Ön Koşullar {#prerequisites}

- Solidity ve akıllı sözleşme ABI'lerine aşinalık
- Doğrulanmış bir ABI'ye sahip dağıtılmış bir akıllı sözleşme (Bir tanımlayıcının kayıt defterine kabul edilmesinden önce [Sourcify](https://sourcify.dev) doğrulaması gereklidir) 
- Doğrulama CLI'si için Python 3.12+ 
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

`calldata-<contractname>-<descriptorversion>.json` adında bir dosya oluşturun. `calldata-` öneki, kayıt defterine bu tanımlayıcının yazılı veri (typed-data) mesajları için olan `eip712-`'ın aksine sözleşme işlev çağrılarını kapsadığını söyler. `descriptorversion`, kayıt defterine tanımlayıcı dosyasının sürümünü söyler, sürüm sağlanmazsa varsayılan olarak 0'dır.


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

`context` bölümü, tanımlayıcıyı bir veya daha fazla sözleşme dağıtımına bağlar. Cüzdanlar bunu gelen bir işlemi doğru tanımlayıcıyla eşleştirmek için kullanır.

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
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
- `deployments[].chainId` — Bir dağıtım için EVM zincir kimliği. Sözleşmenizin dağıtıldığı her zinciri dahil edin.
- `deployments[].address` — Cüzdanların bu tanımlayıcıyla ilişkilendirmesi gereken sözleşme adresi. Yürütme mantığını barındıran uygulama adresini kullanın.

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
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
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
- **`interpolatedIntent`** — **(Önerilen)** `"Swap {amountIn} for at least {amountOutMin}"` gibi biçimlendirilmiş alan değerlerini yerleştiren daha zengin bir cümle şablonu. Cüzdanların herhangi bir görüntüleme kısıtlaması olması durumunda göstermeyi seçebileceği daha da kullanıcı dostu bir tanımlayıcı sağlamak için bunu `intent` ile birlikte ekleyin.
- **`fields`** — **(Gerekli)** Cüzdanların kullanıcılara göstermesi gereken işlem alanlarının sıralı listesi.
  - **`path`** — **(Gerekli)** İşlem verilerine bir referans. `#.fieldName`, ABI'deki ada göre çözülmüş bir çağrı verisi parametresini işaret eder. `@.value`, işlemle birlikte gönderilen ETH değerini ifade eder.
  - **`label`** — **(Gerekli)** Değerin yanında gösterilen insan tarafından okunabilir etiket.
  - **`format`** — **(Önerilen)** Değerin nasıl işleneceğini kontrol eder. Yaygın formatlar şunları içerir:
    - `tokenAmount`
    - `addressName`
    - `date`

    Ek biçimlendirme gerekmediğinde `raw` kullanın. Bazı formatlar ek **`params`** yapılandırmasını kabul eder. Örneğin:

    - `tokenAmount`, hangi token adresinin ondalık sayıları ve borsa sembolü meta verilerini sağladığını belirlemek için `tokenPath` kullanabilir.
    - `date`, zaman damgasının nasıl kodlandığını açıklamak için `encoding` kullanabilir.

    Seçilen format ekstra bilgi gerektirmiyorsa, `params`'yi atlayın.

## Tam tanımlayıcı {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
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
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
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

[ERC-7730 kayıt defteri](https://github.com/ethereum/clear-signing-erc7730-registry), tarafsız bir yönetici olarak [Ethereum Vakfı](/foundation/) tarafından barındırılan açık bir depodur. Herkes onu klonlamakta ve kendi kendine barındırmakta özgürdür — cüzdanlar hangi kayıt defteri örneklerine güveneceklerine bağımsız olarak karar verirler.

1. GitHub'da depoyu çatallayın (fork)  
2. `registry/<your-project-name>/` konumunda bir klasör oluşturun  
3. Dosyanızı içine yerleştirin: `registry/myproject/calldata-mycontract-0_0.json`  
4. `$schema` alanını depo içinde kullanılan göreli yola güncelleyin: `"../../specs/erc7730-v2.schema.json"`  
5. Bir çekme isteği (pull request) açın

PR'ı açtığınızda, CI otomatik olarak şema doğrulaması çalıştırır, işlev imzalarının geçerli seçiciler ürettiğini kontrol eder, sözleşme adresinin Sourcify'da doğrulandığını onaylar ve ABI tutarsızlıklarını işaretler. Kontrol sonuçları PR üzerinde satır içi olarak görünür. Kayıt defteri sürdürücüleri, hatalı biçimlendirilmiş veya potansiyel olarak kötü niyetli tanımlayıcılar için gönderimleri inceler. Kayıt defterine dahil edilmek, denetim veya onay anlamına gelmez.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Not:** PR'ınızın kabul edilebilmesi için sözleşmenizin <a href="https://repo.sourcify.dev">Sourcify</a> üzerinde doğrulanmış olması gerekir. Henüz doğrulanmadıysa, önce <a href="https://verify.sourcify.dev/">doğrulama gönderin</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Birleştirmeden sonra ne olur? {#what-happens-after-merging}

Kayıt defterindeki tüm tanımlayıcılar denetçilere açıktır. PR'ınız birleştirildikten sonra, herhangi bir denetçi tanımlayıcınızı inceleyebilir ve doğruluğunu onaylayan kriptografik bir onay ([ERC-8176](https://github.com/ethereum/ERCs/pull/1576) altında) yayınlayabilir. 

Bu onay sinyalleri, cüzdanların kendi güven politikalarını uygulamalarına olanak tanır — birden fazla bağımsız onaya sahip bir tanımlayıcı, onayı olmayan bir tanımlayıcıdan daha fazla ağırlık taşır. Denetçi topluluğuna [clearsigning.org](https://clearsigning.org) üzerinden ulaşabilirsiniz.

Cüzdanlar hangi kayıt defterini destekleyeceklerini seçerler. Tanımlayıcınız kayıt defterine girdikten sonra, ERC-7730'u destekleyen cüzdanlar, kendi kayıt defterlerinde varsa onu getirmeye başlayacak ve kullanıcılar sözleşmenizle etkileşime girdiğinde insan tarafından okunabilir veriler gösterecektir.

## Daha fazla bilgi {#further-reading}

- [ERC-7730 spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 kayıt defteri](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — araçlar, ekosistem durumu ve yönetişim  
- [Sourcify sözleşme doğrulaması](https://sourcify.dev)  
- [Trilyon Dolarlık Güvenlik girişimi](https://trilliondollarsecurity.org)