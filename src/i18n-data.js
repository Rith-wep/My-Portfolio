export const languages = [
  { code: 'en', flag: '🇺🇸', flagUrl: 'https://flagcdn.com/w40/us.png', short: 'EN' },
  { code: 'km', flag: '🇰🇭', flagUrl: 'https://flagcdn.com/w40/kh.png', short: 'ខ្មែរ' },
  { code: 'zh', flag: '🇨🇳', flagUrl: 'https://flagcdn.com/w40/cn.png', short: '中文' },
]

const projectDetails = {
  en: [
    {
      title: 'Math Vision',
      description:
        'Upload a math problem as an image and receive a clear, step-by-step solution generated with Gemini.',
      architecture: [
        'MERN application with image uploads',
        'Gemini-powered problem analysis',
        'Deployed with Cloudflare and Render',
      ],
    },
    {
      title: 'Scientia',
      description:
        'A full-stack knowledge platform deployed on AWS EC2, with a REST API and a repeatable server setup.',
      architecture: [
        'React frontend with a REST API',
        'Hosted on an AWS EC2 instance',
        'Linux-based deployment workflow',
      ],
    },
    {
      title: 'WorkCloud & Buy More E-Mart',
      description:
        'A business operations and e-commerce system with local payment support through KHQR and ABA PayWay.',
      architecture: [
        'Responsive React operations dashboard',
        'KHQR and ABA PayWay integration',
        'HMAC verification for payment requests',
      ],
    },
  ],
  km: [
    {
      title: 'Math Vision',
      description:
        'អាប់ឡូតរូបភាពលំហាត់គណិតវិទ្យា ដើម្បីទទួលបានដំណោះស្រាយយ៉ាងច្បាស់លាស់ជាជំហានៗដែលបង្កើតដោយ Gemini។',
      architecture: [
        'កម្មវិធី MERN ដែលមានមុខងារ Upload រូបភាព',
        'ការវិភាគលំហាត់ដោយប្រើ Gemini',
        'Deploy ជាមួយ Cloudflare និង Render',
      ],
    },
    {
      title: 'Scientia',
      description:
        'វេទិកាចែករំលែកចំណេះដឹង Full-stack ដែល Deploy លើ AWS EC2 ជាមួយ REST API និង Setup Server ដែលអាចប្រើឡើងវិញបាន។',
      architecture: [
        'React Frontend ជាមួយ REST API',
        'Host លើ AWS EC2 Instance',
        'Workflow ក្នុងការ Deploy លើ Linux',
      ],
    },
    {
      title: 'WorkCloud & Buy More E-Mart',
      description:
        'ប្រព័ន្ធប្រតិបត្តិការអាជីវកម្ម និង E-commerce ដែលគាំទ្រការទូទាត់ប្រាក់ក្នុងស្រុកតាមរយៈ KHQR និង ABA PayWay។',
      architecture: [
        'React Operations Dashboard ដែល Responsive',
        'ការភ្ជាប់ Integration ជាមួយ KHQR និង ABA PayWay',
        'ការផ្ទៀងផ្ទាត់ HMAC សម្រាប់ Request ទូទាត់ប្រាក់',
      ],
    },
  ],
  zh: [
    {
      title: 'Math Vision',
      description:
        '上传数学题目图片，即可获取由 Gemini 生成的清晰分步解题方案。',
      architecture: [
        '支持图片 Upload 的 MERN 应用',
        '基于 Gemini 的题目 Analysis',
        'Deploy 于 Cloudflare 和 Render',
      ],
    },
    {
      title: 'Scientia',
      description:
        'Deploy 在 AWS EC2 上的 Full-stack 知识平台，配备 REST API 与可复用的 Server Setup。',
      architecture: [
        'React Frontend 配合 REST API',
        'Host 于 AWS EC2 Instance',
        '基于 Linux 的 Deployment Workflow',
      ],
    },
    {
      title: 'WorkCloud & Buy More E-Mart',
      description:
        '涵盖业务运营与 E-commerce 的系统，支持 KHQR 及 ABA PayWay 本地支付。',
      architecture: [
        'Responsive 的 React Operations Dashboard',
        'Integration KHQR 与 ABA PayWay 支付',
        '针对 Payment Request 进行 HMAC 验证',
      ],
    },
  ],
}

