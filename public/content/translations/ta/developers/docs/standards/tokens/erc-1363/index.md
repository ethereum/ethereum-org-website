---
title: "ERC-1363 செலுத்தக்கூடிய டோக்கன் தரநிலை"
description: "ERC-1363 என்பது ERC-20 டோக்கன்களுக்கான நீட்டிப்பு இடைமுகமாகும், இது பரிமாற்றங்களுக்குப் பிறகு பெறுநர் ஒப்பந்தத்தில் அல்லது ஒப்புதல்களுக்குப் பிறகு செலவழிப்பவர் ஒப்பந்தத்தில் தனிப்பயன் தர்க்கத்தை செயல்படுத்துவதை ஆதரிக்கிறது, இவை அனைத்தும் ஒரே பரிவர்த்தனைக்குள்."
lang: ta
---

## அறிமுகம் {#introduction}

### ERC-1363 என்றால் என்ன? {#what-is-erc1363}

ERC-1363 என்பது ERC-20 டோக்கன்களுக்கான நீட்டிப்பு இடைமுகமாகும், இது பரிமாற்றங்களுக்குப் பிறகு பெறுநர் ஒப்பந்தத்தில் அல்லது ஒப்புதல்களுக்குப் பிறகு செலவழிப்பவர் ஒப்பந்தத்தில் தனிப்பயன் தர்க்கத்தை செயல்படுத்துவதை ஆதரிக்கிறது, இவை அனைத்தும் ஒரே பரிவர்த்தனைக்குள்.

### ERC-20 இலிருந்து வேறுபாடுகள் {#erc20-differences}

நிலையான ERC-20 செயல்பாடுகளான `transfer`, `transferFrom` மற்றும் `approve` போன்றவை, தனிப் பரிவர்த்தனை இல்லாமல் பெறுநர் அல்லது செலவழிப்பவர் ஒப்பந்தத்தில் குறியீட்டைச் செயல்படுத்த அனுமதிக்காது.
பயனர்கள் முதல் பரிவர்த்தனை செயல்படுத்தப்படும் வரை காத்திருந்து, பின்னர் இரண்டாவதைச் சமர்ப்பிக்க வேண்டும் என்பதால், இது UI மேம்பாட்டில் சிக்கலையும் தத்தெடுப்பதில் உராய்வையும் அறிமுகப்படுத்துகிறது.
அவர்கள் GAS-ஐயும் இரண்டு முறை செலுத்த வேண்டும்.

ERC-1363 ஆனது பூஞ்சையக்கூடிய (fungible) டோக்கன்களைச் செயல்களை எளிதாகச் செய்யவும், எந்தவொரு ஆஃப்-செயின் கேட்பானையும் (off-chain listener) பயன்படுத்தாமல் செயல்படவும் உதவுகிறது.
இது ஒரு பரிமாற்றம் அல்லது ஒப்புதலுக்குப் பிறகு, பெறுநர் அல்லது செலவழிப்பவர் ஒப்பந்தத்தில் ஒரே பரிவர்த்தனையில் கால்பேக் (callback) செய்ய அனுமதிக்கிறது.

## முன்நிபந்தனைகள் {#prerequisites}

இந்தப் பக்கத்தை நன்கு புரிந்துகொள்ள, முதலில் இவற்றைப் பற்றிப் படிக்கப் பரிந்துரைக்கிறோம்:

