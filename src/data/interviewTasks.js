export const interviewTasks = [
  {
    id: 3001,
    category: "React",
    difficulty: "Easy",
    question: {
      en: "Task: Build a React counter component with increment, decrement, and reset buttons.",
      tr: "Task: Artirma, azaltma ve sifirlama butonlari olan bir React sayac componenti gelistir."
    },
    answer: {
      en: "Use useState for the count value, update state with event handlers, disable decrement at zero if required, and keep the component small and reusable.",
      tr: "Count degeri icin useState kullan, event handler'larla state'i guncelle, gerekiyorsa sifirda azaltmayi devre disi birak ve componenti kucuk, yeniden kullanilabilir tut."
    }
  },
  {
    id: 3002,
    category: "React",
    difficulty: "Easy",
    question: {
      en: "Task: Create a controlled login form with email and password inputs.",
      tr: "Task: Email ve sifre inputlari olan kontrollu bir login formu olustur."
    },
    answer: {
      en: "Store input values in React state, bind value and onChange, validate required fields on submit, and show clear feedback without refreshing the page.",
      tr: "Input degerlerini React state'inde tut, value ve onChange bagla, submit sirasinda zorunlu alanlari dogrula ve sayfayi yenilemeden net geri bildirim goster."
    }
  },
  {
    id: 3003,
    category: "React",
    difficulty: "Medium",
    question: {
      en: "Task: Fetch a list of users in React and support loading, error, and empty states.",
      tr: "Task: React'ta kullanici listesini fetch et ve loading, error, empty state durumlarini destekle."
    },
    answer: {
      en: "Use useEffect for the request, keep loading/error/data in state, clean up stale requests when needed, and render each UI state explicitly.",
      tr: "Istek icin useEffect kullan, loading/error/data bilgilerini state'te tut, gerektiginde eski istekleri temizle ve her UI durumunu acik sekilde render et."
    }
  },
  {
    id: 3004,
    category: "React",
    difficulty: "Medium",
    question: {
      en: "Task: Build a reusable modal component using React portals.",
      tr: "Task: React portal kullanarak yeniden kullanilabilir bir modal componenti gelistir."
    },
    answer: {
      en: "Render the modal into a portal root, close on backdrop or Escape, trap or manage focus, and expose props for title, content, and actions.",
      tr: "Modali bir portal root icine render et, backdrop veya Escape ile kapat, focus yonetimini yap ve title, content, actions icin prop'lar sun."
    }
  },
  {
    id: 3005,
    category: "React",
    difficulty: "Hard",
    question: {
      en: "Task: Optimize a slow React product list with search and filters.",
      tr: "Task: Arama ve filtreleri olan yavas bir React urun listesini optimize et."
    },
    answer: {
      en: "Profile first, reduce unnecessary state changes, memoize expensive derived data with useMemo, stabilize callbacks when useful, and virtualize long lists.",
      tr: "Once profil cikar, gereksiz state degisimlerini azalt, pahali turetilmis veriyi useMemo ile memoize et, faydaliysa callback'leri sabitle ve uzun listeleri virtualize et."
    }
  },
  {
    id: 3006,
    category: "JavaScript",
    difficulty: "Easy",
    question: {
      en: "Task: Write a function that groups an array of objects by a selected key.",
      tr: "Task: Obje dizisini secilen bir key'e gore gruplayan bir fonksiyon yaz."
    },
    answer: {
      en: "Iterate with reduce, read the requested key safely, initialize the group array when missing, and return an object keyed by group value.",
      tr: "reduce ile don, istenen key'i guvenli oku, eksikse grup dizisini baslat ve grup degerine gore key'lenmis bir obje dondur."
    }
  },
  {
    id: 3007,
    category: "JavaScript",
    difficulty: "Medium",
    question: {
      en: "Task: Implement debounce for a search input.",
      tr: "Task: Arama inputu icin debounce fonksiyonu implemente et."
    },
    answer: {
      en: "Return a wrapper function that clears the previous timeout, schedules the callback after the delay, and preserves arguments and this context.",
      tr: "Onceki timeout'u temizleyen, callback'i gecikmeden sonra planlayan ve argumanlari/this baglamini koruyan bir wrapper fonksiyon dondur."
    }
  },
  {
    id: 3008,
    category: "JavaScript",
    difficulty: "Medium",
    question: {
      en: "Task: Build a small promise-based retry helper for failed API calls.",
      tr: "Task: Basarisiz API cagrilari icin promise tabanli kucuk bir retry helper'i yaz."
    },
    answer: {
      en: "Accept a function, retry count, and delay; await each attempt, stop on success, wait before retrying, and throw the final error when attempts are exhausted.",
      tr: "Bir fonksiyon, retry sayisi ve gecikme al; her denemeyi await et, basarida dur, tekrar denemeden once bekle ve denemeler biterse son hatayi firlat."
    }
  },
  {
    id: 3009,
    category: "JavaScript",
    difficulty: "Hard",
    question: {
      en: "Task: Implement a lightweight event emitter with on, off, and emit methods.",
      tr: "Task: on, off ve emit metodlari olan hafif bir event emitter implemente et."
    },
    answer: {
      en: "Store listeners by event name, add callbacks with on, remove exact callbacks with off, and call current listeners with emit while avoiding mutation issues during iteration.",
      tr: "Listener'lari event adina gore sakla, on ile callback ekle, off ile ayni callback'i kaldir ve emit sirasinda iterasyon mutasyonu sorunlarindan kacin."
    }
  },
  {
    id: 3010,
    category: "HTML/CSS",
    difficulty: "Easy",
    question: {
      en: "Task: Create a responsive two-column card layout that becomes one column on mobile.",
      tr: "Task: Mobilde tek kolona dusen responsive iki kolonlu kart layout'u olustur."
    },
    answer: {
      en: "Use CSS Grid or Flexbox, define a mobile-first single-column layout, add a breakpoint for two columns, and keep spacing consistent.",
      tr: "CSS Grid veya Flexbox kullan, mobile-first tek kolon layout tanimla, iki kolon icin breakpoint ekle ve bosluklari tutarli tut."
    }
  },
  {
    id: 3011,
    category: "HTML/CSS",
    difficulty: "Medium",
    question: {
      en: "Task: Build an accessible tab component with HTML, CSS, and a small amount of JavaScript.",
      tr: "Task: HTML, CSS ve az miktarda JavaScript ile erisilebilir bir tab componenti gelistir."
    },
    answer: {
      en: "Use button elements, connect tabs and panels with ARIA attributes, manage selected state, hide inactive panels, and support keyboard navigation.",
      tr: "button elementleri kullan, tab ve panelleri ARIA attribute'lariyla bagla, secili durumu yonet, pasif panelleri gizle ve klavye navigasyonunu destekle."
    }
  },
  {
    id: 3012,
    category: "HTML/CSS",
    difficulty: "Hard",
    question: {
      en: "Task: Improve a page with poor Core Web Vitals caused by layout shifts and large images.",
      tr: "Task: Layout shift ve buyuk gorseller nedeniyle Core Web Vitals'i zayif olan bir sayfayi iyilestir."
    },
    answer: {
      en: "Set image dimensions or aspect ratios, serve optimized responsive images, lazy-load non-critical media, preload critical assets, and reserve space for dynamic content.",
      tr: "Gorsel boyutlari veya aspect-ratio belirle, optimize responsive gorseller sun, kritik olmayan medyayi lazy-load et, kritik asset'leri preload et ve dinamik icerik icin alan ayir."
    }
  },
  {
    id: 3013,
    category: "Algorithms",
    difficulty: "Easy",
    question: {
      en: "Task: Write a function that checks whether a string is a palindrome.",
      tr: "Task: Bir string'in palindrome olup olmadigini kontrol eden fonksiyon yaz."
    },
    answer: {
      en: "Normalize the string, compare characters from both ends with two pointers, and return false on the first mismatch.",
      tr: "String'i normalize et, iki pointer ile iki uctan karakterleri karsilastir ve ilk uyusmazlikta false dondur."
    }
  },
  {
    id: 3014,
    category: "Algorithms",
    difficulty: "Medium",
    question: {
      en: "Task: Given an array and a target, return the indices of two numbers that sum to the target.",
      tr: "Task: Bir array ve target verildiginde toplami target olan iki sayinin indexlerini dondur."
    },
    answer: {
      en: "Use a hash map from number to index, check the complement for each value, and return indices once a match is found in O(n) time.",
      tr: "Sayi-index icin hash map kullan, her deger icin complement'i kontrol et ve eslesme bulununca O(n) zamanda indexleri dondur."
    }
  },
  {
    id: 3015,
    category: "Algorithms",
    difficulty: "Medium",
    question: {
      en: "Task: Find the first non-repeating character in a string.",
      tr: "Task: Bir string'deki tekrar etmeyen ilk karakteri bul."
    },
    answer: {
      en: "Count character frequencies in one pass, then scan the string again and return the first character with frequency one.",
      tr: "Ilk geciste karakter frekanslarini say, sonra string'i tekrar tara ve frekansi bir olan ilk karakteri dondur."
    }
  },
  {
    id: 3016,
    category: "Algorithms",
    difficulty: "Hard",
    question: {
      en: "Task: Design an LRU cache with get and put operations.",
      tr: "Task: get ve put operasyonlari olan bir LRU cache tasarla."
    },
    answer: {
      en: "Use a hash map for O(1) lookup and a doubly linked list or ordered Map to track recency; move accessed items to the newest position and evict the oldest item when capacity is exceeded.",
      tr: "O(1) lookup icin hash map ve guncelligi takip etmek icin doubly linked list veya ordered Map kullan; erisilen item'i en yeni konuma tasi ve kapasite asilinca en eski item'i sil."
    }
  }
];
