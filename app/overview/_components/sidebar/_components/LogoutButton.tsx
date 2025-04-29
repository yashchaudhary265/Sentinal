import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("login_id");
    router.push("/auth/sign-in");
  };

  return (
    <div
      className="cursor-pointer flex gap-1 items-center"
      onClick={handleLogout}
    >
      <LogOut className="text-card-foreground" />
    </div>
  );
};

export default LogoutButton;