/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {useDimentions} from 'hooks'
import {Button, Small} from 'common-components'
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
    `}
  >
    {MONTHS.map(month => (
      <option key={month} value={month}>
        {month}
      </option>
    ))}
  </select>
)

const Actions = () => {
  const {isMobile} = useDimentions()
  const iconSize = isMobile ? 16 : 24
  return (
    <div
      css={css`
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
      `}
    >
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
      <Button type="button" variant="primary">
        <AddIcon size={iconSize} />
      </Button>
    </div>
  )
}

export {Actions}
