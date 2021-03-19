/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {Button, Small} from 'common-components'

const AddCategoryButton = styled(Button)`
  padding: 0;
  border: 1px solid;
  width: var(--category-size);
  height: var(--category-size);
  position: relative;
  border-radius: var(--border-radius);
`

const AddCategoryButtonInner = styled.div`
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  border: 1px dashed #000;
  transform: translate(-50%, -50%);
`

const ItemIcon = ({icon: Icon, size = 24, description}) => (
  <div
    css={css`
      padding: 0.5rem;
      border-radius: var(--border-radius);
      background-color: var(--primary-400-op);
      border: 1px solid var(--primary-400);
      height: 100%;
    `}
  >
    <Icon fill="var(--primary-400)" size={size} />
    {description && <Small>{description}</Small>}
  </div>
)

ItemIcon.propTypes = {
  icon: PropTypes.func.isRequired,
  size: PropTypes.number,
  description: PropTypes.string,
}

export {AddCategoryButton, AddCategoryButtonInner, ItemIcon}
