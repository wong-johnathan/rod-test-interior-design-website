import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3 md:hidden">
      <Link href="/contact">
        <Button className="w-full gap-2">
          Start Your Project
          <ArrowRightIcon className="size-4" />
        </Button>
      </Link>
    </div>
  )
}
