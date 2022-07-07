import React, { useCallback, useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import useEmblaCarousel from "embla-carousel-react"

import Icon from "./Icon"

const Embla = styled.div`
  position: relative;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.slider.bg};
  border: 1px solid ${({ theme }) => theme.colors.slider.border};
  border-radius: 0.3rem;
`

const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;

  .is-draggable {
    cursor: move;
    cursor: grab;
  }

  .is-dragging {
    cursor: grabbing;
  }
`

const EmblaContainer = styled.div`
  display: flex;
`

export const EmblaSlide = styled.div`
  position: relative;
  min-width: 100%;

  h2,
  h3 {
    margin-top: 0;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
  margin-left: 0;

  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    position: absolute;
    bottom: 0;
    left: 0;

    justify-content: left;

    margin-bottom: 2rem;
    margin-left: 2rem;
  }
`

const Button = styled.button`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.slider.btnBgDisabled : theme.colors.slider.btnBg};
  border: 0;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`

const Dots = styled.div`
  text-align: center;
`

const DotButton = styled.button<{ selected: boolean }>`
  width: 5px;
  height: 5px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.slider.dotActive : theme.colors.slider.dot};
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
`

export interface IProps {
  onSlideChange?: (slideIndex: number) => void
}

const Slider: React.FC<IProps> = ({ children, onSlideChange }) => {
  const theme = useTheme()
  const [emblaRef, embla] = useEmblaCarousel()
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<Array<number>>([])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback(
    (index) => {
      if (embla) {
        embla.scrollTo(index)
      }

      if (onSlideChange) {
        onSlideChange(index)
      }
    },
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on("select", () => {
      const index = embla.selectedScrollSnap()
      if (onSlideChange) {
        onSlideChange(index)
      }
      onSelect()
    })
  }, [embla, setScrollSnaps, onSelect])

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>{children}</EmblaContainer>
      </EmblaViewport>
      <Buttons>
        <Button onClick={scrollPrev} disabled={!prevBtnEnabled}>
          <Icon
            name="arrowLeftIos"
            color={
              prevBtnEnabled
                ? theme.colors.slider.btnColor
                : theme.colors.slider.btnColorDisabled
            }
          />
        </Button>
        <Button onClick={scrollNext} disabled={!nextBtnEnabled}>
          <Icon
            name="arrowRightIos"
            color={
              nextBtnEnabled
                ? theme.colors.slider.btnColor
                : theme.colors.slider.btnColorDisabled
            }
          />
        </Button>
      </Buttons>
      <Dots>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </Dots>
    </Embla>
  )
}

export default Slider
