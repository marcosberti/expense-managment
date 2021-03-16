import styled from '@emotion/styled'
import * as mq from 'media-queries'

const iconDefaults = {
  padding: '0.5rem',
  opacity: '0.5',
  transition: 'opacity 0.25s ease',

  '&:hover': {
    opacity: '1',
  },
}

const buttonVariants = {
  icon: {
    ...iconDefaults,
  },
  mobileMenuIcon: {
    ...iconDefaults,
    zIndex: 1,
    opacity: 1,
    padding: '.75rem',
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
  secondary: {},
}

const Button = styled.button`
  border-radius: var(--border-radius);
  padding: 1rem;
  ${({variant = 'primary'}) => ({...buttonVariants[variant]})}
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
const Form = styled.form`
  & input,
  & select {
    border: 1px solid var(--background-color);
    padding: 1rem;
    border-radius: var(--border-radius);
    outline: none;

    ::placeholder {
      transition: color 0.25s ease;
    }

    &:focus {
      ::placeholder {
        color: transparent;
      }
    }
  }

  & label {
    position: absolute;
    left: -1000vw;
    width: 1px;
    height: 1px;
  }
`

const FormError = styled(Small)`
  color: #dc0c0c;
`

export {AbsoluteBox, Big, Bigger, Button, Form, FormError, Small, TextCenter}
