import myImage from '../pinkcd.png';
import logo from '../logo.png';
import './Header.css'
import Marquee from "react-fast-marquee"



export default function Header(){
    return (
        <>
        <div className='sakila'>
        Sakila DataBase
      </div>
      <div className="box">
      <img src={myImage} className="Home-logo" alt="logo" />
      <Marquee className='marquee'> Welcome to the Sakila DataBase</Marquee>
        <ul>
          <li> <a href="http://localhost:3000/Home">Home</a> </li>
          <li> <a href="http://localhost:3000/Films">Films</a> </li>
          <li> <a href="http://localhost:3000/Customer">Customer</a> </li>
        </ul>
        
      </div>
      </>
    )
}