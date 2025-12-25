export default function WhyChooseUs() {
  return (
    <div>
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
    </div>
  );
}
