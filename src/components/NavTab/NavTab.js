import React from 'react';
// Используется hash-link для корректной работы якорей с React Router
import { HashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__items">

        <li>
          <HashLink to="/#aboutProject" className="navtab__achor-link">
            <Button
              size="medium"
              color="gray"
              formFactor="round"
              text="О проекте"
            />
          </HashLink>
        </li>

        <li>
          <HashLink to="/#techs" className="navtab__achor-link">
            <Button
              size="medium"
              color="gray"
              formFactor="round"
              text="Технологии"
            />
          </HashLink>
        </li>

        <li>
          <HashLink to="/#aboutMe" className="navtab__achor-link navtab__achor-last-link">
            <Button
              size="medium"
              color="gray"
              formFactor="round"
              text="Студент"
            />
          </HashLink>
        </li>

      </ul>

    </nav>
  );
}

export default NavTab;
