/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

const IconSVG = ({fill = '#fff', size = 24, align = 'middle', children}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={size}
    height={size}
    style={{
      verticalAlign: align,
    }}
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

const SchoolIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" />
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <g>
          <path d="M5,13.18v2.81c0,0.73,0.4,1.41,1.04,1.76l5,2.73c0.6,0.33,1.32,0.33,1.92,0l5-2.73C18.6,17.4,19,16.72,19,15.99v-2.81 l-6.04,3.3c-0.6,0.33-1.32,0.33-1.92,0L5,13.18z M11.04,3.52l-8.43,4.6c-0.69,0.38-0.69,1.38,0,1.76l8.43,4.6 c0.6,0.33,1.32,0.33,1.92,0L21,10.09V16c0,0.55,0.45,1,1,1l0,0c0.55,0,1-0.45,1-1V9.59c0-0.37-0.2-0.7-0.52-0.88l-9.52-5.19 C12.36,3.2,11.64,3.2,11.04,3.52z" />
        </g>
      </g>
    </g>
  </IconSVG>
)

const BillIcon = props => (
  <IconSVG {...props}>
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
    </g>
    <g>
      <g>
        <path d="M2,7L2,7C1.45,7,1,7.45,1,8v10c0,1.1,0.9,2,2,2h16c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H3V8C3,7.45,2.55,7,2,7z" />
        <path d="M21,4H7C5.9,4,5,4.9,5,6v8c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6C23,4.9,22.1,4,21,4z M7,14v-2c1.1,0,2,0.9,2,2H7z M7,8V6 h2C9,7.1,8.1,8,7,8z M14,13c-1.66,0-3-1.34-3-3s1.34-3,3-3s3,1.34,3,3S15.66,13,14,13z M21,14h-2c0-1.1,0.9-2,2-2V14z M21,8 c-1.1,0-2-0.9-2-2h2V8z" />
      </g>
    </g>
  </IconSVG>
)

const MoviesIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M18,4v1h-2V4c0-0.55-0.45-1-1-1H9C8.45,3,8,3.45,8,4v1H6V4c0-0.55-0.45-1-1-1S4,3.45,4,4v16c0,0.55,0.45,1,1,1s1-0.45,1-1 v-1h2v1c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1v-1h2v1c0,0.55,0.45,1,1,1s1-0.45,1-1V4c0-0.55-0.45-1-1-1S18,3.45,18,4z M8,17H6 v-2h2V17z M8,13H6v-2h2V13z M8,9H6V7h2V9z M18,17h-2v-2h2V17z M18,13h-2v-2h2V13z M18,9h-2V7h2V9z" />
      </g>
    </g>
  </IconSVG>
)

const GroceriesIcon = props => (
  <IconSVG {...props}>
    <g>
      <rect fill="none" height="24" width="24" y="0" />
    </g>
    <g>
      <g>
        <path d="M15.55,13c1.22,0,1.74-1.01,1.75-1.03l3.55-6.44c0.23-0.45,0.18-0.84-0.01-1.11C20.66,4.16,20.33,4,20,4 C19.99,4,5.21,4,5.21,4L4.54,2.57C4.38,2.22,4.02,2,3.64,2H2C1.45,2,1,2.45,1,3v0c0,0.55,0.45,1,1,1h1l3.6,7.59l-1.35,2.44 C4.52,15.37,5.48,17,7,17h11c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H7l1.1-2H15.55z" />
        <circle cx="7" cy="20" r="2" />
        <circle cx="17" cy="20" r="2" />
      </g>
    </g>
  </IconSVG>
)

const FitnessIcon = props => (
  <IconSVG {...props}>
    <g>
      <g>
        <path d="M0,0h24v24H0V0z" fill="none" />
      </g>
    </g>
    <g>
      <g>
        <g>
          <path d="M20.57,14.86l0.72-0.72c0.39-0.39,0.39-1.02,0-1.41l-0.02-0.02c-0.39-0.39-1.02-0.39-1.41,0L17,15.57L8.43,7l2.86-2.86 c0.39-0.39,0.39-1.02,0-1.41l-0.02-0.02c-0.39-0.39-1.02-0.39-1.41,0L9.14,3.43L8.42,2.71C8.03,2.32,7.39,2.32,7,2.71L5.57,4.14 L4.85,3.42c-0.39-0.39-1.04-0.39-1.43,0l0,0c-0.39,0.39-0.39,1.04,0,1.43l0.72,0.72L2.71,7c-0.39,0.39-0.39,1.02,0,1.41 l0.72,0.72L2.71,9.86c-0.39,0.39-0.39,1.02,0,1.41l0.02,0.02c0.39,0.39,1.02,0.39,1.41,0L7,8.43L15.57,17l-2.86,2.86 c-0.39,0.39-0.39,1.02,0,1.41l0.02,0.02c0.39,0.39,1.02,0.39,1.41,0l0.72-0.72l0.72,0.72c0.39,0.39,1.02,0.39,1.41,0l1.43-1.43 l0.72,0.72c0.39,0.39,1.04,0.39,1.43,0l0,0c0.39-0.39,0.39-1.04,0-1.43l-0.72-0.72L21.29,17c0.39-0.39,0.39-1.02,0-1.41 L20.57,14.86z" />
        </g>
      </g>
    </g>
  </IconSVG>
)

const RentIcon = props => (
  <IconSVG {...props}>
    <g>
      <g>
        <rect fill="none" height="24" width="24" />
        <rect fill="none" height="24" width="24" />
      </g>
    </g>
    <g>
      <g>
        <g>
          <path d="M17,11V5c0-1.1-0.9-2-2-2H9C7.9,3,7,3.9,7,5v2H5C3.9,7,3,7.9,3,9v10c0,1.1,0.9,2,2,2h6v-4h2v4h6c1.1,0,2-0.9,2-2v-6 c0-1.1-0.9-2-2-2H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z" />
        </g>
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

// const NavigationBackIcon = (props) => (
//   <sv {...props}g
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill={fill}
//     width={size}
//     height={size}
//   >
//     <g>
//       <rect fill="none" height="24" width="24" />
//     </g>
//     <g>
//       <g>
//         <g>
//           <path d="M15.29,15.46l-3.88-3.88l3.88-3.88c0.39-0.39,0.39-1.02,0-1.41l0,0c-0.39-0.39-1.02-0.39-1.41,0l-4.59,4.59 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l0,0C15.67,16.49,15.68,15.85,15.29,15.46z" />
//         </g>
//       </g>
//     </g>
//   </sv>
// )

// const NavigationNextIcon = (props) => (
//   <sv {...props}g
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill={fill}
//     width={size}
//     height={size}
//   >
//     <g>
//       <rect fill="none" height="24" width="24" />
//     </g>
//     <g>
//       <g>
//         <g>
//           <path d="M9.29,15.46l3.88-3.88L9.29,7.7c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.02-0.39,1.41,0l4.59,4.59 c0.39,0.39,0.39,1.02,0,1.41l-4.59,4.59c-0.39,0.39-1.02,0.39-1.41,0l0,0C8.91,16.49,8.9,15.85,9.29,15.46z" />
//         </g>
//       </g>
//     </g>
//   </sv>
// )

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

export {
  MenuIcon,
  DeclineIcon,
  SchoolIcon,
  BillIcon,
  MoviesIcon,
  GroceriesIcon,
  FitnessIcon,
  RentIcon,
  ExpensesIcon,
  IncomeIcon,
  MoneyBalanceIcon,
  UpArrowIcon,
  DownArrowIcon,
  // NavigationBackIcon,
  // NavigationNextIcon,
}
