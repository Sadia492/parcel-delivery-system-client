import { useState } from "react";
import toast from "react-hot-toast";
import img from "@/assets/9895175_47707-removebg-preview.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Here you could send formData to backend if needed
    toast.success("Message sent successfully!");

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-11/12 mx-auto px-6 py-12 grid md:grid-cols-2 gap-5 items-center">
      {/* Left side - Contact Info */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-6">Contact Us</h1>

        <p className="text-foreground/80 leading-relaxed mb-4">
          Have questions or need assistance? We’re here to help you with parcel
          requests, delivery updates, or account issues. Reach out and our team
          will get back to you as soon as possible.
        </p>

        <ul className="space-y-3 text-foreground/80">
          <li>
            <strong>Email:</strong> support@parceldelivery.com
          </li>
          <li>
            <strong>Phone:</strong> +880 123 456 789
          </li>
          <li>
            <strong>Address:</strong> Dhaka, Bangladesh
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border rounded-lg px-4 py-2 bg-background text-foreground"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border rounded-lg px-4 py-2 bg-background text-foreground"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="w-full border rounded-lg px-4 py-2 bg-background text-foreground"
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="flex justify-center">
        <img
          src={img}
          alt="Contact illustration"
          className="rounded-xl shadow-lg max-w-md w-full"
        />
      </div>
    </section>
  );
}
