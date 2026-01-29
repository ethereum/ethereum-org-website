---
title: "Vyper ERC-721 अनुबंध वॉकथ्रू"
description: "रयुया नाकामुरा का ERC-721 अनुबंध और यह कैसे काम करता है"
author: "ओरी पोमेरेन्ट्ज़"
lang: hi
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## परिचय {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) मानक का उपयोग नॉन-फंजिबल टोकन (NFT) के स्वामित्व को बनाए रखने के लिए किया जाता है।
[ERC-20](/developers/docs/standards/tokens/erc-20/) टोकन एक वस्तु के रूप में व्यवहार करते हैं, क्योंकि अलग-अलग टोकन के बीच कोई अंतर नहीं होता है।
इसके विपरीत, ERC-721 टोकन उन संपत्तियों के लिए डिज़ाइन किए गए हैं जो समान हैं लेकिन समान नहीं हैं, जैसे कि अलग-अलग बिल्ली
कार्टून या अचल संपत्ति के अलग-अलग टुकड़ों के शीर्षक।

इस लेख में हम [रयुया नाकामुरा के ERC-721 अनुबंध](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) का विश्लेषण करेंगे।
यह अनुबंध [Vyper](https://vyper.readthedocs.io/en/latest/index.html) में लिखा गया है, जो एक Python-जैसी अनुबंध भाषा है जिसे Solidity की तुलना में असुरक्षित कोड लिखना कठिन बनाने के लिए डिज़ाइन किया गया है।

## अनुबंध {#contract}

```python
# @dev ERC-721 नॉन-फंजिबल टोकन मानक का कार्यान्वयन।
# @author रयुया नाकामुरा (@nrryuya)
# इससे संशोधित: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper में टिप्पणियाँ, Python की तरह, हैश (`#`) से शुरू होती हैं और लाइन के अंत तक जारी रहती हैं। `@<keyword>` वाली टिप्पणियों का उपयोग [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) द्वारा मानव-पठनीय दस्तावेज़ीकरण बनाने के लिए किया जाता है।

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 इंटरफ़ेस Vyper भाषा में अंतर्निहित है।
[आप कोड परिभाषा यहाँ देख सकते हैं](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)।
इंटरफ़ेस परिभाषा Python में लिखी गई है, न कि Vyper में, क्योंकि इंटरफ़ेस का उपयोग न केवल ब्लॉकचेन के भीतर किया जाता है, बल्कि एक बाहरी क्लाइंट से ब्लॉकचेन में एक लेनदेन भेजते समय भी किया जाता है, जो Python में लिखा जा सकता है।

पहली लाइन इंटरफ़ेस को आयात करती है, और दूसरी यह निर्दिष्ट करती है कि हम इसे यहाँ लागू कर रहे हैं।

### ERC721Receiver इंटरफ़ेस {#receiver-interface}

```python
# safeTransferFrom() द्वारा बुलाए गए अनुबंध के लिए इंटरफ़ेस
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 दो प्रकार के हस्तांतरण का समर्थन करता है:

- `transferFrom`, जो प्रेषक को किसी भी गंतव्य पते को निर्दिष्ट करने देता है और हस्तांतरण की जिम्मेदारी प्रेषक पर डालता है। इसका मतलब है कि आप एक अमान्य पते पर स्थानांतरित कर सकते हैं, इस मामले में NFT हमेशा के लिए खो जाता है।
- `safeTransferFrom`, जो जांचता है कि गंतव्य पता एक अनुबंध है या नहीं। यदि ऐसा है, तो ERC-721 अनुबंध प्राप्त करने वाले अनुबंध से पूछता है कि क्या वह NFT प्राप्त करना चाहता है।

`safeTransferFrom` अनुरोधों का उत्तर देने के लिए एक प्राप्त करने वाले अनुबंध को `ERC721Receiver` लागू करना होगा।

```python
            _operator: address,
            _from: address,
```

`_from` पता टोकन का वर्तमान स्वामी है। `_operator` पता वह है जिसने हस्तांतरण का अनुरोध किया था (भत्ते के कारण ये दोनों समान नहीं हो सकते हैं)।

```python
            _tokenId: uint256,
```

ERC-721 टोकन आईडी 256 बिट्स हैं। आमतौर पर वे टोकन का प्रतिनिधित्व करने वाली किसी भी चीज़ के विवरण को हैश करके बनाए जाते हैं।

```python
            _data: Bytes[1024]
```

अनुरोध में 1024 बाइट्स तक का उपयोगकर्ता डेटा हो सकता है।

```python
        ) -> bytes32: view
