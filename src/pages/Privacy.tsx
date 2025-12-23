import { Shield, Lock, Eye, Database, UserCheck, Bell } from "lucide-react";
import { Link } from "react-router";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="w-5 h-5" />,
      columns: 3,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name, email address, phone number, and shipping address",
            "Payment information (processed securely through payment gateways)",
            "Government-issued ID for verification purposes",
            "Profile pictures and account preferences",
          ],
        },
        {
          subtitle: "Usage Information",
          items: [
            "IP address, browser type, and device information",
            "Pages visited, time spent on pages, and navigation patterns",
            "Parcel tracking data and delivery history",
            "Communication logs with our support team",
          ],
        },
        {
          subtitle: "Parcel Information",
          items: [
            "Sender and receiver details",
            "Package contents (as declared by sender)",
            "Weight, dimensions, and value of parcels",
            "Delivery addresses and special instructions",
          ],
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-5 h-5" />,
      columns: 3,
      content: [
        {
          subtitle: "Service Delivery",
          items: [
            "Process and track parcel deliveries",
            "Communicate delivery status updates",
            "Verify user identities and prevent fraud",
            "Process payments and issue refunds",
          ],
        },
        {
          subtitle: "Service Improvement",
          items: [
            "Analyze usage patterns to improve our platform",
            "Develop new features and services",
            "Personalize user experience",
            "Conduct research and analytics",
          ],
        },
        {
          subtitle: "Communication",
          items: [
            "Send delivery notifications and updates",
            "Respond to customer support inquiries",
            "Send service announcements and policy updates",
            "Market new services (with user consent)",
          ],
        },
      ],
    },
    {
      title: "Data Sharing & Disclosure",
      icon: <UserCheck className="w-5 h-5" />,
      columns: 3,
      content: [
        {
          subtitle: "With Service Partners",
          items: [
            "Delivery personnel and logistics partners",
            "Payment processing companies",
            "IT service providers and cloud hosting",
            "Customer support platforms",
          ],
        },
        {
          subtitle: "Legal Requirements",
          items: [
            "Comply with legal obligations and court orders",
            "Protect our rights and property",
            "Prevent fraud and security threats",
            "Cooperate with law enforcement investigations",
          ],
        },
        {
          subtitle: "Business Transfers",
          items: [
            "In case of merger, acquisition, or sale of assets",
            "As part of due diligence processes",
            "To ensure service continuity",
          ],
        },
      ],
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      columns: 2,
      content: [
        {
          subtitle: "Protection Measures",
          items: [
            "SSL encryption for all data transmissions",
            "Secure server infrastructure with firewalls",
            "Regular security audits and penetration testing",
            "Access controls and authentication protocols",
          ],
        },
        {
          subtitle: "Data Retention",
          items: [
            "Account information: Retained while account is active",
            "Transaction data: 7 years for tax and legal purposes",
            "Parcel records: 3 years after delivery completion",
            "You can request data deletion at any time",
          ],
        },
      ],
    },
    {
      title: "Your Rights & Choices",
      icon: <Bell className="w-5 h-5" />,
      columns: 2,
      content: [
        {
          subtitle: "Access & Control",
          items: [
            "Access your personal data upon request",
            "Correct inaccurate or incomplete information",
            "Delete your account and associated data",
            "Export your data in a portable format",
          ],
        },
        {
          subtitle: "Communication Preferences",
          items: [
            "Opt-out of marketing communications",
            "Choose notification preferences",
            "Set privacy settings in your account",
            "Withdraw consent for data processing",
          ],
        },
      ],
    },
    {
      title: "Cookies & Tracking",
      icon: <Eye className="w-5 h-5" />,
      columns: 2,
      content: [
        {
          subtitle: "Types of Cookies",
          items: [
            "Essential cookies for platform functionality",
            "Analytics cookies to understand usage patterns",
            "Preference cookies to remember your settings",
            "Advertising cookies (only with consent)",
          ],
        },
        {
          subtitle: "Managing Cookies",
          items: [
            "Browser settings to block or delete cookies",
            "Opt-out of analytics tracking",
            "Clear cookies through your browser",
            "Use privacy-focused browser extensions",
          ],
        },
      ],
    },
  ];

  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <div className="w-11/12 mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
            We are committed to protecting your privacy and handling your data
            with transparency and care. This policy explains how we collect,
            use, and protect your information.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-semibold text-foreground">{lastUpdated}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className=" mx-auto">
          {/* Quick Summary */}
          <div className="bg-card rounded-2xl border p-8 mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              📋 Quick Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-muted/30 rounded-xl">
                <h3 className="font-semibold text-foreground mb-2">
                  🔒 Data Protection
                </h3>
                <p className="text-sm text-muted-foreground">
                  We use industry-standard encryption and security measures to
                  protect your data.
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl">
                <h3 className="font-semibold text-foreground mb-2">
                  👁️ Transparency
                </h3>
                <p className="text-sm text-muted-foreground">
                  We clearly explain what data we collect and how we use it.
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl">
                <h3 className="font-semibold text-foreground mb-2">
                  🎯 Your Control
                </h3>
                <p className="text-sm text-muted-foreground">
                  You have control over your data and can manage your privacy
                  settings.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-card rounded-2xl border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>

                {/* Dynamic Grid based on columns */}
                <div
                  className={`grid grid-cols-1 ${
                    section.columns === 3
                      ? "md:grid-cols-2 lg:grid-cols-3"
                      : "md:grid-cols-2"
                  } gap-8`}
                >
                  {section.content.map((content, contentIndex) => (
                    <div
                      key={contentIndex}
                      className="bg-muted/20 rounded-xl p-6 border"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {content.subtitle}
                      </h3>
                      <ul className="space-y-3">
                        {content.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-medium">
                                {itemIndex + 1}
                              </span>
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information - Two Column Layout */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Contact Our Privacy Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Email Support
                  </h3>
                </div>
                <p className="text-foreground font-medium mb-2">
                  privacy@parcelhub.com
                </p>
                <p className="text-sm text-muted-foreground">
                  For privacy-related inquiries and data requests. We typically
                  respond within 24-48 hours.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Phone Support
                  </h3>
                </div>
                <p className="text-foreground font-medium mb-2">
                  +880 1234-567890
                </p>
                <p className="text-sm text-muted-foreground">
                  Available Monday to Friday, 9:00 AM - 5:00 PM (GMT+6). For
                  urgent privacy matters only.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Office Address
                  </h3>
                  <p className="text-muted-foreground">
                    Level-4, 34, Awal Centre, Banani, Dhaka 1213, Bangladesh
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    General Support
                  </h3>
                  <p className="text-muted-foreground">
                    For general inquiries, visit our{" "}
                    <Link
                      to="/help"
                      className="text-primary hover:underline font-medium"
                    >
                      Help & Support
                    </Link>{" "}
                    page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Updates - Two Column Layout */}
          <div className="mt-8 p-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-foreground mb-4">
              🔔 Policy Updates & Version History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-foreground mb-3">
                  Update Process
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      We may update this policy periodically to reflect changes
                      in our practices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      Material changes will be notified via email or in-app
                      notification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      The "Last Updated" date will be revised accordingly
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-3">
                  Version History
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      v2.1 - January 15, 2024
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                      Current
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      v2.0 - October 5, 2023
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Major update
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      v1.2 - June 20, 2023
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Minor revisions
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Your continued use of our services after any changes indicates
                your acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Bottom Navigation - Three Column Layout */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Related Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/terms">
                <div className="bg-card border rounded-xl p-6 hover:border-primary transition-colors text-center">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Terms & Conditions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Read our complete terms of service and user agreement
                  </p>
                </div>
              </Link>

              <Link to="/help">
                <div className="bg-card border rounded-xl p-6 hover:border-primary transition-colors text-center">
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
                    Find answers to common questions and contact support
                  </p>
                </div>
              </Link>

              <div className="bg-card border rounded-xl p-6 hover:border-primary transition-colors text-center cursor-pointer">
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Download PDF
                </h4>
                <p className="text-sm text-muted-foreground">
                  Download a printable version of our privacy policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
