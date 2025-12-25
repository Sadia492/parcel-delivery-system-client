import {
  Package,
  Truck,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  ArrowUpRight,
  ArrowDownRight,
  Weight,
  Home,
  RefreshCw,
  Activity,
  Inbox,
  ShieldCheck,
  Award,
  Bell,
  Tag,
  Percent,
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
import { useGetReceiverMetaQuery } from "@/redux/features/meta/meta.api";

import { format } from "date-fns";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function ReceiverDashboard() {
  // Fetch data
  const {
    data: receiverData,
    isLoading: receiverLoading,
    error: receiverError,
    refetch: refetchReceiverData,
  } = useGetReceiverMetaQuery(undefined);

  const { data: userData } = useUserInfoQuery(undefined);

  const stats = receiverData?.data;
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
  // const calculatePercentage = (value: number, total: number) => {
  //   if (!total) return 0;
  //   return (value / total) * 100;
  // };

  // Calculate growth rates (mock)
  const calculateGrowth = (current: number) => {
    const previous = current * 0.85;
    return ((current - previous) / previous) * 100;
  };

  // Get most frequent sender
  const getMostFrequentSender = () => {
    if (!stats?.recentParcels || stats.recentParcels.length === 0) {
      return "None";
    }

    const senderCounts: Record<string, number> = {};

    stats.recentParcels.forEach((parcel: any) => {
      const senderName = parcel.senderId?.name || "Unknown";
      senderCounts[senderName] = (senderCounts[senderName] || 0) + 1;
    });

    // Find sender with highest count
    let mostFrequent = "Unknown";
    let highestCount = 0;

    Object.entries(senderCounts).forEach(([name, count]) => {
      if (count > highestCount) {
        highestCount = count;
        mostFrequent = name;
      }
    });

    return mostFrequent;
  };

  // Get top sender location
  const getTopSenderLocation = () => {
    if (!stats?.recentParcels || stats.recentParcels.length === 0) {
      return "Unknown";
    }

    const firstParcel = stats.recentParcels[0];
    if (!firstParcel.fromAddress) return "Unknown";

    // Extract just the first part before comma
    const address =
      firstParcel.fromAddress.split(",")[0] || firstParcel.fromAddress;
    return address.length > 20 ? address.substring(0, 20) + "..." : address;
  };

  // Get status breakdown
  const getStatusBreakdown = () => {
    if (!stats?.recentParcels || stats.recentParcels.length === 0) {
      return { delivered: 0, approved: 0, canceled: 0, total: 0 };
    }

    const breakdown = {
      delivered: 0,
      approved: 0,
      canceled: 0,
      total: stats.recentParcels.length,
    };

    stats.recentParcels.forEach((parcel: any) => {
      switch (parcel.status) {
        case "DELIVERED":
          breakdown.delivered++;
          break;
        case "APPROVED":
          breakdown.approved++;
          break;
        case "CANCELED":
          breakdown.canceled++;
          break;
      }
    });

    return breakdown;
  };

  // Main stats cards data - using actual stats from API
  const statCards = [
    {
      title: "Total Parcels Received",
      value: stats?.receiverParcels?.toLocaleString() || "0",
      icon: Inbox,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      growth: calculateGrowth(stats?.receiverParcels || 0),
      description: "All parcels received by you",
    },
    {
      title: "Completed Deliveries",
      value: stats?.completedDeliveries?.toLocaleString() || "0",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      growth: calculateGrowth(stats?.completedDeliveries || 0),
      description: "Successfully delivered parcels",
    },
    {
      title: "Pending Deliveries",
      value: stats?.pendingDeliveries?.toLocaleString() || "0",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      growth: calculateGrowth(stats?.pendingDeliveries || 0),
      description: "Parcels waiting for delivery",
    },
    {
      title: "Total Amount Paid",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      growth: calculateGrowth(stats?.totalRevenue || 0),
      description: "Total amount paid for deliveries",
    },
  ];

  // Recent parcels
  const recentParcels = stats?.recentParcels || [];

  // Upcoming deliveries
  const upcomingDeliveries = stats?.upcomingDeliveries || [];

  // Calculate average parcel weight
  const averageParcelWeight =
    recentParcels.length > 0
      ? recentParcels.reduce(
          (sum: number, p: any) => sum + (p.weight || 0),
          0
        ) / recentParcels.length
      : 0;

  // Calculate total weight received
  const totalWeightReceived = recentParcels.reduce(
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

  // Get delivery success rate - using actual data
  const statusBreakdown = getStatusBreakdown();
  const deliverySuccessRate =
    stats?.receiverParcels && stats.completedDeliveries
      ? ((stats.completedDeliveries / stats.receiverParcels) * 100).toFixed(1)
      : "0.0";

  // Loading state
  if (receiverLoading) {
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
  if (receiverError) {
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
            <Button onClick={() => refetchReceiverData()}>Retry</Button>
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
          <h1 className="text-3xl font-bold ">Receiver Dashboard</h1>
          <p className=" mt-2">
            Welcome back,{" "}
            <span className="font-semibold text-green-600">{user?.name}</span>!
            Here's an overview of your parcel deliveries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchReceiverData()}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/receiver/settings">
              <Home className="w-4 h-4" />
              Delivery Settings
            </Link>
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
              <h3 className="text-2xl font-bold  mb-1">{stat.value}</h3>
              <p className="text-sm font-medium  mb-1">{stat.title}</p>
              <p className="text-xs ">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Delivery Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Delivery Status Overview
              </CardTitle>
              <CardDescription>
                Your parcel delivery progress and statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Delivery Completion */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium ">Delivery Success Rate</p>
                        <p className="text-2xl font-bold ">
                          {deliverySuccessRate}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm ">Completed</p>
                      <p className="text-xl font-bold text-green-600">
                        {stats?.completedDeliveries || 0}/
                        {stats?.receiverParcels || 0}
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={parseFloat(deliverySuccessRate)}
                    className="h-3"
                  />
                </div>

                {/* Status Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm ">Delivered</p>
                        <p className="text-xl font-bold ">
                          {statusBreakdown.delivered}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm ">Approved</p>
                        <p className="text-xl font-bold ">
                          {statusBreakdown.approved}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm ">Canceled</p>
                        <p className="text-xl font-bold ">
                          {statusBreakdown.canceled}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parcel Types */}
                <div>
                  <h4 className="font-medium  mb-3">Parcel Types Received</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm ">Packages</span>
                      <Badge variant="outline" className="ml-2">
                        {packageCount}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm ">Documents</span>
                      <Badge variant="outline" className="ml-2">
                        {documentCount}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start gap-2">
                <Link to="/receiver/parcels">
                  <Inbox className="w-4 h-4" />
                  View All Deliveries
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full justify-start gap-2"
              >
                <Link to="/track">
                  <Truck className="w-4 h-4" />
                  Track Incoming Parcels
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full justify-start gap-2"
              >
                <Link to="/receiver/settings">
                  <Home className="w-4 h-4" />
                  Update Delivery Address
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
                <h4 className="font-medium  text-sm">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <p className="text-xs ">Total Weight</p>
                    <p className="font-bold ">
                      {totalWeightReceived.toFixed(1)}kg
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50">
                    <p className="text-xs ">Avg. Weight</p>
                    <p className="font-bold ">
                      {averageParcelWeight.toFixed(1)}kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Recent Deliveries
            </CardTitle>
            <CardDescription>
              Your most recent parcel deliveries
            </CardDescription>
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
                              {parcel.senderId?.name || "Unknown"}
                            </span>
                            <span className="text-xs  flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {parcel.parcelType}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs  mb-1">
                          <Weight className="w-3 h-3" />
                          {parcel.weight}kg
                        </div>
                        <p className="text-xs ">
                          {formatDate(parcel.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 ">
                  <Inbox className="w-12 h-12  mx-auto mb-3" />
                  <p>No deliveries yet</p>
                  <p className="text-sm  mt-1">
                    Parcels sent to you will appear here
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deliveries & Summary */}
        <div className="space-y-6">
          {/* Upcoming Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Upcoming Deliveries
              </CardTitle>
              <CardDescription>
                Parcels currently in transit to you
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
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <span className=" flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {parcel.senderId?.name || "Unknown"}
                          </span>
                          <span className=" flex items-center gap-1">
                            <Weight className="w-3 h-3" />
                            {parcel.weight}kg
                          </span>
                        </div>
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

          {/* Delivery Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Delivery Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">Delivery Address</span>
                    <span className="text-sm font-medium  truncate max-w-[150px]">
                      {user?.address || "Not set"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">Total Received</span>
                    <span className="text-sm font-medium ">
                      {stats?.receiverParcels || 0} parcels
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">Success Rate</span>
                    <span className="text-sm font-medium text-green-600">
                      {deliverySuccessRate}%
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium  text-sm">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-gray-50">
                      <p className="text-xs ">Total Paid</p>
                      <p className="font-bold ">
                        {formatCurrency(stats?.totalRevenue || 0)}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50">
                      <p className="text-xs ">Pending</p>
                      <p className="font-bold text-yellow-600">
                        {stats?.pendingDeliveries || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/receiver/settings">
                    Manage Delivery Preferences
                  </Link>
                </Button>
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
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm ">Most Frequent Sender</p>
                <p className="text-lg font-bold  truncate">
                  {getMostFrequentSender()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Percent className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm ">Delivery Reliability</p>
                <p className="text-lg font-bold ">{deliverySuccessRate}%</p>
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
                <p className="text-sm ">Top Sender Location</p>
                <p className="text-lg font-bold  truncate">
                  {getTopSenderLocation()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
