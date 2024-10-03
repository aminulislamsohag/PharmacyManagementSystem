import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <nav class="navbar navbar-expand-lg navbar-drak bg-primary">
  <div className="container-fluid">
  

    <form class="d-flex">
    <Link className="btn btn-outline-light mx-2" to="/register">Register</Link>
    <Link className="btn btn-outline-light mx-2" to="/login">Login</Link> 
    </form>

  </div>
</nav>
    


  )
}
