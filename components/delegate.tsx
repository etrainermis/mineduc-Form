"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Plus, AlertCircle, ChevronLeft, ChevronRight, X, CheckCircle2, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { BACKEND_URL } from "@/lib/config"

// Define question interface
interface Question {
  id: string
  question: string
  type: string
  placeholder?: string
  options?: string[]
  previewLabel?: string
  required?: boolean
  validation?: (value: string) => string | null
  description?: string
}

// Define countries
const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Cote d'Ivoire",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]
// Define EAC Partner States
const EAC_COUNTRIES = [
  "Burundi",
  "Democratic Republic of Congo",
  "Kenya",
  "Rwanda",
  "Somalia",
  "South Sudan",
  "Uganda",
  "Tanzania",
]

// Update the getSteps function to remove dynamic step generation
const STEPS = [
  { id: "personal-info", label: "Personal Info", count: 13 }, // Updated count to include travel questions
  { id: "professional-info", label: "Professional Info", count: 3 },
  { id: "event-based-info", label: "Event-Based Info", count: 1 },
]

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation regex (simple version)
const phoneRegex = /^\+[0-9\s-]{9,}$/

// Update the QUESTIONS object - Add travel info questions
const QUESTIONS: Record<string, Question[]> = {
  "personal-info": [
    {
      id: "name",
      question: "Name and Surname?",
      type: "name",
      previewLabel: "Names",
      required: true,
      validation: (value) => {
        if (!value) {
          return "Both first and last name are required"
        }
        return null
      },
    },
    {
      id: "email",
      question: "Provide your email",
      type: "email",
      placeholder: "ngabo@gmail.com",
      previewLabel: "Email",
      required: true,
      validation: (value) => (!emailRegex.test(value) ? "Please enter a valid email address" : null),
    },
    {
      id: "phoneNumber",
      question: "What is your phone number?",
      type: "text",
      placeholder: "+250 798 123 432",
      previewLabel: "Tel N°",
      required: true,
      validation: (value) =>
        !phoneRegex.test(value) ? "Please enter a valid phone number(Format: +250 798 123 432)" : null,
    },
    {
      id: "gender",
      question: "What is your gender?",
      type: "select",
      options: ["Male", "Female"],
      previewLabel: "Gender",
      required: true,
    },
    {
      id: "country",
      question: "What is your nationality ?",
      type: "country",
      previewLabel: "Nationality",
      required: true,
    },
    {
      id: "state",
      question: "What is your partner state ?",
      type: "state",
      previewLabel: "Partner state",
      required: true,
    },
    // Travel info questions - conditional based on partner state
    {
      id: "arrivalDateTime",
      question: "What is your arrival date and time?",
      type: "datetime-local",
      previewLabel: "Arrival Date & Time",
      required: true,
    },
    {
      id: "departureDateTime",
      question: "What is your departure date and time?",
      type: "datetime-local",
      previewLabel: "Departure Date & Time",
      required: true,
    },
    {
      id: "airline",
      question: "Which airline are you traveling with?",
      type: "text",
      placeholder: "e.g., RwandAir, Ethiopian Airlines, etc.",
      previewLabel: "Airline",
      required: true,
    },
    {
      id: "photo",
      question: "Upload a profile photo",
      type: "file",
      previewLabel: "Profile Photo",
      required: true,
    },
    {
      id: "dietary",
      question: "Do you have any dietary restrictions?",
      type: "radio",
      options: ["Yes", "No"],
      previewLabel: "Dietary Restrictions",
      required: true,
    },
    {
      id: "special-needs",
      question: "Do you have any special needs?",
      type: "radio",
      options: ["Yes", "No"],
      previewLabel: "Special Needs",
      required: true,
    },
    {
      id: "accommodation",
      question: "What is your accommodation status?",
      type: "radio",
      options: ["Booked", "Not booked", "Other"],
      previewLabel: "Accommodation",
      required: true,
    },
    {
      id: "idType",
      question: "ID Type",
      type: "radio",
      options: ["National ID Number", "Passport Number"],
      previewLabel: "ID Type",
      required: true,
    },
  ],
  "professional-info": [
    {
      id: "delegateType",
      question: "What type of delegate are you?",
      type: "select",
      options: [
        "Public Sector Representative-GOV(EAC Delegates,Embassies)",
        "Education Sector Representative-SCH/PLT(Education Institutions)",
        "Development Partner Representative-DP(Multilateral organisations,Donors)",
        "Private Sector Representative-ENT(Private Institutions,Media houses)",
        "Expert/Professional Representative-EXP(Independent Experts,Consultants,Advisors)",
        "Civil Society Representative-CSO(Associations,Youth Forums)",
      ],
      previewLabel: "Delegate Type",
      required: true,
    },
    {
      id: "position",
      question: "What is your position in the organization?",
      type: "text",
      previewLabel: "Position",
      required: true,
    },
    {
      id: "organization",
      question: "What organization do you work for?",
      type: "text",
      previewLabel: "Organization",
      required: true,
    },
  ],
  "event-based-info": [
    {
      id: "sessions",
      question: "Select sessions you want to attend",
      type: "sessions",
      previewLabel: "Sessions",
      required: true,
    },
  ],
}

// Add a summary step
const SUMMARY_STEP = { id: "summary", label: "Review & Submit", count: 1 }

