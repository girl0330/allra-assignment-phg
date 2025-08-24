interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const ButtonTest = ({ children, type = 'button', className = '', icon, ...props }: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        {...props}
        className={`border inline-flex items-center justify-center px-6 h-[48px] rounded-lg font-semibold cursor-pointer cursor-pointer whitespace-nowrap bg-background-default text-primary  ${
          icon ? 'gap-4' : ''
        } ${className}`}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </button>
    </div>
  );
};

export default ButtonTest;
