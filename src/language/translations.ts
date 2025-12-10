import type { Language } from './languageSlice';


interface NavTranslations {
  bestseller: string;
  fiction: string;
  nonFiction: string; 
  children: string;
  ebooks: string;
  audioBooks: string;
  gifts: string;
  sale: string;
}

interface FooterTranslations {
  description: string;
  rights: string;
  links: {
    shop: {
      title: string;
      allBooks: string;
      newReleases: string;
      bestsellers: string;
    };
    help: {
      title: string;
      contactUs: string;
      shipping: string;
      returns: string;
    };
    company: {
      title:string;
      aboutUs: string;
      careers: string;
      privacyPolicy: string;
    };
  };
}

interface LanguageTranslations {
  promo: string;
  storeLocator: string;
  helpContact: string;
  searchPlaceholder: string;
  newReleases: string;
  subscribe: string;
  menu: string;
  more: string;
  nav: NavTranslations;
  footer: FooterTranslations;
}

export const translations: Record<Language, LanguageTranslations> = {
  ru: {
    promo: 'Бесплатная доставка для заказов от €25',
    storeLocator: 'Найти магазин',
    helpContact: 'Помощь и контакты',
    searchPlaceholder: 'Искать книги, авторов, ISBN...',
    newReleases: 'Новинки',
    subscribe: 'Подписаться',
    menu: 'Меню',
    more: 'Еще',
    nav: {
      bestseller: 'Бестселлеры',
      fiction: 'Художественная',
      nonFiction: 'Нон-фикшн',
      children: 'Детям',
      ebooks: 'Эл. книги',
      audioBooks: 'Аудиокниги',
      gifts: 'Подарки',
      sale: 'Распродажа',
    },
    footer: {
      description: 'Ваш любимый книжный интернет-магазин. Откройте для себя миллионы книг с бесплатной доставкой по всему миру.',
      rights: 'Все права защищены.',
      links: {
        shop: {
          title: 'Магазин',
          allBooks: 'Все книги',
          newReleases: 'Новинки',
          bestsellers: 'Бестселлеры',
        },
        help: {
          title: 'Помощь',
          contactUs: 'Связаться с нами',
          shipping: 'Доставка',
          returns: 'Возвраты',
        },
        company: {
          title: 'Компания',
          aboutUs: 'О нас',
          careers: 'Карьера',
          privacyPolicy: 'Политика конфиденциальности',
        },
      },
    },
  },
  en: {
    promo: 'Free shipping on orders over €25',
    storeLocator: 'Store Locator',
    helpContact: 'Help & Contact',
    searchPlaceholder: 'Search books, authors, ISBN...',
    newReleases: 'New Releases',
    subscribe: 'Subscribe',
    menu: 'Menu',
    more: 'More',
    nav: {
      bestseller: 'Bestseller',
      fiction: 'Fiction',
      nonFiction: 'Non-Fiction',
      children: 'Children',
      ebooks: 'eBooks',
      audioBooks: 'Audio Books',
      gifts: 'Gifts',
      sale: 'Sale',
    },
    footer: {
      description: 'Your favorite online bookstore. Discover millions of books with free shipping worldwide.',
      rights: 'All rights reserved.',
      links: {
        shop: {
          title: 'Shop',
          allBooks: 'All Books',
          newReleases: 'New Releases',
          bestsellers: 'Bestsellers',
        },
        help: {
          title: 'Help',
          contactUs: 'Contact Us',
          shipping: 'Shipping',
          returns: 'Returns',
        },
        company: {
          title: 'Company',
          aboutUs: 'About Us',
          careers: 'Careers',
          privacyPolicy: 'Privacy Policy',
        },
      },
    },
  },
  de: {
    promo: 'Kostenloser Versand bei Bestellungen über 25 €',
    storeLocator: 'Filialfinder',
    helpContact: 'Hilfe & Kontakt',
    searchPlaceholder: 'Suche nach Büchern, Autoren, ISBN...',
    newReleases: 'Neuerscheinungen',
    subscribe: 'Abonnieren',
    menu: 'Menü',
    more: 'Mehr',
    nav: {
      bestseller: 'Bestseller',
      fiction: 'Belletristik',
      nonFiction: 'Sachbücher',
      children: 'Kinder',
      ebooks: 'eBooks',
      audioBooks: 'Hörbücher',
      gifts: 'Geschenke',
      sale: 'im Angebot', 
    },
    footer: {
      description: 'Ihr liebster Online-Buchladen. Entdecken Sie Millionen von Büchern mit kostenlosem Versand weltweit.',
      rights: 'Alle Rechte vorbehalten.',
      links: {
        shop: {
          title: 'Shop',
          allBooks: 'Alle Bücher',
          newReleases: 'Neuerscheinungen',
          bestsellers: 'Bestseller',
        },
        help: {
          title: 'Hilfe',
          contactUs: 'Kontakt',
          shipping: 'Versand',
          returns: 'Rücksendungen',
        },
        company: {
          title: 'Unternehmen',
          aboutUs: 'Über uns',
          careers: 'Karriere',
          privacyPolicy: 'Datenschutzrichtlinie',
        },
      },
    },
  },
};