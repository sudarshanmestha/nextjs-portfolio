'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Page() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const services = [
    { name: 'Custom Web Development', desc: 'Full-stack builds tailored to your business logic and workflows.' },
    { name: 'LMS Development', desc: 'Learning platforms with courses, quizzes, progress tracking and certificates.' },
    { name: 'WordPress Automation', desc: 'Automate content, plugins, backups and migrations at scale.' },
    { name: 'UI/UX Design', desc: 'Clean, conversion-focused interfaces built for your users.' },
    { name: 'Cloud & DevOps', desc: 'Deployment pipelines, hosting and infrastructure that scale with you.' },
    { name: 'API Integrations', desc: 'Connect your tools — payments, CRMs, analytics and more.' },
  ];

  const technologies = [
    { name: 'Django', desc: "Build powerful backends with Python's leading web framework." },
    { name: 'React', desc: "Create fast, interactive UIs with the world's most popular library." },
    { name: 'SQL', desc: 'Master databases — from queries to schema design and optimization.' },
    { name: 'Next.js', desc: 'Server-rendered, SEO-friendly React applications.' },
    { name: 'Node.js', desc: 'Scalable, event-driven backend services.' },
    { name: 'WordPress', desc: 'Flexible CMS builds and plugin/theme development.' },
  ];

  const whyChooseUs = [
    { name: 'Experienced Team', desc: 'Engineers and designers who ship production-grade work.' },
    { name: 'Fast Delivery', desc: 'Agile sprints that get you to launch faster.' },
    { name: 'Ongoing Support', desc: 'We stick around after launch — updates, fixes, improvements.' },
    { name: 'Transparent Pricing', desc: 'No hidden fees, clear scopes and honest timelines.' },
  ];

  const industries = [
    'Education', 'Healthcare', 'E-commerce', 'Finance', 'Real Estate', 'Non-Profits',
  ];

  const faqs = [
    { q: 'How long do I have access?', a: 'Lifetime access to all content.' },
    { q: 'Do you offer ongoing support?', a: 'Yes, all projects include a support window after launch, with extended plans available.' },
    { q: 'Can you work with our existing stack?', a: 'Absolutely — we integrate with most existing codebases and platforms.' },
  ];

  return (
    <div className="px-4 sm:px-8 lg:px-12 min-h-screen">
      <div className="mx-auto max-w-5xl">

        {/* HERO */}
        <section className="flex flex-col items-center text-center py-20">
          <div className="custom-box rounded-full px-4 py-1 text-sm font-bold mb-6 tracking-widest uppercase">
            Recently Revamped!
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[var(--foreground)]">
            Your destination to become a <br />
            <span className="gradient-text">Software Developer</span>
          </h1>

          <p className="text-[var(--foreground)]/50 text-lg mb-10 max-w-xl">
            Learn Django, React, SQL and more — through real projects and clear explanations.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/auth/login"
              className="gradient-bg accent-glow text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 active:scale-95 shadow-lg shadow-[#58a6ff]/25"
            >
              Get Started
            </Link>
            <Link
              href="/projects"
              className="custom-box px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              View Projects
            </Link>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-16" id="services">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-aos="fade-up">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/50 max-w-xl mx-auto mb-10" data-aos="fade-up">
            Everything you need to design, build and scale your product.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {services.map((item, i) => (
              <div
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="custom-box rounded-xl p-6 transition-all hover:-translate-y-1 group"
              >
                <h3 className="font-bold text-lg mb-2 gradient-text">{item.name}</h3>
                <p className="text-sm opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNOLOGIES */}
        <section className="py-16" id="technologies">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-aos="fade-up">
            Technologies We <span className="gradient-text">Use</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {technologies.map((item, i) => (
              <div
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="custom-box rounded-xl p-6 transition-all hover:-translate-y-1 group"
              >
                <h3 className="font-bold text-lg mb-2 gradient-text">{item.name}</h3>
                <p className="text-sm opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LMS SHOWCASE */}
        <section className="py-16 grid gap-10 md:grid-cols-2 items-center" id="lms-showcase">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">LMS</span> Showcase
            </h2>
            <p className="text-[var(--foreground)]/50 mb-6">
              A full-featured learning management system with courses, quizzes,
              progress tracking and certificates — built for scale.
            </p>
            <ul className="space-y-2 text-sm opacity-70">
              <li>• Course & lesson builder</li>
              <li>• Student progress dashboards</li>
              <li>• Quizzes and certification</li>
              <li>• Payments and subscriptions</li>
            </ul>
          </div>
          <div
            data-aos="fade-left"
            className="custom-box rounded-xl aspect-video flex items-center justify-center"
          >
            <img
              src="/images/LMS_solution.png"
              alt="Automation workflow preview"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </section>

        {/* WORDPRESS AUTOMATION */}
        <section className="py-16 grid gap-10 md:grid-cols-2 items-center" id="wordpress-automation">
          <div
            data-aos="fade-right"
            className="custom-box rounded-xl aspect-video flex items-center justify-center order-2 md:order-1 relative"
          >
            <img
              src="/images/wordpress.png"
              alt="Automation workflow preview"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div data-aos="fade-left" className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              WordPress <span className="gradient-text">Automation</span>
            </h2>
            <p className="text-[var(--foreground)]/50 mb-6">
              We automate the repetitive parts of running WordPress — content
              publishing, plugin updates, backups and migrations — so your
              team can focus on growth.
            </p>
            <ul className="space-y-2 text-sm opacity-70">
              <li>• Bulk content publishing pipelines</li>
              <li>• Automated backups and migrations</li>
              <li>• Plugin and theme management</li>
              <li>• Performance and security monitoring</li>
            </ul>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16" id="why-choose-us">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" data-aos="fade-up">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <div
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="custom-box rounded-xl p-6 text-center transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold mb-2 gradient-text">{item.name}</h3>
                <p className="text-sm opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="py-16" id="industries">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" data-aos="fade-up">
            Industries We <span className="gradient-text">Serve</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((name, i) => (
              <span
                key={name}
                data-aos="zoom-in"
                data-aos-delay={i * 80}
                className="custom-box rounded-full px-6 py-2 text-sm font-bold"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          data-aos="fade-up"
          className="gradient-bg rounded-2xl text-center py-16 px-6 my-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start your project?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Let's talk about what you're building and how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 active:scale-95"
          >
            Book a Call
          </Link>
        </section>

        {/* FAQ */}
        <section className="pb-20" id="faq">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" data-aos="fade-up">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((item, i) => (
              <details
                key={item.q}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="custom-box rounded-lg p-4"
              >
                <summary className="cursor-pointer font-bold list-none flex justify-between items-center">
                  {item.q}
                  <span className="gradient-text font-black">↓</span>
                </summary>
                <p className="mt-3 text-sm opacity-60">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="pb-24" id="contact">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" data-aos="fade-up">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="grid gap-10 md:grid-cols-2 max-w-3xl mx-auto">
            <form data-aos="fade-right" className="custom-box rounded-xl p-6 space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
              />
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                className="gradient-bg accent-glow text-white w-full py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 active:scale-95"
              >
                Send Message
              </button>
            </form>
            <div data-aos="fade-left" className="custom-box rounded-xl p-6 space-y-4 text-sm opacity-70">
              <p>Prefer email or a quick call? Reach out directly:</p>
              <p>Email: hello@example.com</p>
              <p>Phone: +1 (000) 000-0000</p>
              <p>We usually respond within one business day.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}