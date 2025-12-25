import { Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string | null)?.trim();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed to newsletter!");
    e.currentTarget.reset();
  };
  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16">
        <div className="w-11/12 mx-auto">
          <div className="max-w-2xl mx-auto text-center text-white">
            <Mail className="size-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 opacity-90">
              Subscribe to our newsletter for delivery tips, exclusive offers,
              and updates
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                name="email"
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
    </div>
  );
}
