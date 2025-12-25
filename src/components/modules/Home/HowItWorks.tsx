import { Clock, Package, ShieldCheck, Users } from "lucide-react";

export default function HowItWorks() {
  return (
    <div>
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
    </div>
  );
}
