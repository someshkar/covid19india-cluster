import React from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowCircleRight,
  faSort,
  faSortAmountDown,
  faSortAmountUp,
  faChevronLeft,
  faAngleDoubleLeft,
  faChevronRight,
  faAngleDoubleRight,
  faBullhorn,
  faVenusMars,
  faUserPlus,
  faHeartbeat,
  faMapMarkerAlt,
  faGlobeAsia,
  faExclamationCircle,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-day-picker/lib/style.css'

library.add(
  faArrowCircleRight,
  faSort,
  faSortAmountDown,
  faSortAmountUp,
  faChevronLeft,
  faAngleDoubleLeft,
  faChevronRight,
  faAngleDoubleRight,
  faBullhorn,
  faVenusMars,
  faUserPlus,
  faHeartbeat,
  faMapMarkerAlt,
  faGlobeAsia,
  faExclamationCircle,
  faArrowAltCircleRight
)

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
