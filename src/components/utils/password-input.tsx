import React from "react"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Label } from "../ui/label"

interface Props {
	label?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'> & Props>(({ className, label, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false)

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev)
	}

	return (
		<div className="flex flex-col gap-2">
			{Boolean(label) && <Label>{label}</Label>}
			<div className="relative">
				<Input
					type={showPassword ? 'text' : 'password'}
					className={cn('hide-password-toggle pr-10', className)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={handleShowPassword}
				>
					{showPassword ? (
						<EyeIcon className="h-4 w-4" aria-hidden="true" />
					) : (
						<EyeOffIcon className="h-4 w-4" aria-hidden="true" />
					)}
					<span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
				</Button>
			</div>
		</div>
	)
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }