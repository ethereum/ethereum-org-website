---
title: "Ethereum மேம்பாட்டுத் தரநிலைகள்"
description: "EIPகள், ERC-20 மற்றும் ERC-721 போன்ற டோக்கன் தரநிலைகள் மற்றும் மேம்பாட்டு மரபுகள் உள்ளிட்ட Ethereum தரநிலைகள் பற்றி அறிக."
lang: ta
incomplete: true
---

## தரநிலைகளின் கண்ணோட்டம் {#standards-overview}

Ethereum சமூகம் பல தரநிலைகளை ஏற்றுக்கொண்டுள்ளது, இது திட்டங்களை (அதாவது [Ethereum கிளையண்டுகள்](/developers/docs/nodes-and-clients/) மற்றும் வாலெட்டுகள் போன்றவை) செயலாக்கங்கள் முழுவதும் இயங்கக்கூடியதாக வைத்திருக்க உதவுகிறது, மேலும் ஸ்மார்ட் ஒப்பந்தங்கள் மற்றும் டாப்ஸ்கள் (dapps) ஒருங்கிணைக்கக்கூடியதாக இருப்பதை உறுதி செய்கிறது.

பொதுவாக தரநிலைகள் [Ethereum மேம்பாட்டு முன்மொழிவுகள்](/eips/) (EIPs) ஆக அறிமுகப்படுத்தப்படுகின்றன, அவை சமூக உறுப்பினர்களால் ஒரு [நிலையான செயல்முறை](https://eips.ethereum.org/EIPS/eip-1) மூலம் விவாதிக்கப்படுகின்றன.

- [EIPகளின் அறிமுகம்](/eips/)
- [EIPகளின் பட்டியல்](https://eips.ethereum.org/)
- [EIP GitHub ரெப்போ](https://github.com/ethereum/EIPs)
- [EIP விவாதக் களம்](https://ethereum-magicians.org/c/eips)
- [Ethereum ஆளுமை அறிமுகம்](/governance/)
- [Ethereum ஆளுமை கண்ணோட்டம்](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _மார்ச் 31, 2019 - Boris Mann_
- [Ethereum நெறிமுறை மேம்பாட்டு ஆளுமை மற்றும் நெட்வொர்க் மேம்படுத்தல் ஒருங்கிணைப்பு](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _மார்ச் 23, 2020 - Hudson Jameson_
- [அனைத்து Ethereum கோர் டெவ் கூட்டங்களின் பிளேலிஸ்ட்](https://www.youtube.com/@EthereumProtocol) _(YouTube பிளேலிஸ்ட்)_

## தரநிலைகளின் வகைகள் {#types-of-standards}

3 வகையான EIPகள் உள்ளன:

- Standards Track: பெரும்பாலான அல்லது அனைத்து Ethereum செயலாக்கங்களையும் பாதிக்கும் எந்தவொரு மாற்றத்தையும் விவரிக்கிறது
- [Meta Track](https://eips.ethereum.org/meta): Ethereum-ஐச் சுற்றியுள்ள ஒரு செயல்முறையை விவரிக்கிறது அல்லது ஒரு செயல்முறைக்கான மாற்றத்தை முன்மொழிகிறது
- [Informational Track](https://eips.ethereum.org/informational): ஒரு Ethereum வடிவமைப்பு சிக்கலை விவரிக்கிறது அல்லது Ethereum சமூகத்திற்கு பொதுவான வழிகாட்டுதல்கள் அல்லது தகவல்களை வழங்குகிறது

மேலும், Standard Track 4 வகைகளாகப் பிரிக்கப்பட்டுள்ளது:

- [Core](https://eips.ethereum.org/core): ஒருமித்த ஃபோர்க் (consensus fork) தேவைப்படும் மேம்பாடுகள்
- [Networking](https://eips.ethereum.org/networking): devp2p மற்றும் Light Ethereum Subprotocol-ஐச் சுற்றியுள்ள மேம்பாடுகள், அத்துடன் whisper மற்றும் swarm-ன் நெட்வொர்க் நெறிமுறை விவரக்குறிப்புகளுக்கு முன்மொழியப்பட்ட மேம்பாடுகள்.
- [Interface](https://eips.ethereum.org/interface): கிளையண்ட் API/RPC விவரக்குறிப்புகள் மற்றும் தரநிலைகளைச் சுற்றியுள்ள மேம்பாடுகள், மற்றும் முறைப் பெயர்கள் (method names) மற்றும் ஒப்பந்த ABIகள் போன்ற சில மொழி-நிலை தரநிலைகள்.
- [ERC](https://eips.ethereum.org/erc): பயன்பாட்டு-நிலை தரநிலைகள் மற்றும் மரபுகள்

இந்த வெவ்வேறு வகைகள் மற்றும் பிரிவுகள் பற்றிய விரிவான தகவல்களை [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)-ல் காணலாம்

### டோக்கன் தரநிலைகள் {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - வாக்களிக்கும் டோக்கன்கள், ஸ்டேக்கிங் டோக்கன்கள் அல்லது மெய்நிகர் நாணயங்கள் போன்ற பரிமாற்றக்கூடிய (fungible) டோக்கன்களுக்கான நிலையான இடைமுகம்.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - டோக்கன்களை ஈதரைப் போலவே செயல்பட வைக்கும் மற்றும் பெறுநர்கள் பக்கத்தில் டோக்கன் பரிமாற்றங்களைக் கையாளுவதை ஆதரிக்கும் ஒரு பரிமாற்றக்கூடிய டோக்கன்களின் தரநிலை.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - ஒரே பரிவர்த்தனையில் பெறுநர் ஒப்பந்தங்களில் கால்பேக்கை (callback) செயல்படுத்துவதை ஆதரிக்கும் ERC-20 டோக்கன்களுக்கான நீட்டிப்பு இடைமுகம்.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - கலைப்படைப்பு அல்லது பாடலுக்கான பத்திரம் போன்ற பரிமாற்ற முடியாத (non-fungible) டோக்கன்களுக்கான நிலையான இடைமுகம்.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - தொடர்ச்சியான டோக்கன் அடையாளங்காட்டிகளைப் பயன்படுத்தி ஒன்று அல்லது பல பரிமாற்ற முடியாத டோக்கன்களை உருவாக்கும்போது/மாற்றும்போது வெளியிடப்படும் ஒரு தரப்படுத்தப்பட்ட நிகழ்வு.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 நுகர்வோர் பங்கிற்கான இடைமுக நீட்டிப்பு.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721 டோக்கன்களுக்கு கட்டுப்படுத்தப்பட்ட அனுமதிகளுடன் நேர-வரையறுக்கப்பட்ட பங்கைச் சேர்க்கிறது.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(பரிந்துரைக்கப்படவில்லை)** ERC-20-ஐ விட மேம்படுத்தப்பட்ட ஒரு டோக்கன் தரநிலை.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - பரிமாற்றக்கூடிய மற்றும் பரிமாற்ற முடியாத சொத்துக்கள் இரண்டையும் கொண்டிருக்கக்கூடிய ஒரு டோக்கன் தரநிலை.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - வருவாய் ஈட்டும் வால்ட்டுகளின் (yield-bearing vaults) தொழில்நுட்ப அளவுருக்களை மேம்படுத்தவும் ஒன்றிணைக்கவும் வடிவமைக்கப்பட்ட ஒரு டோக்கனைஸ்டு வால்ட் தரநிலை.

[டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/) பற்றி மேலும் அறிக.

## மேலும் படிக்க {#further-reading}

- [Ethereum மேம்பாட்டு முன்மொழிவுகள் (EIPs)](/eips/)

_உங்களுக்கு உதவிய சமூக வளம் பற்றித் தெரியுமா? இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_