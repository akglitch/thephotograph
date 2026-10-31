'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SideNav from './SideNav';
import ThemeToggle from './ThemeToggle';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    spouseName: '',
    email: '',
    phone: '',
    eventType: '',
    customEventType: '',
    weddingDate: '',
    eventDate: '',
    location: '',
    guests: '',
    referral: '',
    message: '',
  });

  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isWedding =
    Boolean(formData.eventType?.trim().toLowerCase().includes('wedding')) ||
    Boolean(formData.customEventType?.trim().toLowerCase().includes('wedding'));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const eventParam = params.get('event') || params.get('type') || params.get('service');
      if (eventParam) {
        const lower = eventParam.toLowerCase();
        const resolved = lower.includes('wedding')
          ? 'Wedding'
          : lower.includes('editorial')
          ? 'Editorial'
          : lower.includes('portrait')
          ? 'Portrait'
          : eventParam;
        const timer = setTimeout(() => {
          setFormData((prev) => ({ ...prev, eventType: resolved }));
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'weddingDate') next.eventDate = value;
      if (name === 'eventDate') next.weddingDate = value;
      return next;
    });
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
              loading="eager"
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
                        eventType: '',
                        customEventType: '',
                        weddingDate: '',
                        eventDate: '',
                        location: '',
                        guests: '',
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
                  <div className={`grid grid-cols-1 gap-6 ${isWedding ? 'sm:grid-cols-2' : ''} transition-all duration-300`}>
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <AnimatePresence>
                      {isWedding && (
                        <motion.div
                          key="spouse-field"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          <label htmlFor="spouseName" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                            Spouse&apos;s Name
                          </label>
                          <input
                            type="text"
                            id="spouseName"
                            name="spouseName"
                            value={formData.spouseName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="youremail@example.com"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
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

                  {/* Event Type & Date */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="eventType" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Connected Event
                      </label>
                      <div className="relative mt-1.5">
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full appearance-none border-b border-border bg-transparent py-2 pr-8 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none cursor-pointer"
                        >
                          <option value="" className="bg-background text-foreground">Select an event...</option>
                          <option value="Wedding" className="bg-background text-foreground">Wedding</option>
                          <option value="Editorial" className="bg-background text-foreground">Editorial</option>
                          <option value="Portrait" className="bg-background text-foreground">Portrait</option>
                          <option value="Engagement / Couple Session" className="bg-background text-foreground">Engagement / Couple Session</option>
                          <option value="Commission / Commercial" className="bg-background text-foreground">Commission / Commercial</option>
                          <option value="Other" className="bg-background text-foreground">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {formData.eventType === 'Other' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2.5"
                        >
                          <input
                            type="text"
                            name="customEventType"
                            placeholder="Please specify event type..."
                            value={formData.customEventType || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                customEventType: val,
                              }));
                            }}
                            className="w-full border-b border-border bg-transparent py-1.5 text-xs text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                          />
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={isWedding ? 'weddingDate' : 'eventDate'}
                        className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground transition-colors duration-200"
                      >
                        {isWedding ? 'Wedding Date' : 'Event Date'}
                      </label>
                      <input
                        type="text"
                        id={isWedding ? 'weddingDate' : 'eventDate'}
                        name={isWedding ? 'weddingDate' : 'eventDate'}
                        value={isWedding ? formData.weddingDate : (formData.eventDate || formData.weddingDate)}
                        onChange={handleChange}
                        placeholder="eg. 31 January 2026"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Location & Number of Guests */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="location" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Event Location/s
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Venue, or Region"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                        Number of Guests
                      </label>
                      <input
                        type="text"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        placeholder="Estimated number of guests"
                        className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* How Did You Hear About Us? */}
                  <div>
                    <label htmlFor="referral" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                      How Did You Hear About Us?
                    </label>
                    <input
                      type="text"
                      id="referral"
                      name="referral"
                      value={formData.referral}
                      onChange={handleChange}
                      placeholder="eg. Instagram, Friend, Google, etc."
                      className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none"
                    />
                  </div>

                  {/* Tell Us More! */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                      Tell Us More!
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        isWedding
                          ? "Tell us a little bit more about you as a couple, your aesthetic, and what your vision is for the day..."
                          : "Tell us a little bit more about your project, your aesthetic, and what your vision is for the session..."
                      }
                      className="mt-1.5 w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-foreground focus:outline-none resize-y"
                    />
                    <p className="mt-1 text-[8.5px] leading-relaxed text-muted-foreground">
                      {isWedding
                        ? "Any details or special notes you would love us to know about your wedding day, aesthetic, or vision? Feel free to share them here."
                        : "Any details or special notes you would love us to know about your event, aesthetic, or vision? Feel free to share them here."}
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
