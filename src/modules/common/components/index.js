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
`

const Big = styled.div`
  color: var(--text-color-light);
  font-weight: 600;
  font-size: 1.25rem;

  ${mq.large} {
    font-size: 1.5rem;
  }
`
const Bigger = styled.div`
  color: var(--text-color-light);
  font-size: 1.75rem;
  font-weight: 700;

  ${mq.large} {
    font-size: 2.5rem;
  }
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
