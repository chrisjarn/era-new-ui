'use client'

import { type HTMLMotionProps, motion, useInView } from 'motion/react'
import { type ReactNode, useRef } from 'react'

type Per = 'word' | 'char'

interface TextEffectProps {
  children: string
  per?: Per
  className?: string
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span'
  staggerDuration?: number
  once?: boolean
}

const charVariants: HTMLMotionProps<'span'>['variants'] = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px) brightness(0%)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px) brightness(100%)',
    transition: { duration: 0.25 },
  },
}

export function TextEffect({
  children,
  per = 'char',
  className,
  as: Tag = 'span',
  staggerDuration = 0.01,
  once = true,
}: TextEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })

  const lines = children.split('\n')

  return (
    <motion.div
      ref={ref}
      role="presentation"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren:
              per === 'word' ? staggerDuration * 5 : staggerDuration,
          },
        },
      }}
    >
      <Tag className={className}>
        {lines.map((line, li) => {
          const words = line.split(' ')
          return (
            <span key={li}>
              {words.map((word, wi) => (
                <span key={`${word}-${wi}`} className="inline-block whitespace-pre">
                  {per === 'word' ? (
                    <motion.span className="inline-block" variants={charVariants}>
                      {word}
                    </motion.span>
                  ) : (
                    word.split('').map((char, ci) => (
                      <motion.span
                        key={`${char}-${ci}`}
                        className="inline-block"
                        variants={charVariants}
                      >
                        {char}
                      </motion.span>
                    ))
                  )}
                  {wi < words.length - 1 ? ' ' : ''}
                </span>
              ))}
              {li < lines.length - 1 && <br />}
            </span>
          )
        })}
      </Tag>
    </motion.div>
  )
}

interface TextEffectWrapperProps {
  children: ReactNode
  className?: string
  once?: boolean
}

export function TextEffectWrapper({
  children,
  className,
  once = true,
}: TextEffectWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: 'blur(4px)', y: 8 }}
      animate={
        inView
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, filter: 'blur(4px)', y: 8 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
