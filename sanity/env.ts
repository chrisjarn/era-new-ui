export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-21'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'era'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h6wntf2c'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
