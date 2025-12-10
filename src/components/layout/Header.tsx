import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  Close,
  FavoriteBorder,
  WineBar as WineBarIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translations } from '../../language/translations';
import { setLanguage } from '../../language/languageSlice';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  ) as Language;
  const t = translations[currentLanguage];  type Language = 'en' | 'de' | 'ru';
  

  const handleLanguageChange = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  const navigationItems = [
    { label: 'SR Rechner', path: '/sr auf||in' },
    { label: 'Alkohol-Umrechner', path: '/alc' },
    { label: 'Verschnitt Rechner', path: '/srCalc' },
  ];

  return (
    <>
      {/* Top Promo Bar */}
      <div className='bg-primary text-black py-2 px-10'>
        <div className='container-custom flex justify-between items-center'>
          <div className='flex items-center gap-2 text-sm'>
            <WineBarIcon className='w-4 h-4 text-red-700' />
            <span className='text-orange-500 mr-5'>Dmitri Nedioglo</span>
            <span className='text-yellow-500' >Fellbacher Weingärtner</span>
          </div>
          <div className='hidden md:flex items-center gap-4 text-sm'>
            {/* Language Switcher */}
            <div className='flex gap-2'>
              {(['en', 'de', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`uppercase font-medium ${
                    currentLanguage === lang
                      ? 'text-black'
                      : 'text-gray-300'
                  }`}
                  disabled={currentLanguage === lang}
                  style={{
                    cursor: currentLanguage === lang ? 'default' : 'pointer',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className='sticky top-0 z-50 bg-white shadow-md border-b border-gray-200'>
        <div className='container-custom'>
          <div className='flex flex-col md:flex-row gap-4 py-4'>
            {/* Top Row */}
            <div className='flex w-full items-center justify-between'>
              {/* Left: Menu & Logo */}
              <div className='flex items-center gap-4 md:gap-8'>
                <button
                  className='md:hidden p-2 hover:bg-gray-100 rounded-lg'
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  <MenuIcon />
                </button>

                <Link to='/' className='flex items-center gap-2 no-underline'>
                  <h1 className='text-2xl font-bold text-primary font-serif'>
                    Wine Calculator
                  </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex gap-6 ml-8 '>
                  {navigationItems.slice(0, 4).map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className='font-medium text-gray-700 hover:text-primary transition-colors hover:bg-yellow-100  p-2 rounded-lg '
                    >
                      {item.label}
                    </Link>
                  ))}
                 
                </nav>
              </div>

              {/* Right: Actions */}
              <div className='flex items-center gap-2 md:gap-4'>
                

                <button className='p-2 hover:bg-gray-100 rounded-lg'>
                  <FavoriteBorder />
                </button>

                

              </div>
            </div>

           
            
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className='fixed inset-0 z-50 md:hidden'>
            {/* Overlay */}
            <div
              className='absolute inset-0 bg-black/50'
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <div className='absolute left-0 top-0 h-full w-64 bg-white shadow-xl'>
              <div className='flex items-center justify-between p-4 border-b'>
                <h2 className='text-xl font-bold text-primary'>{t.menu}</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <Close />
                </button>
              </div>
              <nav className='p-4'>
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className='block py-3 px-2 hover:bg-yellow-100 rounded-lg transition-colors'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
