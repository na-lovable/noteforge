import { LoginForm } from "@/components/forms/login-form"

export default function Page() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-6 md:p-10">
      <div className="min-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
