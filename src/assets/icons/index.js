/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

const IconSVG = ({
  fill = '#fff',
  size = 24,
  align = 'middle',
  iconRef,
  children,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
    style={{
      verticalAlign: align,
    }}
    ref={iconRef}
  >
    {children}
  </svg>
)

const MenuIcon = props => (
  <IconSVG {...props}>
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
    </g>
    <g>
      <g>
        <g>
          <path d="M4,18h16c0.55,0,1-0.45,1-1l0,0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1l0,0C3,17.55,3.45,18,4,18z M4,13h16 c0.55,0,1-0.45,1-1l0,0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1l0,0C3,12.55,3.45,13,4,13z M3,7L3,7c0,0.55,0.45,1,1,1h16 c0.55,0,1-0.45,1-1l0,0c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7z" />
        </g>
      </g>
    </g>
  </IconSVG>
)

const DeclineIcon = props => (
  <IconSVG {...props}>
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
    </g>
    <g>
      <g>
        <path d="M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89 c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z" />
      </g>
    </g>
  </IconSVG>
)

const ExpensesIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <path d="M10.53,7.43c0.42-0.31,0.93-0.47,1.54-0.47s1.11,0.16,1.5,0.49c0.17,0.14,0.32,0.3,0.44,0.46c0.27,0.37,0.77,0.48,1.19,0.3 l0,0c0.61-0.26,0.84-1.03,0.43-1.55c-0.22-0.28-0.48-0.55-0.79-0.81c-0.5-0.4-1.12-0.65-1.85-0.77V4c0-0.55-0.45-1-1-1h0 c-0.55,0-1,0.45-1,1v1.11c-0.41,0.08-0.79,0.21-1.14,0.39c-0.35,0.18-0.64,0.39-0.9,0.63l1.43,1.43 C10.43,7.52,10.48,7.47,10.53,7.43z M2.1,3.51L2.1,3.51c-0.39,0.39-0.39,1.02,0,1.41l11.64,11.64C13.31,16.85,12.79,17,12.19,17 c-0.71,0-1.32-0.23-1.83-0.7c-0.28-0.27-0.52-0.57-0.71-0.93c-0.25-0.47-0.8-0.7-1.3-0.5l-0.09,0.04 c-0.54,0.22-0.81,0.86-0.55,1.38c0.35,0.7,0.83,1.28,1.44,1.73c0.57,0.42,1.19,0.68,1.85,0.83V20c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1v-1.08c0.44-0.07,0.87-0.17,1.29-0.35c0.34-0.14,0.64-0.32,0.92-0.53l3.86,3.86c0.39,0.39,1.02,0.39,1.41,0l0,0 c0.39-0.39,0.39-1.02,0-1.41L3.51,3.51C3.12,3.12,2.49,3.12,2.1,3.51z" />
    </g>
  </IconSVG>
)

const IncomeIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M13.06,10.92C11.44,10.38,9.9,9.94,9.9,8.63c0-1.23,1.34-1.67,2.17-1.67c0.97,0,1.57,0.46,1.91,0.9 c0.29,0.38,0.79,0.53,1.23,0.35l0,0c0.62-0.26,0.83-1.04,0.41-1.58C15.14,5.99,14.32,5.3,13,5.08V4c0-0.55-0.45-1-1-1h0 c-0.55,0-1,0.45-1,1v1.11C9.63,5.38,7.81,6.5,7.81,8.67c0,2.57,2.31,3.36,4.02,3.97c1.89,0.67,2.73,1.29,2.73,2.44 c0,1.36-1.25,1.92-2.37,1.92c-1.41,0-2.17-0.93-2.56-1.66c-0.24-0.47-0.82-0.65-1.3-0.45l-0.06,0.03 c-0.56,0.23-0.81,0.88-0.54,1.42c0.49,0.95,1.43,2.11,3.27,2.53V20c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-1.08 c0.06-0.01,3.67-0.41,3.67-3.87C16.69,12.82,15.22,11.67,13.06,10.92z" />
      </g>
    </g>
  </IconSVG>
)

const MoneyBalanceIcon = props => (
  <IconSVG {...props}>
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
    </g>
    <g>
      <g>
        <path d="M11,13V9c0-0.55-0.45-1-1-1H6V6h4c0.55,0,1-0.45,1-1s-0.45-1-1-1H8.5c0-0.55-0.45-1-1-1s-1,0.45-1,1H5C4.45,4,4,4.45,4,5 v4c0,0.55,0.45,1,1,1h4v2H5c-0.55,0-1,0.45-1,1s0.45,1,1,1h1.5c0,0.55,0.45,1,1,1s1-0.45,1-1H10C10.55,14,11,13.55,11,13z" />
        <path d="M18.88,13.22l-4.95,4.95l-2.12-2.12c-0.39-0.39-1.02-0.39-1.41,0l0,0c-0.39,0.39-0.39,1.02,0,1.41l2.83,2.83 c0.39,0.39,1.02,0.39,1.41,0l5.66-5.66c0.39-0.39,0.39-1.02,0-1.41v0C19.9,12.83,19.27,12.83,18.88,13.22z" />
      </g>
    </g>
  </IconSVG>
)

