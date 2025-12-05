import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Horizon Credit Repair. We're here to help with your credit repair questions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Have questions about our services? We're here to help. Reach out
              to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-2xl font-bold">Get In Touch</h2>
              <p className="mt-4 text-muted-foreground">
                Our team is available to answer your questions and help you get
                started on your credit repair journey.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="mt-1 text-muted-foreground">
                      <a
                        href={`tel:${siteConfig.contact.phone.raw}`}
                        className="text-primary hover:underline"
                      >
                        {siteConfig.contact.phone.display}
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Call us for immediate assistance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="mt-1 text-muted-foreground">
                      <a
                        href={`mailto:${siteConfig.contact.email.support}`}
                        className="text-primary hover:underline"
                      >
                        {siteConfig.contact.email.support}
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="mt-1 text-muted-foreground">
                      {siteConfig.contact.address.street}
                      <br />
                      {siteConfig.contact.address.city},{" "}
                      {siteConfig.contact.address.state}{" "}
                      {siteConfig.contact.address.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="mt-1 text-muted-foreground">
                      Monday - Friday: {siteConfig.hours.weekdays}
                      <br />
                      Saturday: {siteConfig.hours.saturday}
                      <br />
                      Sunday: {siteConfig.hours.sunday}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="mt-1 text-muted-foreground">
                      Click the chat icon in the bottom right corner to chat
                      with our AI assistant or connect with a live agent.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold">Send a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Can't find the answer you're looking for? Check out our FAQ page
              or chat with our AI assistant for instant answers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/faq"
                className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View FAQ
              </a>
              <a
                href="/learn"
                className="rounded-lg border bg-card px-6 py-3 font-medium transition-colors hover:bg-muted"
              >
                Credit Education
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

