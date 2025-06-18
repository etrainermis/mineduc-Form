"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  User,
  Phone,
  Mail,
  CreditCard,
  AtSign,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/config"
// Define the profile schema based on the API response
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phonenumber: z.string().min(10, "Phone number must be at least 10 digits"),
  username: z.string().min(1, "Username is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  national_id: z.string().min(1, "National ID is required"),
  roles: z
    .array(
      z.object({
        role_name: z.string(),
      })
    )
    .optional(),
});

type ProfileData = z.infer<typeof formSchema>;

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const router = useRouter();

  const form = useForm<ProfileData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phonenumber: "",
      username: "",
      gender: "MALE",
      national_id: "",
    },
  });

  // Function to handle logout
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   router.push("/login");
  // };

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log("Fetching profile data...");

        // Check for token in localStorage
        const token = localStorage.getItem("access");
        console.log("Token from localStorage:", token ? "Found" : "Not found");

        if (!token) {
          setError("You are not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        console.log("Making API request to fetch profile...");
        const response = await fetch(
          `${BACKEND_URL}/auth/get-profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response status:", response.status);

        if (response.status === 401) {
          console.error("Authentication failed: 401 Unauthorized");
          setError("Your session has expired. Please log in again.");
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        console.log("Profile data received:", data);
        setUserData(data);

        // Update form with fetched data
        form.reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phonenumber: data.phonenumber || "",
          username: data.username || "",
          gender: data.gender || "MALE",
          national_id: data.national_id || "",
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  async function onSubmit(values: ProfileData) {
    try {
      setSaving(true);
      setSaveSuccess(false);

      // Get the authentication token
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not authenticated. Please log in.");
        setSaving(false);
        return;
      }

      // Here you would typically send the updated profile to your API
      // For example:
      // const response = await fetch("http://197.243.26.64:3037/auth/update-profile", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(values),
      // })
      //
      // if (!response.ok) {
      //   throw new Error(`Failed to update profile: ${response.status}`)
      // }

      // For now, we'll just simulate a successful update
      console.log("Updated profile values:", values);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSaveSuccess(true);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 text-[#026FB4] animate-spin" />
        <span className="ml-2 text-lg">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
      {/* Profile Header with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#026FB4]"></div>
        <div className="relative h-48">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl transform transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <User className="h-20 w-20 text-[#026FB4]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mt-4">
                <h1 className="text-2xl font-bold text-white">
                  {userData && `${userData.firstName} ${userData.lastName}`}
                </h1>
                <h2 className="text-gray-200 bg-[#026FB4]/90 px-3 py-1 rounded-full text-sm font-medium mt-1">
                  {userData && userData.roles && userData.roles.length > 0
                    ? userData.roles[0].role_name
                    : "User"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-20 px-8 pb-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="flex justify-between items-center">
              <span>{error}</span>
              {(error.includes("not authenticated") ||
                error.includes("expired")) && (
                <button
                  onClick={() => router.push("/login")}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200"
                >
                  Go to Login
                </button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {saveSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-700">
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="First name"
                            {...field}
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#026FB4] focus:ring-1 focus:ring-[#026FB4]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Email"
                            type="email"
                            {...field}
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#026FB4] focus:ring-1 focus:ring-[#026FB4]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Username"
                            {...field}
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#026FB4] focus:ring-1 focus:ring-[#026FB4]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Gender
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#026FB4] focus:ring-1 focus:ring-[#026FB4]">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Last name"
                            {...field}
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#026FB4] focus:ring-1 focus:ring-[#026FB4]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Phone number"
                            type="tel"
                            {...field}
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#026FB4] focus:ring-1 focus:ring-[#026FB4]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="national_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        National ID
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="National ID"
                            {...field}
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#026FB4] focus:ring-1 focus:ring-[#026FB4]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#026FB4] hover:bg-[#026FB4]/90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
