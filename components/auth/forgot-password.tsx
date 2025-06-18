"use client"

import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import axios from "axios"
import { BACKEND_URL } from "@/lib/config"

// Define the form schema with zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
})

type FormValues = z.infer<typeof formSchema>

const ForgotForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Initialize react-hook-form with zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      // Call the API to get the OTP code
      const response = await axios.get(
        `${BACKEND_URL}/auth/get_code/${encodeURIComponent(data.email)}`
      )

      if (response.status === 200) {
        toast.success("OTP code has been sent to your email")
        // Store the email in localStorage for the OTP verification page
        localStorage.setItem("resetEmail", data.email)
        // Store the token from the response
        if (response.data.token) {
          localStorage.setItem("token", response.data.token)
        }
        // Redirect to OTP verification page
        router.push("/otp/verify")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast.error("Failed to send OTP code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full h-screen bg-[#F9F9F9] justify-center items-center">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/logo.svg"
            alt="Rwanda FutureSkills Forum Logo"
            width={240}
            height={70}
            priority
            className="object-contain mx-auto"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Forgot Your Password?</h1>
          <p className="text-gray-500 text-sm">Enter your email address and we&apos;ll send you a code to reset your password</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="px-4 py-2.5 h-auto border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 h-auto bg-[#0071bc] hover:bg-[#005a96] text-white rounded-full font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </Button>
          </form>
        </Form>

        {/* Back to login link */}
        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-[#0071bc] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotForm
