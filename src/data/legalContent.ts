/** Privacy Policy and Terms of Service copy.
 *
 * Both languages are now the client's real, final legal text: Arabic as
 * supplied directly, English as a direct translation of it. This is a
 * straightforward translation, not a certified/legal-reviewed one — worth
 * having a bilingual reviewer (or the client) confirm before relying on it
 * for compliance purposes. */

export interface LegalPageData {
  title: { en: string; ar: string };
  lastUpdated: { en: string; ar: string };
  intro: { en: string; ar: string };
  sections: { heading: { en: string; ar: string }; body: { en: string; ar: string }[] }[];
}

export const privacyPolicyContent: LegalPageData = {
  title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  lastUpdated: { en: "", ar: "" },
  intro: {
    en: "Welcome to Dr. Ayman Tarek's website. We are committed to protecting the privacy of all visitors to the website and safeguarding the confidentiality of the personal information shared with us. This policy explains how information is collected, used, and protected when using the website or contacting us through contact forms or appointment booking requests.",
    ar: "مرحبًا بكم في الموقع الإلكتروني للدكتور أيمن طارق. نحن نلتزم بحماية خصوصية جميع زوار الموقع والحفاظ على سرية المعلومات الشخصية التي تتم مشاركتها معنا. توضح هذه السياسة كيفية جمع المعلومات واستخدامها وحمايتها عند استخدام الموقع أو التواصل معنا من خلال نماذج الاتصال أو طلبات حجز المواعيد.",
  },
  sections: [
    {
      heading: { en: "Information We Collect", ar: "المعلومات التي نقوم بجمعها" },
      body: [
        {
          en: "We may collect certain information voluntarily provided by the user, such as:\n• Name.\n• Phone number.\n• Email address.\n• Messages or inquiries sent through the website.\n• Appointment booking details.",
          ar: "قد نقوم بجمع بعض المعلومات التي يقدمها المستخدم طوعًا، مثل:\n• الاسم.\n• رقم الهاتف.\n• البريد الإلكتروني.\n• الرسائل أو الاستفسارات المرسلة عبر الموقع.\n• بيانات حجز المواعيد.",
        },
        {
          en: "Certain data may also be collected automatically, such as:\n• IP address.\n• Browser type and operating system.\n• Pages visited and browsing duration.\n• Cookies.",
          ar: "كما قد يتم جمع بعض البيانات تلقائيًا، مثل:\n• عنوان بروتوكول الإنترنت (IP Address).\n• نوع المتصفح ونظام التشغيل.\n• الصفحات التي تمت زيارتها ومدة التصفح.\n• ملفات تعريف الارتباط (Cookies).",
        },
      ],
    },
    {
      heading: { en: "How We Use Information", ar: "كيفية استخدام المعلومات؟" },
      body: [
        {
          en: "The information collected is used for the following purposes:\n• Responding to inquiries.\n• Communicating with the user regarding booking requests.\n• Improving the website experience.\n• Developing services and content.\n• Analyzing website performance and visit statistics.\n• Sending updates or service-related information with the user's consent.",
          ar: "تستخدم المعلومات التي يتم جمعها للأغراض التالية:\n• الرد على الاستفسارات.\n• التواصل مع المستخدم بشأن طلبات الحجز.\n• تحسين تجربة استخدام الموقع.\n• تطوير الخدمات والمحتوى.\n• تحليل أداء الموقع وإحصاء عدد الزيارات.\n• إرسال تحديثات أو معلومات متعلقة بالخدمات عند موافقة المستخدم.",
        },
      ],
    },
    {
      heading: { en: "Sharing of Information", ar: "مشاركة المعلومات" },
      body: [
        {
          en: "Personal data is not sold, rented, or shared with any third party, except in the following cases:\n• If required by law.\n• If necessary to provide services related to the user's request.\n• After obtaining the user's consent.",
          ar: "لا يتم بيع أو تأجير أو مشاركة البيانات الشخصية مع أي طرف ثالث، باستثناء الحالات التالية:\n• إذا كان ذلك مطلوبًا بموجب القانون.\n• إذا كان ذلك ضروريًا لتقديم الخدمات المرتبطة بطلب المستخدم.\n• بعد الحصول على موافقة المستخدم.",
        },
      ],
    },
    {
      heading: { en: "Data Protection", ar: "حماية البيانات" },
      body: [
        {
          en: "We implement appropriate technical and security measures to protect personal information from unauthorized access, alteration, loss, or disclosure.",
          ar: "نعمل على تطبيق إجراءات أمنية وتقنية مناسبة لحماية المعلومات الشخصية من الوصول غير المصرح به أو التعديل أو الفقد أو الإفصاح.",
        },
        {
          en: "Despite these measures, data transmitted over the internet cannot be guaranteed to be 100% secure.",
          ar: "ورغم اتخاذ هذه الإجراءات، لا يمكن ضمان حماية البيانات بنسبة 100% عند نقلها عبر الإنترنت.",
        },
      ],
    },
    {
      heading: { en: "Cookies", ar: "ملفات تعريف الارتباط (Cookies)" },
      body: [
        {
          en: "The website may use cookies to improve the user experience and analyze website performance.",
          ar: "قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل أداء الموقع.",
        },
        {
          en: "Users may disable cookies through their browser settings, although this may affect certain website functions.",
          ar: "يمكن للمستخدم تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح، إلا أن ذلك قد يؤثر على بعض وظائف الموقع.",
        },
      ],
    },
    {
      heading: { en: "External Links", ar: "الروابط الخارجية" },
      body: [
        {
          en: "The website may contain links to other websites. The website is not responsible for the content of those websites or their privacy policies.",
          ar: "قد يحتوي الموقع على روابط لمواقع إلكترونية أخرى، ولا يتحمل الموقع مسؤولية محتوى تلك المواقع أو سياسات الخصوصية الخاصة بها.",
        },
      ],
    },
    {
      heading: { en: "User Rights", ar: "حقوق المستخدم" },
      body: [
        {
          en: "Users may request to:\n• View their personal data.\n• Correct or update their data.\n• Request deletion of their data, where consistent with legal obligations.",
          ar: "يجوز للمستخدم طلب:\n• الاطلاع على بياناته الشخصية.\n• تصحيح أو تحديث البيانات.\n• طلب حذف البيانات متى كان ذلك متوافقًا مع الالتزامات القانونية.",
        },
      ],
    },
    {
      heading: { en: "Updating the Privacy Policy", ar: "تحديث سياسة الخصوصية" },
      body: [
        {
          en: "This policy may be amended from time to time, and the version published on the website shall be the applicable one.",
          ar: "قد يتم تعديل هذه السياسة من وقت لآخر، ويصبح الإصدار المنشور على الموقع هو المعتمد.",
        },
      ],
    },
    {
      heading: { en: "Contact Us", ar: "التواصل معنا" },
      body: [
        {
          en: "If you have any questions regarding this Privacy Policy, you may contact us through the Contact Us page on the website.",
          ar: "إذا كان لديك أي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا من خلال صفحة اتصل بنا الموجودة على الموقع.",
        },
      ],
    },
  ],
};

