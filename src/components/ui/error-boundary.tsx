"use client"

import * as React from "react"

type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback: (props: { reset: () => void }) => React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

/**
 * Generic error boundary component.
 * Class component is required — React 18 has no hook equivalent for
 * getDerivedStateFromError.
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary fallback={({ reset }) => <button onClick={reset}>Retry</button>}>
 *   <SomethingThatMightFail />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback({
        reset: () => this.setState({ hasError: false }),
      })
    }
    return this.props.children
  }
}
