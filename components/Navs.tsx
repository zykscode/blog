import Link from 'next/link'
import React from 'react'

type Props = {}

const navs = ['blog', 'tags','contact']

const Navs = (props: Props) => {
    console.log({todo:"Navs"})
  return (
    <nav className='nav-header-rhs breadcrumbs'>
        {navs.map((nav)=>{
            return (<Link className='breadcrumb button' key={nav} href={`/${nav}`}>
                {nav}
            </Link>)
        })}
    </nav>
  )
}

export default Navs