- [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## உள்ளடக்கம் {#body}

ERC-1363 ஆனது `transfer`, `transferFrom` அல்லது `approve` ஆகியவற்றுக்குப் பிறகு ஸ்மார்ட் ஒப்பந்தங்களுடன் தொடர்புகொள்வதற்கு ERC-20 டோக்கன்களுக்கான நிலையான API-ஐ அறிமுகப்படுத்துகிறது.

இந்தத் தரநிலையானது டோக்கன்களை மாற்றுவதற்கான அடிப்படைச் செயல்பாட்டை வழங்குகிறது, அத்துடன் டோக்கன்களை அங்கீகரிக்க அனுமதிக்கிறது, இதனால் அவற்றை மற்றொரு ஆன்-செயின் மூன்றாம் தரப்பினர் செலவிட முடியும், பின்னர் பெறுநர் அல்லது செலவழிப்பவர் ஒப்பந்தத்தில் கால்பேக் செய்யலாம்.

ERC-20 கால்பேக்குகளை ஏற்கக்கூடிய ஸ்மார்ட் ஒப்பந்தங்களின் பல முன்மொழியப்பட்ட பயன்பாடுகள் உள்ளன.

எடுத்துக்காட்டுகள்:

- **க்ரவுட்சேல்ஸ் (Crowdsales)**: அனுப்பப்பட்ட டோக்கன்கள் உடனடி வெகுமதி ஒதுக்கீட்டைத் தூண்டுகின்றன.
- **சேவைகள்**: கட்டணம் செலுத்துதல் ஒரே படியில் சேவை அணுகலைச் செயல்படுத்துகிறது.
- **விலைப்பட்டியல்கள் (Invoices)**: டோக்கன்கள் விலைப்பட்டியல்களைத் தானாகவே தீர்க்கின்றன.
- **சந்தாக்கள்**: வருடாந்திர விகிதத்தை அங்கீகரிப்பது முதல் மாதக் கட்டணத்திலேயே சந்தாவைச் செயல்படுத்துகிறது.

இந்தக் காரணங்களுக்காக இது முதலில் **"செலுத்தக்கூடிய டோக்கன் (Payable Token)"** என்று பெயரிடப்பட்டது.

கால்பேக் நடத்தை அதன் பயன்பாட்டை மேலும் விரிவுபடுத்துகிறது, இது போன்ற தடையற்ற தொடர்புகளைச் செயல்படுத்துகிறது:

- **ஸ்டேக்கிங் (Staking)**: மாற்றப்பட்ட டோக்கன்கள் ஸ்டேக்கிங் ஒப்பந்தத்தில் தானியங்கி பூட்டுதலைத் தூண்டுகின்றன.
- **வாக்களிப்பு**: பெறப்பட்ட டோக்கன்கள் ஆளுமை அமைப்பில் வாக்குகளைப் பதிவு செய்கின்றன.
- **பரிமாற்றம் (Swapping)**: டோக்கன் ஒப்புதல்கள் ஒரே படியில் பரிமாற்ற தர்க்கத்தைச் செயல்படுத்துகின்றன.

பரிமாற்றம் அல்லது ஒப்புதல் பெறப்பட்ட பிறகு கால்பேக் செயல்படுத்தப்பட வேண்டிய அனைத்து நிகழ்வுகளிலும் குறிப்பிட்ட பயன்பாடுகளுக்கு ERC-1363 டோக்கன்களைப் பயன்படுத்தலாம்.
டோக்கன்களைக் கையாளும் பெறுநரின் திறனைச் சரிபார்ப்பதன் மூலம் ஸ்மார்ட் ஒப்பந்தங்களில் டோக்கன் இழப்பு அல்லது டோக்கன் பூட்டப்படுவதைத் தவிர்க்கவும் ERC-1363 பயனுள்ளதாக இருக்கும்.

பிற ERC-20 நீட்டிப்பு முன்மொழிவுகளைப் போலல்லாமல், ERC-1363 ஆனது ERC-20 `transfer` மற்றும் `transferFrom` முறைகளை மேலெழுதாது, மேலும் ERC-20 உடன் பின்தங்கிய இணக்கத்தன்மையைப் பராமரித்துச் செயல்படுத்த வேண்டிய இடைமுக ஐடிகளை (interfaces IDs) வரையறுக்கிறது.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) இலிருந்து:

### முறைகள் {#methods}

ERC-1363 தரநிலையைச் செயல்படுத்தும் ஸ்மார்ட் ஒப்பந்தங்கள் `ERC1363` இடைமுகத்தில் உள்ள அனைத்து செயல்பாடுகளையும், அத்துடன் `ERC20` மற்றும் `ERC165` இடைமுகங்களையும் **கட்டாயம்** செயல்படுத்த வேண்டும்.

