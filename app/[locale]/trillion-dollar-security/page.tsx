import React from "react"
import Image from "next/image"

import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "methodology", label: "Methodology" },
  { id: "findings", label: "Key Findings" },
  { id: "recommendations", label: "Recommendations" },
  { id: "conclusion", label: "Conclusion" },
]

export default function TdsPage() {
  return (
    <MainArticle>
      {/* Hero Section */}
      <section className="mb-8 w-full">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Hero Placeholder"
          width={1200}
          height={400}
          className="h-[400px] w-full object-cover"
        />
        <p className="mb-2 mt-6 text-center text-lg">Secure the future</p>
        <h1 className="mb-20 text-center">Trillion Dollar Security Project</h1>
        {/* Hero content below the title */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left: 3 paragraphs */}
          <div className="flex-1 space-y-6">
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
              aliquam nunc, eget aliquam massa nisl quis neque.
            </p>
            <p className="text-lg">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>
          </div>
          {/* Right: Download Card */}
          <div className="mx-auto w-full max-w-md flex-shrink-0 lg:mx-0">
            <Card className="rounded-2xl border bg-card-gradient-secondary p-8">
              <CardContent className="p-0 pb-4">
                <CardDescription className="text-lg font-bold text-body">
                  Ethereum ecosystem security overview report
                </CardDescription>
              </CardContent>
              <CardFooter className="p-0">
                <ButtonLink href="#">Download the report</ButtonLink>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider and new heading */}
      <div className="my-12 h-0.5 w-full rounded bg-primary" />
      <div className="mb-20 flex flex-col items-center">
        <h2 className="mb-8 text-center font-extrabold">
          Ethereum ecosystem security overview report
        </h2>
        <p className="max-w-screen-md text-center text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget
          aliquam massa nisl quis neque.
        </p>
      </div>

      {/* Main Content Sections - Each with its own sticky heading */}
      <div className="mb-20 w-full space-y-32 px-4 md:mx-6 lg:space-y-48">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-8 flex items-start gap-8"
          >
            {/* Sticky Heading + Image */}
            <div className="sticky top-24 hidden h-fit w-[400px] flex-shrink-0 flex-col items-start self-start lg:flex">
              <h2 className="mb-4 text-2xl font-bold">{section.label}</h2>
              <Image
                src="https://placehold.co/600x300.png"
                alt={`${section.label} Placeholder`}
                width={400}
                height={200}
                className="mb-4 h-auto w-full rounded-xl"
              />
              <p className="mt-4">
                {/* Dummy sticky section text */}
                This is some sticky section info for {section.label}. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                euismod, urna eu tincidunt consectetur.
              </p>
            </div>
            {/* Section Content */}
            <div className="flex-1">
              {/* Show heading on mobile */}
              <h2 className="mb-4 text-2xl font-bold lg:hidden">
                {section.label}
              </h2>
              {/* Example subsections for demonstration */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="mb-4 text-xl font-semibold">Overview</h3>
                  <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod, urna eu tincidunt consectetur, nisi
                    nisl aliquam nunc, eget aliquam massa nisl quis neque.
                  </p>
                  <p className="text-lg">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-lg">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="mb-4 text-xl font-semibold">
                    Subsection Title
                  </h3>
                  <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod, urna eu tincidunt consectetur, nisi
                    nisl aliquam nunc, eget aliquam massa nisl quis neque.
                  </p>
                  <p className="text-lg">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-lg">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="mb-4 text-xl font-semibold">
                    Another Subsection
                  </h3>
                  <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod, urna eu tincidunt consectetur, nisi
                    nisl aliquam nunc, eget aliquam massa nisl quis neque.
                  </p>
                  <p className="text-lg">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-lg">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </MainArticle>
  )
}
