import styled from '@emotion/styled'

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

export {Button, Small}
