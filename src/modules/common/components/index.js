import * as React from 'react'
import styled from '@emotion/styled'
import * as mq from 'media-queries'
import {IconSVG} from 'icons'

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

const CustomSVG = ({icon, fill, size}) => {
  const iconRef = React.useRef()

  React.useEffect(() => {
    iconRef.current.innerHTML = icon
  }, [])

  return <IconSVG iconRef={iconRef} fill={fill} size={size} />
}

const Form = styled.form`
  & input,
  & select {
    outline: none;
    padding: 1rem;
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
    min-height: 3rem;
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

const TextCenter = styled.div`
  text-align: center;
`

export {
  AbsoluteBox,
  Big,
  Bigger,
  Button,
  CustomSVG,
  Form,
  FormGroup,
  FormError,
  Small,
  TextCenter,
}
