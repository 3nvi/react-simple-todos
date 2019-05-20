import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ReactComponent as CloseSVG } from 'assets/close.svg';
import FocusLock from 'react-focus-lock';
import { animated } from 'react-spring';
import { PRIMARY_COLOR } from 'utils/constants';

const Wrapper = styled(animated.dialog)`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow-y: auto;
  padding: 25px 0;
`;

const CloseButton = styled.button`
  right: 10px;
  top: 17px;
  position: fixed;
  padding: 15px;
  z-index: 12;

  svg {
    width: 26px;
    height: 26px;

    path {
      transition: fill 0.1s linear;
      fill: #888;
    }
  }

  &:hover path {
    fill: #555;
  }

  &:active path {
    fill: ${PRIMARY_COLOR};
  }
`;

function Overlay({ onClose, children, ...rest }) {
  return ReactDOM.createPortal(
    <Wrapper {...rest}>
      <FocusLock>
        <CloseButton type="button" onClick={onClose}>
          <CloseSVG />
        </CloseButton>
        {children}
      </FocusLock>
    </Wrapper>,
    document.body
  );
}

Overlay.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Overlay;