export const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      available: 'Available for Hire',
      language: 'Choose language',
    },
    hero: {
      title: 'I build reliable web systems.',
      subtitle:
        "I'm a backend and DevOps engineer working with Java, Spring Boot, Node.js, AWS, and Cloudflare. I build APIs, deploy services, and keep production systems running reliably.",
      viewProjects: 'View Projects',
      getInTouch: 'Get in Touch',
      role: 'Backend & DevOps Engineer',
    },
    projects: {
      eyebrow: 'Selected projects',
      title: "A few things I've built.",
      summary:
        'Practical web products covering AI-assisted learning, cloud deployment, and local payment integrations.',
      featured: 'Featured project',
      details: 'Key details',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      browseAll: 'Browse all repositories',
      liveLabel: 'Open {{title}} live demo',
      sourceLabel: 'View {{title}} source code',
      items: projectDetails.en,
    },
    skills: {
      eyebrow: 'Skills & tools',
      title: 'Tools I work with.',
      categories: {
        languages: 'Languages & Frameworks',
        cloud: 'Cloud & Infrastructure',
        automation: 'CI/CD & Automation',
        security: 'Monitoring & Security',
        tools: 'Dev Tools',
        databases: 'Databases',
      },
      categoryEyebrows: {
        languages: 'Languages / Frameworks / Web',
        cloud: 'Infrastructure / Edge / Operations',
        automation: 'Delivery / Build / Scripting',
        security: 'Protection / Hosting / Operations',
        tools: 'Source / Testing / Editor',
        databases: 'Document / Relational / SQL',
      },
    },
    contact: {
      eyebrow: 'Have a project in mind?',
      title: "Let's talk about what you're building.",
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      emailCopied: 'Email copied',
      copyEmailLabel: 'Copy email address',
      online: 'Find me online',
      degree: 'B.Sc in Computer Science',
      university: 'University of Mumbai',
      country: 'India',
      rights: 'All rights reserved.',
    },
  },
  km: {
    nav: {
      home: 'ទំព័រដើម',
      projects: 'គម្រោង',
      skills: 'ជំនាញ',
      contact: 'ទំនាក់ទំនង',
      available: 'អាចទទួលការងារបាន',
      language: 'ជ្រើសរើសភាសា',
    },
    hero: {
      title: 'ខ្ញុំបង្កើតប្រព័ន្ធ Web\nដែលមានស្ថេរភាព និងទំនុកចិត្តខ្ពស់។',
      subtitle:
        'ខ្ញុំជា Backend & DevOps Engineer ដែលជំនាញលើ Java, Spring Boot, Node.js, AWS និង Cloudflare។ ខ្ញុំអភិវឌ្ឍ API, Deploy Services និងថែទាំប្រព័ន្ធ Production ឱ្យដំណើរការយ៉ាងរលូន។',
      viewProjects: 'មើលគម្រោង',
      getInTouch: 'ទាក់ទងមកខ្ញុំ',
      role: 'Backend & DevOps Engineer',
    },
    projects: {
      eyebrow: 'គម្រោងសំខាន់ៗ',
      title: 'ស្នាដៃមួយចំនួនដែលខ្ញុំបានបង្កើត។',
      summary:
        ' Web Products ជាក់ស្តែង គ្របដណ្តប់លើការរៀនសូត្រដោយជំនួយពី AI, Cloud Deployment និងការភ្ជាប់ Payment ក្នុងស្រុក។',
      featured: 'គម្រោងលេចធ្លោ',
      details: 'ព័ត៌មានលម្អិតសំខាន់ៗ',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      browseAll: 'មើល Repositories ទាំងអស់',
      liveLabel: 'មើល {{title}} Live Demo',
      sourceLabel: 'មើល {{title}} Source Code',
      items: projectDetails.km,
    },
    skills: {
      eyebrow: 'ជំនាញ និង Tools',
      title: 'Tools និងបច្ចេកវិទ្យាដែលខ្ញុំប្រើប្រាស់។',
      categories: {
        languages: 'Languages & Frameworks',
        cloud: 'Cloud & Infrastructure',
        automation: 'CI/CD & Automation',
        security: 'Monitoring & Security',
        tools: 'Dev Tools',
        databases: 'Databases',
      },
      categoryEyebrows: {
        languages: 'Languages / Frameworks / Web',
        cloud: 'Infrastructure / Edge / Operations',
        automation: 'Delivery / Build / Scripting',
        security: 'Protection / Hosting / Operations',
        tools: 'Source / Testing / Editor',
        databases: 'Document / Relational / SQL',
      },
    },
    contact: {
      eyebrow: 'មានគម្រោងក្នុងចិត្តមែនទេ?',
      title: 'តោះពិភាក្សាអំពីអ្វីដែលអ្នកកំពុងចង់បង្កើត។',
      copyEmail: 'Copy អ៊ីមែល',
      copied: 'បាន Copy!',
      emailCopied: 'បាន Copy អ៊ីមែល',
      copyEmailLabel: 'Copy អាសយដ្ឋានអ៊ីមែល',
      online: 'ប្រព័ន្ធបណ្តាញសង្គម',
      degree: 'បរិញ្ញាបត្រ វិទ្យាសាស្ត្រកុំព្យូទ័រ (B.Sc in Computer Science)',
      university: 'University of Mumbai',
      country: 'ប្រទេសឥណ្ឌា',
      rights: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
    },
  },
  zh: {
    nav: {
      home: '首页',
      projects: '项目',
      skills: '技能',
      contact: '联系方式',
      available: '随时可承接合作',
      language: '选择语言',
    },
    hero: {
      title: '我致力于构建高可靠性的 Web 系统。',
      subtitle:
        '我是一名 Backend & DevOps 工程师，熟练运用 Java、Spring Boot、Node.js、AWS 和 Cloudflare。我专注于 API 开发、服务部署以及保障生产环境系统的稳定运行。',
      viewProjects: '查看项目',
      getInTouch: '与我联系',
      role: 'Backend & DevOps 工程师',
    },
    projects: {
      eyebrow: '精选项目',
      title: '我的代表作品。',
      summary:
        '涵盖 AI 辅助学习、Cloud 部署以及本地 Payment 集成的实用 Web 产品。',
      featured: '特色项目',
      details: '核心要点',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      browseAll: '浏览所有 Repositories',
      liveLabel: '打开 {{title}} Live Demo',
      sourceLabel: '查看 {{title}} Source Code',
      items: projectDetails.zh,
    },
    skills: {
      eyebrow: '技能与工具',
      title: '我所使用的技术栈与工具。',
      categories: {
        languages: 'Languages & Frameworks',
        cloud: 'Cloud & Infrastructure',
        automation: 'CI/CD & Automation',
        security: 'Monitoring & Security',
        tools: 'Dev Tools',
        databases: 'Databases',
      },
      categoryEyebrows: {
        languages: 'Languages / Frameworks / Web',
        cloud: 'Infrastructure / Edge / Operations',
        automation: 'Delivery / Build / Scripting',
        security: 'Protection / Hosting / Operations',
        tools: 'Source / Testing / Editor',
        databases: 'Document / Relational / SQL',
      },
    },
    contact: {
      eyebrow: '有项目合作需求？',
      title: '聊聊你正在构建的产品。',
      copyEmail: '复制邮箱',
      copied: '已复制！',
      emailCopied: '邮箱地址已复制',
      copyEmailLabel: '复制邮箱地址',
      online: '社交平台与链接',
      degree: '计算机科学学士 (B.Sc in Computer Science)',
      university: 'University of Mumbai',
      country: '印度',
      rights: '保留所有权利。',
    },
  },
}
