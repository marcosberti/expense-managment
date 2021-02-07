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

const Big = styled.div`
  color: var(--text-color-light);
  font-size: 1.5rem;
  font-weight: 600;
`
const Bigger = styled.div`
  color: var(--text-color-light);
  font-size: 2.5rem;
  font-weight: 700;
`

export {Button, Small, Big, Bigger}
