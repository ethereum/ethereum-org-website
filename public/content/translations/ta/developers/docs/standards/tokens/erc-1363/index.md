---
title: ERC-1363 செலுத்தக்கூடிய டோக்கன் தரநிலை
description: ERC-1363 என்பது ERC-20 டோக்கன்களுக்கான ஒரு நீட்டிப்பு இடைமுகமாகும், இது இடமாற்றங்களுக்குப் பிறகு பெறுநர் ஒப்பந்தத்திலோ அல்லது ஒப்புதல்களுக்குப் பிறகு செலவு செய்பவரின் ஒப்பந்தத்திலோ தனிப்பயன் தர்க்கத்தைச் செயல்படுத்துவதை ஆதரிக்கிறது, இவை அனைத்தும் ஒரே பரிவர்த்தனையில் நடக்கும்.
lang: ta
---

## அறிமுகம் {#introduction}

### ERC-1363 என்றால் என்ன? {#what-is-erc1363}

ERC-1363 என்பது ERC-20 டோக்கன்களுக்கான ஒரு நீட்டிப்பு இடைமுகமாகும், இது இடமாற்றங்களுக்குப் பிறகு பெறுநர் ஒப்பந்தத்திலோ அல்லது ஒப்புதல்களுக்குப் பிறகு செலவு செய்பவரின் ஒப்பந்தத்திலோ தனிப்பயன் தர்க்கத்தைச் செயல்படுத்துவதை ஆதரிக்கிறது, இவை அனைத்தும் ஒரே பரிவர்த்தனையில் நடக்கும்.

### ERC-20 இலிருந்து வேறுபாடுகள் {#erc20-differences}

`transfer`, `transferFrom` மற்றும் `approve` போன்ற நிலையான ERC-20 செயல்பாடுகள், தனி பரிவர்த்தனை இல்லாமல் பெறுநர் அல்லது செலவு செய்பவர் ஒப்பந்தத்தில் குறியீட்டை இயக்க அனுமதிக்காது.
இது UI மேம்பாட்டில் சிக்கலை அறிமுகப்படுத்துகிறது மற்றும் தத்தெடுப்பதில் தடையை ஏற்படுத்துகிறது. ஏனெனில் பயனர்கள் முதல் பரிவர்த்தனை செயல்படுத்தப்படும் வரை காத்திருந்து பின்னர் இரண்டாவதைச் சமர்ப்பிக்க வேண்டும்.
அவர்கள் GAS-ஐ இரண்டு முறை செலுத்த வேண்டும்.

ERC-1363 மாற்றத்தக்க டோக்கன்களை மிகவும் எளிதாகச் செயல்களைச் செய்யக்கூடியதாகவும், எந்த ஆஃப்-செயின் கேட்பவரையும் பயன்படுத்தாமல் வேலை செய்வதாகவும் ஆக்குகிறது.
இது ஒரே பரிவர்த்தனையில், ஒரு இடமாற்றம் அல்லது ஒப்புதலுக்குப் பிறகு, பெறுநர் அல்லது செலவு செய்பவர் ஒப்பந்தத்தில் ஒரு கால்பேக்கைச் செய்ய அனுமதிக்கிறது.

## முன்னேற்றக் கட்டுரை {#prerequisites}

இந்தப் பக்கத்தை நன்கு புரிந்து கொள்ள, நீங்கள் முதலில் இதைப் பற்றிப் படிக்கப் பரிந்துரைக்கிறோம்:

