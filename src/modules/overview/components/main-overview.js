/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {useData} from 'context/data'
import {Big, Bigger, DesktopOnly, Small} from 'common-components'
import {formatAmount} from 'common-utils'
import * as mq from 'media-queries'
import {getMainData} from '../utils/utils'
import {ChartWrapper} from './chart-wrapper'
import {DonutChart} from './donut-chart'

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

const TextCenter = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`

const MainOverview = () => {
  const {ingreso, gasto} = getMainData(useData())

  return (
    <div
      css={css`
        height: 100%;
        min-height: 18rem;
        min-width: 18rem;
        display: flex;
        flex-direction: column;
        position: relative;

        ${mq.large} {
          padding: 1rem 1rem 2.5rem 1rem;
          border-left: 4px dashed var(--background-color);
        }
      `}
    >
      <TextCenter>
        <Small>Ingresos</Small>
        <Big>{formatAmount(ingreso)}</Big>
      </TextCenter>
      <AbsoluteBox
        position={{mobile: {top: '6.5rem'}, desktop: {top: '11rem'}}}
      >
        <Small>Gastos</Small>
        <Big>{formatAmount(gasto)}</Big>
      </AbsoluteBox>
      <DesktopOnly>
        <ChartWrapper
          wrapperId="donutchart-wrapper"
          css={css`
            min-height: 12rem;
            min-width: 12rem;
          `}
        >
          <DonutChart ingreso={ingreso} gasto={gasto} />
        </ChartWrapper>
      </DesktopOnly>
      <TextCenter>
        <Small>Disponible</Small>
        <Bigger>{formatAmount(ingreso - gasto)}</Bigger>
      </TextCenter>
    </div>
  )
}

export {MainOverview}
