'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SideNav from './SideNav';
import ThemeToggle from './ThemeToggle';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    spouseName: '',
    email: '',
    phone: '',
    weddingDate: '',
    location: '',
    guests: '',
    service: '',
    referral: '',
    message: '',
  });

  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerify = () => {
    if (isHumanVerified) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsHumanVerified(true);
      setErrorMessage('');
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isHumanVerified) {
      setErrorMessage('Please complete the verification check before submitting.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-700">
      {/* Editorial Header */}
      <header className="border-b border-border/40 bg-background/90 backdrop-blur-md sticky top-0 z-30 transition-colors duration-700 h-16 sm:h-20 shrink-0">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-16">
          <Link href="/" aria-label="glitchStudioz home" className="brand-logo-frame nav-brand-logo">
            <Image
              src="/logo.png"
              alt="glitchStudioz"
              width={1819}
              height={2551}
              priority
              className="brand-logo-image"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 sm:gap-8 text-[10px] uppercase tracking-[0.24em] text-foreground/80">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <Link href="/gallery" className="transition-colors hover:text-foreground">Portfolio</Link>
            <Link href="/wedding" className="transition-colors hover:text-foreground">Wedding</Link>
            <span className="border-b border-foreground pb-0.5 text-foreground">Contact</span>
            <ThemeToggle variant="default" />
          </nav>
          <div className="md:hidden">
            <SideNav variant="default" />
          </div>
        </div>
      </header>

      {/* Main Split Screen */}
      <main className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 flex-1 py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: STATIC Editorial Image Section (stays pinned while right form scrolls) */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28 flex flex-col items-center lg:items-start select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[420px] xl:max-w-[460px] h-[56vh] min-h-[380px] max-h-[540px] overflow-hidden border border-border/60 bg-muted/30 shadow-2xl rounded-sm"
            >
              <Image
                src="/20260109_154819 (1).jpg"
                alt="The Shoreline Dancer by Kwaku Ntiri"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
              />
            </motion.div>

            <div className="w-full max-w-[420px] xl:max-w-[460px] mt-4 space-y-2.5 border-t border-border/40 pt-3.5">
              <p className="font-serif text-sm xl:text-base font-light italic leading-relaxed text-foreground/85">
                &ldquo;We photograph people as they are: the laughter, the quiet glances, and all the in-between moments.&rdquo;
              </p>
              
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-muted-foreground pt-1">
                <span>Accra &bull; Worldwide</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/ak_deez/"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    Instagram &rarr;
                  </a>
                  <a
                    href="https://www.tiktok.com/@glitchstudioz"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    TikTok &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Section */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="border border-border/60 bg-muted/15 backdrop-blur-sm p-6 sm:p-10 xl:p-12 shadow-xl transition-colors duration-700"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-5"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-md">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-3xl font-light text-foreground sm:text-4xl">
                    Thank You, {formData.name || 'Friend'}.
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                    Your inquiry has been received. We review every vision with intention and will be in touch within 24 to 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsHumanVerified(false);
                      setFormData({
                        name: '',
                        spouseName: '',
                        email: '',
                        phone: '',
                        weddingDate: '',
                        location: '',
                        guests: '',
                        service: '',
                        referral: '',
                        message: '',
                      });
                    }}
                    className="mt-6 inline-block border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.22em] text-foreground transition-opacity hover:opacity-60"
                  >
                    Send another inquiry &rarr;
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Form Heading */}
                  <div className="border-b border-border/40 pb-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-2">
                      Commissions &bull; Weddings &bull; Editorial
                    </p>
                    <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-foreground">
                      Let&apos;s Connect
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                      Please share a few details below and we will get back to you with availability and collection details within 24 to 48 hours.
                    </p>
                  </div>

                  {/* Name & Spouse */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Your Name <span className="text-red-500/80">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="spouseName" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Spouse&apos;s Name <span className="text-red-500/80">*</span>
                      </label>
                      <input
                        type="text"
                        id="spouseName"
                        name="spouseName"
                        required
                        value={formData.spouseName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Your Email Address <span className="text-red-500/80">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="youremail@example.com"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Phone Number <span className="text-red-500/80">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+233 ..."
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                      <p className="mt-1 text-[8.5px] leading-tight text-muted-foreground">
                        (Used to text you once we respond to your email in case it reaches your spam folder.)
                      </p>
                    </div>
                  </div>

                  {/* Wedding Date & Guests */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="weddingDate" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Wedding Date <span className="text-red-500/80">*</span>
                      </label>
                      <input
                        type="text"
                        id="weddingDate"
                        name="weddingDate"
                        required
                        value={formData.weddingDate}
                        onChange={handleChange}
                        placeholder="eg. 31 January 2026"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Number of Guests <span className="text-red-500/80">*</span>
                      </label>
                      <input
                        type="text"
                        id="guests"
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        placeholder="Estimated number of guests"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Event Location */}
                  <div>
                    <label htmlFor="location" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                      Event Location/s <span className="text-red-500/80">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Venue, or Region"
                      className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label htmlFor="service" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                      What Service Are You Interested In? <span className="text-red-500/80">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full appearance-none border-b border-border bg-transparent py-2 pr-8 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none cursor-pointer"
                      >
                        <option value="" className="bg-background text-foreground">Select a service...</option>
                        <option value="Full Wedding Coverage" className="bg-background text-foreground">Full Wedding Coverage</option>
                        <option value="Intimate Wedding / Elopement" className="bg-background text-foreground">Intimate Wedding / Elopement</option>
                        <option value="Engagement / Couple Session" className="bg-background text-foreground">Engagement / Couple Session</option>
                        <option value="Editorial / Portrait" className="bg-background text-foreground">Editorial / Portrait Session</option>
                        <option value="Other" className="bg-background text-foreground">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* How Did You Hear About Us? */}
                  <div>
                    <label htmlFor="referral" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                      How Did You Hear About Us? <span className="text-red-500/80">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="referral"
                        name="referral"
                        required
                        value={formData.referral}
                        onChange={handleChange}
                        className="w-full appearance-none border-b border-border bg-transparent py-2 pr-8 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none cursor-pointer"
                      >
                        <option value="" className="bg-background text-foreground">Select an option...</option>
                        <option value="Instagram" className="bg-background text-foreground">Instagram</option>
                        <option value="TikTok" className="bg-background text-foreground">TikTok</option>
                        <option value="Word of Mouth / Referral" className="bg-background text-foreground">Word of Mouth / Referral</option>
                        <option value="Google / Web Search" className="bg-background text-foreground">Google / Web Search</option>
                        <option value="Other" className="bg-background text-foreground">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Tell Us More! */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                      Tell Us More! <span className="text-red-500/80">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us a little bit more about you as a couple, your aesthetic, and what your vision is for the day..."
                      className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none resize-y"
                    />
                    <p className="mt-1 text-[8.5px] leading-relaxed text-muted-foreground">
                      Any details or special notes you would love us to know about your relationship or wedding day? Feel free to share them here.
                    </p>
                  </div>

                  {/* Cloudflare-style Verification & Submit Button */}
                  <div className="pt-3 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-border/40">
                    {/* Verification Widget */}
                    <div>
                      <div
                        onClick={handleVerify}
                        className="inline-flex cursor-pointer items-center justify-between gap-4 rounded-md border border-border bg-muted/30 px-3 py-1.5 transition-all hover:bg-muted/60"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-4 w-4 items-center justify-center rounded border border-border bg-background">
                            {isVerifying ? (
                              <div className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                            ) : isHumanVerified ? (
                              <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : null}
                          </div>
                          <span className="text-[10px] font-medium tracking-wide text-foreground">
                            {isHumanVerified ? 'Verified Human' : 'Verify you are human'}
                          </span>
                        </div>
                        <div className="flex flex-col items-end text-[7px] text-muted-foreground border-l border-border/60 pl-2.5">
                          <span className="font-semibold tracking-wider text-orange-500">CLOUDFLARE</span>
                          <span className="text-[6.5px]">Turnstile</span>
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="mt-1.5 text-[10px] text-red-500">{errorMessage}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.26em] shadow-md transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending...' : "Let's Connect"}</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}
