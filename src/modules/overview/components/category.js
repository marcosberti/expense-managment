/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useMobile} from '../../../hooks/useMobile'
import {formatAmmount} from '../../common/utils/utils'
import {primary} from '../../../styles/colors'

const Category = ({data: {name, ammount, icon: Icon}}) => {
  const isMobile = useMobile()
  const iconSize = isMobile ? 60 : 84

  return (
    <li
      css={css`
        padding: 1rem;
        margin-right: var(--category-margin-right);
        background-color: var(--background-color-light);
        border-radius: var(--border-radius);
        width: var(--category-size);
        height: var(--category-size);

        &:last-of-type {
          margin-right: 0;
        }
      `}
    >
      <div
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        <Icon fill={primary[400]} size={iconSize} />
        <div
          css={css`
            padding-left: 10px;
          `}
        >
          <div
            css={css`
              font-weight: 300;
            `}
          >
            {name}
          </div>
          <span
            css={css`
              font-weight: 500;
              font-size: var(--font-size-lg);
            `}
          >
            {formatAmmount(ammount)}
          </span>
        </div>
      </div>
    </li>
  )
}

Category.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    ammount: PropTypes.number,
    icon: PropTypes.func,
  }),
}

export {Category}
