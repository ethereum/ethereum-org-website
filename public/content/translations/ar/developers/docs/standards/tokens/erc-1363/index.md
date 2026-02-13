---
title: "معيار الرمز القابل للدفع ERC-1363"
description: "ERC-1363 هو واجهة توسيع لرموز ERC-20 تدعم تنفيذ منطق مخصص في عقد المستلم بعد التحويلات، أو في عقد المنفق بعد الموافقات، كل ذلك ضمن معاملة واحدة."
lang: ar
---

## مقدمة {#introduction}

### ما هو ERC-1363؟ {#what-is-erc1363}

ERC-1363 هو واجهة توسيع لرموز ERC-20 تدعم تنفيذ منطق مخصص في عقد المستلم بعد التحويلات، أو في عقد المنفق بعد الموافقات، كل ذلك ضمن معاملة واحدة.

### Differences from ERC-20 {#erc20-differences}

لا تسمح عمليات ERC-20 القياسية مثل `transfer` و`transferFrom` و`approve` بتنفيذ التعليمات البرمجية على عقد المستلم أو المنفق دون معاملة منفصلة.
وهذا ما يزيد من تعقيد تطوير واجهة المستخدم ويؤدي إلى احتكاك في التبني؛ لأن المستخدمين يجب أن ينتظروا تنفيذ المعاملة الأولى ثم إرسال المعاملة الثانية.
يجب عليهم أيضًا دفع رسوم الغاز مرتين.

يجعل معيار ERC-1363 الرموز القابلة للاستبدال قادرة على أداء الإجراءات بسهولة أكبر والعمل دون استخدام أي مستمع خارج السلسلة.
فهو يسمح بإجراء استدعاء على عقد مستلم أو منفق، بعد التحويل أو الموافقة، في معاملة واحدة.

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك أولاً بالقراءة عن:

- معايير الرمز
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## الجسد {#body}

يقدم معيار ERC-1363 واجهة برمجة تطبيقات قياسية لرموز ERC-20 للتفاعل مع العقود الذكية بعد `transfer` أو `transferFrom` أو `approve`.

يوفر هذا المعيار وظائف أساسية لنقل الرموز، بالإضافة إلى السماح بالموافقة على الرموز حتى يمكن إنفاقها من قبل طرف ثالث آخر على السلسلة، ثم إجراء استدعاء على عقد المستلم أو المنفق.

هناك العديد من الاستخدامات المقترحة للعقود الذكية التي يمكن أن تقبل استدعاءات ERC-20.

ومن الأمثلة على ذلك:

- **المبيعات الجماعية**: تؤدي الرموز المرسلة إلى تخصيص فوري للمكافآت.
- **الخدمات**: الدفع ينشط الوصول إلى الخدمة في خطوة واحدة.
- **الفواتير**: الرموز تسوي الفواتير تلقائيًا.
- **الاشتراكات**: الموافقة على السعر السنوي ينشط الاشتراك ضمن دفعة الشهر الأول.

لهذه الأسباب تمت تسميته في الأصل **\"الرمز القابل للدفع\"**.

يوسع سلوك الاستدعاء من فائدته، مما يتيح تفاعلات سلسة مثل:

- **تجميد العملات**: تؤدي الرموز المحولة إلى القفل التلقائي في عقد تجميد العملات.
- **التصويت**: الرموز المستلمة تسجل الأصوات في نظام الحوكمة.
- **المبادلة**: موافقات الرموز تنشط منطق المبادلة في خطوة واحدة.

يمكن استخدام رموز ERC-1363 لمرافق محددة في جميع الحالات التي تتطلب تنفيذ استدعاء بعد استلام تحويل أو موافقة.
يعتبر معيار ERC-1363 مفيدًا أيضًا في تجنب فقدان الرمز أو قفله في العقود الذكية عن طريق التحقق من قدرة المستلم على التعامل مع الرموز.

على عكس مقترحات توسيع ERC-20 الأخرى، لا يتجاوز ERC-1363 طرق `transfer` و`transferFrom` لمعيار ERC-20 ويحدد معرّفات الواجهات التي سيتم تنفيذها مع الحفاظ على التوافق مع الإصدارات السابقة من ERC-20.

