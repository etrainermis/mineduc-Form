import { UserProfile } from "./users/UserProfile"

interface HeaderProps {
    title: string
  }
  
  export default function Header({ title }: HeaderProps) {
    return (
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <UserProfile/>
      </div>
    )
  }
  