const UpArrowIcon = props => (
  <IconSVG {...props}>
    <rect fill="none" height="24" width="24" />
    <path d="M5.71,9.7L5.71,9.7c0.39,0.39,1.02,0.39,1.41,0L11,5.83V21c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1V5.83l3.88,3.88 c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L12.7,2.7c-0.39-0.39-1.02-0.39-1.41,0L5.71,8.29 C5.32,8.68,5.32,9.32,5.71,9.7z" />
  </IconSVG>
)

const DownArrowIcon = props => (
  <IconSVG {...props}>
    <rect fill="none" height="24" width="24" />
    <path d="M18.3,14.29L18.3,14.29c-0.39-0.39-1.02-0.39-1.41,0L13,18.17V3c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v15.18l-3.88-3.88 c-0.39-0.39-1.02-0.39-1.41,0l0,0c-0.39,0.39-0.39,1.02,0,1.41l5.59,5.59c0.39,0.39,1.02,0.39,1.41,0l5.59-5.59 C18.68,15.32,18.68,14.68,18.3,14.29z" />
  </IconSVG>
)

const AddIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M18,13h-5v5c0,0.55-0.45,1-1,1l0,0c-0.55,0-1-0.45-1-1v-5H6c-0.55,0-1-0.45-1-1l0,0c0-0.55,0.45-1,1-1h5V6 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v5h5c0.55,0,1,0.45,1,1l0,0C19,12.55,18.55,13,18,13z" />
      </g>
    </g>
  </IconSVG>
)

const EditIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <g>
          <path d="M3,17.46l0,3.04C3,20.78,3.22,21,3.5,21h3.04c0.13,0,0.26-0.05,0.35-0.15L17.81,9.94l-3.75-3.75L3.15,17.1 C3.05,17.2,3,17.32,3,17.46z" />
        </g>
        <g>
          <path d="M20.71,5.63l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83C21.1,6.65,21.1,6.02,20.71,5.63z" />
        </g>
      </g>
    </g>
  </IconSVG>
)

const FilterIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M11,18h2c0.55,0,1-0.45,1-1l0,0c0-0.55-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1l0,0C10,17.55,10.45,18,11,18z M3,7L3,7 c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1l0,0c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7z M7,13h10c0.55,0,1-0.45,1-1l0,0 c0-0.55-0.45-1-1-1H7c-0.55,0-1,0.45-1,1l0,0C6,12.55,6.45,13,7,13z" />
      </g>
    </g>
  </IconSVG>
)

const SortIcon = props => (
  <IconSVG {...props}>
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
    </g>
    <g>
      <g>
        <g>
          <path d="M12,5.83l2.46,2.46c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L12.7,3.7c-0.39-0.39-1.02-0.39-1.41,0 L8.12,6.88c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0L12,5.83z M12,18.17l-2.46-2.46 c-0.39-0.39-1.02-0.39-1.41,0l0,0c-0.39,0.39-0.39,1.02,0,1.41l3.17,3.18c0.39,0.39,1.02,0.39,1.41,0l3.17-3.17 c0.39-0.39,0.39-1.02,0-1.41l0,0c-0.39-0.39-1.02-0.39-1.41,0L12,18.17z" />
        </g>
      </g>
    </g>
  </IconSVG>
)

const RefreshIcon = props => (
  <IconSVG {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z" />
  </IconSVG>
)

const LogoutIcon = props => (
  <IconSVG {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 3c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1zm5.14 2.86c-.39.39-.38 1-.01 1.39 1.13 1.2 1.83 2.8 1.87 4.57.09 3.83-3.08 7.13-6.91 7.17C8.18 19.05 5 15.9 5 12c0-1.84.71-3.51 1.87-4.76.37-.39.37-1-.01-1.38-.4-.4-1.05-.39-1.43.02C3.98 7.42 3.07 9.47 3 11.74c-.14 4.88 3.83 9.1 8.71 9.25 5.1.16 9.29-3.93 9.29-9 0-2.37-.92-4.51-2.42-6.11-.38-.41-1.04-.42-1.44-.02z" />
  </IconSVG>
)

export {
  IconSVG,
  MenuIcon,
  DeclineIcon,
  ExpensesIcon,
  IncomeIcon,
  MoneyBalanceIcon,
  UpArrowIcon,
  DownArrowIcon,
  AddIcon,
  EditIcon,
  FilterIcon,
  SortIcon,
  RefreshIcon,
  LogoutIcon,
}