// Define Zod schema for form validation with better error messages - Updated to include travel fields
const delegateFormSchema = z.object({
  fullNames: z.string().min(3, "Full name must be at least 3 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .regex(/^\+[0-9\s-]{9,}$/, "Phone number must start with '+' and be at least 10 characters long"),
  gender: z.string().min(1, "Please select your gender"),
  country: z.string().min(1, "Please select your nationality"),
  state: z.string().min(1, "Please select your partner state"),
  photo: z.any().optional(),
  dietary: z.string().min(1, "Please indicate if you have dietary restrictions"),
  "special-needs": z.string().min(1, "Please indicate if you have any special needs"),
  accommodation: z.string().min(1, "Please select your accommodation status"),
  idType: z.string().min(1, "Please select your ID type"),
  idNumber: z.string().min(1, "Please enter your ID number"),
  delegateType: z.enum(["GOV", "SCH/PLT", "DP", "ENT", "EXP","CSO"], {
    errorMap: () => ({ message: "Please select a valid delegate type" }),
  }),
  position: z.string().min(1, "Please enter your position"),
  organization: z.string().min(1, "Please enter your organization"),
  // Travel info fields - optional since they're only required for non-Rwanda delegates
  arrivalDateTime: z.string().optional(),
  departureDateTime: z.string().optional(),
  airline: z.string().optional(),
  sessions: z.string().min(1, "Please select a session"),
})

type DelegateFormValues = z.infer<typeof delegateFormSchema>

// Add this function to check if current question should be shown

export default function DelegateForm() {
  // Add this function at the top of the component, before any variable declarations
  const shouldShowQuestion = (question: Question): boolean => {
    // Skip travel questions if partner state is Rwanda
    if (["arrivalDateTime", "departureDateTime", "airline"].includes(question.id)) {
      return formValues.state !== "Rwanda"
    }
    return true
  }

  // State for tracking current step and question
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [additionalInfo, setAdditionalInfo] = useState<Record<string, string[]>>({
    dietary: [],
    "special-needs": [],
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [newDietaryNeed, setNewDietaryNeed] = useState("")
  const [newSpecialNeed, setNewSpecialNeed] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSummaryView, setIsSummaryView] = useState(false)
  const [formData, setFormData] = useState<Partial<DelegateFormValues>>({})

  // Add workshops state from API
  const [workshops, setWorkshops] = useState<any[]>([])
  const [workshopsLoading, setWorkshopsLoading] = useState(false)
  const [workshopsError, setWorkshopsError] = useState<string | null>(null)

  // Fetch workshops on mount
  useEffect(() => {
    const fetchWorkshops = async () => {
      setWorkshopsLoading(true)
      setWorkshopsError(null)
      try {
        const res = await fetch(`${BACKEND_URL}/workshops`)
        if (!res.ok) throw new Error("Failed to fetch workshops")
        const data = await res.json()
        setWorkshops(Array.isArray(data) ? data : [])
      } catch (err: any) {
        setWorkshopsError(err.message || "Error fetching workshops")
      } finally {
        setWorkshopsLoading(false)
      }
    }
    fetchWorkshops()
  }, [])

  const [, setAnimationPosition] = useState(0)
  const [countrySearch, setCountrySearch] = useState("")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState<string[]>(COUNTRIES)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [accommodationPlace, setAccommodationPlace] = useState("")
  const [accommodationReason, setAccommodationReason] = useState("")

  // Add state for registration ID
  const [registrationId, setRegistrationId] = useState<string>("")

  const [idType, setIdType] = useState("")
  const [accommodationDetails, setAccommodationDetails] = useState("")

  const countryInputRef = useRef<HTMLInputElement>(null)

  // Setup React Hook Form
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<DelegateFormValues>({
    resolver: zodResolver(delegateFormSchema),
    defaultValues: {
      fullNames: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      country: "",
      state: "",
      photo: undefined,
      dietary: "",
      "special-needs": "",
      accommodation: "",
      idType: "",
      idNumber: "",
      delegateType: "GOV" as "GOV" | "SCH/PLT" | "DP" | "ENT" | "EXP" | "CSO",
      position: "",
      organization: "",
      arrivalDateTime: "",
      departureDateTime: "",
      airline: "",
      sessions: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  // Watch form values
  const formValues = watch()

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // Calculate current step and question
  const currentStep = isSummaryView ? SUMMARY_STEP : STEPS[currentStepIndex]

  // Get dynamic steps based on partner state - moved after currentStep declaration
  const questions = !isSummaryView
    ? QUESTIONS[currentStep.id as keyof typeof QUESTIONS].filter((q) => shouldShowQuestion(q))
    : []
  const currentQuestion = !isSummaryView ? questions[currentQuestionIndex] : null

  // Calculate total questions and progress - Updated to be dynamic
  const totalQuestions = STEPS.reduce((acc, step) => {
    const stepQuestions = QUESTIONS[step.id as keyof typeof QUESTIONS] || []
    const visibleQuestions = stepQuestions.filter((q) => shouldShowQuestion(q))
    return acc + visibleQuestions.length
  }, 0)
  const calculateProgress = () => {
    if (isSummaryView) return 100

    // Calculate based on current question position
    let questionsSoFar = 0
    for (let i = 0; i < currentStepIndex; i++) {
      questionsSoFar += QUESTIONS[STEPS[i].id as keyof typeof QUESTIONS]?.length || 0
    }
    questionsSoFar += currentQuestionIndex

    // Calculate percentage based on current position (not completed questions)
    const percentage = Math.floor((questionsSoFar / totalQuestions) * 100)

    // Return 0 for the first question, otherwise return calculated percentage
    return questionsSoFar === 0 ? 0 : percentage
  }

  const progress = calculateProgress()

  // Calculate current question number
  const currentQuestionNumber = calculateCurrentQuestionNumber()
  // Animation for the border
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPosition((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Filter countries based on search
  useEffect(() => {
    if (countrySearch.trim() === "") {
      setFilteredCountries(COUNTRIES)
    } else {
      const filtered = COUNTRIES.filter((country) => country.toLowerCase().includes(countrySearch.toLowerCase()))
      setFilteredCountries(filtered)
    }
  }, [countrySearch])

  // Close country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryInputRef.current && !countryInputRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Scroll to top when changing questions
  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollTop = 0
    }
  }, [currentStepIndex, currentQuestionIndex, isSummaryView])

  function calculateCurrentQuestionNumber() {
    let questionNumber = 0
    for (let i = 0; i < currentStepIndex; i++) {
      questionNumber += QUESTIONS[STEPS[i].id as keyof typeof QUESTIONS]?.length || 0
    }
    questionNumber += currentQuestionIndex + 1
    return questionNumber
  }
  // Handle form input changes
  const handleInputChange = (id: string, value: string) => {
    setValidationError(null)
    if (id === "delegateType") {
      // Map label to enum value
      const enumValue = getDelegateTypeEnum(value);
      setValue(id as keyof DelegateFormValues, enumValue)
      setFormData((prev) => ({ ...prev, [id]: enumValue as DelegateFormValues['delegateType'] }))
    } else {
      setValue(id as keyof DelegateFormValues, value)
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  // Handle name input changes
  const handleNameChange = (field: "firstName" | "lastName", value: string) => {
    setValidationError(null)
    // Update formData state
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      fullNames: field === "firstName" ? `${value} ${prev.lastName || ""}` : `${prev.firstName || ""} ${value}`,
    }))
    // Update React Hook Form values
    setValue(field, value)
    setValue(
      "fullNames",
      field === "firstName" ? `${value} ${formData.lastName || ""}` : `${formData.firstName || ""} ${value}`,
    )
  }
  // Handle radio button changes
  const handleRadioChange = (id: string, value: string) => {
    setValidationError(null)
    setValue(id as keyof DelegateFormValues, value)
    setFormData((prev) => ({ ...prev, [id]: value }))
  }
  // Handle country selection
  const handleCountrySelect = (country: string) => {
    handleInputChange("country", country)
    setCountrySearch(country)
    setShowCountryDropdown(false)
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
          setValue("photo", file)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  // Handle file upload area click
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click()
  }
  // Handle adding dietary need
  const handleAddDietaryNeed = () => {
    if (newDietaryNeed.trim() !== "") {
      setAdditionalInfo({
        ...additionalInfo,
        dietary: [...(additionalInfo.dietary || []), newDietaryNeed],
      })
      setNewDietaryNeed("")
    }
  }
  // Handle adding special need
  const handleAddSpecialNeed = () => {
    if (newSpecialNeed.trim() !== "") {
      setAdditionalInfo({
        ...additionalInfo,
        "special-needs": [...(additionalInfo["special-needs"] || []), newSpecialNeed],
      })
      setNewSpecialNeed("")
    }
  }
  // Validate current question
  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion) return true

    // Special validation for name fields
    if (currentQuestion.id === "name") {
      if (!formData.firstName || !formData.lastName) {
        setValidationError("Both first and last name are required")
        return false
      }
      // Set the fullNames field for form validation
      setValue("firstName", formData.firstName || "")
      setValue("lastName", formData.lastName || "")
      setValue("fullNames", `${formData.firstName || ""} ${formData.lastName || ""}`)
      return true
    }
    // Special validation for sessions
    if (currentQuestion.id === "sessions" && !formValues.sessions) {
      setValidationError("Please select a session")
      return false
    }

    // Special validation for travel info fields
    if (["arrivalDateTime", "departureDateTime", "airline"].includes(currentQuestion.id)) {
      // Only validate travel questions if not from Rwanda
      if (formValues.state === "Rwanda") {
        return true // Skip validation for Rwanda
      }
    }

    if (currentQuestion.id === "arrivalDateTime" || currentQuestion.id === "departureDateTime") {
      const value = formValues[currentQuestion.id as keyof DelegateFormValues]
      if (!value || value === "") {
        setValidationError("Please select a date and time")
        return false
      }
    }

    if (currentQuestion.id === "airline") {
      const value = formValues.airline
      if (!value || value.trim() === "") {
        setValidationError("Please enter the airline name")
        return false
      }
    }

    const value = formValues[currentQuestion.id as keyof DelegateFormValues]
    // Check if required
    if (currentQuestion.required && (!value || value === "") && currentQuestion.id !== "sessions") {
      setValidationError("This field is required")
      return false
    }
    // Check custom validation
    if (value && currentQuestion.validation) {
      const error = currentQuestion.validation(value)
      if (error) {
        setValidationError(error)
        return false
      }
    }
    // Special validation for dietary and special needs
    if (currentQuestion.id === "dietary" && value === "Yes" && additionalInfo.dietary.length === 0) {
      setValidationError("Please add at least one dietary restriction")
      return false
    }
    if (currentQuestion.id === "special-needs" && value === "Yes" && additionalInfo["special-needs"].length === 0) {
      setValidationError("Please add at least one special need")
      return false
    }

    // Special validation for accommodation details
    if (currentQuestion.id === "accommodation") {
      if ((value === "Booked" || value === "Other") && !accommodationDetails.trim()) {
        setValidationError(
          `Please specify your ${value === "Booked" ? "hotel/accommodation place" : "accommodation arrangement"}`,
        )
        return false
      }
    }

    // Special validation for ID number based on type
    if (currentQuestion.id === "idNumber") {
      const idNumber = formValues.idNumber || ""
      if (formValues.idType === "National ID Number") {
        if (!idNumber || idNumber.length !== 16) {
          setValidationError("National ID must be exactly 16 characters")
          return false
        }
      } else if (formValues.idType === "Passport Number") {
        if (!idNumber || idNumber.length < 6) {
          setValidationError("Passport number must be at least 6 characters")
          return false
        }
      } else {
        setValidationError("ID number is required")
        return false
      }
    }

    return true
  }
  // Handle next question
  const handleNext = async () => {
    if (isSummaryView) {
      setIsSubmitting(true)
      try {
        await handleFormSubmit()
      } catch (error) {
        console.error("Form submission error:", error)
        toast.error("Failed to submit registration")
      } finally {
        setIsSubmitting(false)
      }
      return
    }
    if (!validateCurrentQuestion()) {
      return
    }
    // Clear validation error since we're moving to next question
    setValidationError(null)
    // Move to next question/step
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setCurrentQuestionIndex(0)
    } else {
      setIsSummaryView(true)
    }
  }
  // Add a direct access button for testing
  const debugReset = () => {
    setCurrentStepIndex(0)
    setCurrentQuestionIndex(0)
    setIsSummaryView(false)
  }
  // Handle previous question
  const handleBack = () => {
    if (isSummaryView) {
      setIsSummaryView(false)
      return
    }
    setValidationError(null)
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentStepIndex > 0) {
      const prevStep = STEPS[currentStepIndex - 1]
      const prevQuestions = QUESTIONS[prevStep.id as keyof typeof QUESTIONS].filter((q) => shouldShowQuestion(q))
      setCurrentStepIndex(currentStepIndex - 1)
      setCurrentQuestionIndex(prevQuestions.length - 1)
    }
    // If at very first question of first step, do nothing
  }
  // Form submission handler - Updated to include travel info
  const handleFormSubmit = async () => {
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formValues.firstName || "");
      formDataToSend.append("lastName", formValues.lastName || "");
      formDataToSend.append("email", formValues.email || "");
      formDataToSend.append("username", formValues.email || "");
      formDataToSend.append("myGender", formValues.gender || "");
      formDataToSend.append("role", "DELEGATE");
      formDataToSend.append(
        "national_id",
        formValues.idType === "National ID Number" ? formValues.idNumber || "" : ""
      );
      formDataToSend.append("phonenumber", formValues.phoneNumber || "");
      formDataToSend.append("delegate_type", formValues.delegateType || "");
      formDataToSend.append("country", formValues.country || "");
      formDataToSend.append("partner_state", formValues.state || "");
      formDataToSend.append("organization", formValues.organization || "");
      formDataToSend.append("position", formValues.position || "");
      // Profile picture (file)
      if (formValues.photo) {
        formDataToSend.append("profile_picture_url", formValues.photo);
      } else {
        formDataToSend.append("profile_picture_url", "");
      }
      // Dietary restrictions
      formDataToSend.append(
        "dietary_restrictions",
        formValues.dietary === "Yes" && additionalInfo.dietary.length > 0
          ? additionalInfo.dietary.join(", ")
          : "No"
      );
      // Special needs
      formDataToSend.append(
        "special_needs",
        formValues["special-needs"] === "Yes" && additionalInfo["special-needs"].length > 0
          ? additionalInfo["special-needs"].join(", ")
          : "No"
      );
      // Accommodation status and details
      formDataToSend.append("accommodation_status", formValues.accommodation || "");
      formDataToSend.append("accommodation_details", accommodationDetails || "");
      // Travel info
      if (formValues.state === "Rwanda") {
        formDataToSend.append("arrival_datetime", null as any);
        formDataToSend.append("departure_datetime", null as any);
        formDataToSend.append("airline", null as any);
      } else {
        formDataToSend.append("arrival_datetime", formValues.arrivalDateTime || "");
        formDataToSend.append("departure_datetime", formValues.departureDateTime || "");
        formDataToSend.append("airline", formValues.airline || "");
      }
      // Event/session info
      formDataToSend.append("selected_event", "4th EAC World Kiswahili Language Day Celebrations");
      formDataToSend.append("workshopIds", formValues.sessions || "");
      // Optional arrays (empty for now)
      formDataToSend.append("selected_activities", "");
      formDataToSend.append("selected_round_tables", "");

      // Log form data before sending
      console.log("Form data being sent:", Object.fromEntries(formDataToSend));
      // Add timeout to the fetch request
      const controller = new AbortController();
      const requestTimeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      const response = await fetch(`${BACKEND_URL}/delegates`, {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: formDataToSend,
        signal: controller.signal,
      });
      clearTimeout(requestTimeout);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Registration failed: ${response.status} ${response.statusText}`);
      }
      const responseData = await response.json();
      console.log("Registration successful:", responseData);
      // Generate random registration ID between 001 and 500
      const randomNumber = Math.floor(Math.random() * 500) + 1;
      const regId = `RFF${String(randomNumber).padStart(3, "0")}`;
      setRegistrationId(regId);
      setIsSubmitted(true);
      toast.success("Registration submitted successfully!", {
        style: {
          backgroundColor: "#dcfce7",
          color: "#166534",
          border: "1px solid #86efac",
          borderRadius: "8px",
          padding: "16px",
        },
        dismissible: true,
        duration: 4000,
      });
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Failed to submit registration";
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "Registration request timed out. Please try again.";
        } else {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage, {
        style: {
          backgroundColor: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          padding: "16px",
        },
        dismissible: true,
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  // Check if current question has a value
  const hasValue = (id: string): boolean => {
    if (id === "sessions") return !!formValues.sessions

    if (id === "name") return !!(formData.firstName && formData.lastName)
    return formValues[id as keyof DelegateFormValues] !== undefined && formValues[id as keyof DelegateFormValues] !== ""
  }
  console.log(hasValue("id"))

  // Get a formatted preview label for a question
  const getPreviewLabel = (questionId: string): string => {
    for (const stepId in QUESTIONS) {
      const foundQuestion = QUESTIONS[stepId as keyof typeof QUESTIONS].find((q) => q.id === questionId)
      if (foundQuestion) {
        return foundQuestion.previewLabel || foundQuestion.question.replace("?", "")
      }
    }
    return questionId
  }

  // Render form input based on question type
  const renderFormInput = () => {
    if (!currentQuestion) return null
    switch (currentQuestion.type) {
      case "name":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6 grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Name"
              value={formData.firstName || ""}
              onChange={(e) => handleNameChange("firstName", e.target.value)}
              className="h-12 text-lg"
            />
            <Input
              type="text"
              placeholder="Surname"
              value={formData.lastName || ""}
              onChange={(e) => handleNameChange("lastName", e.target.value)}
              className="h-12 text-lg"
            />
          </div>
        )
      case "text":
      case "email":
        const isPhoneField = currentQuestion.id === "phoneNumber"
        const phoneValue = isPhoneField ? formValues[currentQuestion.id as keyof typeof formValues] || "" : ""
        const hasPhoneError = isPhoneField && phoneValue.length > 0 && !phoneRegex.test(phoneValue)

        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6">
            <Input
              type={currentQuestion.type}
              placeholder={currentQuestion.placeholder || ""}
              value={formValues[currentQuestion.id as keyof typeof formValues] || ""}
              onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
              className={cn("w-full h-12 text-lg", hasPhoneError ? "border-red-500 focus-visible:ring-red-500" : "")}
            />
            {hasPhoneError && (
              <p className="text-red-500 text-sm mt-1">
                Phone number must start with &apos;+&apos; and be at least 10 characters long
              </p>
            )}
          </div>
        )
      case "datetime-local":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6">
            <Input
              type="datetime-local"
              value={formValues[currentQuestion.id as keyof typeof formValues] || ""}
              onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
              className="w-full h-12 text-lg"
            />
          </div>
        )
      case "textarea":
        return (
          <Textarea
            placeholder={currentQuestion.placeholder || ""}
            value={formValues[currentQuestion.id as keyof typeof formValues] || ""}
            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
            className="w-full max-w-full md:max-w-md mx-auto mt-6 min-h-[150px] text-lg"
          />
        )
      case "select":
        if (currentQuestion.id === "delegateType") {
          return (
            <Select
              value={getDelegateTypeLabel(formValues.delegateType)}
              onValueChange={(label) => handleInputChange("delegateType", label)}
            >
              <SelectTrigger className="w-full max-w-full md:max-w-md mx-auto mt-6 h-12 text-lg">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {delegateTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }
        return (
          <Select
            value={formValues[currentQuestion.id as keyof typeof formValues] || ""}
            onValueChange={(value) => handleInputChange(currentQuestion.id, value)}
          >
            <SelectTrigger className="w-full max-w-full md:max-w-md mx-auto mt-6 h-12 text-lg">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "country":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6" ref={countryInputRef}>
            <div className="relative">
              <Input
                key={`country-${currentQuestion.id}`}
                type="text"
                placeholder="Search for a country..."
                value={countrySearch || formValues.country || ""}
                onChange={(e) => {
                  setCountrySearch(e.target.value)
                  setShowCountryDropdown(true)
                }}
                onFocus={() => setShowCountryDropdown(true)}
                className={cn("w-full h-12 text-lg", errors.country ? "border-red-500 focus-visible:ring-red-500" : "")}
              />
              {showCountryDropdown && (
                <div className="absolute z-10 w-full max-h-60 overflow-y-auto border rounded-md bg-white shadow-md mt-1">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <div
                        key={country}
                        className={cn(
                          "p-3 cursor-pointer hover:bg-gray-100",
                          formValues.country === country ? "bg-blue-50 text-[#026FB4]" : "",
                        )}
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500">No countries found</div>
                  )}
                </div>
              )}
            </div>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message as string}</p>}
          </div>
        )
      case "state":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6">
            <Select value={formValues.state || ""} onValueChange={(value) => handleInputChange("state", value)}>
              <SelectTrigger
                className={cn("w-full h-12 text-lg", errors.state ? "border-red-500 focus-visible:ring-red-500" : "")}
              >
                <SelectValue placeholder="Select EAC Partner State" />
              </SelectTrigger>
              <SelectContent>
                {EAC_COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message as string}</p>}
          </div>
        )
      case "sessions":
        return (
          <div className="w-full max-w-2xl mx-auto mt-6">
            {workshopsLoading && <div className="text-center text-gray-500">Loading sessions...</div>}
            {workshopsError && <div className="text-center text-red-500">{workshopsError}</div>}
            {!workshopsLoading && !workshopsError && workshops.length === 0 && (
              <div className="text-center text-gray-500">No sessions available.</div>
            )}
            {!workshopsLoading && !workshopsError && workshops.length > 0 && (
              <RadioGroup
                value={formValues.sessions || ""}
                onValueChange={(value) => handleInputChange("sessions", value)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
              >
                {workshops.map((workshop) => {
                  const isFull = workshop.registered >= workshop.capacity;
                  const remainingCapacity = workshop.capacity - workshop.registered;
                  return (
                    <div className="flex items-center space-x-2" key={workshop.id}>
                      <RadioGroupItem
                        value={workshop.id}
                        id={workshop.id}
                        disabled={isFull}
                        className={isFull ? "opacity-50 cursor-not-allowed" : ""}
                      />
                      <Label htmlFor={workshop.id} className="flex-1">
                        <div className="border rounded-lg p-4 text-center transition-all cursor-pointer hover:border-gray-300">
                          <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                              <div className="text-[#026FB4]">🎯</div>
                            </div>
                          </div>
                          <div className="font-medium text-lg mb-2">{workshop.title}</div>
                          <div className="text-sm text-gray-500 mb-2">{workshop.venue} | {workshop.schedule ? new Date(workshop.schedule).toLocaleString() : ""}</div>
                          <div className="text-sm font-medium mt-2">
                            {isFull ? (
                              <span className="text-red-600 font-semibold">Full</span>
                            ) : (
                              <span className="text-green-600">{remainingCapacity} spots left</span>
                            )}
                          </div>
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            )}
          </div>
        )
      case "file":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6">
            {/* Add disclaimer above the upload area */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-700">
              <p className="font-medium text-[#026FB4] mb-1">DISCLAIMER!</p>
              <p>Your picture is meant is for your identification and future EAC events in Rwanda"</p>
              <p className="pt-2">Max size - 1 MB</p>
            </div>
            <div
              className="border-2 border-dashed rounded-md p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={handleUploadAreaClick}
            >
              <div className="space-y-4 text-center">
                {profileImage ? (
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#026FB4]">
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                      <ImagePlus className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-base font-medium text-[#026FB4]">Upload file</p>
                  <p className="text-sm text-gray-500 mt-1">Click to upload or drag and drop</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                required
              />
            </div>
          </div>
        )
      case "radio":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6">
            <RadioGroup
              value={formValues[currentQuestion.id as keyof typeof formValues] || ""}
              onValueChange={(value) => handleRadioChange(currentQuestion.id, value)}
              className="flex space-x-8 justify-center mt-4"
            >
              {currentQuestion.options?.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={option.toLowerCase()} className="w-5 h-5" />
                  <Label htmlFor={option.toLowerCase()} className="text-lg">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {/* Dietary restrictions input field */}
            {currentQuestion.id === "dietary" &&
              formValues[currentQuestion.id as keyof typeof formValues] === "Yes" && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <div className="mb-3">
                    <Label className="text-base text-gray-700 font-medium mb-2 block">
                      Please specify your dietary restrictions:
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        value={newDietaryNeed}
                        onChange={(e) => setNewDietaryNeed(e.target.value)}
                        placeholder="E.g., Vegetarian, Gluten-free, etc."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleAddDietaryNeed}
                        className="bg-[#026FB4]"
                        disabled={!newDietaryNeed.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {additionalInfo.dietary?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {additionalInfo.dietary.map((info, index) => (
                        <div
                          key={index}
                          className="text-sm p-3 bg-white rounded border flex justify-between items-center"
                        >
                          <span>{info}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              const newDietary = [...additionalInfo.dietary]
                              newDietary.splice(index, 1)
                              setAdditionalInfo({
                                ...additionalInfo,
                                dietary: newDietary,
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            {/* Special needs input field */}
            {currentQuestion.id === "special-needs" &&
              formValues["special-needs" as keyof typeof formValues] === "Yes" && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <div className="mb-3">
                    <Label className="text-base text-gray-700 font-medium mb-2 block">
                      Please specify your special needs:
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        value={newSpecialNeed}
                        onChange={(e) => setNewSpecialNeed(e.target.value)}
                        placeholder="E.g., Wheelchair access, etc."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleAddSpecialNeed}
                        className="bg-[#026FB4]"
                        disabled={!newSpecialNeed.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {additionalInfo["special-needs"]?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {additionalInfo["special-needs"].map((info, index) => (
                        <div
                          key={index}
                          className="text-sm p-3 bg-white rounded border flex justify-between items-center"
                        >
                          <span>{info}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              const newSpecialNeeds = [...additionalInfo["special-needs"]]
                              newSpecialNeeds.splice(index, 1)
                              setAdditionalInfo({
                                ...additionalInfo,
                                "special-needs": newSpecialNeeds,
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            {/* Accommodation input field */}
            {currentQuestion.id === "accommodation" &&
              (formValues.accommodation === "Booked" || formValues.accommodation === "Other") && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <div className="mb-3">
                    <Label className="text-base text-gray-700 font-medium mb-2 block">
                      {formValues.accommodation === "Booked"
                        ? "Please specify the hotel/place name:"
                        : "Please specify your accommodation arrangement:"}
                    </Label>
                    <Input
                      value={accommodationDetails}
                      onChange={(e) => setAccommodationDetails(e.target.value)}
                      placeholder={
                        formValues.accommodation === "Booked"
                          ? "Hotel name or accommodation place"
                          : "e.g., Staying at home, with family, etc."
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              )}

            {/* ID Type conditional input */}
            {currentQuestion.id === "idType" && formValues.idType && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <div className="mb-3">
                  <Label className="text-base text-gray-700 font-medium mb-2 block">
                    {formValues.idType === "National ID Number" ? "National ID" : "Passport Number"}
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    value={formValues.idNumber || ""}
                    onChange={(e) => {
                      handleInputChange("idNumber", e.target.value)
                      setIdType(formValues.idType || "")
                    }}
                    placeholder={
                      formValues.idType === "National ID Number"
                        ? "Enter 16 digit National ID"
                        : "Enter passport number"
                    }
                    className={cn(
                      "w-full",
                      formValues.idType === "National ID Number" &&
                        formValues.idNumber &&
                        formValues.idNumber.length !== 16
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "",
                    )}
                  />
                  {formValues.idType === "National ID Number" && (
                    <p className="text-sm text-orange-600 mt-1">
                      Selecting National ID as the type requires you to input the National ID number (16 digits)
                    </p>
                  )}
                  {formValues.idType === "National ID Number" &&
                    formValues.idNumber &&
                    formValues.idNumber.length !== 16 && (
                      <p className="text-red-500 text-sm mt-1">National ID must be exactly 16 characters</p>
                    )}
                </div>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }
  // Render summary view - Updated to include travel info
  const renderSummaryView = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-10">
          <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-green-600">Registration Complete!</h2>
          <div className="max-w-md mx-auto bg-green-50 p-6 rounded-lg mb-8 border border-green-200">
            <p className="text-gray-700 text-lg mb-4">Thank you for registering for the FutureSkills Forum!</p>
            <p className="text-gray-600">
              You will soon receive confirmation to <span className="font-bold">{formValues.email}</span> with all the
              details.
            </p>
            <p className="text-gray-600 mt-4">Your registration ID: {registrationId}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="py-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Review Your Information</h2>
        <p className="text-gray-600 mb-8 text-center">Please review your information before submitting.</p>
        <div className="space-y-8">
          {STEPS.map((step) => (
            <div key={step.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-medium text-lg">{step.label}</h3>
              </div>
              <div className="p-4 space-y-3">
                {QUESTIONS[step.id as keyof typeof QUESTIONS]?.map((question) => {
                  // Fix type error by using type assertion
                  const value = formValues[question.id as keyof DelegateFormValues]
                  let displayValue = value
                  if (question.id === "photo") {
                    displayValue = "Uploaded"
                  } else if (question.id === "dietary" && value === "Yes") {
                    if (additionalInfo.dietary?.length > 0) {
                      displayValue = additionalInfo.dietary.join(", ")
                    } else {
                      displayValue = "Yes"
                    }
                  } else if (question.id === "special-needs" && value === "Yes") {
                    if (additionalInfo["special-needs"]?.length > 0) {
                      displayValue = additionalInfo["special-needs"].join(", ")
                    } else {
                      displayValue = "Yes"
                    }
                  } else if (question.id === "sessions") {
                    const foundWorkshop = workshops.find(w => w.id === value)
                    displayValue = foundWorkshop ? foundWorkshop.title : value
                    if (!displayValue) return null
                  } else if (question.id === "arrivalDateTime" || question.id === "departureDateTime") {
                    // Format datetime for display
                    if (value) {
                      const date = new Date(value)
                      displayValue = date.toLocaleString()
                    }
                  }
                  return (
                    <div key={question.id} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">{question.previewLabel}:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">{displayValue}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  // Calculate the circle progress style
  const circleRadius = 20
  const circleCircumference = 2 * Math.PI * circleRadius
  const strokeDashoffset = circleCircumference * (1 - progress / 100)
  // Fetch workshops from API

  // Get delegateType options from QUESTIONS
  const delegateTypeOptions = QUESTIONS['professional-info'][0].options as string[];
  const delegateTypeEnumValues = ["GOV", "SCH/PLT", "DP", "ENT", "EXP", "CSO"];

  // Helper to map label to enum value
  const getDelegateTypeEnum = (label: string): string => {
    const idx = delegateTypeOptions.indexOf(label);
    return idx !== -1 ? delegateTypeEnumValues[idx] : label;
  };
  // Helper to map enum value to label
  const getDelegateTypeLabel = (value: string): string => {
    const idx = delegateTypeEnumValues.indexOf(value);
    return idx !== -1 ? delegateTypeOptions[idx] : value;
  };

  // 1. Make all fields required in QUESTIONS
  Object.keys(QUESTIONS).forEach((stepKey) => {
    QUESTIONS[stepKey].forEach((q) => {
      q.required = true;
    });
  });

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      {/* Simple Toaster without custom options that cause type errors */}
      <Toaster position="top-right" />

      {/* Styled reset form button */}
      <button
        onClick={debugReset}
        className="fixed bottom-4 right-4 bg-[#026FB4] hover:bg-[#025d96] text-white px-4 py-2 z-50 text-sm rounded-md shadow-md flex items-center transition-all duration-200 opacity-80 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Reset Form
      </button>
      <div
        ref={formRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] relative"
      >
        {/* Mobile Step Navigation */}
        <div className="lg:hidden bg-white border-b p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 text-gray-600 hover:text-[#026FB4] hover:bg-blue-50"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Link>
              </Button>
              <Image
                src="/repub.jpeg"
                alt="FutureSkills Logo"
                width={120}
                height={40}
                className="w-[100px] sm:w-[120px] md:w-[150px]"
              />
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#026FB4]">{progress}% Complete</div>
          </div>
          <div className="flex overflow-x-auto pb-2 space-x-1 sm:space-x-2 no-scrollbar">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex-shrink-0 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
                  currentStepIndex === index && !isSummaryView
                    ? "bg-blue-50 text-[#026FB4] border border-[#026FB4]"
                    : "text-gray-600 border border-gray-200",
                )}
              >
                {step.label}
              </div>
            ))}
            <div
              className={cn(
                "flex-shrink-0 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
                isSummaryView
                  ? "bg-blue-50 text-[#026FB4] border border-[#026FB4]"
                  : "text-gray-600 border border-gray-200",
              )}
            >
              Review & Submit
            </div>
          </div>
        </div>
        {/* Rest of the form */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_350px]">
          {/* Sidebar */}
          <div className="hidden lg:block bg-gray-50 p-6 border-r">
            <div className="mb-6 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 text-gray-600 hover:text-[#026FB4] hover:bg-blue-50"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                </Link>
              </Button>
            </div>
            <div className="mb-10">
              <Link href="/landing">
                <Image src="/eac.jpeg" alt="FutureSkills Logo" width={180} height={60} />
              </Link>
            </div>
            <nav className="space-y-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center p-4 rounded-md transition-colors cursor-pointer",
                    currentStepIndex === index && !isSummaryView
                      ? "bg-blue-50 text-[#026FB4]"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                  onClick={() => {
                    // Only allow going to previous steps or current step
                    if (index <= currentStepIndex) {
                      setCurrentStepIndex(index)
                      setCurrentQuestionIndex(0)
                      setIsSummaryView(false)
                      setValidationError(null)
                    }
                  }}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm",
                      currentStepIndex === index && !isSummaryView
                        ? "bg-[#026FB4] text-white"
                        : "bg-gray-200 text-gray-600",
                    )}
                  >
                    {index + 1}
                  </div>
                  <span className="text-base font-medium">{step.label}</span>
                  <span className="ml-auto bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {step.count}
                  </span>
                </div>
              ))}

              {/* Summary step - also make clickable */}
              <div
                className={cn(
                  "flex items-center p-4 rounded-md transition-colors cursor-pointer",
                  isSummaryView ? "bg-blue-50 text-[#026FB4]" : "text-gray-600 hover:bg-gray-100",
                )}
                onClick={() => {
                  // Only allow going to summary if all steps are completed
                  if (currentStepIndex === STEPS.length - 1 && currentQuestionIndex === questions.length - 1) {
                    setIsSummaryView(true)
                    setValidationError(null)
                  }
                }}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm",
                    isSummaryView ? "bg-[#026FB4] text-white" : "bg-gray-200 text-gray-600",
                  )}
                >
                  {STEPS.length + 1}
                </div>
                <span className="text-base font-medium">Review & Submit</span>
                <span className="ml-auto bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  1
                </span>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-10 flex flex-col overflow-y-auto" ref={formContainerRef}>
            {!isSummaryView ? (
              <>
                <div className="flex items-center mb-8">
                  <div className="relative w-20 h-20">
                    {/* SVG Circle Progress */}
                    <svg className="w-20 h-20" viewBox="0 0 44 44">
                      <circle
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r={circleRadius}
                        cx="22"
                        cy="22"
                      />
                      <circle
                        className="text-[#026FB4]"
                        strokeWidth="4"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={circleRadius}
                        cx="22"
                        cy="22"
                        style={{
                          transition: "stroke-dashoffset 0.5s ease-in-out",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-base font-medium text-[#026FB4]">
                      {progress}%
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-500">
                      Question {currentQuestionNumber}/{totalQuestions}
                    </div>
                    <h2 className="text-2xl font-bold mt-1">{currentQuestion?.question}</h2>
                  </div>
                </div>

                {/* Form Input */}
                {renderFormInput()}

                {/* Validation Error */}
                {validationError && (
                  <Alert variant="destructive" className="mt-4 max-w-full md:max-w-md mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              renderSummaryView()
            )}

            {/* Navigation Buttons - improved for mobile */}
            {!isSubmitted && (
              <div className="mt-auto pt-4 sm:pt-6 md:pt-10 flex flex-wrap justify-between gap-2 sm:gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={(currentStepIndex === 0 && currentQuestionIndex === 0 && !isSummaryView) || isSubmitting}
                  className="h-10 sm:h-12 px-3 sm:px-6 text-sm sm:text-base"
                >
                  <div className="flex items-center justify-center">
                    <ChevronLeft className="mr-1 h-4 w-4 sm:h-5 sm:w-5" /> Back
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const previewPanel = document.querySelector(".preview-panel")
                      if (previewPanel) {
                        previewPanel.classList.toggle("mobile-preview-active")
                      }
                    }
                  }}
                  className="md:hidden h-10 sm:h-12 px-3 sm:px-6 text-sm sm:text-base"
                >
                  Preview
                </Button>
                <Button
                  onClick={handleNext}
                  className={cn(
                    "bg-[#026FB4] hover:bg-[#025d96] text-white h-10 sm:h-12 px-3 sm:px-6 text-sm sm:text-base",
                    isSubmitting && "opacity-70 cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </div>
                  ) : isSummaryView ? (
                    "Submit Registration"
                  ) : (
                    <div className="flex items-center justify-center">
                      Next <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  )}
                </Button>
              </div>
            )}
            {/* Progress Dots */}
            {!isSummaryView && !isSubmitted && (
              <div className="mt-10 flex justify-center space-x-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      index === currentQuestionIndex ? "w-10 bg-[#026FB4]" : "w-5 bg-gray-200",
                    )}
                  ></div>
                ))}
              </div>
            )}
          </div>
          {/* Preview Panel */}
          <div className="hidden md:block bg-gray-50 p-6 border-l">
            <div className="text-right mb-4 text-base text-gray-500 font-medium">Preview</div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  {profileImage && (
                    <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill style={{ objectFit: "cover" }} />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-lg">
                    {formValues.firstName && formValues.lastName
                      ? `${formValues.firstName} ${formValues.lastName}`
                      : "Your Name"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formValues.position ? formValues.position : ""}
                    {formValues.position && formValues.organization ? " at " : ""}
                    {formValues.organization ? formValues.organization : ""}
                    {!formValues.position && !formValues.organization && "Position or Organization"}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-base">
                {/* Only show questions from the current section */}
                {Object.entries(formValues).map(([key, value]) => {
                  if (!value || value === "") return null
                  // Check if the question belongs to the current step
                  let belongsToCurrentStep = false
                  if (!isSummaryView) {
                    belongsToCurrentStep = QUESTIONS[currentStep.id]?.some((q) => q.id === key) || false
                  } else {
                    // In summary view, show all fields
                    belongsToCurrentStep = true
                  }
                  if (!belongsToCurrentStep) return null
                  // Get the formatted preview label
                  const previewLabel = getPreviewLabel(key)
                  // Special handling for file uploads and radio buttons
                  let displayValue = value
                  if (key === "photo") {
                    displayValue = "Uploaded"
                  } else if (key === "dietary" && value === "Yes") {
                    if (additionalInfo.dietary?.length > 0) {
                      displayValue = additionalInfo.dietary.join(", ")
                    } else {
                      displayValue = "Yes"
                    }
                  } else if (key === "special-needs" && value === "Yes") {
                    if (additionalInfo["special-needs"]?.length > 0) {
                      displayValue = additionalInfo["special-needs"].join(", ")
                    } else {
                      displayValue = "Yes"
                    }
                  } else if (key === "sessions") {
                    const foundWorkshop = workshops.find(w => w.id === value)
                    displayValue = foundWorkshop ? foundWorkshop.title : value
                    if (!displayValue) return null
                  } else if (key === "arrivalDateTime" || key === "departureDateTime") {
                    // Format datetime for display
                    if (value) {
                      const date = new Date(value)
                      displayValue = date.toLocaleString()
                    }
                  }
                  return (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">{previewLabel}:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">{displayValue}</span>
                    </div>
                  )
                })}
                {/* Show name in preview even if not in formValues */}
                {currentStep.id === "personal-info" &&
                  !Object.keys(formValues).includes("firstName") &&
                  formData.firstName &&
                  formData.lastName && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">Names:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">
                        {`${formData.firstName} ${formData.lastName}`}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Mobile Preview Panel */}
        <div className="preview-panel md:hidden fixed inset-0 bg-white z-50 transform translate-y-full transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center p-3 sm:p-4 border-b">
            <h3 className="font-medium text-base sm:text-lg">Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (typeof window !== "undefined") {
                  const previewPanel = document.querySelector(".preview-panel")
                  if (previewPanel) {
                    previewPanel.classList.toggle("mobile-preview-active")
                  }
                }
              }}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-60px)]">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  {profileImage && (
                    <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill style={{ objectFit: "cover" }} />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-lg">
                    {formValues.firstName && formValues.lastName
                      ? `${formValues.firstName} ${formValues.lastName}`
                      : "Your Name"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formValues.position ? formValues.position : ""}
                    {formValues.position && formValues.organization ? " at " : ""}
                    {formValues.organization ? formValues.organization : ""}
                    {!formValues.position && !formValues.organization && "Position or Organization"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-base">
                {/* Only show questions from the current section */}
                {Object.entries(formValues).map(([key, value]) => {
                  if (!value || value === "") return null
                  // Check if the question belongs to the current step
                  let belongsToCurrentStep = false
                  if (!isSummaryView) {
                    belongsToCurrentStep = QUESTIONS[currentStep.id]?.some((q) => q.id === key) || false
                  } else {
                    // In summary view, show all fields
                    belongsToCurrentStep = true
                  }
                  if (!belongsToCurrentStep) return null
                  // Get the formatted preview label
                  const previewLabel = getPreviewLabel(key)
                  // Special handling for file uploads and radio buttons
                  let displayValue = value
                  if (key === "photo") {
                    displayValue = "Uploaded"
                  } else if (key === "dietary" && value === "Yes") {
                    if (additionalInfo.dietary?.length > 0) {
                      displayValue = additionalInfo.dietary.join(", ")
                    } else {
                      displayValue = "Yes"
                    }
                  } else if (key === "special-needs" && value === "Yes") {
                    if (additionalInfo["special-needs"]?.length > 0) {
                      displayValue = additionalInfo["special-needs"].join(", ")
                    } else {
                      displayValue = "Yes"
                    }
                  } else if (key === "sessions") {
                    const foundWorkshop = workshops.find(w => w.id === value)
                    displayValue = foundWorkshop ? foundWorkshop.title : value
                    if (!displayValue) return null
                  } else if (key === "arrivalDateTime" || key === "departureDateTime") {
                    // Format datetime for display
                    if (value) {
                      const date = new Date(value)
                      displayValue = date.toLocaleString()
                    }
                  }
                  return (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">{previewLabel}:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">{displayValue}</span>
                    </div>
                  )
                })}
                {/* Show name in preview even if not in formValues */}
                {currentStep.id === "personal-info" &&
                  !Object.keys(formValues).includes("firstName") &&
                  formData.firstName &&
                  formData.lastName && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">Names:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">
                        {`${formData.firstName} ${formData.lastName}`}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @keyframes shimmerReverse {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes shimmerVertical {
          0% {
            background-position: 0 200%;
          }
          100% {
            background-position: 0 -200%;
          }
        }
        @keyframes shimmerVerticalReverse {
          0% {
            background-position: 0 -200%;
          }
          100% {
            background-position: 0 200%;
          }
        }
        .mobile-preview-active {
          transform: translateY(0) !important;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .container {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}
