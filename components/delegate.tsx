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
import { Checkbox } from "@/components/ui/checkbox"
import { toast, Toaster } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Logo image
import FutureSkillsLogo from "@/public/global.png"
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

// Define workshop interface
interface Workshop {
  id: string
  title: string
  name: string
  icon: string
  capacity: number
  registered: number
  venue: string
  schedule: string
  // short_description: string
}

// Define round table interface
interface RoundTable {
  id: string
  name: string
  description: string
}

// Define activity interface
interface Activity {
  id: string
  name: string
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
  "Cote d’Ivoire",
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


// Define the main steps
const STEPS = [
  { id: "personal-info", label: "Personal Info", count: 8 },
  { id: "professional-info", label: "Professional Info", count: 3 },
  { id: "event-based-info", label: "Event-Based Info", count: 1 },
]

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation regex (simple version)
const phoneRegex = /^\+[0-9\s-]{9,}$/;


// Define workshops (will be overridden by API data)
// const WORKSHOPS: Workshop[] = []
// console.log(WORKSHOPS)

// Define round tables
const ROUND_TABLES: RoundTable[] = [
  {
    id: "rt1",
    name: "RT1: Governance",
    description: "Planning, management, financing, quality assurance of TVET",
  },
  {
    id: "rt2",
    name: "RT2: Content",
    description: "Occupational standards, TVET programs and curricula development/revision",
  },
  {
    id: "rt3",
    name: "RT3: Training",
    description: "Training, CPD and retention of TVET teacher and trainers",
  },
  {
    id: "rt4",
    name: "RT4: Assessment",
    description: "Competence-based assessment, skills/trade tests, RPL",
  },
  {
    id: "rt5",
    name: "RT5: Dual Training",
    description: "Dual training for full qualification or short courses",
  },
  {
    id: "rt6",
    name: "RT6: Industry Exposure",
    description: "Industry-based training and industrial attachments",
  },
  {
    id: "rt7",
    name: "RT7: Entrepreneurship",
    description: "Entrepreneurship, business development and soft skills",
  },
  {
    id: "rt8",
    name: "RT8: Labour Market Transition",
    description: "Employability of TVET graduates, entrepreneurship and soft skills",
  },
]

// Update activities title
const ACTIVITIES: Activity[] = [
  { id: "marone", name: "Network and Knowledge Exchange 2 - Marketplace 1" },
  { id: "martwo", name: "Network and Knowledge Exchange 2 - Marketplace 2" },
]

// Update the QUESTIONS object - replace NID/Passport with gender dropdown
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
        return "Both first and last name are required";
      }
      return null;
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
      validation: (value) => (!phoneRegex.test(value) ? "Please enter a valid phone number(Format: +250 798 123 432)" : null),
    },
    {
      id: "gender",
      question: "What is your gender?",
      type: "select",
      options: ["Male", "Female", "Other"],
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
  ],
  "professional-info": [
    {
      id: "delegateType",
      question: "What type of delegate are you?",
      type: "select",
      options: [
        "Public Sector Representative(GOV)",
        "TVET Providers Representative(SCH/PLT)",
        "Donor and Partner Representative(DP)",
        "Private Sector Representative(ENT)",
        "TVET Expert Representative(EXP)",
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
      id: "workshops",
      question: "Select workshops you want to attend",
      type: "workshops",
      previewLabel: "Workshops",
      required: true,
      // description: "Global Skills Event",
    },
    // Removed roundTables and activities
  ],
}

// Add a summary step
const SUMMARY_STEP = { id: "summary", label: "Review & Submit", count: 1 }

