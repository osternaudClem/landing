import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import theme from '../styled-components/theme';
import { ThemeContext } from '../contexts/ThemeContext';

const LocaleSwitchWrapper = styled('div')`
  color: ${({ $theme }) => theme[$theme].color};
  font-size: 1.4em;
  display: flex;
`;

const LocaleSwitchSeparator = styled('div')`
  margin: 0 10px;
`;

const ButtonActive = ({ $isActive }) =>
  $isActive
    ? css`
        filter: brightness(135%);
        border-bottom-color: currentColor;
      `
    : undefined;

const LocaleSwitchButton = styled('button')`
  background: transparent;
  border: 0;
  border-bottom: solid 1px transparent;
  color: currentColor;
  cursor: pointer;

  ${ButtonActive}
`;

const LocaleSwitch = ({ className }) => {
  const { i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const onClickBtn = useCallback(
    (event) => {
      const selectLang = event.currentTarget.getAttribute('data-key') || 'en';
      i18n.changeLanguage(selectLang);
    },
    [i18n]
  );

  return (
    <LocaleSwitchWrapper
      className={className}
      $theme={theme}
    >
      <LocaleSwitchButton
        onClick={onClickBtn}
        data-key="en"
        $isActive={i18n.language === 'en'}
      >
        En
      </LocaleSwitchButton>
      <LocaleSwitchSeparator>/</LocaleSwitchSeparator>
      <LocaleSwitchButton
        onClick={onClickBtn}
        data-key="fr"
        $isActive={i18n.language === 'fr'}
      >
        Fr
      </LocaleSwitchButton>
    </LocaleSwitchWrapper>
  );
};

export default LocaleSwitch;
