'use client'

import cn from 'clsx'
import type { ComponentProps } from 'react'
import { CTA } from '~/components/button'
import { TextEffect, TextEffectWrapper } from '~/components/text-effect'

function TitleBlockRoot({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col items-center h-min w-full dt:w-auto px-safe dt:px-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function TitleBlockLeadIn({
  children,
  className,
  ...props
}: ComponentProps<'p'>) {
  return (
    <TextEffectWrapper>
      <p
        className={cn(
          'typo-label-m dt:typo-surtitle uppercase dr-mb-24 text-off-white/50',
          className
        )}
        {...props}
      >
        {children}
      </p>
    </TextEffectWrapper>
  )
}

function TitleBlockTitle({
  children,
  className,
  level: Tag = 'h2',
  ...props
}: ComponentProps<'h2'> & { level: 'h2' | 'h3' | 'h4' }) {
  const baseClass = cn(
    'typo-h3 dt:typo-h1 text-center :last:dr-mb-40',
    className
  )

  if (typeof children === 'string') {
    return (
      <TextEffect
        as={Tag}
        className={baseClass}
        per="char"
        staggerDuration={0.015}
      >
        {children}
      </TextEffect>
    )
  }

  return (
    <TextEffectWrapper>
      <Tag className={baseClass} {...props}>
        {children}
      </Tag>
    </TextEffectWrapper>
  )
}

function TitleBlockSubtitle({
  children,
  className,
  ...props
}: ComponentProps<'p'>) {
  return (
    <TextEffectWrapper>
      <p
        className={cn('typo-p text-center text-off-white/50', className)}
        {...props}
      >
        {children}
      </p>
    </TextEffectWrapper>
  )
}

function TitleBlockButton({ children, ...props }: ComponentProps<typeof CTA>) {
  return <CTA {...props}>{children}</CTA>
}

export const TitleBlock = TitleBlockRoot as typeof TitleBlockRoot & {
  LeadIn: typeof TitleBlockLeadIn
  Title: typeof TitleBlockTitle
  Button: typeof TitleBlockButton
  Subtitle: typeof TitleBlockSubtitle
}
TitleBlock.LeadIn = TitleBlockLeadIn
TitleBlock.Title = TitleBlockTitle
TitleBlock.Button = TitleBlockButton
TitleBlock.Subtitle = TitleBlockSubtitle