// Define Zod schema for form validation with better error messages
const delegateFormSchema = z.object({
  fullNames: z.string().min(3, "Full name must be at least 3 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().regex(/^\+[0-9\s-]{9,}$/, "Phone number must start with '+' and be at least 10 characters long"),
  gender: z.string().min(1, "Please select your gender"),
  country: z.string().min(1, "Please select your nationality"),
  photo: z.any().optional(),
  dietary: z.string().min(1, "Please indicate if you have dietary restrictions"),
  "special-needs": z.string().min(1, "Please indicate if you have any special needs"),
  delegateType: z.enum(["GOV", "SCH/PLT", "DP", "ENT", "EXP"], {
    errorMap: () => ({ message: "Please select a valid delegate type" }),
  }),
  position: z.string().min(1, "Please enter your position"),
  organization: z.string().min(1, "Please enter your organization"),
  workshops: z.array(z.string()).min(1, "Please select at least one workshop"),
  roundTables: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
})

type DelegateFormValues = z.infer<typeof delegateFormSchema>

export default function DelegateForm() {
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
  const [, setSelectedWorkshops] = useState<string[]>([])
  // New state for morning and afternoon workshop selections
  const [morningWorkshop, setMorningWorkshop] = useState<string | null>(null)
  const [afternoonWorkshop, setAfternoonWorkshop] = useState<string | null>(null)
  // Add formData state
  const [formData, setFormData] = useState<Partial<DelegateFormValues>>({})

  // Add workshops state from API
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [morningWorkshops, setMorningWorkshops] = useState<Workshop[]>([])
  const [afternoonWorkshops, setAfternoonWorkshops] = useState<Workshop[]>([])
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(false)
  const [workshopsError, setWorkshopsError] = useState<string | null>(null)

  const [selectedRoundTables, setSelectedRoundTables] = useState<string[]>([])
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [, setAnimationPosition] = useState(0)
  const [countrySearch, setCountrySearch] = useState("")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState<string[]>(COUNTRIES)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Add state for registration ID
  const [registrationId, setRegistrationId] = useState<string>("")

// Setup React Hook Form
const {
  // control,
  // handleSubmit: hookFormSubmit,
  setValue,
  watch,
  formState: { errors },
  // trigger,
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
    photo: undefined,
    dietary: "",
    "special-needs": "",
    delegateType: "GOV" as "GOV" | "SCH/PLT" | "DP" | "ENT" | "EXP",
    position: "",
    organization: "",
    workshops: [],
    roundTables: [],
    activities: [],
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
  const countryInputRef = useRef<HTMLInputElement>(null)

  // Calculate current step and question
  const currentStep = isSummaryView ? SUMMARY_STEP : STEPS[currentStepIndex]
  const questions = !isSummaryView ? QUESTIONS[currentStep.id as keyof typeof QUESTIONS] : []
  const currentQuestion = !isSummaryView ? questions[currentQuestionIndex] : null

  // Calculate total questions and progress
  const totalQuestions = STEPS.reduce((acc, step) => acc + QUESTIONS[step.id as keyof typeof QUESTIONS].length, 0)

  // Calculate completed questions count
  // const completedQuestionsCount = Object.keys(formValues).filter((key) => {
  //   const value = formValues[key as keyof DelegateFormValues]
  //   if (Array.isArray(value)) {
  //     return value.length > 0
  //   }
  //   return value !== undefined && value !== ""
  // }).length

  // console.log(completedQuestionsCount)

  // Calculate progress percentage - start at 0% and increment uniformly
  const calculateProgress = () => {
    if (isSummaryView) return 100

    // Calculate based on current question position
    let questionsSoFar = 0
    for (let i = 0; i < currentStepIndex; i++) {
      questionsSoFar += QUESTIONS[STEPS[i].id as keyof typeof QUESTIONS].length
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

  // Calculate selection capacity for round tables


  // Animation for the border
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPosition((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Update form data when workshops, round tables, or activities change
  useEffect(() => {
    // Update workshops in form data when morning or afternoon selections change
    if (morningWorkshop || afternoonWorkshop) {
      const workshopSelections = [
        ...(morningWorkshop ? [morningWorkshop] : []),
        ...(afternoonWorkshop ? [afternoonWorkshop] : []),
      ]
  
      setValue("workshops", workshopSelections)
      setFormData((prev) => ({
        ...prev,
        workshops: workshopSelections,
      }))
  
      // Update selectedWorkshops state for preview
      setSelectedWorkshops(workshopSelections)
      console.log("Selected workshops:", workshopSelections) // ✅ safe to log directly
    } else {
      setValue("workshops", [])
      setFormData((prev) => ({
        ...prev,
        workshops: [],
      }))
      setSelectedWorkshops([])
    }
  }, [morningWorkshop, afternoonWorkshop, setValue]) // ✅ No warning now
  

  useEffect(() => {
    if (selectedRoundTables.length > 0) {
      setValue("roundTables", selectedRoundTables)
    }
  }, [selectedRoundTables, setValue])

  useEffect(() => {
    if (selectedActivities.length > 0) {
      setValue("activities", selectedActivities)
    }
  }, [selectedActivities, setValue])

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
      questionNumber += QUESTIONS[STEPS[i].id as keyof typeof QUESTIONS].length
    }
    questionNumber += currentQuestionIndex + 1
    return questionNumber
  }

  // Handle form input changes
  const handleInputChange = (id: string, value: string) => {
    setValidationError(null)
    setValue(id as keyof DelegateFormValues, value)
    setFormData((prev) => ({ ...prev, [id]: value }))
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

  // Handle morning workshop selection
  const handleMorningWorkshopSelect = (workshopId: string) => {
    const workshop = morningWorkshops.find(w => w.id === workshopId);
    // Check if workshop exists and if it's full
    if (workshop && workshop.registered >= workshop.capacity) {
      toast.error("This workshop is full and cannot be selected.");
      return; // Prevent selection if full
    }
    setValidationError(null)
    setMorningWorkshop(morningWorkshop === workshopId ? null : workshopId)
  }

  // Handle afternoon workshop selection
  const handleAfternoonWorkshopSelect = (workshopId: string) => {
    const workshop = afternoonWorkshops.find(w => w.id === workshopId);
    // Check if workshop exists and if it's full
    if (workshop && workshop.registered >= workshop.capacity) {
      toast.error("This workshop is full and cannot be selected.");
      return; // Prevent selection if full
    }
    setValidationError(null)
    setAfternoonWorkshop(afternoonWorkshop === workshopId ? null : workshopId)
  }

  // Handle round table selection
  const handleRoundTableToggle = (roundTableId: string) => {
    setValidationError(null);
    const currentSelection = selectedRoundTables;
    let newRoundTables;
    if (currentSelection.includes(roundTableId)) {
      // Remove the ID if it exists
      newRoundTables = currentSelection.filter((id) => id !== roundTableId);
    } else {
      // Add the ID if it doesn't exist
      newRoundTables = [...currentSelection, roundTableId];
    }
    setSelectedRoundTables(newRoundTables);
    setValue("roundTables", newRoundTables);
  };

  // Handle activity selection
  const handleActivityToggle = (activityId: string) => {
    if (selectedActivities.includes(activityId)) {
      const newActivities = selectedActivities.filter((id) => id !== activityId)
      setSelectedActivities(newActivities)
      setValue("activities", newActivities)
    } else {
      const newActivities = [...selectedActivities, activityId]
      setSelectedActivities(newActivities)
      setValue("activities", newActivities)
    }
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

    // Special validation for workshops
    if (currentQuestion.id === "workshops" && !morningWorkshop && !afternoonWorkshop) {
      setValidationError("Please select at least one workshop")
      return false
    }

    // Special validation for round tables
    if (currentQuestion.id === "roundTables" && selectedRoundTables.length === 0) {
      setValidationError("Please select at least one round table")
      return false
    }

    // Activities are optional, so no validation needed

    const value = formValues[currentQuestion.id as keyof DelegateFormValues]

    // Check if required
    if (
      currentQuestion.required &&
      (!value || value === "") &&
      currentQuestion.id !== "workshops" &&
      currentQuestion.id !== "roundTables"
    ) {
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
      setCurrentStepIndex(currentStepIndex - 1)
      const prevQuestions = QUESTIONS[STEPS[currentStepIndex - 1].id as keyof typeof QUESTIONS]
      setCurrentQuestionIndex(prevQuestions.length - 1)
    }
  }

  // Form submission handler
   // Form submission handler
   const handleFormSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('firstName', formValues.firstName || '')
      formDataToSend.append('lastName', formValues.lastName || '')
      formDataToSend.append('email', formValues.email || '')
      formDataToSend.append('username', formValues.email || '')
      formDataToSend.append('myGender', formValues.gender || 'Not Specified')
      formDataToSend.append('role', 'DELEGATE')
      formDataToSend.append('phonenumber', formValues.phoneNumber || '')
      
      // Map delegate type to expected backend values
      const delegateTypeMap: Record<string, string> = {
        'Public Sector Representative(GOV)': 'GOV',
        'TVET Providers Representative(SCH/PLT)': 'SCH/PLT', 
        'Donor and Partner Representative(DP)': 'DP',
        'Private Sector Representative(ENT)': 'ENT',
        'TVET Expert Representative(EXP)': 'EXP'
      }
      
      const mappedDelegateType = delegateTypeMap[formValues.delegateType] || formValues.delegateType
      formDataToSend.append('delegate_type', mappedDelegateType)
      
      // Additional information
      formDataToSend.append('country', formValues.country || '')
      formDataToSend.append('organization', formValues.organization || '')
      formDataToSend.append('position', formValues.position || '')
  
      
      // Handle dietary restrictions
      if (formValues.dietary === 'Yes' && additionalInfo.dietary?.length > 0) {
        formDataToSend.append('dietary_restrictions', additionalInfo.dietary.join(', '))
      } else {
        formDataToSend.append('dietary_restrictions', 'No')
      }

      // Handle special needs
      if (formValues['special-needs'] === 'Yes' && additionalInfo['special-needs']?.length > 0) {
        formDataToSend.append('special_needs', additionalInfo['special-needs'].join(', '))
      } else {
        formDataToSend.append('special_needs', 'No')
      }

      formDataToSend.append('selected_event', 'Global Skill Connect')

      // Handle profile picture
      if (formValues.photo) {
        formDataToSend.append('profile_picture_url', formValues.photo)
      }

      if (morningWorkshop) {
        formDataToSend.append('workshopIds', morningWorkshop)
      }
      if (afternoonWorkshop) {
        formDataToSend.append('workshopIds', afternoonWorkshop)
      }

      // Handle round tables
      if (selectedRoundTables.length > 0) {
        selectedRoundTables.forEach(id => {
          formDataToSend.append('selected_round_tables[]', getRoundTableName(id))
        })
      }

      // Handle activities
      if (selectedActivities.length > 0) {
        selectedActivities.forEach(id => {
          formDataToSend.append('selected_activities[]', getActivityName(id))
        })
      }

      // Log form data before sending
      console.log('Form data being sent:', Object.fromEntries(formDataToSend))

      // Add timeout to the fetch request
      const controller = new AbortController()
      const requestTimeout = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch(`${BACKEND_URL}/delegates`, {
        method: 'POST',
        headers: {
          'accept': '*/*'
        },
        body: formDataToSend,
        signal: controller.signal
      })

      clearTimeout(requestTimeout)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.message || `Registration failed: ${response.status} ${response.statusText}`)
      }

      const responseData = await response.json()
      console.log('Registration successful:', responseData)

      // Generate random registration ID between 001 and 500
      const randomNumber = Math.floor(Math.random() * 500) + 1
      const regId = `RFF${String(randomNumber).padStart(3, '0')}`
      setRegistrationId(regId)

      setIsSubmitted(true)
      toast.success('Registration submitted successfully!', {
        style: {
          backgroundColor: '#dcfce7',
          color: '#166534',
          border: '1px solid #86efac',
          borderRadius: '8px',
          padding: '16px'
        },
        dismissible: true,
        duration: 4000
      })

    } catch (error) {
      console.error('Registration error:', error)
      
      let errorMessage = 'Failed to submit registration'
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Registration request timed out. Please try again.'
        } else {
          errorMessage = error.message
        }
      }
      
      toast.error(errorMessage, {
        style: {
          backgroundColor: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px'
        },
        dismissible: true,
        duration: 4000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if current question has a value
  const hasValue = (id: string): boolean => {
    if (id === "workshops") return morningWorkshop !== null || afternoonWorkshop !== null
    if (id === "roundTables") return selectedRoundTables.length > 0
    if (id === "activities") return true // Activities are optional
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

  // Get workshop name by ID
  const getWorkshopName = (id: string): string => {
    // Log for debugging
    console.log("Getting workshop name for ID:", id)
    console.log("Current workshops data:", workshops)

    // Try to find the workshop in the array
    const workshop = workshops.find((w) => w.id === id)

    // Log result
    console.log("Found workshop:", workshop)

    // Return name if found, otherwise return ID as fallback
    return workshop ? workshop.name : `Workshop ${id}`
  }

  // Get round table name by ID
  const getRoundTableName = (id: string): string => {
    const roundTable = ROUND_TABLES.find((rt) => rt.id === id)
    return roundTable ? roundTable.name : id
  }

  // Get activity name by ID
  const getActivityName = (id: string): string => {
    const activity = ACTIVITIES.find((a) => a.id === id)
    return activity ? activity.name : id
  }

  // Render form input based on question type
  const renderFormInput = () => {
    if (!currentQuestion) return null

    // Get field error from React Hook Form
    // const fieldError = errors[currentQuestion.id as keyof DelegateFormValues]
    // console.log("Field error:", fieldError)

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
              <p className="text-red-500 text-sm mt-1">Phone number must start with &apos;+&apos; and be at least 10 characters long</p>
            )}
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
        case "workshops":
          return (
            <div className="w-full max-w-2xl mx-auto mt-6">
              {currentQuestion.description && (
                <div className="text-center text-lg font-medium text-gray-700 mb-4">{currentQuestion.description}</div>
              )}
  
              {isLoadingWorkshops ? (
                <div className="text-center py-10">
                  <div className="w-10 h-10 border-2 border-[#026FB4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading workshops...</p>
                </div>
              ) : workshopsError ? (
                <div className="text-center text-red-500 mb-4">{workshopsError}</div>
              ) : (
                <>
                  {/* Morning Workshops Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-center mb-4">Morning Session</h3>
                    <p className="text-sm text-center text-gray-500 mb-4">Select one workshop for the morning session</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {morningWorkshops.map((workshop) => {
                        const isFull = workshop.registered >= workshop.capacity;
                        const remainingCapacity = workshop.capacity - workshop.registered;
                        return (
                          <div
                            key={`morning-${workshop.id}`}
                            className={cn(
                              "border rounded-lg p-4 text-center transition-all",
                              isFull
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70" // Style for full
                                : morningWorkshop === workshop.id
                                  ? "border-[#026FB4] bg-blue-50 cursor-pointer" // Style for selected
                                  : "border-gray-200 hover:border-gray-300 cursor-pointer", // Style for available
                            )}
                            onClick={() => !isFull && handleMorningWorkshopSelect(workshop.id)} // Prevent click if full
                          >
                            <div className="flex justify-center mb-3">
                              <div className={cn(
                                "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
                                isFull ? "bg-gray-200" : "bg-blue-100" // Icon background for full
                              )}>
                                <div className={cn(isFull ? "text-gray-400" : "text-[#026FB4]")}>{workshop.icon}</div>
                              </div>
                            </div>
                            <div className={cn("font-medium text-lg mb-2", isFull && "text-gray-500")}>{workshop.name}</div>
                            <div className={cn("text-sm text-gray-500 mb-2", isFull && "text-gray-400")}>
                              {workshop.venue} | {workshop.schedule}
                            </div>
                            {/* <div className={cn("text-sm text-gray-600 mb-2 px-2 whitespace-normal", isFull && "text-gray-400")} title={workshop.short_description}>
                              {workshop.short_description}
                            </div> */}
                            {/* Display remaining capacity or 'Full' message */}
                            <div className={cn(
                              "text-sm font-medium mt-2", 
                              isFull ? "text-red-500" : "text-green-600"
                            )}>
                              {isFull ? "Workshop Full" : `${remainingCapacity} spot(s) remaining`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
  
                  {/* Afternoon Workshops Section */}
                  <div>
                    <h3 className="text-lg font-medium text-center mb-4">Afternoon Session</h3>
                    <p className="text-sm text-center text-gray-500 mb-4">
                      Select one workshop for the afternoon session
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {afternoonWorkshops.map((workshop) => {
                        const isFull = workshop.registered >= workshop.capacity;
                        const remainingCapacity = workshop.capacity - workshop.registered;
                        return (
                          <div
                            key={`afternoon-${workshop.id}`}
                            className={cn(
                              "border rounded-lg p-4 text-center transition-all",
                              isFull
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70" // Style for full
                                : afternoonWorkshop === workshop.id
                                  ? "border-[#026FB4] bg-blue-50 cursor-pointer" // Style for selected
                                  : "border-gray-200 hover:border-gray-300 cursor-pointer", // Style for available
                            )}
                            onClick={() => !isFull && handleAfternoonWorkshopSelect(workshop.id)} // Prevent click if full
                          >
                            <div className="flex justify-center mb-3">
                             <div className={cn(
                                "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
                                isFull ? "bg-gray-200" : "bg-blue-100" // Icon background for full
                              )}>
                                <div className={cn(isFull ? "text-gray-400" : "text-[#026FB4]")}>{workshop.icon}</div>
                              </div>
                            </div>
                            <div className={cn("font-medium text-lg mb-2", isFull && "text-gray-500")}>{workshop.name}</div>
                            <div className={cn("text-sm text-gray-500 mb-2", isFull && "text-gray-400")}>
                              {workshop.venue} | {workshop.schedule}
                            </div>
                            {/* <div className={cn("text-sm text-gray-600 mb-2 px-2 whitespace-normal", isFull && "text-gray-400")} title={workshop.short_description}>
                              {workshop.short_description}
                            </div> */}
                            {/* Display remaining capacity or 'Full' message */}
                            <div className={cn(
                              "text-sm font-medium mt-2", 
                              isFull ? "text-red-500" : "text-green-600"
                            )}>
                             {isFull ? "Workshop Full" : `${remainingCapacity} spot(s) remaining`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
        )
      case "roundTables":
        return (
          <div className="w-full max-w-2xl mx-auto mt-6">
            <div className="text-center text-lg font-medium text-gray-700 mb-4">{currentQuestion.question}</div>

            <div className="grid grid-cols-1 gap-4 mt-4">
              {ROUND_TABLES.map((roundTable) => (
                <div
                  key={roundTable.id}
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    selectedRoundTables.includes(roundTable.id)
                      ? "border-[#026FB4] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => handleRoundTableToggle(roundTable.id)}
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={`rt-${roundTable.id}`}
                      checked={selectedRoundTables.includes(roundTable.id)}
                      onCheckedChange={() => handleRoundTableToggle(roundTable.id)}
                      className="mr-3 h-5 w-5 data-[state=checked]:bg-[#026FB4] data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`rt-${roundTable.id}`} className="flex-1 cursor-pointer font-medium">
                      {roundTable.name}
                    </Label>
                  </div>
                  <div className="mt-2 pl-8 text-sm text-gray-600">{roundTable.description}</div>
                </div>
              ))}
            </div>
          </div>
        )
      case "activities":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6">
            <div className="text-center text-lg font-medium text-gray-700 mb-4">
              Select activities you would like to attend
            </div>

            <div className="space-y-3 mt-4">
              {ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    "border rounded-lg p-4 flex items-center cursor-pointer transition-all",
                    selectedActivities.includes(activity.id)
                      ? "border-[#026FB4] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => handleActivityToggle(activity.id)}
                >
                  <Checkbox
                    id={`activity-${activity.id}`}
                    checked={selectedActivities.includes(activity.id)}
                    onChange={() => handleActivityToggle(activity.id)}
                    className="mr-3 h-5 w-5 data-[state=checked]:bg-[#026FB4] data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`activity-${activity.id}`} className="flex-1 cursor-pointer">
                    {activity.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )
      case "file":
        return (
          <div className="w-full max-w-full md:max-w-md mx-auto mt-6">
            {/* Add disclaimer above the upload area */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-700">
              <p className="font-medium text-[#026FB4] mb-1">DISCLAIMER!</p>
              <p>Your picture is meant to personalize your experience throughout the TVET Future Skills Forum 2025.</p>
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
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} required/>
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
                              setAdditionalInfo({ ...additionalInfo, dietary: newDietary })
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
                              setAdditionalInfo({ ...additionalInfo, "special-needs": newSpecialNeeds })
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
          </div>
        )
      default:
        return null
    }
  }

  // Render summary view
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
                {QUESTIONS[step.id as keyof typeof QUESTIONS].map((question) => {
                  // Fix type error by using type assertion
                  const value = formValues[question.id as keyof DelegateFormValues]
                  if (question.id === "roundTables" || question.id === "activities") return null
                  if (
                    !value &&
                    question.id !== "workshops" &&
                    question.id !== "roundTables" &&
                    question.id !== "activities"
                  )
                    return null

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
                  } else if (question.id === "workshops") {
                    // Format workshop selections for morning and afternoon
                    const workshopInfo = []

                    if (Array.isArray(value)) {
                      // Handle array of workshop IDs
                      value.forEach((workshopId) => {
                        const workshop = workshops.find((w) => w.id === workshopId)
                        if (workshop) {
                          workshopInfo.push(workshop.name)
                        } else {
                          workshopInfo.push(workshopId) // Fallback to ID if name not found
                        }
                      })
                    } else if (typeof value === "object" && value !== null) {
                      // Handle morning/afternoon format if it exists
                      if (value.morning) {
                        const morningName = getWorkshopName(value.morning)
                        workshopInfo.push(`Morning: ${morningName}`)
                      }
                      if (value.afternoon) {
                        const afternoonName = getWorkshopName(value.afternoon)
                        workshopInfo.push(`Afternoon: ${afternoonName}`)
                      }
                    }

                    // If no workshops were found in the value, try using the selected workshop states
                    if (workshopInfo.length === 0) {
                      if (morningWorkshop) {
                        workshopInfo.push(`Morning: ${getWorkshopName(morningWorkshop)}`)
                      }
                      if (afternoonWorkshop) {
                        workshopInfo.push(`Afternoon: ${getWorkshopName(afternoonWorkshop)}`)
                      }
                    }

                    displayValue = workshopInfo.join(", ")
                    if (!displayValue) return null
                  } else if (question.id === "roundTables") {
                    if (Array.isArray(value)) {
                      displayValue = value.map(getRoundTableName).join(", ")
                    }
                  } else if (question.id === "activities") {
                    if (Array.isArray(value) && value.length > 0) {
                      displayValue = value.map(getActivityName).join(", ")
                    } else {
                      displayValue = "None"
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
  useEffect(() => {
    const fetchWorkshops = async () => {
      setIsLoadingWorkshops(true)
      setWorkshopsError(null)
  
      try {
        const response = await fetch(`${BACKEND_URL}/workshops`, {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        })
  
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
  
        const data = await response.json()
        console.log("Workshops data fetched:", data)
  
        const mappedWorkshops = data.map((workshop: Workshop) => {
          let icon = '🎯'
          let schedule = 'TBD'
          const title = workshop?.title?.toLowerCase() || ''
          const workshopId = workshop?.id?.toLowerCase() || ''
  
          // Icon logic
          if (title.includes('quality') || workshopId === 'ws1') {
            icon = '🎯'
          } else if (title.includes('relevance') || workshopId === 'ws2') {
            icon = '🤝'
          } else if (title.includes('inclusion') || title.includes('access') || workshopId === 'ws3') {
            icon = '🔑'
          } else if ((title.includes('innovation') && !title.includes('ecosystem')) || workshopId === 'ws4') {
            icon = '💡'
          } else if (title.includes('skills outlook') || workshopId === 'ws5') {
            icon = '📊'
          } else if (title.includes('emerging technologies') || workshopId === 'ws6') {
            icon = '🔧'
          } else if (title.includes('inclusive workforce') || workshopId === 'ws7') {
            icon = '👥'
          } else if (title.includes('innovation ecosystem') || workshopId === 'ws8') {
            icon = '🚀'
          }
  
          // Schedule logic
          if (
            workshopId === 'ws1' || workshopId === 'ws2' || workshopId === 'ws3' || workshopId === 'ws4' ||
            title.includes('quality') || title.includes('relevance') || title.includes('inclusion') ||
            (title.includes('innovation') && !title.includes('ecosystem'))
          ) {
            schedule = 'June 4, 2025 from 11:30 AM to 1:00 PM'
          } else if (
            workshopId === 'ws5' || workshopId === 'ws6' || workshopId === 'ws7' || workshopId === 'ws8' ||
            title.includes('skills outlook') || title.includes('emerging technologies') || title.includes('inclusive workforce') ||
            (title.includes('innovation') && title.includes('ecosystem'))
          ) {
            schedule = 'June 4, 2025 from 14:30 PM to 16:00 PM'
          }
  
          return {
            id: workshop?.id,
            name: workshop?.title || "Untitled Workshop",
            icon: icon,
            capacity: workshop?.capacity || 0,
            registered: workshop?.registered || 0,
            venue: workshop?.venue || "TBD",
            schedule: schedule,
          }
        })
  
        // Optional: group into morning/afternoon if you still need that
        const morning = mappedWorkshops.filter((w: { schedule: string | string[] }) => w.schedule.includes('11:30 AM'))
        const afternoon = mappedWorkshops.filter((w: { schedule: string | string[] }) => w.schedule.includes('14:30 PM'))
  
        console.log("Mapped workshops:", mappedWorkshops)
        console.log("Morning workshops:", morning)
        console.log("Afternoon workshops:", afternoon)
  
        setWorkshops(mappedWorkshops)
        setMorningWorkshops(morning)
        setAfternoonWorkshops(afternoon)
  
      } catch (error) {
        console.error("Failed to fetch workshops:", error)
        setWorkshopsError("Failed to load workshops. Please try again later.")
      } finally {
        setIsLoadingWorkshops(false)
      }
    }
  
    fetchWorkshops()
  }, [])
  

  // Update the workshop sections to use morning and afternoon workshops
  // const renderWorkshops = () => (
  //   <>

  //     {/* Morning Workshops Section */}
  //     <div className="mb-8">
  //       <h3 className="text-lg font-medium text-center mb-4">Morning Session</h3>
  //       <p className="text-sm text-center text-gray-500 mb-4">Select one workshop for the morning session</p>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
  //         {morningWorkshops.map((workshop) => {
  //           const isFull = workshop.registered >= workshop.capacity;
  //           const remainingCapacity = workshop.capacity - workshop.registered;
  //            return (
  //             <div
  //               key={`morning-${workshop.id}`}
  //               className={cn(
  //                 "border rounded-lg p-4 text-center transition-all",
  //                 isFull
  //                   ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
  //                   : morningWorkshop === workshop.id
  //                     ? "border-[#026FB4] bg-blue-50 cursor-pointer"
  //                     : "border-gray-200 hover:border-gray-300 cursor-pointer",
  //               )}
  //               onClick={() => !isFull && handleMorningWorkshopSelect(workshop.id)}
  //             >
  //               <div className="flex justify-center mb-3">
  //                 <div className={cn(
  //                    "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
  //                    isFull ? "bg-gray-200" : "bg-blue-100"
  //                 )}>
  //                   <div className={cn(isFull ? "text-gray-400" : "text-[#026FB4]")}>{workshop.icon}</div>
  //                 </div>
  //               </div>
  //               <div className={cn("font-medium text-lg mb-2", isFull && "text-gray-500")}>{workshop.name}</div>
  //               <div className={cn("text-sm text-gray-500 mb-2", isFull && "text-gray-400")}>
  //                 {workshop.venue} | {workshop.schedule}
  //               </div>
  //               {/* <div className={cn("text-sm text-gray-600 mb-2 px-2 whitespace-normal", isFull && "text-gray-400")} title={workshop.short_description}>
  //                  {workshop.short_description}
  //               </div> */}
  //                <div className={cn(
  //                 "text-sm font-medium mt-2", 
  //                 isFull ? "text-red-500" : "text-green-600"
  //               )}>
  //                 {isFull ? "Workshop Full" : `${remainingCapacity} spot(s) remaining`}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>

  //     {/* Afternoon Workshops Section */}
  //     <div>
  //       <h3 className="text-lg font-medium text-center mb-4">Afternoon Session</h3>
  //       <p className="text-sm text-center text-gray-500 mb-4">Select one workshop for the afternoon session</p>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
  //         {afternoonWorkshops.map((workshop) => {
  //            const isFull = workshop.registered >= workshop.capacity;
  //            const remainingCapacity = workshop.capacity - workshop.registered;
  //            return (
  //             <div
  //               key={`afternoon-${workshop.id}`}
  //               className={cn(
  //                 "border rounded-lg p-4 text-center transition-all",
  //                 isFull
  //                   ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
  //                   : afternoonWorkshop === workshop.id
  //                     ? "border-[#026FB4] bg-blue-50 cursor-pointer"
  //                     : "border-gray-200 hover:border-gray-300 cursor-pointer",
  //               )}
  //               onClick={() => !isFull && handleAfternoonWorkshopSelect(workshop.id)}
  //             >
  //               <div className="flex justify-center mb-3">
  //                 <div className={cn(
  //                    "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
  //                    isFull ? "bg-gray-200" : "bg-blue-100"
  //                 )}>
  //                   <div className={cn(isFull ? "text-gray-400" : "text-[#026FB4]")}>{workshop.icon}</div>
  //                 </div>
  //               </div>
  //               <div className={cn("font-medium text-lg mb-2", isFull && "text-gray-500")}>{workshop.name}</div>
  //               <div className={cn("text-sm text-gray-500 mb-2", isFull && "text-gray-400")}>
  //                 {workshop.venue} | {workshop.schedule}
  //               </div>
  //               {/* <div className={cn("text-sm text-gray-600 mb-2 px-2 whitespace-normal", isFull && "text-gray-400")} title={workshop.short_description}>
  //                  {workshop.short_description}
  //               </div> */}
  //               <div className={cn(
  //                 "text-sm font-medium mt-2", 
  //                 isFull ? "text-red-500" : "text-green-600"
  //               )}>
  //                 {isFull ? "Workshop Full" : `${remainingCapacity} spot(s) remaining`}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </>
  // )


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
                src={FutureSkillsLogo || "/placeholder.svg"}
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
                <Image src={FutureSkillsLogo || "/placeholder.svg"} alt="FutureSkills Logo" width={180} height={60} />
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
            {/* Permanent back button to landing page */}
            {/* <Button
              variant="ghost"
              size="sm"
              className="self-start mb-4 -ml-2 text-gray-600 hover:text-[#026FB4] hover:bg-blue-50"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
              </Link>
            </Button> */}

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
                  if (key === "roundTables" || key === "activities") return null // Skip these fields

                  // Check if the question belongs to the current step
                  let belongsToCurrentStep = false
                  if (!isSummaryView) {
                    belongsToCurrentStep = QUESTIONS[currentStep.id].some((q) => q.id === key)
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
                  } else if (key === "workshops") {
                    // Format workshop selections for morning and afternoon
                    const workshopInfo = []

                    if (Array.isArray(value)) {
                      // Handle array of workshop IDs
                      value.forEach((workshopId) => {
                        const workshop = workshops.find((w) => w.id === workshopId)
                        if (workshop) {
                          workshopInfo.push(workshop.name)
                        } else {
                          workshopInfo.push(workshopId) // Fallback to ID if name not found
                        }
                      })
                    } else if (typeof value === "object" && value !== null) {
                      // Handle morning/afternoon format if it exists
                      if (value.morning) {
                        const morningName = getWorkshopName(value.morning)
                        workshopInfo.push(`Morning: ${morningName}`)
                      }
                      if (value.afternoon) {
                        const afternoonName = getWorkshopName(value.afternoon)
                        workshopInfo.push(`Afternoon: ${afternoonName}`)
                      }
                    }

                    // If no workshops were found in the value, try using the selected workshop states
                    if (workshopInfo.length === 0) {
                      if (morningWorkshop) {
                        workshopInfo.push(`Morning: ${getWorkshopName(morningWorkshop)}`)
                      }
                      if (afternoonWorkshop) {
                        workshopInfo.push(`Afternoon: ${getWorkshopName(afternoonWorkshop)}`)
                      }
                    }

                    displayValue = workshopInfo.join(", ")
                    if (!displayValue) return null
                  } else if (key === "roundTables") {
                    if (Array.isArray(value)) {
                      displayValue = value.map(getRoundTableName).join(", ")
                    }
                  } else if (key === "activities") {
                    if (Array.isArray(value) && value.length > 0) {
                      displayValue = value.map(getActivityName).join(", ")
                    } else {
                      displayValue = "None"
                    }
                  }

                  return (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">{previewLabel}:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">{displayValue}</span>
                    </div>
                  )
                })}

                {/* Show selected workshops in preview even if not in formData */}
                {currentStep.id === "event-based-info" &&
                  (morningWorkshop || afternoonWorkshop) &&
                  !Object.keys(formValues).includes("workshops") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">Workshops:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">
                        {morningWorkshop && `Morning: ${getWorkshopName(morningWorkshop)}`}
                        {morningWorkshop && afternoonWorkshop && ", "}
                        {afternoonWorkshop && `Afternoon: ${getWorkshopName(afternoonWorkshop)}`}
                      </span>
                    </div>
                  )}

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
                  if (key === "roundTables" || key === "activities") return null // Skip these fields

                  // Check if the question belongs to the current step
                  let belongsToCurrentStep = false
                  if (!isSummaryView) {
                    belongsToCurrentStep = QUESTIONS[currentStep.id].some((q) => q.id === key)
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
                  } else if (key === "workshops") {
                    // Format workshop selections for morning and afternoon
                    const workshopInfo = []

                    if (Array.isArray(value)) {
                      // Handle array of workshop IDs
                      value.forEach((workshopId) => {
                        const workshop = workshops.find((w) => w.id === workshopId)
                        if (workshop) {
                          workshopInfo.push(workshop.name)
                        } else {
                          workshopInfo.push(workshopId) // Fallback to ID if name not found
                        }
                      })
                    } else if (typeof value === "object" && value !== null) {
                      // Handle morning/afternoon format if it exists
                      if (value.morning) {
                        const morningName = getWorkshopName(value.morning)
                        workshopInfo.push(`Morning: ${morningName}`)
                      }
                      if (value.afternoon) {
                        const afternoonName = getWorkshopName(value.afternoon)
                        workshopInfo.push(`Afternoon: ${afternoonName}`)
                      }
                    }

                    // If no workshops were found in the value, try using the selected workshop states
                    if (workshopInfo.length === 0) {
                      if (morningWorkshop) {
                        workshopInfo.push(`Morning: ${getWorkshopName(morningWorkshop)}`)
                      }
                      if (afternoonWorkshop) {
                        workshopInfo.push(`Afternoon: ${getWorkshopName(afternoonWorkshop)}`)
                      }
                    }

                    displayValue = workshopInfo.join(", ")
                    if (!displayValue) return null
                  } else if (key === "roundTables") {
                    if (Array.isArray(value)) {
                      displayValue = value.map(getRoundTableName).join(", ")
                    }
                  } else if (key === "activities") {
                    if (Array.isArray(value) && value.length > 0) {
                      displayValue = value.map(getActivityName).join(", ")
                    } else {
                      displayValue = "None"
                    }
                  }

                  return (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">{previewLabel}:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">{displayValue}</span>
                    </div>
                  )
                })}

                {/* Show selected workshops in preview even if not in formData */}
                {currentStep.id === "event-based-info" &&
                  (morningWorkshop || afternoonWorkshop) &&
                  !Object.keys(formValues).includes("workshops") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 font-medium">Workshops:</span>
                      <span className="font-medium text-right max-w-[60%] break-words">
                        {morningWorkshop && `Morning: ${getWorkshopName(morningWorkshop)}`}
                        {morningWorkshop && afternoonWorkshop && ", "}
                        {afternoonWorkshop && `Afternoon: ${getWorkshopName(afternoonWorkshop)}`}
                      </span>
                    </div>
                  )}

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
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes shimmerReverse {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes shimmerVertical {
          0% { background-position: 0 200%; }
          100% { background-position: 0 -200%; }
        }
        @keyframes shimmerVerticalReverse {
          0% { background-position: 0 -200%; }
          100% { background-position: 0 200%; }
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
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
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
 