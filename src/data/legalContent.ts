/** Placeholder copy for the Privacy Policy and Terms of Service pages —
 * generic, clearly-structured boilerplate so the pages are fully built and
 * presentable now, to be replaced with the client's final legal text
 * (Arabic first, per their request) without any further layout changes. */

export interface LegalPageData {
  title: { en: string; ar: string };
  lastUpdated: { en: string; ar: string };
  intro: { en: string; ar: string };
  sections: { heading: { en: string; ar: string }; body: { en: string; ar: string }[] }[];
}

export const privacyPolicyContent: LegalPageData = {
  title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  lastUpdated: { en: "Last updated: [date]", ar: "آخر تحديث: [التاريخ]" },
  intro: {
    en: "This Privacy Policy explains how Dr. Ayman Tarek's clinic collects, uses, and protects the personal information of visitors to this website and patients who contact us. Placeholder text — final legal content to follow.",
    ar: "توضح سياسة الخصوصية هذه كيفية جمع عيادة د. أيمن طارق لبياناتك الشخصية واستخدامها وحمايتها، سواء كنت زائرًا لهذا الموقع أو مريضًا تواصل معنا. هذا نص مبدئي وسيتم استبداله بالمحتوى القانوني النهائي.",
  },
  sections: [
    {
      heading: { en: "Information We Collect", ar: "المعلومات التي نجمعها" },
      body: [
        {
          en: "We may collect information you provide directly, such as your name, phone number, email address, and the details of your inquiry when you submit a contact or appointment request form.",
          ar: "قد نقوم بجمع المعلومات التي تقدمها مباشرة، مثل الاسم ورقم الهاتف والبريد الإلكتروني وتفاصيل طلبك عند تعبئة نموذج التواصل أو حجز الموعد.",
        },
        {
          en: "We may also collect limited technical information automatically, such as browser type and general usage patterns, to help us maintain and improve the website.",
          ar: "قد نقوم أيضًا بجمع بعض المعلومات التقنية تلقائيًا، مثل نوع المتصفح وأنماط الاستخدام العامة، لمساعدتنا في صيانة الموقع وتحسينه.",
        },
      ],
    },
    {
      heading: { en: "How We Use Your Information", ar: "كيفية استخدام معلوماتك" },
      body: [
        {
          en: "Information you share with us is used to respond to your inquiries, schedule and manage appointments, and communicate with you about your care.",
          ar: "تُستخدم المعلومات التي تشاركها معنا للرد على استفساراتك وجدولة المواعيد وإدارتها والتواصل معك بخصوص رعايتك الصحية.",
        },
        {
          en: "We do not sell your personal information to third parties.",
          ar: "لا نقوم ببيع بياناتك الشخصية لأي جهة خارجية.",
        },
      ],
    },
    {
      heading: { en: "Data Security", ar: "أمان البيانات" },
      body: [
        {
          en: "We take reasonable technical and organizational measures to protect the information you share with us against unauthorized access, loss, or misuse.",
          ar: "نتخذ إجراءات تقنية وتنظيمية معقولة لحماية المعلومات التي تشاركها معنا من الوصول غير المصرح به أو الفقدان أو سوء الاستخدام.",
        },
      ],
    },
    {
      heading: { en: "Cookies", ar: "ملفات تعريف الارتباط (Cookies)" },
      body: [
        {
          en: "This website may use cookies and similar technologies to support basic functionality and to understand how the site is used.",
          ar: "قد يستخدم هذا الموقع ملفات تعريف الارتباط وتقنيات مشابهة لدعم الوظائف الأساسية وفهم كيفية استخدام الموقع.",
        },
      ],
    },
    {
      heading: { en: "Your Rights", ar: "حقوقك" },
      body: [
        {
          en: "You may contact us at any time to ask what information we hold about you, to request a correction, or to request that it be deleted.",
          ar: "يمكنك التواصل معنا في أي وقت للاستفسار عن البيانات التي نحتفظ بها عنك، أو طلب تصحيحها، أو طلب حذفها.",
        },
      ],
    },
    {
      heading: { en: "Contact Us", ar: "تواصل معنا" },
      body: [
        {
          en: "If you have any questions about this Privacy Policy, please reach out using the contact details on our Contact page.",
          ar: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر بيانات الاتصال الموجودة في صفحة تواصل معنا.",
        },
      ],
    },
  ],
};

