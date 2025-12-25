import {
  Briefcase,
  FileText,
  Globe,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link } from "react-router";

export default function Services() {
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

  return (
    <div>
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
    </div>
  );
}
