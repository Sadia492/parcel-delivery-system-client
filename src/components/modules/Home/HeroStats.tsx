import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetHeroMetaQuery } from "@/redux/features/meta/meta.api";
import { MapPin, Package, ShieldCheck, Users } from "lucide-react";

export default function HeroStats() {
  const { data: heroStats, isLoading } = useGetHeroMetaQuery(undefined);

  // Statistics data with icons
  const stats = [
    {
      id: 1,
      value: heroStats?.data?.totalDeliveries,
      label: "Total Deliveries",
      icon: Package,
    },
    {
      id: 2,
      value: heroStats?.data?.satisfiedCustomers,
      label: "Satisfied Customers",
      icon: Users,
    },
    {
      id: 3,
      value: heroStats?.data?.citiesCovered,
      label: "Cities Covered",
      icon: MapPin,
    },
    {
      id: 4,
      value: `${heroStats?.data?.deliverySuccessRate}%`,
      label: "Delivery Success Rate",
      icon: ShieldCheck,
    },
  ];
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
        <div className="w-11/12 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Delivering excellence across the country with proven results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-card rounded-xl p-6 text-center border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <stat.icon className="size-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
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
