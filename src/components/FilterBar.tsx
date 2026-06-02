"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { styles, rooms, budgets } from "@/data/projects"

interface FilterBarProps {
  style: string
  room: string
  budget: string
  onStyleChange: (val: string | null) => void
  onRoomChange: (val: string | null) => void
  onBudgetChange: (val: string | null) => void
}

export default function FilterBar({
  style,
  room,
  budget,
  onStyleChange,
  onRoomChange,
  onBudgetChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={style} onValueChange={onStyleChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Styles</SelectItem>
            {styles.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={room} onValueChange={onRoomChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Room" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Rooms</SelectItem>
            {rooms.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={budget} onValueChange={onBudgetChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Budget" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Budgets</SelectItem>
            {budgets.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
