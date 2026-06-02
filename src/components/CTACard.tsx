import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTACard() {
  return (
    <div className="break-inside-avoid mb-4 rounded-xl bg-primary p-6 text-primary-foreground">
      <h3 className="font-heading text-lg font-semibold">Let&apos;s Create Together</h3>
      <p className="mt-2 text-sm text-primary-foreground/80">
        Every great space starts with a conversation. Tell us about your vision.
      </p>
      <Link href="/contact" className="mt-4 inline-block">
        <Button variant="secondary" size="sm">
          Start Your Project
        </Button>
      </Link>
    </div>
  )
}
