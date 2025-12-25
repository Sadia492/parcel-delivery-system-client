import { useState } from "react";
import {
  Package,
  Clock,
  Shield,
  Users,
  Target,
  Globe,
  Truck,
  MapPin,
  Heart,
  ShieldCheck,
} from "lucide-react";
import img from "@/assets/cash-delivery-concept.png";
import { useGetHeroMetaQuery } from "@/redux/features/meta/meta.api";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");
  const { data: heroStats, isLoading } = useGetHeroMetaQuery(undefined);

  const stats = [
    {
      id: 1,
      value: heroStats?.data?.totalDeliveries,
      label: "Total Deliveries",
      Icon: Package, // Changed from icon to Icon (uppercase)
    },
    {
      id: 2,
      value: heroStats?.data?.satisfiedCustomers,
      label: "Satisfied Customers",
      Icon: Users, // Changed from icon to Icon
    },
    {
      id: 3,
      value: heroStats?.data?.citiesCovered,
      label: "Cities Covered",
      Icon: MapPin, // Changed from icon to Icon
    },
    {
      id: 4,
      value: `${heroStats?.data?.deliverySuccessRate}%`,
      label: "Delivery Success Rate",
      Icon: ShieldCheck, // Changed from icon to Icon
    },
  ];

  const values = [
    {
      Icon: Shield, // Changed to component
      title: "Trust & Security",
      description:
        "Your parcels and data are protected with enterprise-grade security",
    },
    {
      Icon: Clock, // Changed to component
      title: "Reliability",
      description: "Consistent on-time delivery with real-time tracking",
    },
    {
      Icon: Heart, // Changed to component
      title: "Customer First",
      description: "Your satisfaction is our top priority",
    },
    {
      Icon: Globe, // Changed to component
      title: "Innovation",
      description: "Using technology to simplify logistics",
    },
  ];

  const teamMembers = [
    {
      role: "Senders",
      description: "Create and manage parcel requests with easy scheduling",
      Icon: Package, // Changed to component
    },
    {
      role: "Receivers",
      description: "Track deliveries in real-time and confirm arrivals",
      Icon: Truck, // Changed to component
    },
    {
      role: "Admins",
      description: "Oversee operations and ensure smooth delivery flow",
      Icon: Users, // Changed to component
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="">
        <div className="w-11/12 mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About ParcelGuru
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Delivering trust, one parcel at a time. We're revolutionizing
              logistics with technology-driven solutions that put customers
              first.
            </p>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => {
            const IconComponent = stat.Icon; // Store component reference
            return (
              <div
                key={stat.id}
                className=" rounded-xl shadow-lg p-6 text-center"
              >
                <div className="flex justify-center mb-4 text-primary">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className=" text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img
              src={img}
              alt="Parcel Delivery Team"
              className="rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                { id: "mission", label: "Our Mission" },
                { id: "story", label: "Our Story" },
                { id: "vision", label: "Our Vision" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "mission" && (
                <>
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Our Core Mission
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        To make parcel delivery{" "}
                        <span className="font-semibold text-primary">
                          fast, secure, and accessible
                        </span>
                        for everyone. We believe that reliable logistics
                        shouldn't be complicated or expensive.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Through our user-friendly platform, we connect senders with
                    reliable delivery networks, ensuring parcels reach their
                    destinations safely and on time.
                  </p>
                </>
              )}

              {activeTab === "story" && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Journey
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Founded in 2020, ParcelGuru started with a simple idea: to
                    solve the common frustrations people face with parcel
                    deliveries. What began as a small team of logistics
                    enthusiasts has grown into a trusted delivery platform
                    serving thousands of customers.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We've grown by focusing on what matters most:{" "}
                    <span className="font-semibold">
                      reliability, transparency, and customer satisfaction
                    </span>
                    .
                  </p>
                </>
              )}

              {activeTab === "vision" && (
                <>
                  <div className="flex items-start gap-3">
                    <Globe className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Future Vision
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        To become the{" "}
                        <span className="font-semibold text-primary">
                          most trusted delivery platform
                        </span>
                        in the region, expanding our services to cover every
                        corner while maintaining our commitment to excellence
                        and innovation.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Team Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Ecosystem
              </h2>
              <div className="space-y-4">
                {teamMembers.map((member, index) => {
                  const IconComponent = member.Icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {member.role}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.Icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4 text-primary">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
