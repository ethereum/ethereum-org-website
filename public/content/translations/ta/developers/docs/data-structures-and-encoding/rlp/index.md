---
title: தொடர்-நீள முன்னொட்டு (RLP) வரிசைப்படுத்தல்
description: எத்தேரியத்தின் செயலாக்க அடுக்கில் உள்ள rlp குறியாக்கத்தின் வரையறை.
lang: ta
sidebarDepth: 2
---

Ethereum இன் execution clients-ல் Recursive Length Prefix (RLP) serialization பரவலாகப் பயன்படுத்தப்படுகிறது. RLP என்பது nodes இடையே தரவை இட சேமிப்பு திறனுடன் (space-efficient) பரிமாறுவதற்கான standardized (ஒரே மாதிரியான) வடிவத்தை வழங்குகிறது. RLP-ன் நோக்கம்: 任 arbitrarily nested arrays of binary data-ஐ encode செய்வது. Ethereum execution layer-இல் objects-ஐ serialize செய்வதற்கான primary encoding method-ஆக RLP பயன்படுத்தப்படுகிறது. RLP-இன் முக்கிய நோக்கம் கட்டமைப்பை குறியாக்கம் செய்வதாகும்; நேர்மறை முழு எண்களைத் தவிர, RLP குறிப்பிட்ட தரவு வகைகளை (எ.கா., சரங்கள், மிதவைகள்) குறியாக்கம் செய்வதை உயர்-வரிசை நெறிமுறைகளுக்கு ஒப்படைக்கிறது. Positive integers → big-endian binary வடிவில் முன்னணி zero இன்றி காட்டப்பட வேண்டும் (அதாவது integer value 0 = காலியான byte array). முன்னணி zero கொண்ட integers-ஐ எந்த மேல் நிலை protocol-னும் invalid (செல்லாதது) எனக் கருத வேண்டும்.

