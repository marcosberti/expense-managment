/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ModalBackdrop = styled.button`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  ${({noBackground = false}) =>
    noBackground
      ? {opacity: 0}
      : {
          backgroundColor: 'var(--text-color)',
          opacity: '0.25',
        }}
`

const Modal = ({
  isOpen,
  onClose,
  withBackdrop = true,
  modalProps,
  children,
}) => {
  const handleClose = () => {
    onClose()
  }

  return isOpen ? (
    <>
      {withBackdrop && <ModalBackdrop onClick={handleClose} />}
      <div
        css={css`
          padding: 2rem;
          position: absolute;
          border-radius: var(--border-radius);
          background-color: var(--background-color-light);
          ${modalProps}
        `}
      >
        {children}
      </div>
    </>
  ) : null
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  withBackdrop: PropTypes.bool,
  modalProps: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
}

export {Modal, ModalBackdrop}
