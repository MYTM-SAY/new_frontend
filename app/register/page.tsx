import { redirect } from "next/navigation"

export default function RegisterPage() {
  redirect("/login?tab=register")
  return null
}
