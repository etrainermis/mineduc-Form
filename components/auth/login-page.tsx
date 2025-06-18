"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Eye, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { sessionManager } from "@/utils/session"
import { BACKEND_URL } from "@/lib/config"

// Define the form schema with zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Initialize react-hook-form with zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      console.log("Attempting login with:", data)

      const response = await axios.post(`${BACKEND_URL}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      console.log("Login response:", response.data)

      // Check if we got a valid response
      if (response.data && response.data.success) {
        const { access, refresh_token, user } = response.data.data

        if (access && refresh_token) {
          // Store tokens directly in localStorage first
          localStorage.setItem('access', access)
          localStorage.setItem('refresh_token', refresh_token)

          // Then set session using the session manager
          await sessionManager.setSession(access, refresh_token)
          console.log("Session set:", sessionManager.getSession())

          // Determine redirect path based on user role
          let redirectPath = "/"

          // Check if user has roles and get the first role (assuming one role per user)
          if (user?.roles?.length > 0) {
            const userRole = user.roles[0].role_name.toUpperCase()
            console.log("User role:", userRole)

            switch (userRole) {
              case "ADMIN":
                redirectPath = "/admin/dashboard"
                break
              case "COORDINATOR":
                redirectPath = "/coordinator/dashboard"
                break
              case "EVENT_ORGANIZER":
                redirectPath = "/event-organizer/dashboard"
                break
              default:
                redirectPath = "/"
                break
            }
          }

          // Show success message and redirect
          toast.success("Login successful! Redirecting...")
          router.push(redirectPath)
          return
        }

        // If we get here, we have a response but no token
        console.error("No access token in response:", response.data)
        throw new Error("Login successful but no access token received")
      }

      // If we get here, the response was not successful
      throw new Error(response.data?.message || "Login failed")
    } catch (error) {
      console.error("Login error:", error)
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.data?.message ||
          "Login failed. Please check your credentials and try again."
        toast.error(errorMessage)
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("An unexpected error occurred. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F9F9F9] relative">
      {/* Back Button */}
      <Link
        href="/landing"
        className="absolute top-6 left-6 flex items-center text-[#0071bc] hover:text-[#005a96] transition-colors font-medium z-10"
      >
        <ArrowLeft className="mr-1" size={20} />
        <span>Back</span>
      </Link>

      {/* Left side - Login Form */}
      <div className="flex flex-col items-center justify-center w-full px-8 lg:w-1/2">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src="/logo.svg"
              alt="Rwanda FutureSkills Forum Logo"
              width={240}
              height={70}
              priority
              className="object-contain mx-auto"
            />
          </div>

          {/* Login Form */}
          <div className="w-full mx-auto">
            <h1 className="text-3xl font-medium text-gray-900 mb-1 text-center">Log in to your Account</h1>
            <p className="text-gray-500 text-sm mb-8 text-center">Fill in the form to continue</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="px-4 py-2.5 h-auto border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="px-4 py-2.5 h-auto pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                <div>
                  <Link href="/forgot" className="text-sm text-gray-500 hover:text-blue-600">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0071bc] hover:bg-[#005a96] text-white rounded-full font-medium transition-colors mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block lg:w-1/2">
        <div className="h-[90vh] w-[95%] relative mx-auto top-9">
          <Image src="/background_v1.svg" alt="Smart City Illustration" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  )
}
