"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckIcon, Loader2Icon } from "lucide-react"

const propertyTypes = ["Apartment", "House", "Condo", "Townhouse", "Commercial", "Other"]
const budgetRanges = ["Under $25K", "$25K – $50K", "$50K – $100K", "$100K – $250K", "$250K+"]

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    // Simulate POST
    await new Promise((r) => setTimeout(r, 1000))
    console.log("Lead submitted:", data)
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-muted/30 p-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckIcon className="size-6" />
        </div>
        <h3 className="font-heading text-lg font-semibold">Thank You!</h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name <span className="text-destructive">*</span>
          </label>
          <Input id="name" name="name" placeholder="Your full name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="propertyType" className="text-sm font-medium">
            Property Type <span className="text-destructive">*</span>
          </label>
          <Select name="propertyType" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {propertyTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="budgetRange" className="text-sm font-medium">
            Budget Range <span className="text-destructive">*</span>
          </label>
          <Select name="budgetRange" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {budgetRanges.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project, timeline, and any specific requirements..."
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
        {loading && <Loader2Icon className="size-4 animate-spin" />}
        {loading ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  )
}