```

उन मामलों को रोकने के लिए जिनमें एक अनुबंध गलती से एक हस्तांतरण स्वीकार कर लेता है, वापसी मान एक बूलियन नहीं है, बल्कि एक विशिष्ट मान के साथ 256 बिट्स है।

यह फ़ंक्शन एक `view` है, जिसका अर्थ है कि यह ब्लॉकचेन की स्थिति को पढ़ सकता है, लेकिन इसे संशोधित नहीं कर सकता है।

### घटनाएँ {#events}

[इवेंट्स](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) को ब्लॉकचेन के बाहर के उपयोगकर्ताओं और सर्वरों को इवेंट्स के बारे में सूचित करने के लिए उत्सर्जित किया जाता है। ध्यान दें कि इवेंट्स की सामग्री ब्लॉकचेन पर अनुबंधों के लिए उपलब्ध नहीं है।

```python
# @dev किसी भी तंत्र द्वारा किसी भी NFT का स्वामित्व बदलने पर उत्सर्जित होता है। यह इवेंट तब उत्सर्जित होता है जब NFTs बनाए जाते हैं (`from` == 0) और नष्ट हो जाते हैं (`to` == 0)। अपवाद: अनुबंध निर्माण के दौरान, बिना Transfer उत्सर्जित किए किसी भी संख्या में NFTs बनाए और असाइन किए जा सकते हैं। किसी भी हस्तांतरण के समय, उस NFT के लिए स्वीकृत पता (यदि कोई हो) रीसेट हो जाता है।
# @param _from NFT का प्रेषक (यदि पता शून्य पता है तो यह टोकन निर्माण को इंगित करता है)।
# @param _to NFT का रिसीवर (यदि पता शून्य पता है तो यह टोकन विनाश को इंगित करता है)।
# @param _tokenId वह NFT जिसे स्थानांतरित किया गया था।
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

यह ERC-20 Transfer इवेंट के समान है, सिवाय इसके कि हम राशि के बजाय `tokenId` की रिपोर्ट करते हैं।
शून्य पते का कोई स्वामी नहीं है, इसलिए परंपरा के अनुसार हम इसका उपयोग टोकन के निर्माण और विनाश की रिपोर्ट करने के लिए करते हैं।

```python
# @dev यह तब उत्सर्जित होता है जब किसी NFT के लिए स्वीकृत पता बदल दिया जाता है या उसकी पुष्टि की जाती है। शून्य पता इंगित करता है कि कोई स्वीकृत पता नहीं है। जब एक Transfer इवेंट उत्सर्जित होता है, तो यह यह भी इंगित करता है कि उस NFT के लिए स्वीकृत पता (यदि कोई हो) रीसेट हो जाता है।
# @param _owner NFT का स्वामी।
# @param _approved पता जिसे हम स्वीकृत कर रहे हैं।
# @param _tokenId NFT जिसे हम स्वीकृत कर रहे हैं।
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

एक ERC-721 अनुमोदन एक ERC-20 भत्ते के समान है। एक विशिष्ट पते को एक विशिष्ट टोकन स्थानांतरित करने की अनुमति है। यह अनुबंधों को टोकन स्वीकार करने पर प्रतिक्रिया देने के लिए एक तंत्र देता है। अनुबंध इवेंट्स को नहीं सुन सकते हैं, इसलिए यदि आप केवल टोकन को उनके पास स्थानांतरित करते हैं तो वे इसके बारे में "नहीं जानते" हैं। इस तरह मालिक पहले एक अनुमोदन प्रस्तुत करता है और फिर अनुबंध को एक अनुरोध भेजता है: "मैंने आपको टोकन X को स्थानांतरित करने के लिए अनुमोदित किया है, कृपया करें ..."।

यह ERC-721 मानक को ERC-20 मानक के समान बनाने के लिए एक डिज़ाइन विकल्प है। क्योंकि ERC-721 टोकन फंजिबल नहीं हैं, एक अनुबंध यह भी पहचान सकता है कि उसे टोकन के स्वामित्व को देखकर एक विशिष्ट टोकन मिला है।

```python
# @dev यह तब उत्सर्जित होता है जब किसी मालिक के लिए एक ऑपरेटर सक्षम या अक्षम होता है। ऑपरेटर मालिक के सभी NFTs का प्रबंधन कर सकता है।
# @param _owner NFT का स्वामी।
# @param _operator पता जिस पर हम ऑपरेटर अधिकार सेट कर रहे हैं।
# @param _approved ऑपरेटर अधिकारों की स्थिति (सही यदि ऑपरेटर अधिकार दिए गए हैं और गलत यदि रद्द कर दिए गए हैं)।
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

