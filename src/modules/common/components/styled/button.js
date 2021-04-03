import styled from '@emotion/styled'

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

export {Button}
