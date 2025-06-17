"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NotFound() {
	const router = useRouter();
	return (
		<div className="bg-background flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="flex flex-col items-center space-y-8 text-center">
					{/* Classic 404 Design */}
					<div className="relative">
						<div className="border-muted-foreground/20 absolute -top-4 -right-4 h-24 w-24 rounded-full border-2" />
						<div className="border-muted-foreground/20 absolute -bottom-4 -left-4 h-24 w-24 rounded-full border-2" />
						<h1 className="relative font-serif text-8xl tracking-tight">404</h1>
					</div>

					{/* Message */}
					<div className="space-y-2">
						<h2 className="text-2xl font-medium">عذراً، الصفحة غير موجودة</h2>
						<p className="text-muted-foreground">
							يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها
						</p>
					</div>

					{/* Classic Buttons */}
					<div className="flex flex-col gap-3 pt-2 sm:flex-row">
						<Button
							asChild
							variant="default"
							size="lg"
							className="min-w-[180px]"
						>
							<Link
								href="/"
								onClick={() => {
									window.location.href = "/";
								}}
								className="flex items-center gap-2"
							>
								<HomeIcon className="size-4" />
								العودة للرئيسية
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="min-w-[180px]"
						>
							<Link
								href="#"
								onClick={(e) => {
									e.preventDefault();
									router.back();
								}}
								className="flex items-center gap-2"
							>
								<ArrowLeftIcon className="size-4" />
								العودة للخلف
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
