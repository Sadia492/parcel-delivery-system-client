import img from "@/assets/cash-delivery-concept.png";
export default function About() {
  return (
    <section className="w-11/12 mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      {/* Left Side - Image */}
      <div className="w-full">
        <img
          src={img} // replace with your image
          alt="Parcel Delivery"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
      </div>

      {/* Right Side - Content */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-6">About Us</h1>

        <p className="text-foreground/80 leading-relaxed mb-4">
          Welcome to{" "}
          <span className="font-semibold">Parcel Delivery System</span>, a
          reliable and secure courier service designed to make your deliveries
          faster and easier. Whether you are a sender, receiver, or an admin,
          our platform ensures seamless parcel management with real-time
          tracking and status updates.
        </p>

        <p className="text-foreground/80 leading-relaxed mb-4">
          Our mission is simple:{" "}
          <span className="font-semibold">deliver with trust</span>. We combine
          modern technology with efficient logistics to ensure parcels reach
          their destination safely and on time.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
          Our Team
        </h2>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li>
            <strong>Senders</strong> – Create and manage parcel requests
          </li>
          <li>
            <strong>Receivers</strong> – Track and confirm deliveries
          </li>
          <li>
            <strong>Admins</strong> – Oversee operations and manage users
          </li>
        </ul>
      </div>
    </section>
  );
}