```solidity
pragma solidity ^0.8.0;

/* *
 * @title ERC1363
 * @dev `transfer` அல்லது `transferFrom` க்குப் பிறகு பெறுநர் ஒப்பந்தத்தில் (recipient contract) குறியீட்டை இயக்குவதையோ, அல்லது `approve` க்குப் பிறகு செலவழிப்பவர் ஒப்பந்தத்தில் (spender contract) குறியீட்டை இயக்குவதையோ ஒரே பரிவர்த்தனையில் (single transaction) ஆதரிக்கும் ERC-20 டோக்கன்களுக்கான நீட்டிப்பு இடைமுகம் (extension interface). */
interface ERC1363 is ERC20, ERC165 {
  /* * குறிப்பு (NOTE): இந்த இடைமுகத்திற்கான ERC-165 அடையாளங்காட்டி (identifier) 0xb0202a11 ஆகும்.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)')) */

  /* *
   * @dev அழைப்பாளரின் (caller) கணக்கிலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்துகிறது,
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @return பிழை ஏற்படாதவரை (unless throwing) செயல்பாடு வெற்றிகரமாக முடிந்ததைக் குறிக்கும் பூலியன் (boolean) மதிப்பு. */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /* *
   * @dev அழைப்பாளரின் கணக்கிலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்துகிறது,
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data `to` க்கான அழைப்பில் அனுப்பப்படும், குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு.
   * @return பிழை ஏற்படாதவரை செயல்பாடு வெற்றிகரமாக முடிந்ததைக் குறிக்கும் பூலியன் மதிப்பு. */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev கொடுப்பனவு முறைமையை (allowance mechanism) பயன்படுத்தி `from` இலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்துகிறது,
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param from டோக்கன்களை அனுப்ப வேண்டிய முகவரி.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @return பிழை ஏற்படாதவரை செயல்பாடு வெற்றிகரமாக முடிந்ததைக் குறிக்கும் பூலியன் மதிப்பு. */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /* *
   * @dev கொடுப்பனவு முறைமையை (allowance mechanism) பயன்படுத்தி `from` இலிருந்து `to` க்கு `value` அளவு டோக்கன்களை நகர்த்துகிறது,
   * பின்னர் `to` இல் `ERC1363Receiver::onTransferReceived` ஐ அழைக்கிறது.
   * @param from டோக்கன்களை அனுப்ப வேண்டிய முகவரி.
   * @param to டோக்கன்கள் மாற்றப்படும் முகவரி.
   * @param value மாற்றப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data `to` க்கான அழைப்பில் அனுப்பப்படும், குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு.
   * @return பிழை ஏற்படாதவரை செயல்பாடு வெற்றிகரமாக முடிந்ததைக் குறிக்கும் பூலியன் மதிப்பு. */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev அழைப்பாளரின் டோக்கன்களில் `spender` க்கான கொடுப்பனவாக (allowance) `value` அளவு டோக்கன்களை அமைக்கிறது,
   * பின்னர் `spender` இல் `ERC1363Spender::onApprovalReceived` ஐ அழைக்கிறது.
   * @param spender நிதியைச் செலவழிக்கும் முகவரி.
   * @param value செலவழிக்கப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @return பிழை ஏற்படாதவரை செயல்பாடு வெற்றிகரமாக முடிந்ததைக் குறிக்கும் பூலியன் மதிப்பு. */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /* *
   * @dev அழைப்பாளரின் டோக்கன்களில் `spender` க்கான கொடுப்பனவாக `value` அளவு டோக்கன்களை அமைக்கிறது,
   * பின்னர் `spender` இல் `ERC1363Spender::onApprovalReceived` ஐ அழைக்கிறது.
   * @param spender நிதியைச் செலவழிக்கும் முகவரி.
   * @param value செலவழிக்கப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data `spender` க்கான அழைப்பில் அனுப்பப்படும், குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு.
   * @return பிழை ஏற்படாதவரை செயல்பாடு வெற்றிகரமாக முடிந்ததைக் குறிக்கும் பூலியன் மதிப்பு. */
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

`transferAndCall` அல்லது `transferFromAndCall` வழியாக ERC-1363 டோக்கன்களை ஏற்க விரும்பும் ஸ்மார்ட் ஒப்பந்தம் `ERC1363Receiver` இடைமுகத்தைக் **கட்டாயம்** செயல்படுத்த வேண்டும்:

```solidity
/* *
 * @title ERC1363Receiver
 * @dev ERC-1363 டோக்கன் ஒப்பந்தங்களிலிருந்து `transferAndCall` அல்லது `transferFromAndCall` ஐ ஆதரிக்க விரும்பும் எந்தவொரு ஒப்பந்தத்திற்குமான இடைமுகம். */
