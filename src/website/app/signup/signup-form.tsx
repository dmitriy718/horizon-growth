"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  Shield,
  Lock,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z
      .string()
      .min(10, "Please enter a valid phone number")
      .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 79,
  },
  {
    id: "premier",
    name: "Premier",
    price: 109,
    popular: true,
  },
  {
    id: "premier-plus",
    name: "Premier Plus",
    price: 139,
  },
];

export function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"info" | "plan" | "payment">("info");
  const [selectedPlan, setSelectedPlan] = useState(
    searchParams.get("plan") || "premier"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agreeTerms: false,
    },
  });

  const password = watch("password", "");

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    try {
      // Create account
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          plan: selectedPlan,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const result = await response.json();

      // Redirect to Stripe Checkout
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-card shadow-lg">
      {/* Progress Steps */}
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          {[
            { id: "info", label: "Account Info" },
            { id: "plan", label: "Choose Plan" },
            { id: "payment", label: "Payment" },
          ].map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step === s.id
                    ? "bg-primary text-primary-foreground"
                    : index <
                        ["info", "plan", "payment"].indexOf(step)
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {index < ["info", "plan", "payment"].indexOf(step) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "ml-2 hidden text-sm sm:block",
                  step === s.id
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
              {index < 2 && (
                <div className="mx-4 h-px w-8 bg-border sm:w-12 lg:w-20" />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
        {/* Step 1: Account Info */}
        {step === "info" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  className={cn(
                    "w-full rounded-md border bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary",
                    errors.firstName && "border-destructive"
                  )}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  className={cn(
                    "w-full rounded-md border bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary",
                    errors.lastName && "border-destructive"
                  )}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                className={cn(
                  "w-full rounded-md border bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary",
                  errors.email && "border-destructive"
                )}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                className={cn(
                  "w-full rounded-md border bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary",
                  errors.phone && "border-destructive"
                )}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={cn(
                    "w-full rounded-md border bg-background px-4 py-2.5 pr-10 outline-none transition-colors focus:border-primary",
                    errors.password && "border-destructive"
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {/* Password Requirements */}
              <div className="mt-3 space-y-1">
                {passwordRequirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full",
                        req.met ? "bg-green-500" : "bg-muted"
                      )}
                    >
                      {req.met && <Check className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <span
                      className={cn(
                        "text-xs",
                        req.met ? "text-green-600" : "text-muted-foreground"
                      )}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className={cn(
                  "w-full rounded-md border bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary",
                  errors.confirmPassword && "border-destructive"
                )}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={() => setStep("plan")}
              className="w-full"
              size="lg"
            >
              Continue to Plan Selection
            </Button>
          </div>
        )}

        {/* Step 2: Plan Selection */}
        {step === "plan" && (
          <div className="space-y-6">
            <div className="space-y-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors",
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2",
                        selectedPlan === plan.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {selectedPlan === plan.id && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{plan.name}</span>
                        {plan.popular && (
                          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-500" />
                <span>7-day free trial included</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                You won't be charged until after your trial ends. Cancel anytime.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("info")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep("payment")}
                className="flex-1"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Terms */}
        {step === "payment" && (
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Order Summary</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {plans.find((p) => p.id === selectedPlan)?.name} Plan
                  </span>
                  <span>
                    ${plans.find((p) => p.id === selectedPlan)?.price}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Setup fee</span>
                  <span>$14.99</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>7-day free trial</span>
                  <span>-${plans.find((p) => p.id === selectedPlan)?.price}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Due today</span>
                    <span>$14.99</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Then ${plans.find((p) => p.id === selectedPlan)?.price}/mo
                    after trial
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                {...register("agreeTerms")}
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>
                ,{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                , and authorize Horizon Credit Repair to obtain my credit
                reports for the purpose of credit repair services.
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-sm text-destructive">
                {errors.agreeTerms.message}
              </p>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("plan")}
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Start Free Trial
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>256-bit encryption</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>PCI compliant</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

