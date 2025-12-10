import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { translations } from '../../language/translations';

const Footer: React.FC = () => {
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const t = translations[currentLanguage].footer;

  

  return (
    <footer className='bg-gray-900 text-white mt-16'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          
<span>...</span>
         
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>
            &copy; {new Date().getFullYear()} Wine Calculator. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
