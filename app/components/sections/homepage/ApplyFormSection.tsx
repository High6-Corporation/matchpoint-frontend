"use client";

import Image from "next/image";
import { useState } from "react";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";
import { FadeIn } from "@/app/components/ui/FadeIn";

const inputClass =
  "w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-4 md:p-6 text-base leading-6 text-white placeholder:text-neutral-400/60 focus:border-primary-500 focus:outline-none appearance-none";

export default function ApplyFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "idle", message: "" });

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "6a5f1f1f8a413161d9f85a19",
          tenant: "6a5d701ab8a114de0330ec37",
          submissionData: [
            { field: "fullname", value: formData.get("fullName")?.toString() || "" },
            { field: "refereelevel", value: formData.get("level")?.toString() || "" },
            { field: "sport", value: formData.get("sport")?.toString() || "" },
            { field: "city", value: formData.get("city")?.toString() || "" },
            { field: "mobilenumber", value: formData.get("mobile")?.toString() || "" },
            { field: "emailaddress", value: formData.get("email")?.toString() || "" },
          ],
        }),
      });

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Application received!" });
        formEl.reset();
        window.location.href = "/thank-you";
      } else {
        setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="apply" className="relative overflow-hidden py-12 md:py-20">

      <FadeIn direction="up">
      <Row className="relative grid items-start gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Apply as a MatchPoint Official
          </h2>
          <p className="max-w-[600px] text-base leading-6 text-white/80">
            Join the first platform built exclusively for Philippine basketball
            officials. Be among the first to get discovered, get booked, and get
            paid the right way.
          </p>
          <form
            className="flex flex-col gap-8 rounded-3xl border border-primary-800 bg-gradient-to-b from-black to-primary-900 p-6 md:p-12"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <label className="flex flex-col gap-2 text-sm text-white">
                Full Name
                <input
                  required
                  name="fullName"
                  placeholder="Alex Rivera"
                  className={inputClass}
                />
              </label>
              <div className="flex flex-col gap-6 sm:flex-row">
                <label className="flex flex-1 flex-col gap-2 text-sm text-white">
                  Referee Level
                  <select
                    required
                    name="level"
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select your level
                    </option>
                    <option>Barangay / Community</option>
                    <option>School / Collegiate</option>
                    <option>Regional</option>
                    <option>National / PBA-Certified</option>
                  </select>
                </label>
                <label className="flex flex-1 flex-col gap-2 text-sm text-white">
                  Sport
                  <select
                    name="sport"
                    defaultValue="Basketball"
                    className={inputClass}
                  >
                    <option>Basketball</option>
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-white">
                City
                <input
                  required
                  name="city"
                  placeholder="Your city"
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white">
                Mobile Number
                <input
                  required
                  name="mobile"
                  type="tel"
                  placeholder="+63 9xx xxxx"
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white">
                Email Address
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="alex@officiating.com"
                  className={inputClass}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-full bg-primary-600 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-primary-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Submitting..."
                : submitStatus.type === "success"
                  ? "Application Received!"
                  : "Apply as an Official"}
            </button>
            {submitStatus.type === "error" && (
              <p role="alert" className="text-center text-sm text-red-400">
                {submitStatus.message}
              </p>
            )}
          </form>
        </div>
        <div className="relative hidden min-h-[880px] overflow-hidden rounded-3xl lg:block">
          <Image
            src="/images/waitlist-photo.png"
            alt="Basketball referee"
            fill
            className="object-cover"
          />
        </div>
      </Row>
      </FadeIn>
    </Section>
  );
}
