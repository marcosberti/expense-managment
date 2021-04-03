import styled from '@emotion/styled'

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

const Title = styled(Big)`
  margin-bottom: 1.5rem;
  border-bottom: 4px solid var(--primary-400);
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

export {Big, Bigger, Title, Small}
