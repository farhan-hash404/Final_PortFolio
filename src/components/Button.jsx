import { useMagnetic } from '../hooks/usePointer'
import Icon from './Icon'
import './Button.css'

/**
 * One button for the whole site. `variant` picks the skin; the magnetic
 * lean is applied to an inner span so the outer box keeps its hit area.
 */
export default function Button({
  as = 'a',
  variant = 'ghost',
  icon,
  children,
  className = '',
  ...rest
}) {
  const magnet = useMagnetic(variant === 'solid' ? 6 : 4)
  const Tag = as

  return (
    <Tag
      className={`btn btn--${variant} ${className}`}
      data-cursor="link"
      {...(as === 'button' ? { type: 'button' } : null)}
      {...rest}
    >
      <span className="btn__inner" {...magnet}>
        <span className="btn__text">{children}</span>
        {icon && <Icon name={icon} size={14} />}
      </span>
    </Tag>
  )
}
