"use client"
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation"

export default function RegisterForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

      try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message || "Error al registrarse")
      }

      const loginRes = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const loginData = await loginRes.json()
      if (!loginRes.ok) {
        throw new Error("Usuario creado pero error en login automático")
      }

      login(loginData.token, loginData.user)

      router.push("/")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto p-8 bg-black text-gray-100 rounded-2xl shadow-2xl">
  <h2 className="text-3xl font-bold mb-6 text-center text-white">
    Registrarse
  </h2>
  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    <input
      type="text"
      placeholder="Nombre"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="p-3 rounded-lg bg-black border border-zinc-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
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
      Crear cuenta
    </button>
  </form>

  {error && (
    <p className="text-red-400 mt-4 text-center text-sm font-medium">
      {error}
    </p>
  )}

  <p className="text-gray-400 text-sm text-center mt-6">
    ¿Ya tenés cuenta?{" "}
    <a href="/login" className="text-purple-500 hover:underline">
      Iniciá sesión
    </a>
  </p>
</div>
  )
}