- [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## உள்ளடக்கம் {#body}

ERC-1363, `transfer`, `transferFrom` அல்லது `approve` க்குப் பிறகு ஸ்மார்ட் ஒப்பந்தங்களுடன் தொடர்பு கொள்ள ERC-20 டோக்கன்களுக்கான ஒரு நிலையான API-ஐ அறிமுகப்படுத்துகிறது.

இந்தத் தரநிலை டோக்கன்களை மாற்றுவதற்கான அடிப்படைச் செயல்பாடுகளை வழங்குகிறது, அத்துடன் டோக்கன்கள் மற்றொரு ஆன்-செயின் மூன்றாம் தரப்பினரால் செலவழிக்கப்படுவதற்காக அங்கீகரிக்கப்பட அனுமதிக்கிறது, பின்னர் பெறுநர் அல்லது செலவு செய்பவர் ஒப்பந்தத்தில் ஒரு கால்பேக்கைச் செய்கிறது.

ERC-20 கால்பேக்குகளை ஏற்கக்கூடிய ஸ்மார்ட் ஒப்பந்தங்களின் பல முன்மொழியப்பட்ட பயன்பாடுகள் உள்ளன.

எடுத்துக்காட்டுகள்:

- **கூட்ட விற்பனை**: அனுப்பப்பட்ட டோக்கன்கள் உடனடி வெகுமதி ஒதுக்கீட்டைத் தூண்டுகின்றன.
- **சேவைகள்**: செலுத்துதல் ஒரே படியில் சேவை அணுகலைச் செயல்படுத்துகிறது.
- **விலைப்பட்டியல்**: டோக்கன்கள் விலைப்பட்டியல்களைத் தானாகவே தீர்க்கின்றன.
- **சந்தாக்கள்**: வருடாந்திர விகிதத்தை அங்கீகரிப்பது முதல் மாத கட்டணத்திற்குள் சந்தாவைச் செயல்படுத்துகிறது.

இந்தக் காரணங்களுக்காக இது முதலில் **"Payable Token"** என்று பெயரிடப்பட்டது.

கால்பேக் நடத்தை அதன் பயன்பாட்டை மேலும் விரிவுபடுத்துகிறது, இது போன்ற தடையற்ற தொடர்புகளை செயல்படுத்துகிறது:

- **ஸ்டேக்கிங்**: மாற்றப்பட்ட டோக்கன்கள் ஒரு ஸ்டேக்கிங் ஒப்பந்தத்தில் தானியங்கிப் பூட்டுதலைத் தூண்டுகின்றன.
- **வாக்களிப்பு**: பெறப்பட்ட டோக்கன்கள் ஒரு ஆளுகை அமைப்பில் வாக்குகளைப் பதிவு செய்கின்றன.
- **ஸ்வாப்பிங்**: டோக்கன் ஒப்புதல்கள் ஒரே படியில் ஸ்வாப் தர்க்கத்தைச் செயல்படுத்துகின்றன.

ஒரு இடமாற்றம் அல்லது பெறப்பட்ட ஒப்புதலுக்குப் பிறகு ஒரு கால்பேக் செயல்படுத்தப்பட வேண்டிய அனைத்து நிகழ்வுகளிலும் குறிப்பிட்ட பயன்பாடுகளுக்கு ERC-1363 டோக்கன்களைப் பயன்படுத்தலாம்.
டோக்கன்களைக் கையாளும் பெறுநரின் திறனைச் சரிபார்ப்பதன் மூலம் ஸ்மார்ட் ஒப்பந்தங்களில் டோக்கன் இழப்பு அல்லது டோக்கன் பூட்டுதலைத் தவிர்ப்பதற்கும் ERC-1363 பயனுள்ளதாக இருக்கும்.

மற்ற ERC-20 நீட்டிப்பு முன்மொழிவுகளைப் போலல்லாமல், ERC-1363 ஆனது ERC-20 `transfer` மற்றும் `transferFrom` முறைகளை மேலெழுதாது மற்றும் ERC-20 உடன் பின்னோக்கிய இணக்கத்தன்மையைப் பேணுவதன் மூலம் செயல்படுத்தப்பட வேண்டிய இடைமுக ID-க்களை வரையறுக்கிறது.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) இலிருந்து:

### முறைகள் {#methods}

ERC-1363 தரநிலையைச் செயல்படுத்தும் ஸ்மார்ட் ஒப்பந்தங்கள், `ERC1363` இடைமுகத்தில் உள்ள அனைத்துச் செயல்பாடுகளையும், `ERC20` மற்றும் `ERC165` இடைமுகங்களையும் **கட்டாயம்** செயல்படுத்த வேண்டும்.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev `transfer` அல்லது `transferFrom` க்குப் பிறகு ஒரு பெறுநர் ஒப்பந்தத்தில் குறியீட்டைச் செயல்படுத்துவதை ஆதரிக்கும் ERC-20 டோக்கன்களுக்கான ஒரு நீட்டிப்பு இடைமுகம்
 * அல்லது `approve` க்குப் பிறகு ஒரு செலவு செய்பவர் ஒப்பந்தத்தில் குறியீடு, ஒரே பரிவர்த்தனையில்.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * குறிப்பு: இந்த இடைமுகத்திற்கான ERC-165 அடையாளங்காட்டி 0xb0202a11 ஆகும்.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev அழைப்பாளரின் கணக்கிலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்தி
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @return எறியாத வரை செயல்பாடு வெற்றி பெற்றதைக் குறிக்கும் ஒரு பூலியன் மதிப்பு.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev அழைப்பாளரின் கணக்கிலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்தி
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு, `to` க்கான அழைப்பில் அனுப்பப்பட்டது.
   * @return எறியாத வரை செயல்பாடு வெற்றி பெற்றதைக் குறிக்கும் ஒரு பூலியன் மதிப்பு.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev ஒதுக்கீட்டு பொறிமுறையைப் பயன்படுத்தி `from` இலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்தி
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param from டோக்கன்களை அனுப்ப வேண்டிய முகவரி.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @return எறியாத வரை செயல்பாடு வெற்றி பெற்றதைக் குறிக்கும் ஒரு பூலியன் மதிப்பு.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev ஒதுக்கீட்டு பொறிமுறையைப் பயன்படுத்தி `from` இலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்தி
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param from டோக்கன்களை அனுப்ப வேண்டிய முகவரி.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு, `to` க்கான அழைப்பில் அனுப்பப்பட்டது.
   * @return எறியாத வரை செயல்பாடு வெற்றி பெற்றதைக் குறிக்கும் ஒரு பூலியன் மதிப்பு.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev அழைப்பாளரின் டோக்கன்களின் மீது `spender` இன் ஒதுக்கீடாக `value` அளவு டோக்கன்களை அமைத்து
   * பின்னர் `spender` இல் `ERC1363Spender::onApprovalReceived` ஐ அழைக்கிறது.
   * @param spender நிதியைச் செலவிடும் முகவரி.
   * @param value செலவழிக்கப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @return எறியாத வரை செயல்பாடு வெற்றி பெற்றதைக் குறிக்கும் ஒரு பூலியன் மதிப்பு.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev அழைப்பாளரின் டோக்கன்களின் மீது `spender` இன் ஒதுக்கீடாக `value` அளவு டோக்கன்களை அமைத்து
   * பின்னர் `spender` இல் `ERC1363Spender::onApprovalReceived` ஐ அழைக்கிறது.
   * @param spender நிதியைச் செலவிடும் முகவரி.
   * @param value செலவழிக்கப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு, `spender` க்கான அழைப்பில் அனுப்பப்பட்டது.
   * @return எறியாத வரை செயல்பாடு வெற்றி பெற்றதைக் குறிக்கும் ஒரு பூலியன் மதிப்பு.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

