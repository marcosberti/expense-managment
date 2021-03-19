/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Big, Button, Form, Small} from 'common-components'

const Modal = styled.div`
  height: 100%;
  padding: 2rem;
  width: 400px;
  border-radius: var(--border-radius);
  background-color: var(--background-color-light);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`

const ModalBackdrop = () => (
  <div
    id="modal-backdrop"
    css={css`
      background-color: var(--text-color);
      opacity: 0.5;
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
    `}
  />
)

const ModalForm = styled(Form)`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
`

const ModalTitle = styled(Big)`
  margin-bottom: 1.5rem;
  border-bottom: 4px solid var(--primary-400);
`

const ModalMenu = ({
  id,
  options,
  handleOption,
  width = '6rem',
  top = null,
  right = null,
  left = null,
  bottom = null,
}) => (
  <div
    css={css`
      top: ${top};
      left: ${left};
      right: ${right};
      bottom: ${bottom};
      z-index: 1;
      width: ${width};
      padding: 0.5rem;
      position: absolute;
      border: 1px solid var(--secondary-400);
      border-radius: var(--border-radius);
      background-color: var(--secondary-400-op);
    `}
  >
    <ul>
      {options.map(o => (
        <li key={o}>
          <Button
            id={`${id}-${o}`}
            variant="modal"
            onClick={handleOption}
            data-value={o}
          >
            <Small>{o}</Small>
          </Button>
        </li>
      ))}
    </ul>
  </div>
)

export {Modal, ModalBackdrop, ModalForm, ModalMenu, ModalTitle}
