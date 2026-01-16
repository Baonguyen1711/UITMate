import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  BookOpen,
  MessageSquare,
  Trophy,
  ChevronDown,
  ChevronUp,
  Timer,
  AlertTriangle,
  ExternalLink,
  Users,
  ListTodo,
  Circle,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import AppLayout from "@/components/layout/AppLayout";
import { 
  currentUser, 
  todaySchedule, 
  deadlines, 
  courses,
  badges,
  weeklyTimetable,
  projectGroups
} from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [completedDeadlines, setCompletedDeadlines] = useState<string[]>([]);
  const [expandedSchedule, setExpandedSchedule] = useState(true);
  const [expandedDeadlines, setExpandedDeadlines] = useState(true);
  const [expandedDeadlineId, setExpandedDeadlineId] = useState<string | null>(null);
  const [completedSubtasks, setCompletedSubtasks] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-success text-success-foreground animate-pulse";
      case "upcoming": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ongoing": return "ĐANG HỌC";
      case "upcoming": return "Sắp tới";
      default: return status;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high": return {
        border: "border-l-destructive",
        badge: "destructive" as const,
        icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
        text: "text-destructive"
      };
      case "medium": return {
        border: "border-l-warning",
        badge: "secondary" as const,
        icon: <Timer className="h-4 w-4 text-warning" />,
        text: "text-warning"
      };
      default: return {
        border: "border-l-muted-foreground",
        badge: "outline" as const,
        icon: <Clock className="h-4 w-4 text-muted-foreground" />,
        text: "text-muted-foreground"
      };
    }
  };

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 0) return { text: "Quá hạn!", urgent: true };
    if (hours < 24) return { text: `${hours} giờ nữa`, urgent: true };
    if (days === 1) return { text: "Ngày mai", urgent: true };
    if (days < 3) return { text: `${days} ngày nữa`, urgent: true };
    if (days < 7) return { text: `${days} ngày nữa`, urgent: false };
    return { text: date.toLocaleDateString("vi-VN"), urgent: false };
  };

  const toggleDeadline = (id: string) => {
    setCompletedDeadlines(prev => {
      if (prev.includes(id)) {
        return prev.filter(d => d !== id);
      } else {
        toast({
          title: "✅ Hoàn thành!",
          description: "Deadline đã được đánh dấu hoàn thành",
        });
        return [...prev, id];
      }
    });
  };

  const userBadges = badges.filter(b => currentUser.badges.includes(b.id));
  const pendingDeadlines = deadlines.filter(d => !completedDeadlines.includes(d.id));
  const urgentDeadlines = pendingDeadlines.filter(d => {
    const deadline = formatDeadline(d.dueDate);
    return deadline.urgent;
  });

  // Get tomorrow's schedule
  const tomorrow = weeklyTimetable[1];

  // Get active project groups with unread messages
  const activeGroups = projectGroups.filter(g => g.unreadCount > 0);

  // Calculate subtask progress for a deadline
  const getDeadlineProgress = (deadline: typeof deadlines[0]) => {
    if (!deadline.subtasks || deadline.subtasks.length === 0) return 0;
    const completedCount = deadline.subtasks.filter(st => 
      st.completed || completedSubtasks.includes(st.id)
    ).length;
    return Math.round((completedCount / deadline.subtasks.length) * 100);
  };

  const toggleSubtask = (subtaskId: string) => {
    setCompletedSubtasks(prev => 
      prev.includes(subtaskId) 
        ? prev.filter(id => id !== subtaskId)
        : [...prev, subtaskId]
    );
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Compact Welcome + Quick Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 animate-slide-up">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              Xin chào, {currentUser.name.split(" ").pop()}! 
              <span className="text-2xl">👋</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {urgentDeadlines.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {urgentDeadlines.length} deadline cần chú ý
                </Badge>
              )}
              {activeGroups.length > 0 && (
                <Badge variant="outline">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {activeGroups.reduce((acc, g) => acc + g.unreadCount, 0)} tin nhắn
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {userBadges.slice(0, 3).map((badge) => (
              <div 
                key={badge.id} 
                className={`${badge.color} rounded-full px-2 py-1 text-xs font-medium text-primary-foreground flex items-center gap-1 shadow-md`}
              >
                <span>{badge.icon}</span>
                <span className="hidden sm:inline">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Stats Row */}
        <div className="grid grid-cols-4 gap-2 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          {[
            { label: "GPA", value: currentUser.gpa.toFixed(2), icon: Trophy, color: "text-warning" },
            { label: "Môn học", value: courses.length, icon: BookOpen, color: "text-primary" },
            { label: "Deadline", value: pendingDeadlines.length, icon: Calendar, color: "text-destructive" },
            { label: "Tin nhắn", value: activeGroups.reduce((acc, g) => acc + g.unreadCount, 0), icon: MessageSquare, color: "text-success" },
          ].map((stat) => (
            <Card key={stat.label} className="hover:shadow-sm transition-all">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Left Column - Schedule & Deadlines (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Today's Schedule - Full Detail */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader 
                className="py-3 cursor-pointer hover:bg-muted/50 rounded-t-lg transition-colors"
                onClick={() => setExpandedSchedule(!expandedSchedule)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Lịch hôm nay
                    <Badge variant="outline" className="ml-2">
                      {todaySchedule.length} buổi học
                    </Badge>
                  </CardTitle>
                  {expandedSchedule ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              {expandedSchedule && (
                <CardContent className="pt-0 space-y-3">
                  {todaySchedule.length > 0 ? (
                    todaySchedule.map((schedule, index) => (
                      <div 
                        key={schedule.id}
                        className={`flex items-stretch gap-3 p-3 rounded-xl transition-all animate-fade-in ${
                          schedule.status === "ongoing" 
                            ? "bg-success/10 border border-success/30 shadow-sm" 
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Time Column */}
                        <div className="flex flex-col items-center justify-center min-w-[80px] border-r pr-3">
                          <span className={`text-lg font-bold ${schedule.status === "ongoing" ? "text-success" : ""}`}>
                            {schedule.time.split(" - ")[0]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {schedule.time.split(" - ")[1]}
                          </span>
                        </div>
                        
                        {/* Info Column */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={getStatusColor(schedule.status)}>
                              {getStatusLabel(schedule.status)}
                            </Badge>
                            <Badge variant="outline" className="font-mono text-xs">
                              {schedule.code}
                            </Badge>
                          </div>
                          <h4 className="font-semibold mt-1 truncate">{schedule.subject}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Phòng {schedule.room}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{schedule.teacher}</span>
                          </div>
                        </div>

                        {/* Action */}
                        {schedule.status === "ongoing" && (
                          <div className="flex items-center">
                            <Button size="sm" variant="outline" className="text-success border-success">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Chi tiết
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>Không có lịch học hôm nay</p>
                    </div>
                  )}

                  {/* Tomorrow Preview */}
                  {tomorrow && tomorrow.classes.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        📅 Ngày mai ({tomorrow.day}, {tomorrow.date}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tomorrow.classes.map((cls, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {cls.time.split(" - ")[0]} - {cls.subject} ({cls.room})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>

            {/* Deadlines - Detailed with Subtasks */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <CardHeader 
                className="py-3 cursor-pointer hover:bg-muted/50 rounded-t-lg transition-colors"
                onClick={() => setExpandedDeadlines(!expandedDeadlines)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ListTodo className="h-5 w-5 text-destructive" />
                    Deadline & Công việc cần làm
                    {urgentDeadlines.length > 0 && (
                      <Badge variant="destructive" className="animate-pulse">
                        {urgentDeadlines.length} cần làm gấp
                      </Badge>
                    )}
                  </CardTitle>
                  {expandedDeadlines ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              {expandedDeadlines && (
                <CardContent className="pt-0 space-y-3">
                  {deadlines.map((deadline, index) => {
                    const isCompleted = completedDeadlines.includes(deadline.id);
                    const priority = getPriorityStyles(deadline.priority);
                    const timeInfo = formatDeadline(deadline.dueDate);
                    const course = courses.find(c => c.code === deadline.course);
                    const progress = getDeadlineProgress(deadline);
                    const isExpanded = expandedDeadlineId === deadline.id;
                    
                    return (
                      <div 
                        key={deadline.id}
                        className={`rounded-xl border-l-4 transition-all animate-fade-in overflow-hidden ${
                          isCompleted 
                            ? "bg-muted/30 opacity-60 border-l-muted-foreground" 
                            : `bg-muted/50 ${priority.border}`
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Main deadline row */}
                        <div 
                          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => setExpandedDeadlineId(isExpanded ? null : deadline.id)}
                        >
                          <Checkbox 
                            checked={isCompleted}
                            onCheckedChange={() => toggleDeadline(deadline.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-5 w-5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className={`font-medium text-sm ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                                {deadline.title}
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {deadline.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Badge variant="outline" className="text-xs py-0">
                                {deadline.course}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{course?.name}</span>
                            </div>
                            {/* Progress bar */}
                            {!isCompleted && deadline.subtasks && deadline.subtasks.length > 0 && (
                              <div className="flex items-center gap-2 mt-2">
                                <Progress value={progress} className="h-1.5 flex-1" />
                                <span className="text-xs font-medium text-muted-foreground">
                                  {progress}%
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            {!isCompleted && priority.icon}
                            <Badge 
                              variant={isCompleted ? "outline" : (timeInfo.urgent ? "destructive" : "secondary")}
                              className={`${timeInfo.urgent && !isCompleted ? "animate-pulse" : ""}`}
                            >
                              {isCompleted ? "✓ Xong" : timeInfo.text}
                            </Badge>
                            {!isCompleted && deadline.subtasks && (
                              <span className="text-xs text-muted-foreground">
                                {deadline.subtasks.filter(st => st.completed || completedSubtasks.includes(st.id)).length}/{deadline.subtasks.length} việc
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expanded subtasks */}
                        {isExpanded && !isCompleted && deadline.subtasks && deadline.subtasks.length > 0 && (
                          <div className="border-t bg-background/50 p-3 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              📋 Công việc cần hoàn thành:
                            </p>
                            {deadline.subtasks.map((subtask) => {
                              const isSubtaskDone = subtask.completed || completedSubtasks.includes(subtask.id);
                              return (
                                <div 
                                  key={subtask.id}
                                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                    isSubtaskDone ? "bg-success/10" : "bg-muted/50 hover:bg-muted"
                                  }`}
                                >
                                  <button
                                    onClick={() => toggleSubtask(subtask.id)}
                                    className="flex-shrink-0"
                                  >
                                    {isSubtaskDone ? (
                                      <CheckCircle className="h-4 w-4 text-success" />
                                    ) : (
                                      <Circle className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </button>
                                  <span className={`text-sm ${isSubtaskDone ? "line-through text-muted-foreground" : ""}`}>
                                    {subtask.title}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Summary */}
                  <div className="flex items-center justify-between pt-2 text-sm border-t">
                    <span className="text-muted-foreground">
                      Hoàn thành: {completedDeadlines.length}/{deadlines.length} deadline
                    </span>
                    <Link to="/timetable">
                      <Button variant="ghost" size="sm" className="text-primary">
                        Quản lý deadline →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Right Column - Groups & Course Progress (2 cols) */}
          <div className="lg:col-span-2 space-y-4">

            {/* Project Groups Quick Access */}
            {activeGroups.length > 0 && (
              <Card className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
                <CardHeader className="py-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-5 w-5 text-success" />
                    Nhóm đồ án
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {activeGroups.map((group) => (
                    <div 
                      key={group.id}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{group.name}</h4>
                        <Badge variant="destructive" className="text-xs">
                          {group.unreadCount}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {group.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {group.lastMessageTime}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quick Course Progress */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="py-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Tiến độ môn học
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {courses.map((course, index) => (
                  <div 
                    key={course.id}
                    className="space-y-1.5 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${course.color}`} />
                        <span className="font-medium truncate">{course.code}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                ))}
                <Link to="/courses" className="block">
                  <Button variant="ghost" size="sm" className="w-full text-primary mt-2">
                    Xem chi tiết môn học →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
