import React, { Suspense, useEffect, useRef, useState } from "react"

interface LazyLoadComponentProps<T extends React.ElementType> {
  component: T
  fallback: React.ReactNode
  componentProps: React.ComponentProps<T>
  intersectionOptions?: IntersectionObserverInit
}

const LazyLoadComponent = <T extends React.ElementType>({
  component: Component,
  fallback,
  componentProps,
  intersectionOptions = {},
}: LazyLoadComponentProps<T>) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obsRef = ref.current

    const observer = new IntersectionObserver(([entry]) => {
      // Update the state when observer callback fires
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, intersectionOptions)

    if (obsRef) {
      observer.observe(obsRef)
    }

    // Clean up the observer on component unmount
    return () => {
      if (obsRef) {
        observer.disconnect()
      }
    }
  }, [intersectionOptions])

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          <Component {...componentProps} />
        </Suspense>
      ) : (
        fallback // Show fallback until the component is visible
      )}
    </div>
  )
}

export default LazyLoadComponent
