import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'am' | 'om' | 'ti';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    greeting_morning: "Good Morning",
    greeting_afternoon: "Good Afternoon",
    greeting_evening: "Good Evening",
    continue_listening: "Continue Listening",
    made_for_you: "Made For You",
    trending: "Trending in Ethiopia",
    new_releases: "New Releases",
    because_you_listened: "Because you listened to",
    mood_mixes: "Mood Mixes",
    home: "Home",
    search: "Search",
    library: "Your Library",
    settings: "Settings",
    notifications: "Notifications",
    follow: "Follow",
    following: "Following",
    shuffle_play: "Shuffle Play",
    play: "Play",
    listeners: "Listeners",
    songs: "Songs",
    get_premium: "Get Premium",
    premium_title: "Unlock the full experience",
    wrapped_banner: "Your 2024 Wrapped is here",
    wrapped_subtitle: "See your year in music.",
    top_artists: "Top Artists",
    top_songs: "Top Songs",
    minutes_listened: "Minutes Listened",
    share_stats: "Share Stats",
    plan_free: "Free Plan",
    plan_premium: "Premium Plan",
    ad_free: "Ad-free listening",
    offline_mode: "Offline playback",
    high_quality: "High quality audio",
    subscribe: "Subscribe",
    current_plan: "Current Plan"
  },
  am: {
    greeting_morning: "እንደምን አደሩ",
    greeting_afternoon: "እንደምን ዋሉ",
    greeting_evening: "እንደምን አመሹ",
    continue_listening: "ማዳመጥ ይቀጥሉ",
    made_for_you: "ለርስዎ የተመረጡ",
    trending: "በኢትዮጵያ ተወዳጅ የሆኑ",
    new_releases: "አዳዲስ የተለቀቁ",
    because_you_listened: "ይህን ስለሰሙ",
    mood_mixes: "የስሜት ሙዚቃዎች",
    home: "መነሻ",
    search: "ፈልግ",
    library: "ቤተ-መጽሐፍት",
    settings: "ምርጫዎች",
    notifications: "መልዕክቶች",
    follow: "ተከተል",
    following: "እየተከተሉ ነው",
    shuffle_play: "ቀላቅለህ አጫውት",
    play: "አጫውት",
    listeners: "አድማጮች",
    songs: "ሙዚቃዎች",
    get_premium: "ፕሪሚየም ይግዙ",
    premium_title: "ሙሉ አገልግሎቱን ያግኙ",
    wrapped_banner: "የ2024 ሙዚቃዎ",
    wrapped_subtitle: "የዓመቱን እንቅስቃሴ ይመልከቱ",
    top_artists: "ምርጥ አርቲስቶች",
    top_songs: "ምርጥ ሙዚቃዎች",
    minutes_listened: "የተደመጡ ደቂቃዎች",
    share_stats: "ያጋሩ",
    plan_free: "ነፃ",
    plan_premium: "ፕሪሚየም",
    ad_free: "ያለ ማስታወቂያ",
    offline_mode: "ያለ ኢንተርኔት",
    high_quality: "ከፍተኛ ጥራት",
    subscribe: "ይመዝገቡ",
    current_plan: "የአሁኑ ዕቅድ"
  },
  om: {
    greeting_morning: "Akkam Bultan",
    greeting_afternoon: "Akkam Ooltan",
    greeting_evening: "Akkam Galatooman",
    continue_listening: "Dhaggeeffachuu Itti Fufaa",
    made_for_you: "Isiniif Kan Qophaa'e",
    trending: "Itoophiyaa Keessatti Jaallatamaa",
    new_releases: "Haaraa Gadhiifaman",
    because_you_listened: "Waan Kana Dhaggeeffattaniif",
    mood_mixes: "Miirota Gargaraa",
    home: "Man'ee",
    search: "Barbaadi",
    library: "Kuusaa Keessan",
    settings: "Qindoomina",
    notifications: "Beeksisa",
    follow: "Hordofaa",
    following: "Hordofaa Jirta",
    shuffle_play: "Makaa Tapha",
    play: "Taphadhu",
    listeners: "Dhaggeeffattoota",
    songs: "Weelluu",
    get_premium: "Premium Argadhu",
    premium_title: "Muuxannoo Guutuu",
    wrapped_banner: "Bara 2024 Keessan",
    wrapped_subtitle: "Muuziqaa bara kanaa",
    top_artists: "Weellistoota Filatamo",
    top_songs: "Weelluuwwan Filatamo",
    minutes_listened: "Daqiiqaa Dhaggeeffatame",
    share_stats: "Qoodaa",
    plan_free: "Bilisa",
    plan_premium: "Kaffaltii",
    ad_free: "Beeksisa Malee",
    offline_mode: "Interneeta Malee",
    high_quality: "Qulqullina Olaanaa",
    subscribe: "Galmaa'aa",
    current_plan: "Karoora Ammaa"
  },
  ti: {
    greeting_morning: "ከመይ ሓዲርኩም",
    greeting_afternoon: "ከመይ ውዒልኩም",
    greeting_evening: "ከመይ ኣምሲኹም",
    continue_listening: "ምስማዕ ቀጽሉ",
    made_for_you: "ንዓኻትኩም ዝተዳለወ",
    trending: "ኣብ ኢትዮጵያ ፍሉጣት",
    new_releases: "ሓደስቲ ዝወጹ",
    because_you_listened: "እዚ ስለዝሰማዕኩም",
    mood_mixes: "ናይ ስሜት ሙዚቃታት",
    home: "መበገሲ",
    search: "ድለይ",
    library: "ቤተ-መጽሓፍት",
    settings: "ምርጫታት",
    notifications: "መፍለጥታ",
    follow: "ስዕብ",
    following: "ትስዕቦ ኣለኻ",
    shuffle_play: "ሓዋዊስካ ኣጫውት",
    play: "ኣጫውት",
    listeners: "ሰምዕቲ",
    songs: "ሙዚቃታት",
    get_premium: "ፕሪሚየም ውሰድ",
    premium_title: "ምሉእ ተሞክሮ",
    wrapped_banner: "ናይ 2024 ሙዚቃኻ",
    wrapped_subtitle: "ናይ ዓመት ጸብጻብ",
    top_artists: "ምርጥ አርቲስቶች",
    top_songs: "ምርጥ ሙዚቃዎች",
    minutes_listened: "ዝሰማዕካዮ ደቂቃ",
    share_stats: "አካፍል",
    plan_free: "ናጻ",
    plan_premium: "ፕሪሚየም",
    ad_free: "ብዘይ ማስታወቂያ",
    offline_mode: "ብዘይ ኢንተርኔት",
    high_quality: "ጽሬት ዘለዎ",
    subscribe: "ተመዝገብ",
    current_plan: "ህሉው ትልሚ"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const dir = language === 'am' || language === 'ti' ? 'ltr' : 'ltr'; // Amharic/Tigrinya are LTR scripts visually, though logically Semitic. Keeping LTR for UI consistency unless Arabic is added.

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};