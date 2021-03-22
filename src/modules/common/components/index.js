import * as React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'
import {IconSVG} from 'icons'

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
  modal: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#fff',

    '&:hover': {
      backgroundColor: 'var(--secondary-400)',
    },

    '&:hover *': {
      color: '#fff',
    },
  },
}

const Button = styled.button`
  border-radius: var(--border-radius);
  padding: 1rem;
  ${({variant = 'primary'}) => ({...buttonVariants[variant]})}
`

const Big = styled.span`
  font-weight: 600;
  display: inline-block;
  color: var(--text-color-light);
  font-size: var(--font-size-lg);
`
const Bigger = styled.span`
  font-weight: 700;
  display: inline-block;
  color: var(--text-color-light);
  font-size: var(--font-size-xl);
`

const CustomSVG = ({icon, ...props}) => {
  const iconRef = React.useRef()

  React.useEffect(() => {
    iconRef.current.innerHTML = icon
  }, [icon])

  return <IconSVG iconRef={iconRef} {...props} />
}
CustomSVG.propTypes = {
  icon: PropTypes.string.isRequired,
}

const DesktopOnly = ({children}) => {
  const {isMobile} = useDimentions()

  return !isMobile ? children : null
}

const MobileOnly = ({children}) => {
  const {isMobile} = useDimentions()

  return isMobile ? children : null
}

const Form = styled.form`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;

  & input,
  & select {
    width: 100%;
    height: 100%;
    outline: none;
    padding: 1rem;
    max-height: 3.25rem;
    font-size: 0.75rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--background-color);
    background-color: var(--background-color-light);

    ::placeholder {
      transition: color 0.25s ease;
    }

    &:focus {
      ::placeholder {
        color: transparent;
      }
    }
  }

  & input[type='color'] {
    height: 3.25rem;
    padding: 0.5rem;
  }

  & label {
    margin-top: 0.5rem;
  }

  & > * {
    width: 100%;
  }
`

const LabelText = styled.span`
  font-weight: 600;
  font-size: 0.6rem;
  padding-left: 0.5rem;
  letter-spacing: 0.5px;
  display: inline-block;
  text-transform: uppercase;
`

const FormGroup = styled.div`
  display: flex;
`

const Small = styled.small`
  font-size: var(--font-size-sm);
  color: var(
    ${({clear = false}) =>
      clear ? '--background-color' : '--text-color-light'}
  );
  ${({error = false}) =>
    error
      ? {
          color: 'var(--text-color-error)',
          paddingLeft: '0.5rem',
        }
      : null};
`

const FormError = ({message}) =>
  message ? <Small error>{message}</Small> : null

const Title = styled(Big)`
  margin-bottom: 1.5rem;
  border-bottom: 4px solid var(--primary-400);
`

export * from './modal'
export * from './list'
export {
  Big,
  Bigger,
  Button,
  CustomSVG,
  DesktopOnly,
  Form,
  FormGroup,
  FormError,
  LabelText,
  MobileOnly,
  Small,
  Title,
}
