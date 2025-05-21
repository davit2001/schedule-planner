import React, { ElementType, FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  tag?: ElementType;
  className?: string;
  children: ReactNode;
  active: boolean;
}

const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  tag: Tag = 'li',
  className,
  children,
  active,
  ...props
}) => (
    <Tag
      className={clsx(
        'px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 list-none',
        active
          ? 'bg-gray-100 text-gray-700'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
);

export default ListItem;