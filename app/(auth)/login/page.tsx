import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-sm text-[#9A9AA1]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
