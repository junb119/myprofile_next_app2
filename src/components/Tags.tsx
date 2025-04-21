import Image from 'next/image';
import React from 'react';

interface TagItem {
  name: string;
  icon?: string; // icon은 있을 수도, 없을 수도 있음
}

interface TagsProps {
  list: TagItem[];
  width?: number;
  height?: number;
  color?: string;
}

const Tags = ({
  list,
  width = 20,
  height = 20,
  color = 'zinc',
}: TagsProps) => {
  const colorClass: { [key: string]: string } = {
    sky: 'bg-sky-100 text-sky-600',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    zinc: 'bg-zinc-100 text-zinc-700', // 기본값
  };

  const classes = colorClass[color] || colorClass['zinc'];

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {list.map((item, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1 ${classes} px-2 py-1 rounded-xl font-semibold text-xs`}
        >
          {item.icon && (
            <Image
              src={item.icon}
              alt={item.name}
              width={width}
              height={height}
              className="rounded-sm object-cover"
            />
          )}
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default Tags;
