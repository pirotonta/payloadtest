'use client'
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message || "Error al iniciar sesión")
      }

      login(data.token, data.user)
      router.push('/');
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto p-8 bg-black text-gray-100 rounded-2xl shadow-2xl">
   <h2 className="text-3xl font-bold mb-6 text-center text-white">
    Iniciar sesión
  </h2>
  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    <input
      type="email"
      placeholder="Correo electrónico"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="p-3 rounded-lg bg-black border border-zinc-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="p-3 rounded-lg bg-black border border-zinc-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <button
      type="submit"
      className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
    >
      Entrar
    </button>
  </form>

  {error && (
    <p className="text-red-400 mt-4 text-center text-sm font-medium">
      {error}
    </p>
  )}

  <p className="text-gray-400 text-sm text-center mt-6">
    ¿No tenés cuenta?{" "}
    <a href="/register" className="text-purple-500 hover:underline">
      Registrate
    </a>
  </p>
</div>
  )
}
