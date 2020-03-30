import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Cluster',
    href: '/cluster',
  },
]

const Container = styled.div`
  width: 100vw;
  height: 5vh;
  background-color: #e7e7e7;
  padding: 30px;
  display: flex;
  align-items: center;
`

const NavItem = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: grey;
  margin-left: 30px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    color: #888;
    transform: translateY(-1px);
  }
`

function Navbar() {
  return (
    <Container>
      {links.map(link => (
        <Link href={link.href}>
          <NavItem>{link.name}</NavItem>
        </Link>
      ))}
    </Container>
  )
}

export default Navbar
