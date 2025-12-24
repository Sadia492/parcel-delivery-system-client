import Banner from "@/components/Banner";
import {
  ShieldCheck,
  Clock,
  Package,
  Users,
  Truck,
  FileText,
  Globe,
  Briefcase,
  Star,
  MapPin,
  Mail,
} from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  // const [weight, setWeight] = useState(1);
  // const [destination, setDestination] = useState("local");
  // useEffect(() => {
  //   setWeight(1);
  //   setDestination("local");
  // }, []);

  // Services data
  const services = [
    {
      id: 1,
      icon: Truck,
      title: "Same-Day Delivery",
      desc: "Get your parcels delivered within hours",
    },
    {
      id: 2,
      icon: Package,
      title: "Package Delivery",
      desc: "Reliable delivery for all package sizes",
    },
    {
      id: 3,
      icon: FileText,
      title: "Document Delivery",
      desc: "Secure delivery for important documents",
    },
    {
      id: 4,
      icon: Globe,
      title: "International Shipping",
      desc: "Ship parcels worldwide safely",
    },
    {
      id: 5,
      icon: Briefcase,
      title: "Business Solutions",
      desc: "Corporate shipping for businesses",
    },
    {
      id: 6,
      icon: ShieldCheck,
      title: "Special Handling",
      desc: "Fragile & high-value items care",
    },
  ];

  // Statistics data
  // const stats = [
  //   { id: 1, value: "10,000+", label: "Parcels Delivered", icon: Package },
  //   { id: 2, value: "5,000+", label: "Happy Customers", icon: Users },
  //   { id: 3, value: "50+", label: "Cities Covered", icon: MapPin },
  //   { id: 4, value: "98%", label: "On-time Delivery", icon: CheckCircle },
  // ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Owner",
      content:
        "ParcelGuru transformed our business logistics. Fast, reliable, and affordable!",
      rating: 5,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Frequent Sender",
      content:
        "The tracking feature is amazing. I always know where my packages are.",
      rating: 5,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Amina Rahman",
      role: "Online Seller",
      content: "Best delivery service I've used. Great customer support too!",
      rating: 4,
      avatar: "AR",
    },
  ];

  // FAQ data
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

  // Calculate price based on weight and destination
  // const calculatePrice = () => {
  //   const basePrice =
  //     destination === "local" ? 50 : destination === "intercity" ? 100 : 500;
  //   return basePrice * weight;
  // };

  return (
    <div>
      {/* 1. Hero Banner */}
      <Banner />

      {/* 2. How It Works Section */}
      <section className="w-11/12 mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-foreground/80">
          <div>
            <Package className="mx-auto size-12 mb-3 text-primary" />
            <h3 className="font-semibold">Send Parcel</h3>
            <p>Create a delivery request in just a few clicks.</p>
          </div>
          <div>
            <Clock className="mx-auto size-12 mb-3 text-primary" />
            <h3 className="font-semibold">Track in Real Time</h3>
            <p>Follow your parcel with live status updates.</p>
          </div>
          <div>
            <ShieldCheck className="mx-auto size-12 mb-3 text-primary" />
            <h3 className="font-semibold">Safe & Secure</h3>
            <p>We ensure your parcel reaches safely, every time.</p>
          </div>
          <div>
            <Users className="mx-auto size-12 mb-3 text-primary" />
            <h3 className="font-semibold">Confirm Delivery</h3>
            <p>Receiver confirms once the parcel is delivered.</p>
          </div>
        </div>
      </section>

      {/* 3. Services We Offer */}
      <section className="bg-muted py-16">
        <div className="w-11/12 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Delivery Services
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Choose from our range of reliable delivery services tailored to
              meet all your shipping needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-card p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <service.icon className="size-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.desc}
                    </p>
                    <Link
                      to="/login"
                      className="inline-block mt-3 text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Track Parcel Widget */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
        <div className="w-11/12 mx-auto">
          <div className=" mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Track Your Parcel
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Enter your tracking ID to get real-time updates on your delivery
              </p>
            </div>

            <div className="bg-card rounded-2xl border p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                    <input
                      type="text"
                      placeholder="Enter Tracking ID (e.g., TRK-2024-12345)"
                      className="w-full pl-12 pr-4 py-3 border rounded-lg bg-background"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Find your tracking ID in your confirmation email or
                    dashboard
                  </p>
                </div>
                <div>
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                    Track Parcel
                  </button>
                </div>
              </div>

              {/* Demo Tracking Timeline */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold text-foreground mb-4">
                  Tracking Demo
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      status: "Order Received",
                      time: "Today, 9:00 AM",
                      active: true,
                    },
                    {
                      status: "Parcel Collected",
                      time: "Today, 10:30 AM",
                      active: true,
                    },
                    {
                      status: "In Transit",
                      time: "Estimated 2:00 PM",
                      active: false,
                    },
                    {
                      status: "Out for Delivery",
                      time: "Estimated 4:00 PM",
                      active: false,
                    },
                    {
                      status: "Delivered",
                      time: "Estimated 6:00 PM",
                      active: false,
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.active ? "✓" : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.status}</div>
                        <div className="text-sm text-muted-foreground">
                          {step.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="bg-muted py-16">
        <div className="w-11/12 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied
              customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card p-6 rounded-xl border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground/80 italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
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

      {/* 9. Newsletter Subscription */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16">
        <div className="w-11/12 mx-auto">
          <div className="max-w-2xl mx-auto text-center text-white">
            <Mail className="size-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 opacity-90">
              Subscribe to our newsletter for delivery tips, exclusive offers,
              and updates
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm opacity-75 mt-4">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Why Choose Us Section (Already exists) */}
      <section className="py-16">
        <div className="w-11/12 mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Why Choose Us?
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-10">
            Our Parcel Delivery System is built to make sending and receiving
            packages seamless. Whether you're a sender, receiver, or admin,
            everything is handled in one platform.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl shadow bg-background">
              <h3 className="font-semibold mb-2">📦 Easy to Use</h3>
              <p className="text-foreground/70">
                Simple dashboard for senders, receivers, and admins.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow bg-background">
              <h3 className="font-semibold mb-2">⚡ Fast Delivery</h3>
              <p className="text-foreground/70">
                Optimized logistics for quick and reliable deliveries.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow bg-background">
              <h3 className="font-semibold mb-2">🔍 Real-time Tracking</h3>
              <p className="text-foreground/70">
                Track parcels with status logs and instant updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ready to send your first parcel?
        </h2>
        <p className="text-foreground/70 mb-6">
          Join thousands of users who trust us for fast and secure deliveries.
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition hover:scale-105"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
}
