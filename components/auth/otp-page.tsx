"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

// Define the form schema with zod for OTP validation
const formSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP code must be 6 digits",
    })
    .max(6, {
      message: "OTP code must be 6 digits",
    })
    .regex(/^\d{6}$/, {
      message: "OTP code must contain only numbers",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const OtpPage = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form with zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const email = localStorage.getItem("resetEmail");
      
      if (!email) {
        toast.error("Email not found. Please try the forgot password process again.");
        router.push("/forgot-password");
        return;
      }

      const response = await axios.put(
        `${BACKEND_URL}/auth/verify_account`,
        {
          verificationCode: parseInt(data.otp),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully");
        // Store the verification code for the reset password page
        localStorage.setItem("verificationCode", data.otp);
        // Store the token from the response if it's different
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        router.push("/reset");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (!isResendDisabled) {
      try {
        const email = localStorage.getItem("resetEmail");
        const token = localStorage.getItem("token");
        
        if (!email || !token) {
          toast.error("Session expired. Please try the forgot password process again.");
          router.push("/forgot-password");
          return;
        }

        const response = await axios.get(
          `${BACKEND_URL}/auth/get_code/${encodeURIComponent(email)}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("New OTP code has been sent to your email");
          // Store the new token if provided
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          }
          // Reset the timer
          setTimeLeft(120);
          setIsResendDisabled(true);
        }
      } catch (error) {
        console.error("Error resending OTP:", error);
        toast.error("Failed to resend OTP code. Please try again.");
      }
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provide OTP</h1>
          <p className="text-gray-500 text-sm mb-2">
            We&apos;ve sent a 6-digit code to your email
          </p>
          <p className="text-gray-500 text-sm">
            Enter the code below to continue
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      className="gap-2 md:gap-4"
                      disabled={isLoading}
                    >
                      <InputOTPGroup className="gap-2 md:gap-4">
                        <InputOTPSlot
                          index={0}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-md border-gray-300"
                        />
                        <InputOTPSlot
                          index={1}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-md border-gray-300"
                        />
                        <InputOTPSlot
                          index={2}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-md border-gray-300"
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator className="mx-1" />
                      <InputOTPGroup className="gap-2 md:gap-4">
                        <InputOTPSlot
                          index={3}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-md border-gray-300"
                        />
                        <InputOTPSlot
                          index={4}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-md border-gray-300"
                        />
                        <InputOTPSlot
                          index={5}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-md border-gray-300"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-2" />
                </FormItem>
              )}
            />

            {/* Timer and Resend */}
            <div className="text-center">
              {isResendDisabled ? (
                <p className="text-sm text-gray-500">
                  Resend code in{" "}
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm text-[#0071bc] hover:underline"
                  disabled={isLoading}
                >
                  Resend Code
                </button>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-3 h-auto bg-[#0071bc] hover:bg-[#005a96] text-white rounded-full font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
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
  );
};

export default OtpPage;
