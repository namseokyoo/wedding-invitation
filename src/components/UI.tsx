import { ReactNode } from 'react'

export function Section({ id, title, children, className, ...props }: { 
  id?: string; 
  title?: string; 
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} {...props} className={`wedding-section ${className || ''}`}>
      {title && <h2 className="wedding-section-title">{title}</h2>}
      {children}
    </section>
  )
}

export function Button({ children, className, variant = 'primary', ...props }: any) {
  const baseClasses = variant === 'outline' ? 'wedding-btn-outline' : 'wedding-btn'
  return (
    <button {...props} className={`${baseClasses} ${className || ''}`}>{children}</button>
  )
}

export function LinkButton({ href, children, className, variant = 'primary', ...props }: any) {
  const baseClasses = variant === 'outline' ? 'wedding-btn-outline' : 'wedding-btn'
  return (
    <a href={href} {...props} className={`inline-block ${baseClasses} ${className || ''}`}>{children}</a>
  )
}

export function WeddingCard({ children, className, ...props }: any) {
  return (
    <div {...props} className={`wedding-card p-6 lg:p-8 ${className || ''}`}>{children}</div>
  )
}

export function WeddingTitle({ children, className, ...props }: any) {
  return (
    <h1 {...props} className={`wedding-title ${className || ''}`}>{children}</h1>
  )
}

export function WeddingSubtitle({ children, className, ...props }: any) {
  return (
    <p {...props} className={`wedding-subtitle ${className || ''}`}>{children}</p>
  )
}

export function SectionTitle({ children, className, ...props }: any) {
  return (
    <h2 {...props} className={`wedding-section-title text-center ${className || ''}`}>{children}</h2>
  )
}

export function WeddingDivider({ className, ...props }: any) {
  return (
    <div {...props} className={`wedding-divider ${className || ''}`}></div>
  )
}