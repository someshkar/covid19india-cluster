import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import logo from './covidcrowd.svg'

import '../../styles/App.scss'

const Example = props => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand href="/" className="text-primary">
          <img src={logo} alt="" width={36} height={36} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                href="http://covid19india.org"
                className="text-uppercase"
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.covid19india.org/clusters"
                className="text-uppercase"
              >
                Clusters
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.covid19india.org/links"
                className="text-uppercase"
              >
                Helpful Links
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.covid19india.org/faq"
                className="text-uppercase"
              >
                FAQ
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Example
