import { HeaderText } from '../components'
import { authGuard } from '../utils/authGuard'
import './index.css'

HeaderText()
await authGuard()
