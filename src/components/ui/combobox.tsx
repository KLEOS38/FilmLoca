"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: string[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  allowCustom?: boolean // Allow custom values not in options
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  className,
  disabled = false,
  allowCustom = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  // Filter options based on input - intelligent search that shows partial matches
  const filteredOptions = React.useMemo(() => {
    if (!inputValue) return options
    const searchTerm = inputValue.toLowerCase()
    return options.filter((option) =>
      option.toLowerCase().startsWith(searchTerm)
    ).sort((a, b) => {
      // Prioritize exact matches, then prioritize shorter strings (more specific)
      const aLower = a.toLowerCase()
      const bLower = b.toLowerCase()
      
      // Exact match first
      if (aLower === searchTerm && bLower !== searchTerm) return -1
      if (bLower === searchTerm && aLower !== searchTerm) return 1
      
      // Then by length (shorter = more specific)
      return a.length - b.length
    })
  }, [options, inputValue])

  // Handle input change
  const handleInputChange = React.useCallback((newValue: string) => {
    setInputValue(newValue)
    // If allowCustom is true, update the value immediately
    if (allowCustom && onValueChange) {
      onValueChange(newValue)
    }
  }, [allowCustom, onValueChange])

  // Handle option selection
  const handleSelect = React.useCallback((selectedValue: string) => {
    setInputValue("")
    if (onValueChange) {
      onValueChange(selectedValue)
    }
    setOpen(false)
  }, [onValueChange])

  // Handle Enter key for custom values
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && allowCustom && inputValue) {
      e.preventDefault()
      handleSelect(inputValue)
    }
  }, [allowCustom, inputValue, handleSelect])

  // Reset input when dropdown opens
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      setInputValue("") // Clear search when opening to show full list
    }
  }, [])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={inputValue}
            onValueChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="h-9"
          />
          <CommandGroup>
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <CommandEmpty>
                  {inputValue.trim() ? (
                    allowCustom 
                      ? `Press Enter to use "${inputValue}"` 
                      : "No options found."
                  ) : (
                    allowCustom 
                      ? "Type a name and press Enter" 
                      : "No options available."
                  )
                  }
                </CommandEmpty>
              ) : (
                filteredOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={handleSelect}
                  >
                    {option}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              )}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