`transferAndCall` அல்லது `transferFromAndCall` வழியாக ERC-1363 டோக்கன்களை ஏற்க விரும்பும் ஒரு ஸ்மார்ட் ஒப்பந்தம் **கட்டாயம்** `ERC1363Receiver` இடைமுகத்தைச் செயல்படுத்த வேண்டும்:

```solidity
/**
 * @title ERC1363Receiver
 * @dev ERC-1363 டோக்கன் ஒப்பந்தங்களிலிருந்து `transferAndCall` அல்லது `transferFromAndCall` ஐ ஆதரிக்க விரும்பும் எந்தவொரு ஒப்பந்தத்திற்கான இடைமுகம்.
 */
interface ERC1363Receiver {
  /**
   * @dev இந்த ஒப்பந்தத்திற்கு ERC-1363 டோக்கன்கள் `ERC1363::transferAndCall` அல்லது `ERC1363::transferFromAndCall` வழியாக மாற்றப்படும் போதெல்லாம்
   * `from` இலிருந்து `operator` மூலம், இந்த செயல்பாடு அழைக்கப்படுகிறது.
   *
   * குறிப்பு: இடமாற்றத்தை ஏற்க, இது திரும்ப வேண்டும்
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (அதாவது 0x88a7ca5c, அல்லது அதன் சொந்த செயல்பாட்டு தேர்வி).
   *
   * @param operator `transferAndCall` அல்லது `transferFromAndCall` செயல்பாட்டை அழைத்த முகவரி.
   * @param from டோக்கன்கள் மாற்றப்பட்ட முகவரி.
   * @param value மாற்றப்பட்ட டோக்கன்களின் அளவு.
   * @param data குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு.
   * @return இடமாற்றம் அனுமதிக்கப்பட்டால் `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` எறியாத வரை.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` வழியாக ERC-1363 டோக்கன்களை ஏற்க விரும்பும் ஒரு ஸ்மார்ட் ஒப்பந்தம் **கட்டாயம்** `ERC1363Spender` இடைமுகத்தைச் செயல்படுத்த வேண்டும்:

```solidity
/**
 * @title ERC1363Spender
 * @dev ERC-1363 டோக்கன் ஒப்பந்தங்களிலிருந்து `approveAndCall` ஐ ஆதரிக்க விரும்பும் எந்தவொரு ஒப்பந்தத்திற்கான இடைமுகம்.
 */
interface ERC1363Spender {
  /**
   * @dev ஒரு ERC-1363 டோக்கன் `owner` இந்த ஒப்பந்தத்தை `ERC1363::approveAndCall` வழியாக அங்கீகரிக்கும் போதெல்லாம்
   * தங்கள் டோக்கன்களைச் செலவழிக்க, இந்த செயல்பாடு அழைக்கப்படுகிறது.
   *
   * குறிப்பு: ஒப்புதலை ஏற்க, இது திரும்ப வேண்டும்
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (அதாவது 0x7b04a2d0, அல்லது அதன் சொந்த செயல்பாட்டு தேர்வி).
   *
   * @param owner `approveAndCall` செயல்பாட்டை அழைத்த மற்றும் முன்னர் டோக்கன்களை வைத்திருந்த முகவரி.
   * @param value செலவழிக்கப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு.
   * @return ஒப்புதல் அனுமதிக்கப்பட்டால் `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` எறியாத வரை.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## மேலும் வாசிக்க {#further-reading}

- [ERC-1363: செலுத்தக்கூடிய டோக்கன் தரநிலை](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub ரெப்போ](https://github.com/vittominacori/erc1363-payable-token)
