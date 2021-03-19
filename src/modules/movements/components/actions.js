/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'
import {Button, Small} from 'common-components'
import {MONTHS} from 'common-utils'
import {FilterIcon, SortIcon, AddIcon} from 'icons'
import * as mq from 'media-queries'
import {ModalMenu} from './modal'

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
    name="months"
    id="months"
    css={css`
      margin-right: auto;
      color: var(--text-color-light);
      border-color: var(--neutral-300);
      border-radius: var(--border-radius);
      font-size: var(--font-size-sm);
      font-weight: 600;
      min-height: 3rem;
      background-color: inherit;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  & > :first-child,
  & > :last-child {
    flex-basis: 100%;
  }

  & > * {
    flex-basis: 25%;
  }

  ${mq.large} {
    justify-content: flex-end;
    gap: 1rem;

    & > *,
    & > :first-child,
    & > :last-child {
      flex-basis: auto;
    }
  }
`

const Actions = ({onOpenModal}) => {
  const [isAdding, setIsAdding] = React.useState(false)
  const {isMobile} = useDimentions()
  const iconSize = isMobile ? 16 : 24

  const handleOption = e => {
    e.preventDefault()
    const {value} = e.currentTarget.dataset
    onOpenModal(value)
    setIsAdding(false)
  }

  const handleAdding = e => {
    e.preventDefault()
    setIsAdding(!isAdding)
  }

  return (
    <ActionsWrapper>
      <Dropdown />
      <ActionButton type="button" variant="actionActive">
        <ActionText>Categoria</ActionText>
        <SortIcon size={iconSize} />
      </ActionButton>
      <ActionButton type="button" variant="action">
        <ActionText>Fecha</ActionText>
        <SortIcon size={iconSize} />
      </ActionButton>
      <ActionButton type="button" variant="action">
        <ActionText>Valor</ActionText>
        <SortIcon size={iconSize} />
      </ActionButton>
      <ActionButton type="button" variant="action">
        <FilterIcon size={iconSize} />
      </ActionButton>
      <div
        css={css`
          position: relative;
        `}
      >
        {isAdding && (
          <ModalMenu
            id="modal-options"
            options={['categoria', 'movimiento']}
            handleOption={handleOption}
            top="4rem"
            right="0"
            width="7rem"
          />
        )}
        <Button type="button" variant="primary" onClick={handleAdding}>
          <AddIcon size={iconSize} />
        </Button>
      </div>
    </ActionsWrapper>
  )
}

Actions.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
}

export {Actions}
