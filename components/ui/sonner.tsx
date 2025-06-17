"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export default function SonnerToaster({ ...props }: ToasterProps) {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			richColors={true}
			className="toaster group"
			toastOptions={{
				className: "font-ibm-plex-sans-arabic",
			}}
			style={
				{
					"--normal-bg": "var(--background)",
					"--normal-text": "var(--foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
}
