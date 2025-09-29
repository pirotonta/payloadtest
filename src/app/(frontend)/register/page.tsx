import RegisterForm from '@/components/RegisterForm'

export const metadata = {
  title: "Registrarse | Festivalle",
};

export default function RegisterPage() {
  return (
    <div className="my-10  flex items-center justify-center text-black">
      <RegisterForm />
    </div>
  )
}