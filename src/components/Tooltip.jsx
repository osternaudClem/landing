import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';

import theme from '../styled-components/theme';

const DELAY = 400;

const TooltipWrapper = styled('div')`
  display: inline-block;
  position: relative;
`;

const TooltipContent = styled('div')`
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px;
  color: ${({ $theme }) => theme[$theme].color};
  background: ${({ $theme }) => theme[$theme].background};
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;

  ${({ $direction }) => {
    switch ($direction) {
      case 'top':
        return css`
          top: -30px;
        `;
      case 'right':
        return css`
          left: calc(100% + 10px);
          top: 50%;
          transform: translateX(0) translateY(-50%);
        `;

      case 'left':
        return css`
          left: auto;
          right: calc(100% + 10px);
          top: 50%;
          transform: translateX(0) translateY(-50%);
        `;

      default:
        return css`
          bottom: -30px;
        `;
    }
  }}

  &::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: -6px;
    z-index: 10;

    ${({ $direction, $theme }) => {
      switch ($direction) {
        case 'top':
          return css`
            top: 100%;
            border-top-color: ${theme[$theme].background};
          `;

        case 'right':
          return css`
            left: -6px;
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-right-color: ${theme[$theme].background};
          `;

        case 'left':
          return css`
            left: auto;
            right: -12px;
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-left-color: ${theme[$theme].background};
          `;

        default:
          return css`
            bottom: 100%;
            border-bottom-color: ${theme[$theme].background};
          `;
      }
    }}
  }
`;

const Tooltip = ({ children, content, delay, direction }) => {
  let timeout;
  const [active, setActive] = useState(false);
  const { theme } = useContext(ThemeContext);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || DELAY);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <TooltipWrapper
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <TooltipContent
          $direction={direction || 'bottom'}
          $theme={theme === 'dark' ? 'light' : 'dark'}
        >
          {content}
        </TooltipContent>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
