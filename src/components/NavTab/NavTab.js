import React from 'react';
import Button from '../Button/Button';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <a href="#aboutProject" className="navtab__achor-link">
        <Button
          size="medium"
          color="gray"
          formFactor="round"
          text="О проекте"
        />
      </a>
      <a href="#techs" className="navtab__achor-link">
        <Button
          size="medium"
          color="gray"
          formFactor="round"
          text="Технологии"
        />
      </a>
      <a href="#aboutMe" className="navtab__achor-link">
        <Button
          size="medium"
          color="gray"
          formFactor="round"
          text="Студент"
        />
      </a>
    </nav>
  );
}

export default NavTab;
