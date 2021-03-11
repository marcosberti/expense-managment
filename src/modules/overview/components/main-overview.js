/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useData} from 'context/data'
import {AbsoluteBox, Small, Big, Bigger, TextCenter} from 'common-components'
import {formatAmount} from 'common-utils'
import * as mq from 'media-queries'
import {getMainData} from '../utils/utils'
import {ChartWrapper} from './chart-wrapper'
import {DonutChart} from './donut-chart'

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
      <ChartWrapper
        wrapperId="donutchart-wrapper"
        css={css`
          min-height: 12rem;
          min-width: 12rem;
        `}
      >
        <DonutChart ingreso={ingreso} gasto={gasto} />
      </ChartWrapper>
      <TextCenter>
        <Small>Disponible</Small>
        <Bigger>{formatAmount(ingreso - gasto)}</Bigger>
      </TextCenter>
    </div>
  )
}

export {MainOverview}
