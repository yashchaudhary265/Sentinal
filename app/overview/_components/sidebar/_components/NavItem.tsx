import React from 'react';
import clsx from 'clsx';

interface NavItemProps {
  label: string;
  icon: React.ComponentType;
  selectedItem: string;
  onClick: () => void;
}

const NavItem = ({ label, icon: IconComponent, selectedItem, onClick }: NavItemProps) => {
  const isSelected = selectedItem === label;

  return (
    <div
      className={clsx(
        'flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground',
        { 'bg-secondary text-secondary-foreground': isSelected }
      )}
      onClick={onClick}
    >
      <IconComponent />
      <p className={clsx({ 'text-secondary-foreground': isSelected })}>{label}</p>
    </div>
  );
};

export default NavItem;