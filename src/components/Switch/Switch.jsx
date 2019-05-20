import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin: -4px 20px 0 0;
`;

const Pill = styled.button`
  width: 40px;
  height: 14px;
  border-radius: 18px;
  background-color: #f1f3f5;
  border-color: transparent;
  outline: 0;
`;

const Pillhandle = styled.div`
  transition: all 0.15s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => (props.toggled ? '#4c7db9' : '#999')};
  margin: ${props => (props.toggled ? '-3px 0 0 50%' : '-3px auto 0 0')};
`;

function Switch({ label, toggled, onClick }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Pill type="button" onClick={onClick} aria-label="Option switch">
        <Pillhandle toggled={toggled} />
      </Pill>
    </Wrapper>
  );
}

Switch.propTypes = {
  label: PropTypes.string.isRequired,
  toggled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Switch;
