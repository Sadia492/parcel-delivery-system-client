import {
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Shield,
  User,
  Package,
  Ban,
  CreditCard,
  AlertOctagon,
  Key,
  Gavel,
} from "lucide-react";
import { Link } from "react-router";

export default function TermsConditions() {
  const sections = [
    // First row: 2 columns
    [
      {
        title: "Acceptance of Terms",
        icon: <CheckCircle className="w-5 h-5" />,
        content: `By accessing and using ParcelHub's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.`,
        important: true,
        points: [
          "If you do not agree with any part of these terms, you must not use our services",
          "Your continued use constitutes acceptance of any updates",
        ],
      },
      {
        title: "User Accounts",
        icon: <User className="w-5 h-5" />,
        content: `Account creation and management guidelines for our platform.`,
        points: [
          "Minimum age requirement: 18 years",
          "You are responsible for account security",
          "Provide accurate information during registration",
          "Notify us immediately of unauthorized use",
          "We may suspend violating accounts",
        ],
      },
    ],
    // Second row: 2 columns
    [
      {
        title: "Service Description",
        icon: <Package className="w-5 h-5" />,
        content: `ParcelHub provides comprehensive parcel delivery and logistics services.`,
        points: [
          "Pickup, transportation, tracking, and delivery services",
          "We facilitate connections between senders, receivers, and delivery personnel",
          "We are not the sender or receiver of parcels",
          "Delivery times are estimates, not guarantees",
          "Service availability varies by location",
        ],
      },
      {
        title: "Pricing & Payments",
        icon: <CreditCard className="w-5 h-5" />,
        content: `Transparent pricing and payment terms for all our services.`,
        points: [
          "Prices quoted in local currency including taxes",
          "Based on weight, dimensions, and destination",
          "Additional charges for special services",
          "Payment required before parcel dispatch",
          "Refunds processed per our refund policy",
          "We reserve right to modify prices with notice",
        ],
      },
    ],
    // Third row: 1 full-width important section
    [
      {
        title: "Prohibited Items",
        icon: <Ban className="w-5 h-5" />,
        content: `Items strictly prohibited from shipment through our service. Violation may result in legal action and service termination.`,
        important: true,
        columns: 2,
        points: [
          "Illegal drugs and controlled substances",
          "Weapons, firearms, and ammunition",
          "Hazardous materials and chemicals",
          "Live animals (except as permitted by law)",
          "Human remains or body parts",
          "Counterfeit goods and stolen property",
          "Cash and negotiable instruments",
          "Perishable items without proper packaging",
          "Explosives and flammable materials",
          "Radioactive materials",
        ],
      },
    ],
    // Fourth row: 2 columns
    [
      {
        title: "Delivery & Liability",
        icon: <AlertOctagon className="w-5 h-5" />,
        content: `Delivery terms and liability limitations for our services.`,
        important: true,
        points: [
          "Not liable for delays beyond our control",
          "Maximum liability limited to declared value",
          "Sender responsible for proper packaging",
          "Receiver must inspect parcels upon delivery",
          "Claims must be filed within 7 days",
          "No liability for consequential damages",
        ],
      },
      {
        title: "Intellectual Property",
        icon: <Key className="w-5 h-5" />,
        content: `Ownership and usage rights of platform content and intellectual property.`,
        points: [
          "All content owned by ParcelHub or licensors",
          "Do not copy, modify, or distribute our content",
          "User-generated content remains user property",
          "License granted for service provision",
          "Report infringement to legal@parcelhub.com",
        ],
      },
    ],
    // Fifth row: 2 columns
    [
      {
        title: "Termination",
        icon: <XCircle className="w-5 h-5" />,
        content: `Conditions under which service access may be terminated.`,
        points: [
          "We may terminate access at our discretion",
          "Violation may result in immediate termination",
          "Inactive accounts may be terminated",
          "Users may terminate accounts anytime",
          "Termination doesn't relieve payment obligations",
        ],
      },
      {
        title: "Governing Law",
        icon: <Gavel className="w-5 h-5" />,
        content: `Legal jurisdiction and dispute resolution procedures.`,
        points: [
          "Governed by laws of Bangladesh",
          "Disputes resolved in Dhaka courts",
          "Bangladeshi law applies to all transactions",
          "Disputes resolved through arbitration",
          "English version prevails over translations",
        ],
      },
    ],
  ];

  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <div className="w-11/12 mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Scale className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
            These terms govern your use of ParcelHub's delivery services. Please
            read them carefully before using our platform.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-semibold text-foreground">{lastUpdated}</span>
          </div>
        </div>

        {/* Important Notice */}
        <div className=" mx-auto mb-12">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl border border-red-200 dark:border-red-800 p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  ⚠️ Important Notice
                </h2>
                <p className="text-muted-foreground">
                  These terms contain important information about your rights
                  and obligations. Pay special attention to sections about
                  prohibited items, liability limitations, and dispute
                  resolution. By using our services, you agree to be bound by
                  these terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Column Layout */}
        <div className=" mx-auto">
          {/* Terms Sections in Columns */}
          <div className="space-y-8">
            {sections.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-1 ${
                  row.length === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2"
                } gap-6`}
              >
                {row.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className={`
                      bg-card rounded-2xl border p-6 h-full flex flex-col
                      ${
                        section.important
                          ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10"
                          : ""
                      }
                    `}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 rounded-lg ${
                          section.important
                            ? "bg-red-100 dark:bg-red-900/30"
                            : "bg-primary/10"
                        }`}
                      >
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-xl font-semibold text-foreground">
                            {section.title}
                          </h2>
                          {section.important && (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                              Important
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {section.content && (
                        <p className="text-muted-foreground mb-4 text-sm">
                          {section.content}
                        </p>
                      )}

                      {section.points && (
                        <div
                          className={`grid grid-cols-1 ${
                            (section as any).columns === 2
                              ? "md:grid-cols-2"
                              : ""
                          } gap-3`}
                        >
                          {section.points.map((point, pointIndex) => (
                            <div
                              key={pointIndex}
                              className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg"
                            >
                              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-muted-foreground">
                                  {pointIndex + 1}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Additional Policies - 3 Columns */}
          <div className="mt-12 bg-card rounded-2xl border p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              📋 Additional Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/privacy" className="block">
                <div className="h-full p-6 bg-muted/30 rounded-xl border hover:border-primary transition-colors flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      Privacy Policy
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex-1">
                    How we collect, use, and protect your personal information
                  </p>
                  <div className="mt-4 text-primary text-sm font-medium">
                    View Policy →
                  </div>
                </div>
              </Link>

              <div className="h-full p-6 bg-muted/30 rounded-xl border flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    Refund Policy
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground flex-1">
                  Conditions and procedures for refunds and cancellations
                </p>
                <div className="mt-4 text-muted-foreground text-sm">
                  Coming Soon
                </div>
              </div>

              <Link to="/help" className="block">
                <div className="h-full p-6 bg-muted/30 rounded-xl border hover:border-primary transition-colors flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      Help Center
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex-1">
                    Find answers to common questions and contact support
                  </p>
                  <div className="mt-4 text-primary text-sm font-medium">
                    Get Help →
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Acceptance Section - 2 Columns */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  📝 Acceptance & Changes
                </h2>
                <p className="text-muted-foreground mb-6">
                  By using our services, you acknowledge that you have read and
                  agree to these Terms and Conditions. We reserve the right to
                  modify these terms at any time. Continued use of our services
                  after changes constitutes acceptance of the modified terms.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 border">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Your Agreement
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You confirm that you understand and agree to these terms
                    </p>
                  </div>
                </div>
                <button className="w-full mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  I Accept Terms & Conditions
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information - 2 Columns */}
          <div className="mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 border-b md:border-b-0 md:border-r border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-foreground mb-3">
                    📞 Questions or Concerns?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms and Conditions,
                    please contact our legal team:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">
                        legal@parcelhub.com
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">
                        Level-4, 34, Awal Centre, Banani, Dhaka
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    ⚖️ Legal Department
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Response time: 3-5 business days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>For formal legal notices only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4" />
                      <span>Bangladesh jurisdiction applies</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-muted-foreground">
                      For general inquiries, please visit our{" "}
                      <Link
                        to="/help"
                        className="text-primary hover:underline font-medium"
                      >
                        Help Center
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation - 3 Columns */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/privacy">
                <div className="bg-card border rounded-xl p-6 hover:border-primary transition-colors text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Privacy Policy
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    How we handle your personal data
                  </p>
                </div>
              </Link>

              <div className="bg-card border rounded-xl p-6 text-center h-full cursor-pointer hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Download PDF
                </h4>
                <p className="text-sm text-muted-foreground">
                  Printable version of terms
                </p>
              </div>

              <Link to="/help">
                <div className="bg-card border rounded-xl p-6 hover:border-primary transition-colors text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Help Center
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Get support and answers
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
