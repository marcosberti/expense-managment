/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {useHistory, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useModal} from 'context/modal'
import {FilterIcon, SortIcon, AddIcon} from 'icons'
import * as mq from 'media-queries'
import {Button, Small} from './styled'

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

const AddButton = () => {
  const {handleModal} = useModal()

  return (
    <Button onClick={handleModal}>
      <AddIcon />
    </Button>
  )
}

const MonthSel = () => {
  const history = useHistory()
  const location = useLocation()
  const [inValue, setInValue] = React.useState(() => {
    const val = location.search.split('=')[1]
    if (val) {
      return val
    }

    const date = new Date()
    const cyear = date.getFullYear()
    let cmonth = date.getMonth() + 1
    cmonth = cmonth <= 9 ? `0${cmonth}` : `${cmonth}`
    return `${cyear}-${cmonth}`
  })

  const handleChange = e => {
    const {value} = e.target
    const path = `${location.pathname}?month=${value}`
    history.push(path, location.state)
    setInValue(value)
  }

  return (
    <input
      type="month"
      onChange={handleChange}
      value={inValue}
      css={css`
        font-weight: 500;
        min-height: 3rem;
        margin-right: auto;
        background-color: inherit;
        color: var(--text-color-light);
        font-size: var(--font-size-sm);
        border: 1px solid var(--neutral-300);
        border-radius: var(--border-radius);
      `}
    />
  )
}

const Actions = ({
  monthSel = false,
  sortCategory = false,
  sortDate = false,
  sortValue = false,
}) => (
  <div
    css={css`
      gap: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      justify-content: center;

      ${mq.large} {
        gap: 1rem;
        justify-content: flex-end;
      }
    `}
  >
    {monthSel && <MonthSel />}
    {sortCategory && (
      <ActionButton variant="actionActive">
        <ActionText>Categoria</ActionText>
        <SortIcon />
      </ActionButton>
    )}
    {sortDate && (
      <ActionButton>
        <ActionText>Fecha</ActionText>
        <SortIcon />
      </ActionButton>
    )}
    {sortValue && (
      <ActionButton>
        <ActionText>Valor</ActionText>
        <SortIcon />
      </ActionButton>
    )}
    <ActionButton>
      <FilterIcon />
    </ActionButton>

    <AddButton />
  </div>
)

Actions.propTypes = {
  monthSel: PropTypes.bool,
  sortCategory: PropTypes.bool,
  sortDate: PropTypes.bool,
  sortValue: PropTypes.bool,
}

export {Actions}
