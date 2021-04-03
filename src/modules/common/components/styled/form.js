/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {Small} from './styled'

const Form = styled.form`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  & > * {
    width: 100%;
  }
`

const Label = styled.label`
  margin-top: 0.5rem;
`

const LabelText = styled.span`
  font-weight: 600;
  font-size: 0.6rem;
  padding-left: 0.5rem;
  letter-spacing: 0.5px;
  display: inline-block;
  text-transform: uppercase;
`

const commonStyles = css`
  width: 100%;
  height: 100%;
  outline: none;
  padding: 1rem;
  max-height: 3.25rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--neutral-200);
  background-color: var(--background-color-light);
`

const Input = styled.input`
  ${commonStyles}
  font-size: 0.75rem;

  ::placeholder {
    transition: color 0.25s ease;
  }

  &:focus {
    border: 1px solid var(--neutral-300);
    ::placeholder {
      color: transparent;
    }
  }

  &[type='color'] {
    height: 3.25rem;
    padding: 0.5rem;
  }

  &[type='checkbox'] {
    height: 1rem;
    margin-top: 1rem;
  }
`

const Select = styled.select`
  ${commonStyles}
  font-size: 0.7rem;
  text-transform: uppercase;
`

const FormGroup = styled.div`
  display: flex;
`

const FormError = ({message}) =>
  message ? <Small error>{message}</Small> : null

FormError.propTypes = {
  message: PropTypes.string,
}

export {Form, FormGroup, FormError, Label, LabelText, Input, Select}
