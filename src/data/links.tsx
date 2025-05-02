import { HoveredLink, ProductItem } from "@/components/ui/navbar-menu";
import { ReactNode } from "react";

export type MenuItem = {
  title: string;
  href: string;
  content: ReactNode;
};

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    href: "/",
    content: (
      <div className='flex flex-col space-y-4 text-sm'>
        <HoveredLink href='/web-dev'>Web Development</HoveredLink>
        <HoveredLink href='/interface-design'>Interface Design</HoveredLink>
        <HoveredLink href='/seo'>Search Engine Optimization</HoveredLink>
        <HoveredLink href='/branding'>Branding</HoveredLink>
      </div>
    ),
  },
  {
    title: "Events",
    href: "/events",
    content: (
      <div className='flex flex-col space-y-4 text-sm'>
        <HoveredLink href='/events/web-dev'>Web Development</HoveredLink>
        <HoveredLink href='/events/design'>Interface Design</HoveredLink>
        <HoveredLink href='/events/seo'>Search Engine Optimization</HoveredLink>
        <HoveredLink href='/events/branding'>Branding</HoveredLink>
      </div>
    ),
  },
  {
    title: "About Us",
    href: "/aboutus",
    content: (
      <div className='text-sm grid grid-cols-2 gap-10 p-4'>
        <ProductItem
          title='Algochurn'
          href='https://algochurn.com'
          src='https://assets.aceternity.com/demos/algochurn.png'
          description='Prepare for tech interviews like never before.'
        />
        <ProductItem
          title='Tailwind Master Kit'
          href='https://tailwindmasterkit.com'
          src='https://assets.aceternity.com/demos/tailwindmasterkit.png'
          description='Production ready Tailwind css components'
        />
        <ProductItem
          title='Moonbeam'
          href='https://gomoonbeam.com'
          src='https://assets.aceternity.com/demos/moonbeam.png'
          description='Never write from scratch again.'
        />
        <ProductItem
          title='Rogue'
          href='https://userogue.com'
          src='https://assets.aceternity.com/demos/rogue.png'
          description='Respond to government RFPs faster using AI'
        />
      </div>
    ),
  },
  {
    title: "Blog",
    href: "/blog",
    content: (
      <div className='flex flex-col space-y-4 text-sm'>
        <HoveredLink href='/blog/hobby'>Hobby</HoveredLink>
        <HoveredLink href='/blog/individual'>Individual</HoveredLink>
        <HoveredLink href='/blog/team'>Team</HoveredLink>
        <HoveredLink href='/blog/enterprise'>Enterprise</HoveredLink>
      </div>
    ),
  },
];