மேலும் தகவலுக்கு [எத்தேரியம் மஞ்சள் தாள் (பின் இணைப்பு B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19) பார்க்கவும்.

RLP-யில் dictionary-ஐ encode செய்ய இரண்டு canonical (பொதுவான) முறைகள் பரிந்துரைக்கப்படுகின்றன:

- விசைகளை அகராதி வரிசையில் `[[k1,v1],[k2,v2]...]` கொண்டு பயன்படுத்தவும்
- ethereum பயன்படுத்தும் Patricia Tree encoding-ஐ பயன்படுத்தலாம்

## வரையறை {#definition}

RLP encoding function-க்கு input-ஆக ஒரு item கொடுக்கப்படும். Item என வரையறுக்கப்படுவது:

- ஒரு சரம் (அதாவது, பைட் வரிசை) ஒரு உருப்படி ஆகும்
- ஒரு list of items
- ஒரு positive integer

எடுத்துக்காட்டுகள் (items):

- ஒரு காலி string "";
- "cat" என்ற string;
- ஒரு list, அதில் எந்த எண்ணிக்கையிலான strings இருந்தாலும்;
- மற்றும் `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]` போன்ற மிகவும் சிக்கலான தரவு கட்டமைப்புகள்.
- `100` என்ற எண்

இங்கு "string" என்றால் “binary data கொண்ட byte-கள்” என்று பொருள்.
எந்தவொரு content encoding-மும் பயன்படுத்தப்படாது.
non-minimal positive integers பயன்படுத்தக்கூடாது என்பதே ஒரே விதி.

RLP encoding விதிகள்:

- Positive integer → அதை big-endian byte array ஆக மாற்றி, string encode செய்யும் விதிகளைக் கொண்டு encode செய்ய வேண்டும்.
- `[0x00, 0x7f]` (தசம `[0, 127]`) வரம்பில் மதிப்புள்ள ஒற்றை பைட்டிற்கு, அந்த பைட் அதன் சொந்த RLP குறியாக்கமாகும்.
- இல்லையெனில், ஒரு சரம் 0-55 பைட்டுகள் நீளமாக இருந்தால், RLP குறியாக்கமானது **0x80** (dec. 128) மதிப்புடன் ஒரு ஒற்றை பைட்டையும், அதைத் தொடர்ந்து சரத்தின் நீளம் மற்றும் சரத்தையும் கொண்டிருக்கும். எனவே முதல் பைட்டின் வரம்பு `[0x80, 0xb7]` (dec. `[128, 183]`) ஆகும்.
- ஒரு சரம் 55 பைட்டுகளுக்கு மேல் நீளமாக இருந்தால், RLP குறியாக்கமானது **0xb7** (dec. 183) மதிப்புள்ள ஒரு ஒற்றை பைட்டையும், அதைத் தொடர்ந்து பைனரி வடிவத்தில் உள்ள சரத்தின் நீளத்தின் பைட் நீளத்தையும், பின்னர் சரத்தின் நீளத்தையும், பின்னர் சரத்தையும் கொண்டிருக்கும். உதாரணமாக, 1024 பைட் நீளமுள்ள ஒரு சரம் `\xb9\x04\x00` (dec. `185, 4, 0`) என குறியாக்கம் செய்யப்படும், அதைத் தொடர்ந்து சரம் வரும். இங்கே, முதல் பைட்டாக `0xb9` (183 + 2 = 185), அதைத் தொடர்ந்து உண்மையான சரத்தின் நீளத்தைக் குறிக்கும் `0x0400` (dec. 1024) என்ற 2 பைட்டுகள் வரும். எனவே முதல் பைட்டின் வரம்பு `[0xb8, 0xbf]` (dec. `[184, 191]`) ஆகும்.
- ஒரு string 2^64 bytes நீளமோ அல்லது அதற்கு அதிகமோ இருந்தால், அது encode செய்ய முடியாது.
- ஒரு பட்டியலின் மொத்த பேலோட் (அதாவது, அதன் RLP குறியாக்கம் செய்யப்பட்ட அனைத்து உருப்படிகளின் ஒருங்கிணைந்த நீளம்) 0-55 பைட்டுகள் நீளமாக இருந்தால், RLP குறியாக்கமானது **0xc0** மதிப்புடன் ஒரு ஒற்றை பைட்டையும், அதைத் தொடர்ந்து பேலோடின் நீளத்தையும், அதைத் தொடர்ந்து உருப்படிகளின் RLP குறியாக்கங்களின் இணைப்பையும் கொண்டிருக்கும். எனவே முதல் பைட்டின் வரம்பு `[0xc0, 0xf7]` (dec. `[192, 247]`) ஆகும்.
- ஒரு பட்டியலின் மொத்த பேலோட் 55 பைட்டுகளுக்கு மேல் நீளமாக இருந்தால், RLP குறியாக்கமானது **0xf7** மதிப்புள்ள ஒரு ஒற்றை பைட்டையும், பைனரி வடிவத்தில் உள்ள பேலோடின் நீளத்தின் பைட் நீளத்தையும், பின்னர் பேலோடின் நீளத்தையும், பின்னர் உருப்படிகளின் RLP குறியாக்கங்களின் இணைப்பையும் கொண்டிருக்கும். எனவே முதல் பைட்டின் வரம்பு `[0xf8, 0xff]` (dec. `[248, 255]`) ஆகும்.

Code-ல், இது:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## எடுத்துக்காட்டுகள் {#examples}

- the string "dog" = [ 0x83, 'd', 'o', 'g' ]
- பட்டியல் [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- வெற்றுச் சரம் ('null') = `[ 0x80 ]`
- வெற்றுப் பட்டியல் = `[ 0xc0 ]`
- முழு எண் 0 = `[ 0x80 ]`
- பைட் '\\x00' = `[ 0x00 ]`
- பைட் '\\x0f' = `[ 0x0f ]`
- பைட்டுகள் '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- மூன்றின் [கணக் கோட்பாட்டு பிரதிநிதித்துவம்](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers), `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- சரம் "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` `, 'e', 'l', 'i', 't' ]`

## RLP குறிவிலக்கல் {#rlp-decoding}

RLP encoding-ன் விதிமுறைகள் மற்றும் செயல்முறைகளின்படி, RLP decode-க்கு வழங்கப்படும் input என்பது ஒரு binary data array ஆகக் கருதப்படுகிறது. RLP decoding செயல்முறை பின்வருமாறு:

1. உள்ளீட்டுத் தரவின் முதல் பைட்டின் (அதாவது, முன்னொட்டு) படி தரவு வகை, உண்மையான தரவின் நீளம் மற்றும் ஆஃப்செட் ஆகியவற்றைக் குறிவிலக்குதல்;

2. data type மற்றும் offset-ஐப் பொறுத்து, positive integers-க்கு minimal encoding விதியை மதித்து, data-ஐ decode செய்தல்;

3. input-ன் மீதமுள்ள பகுதியை தொடர்ந்து decode செய்தல்;

இதில், data type-களை decode செய்வதற்கான விதிமுறைகள் மற்றும் offset பின்வருமாறு:

1. முதல் பைட்டின் (அதாவது, முன்னொட்டு) வரம்பு [0x00, 0x7f] என இருந்தால், தரவு ஒரு சரமாகும், மேலும் அந்தச் சரமே முதல் பைட் ஆகும்;

2. முதல் byte-ன் range [0x80, 0xb7] ஆக இருந்தால், அந்த data ஒரு string, அதன் length = முதல் byte - 0x80, மேலும் அந்த string முதல் byte-க்கு பின் வரும்;

3. முதல் byte-ன் range [0xb8, 0xbf] ஆக இருந்தால், அந்த data ஒரு string, அதன் length (bytes-ல்) = முதல் byte - 0xb7, length-ன் பின்னர் அந்த string வரும்;

4. முதல் byte-ன் range [0xc0, 0xf7] ஆக இருந்தால், அந்த data ஒரு list, அதன் மொத்த payload = முதல் byte - 0xc0, மேலும் அந்த list-ன் அனைத்து items-ன் RLP encodings-ஐ இணைத்தது முதல் byte-க்கு பின் வரும்;

5. முதல் byte-ன் range [0xf8, 0xff] ஆக இருந்தால், அந்த data ஒரு list, அதன் மொத்த payload length = முதல் byte - 0xf7, அதன் பின்னர் அந்த payload வரும், மேலும் அந்த list-ன் அனைத்து items-ன் RLP encodings-ஐ இணைத்தது அந்த payload-க்கு பின் வரும்;

Code-ல், இது:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## மேலும் வாசிக்க {#further-reading}

- [எத்தேரியத்தில் RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [எத்தேரியம் அண்டர் தி ஹூட்: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). ACL2 இல் எத்தேரியத்தின் தொடர் நீள முன்னொட்டு. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
