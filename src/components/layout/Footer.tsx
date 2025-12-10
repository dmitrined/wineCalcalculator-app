import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { translations } from '../../language/translations';

const Footer: React.FC = () => {
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const t = translations[currentLanguage].footer;

  const footerLinks = {
    [t.links.shop.title]: [
      { label: t.links.shop.allBooks, path: '/catalog' },
      { label: t.links.shop.newReleases, path: '/new' },
      { label: t.links.shop.bestsellers, path: '/bestsellers' },
    ],
    [t.links.help.title]: [
      { label: t.links.help.contactUs, path: '/contact' },
      { label: t.links.help.shipping, path: '/shipping' },
      { label: t.links.help.returns, path: '/returns' },
    ],
    [t.links.company.title]: [
      { label: t.links.company.aboutUs, path: '/about' },
      { label: t.links.company.careers, path: '/careers' },
      { label: t.links.company.privacyPolicy, path: '/privacy' },
    ],
  };

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
