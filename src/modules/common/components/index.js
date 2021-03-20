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

const Form = styled.form`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;

  & input,
  & select {
    outline: none;
    padding: 1rem;
    min-height: 3rem;
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
    padding: 0.5rem;
  }

  & label {
    width: 1px;
    height: 1px;
    left: -1000vw;
    position: absolute;
  }

  & > * {
    width: 100%;
  }
`

const FormGroup = styled.div`
  display: flex;
`

const Small = styled.small`
  font-size: var(--font-size-sm);
  color: var(
    ${props => (props.clear ? '--background-color' : '--text-color-light')}
  );
`

const FormError = styled(Small)`
  color: #dc0c0c;
`

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
  Small,
  Title,
}