interface ERC1363Receiver {
  /* *
   * @dev `operator` மூலம் `from` இலிருந்து `ERC1363::transferAndCall` அல்லது `ERC1363::transferFromAndCall` வழியாக இந்த ஒப்பந்தத்திற்கு ERC-1363 டோக்கன்கள் மாற்றப்படும்போதெல்லாம், இந்தச் செயல்பாடு (function) அழைக்கப்படுகிறது.
   *
   * குறிப்பு: பரிமாற்றத்தை ஏற்க, இது
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` ஐ வழங்க வேண்டும்
   * (அதாவது 0x88a7ca5c, அல்லது அதன் சொந்த function selector).
   *
   * @param operator `transferAndCall` அல்லது `transferFromAndCall` செயல்பாட்டை அழைத்த முகவரி.
   * @param from டோக்கன்கள் எங்கிருந்து மாற்றப்படுகின்றனவோ அந்த முகவரி.
   * @param value மாற்றப்பட்ட டோக்கன்களின் அளவு.
   * @param data குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு.
   * @return பிழை ஏற்படாதவரை பரிமாற்றம் அனுமதிக்கப்பட்டால் `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` ஐ வழங்கும். */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` வழியாக ERC-1363 டோக்கன்களை ஏற்க விரும்பும் ஸ்மார்ட் ஒப்பந்தம் `ERC1363Spender` இடைமுகத்தைக் **கட்டாயம்** செயல்படுத்த வேண்டும்:

```solidity
/* *
 * @title ERC1363Spender
 * @dev ERC-1363 டோக்கன் ஒப்பந்தங்களிலிருந்து `approveAndCall` ஐ ஆதரிக்க விரும்பும் எந்தவொரு ஒப்பந்தத்திற்குமான இடைமுகம். */
interface ERC1363Spender {
  /* *
   * @dev ஒரு ERC-1363 டோக்கன்களின் `owner` (உரிமையாளர்) தங்களது டோக்கன்களைச் செலவழிக்க `ERC1363::approveAndCall` வழியாக இந்த ஒப்பந்தத்திற்கு ஒப்புதல் அளிக்கும்போதெல்லாம், இந்தச் செயல்பாடு அழைக்கப்படுகிறது.
   *
   * குறிப்பு: ஒப்புதலை ஏற்க, இது
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` ஐ வழங்க வேண்டும்
   * (அதாவது 0x7b04a2d0, அல்லது அதன் சொந்த function selector).
   *
   * @param owner `approveAndCall` செயல்பாட்டை அழைத்த மற்றும் முன்பு டோக்கன்களைச் சொந்தமாகக் கொண்டிருந்த முகவரி.
   * @param value செலவழிக்கப்பட வேண்டிய டோக்கன்களின் அளவு.
   * @param data குறிப்பிட்ட வடிவமைப்பு இல்லாத கூடுதல் தரவு.
   * @return பிழை ஏற்படாதவரை ஒப்புதல் அனுமதிக்கப்பட்டால் `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` ஐ வழங்கும். */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## மேலும் படிக்க {#further-reading}

- [ERC-1363: செலுத்தக்கூடிய டோக்கன் தரநிலை](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub ரெப்போ](https://github.com/vittominacori/erc1363-payable-token)