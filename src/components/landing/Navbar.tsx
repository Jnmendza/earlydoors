"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { MenuItem as MenuItemProps, menuItems } from "@/data/links";
import { usePathname } from "next/navigation";

const Navbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        {menuItems.map((item: MenuItemProps) => (
          <MenuItem
            key={item.title}
            setActive={setActive}
            active={active}
            selected={item.href === pathname}
            href={item.href}
            item={item.title}
          >
            {item.content}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
