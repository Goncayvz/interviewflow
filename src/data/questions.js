export const questions = [
  {
    id: 1,
    category: "React",
    difficulty: "Easy",

    question: {
      en: "What is JSX?",
      tr: "JSX nedir?",
    },

    answer: {
      en: "JSX is a syntax extension for JavaScript that allows developers to write HTML-like code inside React components.",
      tr: "JSX, geliştiricilerin React bileşenleri içinde HTML benzeri kod yazmasını sağlayan bir JavaScript sözdizimi uzantısıdır.",
    },
  },

  {
    id: 2,
    category: "React",
    difficulty: "Medium",

    question: {
      en: "What is the difference between props and state?",
      tr: "Props ve state arasındaki fark nedir?",
    },

    answer: {
      en: "Props are read-only data passed from parent to child components, while state is managed inside a component and can change over time.",
      tr: "Props, parent componentten child componente aktarılan salt okunur verilerdir. State ise component içinde yönetilir ve zamanla değişebilir.",
    },
  },

  {
    id: 3,
    category: "JavaScript",
    difficulty: "Easy",

    question: {
      en: "What is the difference between let, const and var?",
      tr: "let, const ve var arasındaki fark nedir?",
    },

    answer: {
      en: "var is function-scoped, while let and const are block-scoped. const cannot be reassigned.",
      tr: "var function scoped çalışırken, let ve const block scoped çalışır. const yeniden atanamaz.",
    },
  },

  {
    id: 4,
    category: "JavaScript",
    difficulty: "Medium",

    question: {
      en: "What is a closure?",
      tr: "Closure nedir?",
    },

    answer: {
      en: "A closure is when a function remembers variables from its outer scope even after that scope has finished executing.",
      tr: "Closure, bir fonksiyonun dış scope içindeki değişkenleri scope bittikten sonra bile hatırlamasıdır.",
    },
  },

  {
    id: 5,
    category: "HTML/CSS",
    difficulty: "Easy",

    question: {
      en: "What is semantic HTML?",
      tr: "Semantic HTML nedir?",
    },

    answer: {
      en: "Semantic HTML uses meaningful tags such as header, main, section, article and footer to describe page structure.",
      tr: "Semantic HTML, sayfa yapısını açıklamak için header, main, section, article ve footer gibi anlamlı etiketler kullanır.",
    },
  },

  {
    id: 6,
    category: "HTML/CSS",
    difficulty: "Medium",

    question: {
      en: "What is the difference between flexbox and grid?",
      tr: "Flexbox ve Grid arasındaki fark nedir?",
    },

    answer: {
      en: "Flexbox is mainly for one-dimensional layouts, while CSS Grid is designed for two-dimensional layouts.",
      tr: "Flexbox tek boyutlu düzenler için kullanılırken, CSS Grid iki boyutlu düzenler için tasarlanmıştır.",
    },
  },

  {
    id: 7,
    category: "React",
    difficulty: "Hard",

    question: {
      en: "What is reconciliation in React?",
      tr: "Reactte reconciliation nedir?",
    },

    answer: {
      en: "Reconciliation is the process React uses to compare the previous virtual DOM with the new virtual DOM and update only the changed parts of the real DOM.",
      tr: "Reconciliation, Reactin eski virtual DOM ile yeni virtual DOMu karşılaştırıp sadece değişen kısımları gerçek DOMda güncelleme sürecidir.",
    },
  },

  {
    id: 8,
    category: "React",
    difficulty: "Hard",

    question: {
      en: "How can you prevent unnecessary re-renders in React?",
      tr: "Reactte gereksiz yeniden renderlar nasıl önlenir?",
    },

    answer: {
      en: "You can prevent unnecessary re-renders by using React.memo, useMemo, useCallback, proper state structure and avoiding unnecessary prop changes.",
      tr: "React.memo, useMemo, useCallback kullanarak ve gereksiz prop değişikliklerinden kaçınarak gereksiz renderlar önlenebilir.",
    },
  },

  {
    id: 9,
    category: "JavaScript",
    difficulty: "Hard",

    question: {
      en: "What is the event loop in JavaScript?",
      tr: "JavaScriptte event loop nedir?",
    },

    answer: {
      en: "The event loop manages asynchronous operations by coordinating the call stack, callback queue, microtask queue and browser APIs.",
      tr: "Event loop; call stack, callback queue, microtask queue ve browser APIlerini yöneterek asynchronous işlemleri kontrol eder.",
    },
  },

  {
    id: 10,
    category: "JavaScript",
    difficulty: "Hard",

    question: {
      en: "What is the difference between debounce and throttle?",
      tr: "Debounce ve throttle arasındaki fark nedir?",
    },

    answer: {
      en: "Debounce delays execution until after a period of inactivity, while throttle limits execution to once within a fixed time interval.",
      tr: "Debounce belirli süre işlem yapılmadığında çalışır. Throttle ise işlemi belirli aralıklarla sınırlar.",
    },
  },

  {
    id: 11,
    category: "HTML/CSS",
    difficulty: "Hard",

    question: {
      en: "How does CSS specificity work?",
      tr: "CSS specificity nasıl çalışır?",
    },

    answer: {
      en: "CSS specificity determines which style rule is applied when multiple rules target the same element.",
      tr: "CSS specificity, birden fazla stil aynı elementi hedeflediğinde hangi stilin uygulanacağını belirler.",
    },
  },

  {
    id: 12,
    category: "HTML/CSS",
    difficulty: "Hard",

    question: {
      en: "What are critical rendering path optimizations?",
      tr: "Critical rendering path optimizasyonları nelerdir?",
    },

    answer: {
      en: "Critical rendering path optimizations improve page loading by reducing render-blocking resources and optimizing CSS and JavaScript delivery.",
      tr: "Critical rendering path optimizasyonları; render-blocking kaynakları azaltarak CSS ve JavaScript yüklenmesini optimize eder.",
    },
  },
];