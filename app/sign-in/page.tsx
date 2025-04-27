import Image from "next/image";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-transparent">
      <div className="absolute inset-0 mask-r-from-1 mask-l-from-1">
        <Image
          src="/images/login-bg.jpg"
          alt="Login background image"
          fill
          className="absolute inset-0 z-0 object-cover"
        />
      </div>

      <div className="z-20 w-full max-w-lg rounded-lg p-6 backdrop-blur-sm">
        <LoginForm />
      </div>
    </div>
  );
}
