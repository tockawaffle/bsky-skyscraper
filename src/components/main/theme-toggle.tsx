'use client'

import * as React from "react"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Moon, Sun} from "lucide-react"

export function ThemeToggle() {
    const {theme, setTheme} = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]"/> : <Moon className="h-[1.2rem] w-[1.2rem]"/>}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}