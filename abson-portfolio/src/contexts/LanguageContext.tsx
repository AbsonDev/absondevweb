'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções
const translations = {
  pt: {
    // Header
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.skills': 'Skills',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'header.cta': 'Vamos conversar',
    
    // Hero Section
    'hero.greeting': 'Olá, eu sou',
    'hero.name': 'Abson',
    'hero.title': 'Desenvolvedor Full Stack',
    'hero.subtitle': 'Construindo soluções completas e de alta performance, do mobile com Flutter à nuvem com Azure.',
    'hero.cta': 'Ver Projetos',
    'hero.scroll': 'Role para baixo',
    'hero.available': 'Disponível para projetos',
    
    // About Section
    'about.title': 'Sobre Mim',
    'about.subtitle': 'Desenvolvedor apaixonado por tecnologia',
    'about.description': 'Sou um desenvolvedor Full Stack com experiência em desenvolvimento mobile, web e cloud. Especializado em Flutter, Angular, .NET Core, Next.js e Microsoft Azure.',
    'about.experience': 'Anos de Experiência',
    'about.projects': 'Projetos Concluídos',
    'about.clients': 'Clientes Satisfeitos',
    'about.passion': 'Paixão',
    'about.passion.desc': 'Por tecnologia e inovação',
    'about.focus': 'Foco',
    'about.focus.desc': 'Em resultados excepcionais',
    'about.quality': 'Qualidade',
    'about.quality.desc': 'Em cada linha de código',
    'about.experience.user': 'Experiência',
    'about.experience.user.desc': 'Do usuário em primeiro lugar',
    'about.available': 'Disponível para projetos',
    'about.location': 'Brasil',
    
    // Skills Section
    'skills.title': 'Minhas Skills',
    'skills.subtitle': 'Tecnologias que domino',
    'skills.frontend': 'Frontend & Mobile',
    'skills.backend': 'Backend & Cloud',
    'skills.database': 'Database & Tools',
    'skills.methodologies': 'Metodologias & Práticas',
    'skills.ai': 'AI Development Tools',
    
    // Projects Section
    'projects.title': 'Meus Projetos',
    'projects.subtitle': 'Alguns dos meus trabalhos',
    'projects.view': 'Ver Projeto',
    'projects.demo': 'Demo',
    'projects.code': 'Código',
    'projects.estoqueMax.title': 'EstoqueMax',
    'projects.estoqueMax.desc': 'Sistema de gestão de estoque com AI e realtime',
    'projects.portfolio.title': 'Portfolio Dinâmico',
    'projects.portfolio.desc': 'Portfolio moderno com animações avançadas',
    'projects.mobile.title': 'App Mobile',
    'projects.mobile.desc': 'Aplicativo cross-platform de alta performance',
    
    // Contact Section
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Pronto para transformar sua ideia em realidade? Vamos conversar!',
    'contact.work.together': 'Vamos trabalhar juntos!',
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.subject': 'Assunto',
    'contact.message': 'Mensagem',
    'contact.send': 'Enviar Mensagem',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensagem enviada com sucesso!',
    'contact.error': 'Erro ao enviar mensagem. Tente novamente.',
    'contact.whatsapp': 'WhatsApp',
    'contact.location': 'Localização',
    'contact.name.placeholder': 'Seu nome',
    'contact.email.placeholder': 'seu@email.com',
    'contact.subject.placeholder': 'Sobre o projeto...',
    'contact.message.placeholder': 'Conte-me sobre seu projeto...',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados',
    'footer.made': 'Feito com',
    'footer.by': 'por Abson',
    'footer.description': 'Transformando ideias em realidade digital com paixão e inovação.',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'header.cta': "Let's Talk",
    
    // Hero Section
    'hero.greeting': 'Hello, I am',
    'hero.name': 'Abson',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'Building complete and high-performance solutions, from mobile with Flutter to cloud with Azure.',
    'hero.cta': 'View Projects',
    'hero.scroll': 'Scroll down',
    'hero.available': 'Available for projects',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Developer passionate about technology',
    'about.description': 'I am a Full Stack developer with experience in mobile, web and cloud development. Specialized in Flutter, Angular, .NET Core, Next.js and Microsoft Azure.',
    'about.experience': 'Years of Experience',
    'about.projects': 'Completed Projects',
    'about.clients': 'Satisfied Clients',
    'about.passion': 'Passion',
    'about.passion.desc': 'For technology and innovation',
    'about.focus': 'Focus',
    'about.focus.desc': 'On exceptional results',
    'about.quality': 'Quality',
    'about.quality.desc': 'In every line of code',
    'about.experience.user': 'Experience',
    'about.experience.user.desc': 'User experience first',
    'about.available': 'Available for projects',
    'about.location': 'Brazil',
    
    // Skills Section
    'skills.title': 'My Skills',
    'skills.subtitle': 'Technologies I master',
    'skills.frontend': 'Frontend & Mobile',
    'skills.backend': 'Backend & Cloud',
    'skills.database': 'Database & Tools',
    'skills.methodologies': 'Methodologies & Practices',
    'skills.ai': 'AI Development Tools',
    
    // Projects Section
    'projects.title': 'My Projects',
    'projects.subtitle': 'Some of my work',
    'projects.view': 'View Project',
    'projects.demo': 'Demo',
    'projects.code': 'Code',
    'projects.estoqueMax.title': 'EstoqueMax',
    'projects.estoqueMax.desc': 'Inventory management system with AI and realtime',
    'projects.portfolio.title': 'Dynamic Portfolio',
    'projects.portfolio.desc': 'Modern portfolio with advanced animations',
    'projects.mobile.title': 'Mobile App',
    'projects.mobile.desc': 'High-performance cross-platform application',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to turn your idea into reality? Let\'s talk!',
    'contact.work.together': 'Let\'s work together!',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message. Try again.',
    'contact.whatsapp': 'WhatsApp',
    'contact.location': 'Location',
    'contact.name.placeholder': 'Your name',
    'contact.email.placeholder': 'your@email.com',
    'contact.subject.placeholder': 'About the project...',
    'contact.message.placeholder': 'Tell me about your project...',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.made': 'Made with',
    'footer.by': 'by Abson',
    'footer.description': 'Transforming ideas into digital reality with passion and innovation.',
  },
  de: {
    // Header
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.skills': 'Fähigkeiten',
    'nav.projects': 'Projekte',
    'nav.contact': 'Kontakt',
    'header.cta': 'Lass uns reden',
    
    // Hero Section
    'hero.greeting': 'Hallo, ich bin',
    'hero.name': 'Abson',
    'hero.title': 'Full Stack Entwickler',
    'hero.subtitle': 'Entwicklung kompletter und leistungsstarker Lösungen, vom Mobile mit Flutter bis zur Cloud mit Azure.',
    'hero.cta': 'Projekte ansehen',
    'hero.scroll': 'Nach unten scrollen',
    'hero.available': 'Verfügbar für Projekte',
    
    // About Section
    'about.title': 'Über mich',
    'about.subtitle': 'Entwickler mit Leidenschaft für Technologie',
    'about.description': 'Ich bin ein Full Stack Entwickler mit Erfahrung in Mobile-, Web- und Cloud-Entwicklung. Spezialisiert auf Flutter, Angular, .NET Core, Next.js und Microsoft Azure.',
    'about.experience': 'Jahre Erfahrung',
    'about.projects': 'Abgeschlossene Projekte',
    'about.clients': 'Zufriedene Kunden',
    'about.passion': 'Leidenschaft',
    'about.passion.desc': 'Für Technologie und Innovation',
    'about.focus': 'Fokus',
    'about.focus.desc': 'Auf außergewöhnliche Ergebnisse',
    'about.quality': 'Qualität',
    'about.quality.desc': 'In jeder Codezeile',
    'about.experience.user': 'Erfahrung',
    'about.experience.user.desc': 'Benutzererfahrung an erster Stelle',
    'about.available': 'Verfügbar für Projekte',
    'about.location': 'Brasilien',
    
    // Skills Section
    'skills.title': 'Meine Fähigkeiten',
    'skills.subtitle': 'Technologien, die ich beherrsche',
    'skills.frontend': 'Frontend & Mobile',
    'skills.backend': 'Backend & Cloud',
    'skills.database': 'Datenbank & Tools',
    'skills.methodologies': 'Methodologien & Praktiken',
    'skills.ai': 'KI-Entwicklungstools',
    
    // Projects Section
    'projects.title': 'Meine Projekte',
    'projects.subtitle': 'Einige meiner Arbeiten',
    'projects.view': 'Projekt ansehen',
    'projects.demo': 'Demo',
    'projects.code': 'Code',
    'projects.estoqueMax.title': 'EstoqueMax',
    'projects.estoqueMax.desc': 'Lagerverwaltungssystem mit KI und Echtzeit',
    'projects.portfolio.title': 'Dynamisches Portfolio',
    'projects.portfolio.desc': 'Modernes Portfolio mit fortschrittlichen Animationen',
    'projects.mobile.title': 'Mobile App',
    'projects.mobile.desc': 'Hochleistungs-Cross-Platform-Anwendung',
    
    // Contact Section
    'contact.title': 'Kontakt aufnehmen',
    'contact.subtitle': 'Bereit, Ihre Idee in die Realität umzusetzen? Lass uns reden!',
    'contact.work.together': 'Lass uns zusammenarbeiten!',
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.subject': 'Betreff',
    'contact.message': 'Nachricht',
    'contact.send': 'Nachricht senden',
    'contact.sending': 'Wird gesendet...',
    'contact.success': 'Nachricht erfolgreich gesendet!',
    'contact.error': 'Fehler beim Senden der Nachricht. Versuche es erneut.',
    'contact.whatsapp': 'WhatsApp',
    'contact.location': 'Standort',
    'contact.name.placeholder': 'Ihr Name',
    'contact.email.placeholder': 'ihre@email.com',
    'contact.subject.placeholder': 'Über das Projekt...',
    'contact.message.placeholder': 'Erzählen Sie mir von Ihrem Projekt...',
    
    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.made': 'Erstellt mit',
    'footer.by': 'von Abson',
    'footer.description': 'Ideen mit Leidenschaft und Innovation in digitale Realität verwandeln.',
  },
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'header.cta': 'Hablemos',
    
    // Hero Section
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Abson',
    'hero.title': 'Desarrollador Full Stack',
    'hero.subtitle': 'Construyendo soluciones completas y de alto rendimiento, desde móvil con Flutter hasta la nube con Azure.',
    'hero.cta': 'Ver Proyectos',
    'hero.scroll': 'Desplázate hacia abajo',
    'hero.available': 'Disponible para proyectos',
    
    // About Section
    'about.title': 'Sobre Mí',
    'about.subtitle': 'Desarrollador apasionado por la tecnología',
    'about.description': 'Soy un desarrollador Full Stack con experiencia en desarrollo móvil, web y en la nube. Especializado en Flutter, Angular, .NET Core, Next.js y Microsoft Azure.',
    'about.experience': 'Años de Experiencia',
    'about.projects': 'Proyectos Completados',
    'about.clients': 'Clientes Satisfechos',
    'about.passion': 'Pasión',
    'about.passion.desc': 'Por la tecnología y la innovación',
    'about.focus': 'Enfoque',
    'about.focus.desc': 'En resultados excepcionales',
    'about.quality': 'Calidad',
    'about.quality.desc': 'En cada línea de código',
    'about.experience.user': 'Experiencia',
    'about.experience.user.desc': 'Experiencia del usuario primero',
    'about.available': 'Disponible para proyectos',
    'about.location': 'Brasil',
    
    // Skills Section
    'skills.title': 'Mis Habilidades',
    'skills.subtitle': 'Tecnologías que domino',
    'skills.frontend': 'Frontend & Móvil',
    'skills.backend': 'Backend & Cloud',
    'skills.database': 'Base de Datos & Herramientas',
    'skills.methodologies': 'Metodologías & Prácticas',
    'skills.ai': 'Herramientas de Desarrollo IA',
    
    // Projects Section
    'projects.title': 'Mis Proyectos',
    'projects.subtitle': 'Algunos de mis trabajos',
    'projects.view': 'Ver Proyecto',
    'projects.demo': 'Demo',
    'projects.code': 'Código',
    'projects.estoqueMax.title': 'EstoqueMax',
    'projects.estoqueMax.desc': 'Sistema de gestión de inventario con IA y tiempo real',
    'projects.portfolio.title': 'Portfolio Dinámico',
    'projects.portfolio.desc': 'Portfolio moderno con animaciones avanzadas',
    'projects.mobile.title': 'App Móvil',
    'projects.mobile.desc': 'Aplicación cross-platform de alto rendimiento',
    
    // Contact Section
    'contact.title': 'Ponte en Contacto',
    'contact.subtitle': '¿Listo para convertir tu idea en realidad? ¡Hablemos!',
    'contact.work.together': '¡Trabajemos juntos!',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Mensaje enviado con éxito!',
    'contact.error': 'Error al enviar mensaje. Inténtalo de nuevo.',
    'contact.whatsapp': 'WhatsApp',
    'contact.location': 'Ubicación',
    'contact.name.placeholder': 'Tu nombre',
    'contact.email.placeholder': 'tu@email.com',
    'contact.subject.placeholder': 'Sobre el proyecto...',
    'contact.message.placeholder': 'Cuéntame sobre tu proyecto...',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.made': 'Hecho con',
    'footer.by': 'por Abson',
    'footer.description': 'Transformando ideas en realidad digital con pasión e innovación.',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Carregar idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt', 'en', 'de', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Atualizar o atributo lang do HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 