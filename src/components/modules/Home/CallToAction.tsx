import { Link } from "react-router";

export default function CallToAction() {
  return (
    <div>
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
