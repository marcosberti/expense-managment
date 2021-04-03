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
    opacity: '1',
    color: 'var(--primary-400)',
    border: '1px solid var(--primary-400)',
    backgroundColor: 'var(--primary-400-op)',
    transition:
      'opacity 0.5s ease, background-color 0.5s ease, color 0.5s ease',

    '& svg': {
      fill: 'var(--primary-400)',
      transition: 'fill 0.5s ease',
    },

    '&:hover': {
      opacity: '.75',
      color: 'var(--background-color-light)',
      backgroundColor: 'var(--primary-400)',

      '& svg': {
        fill: 'var(--background-color-light)',
      },
    },
  },
  secondary: {
    opacity: '1',
    color: 'var(--secondary-400)',
    border: '1px solid var(--secondary-400)',
    backgroundColor: 'var(--secondary-400-op)',
    transition:
      'opacity 0.5s ease, background-color 0.5s ease, color 0.5s ease',

    '& svg': {
      fill: 'var(--secondary-400)',
      transition: 'fill 0.5s ease',
    },

    '&:hover': {
      opacity: '.75',
      color: 'var(--background-color-light)',
      backgroundColor: 'var(--secondary-400)',

      '& svg': {
        fill: 'var(--background-color-light)',
      },
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
    border: 1px solid var(--neutral-200);
    background-color: var(--background-color-light);

    ::placeholder {
      transition: color 0.25s ease;
    }

    &:focus {
      border: 1px solid var(--neutral-300);
      ::placeholder {
        color: transparent;
      }
    }
  }

  select {
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  & input[type='color'] {
    height: 3.25rem;
    padding: 0.5rem;
  }

  & input[type='checkbox'] {
    height: 1rem;
    margin-top: 1rem;
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

FormError.propTypes = {
  message: PropTypes.string,
}

const Title = styled(Big)`
  margin-bottom: 1.5rem;
  border-bottom: 4px solid var(--primary-400);
`

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
