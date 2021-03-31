/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {Big, Bigger, DesktopOnly, Small} from 'common-components'
import {formatAmount} from 'common-utils'
import * as mq from 'media-queries'
import {ChartWrapper} from './chart-wrapper'
import {DonutChart} from './donut-chart'

const AbsoluteBox = styled.div`
  left: 50%;
  text-align: center;
  position: absolute;
  transform: translateX(-50%);
  ${({position}) => position.mobile}

  ${mq.large} {
    ${({position}) => position.desktop}
  }
`

const TextCenter = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
`

const MainOverview = ({mainData: {income, spent}}) => (
  <div
    css={css`
      height: 100%;
      display: flex;
      min-width: 18rem;
      min-height: 18rem;
      position: relative;
      flex-direction: column;

      ${mq.large} {
        padding: 1rem 1rem 2.5rem 1rem;
        border-left: 4px dashed var(--background-color);
      }
    `}
  >
    <TextCenter>
      <Small>Ingresos</Small>
      <Big>{formatAmount(income)}</Big>
    </TextCenter>
    <AbsoluteBox position={{mobile: {top: '6.5rem'}, desktop: {top: '11rem'}}}>
      <TextCenter>
        <Small>Gastos</Small>
        <Big>{formatAmount(spent)}</Big>
      </TextCenter>
    </AbsoluteBox>
    <DesktopOnly>
      <ChartWrapper
        wrapperId="donutchart-wrapper"
        css={css`
          min-height: 12rem;
          min-width: 12rem;
        `}
      >
        <DonutChart income={income} spent={spent} />
      </ChartWrapper>
    </DesktopOnly>
    <TextCenter>
      <Small>Disponible</Small>
      <Bigger>{formatAmount(income - spent)}</Bigger>
    </TextCenter>
  </div>
)

MainOverview.propTypes = {
  mainData: PropTypes.shape({
    income: PropTypes.number.isRequired,
    spent: PropTypes.number.isRequired,
  }).isRequired,
}

export {MainOverview}
