import { Box, Flex, Heading, Text } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"

const dates = [
  {
    title: 'Applications open',
    description: 'Applications open description',
    startDate: new Date('July 25, 2024'),
    endDate: new Date('August 8, 2024'),
    link: 'https://example.com',
    linkText: 'Apply link text',
  },
  {
    title: 'Workshops',
    description: 'Workshops description',
    startDate: new Date('August 5, 2024'),
    endDate: new Date('August 8, 2024'),
    link: 'https://example.com',
    linkText: 'Workshops link text',
  },
  {
    title: 'Translating',
    description: 'Translating description description',
    startDate: new Date('August 9, 2024'),
    endDate: new Date('August 19, 2024'),
    link: 'https://example.com',
    linkText: 'Translating link text',
  },
  {
    title: 'Evaluation',
    description: 'Evaluation description',
    startDate: new Date('August 19, 2024'),
    endDate: new Date('August 31, 2024'),
    link: null,
    linkText: null,
  },
  {
    title: 'Announce winners',
    description: 'Announce winners description',
    startDate: new Date('August 31, 2024'),
    endDate: new Date('September 31, 2024'),
    link: null,
    linkText: null,
  },
]

export const DatesAndTimeline = () => {
  const todaysDate = new Date('August 9, 2024')

  return (
    <Flex direction="column" p={4}>
      {dates.map((date, index) => (
        <Flex
          key={index}
          borderLeft={'1px solid'}
          borderColor={ 
            index === dates.length-1
              ? 'transparent'
              : 'primary.base'
          }
          px={4}
          pb={ index === dates.length-1 ? 0 : 16}
          gap={4}
        >
          <Flex>
            <Box
              w={8}
              h={8}
              bg={
                todaysDate >= date.startDate && todaysDate <= date.endDate
                  ? "primary.base"
                  : "primary.lowContrast"
                }
              borderRadius="full"
              ml={-8}
            />
          </Flex>
          <Flex direction="column" gap={6}>
            <Flex
              h={8}
              bg={
                todaysDate >= date.startDate && todaysDate <= date.endDate
                  ? "primary.base"
                  : "primary.lowContrast"
              }
              borderRadius="full"
              px={4}
              alignItems="center"
              color={
                todaysDate >= date.startDate && todaysDate <= date.endDate
                  ? "background.base"
                  : "body.base"
              }
            >
              <Text>
                {date.startDate.toDateString()} - {date.endDate.toDateString()}
              </Text>
            </Flex>
            <Flex direction="column">
              <Heading as="h3" fontSize="2xl">
                {date.title}
              </Heading>
              <Text>
                {date.description}
              </Text>
            </Flex>
            {
              date.link && (
                <Flex>
                  <ButtonLink
                    href={date.link}
                    mt={2}
                    variant="outline"
                    isDisabled={
                      !(todaysDate >= date.startDate && todaysDate <= date.endDate)
                    }
                  >
                    {date.linkText}
                  </ButtonLink>
                </Flex>
              )
            }
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}