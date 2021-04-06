import PropTypes from 'prop-types'
import {AuthProvider} from './auth'

const Providers = ({children}) => <AuthProvider>{children}</AuthProvider>

Providers.propTypes = {
  children: PropTypes.object,
}

export {Providers}
