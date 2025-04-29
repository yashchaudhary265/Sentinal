import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const allowedRoutes = ["/auth/reset-password", "/auth/sign-up"];
    if (!accessToken && !allowedRoutes.includes(pathname)) {
      router.push("/auth/sign-in");
    }
  }, [router, pathname]);
};