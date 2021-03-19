/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useData} from 'context/data'
import {List} from './components/list'
import {Actions} from './components/actions'
import {NewMovement} from './components/new-movement'

const Movements = () => {
  const {data} = useData()
  // console.log('data', data)
  return (
    <div
      css={css`
        padding: 1rem;
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - var(--header-size));
      `}
    >
      <NewMovement />
      {/* <Actions />
      <List movements={data} /> */}
    </div>
  )
}

export {Movements}
