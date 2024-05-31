import { cn } from '@/lib/utils';

export type InputProps = {
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({ className, type, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      type={type}
      className={cn(
        'bg-white-opacity-9 w-full rounded-[9px] p-2 text-[13px] font-medium text-white placeholder-gray-500',
        className
      )}
    />
  );
}
