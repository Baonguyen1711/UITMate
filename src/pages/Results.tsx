import { useState } from "react";
import { 
  Trophy, 
  TrendingUp, 
  BookOpen,
  Award,
  Target,
  ChevronDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import AppLayout from "@/components/layout/AppLayout";
import { grades, gpaProgression, currentUser, deadlines } from "@/data/mockData";

export default function Results() {
  const [openSemesters, setOpenSemesters] = useState<string[]>([grades[0].semester]);

  const toggleSemester = (semester: string) => {
    setOpenSemesters(prev => 
      prev.includes(semester) 
        ? prev.filter(s => s !== semester)
        : [...prev, semester]
    );
  };

  const totalCredits = grades.reduce((acc, sem) => 
    acc + sem.courses.reduce((sum, c) => sum + c.credits, 0), 0
  );

  const completedDeadlines = deadlines.filter(d => d.status === "completed").length;
  const deadlineRate = Math.round((completedDeadlines / deadlines.length) * 100);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-success";
    if (grade.startsWith("B")) return "text-primary";
    if (grade.startsWith("C")) return "text-warning";
    return "text-destructive";
  };

  const skillData = [
    { subject: "Lập trình", A: 85 },
    { subject: "Database", A: 78 },
    { subject: "AI/ML", A: 70 },
    { subject: "Networking", A: 65 },
    { subject: "Math", A: 80 },
    { subject: "Soft Skills", A: 75 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-slide-up">
          <h1 className="text-2xl md:text-3xl font-bold">Kết quả học tập</h1>
          <p className="text-muted-foreground">Theo dõi thành tích và tiến bộ của bạn</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              label: "GPA Tích lũy", 
              value: currentUser.gpa.toFixed(2), 
              icon: Trophy, 
              color: "text-warning",
              bgColor: "bg-warning/10" 
            },
            { 
              label: "Tín chỉ", 
              value: totalCredits, 
              icon: BookOpen, 
              color: "text-primary",
              bgColor: "bg-primary/10" 
            },
            { 
              label: "Hoàn thành DL", 
              value: `${deadlineRate}%`, 
              icon: Target, 
              color: "text-success",
              bgColor: "bg-success/10" 
            },
            { 
              label: "Điểm hoạt động", 
              value: currentUser.activityPoints, 
              icon: Award, 
              color: "text-accent",
              bgColor: "bg-accent/10" 
            },
          ].map((stat, index) => (
            <Card 
              key={stat.label} 
              className="animate-slide-up hover:shadow-card-hover transition-all"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <CardContent className="p-4">
                <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* GPA Chart */}
          <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Biểu đồ GPA theo học kỳ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gpaProgression}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="semester" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      domain={[2.5, 4]} 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="gpa" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: 'hsl(var(--accent))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Skills Radar */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Năng lực
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillData}>
                    <PolarGrid className="stroke-muted" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Radar
                      name="Điểm"
                      dataKey="A"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Semester Grades */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Bảng điểm theo học kỳ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {grades.map((semester, index) => (
              <Collapsible 
                key={semester.semester}
                open={openSemesters.includes(semester.semester)}
                onOpenChange={() => toggleSemester(semester.semester)}
              >
                <CollapsibleTrigger asChild>
                  <div 
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted cursor-pointer transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                        {semester.gpa.toFixed(1)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{semester.semester}</h3>
                        <p className="text-sm text-muted-foreground">
                          {semester.courses.length} môn học • {semester.courses.reduce((sum, c) => sum + c.credits, 0)} tín chỉ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="hidden sm:flex">
                        GPA: {semester.gpa.toFixed(2)}
                      </Badge>
                      <ChevronDown className={`h-5 w-5 transition-transform ${
                        openSemesters.includes(semester.semester) ? "rotate-180" : ""
                      }`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 rounded-xl border overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">Mã môn</th>
                          <th className="text-left p-3 text-sm font-medium">Tên môn học</th>
                          <th className="text-center p-3 text-sm font-medium hidden sm:table-cell">TC</th>
                          <th className="text-center p-3 text-sm font-medium hidden md:table-cell">GK</th>
                          <th className="text-center p-3 text-sm font-medium hidden md:table-cell">CK</th>
                          <th className="text-center p-3 text-sm font-medium">Tổng</th>
                          <th className="text-center p-3 text-sm font-medium">Điểm chữ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.courses.map((course, i) => (
                          <tr 
                            key={course.code} 
                            className={`border-t ${i % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
                          >
                            <td className="p-3 text-sm font-medium">{course.code}</td>
                            <td className="p-3 text-sm">{course.name}</td>
                            <td className="p-3 text-sm text-center hidden sm:table-cell">{course.credits}</td>
                            <td className="p-3 text-sm text-center hidden md:table-cell">{course.midterm}</td>
                            <td className="p-3 text-sm text-center hidden md:table-cell">{course.final}</td>
                            <td className="p-3 text-sm text-center font-medium">{course.total}</td>
                            <td className={`p-3 text-sm text-center font-bold ${getGradeColor(course.letterGrade)}`}>
                              {course.letterGrade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
