import i18n from 'i18n';
import { resolve } from 'path';

import { SupportLanguage } from '../common/constants.js';

const configI18n = () => {
  i18n.configure({
    locales: Object.values(SupportLanguage),
    defaultLocale: SupportLanguage.VI,
    fallbacks: { [SupportLanguage.EN]: SupportLanguage.VI },
    directory: resolve('./src/locales'),
    objectNotation: true, // for hierarchical locale file
  });
};

export default configI18n;