export const termsOfServiceContent: LegalPageData = {
  title: { en: "Terms of Service", ar: "شروط الخدمة" },
  lastUpdated: { en: "Last updated: [date]", ar: "آخر تحديث: [التاريخ]" },
  intro: {
    en: "These Terms of Service govern your use of this website. Placeholder text — final legal content to follow.",
    ar: "تحكم شروط الخدمة هذه استخدامك لهذا الموقع الإلكتروني. هذا نص مبدئي وسيتم استبداله بالمحتوى القانوني النهائي.",
  },
  sections: [
    {
      heading: { en: "Acceptance of Terms", ar: "قبول الشروط" },
      body: [
        {
          en: "By accessing or using this website, you agree to be bound by these Terms of Service.",
          ar: "من خلال الوصول إلى هذا الموقع أو استخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه.",
        },
      ],
    },
    {
      heading: { en: "Use of This Website", ar: "استخدام هذا الموقع" },
      body: [
        {
          en: "This website is provided for general informational purposes about Dr. Ayman Tarek's practice and services. You agree to use it only for lawful purposes.",
          ar: "يُقدَّم هذا الموقع لأغراض إعلامية عامة حول عيادة د. أيمن طارق وخدماتها. أنت توافق على استخدامه للأغراض المشروعة فقط.",
        },
      ],
    },
    {
      heading: { en: "Medical Disclaimer", ar: "إخلاء مسؤولية طبي" },
      body: [
        {
          en: "The content on this website is for general information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician regarding any medical condition.",
          ar: "المحتوى الموجود في هذا الموقع لأغراض معلوماتية عامة فقط وليس بديلاً عن الاستشارة الطبية أو التشخيص أو العلاج المتخصص. يُرجى دائمًا استشارة طبيب مؤهل بخصوص أي حالة صحية.",
        },
      ],
    },
    {
      heading: { en: "Appointments & Cancellations", ar: "المواعيد والإلغاء" },
      body: [
        {
          en: "Appointment requests submitted through this website are subject to confirmation by our patient coordination team.",
          ar: "طلبات الحجز المُقدَّمة عبر هذا الموقع تخضع لتأكيد فريق تنسيق المرضى لدينا.",
        },
      ],
    },
    {
      heading: { en: "Intellectual Property", ar: "الملكية الفكرية" },
      body: [
        {
          en: "All content on this website, including text and images, is the property of Dr. Ayman Tarek's clinic unless otherwise noted, and may not be reproduced without permission.",
          ar: "جميع المحتويات الموجودة في هذا الموقع، بما في ذلك النصوص والصور، هي ملك لعيادة د. أيمن طارق ما لم يُذكر خلاف ذلك، ولا يجوز إعادة نشرها دون إذن.",
        },
      ],
    },
    {
      heading: { en: "Limitation of Liability", ar: "حدود المسؤولية" },
      body: [
        {
          en: "To the fullest extent permitted by law, the clinic is not liable for any indirect or incidental damages arising from your use of this website.",
          ar: "إلى أقصى حد يسمح به القانون، لا تتحمل العيادة أي مسؤولية عن أضرار غير مباشرة أو عرضية تنشأ عن استخدامك لهذا الموقع.",
        },
      ],
    },
    {
      heading: { en: "Governing Law", ar: "القانون الحاكم" },
      body: [
        {
          en: "These Terms are governed by the laws of the Arab Republic of Egypt.",
          ar: "تخضع شروط الخدمة هذه لقوانين جمهورية مصر العربية.",
        },
      ],
    },
    {
      heading: { en: "Contact Us", ar: "تواصل معنا" },
      body: [
        {
          en: "If you have any questions about these Terms of Service, please reach out using the contact details on our Contact page.",
          ar: "إذا كانت لديك أي أسئلة حول شروط الخدمة هذه، يرجى التواصل معنا عبر بيانات الاتصال الموجودة في صفحة تواصل معنا.",
        },
      ],
    },
  ],
};
