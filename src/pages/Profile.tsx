import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Save,
  CheckCircle,
  AlertCircle,
  Package,
  Truck,
  HelpCircle,
  MapPin,
  Activity,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const navigate = useNavigate();

  // Fetch current user data from your API
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useUserInfoQuery(undefined);
  //   const [logout] = useLogoutMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  const [activeTab, setActiveTab] = useState("overview");

  const user = userData?.data;

  // Initialize edited data when user data loads
  if (user && !Object.keys(editedData).length) {
    setEditedData(user);
  }

  const handleSave = async () => {
    try {
      // In a real implementation, you would have an update mutation
      // await updateUserMutation(editedData).unwrap();

      toast.success("profile updated successfully");

      setIsEditing(false);
      refetch(); // Refresh user data
    } catch (error) {
      toast.error("failed to update profile");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString: string | { $date: string }) => {
    if (!dateString) return "N/A";
    const dateStr =
      typeof dateString === "string" ? dateString : dateString.$date;
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleColor = (role?: string) => {
    if (!role) return "bg-gray-500/20 text-gray-700 border-gray-500/30";

    switch (role) {
      case "ADMIN":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      case "SENDER":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "RECEIVER":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  const getRoleIcon = (role?: string) => {
    if (!role) return <Shield className="w-4 h-4" />;

    switch (role) {
      case "ADMIN":
        return <Shield className="w-4 h-4" />;
      case "SENDER":
        return <Truck className="w-4 h-4" />;
      case "RECEIVER":
        return <Package className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-500/20 text-gray-700";

    switch (status) {
      case "UNBLOCKED":
        return "bg-green-500/20 text-green-700";
      case "BLOCKED":
        return "bg-red-500/20 text-red-700";
      default:
        return "bg-gray-500/20 text-gray-700";
    }
  };

  // Generate avatar URL from name
  //   const getAvatarUrl = (name?: string, email?: string) => {
  //     const seed = name || email || "user";
  //     return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
  //       seed
  //     )}`;
  //   };

  // Get initials for avatar fallback
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const getAvatarColor = (id?: string) => {
    if (!id) return "bg-gray-200";

    // Simple hash for consistent color
    const colors = [
      "bg-gray-200 text-gray-700", // Neutral gray
      "bg-slate-200 text-slate-700", // Slate
      "bg-stone-200 text-stone-700", // Stone
      "bg-neutral-200 text-neutral-700", // Neutral
      "bg-zinc-200 text-zinc-700", // Zinc
    ];

    const hash = id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-11/12 max-auto">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Error Loading Profile
            </CardTitle>
            <CardDescription>
              Unable to fetch your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please check your connection or try logging in again.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => refetch()} variant="outline">
                Retry
              </Button>
              <Button onClick={() => navigate("/login")}>Go to Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Full width header */}
      <div className="w-11/12 mx-auto ">
        <div className="mx-auto px-4 sm:px-4 lg:px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="overflow-hidden pt-0">
                <div
                  className={`h-32 ${
                    user.role === "ADMIN"
                      ? "bg-gradient-to-r from-red-500 to-orange-600"
                      : user.role === "SENDER"
                      ? "bg-gradient-to-r from-red-500 to-orange-600"
                      : "bg-gradient-to-r from-red-500 to-orange-600"
                  }`}
                />
                <CardContent className="pt-0">
                  <div className="relative -top-16 mb-[-3rem]">
                    <div className="w-32 h-32 mx-auto">
                      <div
                        className={`w-full h-full rounded-full flex items-center justify-center ${getAvatarColor(
                          user._id
                        )}`}
                      >
                        <span className="text-3xl font-bold">
                          {getInitials(user.name)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {isEditing ? (
                        <Input
                          value={editedData.name || ""}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="text-center text-xl font-bold"
                        />
                      ) : (
                        user.name
                      )}
                    </h2>

                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {isEditing ? (
                          <Input
                            value={editedData.email || ""}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="text-center"
                            type="email"
                          />
                        ) : (
                          user.email
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Badge
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {getRoleIcon(user.role)}
                        {user.role}
                      </Badge>

                      <Badge
                        className={`px-3 py-1 rounded-full ${getStatusColor(
                          user.isBlocked
                        )}`}
                      >
                        {user.isBlocked === "UNBLOCKED" ? "Active" : "Blocked"}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatDate(user.updatedAt)}
                        </p>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="space-y-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={editedData.phone || ""}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={editedData.address || ""}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                            placeholder="123 Main St"
                          />
                        </div>

                        <Button onClick={handleSave} className="w-full gap-2">
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">
                        Account Status
                      </span>
                      <Badge
                        variant={
                          user.isBlocked === "UNBLOCKED"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {user.isBlocked === "UNBLOCKED" ? "Active" : "Blocked"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">
                        Role Level
                      </span>
                      <span className="font-medium">
                        {user.role === "ADMIN"
                          ? "Full Access"
                          : user.role === "SENDER"
                          ? "Sender Access"
                          : "Receiver Access"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">
                        Profile Complete
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: "75%" }}
                          />
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Content Tabs */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="mb-6">
                  <TabsList className="w-full bg-transparent border-b rounded-none p-0 h-auto">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="documents"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Documents
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-gray-500">Full Name</Label>
                            {isEditing ? (
                              <Input
                                value={editedData.name || ""}
                                onChange={(e) =>
                                  handleInputChange("name", e.target.value)
                                }
                              />
                            ) : (
                              <p className="font-medium">{user.name}</p>
                            )}
                          </div>

                          <div>
                            <Label className="text-gray-500">
                              Email Address
                            </Label>
                            {isEditing ? (
                              <Input
                                value={editedData.email || ""}
                                disabled={true}
                                onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                                }
                                type="email"
                              />
                            ) : (
                              <p className="font-medium">{user.email}</p>
                            )}
                          </div>

                          <div>
                            <Label className="text-gray-500">User Role</Label>
                            <div className="flex items-center gap-2 mt-1">
                              {getRoleIcon(user.role)}
                              <p className="font-medium">{user.role}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-gray-500">
                              Account Status
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              {user.isBlocked === "UNBLOCKED" ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                              )}
                              <p className="font-medium">
                                {user.isBlocked === "UNBLOCKED"
                                  ? "Active Account"
                                  : "Account Blocked"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <Label className="text-gray-500">
                              Member Since
                            </Label>
                            <p className="font-medium">
                              {formatDate(user.createdAt)}
                            </p>
                          </div>

                          <div>
                            <Label className="text-gray-500">
                              Last Updated
                            </Label>
                            <p className="font-medium">
                              {formatDate(user.updatedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Role-Specific Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {user.role === "ADMIN" ? (
                          <>
                            <Shield className="w-5 h-5" />
                            Administrator Privileges
                          </>
                        ) : user.role === "SENDER" ? (
                          <>
                            <Truck className="w-5 h-5" />
                            Sender Information
                          </>
                        ) : (
                          <>
                            <Package className="w-5 h-5" />
                            Receiver Information
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                            {user.role === "ADMIN"
                              ? "System Access"
                              : user.role === "SENDER"
                              ? "Shipping Preferences"
                              : "Delivery Preferences"}
                          </h4>
                          <ul className="space-y-2">
                            {user.role === "ADMIN" ? (
                              <>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Full system access</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>User management</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Analytics dashboard</span>
                                </li>
                              </>
                            ) : user.role === "SENDER" ? (
                              <>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Track deliveries</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>View shipping history</span>
                                </li>
                              </>
                            ) : (
                              <>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Receive parcels</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Track incoming shipments</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Manage delivery preferences</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Quick Actions
                          </h4>
                          <div className="space-y-3">
                            {user.role === "ADMIN" ? (
                              <>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start gap-2"
                                >
                                  <Link
                                    className="flex gap-2"
                                    to={"/admin/users"}
                                  >
                                    <Users className="w-4 h-4" />
                                    Manage Users
                                  </Link>
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start gap-2"
                                >
                                  <Link
                                    className="flex gap-2"
                                    to={"/admin/dashboard"}
                                  >
                                    <Activity className="w-4 h-4" />
                                    View Analytics
                                  </Link>
                                </Button>
                              </>
                            ) : user.role === "SENDER" ? (
                              <>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start gap-2"
                                >
                                  <Link
                                    className="flex gap-2"
                                    to={"/sender/parcels"}
                                  >
                                    <MapPin className="w-4 h-4" />
                                    Create Shipment
                                  </Link>
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start gap-2"
                                >
                                  <Link className="flex gap-2" to={"/track"}>
                                    <Truck className="w-4 h-4" />
                                    Track Parcels
                                  </Link>
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start gap-2"
                                >
                                  <Link
                                    className="flex gap-2"
                                    to={"/receiver/my-parcels"}
                                  >
                                    <Package className="w-4 h-4" />
                                    Check Incoming Parcels
                                  </Link>
                                </Button>
                              </>
                            )}
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-2"
                            >
                              <Link className="flex gap-2" to={"/help"}>
                                <HelpCircle className="w-4 h-4" />
                                Get Help
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>
                        Your recent actions and system interactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Profile Updated</p>
                              <p className="text-sm text-gray-500">
                                You updated your profile information
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDate(user.updatedAt)}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Account Created</p>
                              <p className="text-sm text-gray-500">
                                You joined our parcel delivery system
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDate(user.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Documents & Files
                      </CardTitle>
                      <CardDescription>
                        Upload and manage your documents
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                          No documents uploaded
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Upload documents related to your shipments or account
                        </p>
                        <Button>
                          <FileText className="w-4 h-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
