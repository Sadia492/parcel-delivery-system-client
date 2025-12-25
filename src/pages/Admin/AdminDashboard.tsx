import { useState } from "react";
import {
  Package,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Truck,
  AlertCircle,
  BarChart3,
  PieChart,
  UserCheck,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Mail,
  Home,
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
import {
  useGetAdminMetaQuery,
  useGetChartsMetaQuery,
} from "@/redux/features/meta/meta.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";

// Color palettes
const STATUS_COLORS = {
  REQUESTED: "#FFB020",
  APPROVED: "#3B82F6",
  DISPATCHED: "#8B5CF6",
  DELIVERED: "#10B981",
  CANCELED: "#EF4444",
};

// const ROLE_COLORS = {
//   ADMIN: "#EF4444",
//   SENDER: "#3B82F6",
//   RECEIVER: "#10B981",
// };

const PARCEL_TYPE_COLORS = {
  DOCUMENT: "#8B5CF6",
  PACKAGE: "#F59E0B",
};

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<"monthly" | "weekly">("monthly");

  // Fetch data
  const {
    data: adminData,
    isLoading: adminLoading,
    error: adminError,
  } = useGetAdminMetaQuery(undefined);

  const {
    data: chartData,
    isLoading: chartLoading,
    error: chartError,
  } = useGetChartsMetaQuery({ timeframe });

  const stats = adminData?.data;
  const charts = chartData?.data;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Format percentage change (mock for now)
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  // Calculate growth rates (mock data - you would compare with previous period)
  const calculateGrowth = (current: number) => {
    const previous = current * 0.85; // Mock previous period (15% less)
    return ((current - previous) / previous) * 100;
  };

  // Get status count safely
  const getStatusCount = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return stats?.deliveredParcels || 0;
      case "APPROVED":
        return stats?.approvedParcels || 0;
      case "DISPATCHED":
        return stats?.dispatchedParcels || 0;
      case "CANCELED":
        return stats?.canceledParcels || 0;
      case "REQUESTED":
        return stats?.requestedParcels || 0;
      default:
        return 0;
    }
  };

  // Main stats cards data
  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      growth: calculateGrowth(stats?.totalRevenue || 0),
      description: "Total collected from deliveries",
    },
    {
      title: "Total Parcels",
      value: stats?.totalParcels?.toLocaleString() || "0",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      growth: calculateGrowth(stats?.totalParcels || 0),
      description: "All parcels processed",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      growth: calculateGrowth(stats?.totalUsers || 0),
      description: "Registered users",
    },
    {
      title: "Active Users",
      value: stats?.activeUsers?.toLocaleString() || "0",
      icon: UserCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      growth: calculateGrowth(stats?.activeUsers || 0),
      description: "Currently active users",
    },
  ];

  // Status distribution cards
  const statusCards = [
    {
      title: "Delivered",
      value: getStatusCount("DELIVERED"),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      percentage: stats?.totalParcels
        ? (getStatusCount("DELIVERED") / stats.totalParcels) * 100
        : 0,
    },
    {
      title: "Approved",
      value: getStatusCount("APPROVED"),
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      percentage: stats?.totalParcels
        ? (getStatusCount("APPROVED") / stats.totalParcels) * 100
        : 0,
    },
    {
      title: "Canceled",
      value: getStatusCount("CANCELED"),
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      percentage: stats?.totalParcels
        ? (getStatusCount("CANCELED") / stats.totalParcels) * 100
        : 0,
    },
    {
      title: "Dispatched",
      value: getStatusCount("DISPATCHED"),
      icon: Truck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      percentage: stats?.totalParcels
        ? (getStatusCount("DISPATCHED") / stats.totalParcels) * 100
        : 0,
    },
  ];

  // Prepare chart data from API response
  const barChartData =
    charts?.barChartData?.map((item: any) => ({
      month: item.month || `Week ${item.week}`,
      shipments: item.count,
      revenue: item.revenue,
    })) || [];

  // Status distribution data for pie chart
  const statusDistributionData =
    charts?.pieChartData?.statusDistribution?.map((item: any) => ({
      name: item.status,
      value: item.count,
      percentage: item.percentage,
      color:
        STATUS_COLORS[item.status as keyof typeof STATUS_COLORS] || "#6B7280",
    })) || [];

  // Parcel type distribution
  const parcelTypeData =
    charts?.pieChartData?.parcelTypeDistribution?.map((item: any) => ({
      name: item._id,
      value: item.count,
      color:
        PARCEL_TYPE_COLORS[item._id as keyof typeof PARCEL_TYPE_COLORS] ||
        "#6B7280",
    })) || [];

  // User distribution data
  // const userDistributionData =
  //   charts?.pieChartData?.userDistribution?.map((item: any) => ({
  //     name: item._id,
  //     value: item.count,
  //     color: ROLE_COLORS[item._id as keyof typeof ROLE_COLORS] || "#6B7280",
  //   })) || [];

  // Recent parcels table data
  const recentParcels = stats?.recentParcels || [];

  // Recent users data
  const recentUsers = stats?.recentUsers || [];

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  // Loading state
  if (adminLoading || chartLoading) {
    return (
      <div className="space-y-6">
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
  if (adminError || chartError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold  mb-2">
              Failed to Load Dashboard
            </h3>
            <p className=" mb-4">
              Unable to fetch dashboard data. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold  text-center">Admin Dashboard</h1>
        <p className=" mt-2 text-center">
          Welcome to your parcel management dashboard. Here's an overview of
          your platform.
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
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
                  {formatPercentage(stat.growth)}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold  mb-1">{stat.value}</h3>
              <p className="text-sm font-medium  mb-1">{stat.title}</p>
              <p className="text-xs ">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Shipments & Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Shipments & Revenue Trend
            </CardTitle>
            <CardDescription>
              {timeframe === "monthly" ? "Monthly" : "Weekly"} parcel shipments
              and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(
                      value: string | number | undefined,
                      name?: string
                    ) => {
                      if (name === "revenue")
                        return [formatCurrency(Number(value ?? 0)), "Revenue"];
                      return [value ?? 0, "Shipments"];
                    }}
                    labelStyle={{ color: "#374151", fontWeight: 600 }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="shipments"
                    name="Shipments"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    name="Revenue"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-4">
              <Button
                variant={timeframe === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={timeframe === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("monthly")}
              >
                Monthly
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Parcel Status Distribution
            </CardTitle>
            <CardDescription>
              Current distribution of parcels by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) =>
                      `${props.name ?? ""}: ${(
                        (props.percent ?? 0) * 100
                      ).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistributionData.map((entry: any, index: any) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(
                      value: number | string | undefined,
                      name?: string,
                      props?: any
                    ) => [
                      value ?? 0,
                      (props?.payload?.name ?? name ?? "") as string,
                    ]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {statusDistributionData.map((status: any, index: any) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-sm ">{status.name}</span>
                  <span className="text-sm font-semibold ml-auto">
                    {status.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution & User Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution Cards */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Parcel Status Overview
              </CardTitle>
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

        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold ">
                    {stats?.totalUsers?.toLocaleString()}
                  </span>
                  <p className="text-sm ">Total Users</p>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200"
                >
                  {stats?.activeUsers || 0} Active
                </Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm ">Senders</span>
                  </div>
                  <span className="font-semibold">
                    {stats?.totalSenders || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm ">Receivers</span>
                  </div>
                  <span className="font-semibold">
                    {stats?.totalReceivers || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm ">Admins</span>
                  </div>
                  <span className="font-semibold">
                    {stats?.totalSenders || 0}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="">Blocked Users</span>
                  <Badge variant="destructive">
                    {stats?.blockedUsers || 0}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Parcels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Recent Parcels
            </CardTitle>
            <CardDescription>
              Latest parcel shipments in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentParcels.length > 0 ? (
                recentParcels.map((parcel: any) => (
                  <div
                    key={parcel._id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-gray-100 flex-shrink-0">
                        <Package className="w-4 h-4 " />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm  truncate">
                          {parcel.trackingId}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs  truncate">
                            {parcel.parcelType} • {parcel.weight}kg
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs border flex-shrink-0 ${
                              parcel.status === "DELIVERED"
                                ? "border-green-200 text-green-700"
                                : parcel.status === "APPROVED"
                                ? "border-blue-200 text-blue-700"
                                : parcel.status === "CANCELED"
                                ? "border-red-200 text-red-700"
                                : "border-yellow-200 text-yellow-700"
                            }`}
                          >
                            {parcel.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold ">
                        {formatCurrency(parcel.fee)}
                      </p>
                      <p className="text-xs ">{formatDate(parcel.createdAt)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 ">No recent parcels found</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Users
            </CardTitle>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length > 0 ? (
                recentUsers.map((user: any) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                          user.role === "ADMIN"
                            ? "bg-red-100"
                            : user.role === "SENDER"
                            ? "bg-blue-100"
                            : "bg-green-100"
                        }`}
                      >
                        {user.role === "ADMIN" ? (
                          <Shield className="w-4 h-4 text-red-600" />
                        ) : user.role === "SENDER" ? (
                          <Package className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Home className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm  truncate">
                          {user.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs  truncate flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs border flex-shrink-0 ${
                              user.role === "ADMIN"
                                ? "border-red-200 text-red-700"
                                : user.role === "SENDER"
                                ? "border-blue-200 text-blue-700"
                                : "border-green-200 text-green-700"
                            }`}
                          >
                            {user.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge
                        variant={
                          user.isBlocked === "UNBLOCKED"
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {user.isBlocked === "UNBLOCKED" ? "Active" : "Blocked"}
                      </Badge>
                      <p className="text-xs  mt-1">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 ">No recent users found</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <PieChart className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm ">Parcel Types</p>
                <div className="flex items-center gap-4 mt-1">
                  {parcelTypeData.map((type: any) => (
                    <div key={type.name} className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                      <span className="text-xs ">{type.name}</span>
                      <span className="text-xs font-semibold">
                        {type.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm ">Delivery Success Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.totalParcels && stats.deliveredParcels
                    ? (
                        (stats.deliveredParcels / stats.totalParcels) *
                        100
                      ).toFixed(1) + "%"
                    : "0%"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm ">Avg. Parcel Value</p>
                <p className="text-2xl font-bold ">
                  {stats?.totalParcels && stats.totalRevenue
                    ? formatCurrency(stats.totalRevenue / stats.totalParcels)
                    : formatCurrency(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
