import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTACard() {
  return (
    <div className="break-inside-avoid mb-4 rounded-xl bg-primary p-8 text-center text-primary-foreground lg:p-14 xl:p-16">
      <h3 className="font-heading text-xl font-semibold lg:text-3xl xl:text-4xl">
        Let&apos;s Create Together
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80 lg:mt-4 lg:text-base lg:leading-relaxed xl:mt-5 xl:text-lg">
        Every great space starts with a conversation. Tell us about your vision.
      </p>
      <Link href="/contact" className="mt-5 inline-block lg:mt-8 xl:mt-10">
        <Button
          variant="secondary"
          size="lg"
          className="h-auto px-6 py-2.5 text-sm lg:px-10 lg:py-3.5 lg:text-base xl:px-12 xl:py-4 xl:text-lg"
        >
          Start Your Project
        </Button>
      </Link>
    </div>
  )
}
