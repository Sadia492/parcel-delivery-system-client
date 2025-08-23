import Banner from "@/components/Banner";
import { ShieldCheck, Clock, Package, Users } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <Banner />

      {/* How It Works Section */}
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

      {/* Features Section */}
      <section className="bg-muted py-16">
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
        <a
          href="/login"
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}
