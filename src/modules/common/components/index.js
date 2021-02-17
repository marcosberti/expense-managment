import styled from '@emotion/styled'
import * as mq from 'media-queries'

const buttonVariants = {
  icon: {
    padding: '0.5rem',
    opacity: '0.5',
    transition: 'opacity 0.25s ease',

    '&:hover': {
      opacity: '1',
    },
  },
  primary: {
    color: 'var(--background-color-light)',
    backgroundColor: 'var(--primary-400)',
    opacity: '1',
    transition: 'opacity 0.5s ease',

    '&:hover': {
      opacity: '0.75',
    },
  },
}

const Button = styled.button`
  border-radius: var(--border-radius);
  padding: 1rem;
  ${({variant}) => ({...buttonVariants[variant]})}
`

const Small = styled.small`
  font-size: var(--font-size-sm);
  color: var(
    ${props => (props.clear ? '--background-color' : '--text-color-light')}
  );
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

const TextCenter = styled.div`
  text-align: center;
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
export {AbsoluteBox, Big, Bigger, Button, Small, TextCenter}
