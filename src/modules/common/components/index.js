import styled from '@emotion/styled'
import * as mq from 'media-queries'

const buttonVariants = {
  icon: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
  },
}

const Button = styled.button`
  background-color: inherit;
  ${({variant}) => ({...buttonVariants[variant]})}
`

const Small = styled.small`
  color: var(--text-color-light);
  font-size: var(--font-size-sm);
`

const Big = styled.div`
  color: var(--text-color-light);
  font-weight: 600;
  font-size: var(--font-size-lg);
`
const Bigger = styled.div`
  color: var(--text-color-light);
  font-size: var(--font-size-xl);
  font-weight: 700;
`
const AbsoluteBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  ${({position}) => position.mobile}

  ${mq.large} {
    ${({position}) => position.desktop}
  }
`
export {AbsoluteBox, Big, Bigger, Button, Small}
