import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  withArrow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  withArrow = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-[11px] px-6 py-3.5';

  const sizeStyles = {
    sm: 'text-xs uppercase tracking-wider px-6 py-3.5 gap-1.5',
    md: 'text-sm uppercase tracking-wider px-6 py-3.5 gap-2',
    lg: 'text-sm font-semibold tracking-widest px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    // Primary: Obsidian black with golden yellow hover accent
    primary: 'bg-[#111111] text-white hover:bg-[#222222] active:bg-black focus-visible:ring-[#F2B705] border border-[#111111]',
    // Secondary: Signature golden yellow with obsidian black text
    secondary: 'bg-[#F2B705] text-[#111111] hover:bg-[#dfa703] active:bg-[#c99502] focus-visible:ring-[#111111] font-semibold',
    // Outline: Architectural thin border
    outline: 'border border-[#111111] text-[#111111] bg-transparent hover:bg-[#111111] hover:text-white active:bg-black focus-visible:ring-[#111111]',
    // Dark: Bordered button on dark backgrounds
    dark: 'border border-white/20 text-white bg-transparent hover:border-[#F2B705] hover:text-[#F2B705] focus-visible:ring-[#F2B705]',
    // Ghost: Understated link-like action
    ghost: 'text-[#111111] hover:text-[#F2B705] p-0 bg-transparent tracking-widest uppercase font-semibold text-xs',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedStyles}`}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`group ${combinedStyles}`} {...props}>
      {content}
    </button>
  );
};