من [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### طرق {#methods}

العقود الذكية التي تنفذ معيار ERC-1363 **يجب** أن تنفذ جميع الوظائف في واجهة `ERC1363`، بالإضافة إلى واجهات `ERC20` و`ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev واجهة توسيع لرموز ERC-20 التي تدعم تنفيذ التعليمات البرمجية على عقد مستلم
 * بعد `transfer` أو `transferFrom`، أو تعليمات برمجية على عقد منفق بعد `approve`، في معاملة واحدة.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * ملاحظة: معرف ERC-165 لهذه الواجهة هو 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev ينقل كمية `value` من الرموز من حساب المتصل إلى `to`
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param to العنوان الذي يتم نقل الرموز إليه.
   * @param value كمية الرموز المراد نقلها.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح استثناء.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev ينقل كمية `value` من الرموز من حساب المتصل إلى `to`
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param to العنوان الذي يتم نقل الرموز إليه.
   * @param value كمية الرموز المراد نقلها.
   * @param data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في الاستدعاء إلى `to`.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح استثناء.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev ينقل كمية `value` من الرموز من `from` إلى `to` باستخدام آلية السماح
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param from العنوان الذي سيتم إرسال الرموز منه.
   * @param to العنوان الذي يتم نقل الرموز إليه.
   * @param value كمية الرموز المراد نقلها.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح استثناء.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev ينقل كمية `value` من الرموز من `from` إلى `to` باستخدام آلية السماح
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param from العنوان الذي سيتم إرسال الرموز منه.
   * @param to العنوان الذي يتم نقل الرموز إليه.
   * @param value كمية الرموز المراد نقلها.
   * @param data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في الاستدعاء إلى `to`.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح استثناء.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev يحدد كمية `value` من الرموز على أنها سماحية `spender` على رموز المتصل
   * ثم يستدعي `ERC1363Spender::onApprovalReceived` على `spender`.
   * @param spender العنوان الذي سينفق الأموال.
   * @param value كمية الرموز التي سيتم إنفاقها.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح استثناء.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev يحدد كمية `value` من الرموز على أنها سماحية `spender` على رموز المتصل
   * ثم يستدعي `ERC1363Spender::onApprovalReceived` على `spender`.
   * @param spender العنوان الذي سينفق الأموال.
   * @param value كمية الرموز التي سيتم إنفاقها.
   * @param data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في الاستدعاء إلى `spender`.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح استثناء.
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

العقد الذكي الذي يريد قبول رموز ERC-1363 عبر `transferAndCall` أو `transferFromAndCall` **يجب** أن ينفذ واجهة `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev واجهة لأي عقد يريد دعم `transferAndCall` أو `transferFromAndCall` من عقود رموز ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev كلما تم نقل رموز ERC-1363 إلى هذا العقد عبر `ERC1363::transferAndCall` أو `ERC1363::transferFromAndCall`
   * بواسطة `operator` من `from`، يتم استدعاء هذه الدالة.
   *
   * ملاحظة: لقبول النقل، يجب أن تُرجع هذه الدالة
   * `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))`
   * (أي 0x88a7ca5c، أو محدد الدالة الخاص بها).
   *
   * @param operator العنوان الذي استدعى دالة `transferAndCall` أو `transferFromAndCall`.
   * @param from العنوان الذي يتم نقل الرموز منه.
   * @param value كمية الرموز المنقولة.
   * @param data بيانات إضافية بدون تنسيق محدد.
   * @return `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))` إذا كان النقل مسموحًا به ما لم يتم طرح استثناء.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

العقد الذكي الذي يريد قبول رموز ERC-1363 عبر `approveAndCall` **يجب** أن ينفذ واجهة `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev واجهة لأي عقد يريد دعم `approveAndCall` من عقود رموز ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev كلما وافق `owner` رموز ERC-1363 على هذا العقد عبر `ERC1363::approveAndCall`
   * لإنفاق رموزه، يتم استدعاء هذه الدالة.
   *
   * ملاحظة: لقبول الموافقة، يجب أن تُرجع هذه الدالة
   * `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))`
   * (أي 0x7b04a2d0، أو محدد الدالة الخاص بها).
   *
   * @param owner العنوان الذي استدعى دالة `approveAndCall` وامتلك الرموز سابقًا.
   * @param value كمية الرموز التي سيتم إنفاقها.
   * @param data بيانات إضافية بدون تنسيق محدد.
   * @return `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))` إذا كانت الموافقة مسموحًا بها ما لم يتم طرح استثناء.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## قراءة إضافية {#further-reading}

- [ERC-1363: معيار الرمز القابل للدفع](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: مستودع GitHub](https://github.com/vittominacori/erc1363-payable-token)