export const termsOfServiceContent: LegalPageData = {
  title: { en: "Terms of Use", ar: "شروط الاستخدام" },
  lastUpdated: { en: "Last updated: August 3, 2026", ar: "آخر تحديث: 3 أغسطس 2026" },
  intro: { en: "", ar: "" },
  sections: [
    {
      heading: { en: "Acceptance of Terms", ar: "قبول الشروط" },
      body: [
        {
          en: "By using this website, you acknowledge that you have read these Terms of Use and agree to be bound by them.",
          ar: "باستخدام هذا الموقع فإنك تقر بأنك اطلعت على شروط الاستخدام وتوافق على الالتزام بها.",
        },
      ],
    },
    {
      heading: { en: "Purpose of the Website", ar: "الغرض من الموقع" },
      body: [
        {
          en: "The website aims to provide informational and educational content about Dr. Ayman Tarek's services in brain, nerve, and spine surgery, in addition to facilitating communication and appointment booking requests.",
          ar: "يهدف الموقع إلى تقديم معلومات تعريفية وتثقيفية عن خدمات الدكتور أيمن طارق في مجال جراحات المخ والأعصاب والعمود الفقري، بالإضافة إلى تسهيل التواصل وطلب حجز المواعيد.",
        },
      ],
    },
    {
      heading: { en: "Medical Content", ar: "المحتوى الطبي" },
      body: [
        {
          en: "All information published on the website is for health awareness and educational purposes only, and is not a substitute for diagnosis, medical consultation, or treatment by a specialized physician.",
          ar: "جميع المعلومات المنشورة على الموقع هي لأغراض التوعية والتثقيف الصحي فقط، ولا تُعد بديلًا عن التشخيص أو الاستشارة الطبية أو العلاج لدى طبيب مختص.",
        },
      ],
    },
    {
      heading: { en: "Appointment Booking", ar: "حجز المواعيد" },
      body: [
        {
          en: "Submitting a booking request through the website does not constitute final confirmation of the appointment; the appointment remains subject to confirmation by the clinic's administration according to available time slots.",
          ar: "إرسال طلب الحجز عبر الموقع لا يعني تأكيد الموعد بشكل نهائي، ويظل الموعد خاضعًا لتأكيد إدارة العيادة وفقًا للمواعيد المتاحة.",
        },
      ],
    },
    {
      heading: { en: "User Responsibility", ar: "مسؤولية المستخدم" },
      body: [
        {
          en: "The user agrees to provide accurate and up-to-date information when using the contact or booking forms, and bears responsibility for the accuracy of the data provided.",
          ar: "يلتزم المستخدم بتقديم معلومات صحيحة وحديثة عند استخدام نماذج التواصل أو الحجز، ويتحمل مسؤولية صحة البيانات المقدمة.",
        },
      ],
    },
    {
      heading: { en: "Intellectual Property", ar: "الملكية الفكرية" },
      body: [
        {
          en: "All text, images, designs, logos, and content published on the website are protected by intellectual property rights, and may not be copied, reused, or republished without obtaining prior written consent.",
          ar: "جميع النصوص والصور والتصميمات والشعارات والمحتوى المنشور على الموقع محمية بحقوق الملكية الفكرية، ولا يجوز نسخها أو إعادة استخدامها أو نشرها دون الحصول على موافقة كتابية مسبقة.",
        },
        {
          en: "Published content should not be relied upon to make medical decisions without consulting a physician.",
          ar: "ولا ينبغي الاعتماد على المحتوى المنشور لاتخاذ قرارات طبية دون استشارة الطبيب.",
        },
      ],
    },
    {
      heading: { en: "Limitation of Liability", ar: "حدود المسؤولية" },
      body: [
        {
          en: "Neither the website nor the clinic's administration bears any responsibility for:\n• Relying on published information instead of consulting a physician.\n• Any direct or indirect damages resulting from use of the website.\n• Website downtime or technical failures beyond its control.",
          ar: "لا يتحمل الموقع أو إدارة العيادة أي مسؤولية عن:\n• الاعتماد على المعلومات المنشورة بدلًا من استشارة الطبيب.\n• أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع.\n• توقف الموقع أو حدوث أعطال تقنية خارجة عن الإرادة.",
        },
      ],
    },
    {
      heading: { en: "External Links", ar: "الروابط الخارجية" },
      body: [
        {
          en: "The website may include links to other websites, and their use is at the user's own risk.",
          ar: "قد يتضمن الموقع روابط لمواقع أخرى، ويكون استخدامها على مسؤولية المستخدم.",
        },
      ],
    },
    {
      heading: { en: "Modification of Terms", ar: "تعديل الشروط" },
      body: [
        {
          en: "The website reserves the right to modify these Terms of Use at any time, and continued use of the website constitutes acceptance of the updated version.",
          ar: "يحتفظ الموقع بحق تعديل شروط الاستخدام في أي وقت، ويعد استمرار استخدام الموقع موافقة على النسخة المحدثة.",
        },
      ],
    },
    {
      heading: { en: "Governing Law", ar: "القانون الواجب التطبيق" },
      body: [
        {
          en: "These Terms are governed by the laws of the Arab Republic of Egypt, and Egyptian courts shall have exclusive jurisdiction over any dispute arising from use of the website.",
          ar: "تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتختص المحاكم المصرية بالفصل في أي نزاع ينشأ عن استخدام الموقع.",
        },
      ],
    },
    {
      heading: { en: "Purpose of the Content", ar: "الغرض من المحتوى" },
      body: [
        {
          en: "The content published on this website aims to provide general educational information about diseases and surgeries of the brain, nerves, and spine, and does not constitute a medical diagnosis or treatment.",
          ar: "يهدف المحتوى المنشور على هذا الموقع إلى تقديم معلومات تثقيفية عامة حول أمراض وجراحات المخ والأعصاب والعمود الفقري، ولا يُعد تشخيصًا أو علاجًا طبيًا.",
        },
      ],
    },
    {
      heading: { en: "No Treatment Relationship", ar: "عدم وجود علاقة علاجية" },
      body: [
        {
          en: "Using this website or submitting an inquiry through it does not establish a doctor-patient relationship, and is not considered a substitute for an in-person medical examination.",
          ar: "لا يؤدي استخدام هذا الموقع أو إرسال استفسار عبره إلى إنشاء علاقة طبيب ومريض، ولا يُعتبر بديلًا عن الكشف الطبي المباشر.",
        },
      ],
    },
    {
      heading: { en: "Emergency Cases", ar: "الحالات الطارئة" },
      body: [
        {
          en: "If you are experiencing acute neurological symptoms or a medical emergency, such as loss of consciousness, sudden weakness in the limbs, or a serious head injury, you should go immediately to the nearest hospital or call emergency services, and should not rely on the information published on the website.",
          ar: "إذا كنت تعاني من أعراض عصبية حادة أو حالة طبية طارئة، مثل فقدان الوعي أو ضعف مفاجئ بالأطراف أو إصابة خطيرة بالرأس، فيجب التوجه فورًا إلى أقرب مستشفى أو الاتصال بخدمات الطوارئ، وعدم الاعتماد على المعلومات المنشورة في الموقع.",
        },
      ],
    },
    {
      heading: { en: "Accuracy of Information", ar: "دقة المعلومات" },
      body: [
        {
          en: "We strive to provide accurate and up-to-date information; however, we do not guarantee that the content is free of errors or that all information will be suitable for every medical case.",
          ar: "نسعى إلى تقديم معلومات دقيقة ومحدثة، إلا أننا لا نضمن خلو المحتوى من الأخطاء أو أن جميع المعلومات ستكون مناسبة لكل حالة طبية.",
        },
      ],
    },
    {
      heading: { en: "User Responsibility", ar: "مسؤولية المستخدم" },
      body: [
        {
          en: "It is the user's responsibility to consult a specialized physician before making any medical or treatment decision based on the information published on the website.",
          ar: "تقع على المستخدم مسؤولية استشارة الطبيب المختص قبل اتخاذ أي قرار طبي أو علاجي بناءً على المعلومات المنشورة في الموقع.",
        },
      ],
    },
  ],
};
