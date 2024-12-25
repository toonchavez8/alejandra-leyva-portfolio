"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface LanguageContextProps {
	lang: string;
	setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
	lang: "es-mx", // Default to 'es-mx'
	setLang: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [lang, setLangState] = useState("es-mx"); // Default language
	const router = useRouter();
	const pathname = usePathname(); // Get the current path

	// Check if there's a saved language in sessionStorage
	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedLang = sessionStorage.getItem("lang");
			if (savedLang) {
				setLangState(savedLang);
			} else {
				// Check the user's browser language on initial render
				const browserLang = navigator.language;
				const normalizedLang =
					browserLang.toLowerCase() === "en-us" ? "en-us" : "es-mx";
				setLangState(normalizedLang);
				sessionStorage.setItem("lang", normalizedLang); // Save to sessionStorage
			}
		}
	}, []);

	const setLang = (newLang: string) => {
		setLangState(newLang);

		// Store the selected language in sessionStorage
		sessionStorage.setItem("lang", newLang);

		// Replace the language in the current route
		const updatedPath = pathname.replace(/^\/(en-us|es-mx)/, `/${newLang}`);
		router.push(updatedPath); // Update the route with the new language
	};

	return (
		<LanguageContext.Provider value={{ lang, setLang }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);
