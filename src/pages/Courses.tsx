import { useState, useMemo } from "react";
import {
  BookOpen,
  Clock,
  MapPin,
  User,
  Mail,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Calendar,
  AlertTriangle,
  MessageSquare,
  ExternalLink,
  Bell,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/layout/AppLayout";
import {
  courses,
  projectGroups,
  deadlines,
  notifications,
  weeklyTimetable,
  grades,
} from "@/data/mockData";

// Available semesters
const availableSemesters = [
  { value: "HK1 2023-2024", label: "Học kỳ 1 (2023-2024)" },
  { value: "HK2 2023-2024", label: "Học kỳ 2 (2023-2024)" },
  { value: "HK1 2024-2025", label: "Học kỳ 1 (2024-2025)" },
  { value: "HK2 2024-2025", label: "Học kỳ 2 (2024-2025)" },
  { value: "HK1 2025-2026", label: "Học kỳ 1 (2025-2026)" },
  { value: "HK2 2025-2026", label: "Học kỳ 2 (2025-2026)" },
];

export default function Courses() {
  const [expandedCourses, setExpandedCourses] = useState<string[]>(
    courses.map((c) => c.id)
  );
  const [selectedSemester, setSelectedSemester] =
    useState<string>("HK1 2023-2024");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getCourseDeadlines = (courseCode: string) => {
    const now = new Date().getTime();

    // Only show upcoming deadlines (not overdue)
    const courseDeadlines = deadlines.filter((d) => {
      if (d.course !== courseCode) return false;
      const deadlineDate = new Date(d.dueDate).getTime();
      return deadlineDate >= now; // Only future deadlines
    });

    // Sort by time (soonest first)
    return courseDeadlines.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB; // Earlier date first (sooner deadline)
    });
  };

  const getCourseGroups = (courseCode: string) => {
    return projectGroups.filter((g) => g.courseCode === courseCode);
  };

  const getCourseNotifications = (courseCode: string) => {
    return notifications.filter(
      (n) =>
        n.message.toLowerCase().includes(courseCode.toLowerCase()) ||
        courses.find(
          (c) =>
            c.code === courseCode &&
            n.message.toLowerCase().includes(c.name.toLowerCase())
        )
    );
  };

  const getCourseGrade = (courseCode: string) => {
    const currentSemester = grades.find((g) => g.semester === "HK1 2023-2024");
    if (!currentSemester) return null;
    return currentSemester.courses.find((c) => c.code === courseCode) || null;
  };

  const getCourseSchedule = (courseCode: string) => {
    const schedules: {
      day: string;
      date: string;
      time: string;
      room: string;
    }[] = [];
    weeklyTimetable.forEach((day) => {
      day.classes.forEach((cls) => {
        if (cls.code === courseCode) {
          schedules.push({
            day: day.day,
            date: day.date,
            time: cls.time,
            room: cls.room,
          });
        }
      });
    });
    return schedules;
  };

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 0) return { text: "Quá hạn!", urgent: true };
    if (hours < 24) return { text: `${hours} giờ`, urgent: true };
    if (days === 1) return { text: "Ngày mai", urgent: true };
    if (days < 3) return { text: `${days} ngày`, urgent: true };
    if (days < 7) return { text: `${days} ngày`, urgent: false };
    return {
      text: date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      }),
      urgent: false,
    };
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Filter courses based on search and semester
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.teacher.toLowerCase().includes(query)
      );
    }

    // Note: In a real app, you would filter by semester from API
    // For now, we'll just show all courses when semester changes
    // You can add semester property to courses data later

    return filtered;
  }, [searchQuery, selectedSemester]);

  const totalDeadlines = filteredCourses.reduce(
    (acc, c) => acc + getCourseDeadlines(c.code).length,
    0
  );
  const totalGroups = filteredCourses.reduce(
    (acc, c) => acc + getCourseGroups(c.code).length,
    0
  );

  const selectedSemesterLabel =
    availableSemesters.find((s) => s.value === selectedSemester)?.label ||
    selectedSemester;

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Header with Summary Stats */}
        <div className="animate-slide-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Môn học của tôi
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedSemesterLabel}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm">
                <BookOpen className="h-3 w-3 mr-1" />
                {filteredCourses.length} môn học
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                {totalDeadlines} deadline
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Users className="h-3 w-3 mr-1" />
                {totalGroups} nhóm đồ án
              </Badge>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="space-y-3 animate-slide-up">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm môn học, mã môn, giảng viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Semester Filter - Display as visible list */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Chọn học kỳ:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableSemesters.map((semester) => (
                <Button
                  key={semester.value}
                  variant={
                    selectedSemester === semester.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedSemester(semester.value)}
                  className={
                    selectedSemester === semester.value
                      ? "gradient-primary"
                      : "hover:bg-muted"
                  }
                >
                  {semester.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses List with Inline Details */}
        {filteredCourses.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <BookOpen className="h-12 w-12 text-muted-foreground opacity-50" />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Không tìm thấy môn học
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? `Không có môn học nào khớp với "${searchQuery}"`
                    : `Không có môn học nào trong ${selectedSemesterLabel}`}
                </p>
              </div>
              {(searchQuery || selectedSemester !== "HK1 2023-2024") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSemester("HK1 2023-2024");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course, index) => {
              const courseDeadlines = getCourseDeadlines(course.code);
              const courseGroups = getCourseGroups(course.code);
              const courseSchedules = getCourseSchedule(course.code);
              const urgentDeadlines = courseDeadlines.filter(
                (d) => formatDeadline(d.dueDate).urgent
              );
              const isExpanded = expandedCourses.includes(course.id);

              return (
                <Card
                  key={course.id}
                  className="overflow-hidden animate-slide-up hover:shadow-card-hover transition-all"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Color Strip */}
                  <div className={`h-1.5 bg-gradient-to-r ${course.color}`} />

                  {/* Course Header - Always Visible */}
                  <Collapsible
                    open={isExpanded}
                    onOpenChange={() => toggleCourse(course.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="py-4 cursor-pointer hover:bg-muted/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            {/* Course Icon */}
                            <div
                              className={`h-12 w-12 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center text-primary-foreground flex-shrink-0`}
                            >
                              <BookOpen className="h-6 w-6" />
                            </div>

                            {/* Course Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge
                                  variant="outline"
                                  className="font-mono text-xs"
                                >
                                  {course.code}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {course.credits} tín chỉ
                                </Badge>
                                {urgentDeadlines.length > 0 && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs animate-pulse"
                                  >
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {urgentDeadlines.length} deadline gấp
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-bold text-lg mt-1 truncate">
                                {course.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1.5">
                                <div className="flex items-center gap-1.5">
                                  <User className="h-3.5 w-3.5 text-primary" />
                                  <span className="text-sm font-medium text-foreground">
                                    {course.teacher}
                                  </span>
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 hover:bg-primary/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle email action
                                  }}
                                  title="Email giảng viên"
                                >
                                  <Mail className="h-8 w-8 text-primary" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Right Side - Progress & Toggle */}
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="text-right hidden sm:block">
                              <span className="text-2xl font-bold text-primary">
                                {course.progress}%
                              </span>
                              <p className="text-xs text-muted-foreground">
                                tiến độ
                              </p>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <Progress
                          value={course.progress}
                          className="h-2 mt-3"
                        />
                      </CardHeader>
                    </CollapsibleTrigger>

                    {/* Expanded Content */}
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-4">
                        {/* Main Content Grid - Ordered by Importance */}
                        {/* Top Row: Deadlines (Most Important) & Schedule */}
                        <div className="grid md:grid-cols-5 gap-4 mb-4">
                          {/* Deadlines - Most Important, Takes 2/5 of space (40%) */}
                          <div className="md:col-span-2 p-4 rounded-xl bg-muted/50 border border-border/50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-destructive" />
                                Deadline ({courseDeadlines.length})
                              </h4>
                              {courseDeadlines.length > 0 && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 hover:bg-destructive/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle view all deadlines action
                                  }}
                                  title="Xem chi tiết"
                                >
                                  <ExternalLink className="h-4.5 w-4.5 text-destructive" />
                                </Button>
                              )}
                            </div>
                            {courseDeadlines.length > 0 ? (
                              <div className="space-y-2">
                                {courseDeadlines.map((deadline, index) => {
                                  const timeInfo = formatDeadline(
                                    deadline.dueDate
                                  );
                                  const isMostUrgent = index === 0; // First item is most urgent (soonest)

                                  return (
                                    <div
                                      key={deadline.id}
                                      className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                        isMostUrgent
                                          ? "bg-warning/20 border-2 border-warning/50 hover:bg-warning/25 shadow-sm"
                                          : "text-sm hover:bg-background/50"
                                      }`}
                                    >
                                      <span
                                        className={`truncate flex-1 mr-2 ${
                                          isMostUrgent
                                            ? "font-bold text-base text-foreground"
                                            : "text-sm"
                                        }`}
                                      >
                                        {deadline.title}
                                      </span>
                                      <Badge
                                        variant={
                                          timeInfo.urgent
                                            ? "destructive"
                                            : "secondary"
                                        }
                                        className={`flex-shrink-0 ${
                                          isMostUrgent
                                            ? "text-sm font-bold px-2.5 py-1"
                                            : "text-xs"
                                        } ${
                                          timeInfo.urgent ? "animate-pulse" : ""
                                        }`}
                                      >
                                        {timeInfo.text}
                                      </Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                Không có deadline
                              </div>
                            )}
                          </div>

                          {/* Schedule - Takes 3/5 of space (60%) */}
                          <div className="md:col-span-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                Lịch học tuần này
                              </h4>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:bg-primary/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle view documents action
                                }}
                                title="Tài liệu"
                              >
                                <FileText className="h-4.5 w-4.5 text-primary" />
                              </Button>
                            </div>
                            {courseSchedules.length > 0 ? (
                              <div className="space-y-2">
                                {courseSchedules.map((schedule, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-background/50 transition-colors"
                                  >
                                    <span className="text-muted-foreground font-medium">
                                      {schedule.day} ({schedule.date})
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-primary">
                                        {schedule.time.split(" - ")[0]}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {schedule.room}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                Không có lịch tuần này
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Bottom Row: Notifications, Grades, Groups (Ordered by importance) */}
                        <div className="grid md:grid-cols-3 gap-4">
                          {/* Course Notifications - Second most important */}
                          <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Bell className="h-4 w-4 text-warning" />
                                Thông báo môn (
                                {getCourseNotifications(course.code).length})
                              </h4>
                              {getCourseNotifications(course.code).length >
                                0 && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 hover:bg-warning/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle view all notifications action
                                  }}
                                  title="Xem chi tiết"
                                >
                                  <ExternalLink className="h-4.5 w-4.5 text-warning" />
                                </Button>
                              )}
                            </div>
                            {getCourseNotifications(course.code).length > 0 ? (
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {getCourseNotifications(course.code)
                                  .slice(0, 3)
                                  .map((notif) => (
                                    <div
                                      key={notif.id}
                                      className="p-2 rounded-lg hover:bg-background/50 transition-colors border-l-2 border-warning/50 bg-background/30"
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-medium truncate">
                                            {notif.title}
                                          </p>
                                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                            {notif.message}
                                          </p>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            {notif.time}
                                          </p>
                                        </div>
                                        {!notif.read && (
                                          <span className="h-2 w-2 rounded-full bg-warning flex-shrink-0 mt-1" />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                Không có thông báo
                              </div>
                            )}
                          </div>

                          {/* Project Groups */}
                          <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Users className="h-4 w-4 text-success" />
                                Nhóm đồ án
                              </h4>
                              {courseGroups.length > 0 && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 hover:bg-success/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle view all groups action
                                  }}
                                  title="Xem chi tiết"
                                >
                                  <ExternalLink className="h-4.5 w-4.5 text-success" />
                                </Button>
                              )}
                            </div>
                            {courseGroups.length > 0 ? (
                              <div className="space-y-3">
                                {courseGroups.map((group) => (
                                  <div
                                    key={group.id}
                                    className="space-y-2 p-2 rounded-lg hover:bg-background/50 transition-colors"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-sm truncate">
                                        {group.name}
                                      </span>
                                      {group.unreadCount > 0 && (
                                        <Badge
                                          variant="destructive"
                                          className="text-xs"
                                        >
                                          {group.unreadCount}
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="flex -space-x-2">
                                        {group.members
                                          .slice(0, 4)
                                          .map((member, i) => (
                                            <Avatar
                                              key={i}
                                              className="h-6 w-6 border-2 border-background"
                                            >
                                              <AvatarImage
                                                src={member.avatar}
                                              />
                                              <AvatarFallback className="text-xs">
                                                {member.name.charAt(0)}
                                              </AvatarFallback>
                                            </Avatar>
                                          ))}
                                      </div>
                                      <span className="text-xs text-muted-foreground">
                                        {group.members.length} thành viên
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                      💬 {group.lastMessage}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground mb-2">
                                  Chưa có nhóm
                                </p>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Users className="h-3 w-3 mr-1" />
                                  Tạo nhóm
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Grades Section */}
                          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                Điểm số
                              </h4>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:bg-primary/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle view grades action
                                }}
                                title="Xem chi tiết"
                              >
                                <ExternalLink className="h-4.5 w-4.5 text-primary" />
                              </Button>
                            </div>
                            {(() => {
                              const courseGrade = getCourseGrade(course.code);
                              if (courseGrade) {
                                const hasFinal =
                                  courseGrade.final !== null &&
                                  courseGrade.final !== undefined;
                                const hasTotal =
                                  courseGrade.total !== null &&
                                  courseGrade.total !== undefined;

                                return (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">
                                        Giữa kỳ
                                      </span>
                                      <span className="font-bold text-lg text-primary">
                                        {courseGrade.midterm}
                                      </span>
                                    </div>
                                    {hasFinal ? (
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                          Cuối kỳ
                                        </span>
                                        <span className="font-bold text-lg text-primary">
                                          {courseGrade.final}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                          Cuối kỳ
                                        </span>
                                        <span className="text-xs text-muted-foreground italic">
                                          Chưa có
                                        </span>
                                      </div>
                                    )}
                                    {hasTotal ? (
                                      <div className="pt-2 border-t border-primary/20">
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs font-medium">
                                            Tổng kết
                                          </span>
                                          <div className="flex items-center gap-2">
                                            <span className="font-bold text-xl text-primary">
                                              {courseGrade.total}
                                            </span>
                                            {courseGrade.letterGrade && (
                                              <Badge
                                                variant="default"
                                                className="bg-primary text-primary-foreground"
                                              >
                                                {courseGrade.letterGrade}
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="pt-2 border-t border-primary/20">
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs font-medium">
                                            Tổng kết
                                          </span>
                                          <span className="text-xs text-muted-foreground italic">
                                            Chưa có
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                              return (
                                <div className="text-center py-2">
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Chưa có điểm
                                  </p>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Xem điểm chi tiết
                                  </Button>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
