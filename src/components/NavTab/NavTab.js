import React from 'react';
import { HashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <HashLink to="/#aboutProject" className="navtab__achor-link">
        <Button
          size="medium"
          color="gray"
          formFactor="round"
          text="О проекте"
        />
      </HashLink>
      <HashLink to="/#techs" className="navtab__achor-link">
        <Button
          size="medium"
          color="gray"
          formFactor="round"
          text="Технологии"
        />
      </HashLink>
      <HashLink to="/#aboutMe" className="navtab__achor-link">
        <Button
          size="medium"
          color="gray"
          formFactor="round"
          text="Студент"
        />
      </HashLink>
    </nav>
  );
}

export default NavTab;
