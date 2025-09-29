import LoginForm from '@/components/LoginForm'

export const metadata = {
  title: "Iniciar sesión | Festivalle",
};

export default function LoginPage() {
  return (
    <div className="my-10 flex items-center justify-center text-black">
      <LoginForm />
    </div>
  )
}