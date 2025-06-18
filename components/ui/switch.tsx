"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Switch({
	className,
	isRTL = true,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { isRTL?: boolean }) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			dir={isRTL ? "rtl" : "ltr"}
			className={cn(
				"peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-hidden focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				dir={isRTL ? "rtl" : "ltr"}
				className={cn(
					"bg-background pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform",
					isRTL
						? "data-[state=checked]:translate-x-[-16px] data-[state=unchecked]:translate-x-0"
						: "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