कभी-कभी एक _ऑपरेटर_ होना उपयोगी होता है जो एक विशिष्ट प्रकार के खाते के सभी टोकन (वे जो एक विशिष्ट अनुबंध द्वारा प्रबंधित होते हैं) का प्रबंधन कर सकता है, जो एक पावर ऑफ अटॉर्नी के समान है। उदाहरण के लिए, मैं एक अनुबंध को ऐसी शक्ति देना चाह सकता हूं जो यह जांचता है कि मैंने छह महीने से इससे संपर्क नहीं किया है, और यदि ऐसा है तो मेरी संपत्ति को मेरे उत्तराधिकारियों में वितरित कर देता है (यदि उनमें से कोई इसके लिए पूछता है, तो अनुबंध बिना लेनदेन के बुलाए कुछ नहीं कर सकते)। ERC-20 में हम बस एक विरासत अनुबंध को एक उच्च भत्ता दे सकते हैं, लेकिन यह ERC-721 के लिए काम नहीं करता है क्योंकि टोकन फंजिबल नहीं हैं। यह समतुल्य है।

`approved` मान हमें बताता है कि क्या इवेंट एक अनुमोदन के लिए है, या एक अनुमोदन की वापसी के लिए है।

### स्टेट चर {#state-vars}

इन चरों में टोकन की वर्तमान स्थिति होती है: कौन से उपलब्ध हैं और उनके मालिक कौन हैं। इनमें से अधिकांश `HashMap` ऑब्जेक्ट हैं, [दो प्रकारों के बीच मौजूद एकदिशीय मैपिंग](https://vyper.readthedocs.io/en/latest/types.html#mappings)।

```python
# @dev NFT आईडी से उस पते पर मैपिंग जो इसका मालिक है।
idToOwner: HashMap[uint256, address]

# @dev NFT आईडी से स्वीकृत पते पर मैपिंग।
idToApprovals: HashMap[uint256, address]
```

Ethereum में उपयोगकर्ता और अनुबंध पहचान 160-बिट पतों द्वारा दर्शाई जाती हैं। ये दो चर टोकन आईडी से उनके मालिकों और उन्हें स्थानांतरित करने के लिए स्वीकृत लोगों (प्रत्येक के लिए अधिकतम एक) के लिए मैप करते हैं। Ethereum में, अनइनिशियलाइज़्ड डेटा हमेशा शून्य होता है, इसलिए यदि कोई मालिक या स्वीकृत ट्रांसफरर नहीं है तो उस टोकन का मान शून्य होता है।

```python
# @dev मालिक के पते से उसके टोकन की गिनती तक मैपिंग।
ownerToNFTokenCount: HashMap[address, uint256]
```

यह चर प्रत्येक मालिक के लिए टोकन की गिनती रखता है। मालिकों से टोकन तक कोई मैपिंग नहीं है, इसलिए एक विशिष्ट मालिक के स्वामित्व वाले टोकन की पहचान करने का एकमात्र तरीका ब्लॉकचेन के इवेंट इतिहास में वापस देखना और उपयुक्त `Transfer` इवेंट्स को देखना है। हम यह जानने के लिए इस चर का उपयोग कर सकते हैं कि हमारे पास सभी NFTs कब हैं और हमें समय में और भी आगे देखने की आवश्यकता नहीं है।

ध्यान दें कि यह एल्गोरिथम केवल उपयोगकर्ता इंटरफेस और बाहरी सर्वर के लिए काम करता है। ब्लॉकचेन पर चल रहा कोड स्वयं पिछले इवेंट्स को नहीं पढ़ सकता है।

```python
# @dev मालिक के पते से ऑपरेटर पतों की मैपिंग तक मैपिंग।
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

एक खाते में एक से अधिक ऑपरेटर हो सकते हैं। एक साधारण `HashMap` उनका ट्रैक रखने के लिए अपर्याप्त है, क्योंकि प्रत्येक कुंजी एक ही मान की ओर ले जाती है। इसके बजाय, आप मान के रूप में `HashMap[address, bool]` का उपयोग कर सकते हैं। डिफ़ॉल्ट रूप से प्रत्येक पते के लिए मान `False` है, जिसका अर्थ है कि यह एक ऑपरेटर नहीं है। आप आवश्यकतानुसार मान `True` पर सेट कर सकते हैं।

```python
# @dev मिंटर का पता, जो एक टोकन मिंट कर सकता है
minter: address
```

नए टोकन किसी तरह बनाने होंगे। इस अनुबंध में एक ही इकाई है जिसे ऐसा करने की अनुमति है, `minter`। उदाहरण के लिए, यह एक खेल के लिए पर्याप्त होने की संभावना है। अन्य उद्देश्यों के लिए, एक अधिक जटिल व्यावसायिक तर्क बनाना आवश्यक हो सकता है।

```python
# @dev इंटरफ़ेस आईडी से बूल तक मैपिंग कि यह समर्थित है या नहीं
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 का ERC165 इंटरफ़ेस आईडी
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721 का ERC165 इंटरफ़ेस आईडी
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) एक अनुबंध के लिए यह खुलासा करने के लिए एक तंत्र निर्दिष्ट करता है कि एप्लिकेशन इसके साथ कैसे संवाद कर सकते हैं, यह किन ERCs के अनुरूप है। इस मामले में, अनुबंध ERC-165 और ERC-721 के अनुरूप है।

