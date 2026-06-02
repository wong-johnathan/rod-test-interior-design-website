import type { Metadata } from "next"
import LeadForm from "@/components/LeadForm"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rod's Interior. Start your interior design project today.",
}

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Info column */}
          <div className="lg:col-span-2">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s Talk
              <br />
              <span className="text-muted-foreground">About Your Space</span>
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you&apos;re renovating a single room or designing an entire property, we&apos;d
              love to hear from you. Fill out the form and we&apos;ll get back within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MailIcon className="mt-0.5 size-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:hello@rodsinterior.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    hello@rodsinterior.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 size-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href="tel:+12125551234" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    +1 (212) 555-1234
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">Studio</p>
                  <p className="text-sm text-muted-foreground">
                    123 Design District<br />
                    Brooklyn, NY 11201
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border bg-card p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold mb-6">Send an Inquiry</h2>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
