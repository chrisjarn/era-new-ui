'use client'

import { useEffect } from 'react'
import { Link } from '~/components/link'
import { Wrapper } from './(pages)/_components/wrapper'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <Wrapper theme="dark" className="font-mono">
      <div className="flex flex-col items-center justify-center dr-gap-y-24 my-auto uppercase">
        <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
        <p className="mb-6 text-lg text-light-gray">
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-light-gray hover:text-off-white">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-grey p-4 text-xs">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            type="button"
            className="rounded bg-teal px-6 py-3 text-black hover:bg-dark-teal transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded border border-dark-grey px-6 py-3 hover:bg-grey transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}
