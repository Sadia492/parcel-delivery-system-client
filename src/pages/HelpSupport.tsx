import { useState } from "react";
import { Link } from "react-router";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  MapPin,
  Search,
  ChevronRight,
  FileText,
  HelpCircle,
  Shield,
  Truck,
  Package,
  CreditCard,
  User,
  Globe,
  AlertCircle,
  CheckCircle,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // FAQ categories
  const faqCategories = [
    {
      id: "all",
      label: "All Topics",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      id: "tracking",
      label: "Tracking & Delivery",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: "shipping",
      label: "Shipping & Rates",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: "account",
      label: "Account & Profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "payments",
      label: "Payments & Refunds",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "safety",
      label: "Safety & Security",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "international",
      label: "International",
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: "How do I track my parcel?",
      answer:
        "You can track your parcel using the tracking ID provided in your confirmation email. Simply go to the 'Track Parcel' page and enter your tracking number. You'll see real-time updates including pickup, transit, and delivery status.",
      category: "tracking",
      popular: true,
    },
    {
      id: 2,
      question: "What are your delivery hours?",
      answer:
        "We deliver parcels Monday through Saturday from 9:00 AM to 8:00 PM. Sunday deliveries are available for express services only. Delivery times may vary based on location and service type.",
      category: "shipping",
      popular: true,
    },
    {
      id: 3,
      question: "How can I change my delivery address?",
      answer:
        "You can change the delivery address before the parcel is dispatched. Go to 'My Parcels' → Select the parcel → Click 'Edit Address'. After dispatch, address changes may incur additional fees and need to be requested via customer support.",
      category: "tracking",
      popular: false,
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards (Visa, MasterCard, Amex), mobile banking (bKash, Nagad, Rocket), bank transfers, and cash on delivery for eligible services.",
      category: "payments",
      popular: true,
    },
    {
      id: 5,
      question: "How do I create a sender account?",
      answer:
        "Click 'Sign Up' on the top right corner, select 'Sender' as your role, fill in your details, verify your email, and complete your profile. You'll need a valid ID and phone number for verification.",
      category: "account",
      popular: false,
    },
    {
      id: 6,
      question: "What items are prohibited for shipping?",
      answer:
        "We cannot ship hazardous materials, illegal substances, firearms, live animals, perishable goods without proper packaging, cash, and valuable documents. Please check our terms for a complete list.",
      category: "safety",
      popular: true,
    },
    {
      id: 7,
      question: "How long does international shipping take?",
      answer:
        "International delivery times vary by destination: USA/Canada (5-7 days), Europe (4-6 days), Middle East (3-5 days), Asia (2-4 days). Express services are 1-2 days faster.",
      category: "international",
      popular: false,
    },
    {
      id: 8,
      question: "How do I cancel a parcel delivery?",
      answer:
        "You can cancel a parcel from 'My Parcels' if it hasn't been dispatched yet. After dispatch, contact customer support immediately. Cancellation fees may apply based on service type.",
      category: "tracking",
      popular: false,
    },
    {
      id: 9,
      question: "What happens if my parcel is lost?",
      answer:
        "In rare cases of lost parcels, we initiate an investigation within 24 hours. If the parcel is not found within 7 days, we process compensation based on declared value and service terms.",
      category: "safety",
      popular: true,
    },
    {
      id: 10,
      question: "How do I update my profile information?",
      answer:
        "Go to 'My Profile' in your dashboard. Click 'Edit Profile' to update your personal information, address, and notification preferences. Some changes may require verification.",
      category: "account",
      popular: false,
    },
  ];

  // Filter FAQs based on category and search
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Contact information
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+880 1322-810874", "+880 1335-106731"],
      description: "Available: Sat - Thu, 9:00 AM to 8:00 PM",
      action: "Call Now",
      link: "tel:+8801322810874",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["support@parcelhub.com", "help@parcelhub.com"],
      description: "Response within 2-4 hours",
      action: "Send Email",
      link: "mailto:support@parcelhub.com",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      details: ["Available 24/7"],
      description: "Instant support from our agents",
      action: "Start Chat",
      link: "#chat",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Office",
      details: ["Level-4, 34, Awal Centre", "Banani, Dhaka 1213"],
      description: "Open: 10:00 AM - 7:00 PM",
      action: "Get Directions",
      link: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <div className="w-11/12 mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Headphones className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How can we help you?
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Get answers to common questions or contact our support team
            directly. We're here to help with all your parcel delivery needs.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-12 pr-4 py-6 text-lg border-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Popular searches: tracking, delivery time, payment, address change
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - FAQ */}
          <div className="lg:col-span-2">
            {/* FAQ Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Browse by Category
              </h2>
              <div className="flex flex-wrap gap-3">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg border transition-all
                      ${
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card hover:bg-muted border-border"
                      }
                    `}
                  >
                    {category.icon}
                    <span className="font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  Frequently Asked Questions
                </h2>
                <span className="text-muted-foreground">
                  {filteredFaqs.length} questions
                </span>
              </div>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {faq.question}
                            </h3>
                            {faq.popular && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {faq.answer}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              Was this helpful?
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Yes
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <AlertCircle className="w-4 h-4" />
                                No
                              </Button>
                            </div>
                          </div>
                        </div>
                        <span className="ml-4 px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border">
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No results found
                  </h3>
                  <p className="text-muted-foreground">
                    Try different keywords or browse by category
                  </p>
                </div>
              )}
            </div>

            {/* Additional Resources */}
            <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background rounded-xl p-6 border">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Documentation & Guides
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        How to Package Your Items
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Shipping Label Guide
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Customs Documentation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        API Integration Guide
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="bg-background rounded-xl p-6 border">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Policies & Terms
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/privacy"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Service Level Agreement
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Support */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Contact Support
              </h2>

              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {contact.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {contact.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-4">
                      {contact.details.map((detail, idx) => (
                        <p key={idx} className="font-medium text-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <a
                      href={contact.link}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                    >
                      {contact.action}
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  Support Hours
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Emergency Only</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Public Holidays</span>
                  <span className="font-medium">Limited Support</span>
                </div>
              </div>
            </div>

            {/* Quick Help Card */}
            <div className="bg-card rounded-2xl border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Issue Resolution
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Report Lost Parcel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Request Address Change
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Schedule Pickup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  File a Complaint
                </Button>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 rounded-2xl border border-red-200 dark:border-red-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  Emergency Support
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                For urgent parcel issues, security concerns, or time-sensitive
                deliveries
              </p>
              <Button variant="destructive" className="w-full">
                Emergency Hotline: +880 1234-567890
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our dedicated support team is ready to assist you with any
              questions or concerns.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Live Chat
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                Request Callback
              </Button>
              <Link to="/contact">
                <Button variant="ghost" size="lg" className="gap-2">
                  Contact Form
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
