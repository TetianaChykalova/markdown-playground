import { useTheme } from "@/store/theme";
import { useEffect } from "react";

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme((state) => state.theme);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      {children}
    </>
  )
}