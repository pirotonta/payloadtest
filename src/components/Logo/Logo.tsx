import clsx from 'clsx'
import React from 'react'

type Props = {
  loading?: "lazy" | "eager";
  priority?: "high" | "low";
  size?: "header" | "footer";
  className?: string;
};

export const Logo = ({loading,priority, size = "header", className}: Props) => {
const sizeClasses = size === "header" 
    ? 'max-w-[25rem] h-[60px]'  // tamaño del logo en el header
    : 'max-w-[20rem] h-[44px]'; // tamaño del logo en el footer

  const logoExists = false; 

  if (logoExists) {
    return (
     <img
        alt="Festivalle logo"
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('w-full', sizeClasses, className)}
        src="/media/logo-festivalle.png"
      />
    )
  }

  return (
    <div className={clsx('flex items-center justify-center font-bold text-2xl', sizeClasses, className)}>
      Festivalle
    </div>
  )
}
