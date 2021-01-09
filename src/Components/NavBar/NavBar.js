import React from 'react';
import { Link } from 'react-router-dom';

import { useLoginContext } from '../../Context/LoginData';
import './NavBar.css';
import img_logo from '../../Images/logo.png';

// 게시판 시간표 강의평가 학점계산기 친구 책방 캠퍼스픽
// https://cf-fpi.everytime.kr/0.png
const navMenu = [
  { id: 1, name: '게시판', address: '/' },
  { id: 2, name: '깃허브', address: 'https://github.com/' },
];

function NavBar() {
  const { user } = useLoginContext();

  const renderedMenu = navMenu.map((item) => {
    const { id, address, name } = item;
    return (
      <li className={id === 1 ? 'nav-li-active' : 'nav-li'} key={id}>
        <Link to={address}>{name}</Link>
      </li>
    );
  });

  return (
    <nav>
      <div className="nav-content">
        <span className="nav-logo">
          <Link to="/">
            <img className="nav-logo-img" src={img_logo} alt="Everytime" />
          </Link>
          <span>
            <p className="nav-title">와브리타임</p>
            <p className="nav-univ">{user.university.substring(0, 3)}</p>
          </span>
        </span>

        <ul className="nav-menu">{renderedMenu}</ul>
      </div>
    </nav>
  );
}

export default NavBar;
