import { Suspense } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  BellRing,
  Check,
  CheckCheck,
  Building2,
  MessageSquare,
  TrendingUp,
  User,
  Calendar,
  Filter,
  MoreVertical,
  Trash2,
  Archive,
  Star,
  Eye,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const dynamic = 'force-dynamic';

// Mock notifications data - replace with real data from backend
const notificationsData = [
  {
    id: '1',
    type: 'PROPERTY_INQUIRY',
    title: 'New Property Inquiry',
    message: 'Rahul Sharma is interested in your 3BHK apartment in Salt Lake City',
    isRead: false,
    createdAt: '2024-12-25T10:30:00Z',
    propertyId: 'prop-1',
    propertyTitle: 'Luxury 3BHK Apartment in Salt Lake',
    userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Rahul Sharma',
    userName: 'Rahul Sharma',
    priority: 'HIGH'
  },
  {
    id: '2',
    type: 'PROPERTY_VERIFIED',
    title: 'Property Verified',
    message: 'Your property "Modern 2BHK with City View" has been verified and is now live',
    isRead: false,
    createdAt: '2024-12-25T09:15:00Z',
    propertyId: 'prop-2',
    propertyTitle: 'Modern 2BHK with City View',
    priority: 'MEDIUM'
  },
  {
    id: '3',
    type: 'PRICE_ALERT',
    title: 'Price Drop Alert',
    message: 'A similar property in your area has reduced price by ₹2L',
    isRead: true,
    createdAt: '2024-12-24T16:45:00Z',
    priority: 'LOW'
  },
  {
    id: '4',
    type: 'LEAD_UPDATE',
    title: 'Lead Status Update',
    message: 'Priya Banerjee has been qualified as a potential buyer',
    isRead: true,
    createdAt: '2024-12-24T14:20:00Z',
    userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Priya Banerjee',
    userName: 'Priya Banerjee',
    priority: 'HIGH'
  },
  {
    id: '5',
    type: 'MARKET_UPDATE',
    title: 'Market Trend Update',
    message: 'Property prices in Salt Lake City increased by 5.2% this month',
    isRead: true,
    createdAt: '2024-12-24T11:00:00Z',
    priority: 'MEDIUM'
  },
  {
    id: '6',
    type: 'PROPERTY_VIEW',
    title: 'Property Views Milestone',
    message: 'Your property has reached 1000+ views this month',
    isRead: true,
    createdAt: '2024-12-23T18:30:00Z',
    propertyId: 'prop-1',
    propertyTitle: 'Luxury 3BHK Apartment in Salt Lake',
    priority: 'LOW'
  },
  {
    id: '7',
    type: 'SYSTEM_UPDATE',
    title: 'New Feature Available',
    message: 'Virtual property tours are now available for premium listings',
    isRead: true,
    createdAt: '2024-12-23T12:00:00Z',
    priority: 'LOW'
  }
];

const notificationIcons = {
  PROPERTY_INQUIRY: MessageSquare,
  PROPERTY_VERIFIED: CheckCheck,
  PRICE_ALERT: TrendingUp,
  LEAD_UPDATE: User,
  MARKET_UPDATE: TrendingUp,
  PROPERTY_VIEW: Eye,
  SYSTEM_UPDATE: Bell
};

const notificationColors = {
  PROPERTY_INQUIRY: 'text-blue-600 bg-blue-50',
  PROPERTY_VERIFIED: 'text-green-600 bg-green-50',
  PRICE_ALERT: 'text-orange-600 bg-orange-50',
  LEAD_UPDATE: 'text-purple-600 bg-purple-50',
  MARKET_UPDATE: 'text-indigo-600 bg-indigo-50',
  PROPERTY_VIEW: 'text-teal-600 bg-teal-50',
  SYSTEM_UPDATE: 'text-gray-600 bg-gray-50'
};

const priorityColors = {
  HIGH: 'bg-red-100 text-red-700 border-red-200',
  MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  LOW: 'bg-green-100 text-green-700 border-green-200'
};

function getTimeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString('en-IN');
}

async function NotificationsOverview() {
  const unreadCount = notificationsData.filter(n => !n.isRead).length;
  const todayCount = notificationsData.filter(n => {
    const today = new Date().toDateString();
    const notificationDate = new Date(n.createdAt).toDateString();
    return today === notificationDate;
  }).length;

  const stats = [
    {
      title: "Unread Notifications",
      value: unreadCount.toString(),
      icon: BellRing,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Today's Notifications",
      value: todayCount.toString(),
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Property Inquiries",
      value: notificationsData.filter(n => n.type === 'PROPERTY_INQUIRY').length.toString(),
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Notifications",
      value: notificationsData.length.toString(),
      icon: Bell,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-full p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function NotificationsList() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-spectron-teal" />
              All Notifications
            </CardTitle>
            <CardDescription>Stay updated with your property activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PROPERTY_INQUIRY">Property Inquiries</SelectItem>
                <SelectItem value="PROPERTY_VERIFIED">Verifications</SelectItem>
                <SelectItem value="PRICE_ALERT">Price Alerts</SelectItem>
                <SelectItem value="LEAD_UPDATE">Lead Updates</SelectItem>
                <SelectItem value="MARKET_UPDATE">Market Updates</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Link href="/dashboard/settings">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notificationsData.map((notification) => {
            const IconComponent = notificationIcons[notification.type as keyof typeof notificationIcons];
            const colorClasses = notificationColors[notification.type as keyof typeof notificationColors];
            
            return (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  notification.isRead 
                    ? 'bg-white border-gray-200' 
                    : 'bg-heritage-cream/30 border-spectron-teal/30 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Notification Icon */}
                  <div className={`rounded-full p-2 ${colorClasses}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  {/* User Avatar (if applicable) */}
                  {notification.userAvatar && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.userAvatar} />
                      <AvatarFallback>
                        {notification.userName?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium ${!notification.isRead ? 'text-spectron-teal' : ''}`}>
                            {notification.title}
                          </h4>
                          <Badge className={priorityColors[notification.priority as keyof typeof priorityColors]}>
                            {notification.priority}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-spectron-teal rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        
                        {/* Property Link (if applicable) */}
                        {notification.propertyTitle && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4 text-spectron-teal" />
                            <Link 
                              href={`/properties/${notification.propertyId}`}
                              className="text-spectron-teal hover:underline"
                            >
                              {notification.propertyTitle}
                            </Link>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{getTimeAgo(notification.createdAt)}</span>
                          {notification.userName && (
                            <span>from {notification.userName}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!notification.isRead ? (
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Mark as Read
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <BellRing className="h-4 w-4 mr-2" />
                              Mark as Unread
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 mr-2" />
                            Star Notification
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-6">
          <Button variant="outline">
            Load More Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function NotificationsPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-spectron-teal/10 p-2">
              <Bell className="h-6 w-6 text-spectron-teal" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <Badge className="mt-1 border-spectron-teal/30 bg-spectron-teal/10 text-spectron-teal">
                <BellRing className="mr-1 h-3 w-3" />
                {notificationsData.filter(n => !n.isRead).length} unread
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            Stay updated with your property activities and market trends
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard/settings">
            <Button variant="outline" className="gap-2 hover:bg-spectron-teal/10 hover:text-spectron-teal hover:border-spectron-teal">
              <Settings className="h-4 w-4" />
              Notification Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }>
        <NotificationsOverview />
      </Suspense>

      {/* Notifications List */}
      <Suspense fallback={
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      }>
        <NotificationsList />
      </Suspense>
    </div>
  );
}