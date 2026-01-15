import { useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Award,
  Settings,
  Bell,
  Shield,
  Edit,
  Camera,
  Trophy,
  Target,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import { currentUser, badges, projectGroups, deadlines } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    scheduleChanges: true,
    gradeUpdates: true,
    messageNotifications: true,
    deadlineReminders: true,
  });

  const userBadges = badges.filter(b => currentUser.badges.includes(b.id));
  const allBadges = badges;

  const handleNotificationChange = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
    toast({
      title: "Đã lưu cài đặt",
      description: "Cài đặt thông báo đã được cập nhật",
    });
  };

  const stats = [
    {
      label: "Điểm hoạt động",
      value: currentUser.activityPoints,
      icon: Trophy,
      color: "text-warning",
    },
    {
      label: "Nhóm đồ án",
      value: projectGroups.length,
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      label: "Deadline hoàn thành",
      value: deadlines.filter(d => d.status === "completed").length,
      icon: Target,
      color: "text-success",
    },
    { label: "Môn học", value: 4, icon: BookOpen, color: "text-accent" },
  ];

  const levelProgress = currentUser.activityPoints % 100;
  const currentLevel = Math.floor(currentUser.activityPoints / 100) + 1;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden animate-slide-up">
          <div className="h-32 gradient-hero" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 sm:-mt-12">
              <div className="relative">
                <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-lg">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="text-2xl">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full gradient-primary shadow-md"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                    <p className="text-muted-foreground">
                      {currentUser.studentId} • {currentUser.faculty}
                    </p>
                  </div>
                  <Button variant="outline" className="self-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    {currentLevel}
                  </div>
                  <div>
                    <p className="font-medium">Level {currentLevel}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.activityPoints} điểm hoạt động
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {100 - levelProgress} điểm nữa để lên level
                </span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {userBadges.map(badge => (
                <div
                  key={badge.id}
                  className={`${badge.color} rounded-full px-3 py-1.5 text-sm font-medium text-primary-foreground flex items-center gap-1.5 shadow-md`}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="animate-slide-up"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="info"
          className="animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <TabsList className="w-full justify-start">
            <TabsTrigger value="info" className="gap-2">
              <User className="h-4 w-4" />
              Thông tin
            </TabsTrigger>
            <TabsTrigger value="badges" className="gap-2">
              <Award className="h-4 w-4" />
              Danh hiệu
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Cài đặt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Họ và tên
                        </p>
                        <p className="font-medium">{currentUser.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Mã sinh viên
                        </p>
                        <p className="font-medium">{currentUser.studentId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Khoa</p>
                        <p className="font-medium">{currentUser.faculty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Năm học</p>
                        <p className="font-medium">{currentUser.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <Trophy className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          GPA Tích lũy
                        </p>
                        <p className="font-medium">
                          {currentUser.gpa.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Danh hiệu & Huy hiệu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allBadges.map((badge, index) => {
                    const isUnlocked = currentUser.badges.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isUnlocked
                            ? "bg-card shadow-card-hover"
                            : "bg-muted/30 opacity-60"
                        } animate-fade-in`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-12 w-12 rounded-xl ${
                              isUnlocked ? badge.color : "bg-muted"
                            } flex items-center justify-center text-2xl`}
                          >
                            {badge.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{badge.name}</h4>
                              {isUnlocked && (
                                <Badge variant="secondary" className="text-xs">
                                  Đã mở khóa
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6 space-y-6">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Cài đặt thông báo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "pushNotifications",
                    label: "Thông báo đẩy",
                    desc: "Nhận thông báo trên thiết bị",
                  },
                  {
                    key: "emailNotifications",
                    label: "Thông báo email",
                    desc: "Nhận email khi có cập nhật quan trọng",
                  },
                  {
                    key: "scheduleChanges",
                    label: "Thay đổi lịch học",
                    desc: "Thông báo khi có thay đổi lịch học, phòng học",
                  },
                  {
                    key: "gradeUpdates",
                    label: "Cập nhật điểm",
                    desc: "Thông báo khi có điểm mới",
                  },
                  {
                    key: "messageNotifications",
                    label: "Tin nhắn mới",
                    desc: "Thông báo khi có tin nhắn từ nhóm/kênh",
                  },
                  {
                    key: "deadlineReminders",
                    label: "Nhắc deadline",
                    desc: "Nhắc nhở trước khi deadline đến hạn",
                  },
                ].map(setting => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                  >
                    <div>
                      <Label
                        htmlFor={setting.key}
                        className="font-medium cursor-pointer"
                      >
                        {setting.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {setting.desc}
                      </p>
                    </div>
                    <Switch
                      id={setting.key}
                      checked={
                        notificationSettings[
                          setting.key as keyof typeof notificationSettings
                        ]
                      }
                      onCheckedChange={() =>
                        handleNotificationChange(setting.key)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Bảo mật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Đổi mật khẩu
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Xác thực 2 lớp
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  Đăng xuất tất cả thiết bị
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
