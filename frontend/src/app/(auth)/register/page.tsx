"use client";

import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/services/profileService";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import MultiSearchableDropdown from "@/components/ui/MultiSearchableDropdown";
import PremiumSelect from "@/components/ui/PremiumSelect";
import { getImageUrl } from "@/lib/utils";
import {
  masterService,
  Country,
  MotherTongue,
  Height,
  Religion,
  Caste,
  State,
  City,
  Education,
  EmploymentType,
  Occupation,
  Currency,
  IncomeRange,
  Star,
  Rasi,
  Laknam,
  Gothram,
} from "@/services/masterService";
import { Dialog, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  LockClosedIcon,
  MapPinIcon,
  AcademicCapIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PhotoIcon,
  DocumentArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const registerSchema = z
  .object({
    // Step 1: Basic Identity
    createdFor: z.enum([
      "Self",
      "Daughter",
      "Son",
      "Sister",
      "Brother",
      "Relative",
      "Friend",
    ]),
    gender: z.enum(["Male", "Female", "Other"]),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    countryCodeId: z
      .union([z.number(), z.string()])
      .refine((val) => val !== "", "Required"),
    mobile: z
      .string()
      .regex(/^\d+$/, "Only numbers allowed")
      .min(10, "10 digits required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Min 6 characters"),
    convenientTimeToCall: z.string().optional(),
    linkedInUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    facebookUrl: z.string().url("Invalid URL").optional().or(z.literal("")),

    // Step 2: Personal Background
    dobDay: z.string().min(1, "Day required"),
    dobMonth: z.string().min(1, "Month required"),
    dobYear: z.string().min(4, "Year required"),
    heightCm: z
      .union([z.number(), z.string()])
      .refine((val) => val !== "", "Height is required"),
    maritalStatus: z.enum([
      "Never Married",
      "Divorced",
      "Widowed",
      "Awaiting Divorce",
    ]),
    motherTongueId: z
      .union([z.number(), z.string()])
      .refine((val) => val !== "", "Required"),
    religionId: z
      .union([z.number(), z.string()])
      .refine((val) => val !== "", "Required"),
    casteId: z.union([z.number(), z.string()]).optional(),
    subcaste: z.string().optional(),
    complexion: z.string().optional(),
    physicalStatus: z.enum(["Normal", "Physically Challenged"]),
    shortBio: z.string().min(30, "Please write at least 30 characters"),

    // Step 3: Family Details
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    familyType: z.enum(["Joint", "Nuclear", "Other"]).optional(),
    familyStatus: z
      .enum(["Middle Class", "Upper Middle Class", "Rich", "Affluent"])
      .optional(),
    siblingsCount: z.union([z.number(), z.string()]).optional(),
    ownHouse: z.boolean().optional(),
    nativeDistrict: z.string().optional(),

    // Step 3A: Horoscope
    showHoroscope: z.boolean().default(true),
    starId: z.union([z.number(), z.string()]).optional(),
    rasiId: z
      .union([z.number(), z.string()])
      .refine((val) => val !== "", "Rasi is required"),
    laknamId: z.union([z.number(), z.string()]).optional(),
    gothramId: z.union([z.number(), z.string()]).optional(),
    sevvaiDhosham: z.enum(["Yes", "No", "Don't Know"]).optional(),
    rahuKetuDhosham: z.enum(["Yes", "No", "Don't Know"]).optional(),
    birthTime: z.string().optional(),
    birthPlace: z.string().optional(),
    birthCityId: z.union([z.number(), z.string()]).optional(),
    horoscopeImage: z.string().optional(),

    // Step 4: Location & Lifestyle
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    relocatePreference: z.enum(["Yes", "No", "Flexible"]).optional(),
    diet: z.enum(["Veg", "Non-veg", "Eggetarian", "Vegan"]),
    drink: z.enum(["Yes", "No", "Occasionally"]),
    smoke: z.enum(["Yes", "No", "Occasionally"]),
    fitnessLevel: z.enum(["Regular", "Occasional", "Not at all"]),
    languages: z.array(z.string()).optional(),
    hobbies: z.array(z.string()).optional(),

    // Step 5: Education & Career
    highestEducation: z.string().min(2, "Education required"),
    fieldOfStudy: z.string().optional(),
    college: z.string().optional(),
    employmentType: z.string().optional(),
    companyName: z.string().optional(),
    designation: z.string().optional(),
    incomeRange: z.string().optional(),
    exactIncome: z.union([z.number(), z.string()]).optional(),
    careerPlanAfterMarriage: z.string().optional(),

    // Step 6: Values & Preferences
    ambition: z.number().min(1).max(5).optional(),
    familyOrientation: z.number().min(1).max(5).optional(),
    emotionalStability: z.number().min(1).max(5).optional(),
    communicationStyle: z.number().min(1).max(5).optional(),
    spiritualInclination: z.number().min(1).max(5).optional(),

    partnerAgeMin: z.union([z.number(), z.string()]).optional(),
    partnerAgeMax: z.union([z.number(), z.string()]).optional(),
    partnerHeightMin: z.union([z.number(), z.string()]).optional(),
    partnerHeightMax: z.union([z.number(), z.string()]).optional(),
    partnerMaritalStatus: z.string().optional(),
    partnerReligion: z.string().optional(),
    partnerCastes: z.array(z.string()).default([]),
    preferredLocation: z.string().optional(),
    preferredEducation: z.string().optional(),
    preferredIncomeRange: z.string().optional(),
    partnerLocationPreference: z.string().optional(),

    // Missing fields from form logic
    childrenCount: z.string().optional(),
    countryId: z.union([z.number(), z.string(), z.literal("")]).optional(),
    stateId: z.union([z.number(), z.string(), z.literal("")]).optional(),
    cityId: z.union([z.number(), z.string(), z.literal("")]).optional(),
    employmentTypeId: z
      .union([z.number(), z.string(), z.literal("")])
      .optional(),
    incomeCurrencyId: z
      .union([z.number(), z.string(), z.literal("")])
      .optional(),
    incomeRangeId: z.union([z.number(), z.string(), z.literal("")]).optional(),
    occupationId: z.union([z.number(), z.string(), z.literal("")]).optional(),

    // Step 7: Visibility
    profileVisibility: z.enum(["Public", "Members Only", "Hidden"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.showHoroscope) {
      if (!data.rasiId || String(data.rasiId).trim() === "") {
        // Optional: Removed mandatory check
      }
      if (!data.birthTime || data.birthTime.trim() === "") {
        // Optional: Removed mandatory check
      }
      if (!data.horoscopeImage) {
        // Optional: Removed mandatory check
      }
    }
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerAuth, loading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState<Country[]>([]);
  const [motherTongues, setMotherTongues] = useState<MotherTongue[]>([]);
  const [heights, setHeights] = useState<Height[]>([]);
  const [religions, setReligions] = useState<Religion[]>([]);
  const [castes, setCastes] = useState<Caste[]>([]);
  const [statesList, setStatesList] = useState<State[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([]);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [incomeRanges, setIncomeRanges] = useState<IncomeRange[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [rasis, setRasis] = useState<Rasi[]>([]);
  const [laknams, setLaknams] = useState<Laknam[]>([]);
  const [gothrams, setGothrams] = useState<Gothram[]>([]);
  const [birthCitiesList, setBirthCitiesList] = useState<City[]>([]);

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [lastAuthError, setLastAuthError] = useState("");

  useEffect(() => {
    if (error && error !== lastAuthError) {
      toast.error(error);
      setLastAuthError(error);
    }
  }, [error, lastAuthError]);

  const [uploadedPhotos, setUploadedPhotos] = useState<
    { id: string; url: string }[]
  >([]);
  const [pendingPhotos, setPendingPhotos] = useState<
    Array<{ file: File; preview: string }>
  >([]);
  const [horoscopeImage, setHoroscopeImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const token = localStorage.getItem("token");

    // If no token (Step 1 before register), just store locally
    if (!token) {
      const newPending = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setPendingPhotos((prev) => [...prev, ...newPending].slice(0, 5));
      return;
    }

    // If token exists, upload immediately
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("photo", file);
        const result = await profileService.uploadPhotos(formData);
        setUploadedPhotos((prev) => [
          ...prev,
          { id: result.photo.id, url: result.photo.url },
        ]);
      }
    } catch (err) {
      console.error("Photo upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handlePendingPhotoDelete = (index: number) => {
    setPendingPhotos((prev) => {
      const newPending = [...prev];
      URL.revokeObjectURL(newPending[index].preview);
      newPending.splice(index, 1);
      return newPending;
    });
  };

  const handlePhotoDelete = async (photoId: string) => {
    try {
      await profileService.deletePhoto(photoId);
      setUploadedPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      console.error("Photo delete error:", err);
    }
  };

  const handleHoroscopeUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("horoscope", file);

    try {
      const result = await profileService.uploadHoroscope(formData);
      const imageUrl = result.horoscope.horoscopeImageUrl;
      setHoroscopeImage(imageUrl);
      setValue("horoscopeImage", imageUrl, { shouldValidate: true });
    } catch (err) {
      console.error("Horoscope upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleHoroscopeDelete = async () => {
    try {
      await profileService.deleteHoroscope();
      setHoroscopeImage(null);
      setValue("horoscopeImage", "", { shouldValidate: true });
    } catch (err) {
      console.error("Horoscope delete error:", err);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      createdFor: "Self",
      gender: "Male",
      firstName: "",
      countryCodeId: "+91",
      mobile: "",
      email: "",
      password: "",
      convenientTimeToCall: "Anytime",
      linkedInUrl: "",
      instagramUrl: "",
      facebookUrl: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      heightCm: "",
      maritalStatus: "Never Married",
      motherTongueId: "",
      religionId: "",
      casteId: "",
      subcaste: "",
      complexion: "",
      physicalStatus: "Normal",
      shortBio: "",
      // Family
      fatherName: "",
      fatherOccupation: "",
      motherName: "",
      motherOccupation: "",
      familyType: "Nuclear",
      familyStatus: "Middle Class",
      siblingsCount: "0",
      ownHouse: false,
      nativeDistrict: "",
      // Horoscope
      showHoroscope: true,
      starId: "",
      rasiId: "",
      laknamId: "",
      gothramId: "",
      sevvaiDhosham: "No",
      rahuKetuDhosham: "No",
      birthTime: "",
      birthPlace: "",
      birthCityId: "",
      horoscopeImage: "",
      // Location & Lifestyle
      country: "India",
      state: "Tamil Nadu",
      city: "",
      relocatePreference: "Flexible",
      diet: "Veg",
      drink: "No",
      smoke: "No",
      fitnessLevel: "Occasional",
      languages: [],
      hobbies: [],
      // Education & Career
      highestEducation: "",
      fieldOfStudy: "",
      college: "",
      employmentType: "",
      companyName: "",
      designation: "",
      incomeRange: "",
      exactIncome: "",
      careerPlanAfterMarriage: "",
      // Values & Preferences
      ambition: 3,
      familyOrientation: 3,
      emotionalStability: 3,
      communicationStyle: 3,
      spiritualInclination: 3,
      partnerAgeMin: 21,
      partnerAgeMax: 35,
      partnerHeightMin: 150,
      partnerHeightMax: 190,
      partnerMaritalStatus: "Never Married",
      partnerReligion: "",
      partnerCastes: [],
      preferredLocation: "Tamil Nadu",
      preferredEducation: "",
      preferredIncomeRange: "",
      partnerLocationPreference: "",
      profileVisibility: "Members Only",
      childrenCount: "",
      countryId: "",
      stateId: "",
      cityId: "",
      employmentTypeId: "",
      incomeCurrencyId: "",
      incomeRangeId: "",
      occupationId: "",
    },
    mode: "onTouched",
  });

  const watchedReligionId = useWatch({ control, name: "religionId" });
  const watchedMaritalStatus = useWatch({ control, name: "maritalStatus" });
  const watchedCountryId = useWatch({ control, name: "countryId" });
  const watchedStateId = useWatch({ control, name: "stateId" });
  const watchedEmploymentTypeId = useWatch({
    control,
    name: "employmentTypeId",
  });
  const watchedCurrencyId = useWatch({ control, name: "incomeCurrencyId" });
  const watchedGender = useWatch({ control, name: "gender" });
  const watchedShowHoroscope = useWatch({ control, name: "showHoroscope" });

  useEffect(() => {
    masterService
      .getCountries()
      .then((data) => {
        setCountries(data);
        const india = data.find((c) => c.phoneCode === "+91");
        if (india) (setValue as any)("countryCodeId", india.id);
      })
      .catch(console.error);

    masterService
      .getMotherTongues()
      .then(setMotherTongues)
      .catch(console.error);
    masterService.getHeights().then(setHeights).catch(console.error);
    masterService.getReligions().then(setReligions).catch(console.error);
    masterService.getEducations().then(setEducations).catch(console.error);
    masterService
      .getEmploymentTypes()
      .then(setEmploymentTypes)
      .catch(console.error);
    masterService.getCurrencies().then(setCurrencies).catch(console.error);
    masterService.getStars().then(setStars).catch(console.error);
    masterService.getRasis().then(setRasis).catch(console.error);
    masterService.getLaknams().then(setLaknams).catch(console.error);
    masterService.getGothrams().then(setGothrams).catch(console.error);
    masterService.getAllCities().then(setBirthCitiesList).catch(console.error);
  }, [setValue]);

  useEffect(() => {
    if (watchedReligionId) {
      masterService
        .getCastesByReligion(watchedReligionId)
        .then((data) => {
          setCastes([
            {
              id: "0",
              name: "Not Interested",
              religionId: String(watchedReligionId),
            },
            ...data,
          ]);
        })
        .catch(console.error);
      (setValue as any)("casteId", "0");
    }
  }, [watchedReligionId, setValue]);

  useEffect(() => {
    if (watchedMaritalStatus === "Never Married") {
      (setValue as any)("childrenCount", "");
    }
  }, [watchedMaritalStatus, setValue]);

  useEffect(() => {
    if (watchedCountryId) {
      masterService
        .getStatesByCountry(watchedCountryId)
        .then(setStatesList)
        .catch(console.error);
      (setValue as any)("stateId", "");
      (setValue as any)("cityId", "");
    }
  }, [watchedCountryId, setValue]);

  useEffect(() => {
    if (watchedStateId) {
      masterService
        .getCitiesByState(watchedStateId)
        .then(setCitiesList)
        .catch(console.error);
      (setValue as any)("cityId", "");
    }
  }, [watchedStateId, setValue]);

  useEffect(() => {
    if (watchedEmploymentTypeId) {
      masterService
        .getOccupationsByEmploymentType(watchedEmploymentTypeId)
        .then(setOccupations)
        .catch(console.error);
      (setValue as any)("occupationId", "");
    }
  }, [watchedEmploymentTypeId, setValue]);

  useEffect(() => {
    if (watchedCurrencyId) {
      masterService
        .getIncomeRangesByCurrency(watchedCurrencyId)
        .then(setIncomeRanges)
        .catch(console.error);
      (setValue as any)("incomeRangeId", "");
    }
  }, [watchedCurrencyId, setValue]);

  const nextStep = async (fields: any[]) => {
    const isValid = await (trigger as any)(fields);
    if (isValid) setStep(step + 1);
    return isValid;
  };

  const prevStep = () => setStep(step - 1);

  const handleOtpVerify = () => {
    if (otpInput === "1111") {
      setIsOtpModalOpen(false);
      setStep(2);
    } else {
      toast.error("Invalid OTP. Use dummy OTP: 1111");
    }
  };

  const handleStep1Register = async () => {
    // Validate Photos - Optional now
    const totalPhotos = uploadedPhotos.length + pendingPhotos.length;
    // Removed mandatory check as per user request

    const isValid = await (trigger as any)([
      "firstName",
      "email",
      "password",
      "mobile",
    ]);
    if (!isValid) return;

    // Detect existing session to avoid "User Already Exists" error on back-navigation
    if (localStorage.getItem("token")) {
      setIsOtpModalOpen(true);
      return;
    }

    try {
      const formData = control._formValues;
      await registerAuth(
        {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          mobile: formData.mobile,
          createdFor: formData.createdFor,
          gender: formData.gender,
          dob:
            formData.dobYear && formData.dobMonth && formData.dobDay
              ? `${formData.dobYear}-${formData.dobMonth.padStart(2, "0")}-${formData.dobDay.padStart(2, "0")}`
              : null,
        },
        null,
      );

      // If success, upload pending photos
      if (pendingPhotos.length > 0) {
        setUploading(true);
        try {
          for (const item of pendingPhotos) {
            const fd = new FormData();
            fd.append("photo", item.file);
            const result = await profileService.uploadPhotos(fd);
            setUploadedPhotos((prev) => [
              ...prev,
              { id: result.photo.id, url: result.photo.url },
            ]);
            URL.revokeObjectURL(item.preview);
          }
          setPendingPhotos([]);
        } catch (err) {
          console.error("Delayed photo upload error:", err);
        } finally {
          setUploading(false);
        }
      }

      // Move to next step (OTP)
      setIsOtpModalOpen(true);
    } catch (err) {
      // Error handled by useAuth hook's error state
      console.error("Registration error:", err);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Final synchronization to all 8 tables
      const payload = {
        ...data,
        dob:
          data.dobYear && data.dobMonth && data.dobDay
            ? `${data.dobYear}-${data.dobMonth.padStart(2, "0")}-${data.dobDay.padStart(2, "0")}`
            : null,
        motherTongueId: Number(data.motherTongueId),
        religionId: Number(data.religionId),
        casteId:
          data.casteId && data.casteId !== "0" && data.casteId !== ""
            ? Number(data.casteId)
            : null,
        heightCm: Number(data.heightCm),
        partnerAgeMin: Number(data.partnerAgeMin),
        partnerAgeMax: Number(data.partnerAgeMax),
      };

      await profileService.updateProfile(payload);
      router.push("/dashboard");
    } catch (err) {
      console.error("Final submission error:", err);
    }
  };

  const steps = [
    { id: 1, name: "Identity", icon: UserCircleIcon },
    { id: 2, name: "Background", icon: SparklesIcon },
    { id: 3, name: "Heritage", icon: StarIcon },
    { id: 4, name: "Lifestyle", icon: MapPinIcon },
    { id: 5, name: "Career", icon: AcademicCapIcon },
    { id: 6, name: "Values", icon: HeartIcon },
    { id: 7, name: "Finish", icon: CheckCircleIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-gold-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* --- OTP MODAL --- */}
      <Transition appear show={isOtpModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOtpModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-slate-900/90 border border-purple-500/30 p-8 text-left shadow-2xl backdrop-blur-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-amber-400 text-center"
                  >
                    Verify Your Mobile
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-slate-400 text-center">
                    Enter the code sent to your number.
                    <br />
                    <span className="text-amber-400/80 font-mono">
                      (Dummy: 1111)
                    </span>
                  </p>
                  <div className="mt-6">
                    <input
                      type="text"
                      maxLength={4}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="• • • •"
                      className="block w-full py-4 px-4 text-center tracking-[1em] text-3xl bg-slate-800/50 border border-purple-500/20 text-white rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                    />
                  </div>
                  <div className="mt-8 space-y-3">
                    <button
                      onClick={handleOtpVerify}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Verify OTP
                    </button>
                    <button
                      onClick={() => setIsOtpModalOpen(false)}
                      className="w-full py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="w-full max-w-4xl z-10 transition-all duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>Premium Onboarding</span>
          </div>
          <div className="flex justify-center mb-6">
            <img
              src="/auraWedsLogo.png"
              alt="AuraWeds"
              className="h-32 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Create Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-amber-300">
              Legacy Profile
            </span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Already part of AuraWeds?{" "}
            <Link
              href="/login"
              className="text-amber-400 font-bold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12 hidden sm:block">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-amber-500 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          <div className="relative flex justify-between">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${step >= s.id ? "bg-slate-900 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "bg-slate-900 border-slate-800 text-slate-600"}`}
                >
                  {step > s.id ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`mt-3 text-[10px] font-bold uppercase tracking-tighter ${step >= s.id ? "text-white" : "text-slate-600"}`}
                >
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden flex items-center justify-between mb-8 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Step {step} of 7
          </span>
          <div className="flex space-x-1">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`h-1 w-4 rounded-full ${step >= s.id ? "bg-purple-500" : "bg-slate-800"}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-6 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 relative"
          >
            {/* Step 1: Basic Identity */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                {/* Photo Upload Section */}
                <div className="pb-6 border-b border-purple-500/10">
                  <label className="block text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                    <PhotoIcon className="w-5 h-5 text-purple-400" />
                    Profile Photos (Optional)
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {/* Uploaded Photos */}
                    {uploadedPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative w-24 h-24 rounded-2xl overflow-hidden border border-purple-500/20 group animate-in zoom-in-90 duration-300"
                      >
                        <img
                          src={getImageUrl(
                            photo.url,
                            control._formValues.firstName,
                          )}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handlePhotoDelete(photo.id)}
                          className="absolute top-1 right-1 p-1.5 bg-rose-500/90 hover:bg-rose-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Pending Photos (Pre-registration) */}
                    {pendingPhotos.map((photo, idx) => (
                      <div
                        key={`pending-${idx}`}
                        className="relative w-24 h-24 rounded-2xl overflow-hidden border border-amber-500/40 group animate-pulse-subtle bg-slate-900/50"
                      >
                        <img
                          src={photo.preview}
                          alt="Pending"
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-[8px] font-bold text-amber-400 bg-slate-950/80 px-2 py-1 rounded-full border border-amber-500/30">
                            PENDING
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePendingPhotoDelete(idx)}
                          className="absolute top-1 right-1 p-1.5 bg-rose-500/90 hover:bg-rose-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {uploadedPhotos.length + pendingPhotos.length < 5 && (
                      <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 transition-all bg-slate-900/50">
                        <input
                          type="file"
                          className="hidden"
                          onChange={handlePhotoUpload}
                          accept="image/*"
                          disabled={uploading}
                        />
                        {uploading ? (
                          <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <PhotoIcon className="w-8 h-8 text-slate-600 mb-1" />
                            <span className="text-[10px] font-bold text-slate-500">
                              Upload
                            </span>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Profile Creating For
                    </label>
                    <Controller
                      control={control}
                      name="createdFor"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Self",
                            "Daughter",
                            "Son",
                            "Sister",
                            "Brother",
                            "Relative",
                            "Friend",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-4">
                      Gender
                    </label>
                    <div className="flex space-x-4">
                      {["Male", "Female"].map((g) => (
                        <label
                          key={g}
                          className={`flex-1 flex items-center justify-center py-4 rounded-2xl border cursor-pointer transition-all ${watchedGender === g ? "bg-purple-600/20 border-purple-500 text-white" : "bg-slate-900/50 border-white/10 text-slate-400 hover:border-white/20"}`}
                        >
                          <input
                            type="radio"
                            value={g}
                            {...register("gender")}
                            className="hidden"
                          />
                          <span className="font-bold text-sm">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      placeholder="Enter full name"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 col-span-full">
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Code
                      </label>
                      <Controller
                        control={control}
                        name="countryCodeId"
                        render={({ field }) => (
                          <SearchableDropdown
                            options={countries}
                            value={
                              countries.find((c) => c.id === field.value) ||
                              null
                            }
                            onChange={(val) => field.onChange(val?.id || "")}
                            displayKey="phoneCode"
                            placeholder="Code"
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        {...register("mobile")}
                        placeholder="Phone number"
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                      />
                    </div>
                  </div>
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="name@example.com"
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        placeholder="••••••••"
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Convenient Time to Call
                    </label>
                    <Controller
                      control={control}
                      name="convenientTimeToCall"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Anytime",
                            "Morning (9 AM - 12 PM)",
                            "Afternoon (12 PM - 4 PM)",
                            "Evening (4 PM - 9 PM)",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        LinkedIn (Optional)
                      </label>
                      <input
                        {...register("linkedInUrl")}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Instagram (Optional)
                      </label>
                      <input
                        {...register("instagramUrl")}
                        placeholder="https://instagram.com/..."
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Facebook (Optional)
                      </label>
                      <input
                        {...register("facebookUrl")}
                        placeholder="https://facebook.com/..."
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={handleStep1Register}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2 outline-none"
                  >
                    <span>Verify & Continue</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Background */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Date of Birth (Legacy Age Verification)
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {/* ... DOB Controls ... */}
                      <Controller
                        control={control}
                        name="dobDay"
                        render={({ field }) => (
                          <PremiumSelect
                            options={Array.from(
                              { length: 31 },
                              (_, i) => i + 1,
                            ).map((d) => ({ id: String(d), name: String(d) }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Day"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="dobMonth"
                        render={({ field }) => (
                          <PremiumSelect
                            options={[
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ].map((m, i) => ({ id: String(i + 1), name: m }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Month"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="dobYear"
                        render={({ field }) => (
                          <PremiumSelect
                            options={Array.from(
                              { length: 60 },
                              (_, i) => new Date().getFullYear() - 18 - i,
                            ).map((y) => ({ id: String(y), name: String(y) }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Year"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Height
                    </label>
                    <Controller
                      control={control}
                      name="heightCm"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={heights}
                          value={
                            heights.find((h) => h.cmValue === field.value) ||
                            null
                          }
                          onChange={(val) => field.onChange(val?.cmValue || "")}
                          displayKey="displayLabel"
                          placeholder="Select height"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Marital Status
                    </label>
                    <Controller
                      control={control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Never Married",
                            "Divorced",
                            "Widowed",
                            "Awaiting Divorce",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Religion
                    </label>
                    <Controller
                      control={control}
                      name="religionId"
                      render={({ field }) => (
                        <PremiumSelect
                          options={religions.map((r) => ({
                            id: String(r.id),
                            name: r.name,
                          }))}
                          value={String(field.value)}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Mother Tongue
                    </label>
                    <Controller
                      control={control}
                      name="motherTongueId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={motherTongues}
                          value={
                            motherTongues.find((m) => m.id === field.value) ||
                            null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Search language..."
                        />
                      )}
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      About Me / Bio
                    </label>
                    <textarea
                      {...register("shortBio")}
                      rows={4}
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all resize-none"
                      placeholder="Tell us about yourself, your values, and what you're looking for..."
                    />
                    {errors.shortBio && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.shortBio.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "dobDay",
                        "dobMonth",
                        "dobYear",
                        "heightCm",
                        "maritalStatus",
                        "religionId",
                        "motherTongueId",
                        "shortBio",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Heritage (Family & Horoscope) */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="pb-4 border-b border-purple-500/20">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-purple-400" />
                    Family Roots
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      {...register("fatherName")}
                      placeholder="Father's full name"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      {...register("motherName")}
                      placeholder="Mother's full name"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Native District
                    </label>
                    <input
                      type="text"
                      {...register("nativeDistrict")}
                      placeholder="e.g. Madurai, Tanjore"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Family Type
                    </label>
                    <Controller
                      control={control}
                      name="familyType"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["Joint", "Nuclear", "Other"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Caste
                    </label>
                    <Controller
                      control={control}
                      name="casteId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={castes}
                          value={
                            castes.find((c) => c.id === String(field.value)) ||
                            null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Search caste..."
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Subcaste
                    </label>
                    <input
                      type="text"
                      {...register("subcaste")}
                      placeholder="e.g. Kongu, Iyer"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Father's Occupation
                    </label>
                    <input
                      type="text"
                      {...register("fatherOccupation")}
                      placeholder="e.g. Business, Retired"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Mother's Occupation
                    </label>
                    <input
                      type="text"
                      {...register("motherOccupation")}
                      placeholder="e.g. Homemaker, Teacher"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Siblings Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      {...register("siblingsCount")}
                      placeholder="Number of brothers/sisters"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Own House
                    </label>
                    <Controller
                      control={control}
                      name="ownHouse"
                      render={({ field }) => (
                        <div className="flex gap-4 mt-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${field.value === true ? "border-purple-500 bg-purple-500/20" : "border-slate-600"}`}
                              onClick={() => field.onChange(true)}
                            >
                              {field.value === true && (
                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                              )}
                            </div>
                            <span className="text-slate-300 font-medium">
                              Yes
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${field.value === false ? "border-purple-500 bg-purple-500/20" : "border-slate-600"}`}
                              onClick={() => field.onChange(false)}
                            >
                              {field.value === false && (
                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                              )}
                            </div>
                            <span className="text-slate-300 font-medium">
                              No
                            </span>
                          </label>
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-6 pb-4 border-b border-purple-500/20 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <StarIcon className="w-5 h-5 text-amber-400" />
                    Horoscope Details
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-300">
                      Enable Horoscope
                    </span>
                    <Controller
                      control={control}
                      name="showHoroscope"
                      render={({ field }) => (
                        <button
                          type="button"
                          role="switch"
                          aria-checked={field.value}
                          onClick={() => field.onChange(!field.value)}
                          className={`${
                            field.value ? "bg-amber-400" : "bg-slate-700"
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900`}
                        >
                          <span
                            aria-hidden="true"
                            className={`${
                              field.value ? "translate-x-5" : "translate-x-0"
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      )}
                    />
                  </div>
                </div>
                {watchedShowHoroscope && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Star (Nakshatram)
                      </label>
                      <Controller
                        control={control}
                        name="starId"
                        render={({ field }) => (
                          <SearchableDropdown
                            options={stars}
                            value={
                              stars.find((s) => s.id === Number(field.value)) ||
                              null
                            }
                            onChange={(val) => field.onChange(val?.id || "")}
                            placeholder="Select star"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Rasi <span className="text-rose-500">*</span>
                      </label>
                      <Controller
                        control={control}
                        name="rasiId"
                        render={({ field }) => (
                          <PremiumSelect
                            options={rasis.map((r) => ({
                              id: String(r.id),
                              name: r.name,
                            }))}
                            value={String(field.value)}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.rasiId && (
                        <p className="text-rose-500 text-xs mt-1">
                          {errors.rasiId.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Laknam
                      </label>
                      <Controller
                        control={control}
                        name="laknamId"
                        render={({ field }) => (
                          <PremiumSelect
                            options={laknams.map((l) => ({
                              id: String(l.id),
                              name: l.name,
                            }))}
                            value={String(field.value)}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Gothram
                      </label>
                      <Controller
                        control={control}
                        name="gothramId"
                        render={({ field }) => (
                          <SearchableDropdown
                            options={gothrams}
                            value={
                              gothrams.find(
                                (g) => g.id === Number(field.value),
                              ) || null
                            }
                            onChange={(val) => field.onChange(val?.id || "")}
                            placeholder="Search gothram"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Birth Time <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="time"
                        {...register("birthTime")}
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                      />
                      {errors.birthTime && (
                        <p className="text-rose-500 text-xs mt-1">
                          {errors.birthTime.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Birth Place
                      </label>
                      <Controller
                        control={control}
                        name="birthCityId"
                        render={({ field }) => (
                          <SearchableDropdown
                            options={birthCitiesList}
                            value={
                              birthCitiesList.find(
                                (c) => c.id === Number(field.value),
                              ) || null
                            }
                            onChange={(val) => field.onChange(val?.id || "")}
                            placeholder="Search & Select City"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Sevvai Dosham
                      </label>
                      <Controller
                        control={control}
                        name="sevvaiDhosham"
                        render={({ field }) => (
                          <PremiumSelect
                            options={["No", "Yes", "Don't Know"].map((opt) => ({
                              id: opt,
                              name: opt,
                            }))}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Rahu Ketu Dosham
                      </label>
                      <Controller
                        control={control}
                        name="rahuKetuDhosham"
                        render={({ field }) => (
                          <PremiumSelect
                            options={["No", "Yes", "Don't Know"].map((opt) => ({
                              id: opt,
                              name: opt,
                            }))}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                        <DocumentArrowUpIcon className="w-5 h-5 text-amber-400" />
                        Horoscope Image <span className="text-rose-500">*</span>
                      </label>
                      {horoscopeImage ? (
                        <div className="relative w-48 h-64 rounded-2xl overflow-hidden border border-amber-500/20 group">
                          <img
                            src={getImageUrl(horoscopeImage)}
                            alt="Horoscope"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleHoroscopeDelete}
                            className="absolute top-2 right-2 p-2 bg-rose-500 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="w-full h-32 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-all bg-slate-900/50">
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleHoroscopeUpload}
                            accept="image/*"
                            disabled={uploading}
                          />
                          {uploading ? (
                            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <DocumentArrowUpIcon className="w-10 h-10 text-slate-600 mb-2" />
                              <span className="text-sm font-bold text-slate-500">
                                Upload Horoscope (JPG/PNG)
                              </span>
                            </>
                          )}
                        </label>
                      )}
                      {errors.horoscopeImage && (
                        <p className="text-rose-500 text-xs mt-1">
                          {errors.horoscopeImage.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "fatherName",
                        "motherName",
                        "fatherOccupation",
                        "motherOccupation",
                        "nativeDistrict",
                        "familyType",
                        "casteId",
                        "subcaste",
                        "siblingsCount",
                        "ownHouse",
                        "showHoroscope",
                        "starId",
                        "rasiId",
                        "laknamId",
                        "gothramId",
                        "birthTime",
                        "birthPlace",
                        "sevvaiDhosham",
                        "rahuKetuDhosham",
                        "horoscopeImage",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Location & Lifestyle */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        {...register("country")}
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        {...register("state")}
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        {...register("city")}
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 col-span-full border-t border-white/5"></div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Dietary Choice
                    </label>
                    <Controller
                      control={control}
                      name="diet"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Veg",
                            "Non-veg",
                            "Eggetarian",
                            "Vegan",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Fitness Level
                    </label>
                    <Controller
                      control={control}
                      name="fitnessLevel"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["Regular", "Occasional", "Not at all"].map(
                            (opt) => ({ id: opt, name: opt }),
                          )}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Smoking Habit
                    </label>
                    <Controller
                      control={control}
                      name="smoke"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["No", "Yes", "Occasionally"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Drinking Habit
                    </label>
                    <Controller
                      control={control}
                      name="drink"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["No", "Yes", "Occasionally"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "country",
                        "state",
                        "city",
                        "diet",
                        "fitnessLevel",
                        "smoke",
                        "drink",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Education & Career */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Highest Education
                    </label>
                    <input
                      type="text"
                      {...register("highestEducation")}
                      placeholder="e.g. B.Tech Computer Science"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Employment Type
                    </label>
                    <Controller
                      control={control}
                      name="employmentType"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Government",
                            "Private",
                            "Business",
                            "Self Employed",
                            "Not Working",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      {...register("designation")}
                      placeholder="e.g. Software Engineer"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Annual Income Range
                    </label>
                    <Controller
                      control={control}
                      name="incomeRange"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Under 3L",
                            "3L - 6L",
                            "6L - 10L",
                            "10L - 15L",
                            "15L - 25L",
                            "25L - 50L",
                            "50L+",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "highestEducation",
                        "employmentType",
                        "designation",
                        "incomeRange",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Values & Preferences */}
            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 gap-8">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <h4 className="text-white font-bold mb-6">
                      Personal Values (1-5 Scale)
                    </h4>
                    <div className="space-y-6">
                      {[
                        { name: "ambition", label: "Career Ambition" },
                        {
                          name: "familyOrientation",
                          label: "Family Orientation",
                        },
                        {
                          name: "spiritualInclination",
                          label: "Spiritual Inclination",
                        },
                      ].map((item) => (
                        <div key={item.name} className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Low</span>
                            <span className="text-purple-400 font-bold">
                              {item.label}
                            </span>
                            <span>High</span>
                          </div>
                          <Controller
                            control={control}
                            name={item.name as any}
                            render={({ field }) => (
                              <input
                                type="range"
                                min="1"
                                max="5"
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                              />
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Preferred Partner Age (Min)
                      </label>
                      <input
                        type="number"
                        {...register("partnerAgeMin")}
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                        placeholder="21"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Preferred Partner Age (Max)
                      </label>
                      <input
                        type="number"
                        {...register("partnerAgeMax")}
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none"
                        placeholder="35"
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Preferred Religion
                      </label>
                      <Controller
                        control={control}
                        name="partnerReligion"
                        render={({ field }) => (
                          <PremiumSelect
                            options={religions.map((r) => ({
                              id: String(r.id),
                              name: r.name,
                            }))}
                            value={String(field.value)}
                            onChange={(val) => {
                              field.onChange(val);
                              setValue("partnerCastes", []);
                            }}
                            placeholder="Any Religion"
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Preferred Caste(s)
                      </label>
                      <Controller
                        control={control}
                        name="partnerCastes"
                        render={({ field }) => (
                          <MultiSearchableDropdown
                            options={
                              field.value
                                ? [{ id: "any", name: "Any Caste" }, ...castes]
                                : castes
                            }
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Any Caste"
                            disabled={
                              !useWatch({ control, name: "partnerReligion" })
                            }
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Specific Location Preference
                      </label>
                      <textarea
                        {...register("partnerLocationPreference")}
                        rows={2}
                        placeholder="Preferred cities or areas..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "ambition",
                        "familyOrientation",
                        "spiritualInclination",
                        "partnerAgeMin",
                        "partnerAgeMax",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Final Review</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Visibility & Finish */}
            {step === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center space-y-4">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Legacy Complete!
                  </h3>
                  <p className="text-slate-400 max-w-md mx-auto">
                    Your profile is ready for curation. Choose how you'd like to
                    appear to the AuraWeds elite community.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Profile Visibility
                    </label>
                    <Controller
                      control={control}
                      name="profileVisibility"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            { id: "Public", name: "Visible to All" },
                            {
                              id: "Members Only",
                              name: "Premium Members Only",
                            },
                            { id: "Hidden", name: "Keep it Private for now" },
                          ]}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl font-black shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-[1.05] active:scale-95 transition-all outline-none"
                  >
                    {loading ? "Designing Destiny..." : "Complete My Legacy"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        <p className="mt-8 text-center text-[10px] text-slate-500 uppercase tracking-widest leading-loose">
          By creating an account, you agree to AuraWeds Premium{" "}
          <Link href="#" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline">
            Privacy Covenant
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
