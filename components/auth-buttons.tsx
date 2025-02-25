import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";

export function AuthButtons() {
  return (
    <div>
      <SignedOut>
        <SignUpButton>
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
            <UserPlus size={20} />
          </Button>
        </SignUpButton>
        <SignInButton>
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
            <LogIn size={20} />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
