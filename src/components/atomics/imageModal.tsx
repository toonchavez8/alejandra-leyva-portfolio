import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ImageModal({ image }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<img
					src={image.src}
					alt={image.alt}
					className="w-full h-full object-cover"
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogDescription>
						<img
							src={image.src}
							alt={image.alt}
							className="w-full h-full object-cover"
						/>
					</AlertDialogDescription>
					<AlertDialogCancel className="absolute border border-gray-200/25 top-2 -right-10 bg-transparent rounded-full text-gray-300 hover:bg-gray-200/25 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300	">
						x
					</AlertDialogCancel>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
