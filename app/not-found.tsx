import { Link } from '~/components/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 font-mono">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-2 text-2xl uppercase">Page Not Found</p>
        <p className="mb-8 text-sm text-light-gray">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="rounded bg-teal px-6 py-3 text-black uppercase hover:bg-dark-teal transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
