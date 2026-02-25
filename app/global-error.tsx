'use client'

import { useEffect } from 'react'
import { Wrapper } from './(pages)/_components/wrapper'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <Wrapper theme="dark" className="font-mono">
      <div className="flex flex-col items-center justify-center dr-gap-y-24 my-auto uppercase">
        <h1 className="mb-4 text-4xl font-bold">Critical Error</h1>
        <p className="mb-6 text-lg text-light-gray">
          A critical error occurred. Please refresh the page or contact support
          if the problem persists.
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
          <button
            onClick={() => {
              window.location.href = '/'
            }}
            type="button"
            className="rounded border border-dark-grey px-6 py-3 hover:bg-grey transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </Wrapper>
  )
}
