import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-transparent p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
