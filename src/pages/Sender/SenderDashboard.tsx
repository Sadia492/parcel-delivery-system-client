import {
  Package,
  Truck,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  User,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Weight,
  RefreshCw,
  Activity,
  Users,
  Award,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSenderMetaQuery } from "@/redux/features/meta/meta.api";

import { format } from "date-fns";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function SenderDashboard() {
  // Fetch data
  const {
    data: senderData,
    isLoading: senderLoading,
    error: senderError,
    refetch: refetchSenderData,
  } = useGetSenderMetaQuery(undefined);

  // const {
  //   data: dashboardData,
  //   isLoading: dashboardLoading,
  //   error: dashboardError,
  // } = useGetDashboardMetaQuery(undefined);

  const { data: userData } = useUserInfoQuery(undefined);

  const stats = senderData?.data;
  const user = userData?.data;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  // Calculate percentage
  const calculatePercentage = (value: number, total: number) => {
    if (!total) return 0;
    return (value / total) * 100;
  };

  // Calculate growth rates (mock)
  const calculateGrowth = (current: number) => {
    const previous = current * 0.85;
    return ((current - previous) / previous) * 100;
  };

  // Get most frequent receiver
  const getMostFrequentReceiver = () => {
    if (!stats?.recentParcels || stats.recentParcels.length === 0) {
      return "None";
    }

    const receiverCounts: Record<string, number> = {};

    stats.recentParcels.forEach((parcel: any) => {
      const receiverName = parcel.receiverId?.name || "Unknown";
      receiverCounts[receiverName] = (receiverCounts[receiverName] || 0) + 1;
    });

    // Find receiver with highest count
    let mostFrequent = "Unknown";
    let highestCount = 0;

    Object.entries(receiverCounts).forEach(([name, count]) => {
      if (count > highestCount) {
        highestCount = count;
        mostFrequent = name;
      }
    });

    return mostFrequent;
  };

  // Main stats cards data
  const statCards = [
    {
      title: "Total Parcels Sent",
      value: stats?.senderParcels?.toLocaleString() || "0",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      growth: calculateGrowth(stats?.senderParcels || 0),
      description: "All parcels you've sent",
    },
    {
      title: "Collected Revenue",
      value: formatCurrency(stats?.collectedRevenue || 0),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      growth: calculateGrowth(stats?.collectedRevenue || 0),
      description: "Total revenue from delivered parcels",
    },
    {
      title: "Pending Revenue",
      value: formatCurrency(stats?.pendingRevenue || 0),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      growth: calculateGrowth(stats?.pendingRevenue || 0),
      description: "Revenue from pending parcels",
    },
    {
      title: "Delivery Success",
      value:
        stats?.senderParcels && stats.deliveredParcels
          ? `${((stats.deliveredParcels / stats.senderParcels) * 100).toFixed(
              1
            )}%`
          : "0%",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      growth: calculateGrowth(stats?.deliveredParcels || 0),
      description: "Successfully delivered parcels",
    },
  ];

  // Parcel status cards
  const statusCards = [
    {
      title: "Delivered",
      value: stats?.deliveredParcels || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      percentage: calculatePercentage(
        stats?.deliveredParcels || 0,
        stats?.senderParcels || 0
      ),
    },
    {
      title: "Approved",
      value: stats?.approvedParcels || 0,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      percentage: calculatePercentage(
        stats?.approvedParcels || 0,
        stats?.senderParcels || 0
      ),
    },
    {
      title: "Canceled",
      value: stats?.canceledParcels || 0,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      percentage: calculatePercentage(
        stats?.canceledParcels || 0,
        stats?.senderParcels || 0
      ),
    },
    {
      title: "Dispatched",
      value: stats?.dispatchedParcels || 0,
      icon: Truck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      percentage: calculatePercentage(
        stats?.dispatchedParcels || 0,
        stats?.senderParcels || 0
      ),
    },
  ];

  // Recent parcels
  const recentParcels = stats?.recentParcels || [];

  // Upcoming deliveries
  const upcomingDeliveries = stats?.upcomingDeliveries || [];

  // Calculate average parcel value
  const averageParcelValue =
    stats?.senderParcels && stats.collectedRevenue
      ? stats.collectedRevenue / stats.senderParcels
      : 0;

  // Calculate total weight
  const totalWeight = recentParcels.reduce(
    (sum: number, p: any) => sum + (p.weight || 0),
    0
  );

  // Count parcel types
  const packageCount = recentParcels.filter(
    (p: any) => p.parcelType === "PACKAGE"
  ).length;
  const documentCount = recentParcels.filter(
    (p: any) => p.parcelType === "DOCUMENT"
  ).length;

  // Get top destination
  const getTopDestination = () => {
    if (recentParcels.length === 0) return "Unknown";
    const firstParcel = recentParcels[0];
    if (!firstParcel.toAddress) return "Unknown";
    return firstParcel.toAddress.split(",")[0] || firstParcel.toAddress;
  };

  // Loading state
  if (senderLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  if (senderError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold  mb-2">
              Failed to Load Dashboard
            </h3>
            <p className=" mb-4">
              Unable to fetch your dashboard data. Please try again later.
            </p>
            <Button onClick={() => refetchSenderData()}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold ">Sender Dashboard</h1>
          <p className=" mt-2">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600">{user?.name}</span>!
            Here's an overview of your parcel shipments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchSenderData()}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <Badge
                  variant={stat.growth >= 0 ? "default" : "destructive"}
                  className="gap-1"
                >
                  {stat.growth >= 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.growth >= 0 ? "+" : ""}
                  {stat.growth.toFixed(1)}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm font-medium mb-1">{stat.title}</p>
              <p className="text-xs">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Parcel Status Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parcel Status Cards */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Your Parcel Status
              </CardTitle>
              <CardDescription>
                Distribution of your parcels by current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusCards.map((status, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${status.bgColor}`}>
                          <status.icon className={`w-4 h-4 ${status.color}`} />
                        </div>
                        <div>
                          <span className="font-medium ">{status.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold ">
                              {status.value}
                            </span>
                            <span className="text-sm ">parcels</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold ">
                        {status.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={status.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                asChild
                className="w-full justify-start gap-2"
              >
                <Link to="/sender/parcels">
                  <Package className="w-4 h-4" />
                  View All Parcels
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full justify-start gap-2"
              >
                <Link to="/track">
                  <Truck className="w-4 h-4" />
                  Track Shipments
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full justify-start gap-2"
              >
                <Link to="/profile">
                  <User className="w-4 h-4" />
                  Update Profile
                </Link>
              </Button>

              <Separator className="my-3" />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg ">
                    <p className="text-xs">Avg. Value</p>
                    <p className="font-bold ">
                      {formatCurrency(averageParcelValue)}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg ">
                    <p className="text-xs ">Total Weight</p>
                    <p className="font-bold ">{totalWeight}kg</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Recent Shipments
            </CardTitle>
            <CardDescription>Your most recent parcel shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentParcels.length > 0 ? (
                recentParcels.map((parcel: any) => (
                  <Link
                    key={parcel._id}
                    to={`/parcel/${parcel._id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${
                            parcel.status === "DELIVERED"
                              ? "bg-green-100"
                              : parcel.status === "APPROVED"
                              ? "bg-blue-100"
                              : parcel.status === "CANCELED"
                              ? "bg-red-100"
                              : "bg-purple-100"
                          }`}
                        >
                          <Package
                            className={`w-4 h-4 ${
                              parcel.status === "DELIVERED"
                                ? "text-green-600"
                                : parcel.status === "APPROVED"
                                ? "text-blue-600"
                                : parcel.status === "CANCELED"
                                ? "text-red-600"
                                : "text-purple-600"
                            }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm  truncate">
                              {parcel.trackingId}
                            </p>
                            <Badge
                              variant="outline"
                              className={`text-xs border flex-shrink-0 ${
                                parcel.status === "DELIVERED"
                                  ? "border-green-200 text-green-700"
                                  : parcel.status === "APPROVED"
                                  ? "border-blue-200 text-blue-700"
                                  : parcel.status === "CANCELED"
                                  ? "border-red-200 text-red-700"
                                  : "border-purple-200 text-purple-700"
                              }`}
                            >
                              {parcel.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs  flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {parcel.receiverId?.name || "Unknown"}
                            </span>
                            <span className="text-xs  flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {parcel.toAddress || "No address"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold ">
                          {formatCurrency(parcel.fee)}
                        </p>
                        <div className="flex items-center gap-1 text-xs ">
                          <Weight className="w-3 h-3" />
                          {parcel.weight}kg
                        </div>
                        <p className="text-xs  mt-1">
                          {formatDate(parcel.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 ">
                  <Package className="w-12 h-12  mx-auto mb-3" />
                  <p>No shipments yet</p>
                  <Button asChild variant="outline" size="sm" className="mt-3">
                    <Link to="/sender/parcels/create">
                      Create Your First Shipment
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deliveries & Stats */}
        <div className="space-y-6">
          {/* Upcoming Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Upcoming Deliveries
              </CardTitle>
              <CardDescription>
                Parcels currently in transit or approved
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeliveries.length > 0 ? (
                  upcomingDeliveries.map((parcel: any) => (
                    <div
                      key={parcel._id}
                      className="p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm ">
                            {parcel.trackingId}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              parcel.status === "APPROVED"
                                ? "border-blue-200 text-blue-700"
                                : "border-purple-200 text-purple-700"
                            }`}
                          >
                            {parcel.status}
                          </Badge>
                        </div>
                        <span className="text-sm font-semibold ">
                          {formatCurrency(parcel.fee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <span className=" flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {parcel.receiverId?.name || "Unknown"}
                          </span>
                          <span className=" flex items-center gap-1">
                            <Weight className="w-3 h-3" />
                            {parcel.weight}kg
                          </span>
                        </div>
                        <span className="">{formatDate(parcel.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 ">
                    <Truck className="w-10 h-10  mx-auto mb-2" />
                    <p className="text-sm">No upcoming deliveries</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm ">Collected Revenue</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(stats?.collectedRevenue || 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm ">Pending Revenue</p>
                    <p className="text-xl font-bold text-yellow-600">
                      {formatCurrency(stats?.pendingRevenue || 0)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">Total Shipments</span>
                    <span className="font-semibold">
                      {stats?.senderParcels || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">Delivered</span>
                    <span className="font-semibold text-green-600">
                      {stats?.deliveredParcels || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">In Transit</span>
                    <span className="font-semibold text-blue-600">
                      {stats?.dispatchedParcels || 0}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm ">Most Sent To</p>
                <p className="text-lg font-bold  truncate">
                  {getMostFrequentReceiver()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm ">Top Destination</p>
                <p className="text-lg font-bold  truncate">
                  {getTopDestination()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm ">Parcel Types</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700"
                  >
                    {packageCount} Packages
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-50 text-purple-700"
                  >
                    {documentCount} Documents
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
