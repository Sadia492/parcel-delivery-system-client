import { Link } from "react-router";
import faqImage from "@/assets/faq.png";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I send a parcel?",
      answer:
        "Simply create an account, fill in sender/receiver details, select service type, and schedule pickup.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Local delivery: 1-2 days, Same-day: within hours, International: 3-7 days depending on destination.",
    },
    {
      question: "What items are prohibited?",
      answer:
        "Illegal substances, weapons, hazardous materials, live animals, and perishable items without proper packaging.",
    },
    {
      question: "How do I track my parcel?",
      answer:
        "Use your tracking ID on our Track Parcel page or in your dashboard for real-time updates.",
    },
  ];

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap md:flex-nowrap">
      <section className="w-11/12 mx-auto py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Get answers to common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
          <div className="text-center mt-8">
            <Link
              to="/help"
              className="text-primary hover:text-primary/80 font-medium"
            >
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>
      <div>
        <img src={faqImage} alt="FAQ" />
      </div>
    </div>
  );
}
