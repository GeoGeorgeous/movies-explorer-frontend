import React from 'react';
import Button from '../Button/Button'
import './NavTab.css'


function NavTab() {
  return (
    <nav className="navtab">
      <Button
        size="medium"
        color="gray"
        formFactor="round"
        text="О проекте"
      />
      <Button
        size="medium"
        color="gray"
        formFactor="round"
        text="Технологии"
      />
      <Button
        size="medium"
        color="gray"
        formFactor="round"
        text="Студент"
      />
    </nav>
  );
}

export default NavTab;
