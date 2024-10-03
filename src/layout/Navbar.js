import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
<nav class="navbar navbar-expand-lg navbar-drak bg-primary">
<div className="container-fluid">
    <Link className="navbar-brand" to="/"> Home</Link>


    </div>  
</nav>
  )
}