### फ़ंक्शन {#functions}

ये वे फ़ंक्शन हैं जो वास्तव में ERC-721 को लागू करते हैं।

#### कंस्ट्रक्टर {#constructor}

```python
@external
def __init__():
```

Vyper में, Python की तरह, कंस्ट्रक्टर फ़ंक्शन को `__init__` कहा जाता है।

```python
    """
    @dev अनुबंध कंस्ट्रक्टर।
    """
```

Python में, और Vyper में, आप एक बहु-पंक्ति स्ट्रिंग (`"""` से शुरू और समाप्त होती है) निर्दिष्ट करके और इसे किसी भी तरह से उपयोग न करके भी एक टिप्पणी बना सकते हैं। इन टिप्पणियों में [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) भी शामिल हो सकता है।

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

स्टेट चर तक पहुँचने के लिए आप `self.<variable name>` (फिर से, Python की तरह ही) का उपयोग करते हैं।

#### फ़ंक्शन देखें {#views}

ये ऐसे फ़ंक्शन हैं जो ब्लॉकचेन की स्थिति को संशोधित नहीं करते हैं, और इसलिए यदि उन्हें बाहरी रूप से बुलाया जाता है तो उन्हें मुफ्त में निष्पादित किया जा सकता है। यदि व्यू फ़ंक्शंस को एक अनुबंध द्वारा बुलाया जाता है तो उन्हें अभी भी हर नोड पर निष्पादित किया जाना है और इसलिए गैस की लागत होती है।

```python
@view
@external
```

एक फ़ंक्शन परिभाषा से पहले ये कीवर्ड जो एक एट साइन (`@`) से शुरू होते हैं, उन्हें _डेकोरेशन_ कहा जाता है। वे उन परिस्थितियों को निर्दिष्ट करते हैं जिनमें एक फ़ंक्शन को बुलाया जा सकता है।

