---
title: ارتقای تجربه کاربری
description: همچنان استفاده از اتریوم برای اکثر افراد بیش از حد پیچیده است. اتریوم باید برای تشویق پذیرش انبوه، موانع ورودش را به شدت کاهش دهد - کاربران باید از مزایای دسترسی غیرمتمرکز، بدون نیاز به مجوز و مقاوم در برابر سانسور به اتریوم بهره‌مند شوند اما باید به اندازه استفاده از یک برنامه سنتی web2 بدون اصطکاک باشد.
lang: fa
image: /images/roadmap/roadmap-ux.png
alt: "نقشه‌ راه اتریوم"
template: roadmap
---

استفاده از اتریوم نیازمند ساده‌سازی است؛ از مدیریت کلیدها و کیف پول‌ها گرفته تا ایجاد تراکنش‌ها. برای فراهم شدن بستر پذیرش انبوه، اتریوم باید به شدت سهولت استفاده را افزایش دهد که به کاربران اجازه دهد با تجربه بدون اصطکاک استفاده از برنامه‌های Web2، دسترسی غیرمتمرکز، بدون نیاز به مجوز و مقاوم در برابر سانسور به اتریوم را تجربه کنند.

## فراتر از کلمات بازیابی {#no-more-seed-phrases}

حساب‌های اتریوم توسط یک جفت کلید برای تایید اصالت حساب‌ها (کلید عمومی) و امضا زدن روی پیام‌ها (کلید خصوصی)، محافظت می‌شوند. کلید خصوصی مثل شاه‌کلید است. این کلید به شما اجازه می‌دهد به یک حساب اتریوم دسترسی کامل داشته باشید. این یک روش مجزا است برای کسانی که بیشتر با بانک‌ها و برنامه‌های Web2 که حساب‌ها را از طرف یک کاربر مدیریت می‌کنند آشنا هستند. برای اینکه اتریوم بدون نیاز به اشخاص ثالث متمرکز به پذیرش انبوه برسد، باید راهی ساده و بدون اصطکاک برای کاربر وجود داشته باشد تا بتواند از دارایی‌های خود نگه‌داری کند و کنترل داده‌هایشان را بدون نیاز به آشنایی با رمزنگاری کلید خصوصی-عمومی و مکانیزم مدیریت کلید، در دست داشته باشد.

راه حل این مشکل، استفاده از کیف پول‌های قرارداد هوشمند برای تعامل با اتریوم است. کیف‌ پول‌های قرارداد هوشمند راه‌هایی برای محافظت از حساب‌ها در صورت گم یا دزدیده شدن ایجاد می‌کند، بستر مناسب را برای تشخیص و دفاع بهتر در مقابل کلاه‌برداری فراهم می‌کند و به کیف پول‌ها این امکان را می‌دهد تا عملکرد جدیدی داشته باشند. اگرچه در حال حاضر کیف پول‌های قرارداد هوشمند وجود دارند، اما ساخت آن‌ها دشوار است. چراکه پروتکل اتریوم باید پشتیانی بهتری برای آن فراهم کند. این پشتیبانی تکمیلی تحت عنوان انتزاع حساب شناخته می‌شود.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">اطلاعات بیشتر در مورد انتزاع حساب</ButtonLink>

## گره‌ها برای همه

کاربران اجراکننده گره‌ها نباید برای ارائه داده‌ها به اشخاص ثالث اعتماد کنند و می‌توانند به سرعت،به طور ایمن و بدون دریافت مجوز با زنجیره بلوکی اتریوم تعامل داشته باشند. با این وجود، در حال حاضر اجرای یک گره به دانش فنی و فضای دیسک چشمگیر نیاز دارد، به عبارتی بسیاری از افراد مجبورند در عوض به واسطه‌ها اعتماد کنند.

ارتقاهایی وجود دارد که اجرای گره‌ها را بسیار ساده‌تر و میزان منابع لازم را به شدت کمتر خواهد کرد. شیوه ذخیره‌سازی داده‌ها در جهت استفاده یک ساختار بهینه‌تر از فضا تغییر می‌کند که به عنوان **درخت ورکل** شناخته می‌شود. علاوه بر این، با [بی‌حالتی](/roadmap/statelessness) یا [انقضای داده‌ها](/roadmap/statelessness/#data-expiry)، گره‌های اتریوم دیگر نیازی به ذخیره‌سازی یک کپی از کل داده‌های حالت اتریوم نخواهند داشت که نیاز به فضای هارد دیسک را به شدت کاهش می‌دهد. [گره‌های سبک](/developers/docs/nodes-and-clients/light-clients/) مزایای زیادی از اجرای یک گره کامل ارائه می‌دهند اما می‌توانند به آسانی روی موبایل‌ها یا داخل برنامه‌های مرورگر ساده اجرا شوند.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">خواندن درباره درختان ورکل</ButtonLink>

با ابن بروزرسانی‌ها موانع راه‌اندازی یک گره به صفر می‌رسد. کاربران بدون نیاز به فضای دیسک بالا یا پردازنده‌های قدرتمند، روی کامپیوتر یا تلفن همراه خود از دسترسی ایمن و بدون مجوز به اتریوم بهره‌مند خواهند شد و مجبور نیستند هنگام استفاده از برنامه‌ها برای دسترسی به داده‌ها یا شبکه به اشخاص ثالث تکیه کنند.

## پیشرفت فعلی {#current-progress}

کیف پول‌های قرارداد هوشمند درحال حاضر در دسترس هستند، ولی ارتقا و به‌روزرسانی‌های بیشتری لازم است تا آن‌ها را تا حد ممکن غیرمتمرکز و بی‌نیاز به مجوز کند. EIP-4337 یک پیشنهاد کامل است که نیاز به هیچ تغییری در پروتکل اتریوم ندارد. قرارداد هوشمند اساسی مورد نیاز برای EIP-4337 در ماه مارس 2023 پیاده‌سازی شد.

بی‌حالتی کامل هنوز در مرحله تحقیق است و احتمالاً چندین سال از پیاده‌سازی فاصله دارد. چندین نقطه‌عطف از جمله انقضای داده‌ها، در مسیر تحقق بی‌حالتی کامل وجود دارد که ممکن است زودتر پیاده‌سازی شود. بخش‌های دیگر نقشه راه مثل [درختان ورکل](/roadmap/verkle-trees/) و [جداسازی پیشنهاددهندگان-ایجادکنندگان](/roadmap/pbs/) باید ابتدا تکمیل شوند.

در حال حاضر شبکه‌های تست درخت ورکل راجرا شده‌اند و مرحله بعدی اجرای کلاینت‌های مبتنی بر درخت ورکل در شبکه‌های آزمایشی خصوصی و پس از آن در شبکه‌های تست عمومی است. می‌توانید با به‌کارگیری قراردادها در شبکه‌های تست یا اجرای کلاینت‌های شبکه تست، پیشرفت آن را سرعت دهید.
