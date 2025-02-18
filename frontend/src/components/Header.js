import myImage from '../pinkcd.png';
import logo from '../logo.png';



export default function Header(){
    return (
        <>
        <div className='sakila'>
        Sakila DataBase
      </div>
      <div className="box">
      <img src={myImage} className="Home-logo" alt="logo" />
        <ul>
          <li> <a href="http://localhost:3000/Home">Home</a> </li>
          <li> <a href="http://localhost:3000/Films">Films</a> </li>
          <li> <a href="http://localhost:3000/Customer">Customer</a> </li>
        </ul>
      </div>
      </>
    )
}