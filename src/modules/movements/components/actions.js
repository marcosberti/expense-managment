/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBackdrop, Small} from 'common-components'
import {MONTHS} from 'common-utils'
import {FilterIcon, SortIcon, AddIcon} from 'icons'
import * as mq from 'media-queries'

const actionVariants = {
  action: {
    backgroundColor: 'var(--background-color)',
    border: '1px solid var(--neutral-300)',
    transition: 'border-color 0.5s ease, background-color 0.25s ease',

    '& > small, & > svg': {
      fill: 'var(--neutral-300)',
      color: 'var(--neutral-300)',
      transition: 'fill 0.25s ease, color 0.25s ease',
    },

    '&:hover': {
      borderColor: 'var(--secondary-400)',
      backgroundColor: 'var(--secondary-400-op)',

      '& > *': {
        fill: 'var(--secondary-400)',
        color: 'var(--secondary-400)',
      },
    },
  },
  actionActive: {
    border: '1px solid var(--secondary-400)',
    backgroundColor: 'var(--secondary-400-op)',
    '& > small, & > svg': {
      fill: 'var(--secondary-400)',
      color: 'var(--secondary-400)',
    },
  },
}

const ActionButton = styled(Button)`
  flex-basis: calc(25% - 1rem);
  ${mq.large} {
    flex-basis: auto;
  }
  ${({variant = 'action'}) => actionVariants[variant]}
`

const ActionText = styled(Small)`
  font-weight: 600;
`

const Dropdown = () => (
  <select
    id="months"
    name="months"
    css={css`
      font-weight: 600;
      min-height: 3rem;
      margin-right: auto;
      background-color: inherit;
      color: var(--text-color-light);
      font-size: var(--font-size-sm);
      border-color: var(--neutral-300);
      border-radius: var(--border-radius);
    `}
  >
    {MONTHS.map(month => (
      <option key={month} value={month}>
        {month}
      </option>
    ))}
  </select>
)

const ActionsWrapper = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  justify-content: center;

  & > :first-child,
  & > :last-child {
    flex-basis: 100%;
  }

  & > * {
    flex-basis: 25%;
  }

  ${mq.large} {
    gap: 1rem;
    justify-content: flex-end;

    & > *,
    & > :first-child,
    & > :last-child {
      flex-basis: auto;
    }
  }
`

const AddButton = ({onModal}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOption = e => {
    e.preventDefault()
    const {value} = e.currentTarget.dataset
    onModal(value)
    setIsOpen(false)
  }

  const handleModal = e => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen && <ModalBackdrop noBackground onClick={handleModal} />}
      <div
        css={css`
          position: relative;
        `}
      >
        <Modal
          isOpen={isOpen}
          onClose={handleModal}
          withBackdrop={false}
          modalProps={{
            right: '0',
            top: '4rem',
            width: '7rem',
            padding: '0.5rem',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--secondary-400)',
            backgroundColor: 'var(--secondary-400-op)',
          }}
        >
          <ul>
            {['categoria', 'movimiento'].map(item => (
              <li key={item}>
                <Button
                  variant="modal"
                  onClick={handleOption}
                  data-value={item}
                >
                  <Small>{item}</Small>
                </Button>
              </li>
            ))}
          </ul>
        </Modal>

        <Button onClick={handleModal}>
          <AddIcon />
        </Button>
      </div>
    </>
  )
}

AddButton.propTypes = {
  onModal: PropTypes.func.isRequired,
}

const Actions = ({onModal}) => (
  <ActionsWrapper>
    <Dropdown />
    <ActionButton variant="actionActive">
      <ActionText>Categoria</ActionText>
      <SortIcon />
    </ActionButton>
    <ActionButton variant="action">
      <ActionText>Fecha</ActionText>
      <SortIcon />
    </ActionButton>
    <ActionButton variant="action">
      <ActionText>Valor</ActionText>
      <SortIcon />
    </ActionButton>
    <ActionButton variant="action">
      <FilterIcon />
    </ActionButton>
    <AddButton onModal={onModal} />
  </ActionsWrapper>
)

Actions.propTypes = {
  onModal: PropTypes.func.isRequired,
}

export {Actions}
