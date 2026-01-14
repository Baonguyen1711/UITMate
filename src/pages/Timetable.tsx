import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";
import { weeklyTimetable, deadlines, courses } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Timetable() {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState(0);
  const [deadlineList, setDeadlineList] = useState(deadlines);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDeadline, setNewDeadline] = useState({
    title: "",
    course: "",
    dueDate: "",
    priority: "medium",
    description: "",
  });

  const today = new Date();
  const currentWeek = `Tuần ${Math.ceil(today.getDate() / 7)} - Tháng ${
    today.getMonth() + 1
  }`;

  const handleAddDeadline = () => {
    if (!newDeadline.title || !newDeadline.dueDate) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    const deadline = {
      id: `d${Date.now()}`,
      title: newDeadline.title,
      course: newDeadline.course || "Cá nhân",
      dueDate: newDeadline.dueDate,
      status: "pending",
      priority: newDeadline.priority,
      description: newDeadline.description || "",
      subtasks: [] as { id: string; title: string; completed: boolean }[],
    };

    setDeadlineList([...deadlineList, deadline]);
    setNewDeadline({
      title: "",
      course: "",
      dueDate: "",
      priority: "medium",
      description: "",
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Thành công",
      description: "Đã thêm deadline mới",
    });
  };

  const toggleDeadlineStatus = (id: string) => {
    setDeadlineList(
      deadlineList.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "completed" ? "pending" : "completed" }
          : d
      )
    );
  };

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return (
          <Badge
            variant="secondary"
            className="bg-warning text-warning-foreground"
          >
            Trung bình
          </Badge>
        );
      default:
        return <Badge variant="outline">Thấp</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="animate-slide-up">
            <h1 className="text-2xl md:text-3xl font-bold">
              Thời khóa biểu & Deadline
            </h1>
            <p className="text-muted-foreground">
              {currentWeek}, {today.getFullYear()}
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="gradient-primary animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm deadline
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm deadline mới</DialogTitle>
                <DialogDescription>
                  Tạo deadline cá nhân hoặc cho môn học
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="VD: Nộp bài tập Lab 5"
                    value={newDeadline.title}
                    onChange={(e) =>
                      setNewDeadline({ ...newDeadline, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Môn học</Label>
                  <Select
                    value={newDeadline.course}
                    onValueChange={(value) =>
                      setNewDeadline({ ...newDeadline, course: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn môn học (tùy chọn)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Cá nhân</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.code}>
                          {course.code} - {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Hạn nộp</Label>
                    <Input
                      id="dueDate"
                      type="datetime-local"
                      value={newDeadline.dueDate}
                      onChange={(e) =>
                        setNewDeadline({
                          ...newDeadline,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Độ ưu tiên</Label>
                    <Select
                      value={newDeadline.priority}
                      onValueChange={(value) =>
                        setNewDeadline({ ...newDeadline, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Cao</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                        <SelectItem value="low">Thấp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Ghi chú</Label>
                  <Textarea
                    id="description"
                    placeholder="Thêm ghi chú..."
                    value={newDeadline.description}
                    onChange={(e) =>
                      setNewDeadline({
                        ...newDeadline,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleAddDeadline}
                  className="gradient-primary"
                >
                  Thêm deadline
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="timetable" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="timetable" className="gap-2">
              <Calendar className="h-4 w-4" />
              Thời khóa biểu
            </TabsTrigger>
            <TabsTrigger value="deadlines" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Deadline
              <Badge variant="secondary" className="ml-1">
                {deadlineList.filter((d) => d.status === "pending").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timetable">
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">{currentWeek}</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Weekly Grid */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weeklyTimetable.map((day, index) => (
                <Card
                  key={day.day}
                  className={`cursor-pointer transition-all hover:shadow-card-hover animate-slide-up ${
                    index === selectedDay ? "ring-2 ring-primary" : ""
                  } ${day.classes.length === 0 ? "opacity-60" : ""}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedDay(index)}
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {day.day}
                      <span className="block text-xs text-muted-foreground">
                        {day.date}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {day.classes.length > 0 ? (
                      <div className="space-y-2">
                        {day.classes.map((cls, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-primary/10 text-xs"
                          >
                            <p className="font-medium text-primary truncate">
                              {cls.subject}
                            </p>
                            <p className="text-muted-foreground">{cls.time}</p>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {cls.room}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        Không có lịch
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Day Detail */}
            {weeklyTimetable[selectedDay].classes.length > 0 && (
              <Card className="mt-6 animate-fade-in">
                <CardHeader>
                  <CardTitle>
                    Chi tiết {weeklyTimetable[selectedDay].day} -{" "}
                    {weeklyTimetable[selectedDay].date}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyTimetable[selectedDay].classes.map((cls, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                        {cls.code}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{cls.subject}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {cls.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {cls.room}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="deadlines">
            <div className="grid gap-4">
              {deadlineList.map((deadline, index) => (
                <Card
                  key={deadline.id}
                  className={`animate-slide-up transition-all hover:shadow-card-hover ${
                    deadline.status === "completed" ? "opacity-60" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={() => toggleDeadlineStatus(deadline.id)}
                      >
                        {deadline.status === "completed" ? (
                          <CheckCircle2 className="h-6 w-6 text-success" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </Button>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-semibold ${
                            deadline.status === "completed"
                              ? "line-through"
                              : ""
                          }`}
                        >
                          {deadline.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {deadline.course}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getPriorityBadge(deadline.priority)}
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          {formatDeadline(deadline.dueDate)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
