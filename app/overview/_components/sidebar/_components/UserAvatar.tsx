import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  userName: string;
  avatarSrc: string;
}

const UserAvatar = ({ userName, avatarSrc }: UserAvatarProps) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={avatarSrc} alt="User Avatar" />
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-xs font-semibold text-card-foreground max-w-32 truncate">{userName}</h1>
        <p className="text-xs text-muted-foreground">Welcome back!</p>
      </div>
    </div>
  );
};

export default UserAvatar;