- `@view` निर्दिष्ट करता है कि यह फ़ंक्शन एक व्यू है।
- `@external` निर्दिष्ट करता है कि इस विशेष फ़ंक्शन को लेनदेन और अन्य अनुबंधों द्वारा बुलाया जा सकता है।

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Python के विपरीत, Vyper एक [स्टेटिक टाइप्ड भाषा](https://wikipedia.org/wiki/Type_system#Static_type_checking) है।
आप [डेटा प्रकार](https://vyper.readthedocs.io/en/latest/types.html) की पहचान किए बिना किसी चर, या किसी फ़ंक्शन पैरामीटर की घोषणा नहीं कर सकते। इस मामले में इनपुट पैरामीटर `bytes32` है, जो 256-बिट मान है ([Ethereum Virtual Machine](/developers/docs/evm/) का मूल शब्द आकार 256 बिट्स है)। आउटपुट एक बूलियन मान है। परंपरा के अनुसार, फ़ंक्शन पैरामीटर के नाम एक अंडरस्कोर (`_`) से शुरू होते हैं।

```python
    """
    @dev इंटरफ़ेस पहचान ERC-165 में निर्दिष्ट है।
    @param _interfaceID इंटरफ़ेस का आईडी
    """
    return self.supportedInterfaces[_interfaceID]
```

`self.supportedInterfaces` HashMap से मान लौटाएं, जो कंस्ट्रक्टर (`__init__`) में सेट है।

```python
### VIEW FUNCTIONS ###
```

ये व्यू फ़ंक्शंस हैं जो उपयोगकर्ताओं और अन्य अनुबंधों के लिए टोकन के बारे में जानकारी उपलब्ध कराते हैं।

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner` के स्वामित्व वाले NFTs की संख्या लौटाता है।
         यदि `_owner` शून्य पता है तो फेंकता है। शून्य पते को सौंपे गए NFTs को अमान्य माना जाता है।
    @param _owner पता जिसके लिए शेष राशि की क्वेरी करनी है।
    """
```

यह लाइन [जोर देती है](https://vyper.readthedocs.io/en/latest/statements.html#assert) कि `_owner` शून्य नहीं है। यदि ऐसा है, तो एक त्रुटि है और ऑपरेशन वापस कर दिया जाता है।

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFT के मालिक का पता लौटाता है।
         यदि `_tokenId` एक वैध NFT नहीं है तो फेंकता है।
    @param _tokenId एक NFT के लिए पहचानकर्ता।
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    return owner
```

एथेरियम वर्चुअल मशीन (evm) में कोई भी भंडारण जिसमें कोई मान संग्रहीत नहीं है, शून्य है।
यदि `_tokenId` पर कोई टोकन नहीं है तो `self.idToOwner[_tokenId]` का मान शून्य है। उस स्थिति में फ़ंक्शन वापस आ जाता है।

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev एक एकल NFT के लिए स्वीकृत पता प्राप्त करें।
         यदि `_tokenId` एक वैध NFT नहीं है तो फेंकता है।
    @param _tokenId NFT की आईडी जिसकी स्वीकृति की क्वेरी करनी है।
    """
    # Throws if `_tokenId` is not a valid NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

ध्यान दें कि `getApproved` शून्य _वापस_ कर सकता है। यदि टोकन वैध है तो यह `self.idToApprovals[_tokenId]` लौटाता है।
यदि कोई अनुमोदक नहीं है तो वह मान शून्य है।

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev जांचता है कि `_operator` `_owner` के लिए एक स्वीकृत ऑपरेटर है या नहीं।
    @param _owner वह पता जो NFTs का मालिक है।
    @param _operator वह पता जो मालिक की ओर से कार्य करता है।
    """
    return (self.ownerToOperators[_owner])[_operator]
```

यह फ़ंक्शन जांचता है कि क्या `_operator` को इस अनुबंध में `_owner` के सभी टोकन प्रबंधित करने की अनुमति है।
क्योंकि कई ऑपरेटर हो सकते हैं, यह एक दो-स्तरीय HashMap है।

#### सहायक फ़ंक्शन स्थानांतरित करें {#transfer-helpers}

ये फ़ंक्शन उन परिचालनों को लागू करते हैं जो टोकन को स्थानांतरित करने या प्रबंधित करने का हिस्सा हैं।

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

यह सजावट, `@internal`, का अर्थ है कि फ़ंक्शन केवल उसी अनुबंध के भीतर अन्य फ़ंक्शन से ही सुलभ है। परंपरा के अनुसार, इन फ़ंक्शन नामों की शुरुआत भी एक अंडरस्कोर (`_`) से होती है।

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev लौटाता है कि दिया गया खर्च करने वाला किसी दिए गए टोकन आईडी को स्थानांतरित कर सकता है या नहीं
    @param spender क्वेरी करने के लिए खर्च करने वाले का पता
    @param tokenId स्थानांतरित किए जाने वाले टोकन की uint256 आईडी
    @return bool कि msg.sender दिए गए टोकन आईडी के लिए स्वीकृत है या नहीं,
        मालिक का एक ऑपरेटर है, या टोकन का मालिक है
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

किसी पते को टोकन स्थानांतरित करने की अनुमति देने के तीन तरीके हैं:

1. पता टोकन का मालिक है
2. पता उस टोकन को खर्च करने के लिए स्वीकृत है
3. पता टोकन के मालिक के लिए एक ऑपरेटर है

ऊपर दिया गया फ़ंक्शन एक व्यू हो सकता है क्योंकि यह स्थिति को नहीं बदलता है। परिचालन लागत को कम करने के लिए, कोई भी फ़ंक्शन जो _एक_ व्यू हो सकता है, _उसे_ एक व्यू _होना_ चाहिए।

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev दिए गए पते पर एक NFT जोड़ें
         यदि `_tokenId` किसी के स्वामित्व में है तो फेंकता है।
    """
    # Throws if `_tokenId` is owned by someone
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev दिए गए पते से एक NFT हटाएं
         यदि `_from` वर्तमान स्वामी नहीं है तो फेंकता है।
    """
    # Throws if `_from` is not the current owner
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

जब स्थानांतरण में कोई समस्या होती है तो हम कॉल को वापस कर देते हैं।

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev दिए गए पते की स्वीकृति साफ़ करें
         यदि `_owner` वर्तमान स्वामी नहीं है तो फेंकता है।
    """
    # Throws if `_owner` is not the current owner
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

केवल आवश्यक होने पर मान बदलें। स्टेट चर भंडारण में रहते हैं। भंडारण में लिखना EVM (Ethereum Virtual Machine) द्वारा किए जाने वाले सबसे महंगे परिचालनों में से एक है ([गैस](/developers/docs/gas/) के संदर्भ में)। इसलिए, इसे कम से कम करना एक अच्छा विचार है, यहां तक कि मौजूदा मूल्य लिखने की भी उच्च लागत होती है।

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFT का स्थानांतरण निष्पादित करें।
         जब तक `msg.sender` वर्तमान स्वामी, एक अधिकृत ऑपरेटर, या इस NFT के लिए स्वीकृत पता न हो, तब तक फेंकता है। (नोट: निजी फ़ंक्शन में `msg.sender` की अनुमति नहीं है इसलिए `_sender` पास करें।)
         यदि `_to` शून्य पता है तो फेंकता है।
         यदि `_from` वर्तमान स्वामी नहीं है तो फेंकता है।
         यदि `_tokenId` एक वैध NFT नहीं है तो फेंकता है।
    """
```

हमारे पास यह आंतरिक फ़ंक्शन है क्योंकि टोकन स्थानांतरित करने के दो तरीके हैं (नियमित और सुरक्षित), लेकिन हम चाहते हैं कि कोड में केवल एक ही स्थान हो जहां हम इसे ऑडिटिंग को आसान बनाने के लिए करते हैं।

```python
    # Check requirements
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer
    log Transfer(_from, _to, _tokenId)
```

Vyper में एक इवेंट उत्सर्जित करने के लिए आप एक `log` स्टेटमेंट का उपयोग करते हैं ([अधिक जानकारी के लिए यहां देखें](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging))।

#### स्थानांतरण फ़ंक्शन {#transfer-funs}

```python

### TRANSFER FUNCTIONS ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev जब तक `msg.sender` वर्तमान स्वामी, एक अधिकृत ऑपरेटर, या इस NFT के लिए स्वीकृत पता न हो, तब तक फेंकता है।
         यदि `_from` वर्तमान स्वामी नहीं है तो फेंकता है।
         यदि `_to` शून्य पता है तो फेंकता है।
         यदि `_tokenId` एक वैध NFT नहीं है तो फेंकता है।
    @notice कॉलर यह पुष्टि करने के लिए ज़िम्मेदार है कि `_to` NFTs प्राप्त करने में सक्षम है अन्यथा वे स्थायी रूप से खो सकते हैं।
    @param _from NFT का वर्तमान स्वामी।
    @param _to नया स्वामी।
    @param _tokenId स्थानांतरित करने के लिए NFT।
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

यह फ़ंक्शन आपको एक मनमाने पते पर स्थानांतरित करने देता है। जब तक पता एक उपयोगकर्ता, या एक अनुबंध नहीं है जो टोकन स्थानांतरित करना जानता है, आपके द्वारा स्थानांतरित किया गया कोई भी टोकन उस पते में फंस जाएगा और बेकार हो जाएगा।

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev एक NFT के स्वामित्व को एक पते से दूसरे पते पर स्थानांतरित करता है।
         जब तक `msg.sender` वर्तमान स्वामी, एक अधिकृत ऑपरेटर, या इस NFT के लिए स्वीकृत पता न हो, तब तक फेंकता है।
         यदि `_from` वर्तमान स्वामी नहीं है तो फेंकता है।
         यदि `_to` शून्य पता है तो फेंकता है।
         यदि `_tokenId` एक वैध NFT नहीं है तो फेंकता है।
         यदि `_to` एक स्मार्ट अनुबंध है, तो यह `_to` पर `onERC721Received` को कॉल करता है और यदि वापसी मान `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` नहीं है तो फेंकता है।
         नोट: bytes4 को पैडिंग के साथ bytes32 द्वारा दर्शाया गया है
    @param _from NFT का वर्तमान स्वामी।
    @param _to नया स्वामी।
    @param _tokenId स्थानांतरित करने के लिए NFT।
    @param _data बिना किसी निर्दिष्ट प्रारूप के अतिरिक्त डेटा, `_to` पर कॉल में भेजा गया।
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

पहले स्थानांतरण करना ठीक है क्योंकि यदि कोई समस्या होती है तो हम वैसे भी वापस आ जाएंगे, इसलिए कॉल में किया गया सब कुछ रद्द कर दिया जाएगा।

```python
    if _to.is_contract: # check if `_to` is a contract address
```

पहले जांच लें कि पता एक अनुबंध है या नहीं (यदि इसमें कोड है)। यदि नहीं, तो मान लें कि यह एक उपयोगकर्ता पता है और उपयोगकर्ता टोकन का उपयोग करने या इसे स्थानांतरित करने में सक्षम होगा। लेकिन इसे आपको सुरक्षा की झूठी भावना में नहीं आने देना चाहिए। आप `safeTransferFrom` के साथ भी टोकन खो सकते हैं, यदि आप उन्हें ऐसे पते पर स्थानांतरित करते हैं जिसके लिए किसी को निजी कुंजी नहीं पता है।

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

यह देखने के लिए लक्ष्य अनुबंध को कॉल करें कि क्या यह ERC-721 टोकन प्राप्त कर सकता है।

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

यदि गंतव्य एक अनुबंध है, लेकिन एक ऐसा है जो ERC-721 टोकन स्वीकार नहीं करता है (या जिसने इस विशेष स्थानांतरण को स्वीकार नहीं करने का निर्णय लिया है), तो वापस आ जाएं।

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev किसी NFT के लिए स्वीकृत पता सेट करें या उसकी पुष्टि करें। शून्य पता इंगित करता है कि कोई स्वीकृत पता नहीं है।
         जब तक `msg.sender` वर्तमान NFT स्वामी, या वर्तमान स्वामी का अधिकृत ऑपरेटर न हो, तब तक फेंकता है।
         यदि `_tokenId` एक वैध NFT नहीं है तो फेंकता है। (नोट: यह EIP में नहीं लिखा गया है)
         यदि `_approved` वर्तमान स्वामी है तो फेंकता है। (नोट: यह EIP में नहीं लिखा गया है)
    @param _approved दिए गए NFT आईडी के लिए स्वीकृत किए जाने वाला पता।
    @param _tokenId स्वीकृत किए जाने वाले टोकन की आईडी।
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
```

परंपरा के अनुसार यदि आप एक अनुमोदक नहीं चाहते हैं तो आप शून्य पते को नियुक्त करते हैं, न कि स्वयं को।

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

अनुमोदन सेट करने के लिए आप या तो मालिक हो सकते हैं, या मालिक द्वारा अधिकृत ऑपरेटर हो सकते हैं।

```python
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev किसी तीसरे पक्ष ("ऑपरेटर") के लिए `msg.sender` की सभी संपत्तियों का प्रबंधन करने के लिए अनुमोदन को सक्षम या अक्षम करता है। यह ApprovalForAll इवेंट भी उत्सर्जित करता है।
         यदि `_operator` `msg.sender` है तो फेंकता है। (नोट: यह EIP में नहीं लिखा गया है)
    @notice यह तब भी काम करता है जब प्रेषक के पास उस समय कोई टोकन न हो।
    @param _operator अधिकृत ऑपरेटरों के सेट में जोड़ने के लिए पता।
    @param _approved यदि ऑपरेटर स्वीकृत है तो सही, अनुमोदन रद्द करने के लिए गलत।
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### नए टोकन मिंट करें और मौजूदा को नष्ट करें {#mint-burn}

जिस खाते ने अनुबंध बनाया है, वह `minter` है, जो नए NFTs को मिंट करने के लिए अधिकृत सुपर उपयोगकर्ता है। हालांकि, इसे मौजूदा टोकन को बर्न करने की भी अनुमति नहीं है। केवल मालिक, या मालिक द्वारा अधिकृत इकाई ही ऐसा कर सकती है।

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

यह फ़ंक्शन हमेशा `True` लौटाता है, क्योंकि यदि ऑपरेशन विफल हो जाता है तो इसे वापस कर दिया जाता है।

```python
    """
    @dev टोकन मिंट करने के लिए फ़ंक्शन
         यदि `msg.sender` मिंटर नहीं है तो फेंकता है।
         यदि `_to` शून्य पता है तो फेंकता है।
         यदि `_tokenId` किसी के स्वामित्व में है तो फेंकता है।
    @param _to वह पता जो मिंट किए गए टोकन प्राप्त करेगा।
    @param _tokenId मिंट करने के लिए टोकन आईडी।
    @return एक बूलियन जो इंगित करता है कि ऑपरेशन सफल था या नहीं।
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
```

केवल मिंटर (वह खाता जिसने ERC-721 अनुबंध बनाया है) ही नए टोकन मिंट कर सकता है। यह भविष्य में एक समस्या हो सकती है यदि हम मिंटर की पहचान बदलना चाहते हैं। एक उत्पादन अनुबंध में आप शायद एक ऐसा फ़ंक्शन चाहेंगे जो मिंटर को मिंटर विशेषाधिकार किसी और को स्थानांतरित करने की अनुमति दे।

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

परंपरा के अनुसार, नए टोकन का मिंटिंग शून्य पते से स्थानांतरण के रूप में गिना जाता है।

```python

@external
def burn(_tokenId: uint256):
    """
    @dev एक विशिष्ट ERC721 टोकन को बर्न करता है।
         जब तक `msg.sender` वर्तमान स्वामी, एक अधिकृत ऑपरेटर, या इस NFT के लिए स्वीकृत पता न हो, तब तक फेंकता है।
         यदि `_tokenId` एक वैध NFT नहीं है तो फेंकता है।
    @param _tokenId uint256 बर्न किए जाने वाले ERC721 टोकन की आईडी।
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

कोई भी जिसे टोकन स्थानांतरित करने की अनुमति है, उसे इसे बर्न करने की अनुमति है। जबकि एक बर्न शून्य पते पर स्थानांतरण के बराबर दिखाई देता है, शून्य पता वास्तव में टोकन प्राप्त नहीं करता है। यह हमें टोकन के लिए उपयोग किए गए सभी भंडारण को मुक्त करने की अनुमति देता है, जो लेनदेन की गैस लागत को कम कर सकता है।

## इस अनुबंध का उपयोग करना {#using-contract}

Solidity के विपरीत, Vyper में वंशानुक्रम नहीं है। यह कोड को स्पष्ट बनाने और इसलिए सुरक्षित करने के लिए एक जानबूझकर डिजाइन विकल्प है। तो अपना खुद का Vyper ERC-721 अनुबंध बनाने के लिए आप [यह अनुबंध](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) लेते हैं और इसे उस व्यावसायिक तर्क को लागू करने के लिए संशोधित करते हैं जो आप चाहते हैं।

## निष्कर्ष {#conclusion}

समीक्षा के लिए, इस अनुबंध के कुछ सबसे महत्वपूर्ण विचार यहां दिए गए हैं:

- एक सुरक्षित स्थानांतरण के साथ ERC-721 टोकन प्राप्त करने के लिए, अनुबंधों को `ERC721Receiver` इंटरफ़ेस लागू करना होगा।
- भले ही आप सुरक्षित स्थानांतरण का उपयोग करें, टोकन अभी भी फंस सकते हैं यदि आप उन्हें ऐसे पते पर भेजते हैं जिसकी निजी कुंजी अज्ञात है।
- जब किसी ऑपरेशन में कोई समस्या होती है तो केवल एक विफलता मान वापस करने के बजाय कॉल को `revert` करना एक अच्छा विचार है।
- ERC-721 टोकन तब मौजूद होते हैं जब उनका कोई मालिक होता है।
- एक NFT स्थानांतरित करने के लिए अधिकृत होने के तीन तरीके हैं। आप मालिक हो सकते हैं, एक विशिष्ट टोकन के लिए अनुमोदित हो सकते हैं, या मालिक के सभी टोकन के लिए एक ऑपरेटर हो सकते हैं।
- पिछले इवेंट्स केवल ब्लॉकचेन के बाहर दिखाई देते हैं। ब्लॉकचेन के अंदर चलने वाला कोड उन्हें देख नहीं सकता है।

अब जाओ और सुरक्षित Vyper अनुबंध लागू करो।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।

