import { useState } from "react";
import {
  Hash,
  Search,
  Users,
  MessageSquare,
  Plus,
  Send,
  Paperclip,
  Image,
  Smile,
  Heart,
  MessageCircle,
  ArrowLeft,
  Filter,
  TrendingUp,
  Clock,
  Flame,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppLayout from "@/components/layout/AppLayout";
import { threadChannels, threadPosts, badges } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function UITThread() {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  const channel = selectedChannel
    ? threadChannels.find((c) => c.id === selectedChannel)
    : null;
  const channelPosts = selectedChannel
    ? threadPosts.filter((p) => p.channelId === selectedChannel)
    : [];
  const post = selectedPost
    ? threadPosts.find((p) => p.id === selectedPost)
    : null;
  const replies = selectedPost
    ? threadPosts.filter((p) => p.parentId === selectedPost)
    : [];

  const filteredChannels = threadChannels.filter((c) => {
    if (filterType !== "all" && c.type !== filterType) return false;
    if (
      searchQuery &&
      !c.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Get all posts for feed view
  const allPosts = threadPosts.filter((p) => !p.parentId);
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortBy === "popular") return b.likes - a.likes;
    return 0; // Keep original order for recent
  });

  // Get trending/hot posts
  const trendingPosts = [...allPosts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  const getChannelTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Môn học";
      case "topic":
        return "Chủ đề";
      case "marketplace":
        return "Mua bán";
      case "lostfound":
        return "Thất lạc";
      default:
        return type;
    }
  };

  const getChannelTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-primary/10 text-primary border-primary/20";
      case "topic":
        return "bg-success/10 text-success border-success/20";
      case "marketplace":
        return "bg-warning/10 text-warning border-warning/20";
      case "lostfound":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getBadge = (badgeId: string | null) => {
    if (!badgeId) return null;
    return badges.find((b) => b.id === badgeId);
  };

  const getChannelById = (channelId: string) => {
    return threadChannels.find((c) => c.id === channelId);
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    toast({
      title: "Đăng bài thành công!",
      description: "Bài viết của bạn đã được đăng lên kênh",
    });
    setNewPostContent("");
  };

  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "❤️ Đã thích bài viết",
    });
  };

  // Main Feed View (No channel selected)
  if (!selectedChannel) {
    return (
      <AppLayout>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 animate-slide-up">
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                UITThread
              </h1>
              <p className="text-sm text-muted-foreground">
                Kết nối và trao đổi với cộng đồng UIT
              </p>
            </div>
            <Button className="gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài viết mới
            </Button>
          </div>

          {/* Quick Stats */}
          <div
            className="grid grid-cols-4 gap-2 animate-slide-up"
            style={{ animationDelay: "0.05s" }}
          >
            <Card
              className="hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setFilterType("course")}
            >
              <CardContent className="p-3 text-center">
                <span className="text-2xl">📚</span>
                <p className="text-xs text-muted-foreground mt-1">Môn học</p>
                <p className="font-bold">
                  {threadChannels.filter((c) => c.type === "course").length}
                </p>
              </CardContent>
            </Card>
            <Card
              className="hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setFilterType("topic")}
            >
              <CardContent className="p-3 text-center">
                <span className="text-2xl">💡</span>
                <p className="text-xs text-muted-foreground mt-1">Chủ đề</p>
                <p className="font-bold">
                  {threadChannels.filter((c) => c.type === "topic").length}
                </p>
              </CardContent>
            </Card>
            <Card
              className="hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setFilterType("marketplace")}
            >
              <CardContent className="p-3 text-center">
                <span className="text-2xl">🛒</span>
                <p className="text-xs text-muted-foreground mt-1">Mua bán</p>
                <p className="font-bold">
                  {
                    threadChannels.filter((c) => c.type === "marketplace")
                      .length
                  }
                </p>
              </CardContent>
            </Card>
            <Card
              className="hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setFilterType("lostfound")}
            >
              <CardContent className="p-3 text-center">
                <span className="text-2xl">🔍</span>
                <p className="text-xs text-muted-foreground mt-1">Thất lạc</p>
                <p className="font-bold">
                  {threadChannels.filter((c) => c.type === "lostfound").length}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Left Column - Channels */}
            <div className="lg:col-span-1 space-y-4">
              {/* Search & Filter */}
              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <CardContent className="p-3 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kênh..."
                      className="pl-10 h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["all", "course", "topic", "marketplace", "lostfound"].map(
                      (type) => (
                        <Badge
                          key={type}
                          variant={filterType === type ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => setFilterType(type)}
                        >
                          {type === "all"
                            ? "Tất cả"
                            : getChannelTypeLabel(type)}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Channels List */}
              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.15s" }}
              >
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">
                    Kênh ({filteredChannels.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 max-h-[400px] overflow-y-auto space-y-1">
                  {filteredChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <span className="text-xl">{channel.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {channel.name}
                          </span>
                          {channel.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="text-xs h-5 min-w-5 flex items-center justify-center"
                            >
                              {channel.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {channel.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Feed */}
            <div className="lg:col-span-2 space-y-4">
              {/* Trending Posts */}
              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Flame className="h-4 w-4 text-destructive" />
                    Bài viết nổi bật
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="grid sm:grid-cols-3 gap-2">
                    {trendingPosts.map((post, index) => {
                      const postChannel = getChannelById(post.channelId);
                      return (
                        <div
                          key={post.id}
                          className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedChannel(post.channelId);
                            setSelectedPost(post.id);
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{postChannel?.icon}</span>
                            <Badge
                              variant="outline"
                              className="text-xs truncate max-w-[100px]"
                            >
                              {postChannel?.name}
                            </Badge>
                          </div>
                          <p className="text-sm line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" /> {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />{" "}
                              {post.replies}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts Feed */}
              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.15s" }}
              >
                <CardHeader className="py-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Bài viết mới nhất
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant={sortBy === "recent" ? "default" : "ghost"}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSortBy("recent")}
                    >
                      Mới nhất
                    </Button>
                    <Button
                      variant={sortBy === "popular" ? "default" : "ghost"}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSortBy("popular")}
                    >
                      Phổ biến
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-3">
                  {sortedPosts.map((post) => {
                    const postChannel = getChannelById(post.channelId);
                    const authorBadge = getBadge(post.author.badge);

                    return (
                      <div
                        key={post.id}
                        className="p-4 rounded-xl bg-muted/50 hover:bg-muted cursor-pointer transition-all hover:shadow-sm"
                        onClick={() => {
                          setSelectedChannel(post.channelId);
                          setSelectedPost(post.id);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-sm">
                                {post.author.name}
                              </span>
                              {authorBadge && (
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${authorBadge.color} text-primary-foreground`}
                                >
                                  {authorBadge.icon}
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">
                                • {post.timestamp}
                              </span>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs mt-1 ${getChannelTypeColor(
                                postChannel?.type || ""
                              )}`}
                            >
                              {postChannel?.icon} {postChannel?.name}
                            </Badge>
                            <p className="mt-2 text-sm line-clamp-3 whitespace-pre-wrap">
                              {post.content}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={(e) => handleLikePost(post.id, e)}
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                {post.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.replies} trả lời
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Post Detail View
  if (selectedPost && post) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setSelectedPost(null)}
            className="animate-slide-up"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại {channel?.name}
          </Button>

          {/* Original Post */}
          <Card
            className="animate-slide-up"
            style={{ animationDelay: "0.05s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{post.author.name}</span>
                    {getBadge(post.author.badge) && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          getBadge(post.author.badge)?.color
                        } text-primary-foreground`}
                      >
                        {getBadge(post.author.badge)?.icon}{" "}
                        {getBadge(post.author.badge)?.name}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      • {post.timestamp}
                    </span>
                  </div>
                  <div className="mt-4 whitespace-pre-wrap text-foreground">
                    {post.content}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleLikePost(post.id, e)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {replies.length} trả lời
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reply Input */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Minh" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Viết trả lời của bạn..."
                    className="resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button className="gradient-primary">
                      <Send className="h-4 w-4 mr-2" />
                      Gửi trả lời
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          <div className="space-y-3">
            <h3 className="font-semibold">Trả lời ({replies.length})</h3>
            {replies.map((reply, index) => (
              <Card
                key={reply.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={reply.author.avatar} />
                      <AvatarFallback>
                        {reply.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{reply.author.name}</span>
                        {getBadge(reply.author.badge) && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              getBadge(reply.author.badge)?.color
                            } text-primary-foreground`}
                          >
                            {getBadge(reply.author.badge)?.icon}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          • {reply.timestamp}
                        </span>
                      </div>
                      <p className="mt-2 text-foreground">{reply.content}</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        <Heart className="h-4 w-4 mr-1" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  // Channel Posts View
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Channel Header */}
        <div className="flex items-center gap-4 animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedChannel(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{channel?.icon}</span>
              <h1 className="text-xl font-bold">{channel?.name}</h1>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="h-4 w-4" />
              {channel?.memberCount} thành viên
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Theo dõi
          </Button>
        </div>

        {/* Create Post */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Minh" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Hỏi bài, chia sẻ kinh nghiệm, hoặc tìm kiếm sự giúp đỡ..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    className="gradient-primary"
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Đăng bài
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-3">
          {channelPosts
            .filter((p) => !p.parentId)
            .map((post, index) => {
              const authorBadge = getBadge(post.author.badge);

              return (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-card-hover transition-all animate-slide-up"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  onClick={() => setSelectedPost(post.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">
                            {post.author.name}
                          </span>
                          {authorBadge && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${authorBadge.color} text-primary-foreground`}
                            >
                              {authorBadge.icon} {authorBadge.name}
                            </span>
                          )}
                          <span className="text-sm text-muted-foreground">
                            • {post.timestamp}
                          </span>
                        </div>
                        <p className="mt-2 text-foreground line-clamp-4 whitespace-pre-wrap">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleLikePost(post.id, e)}
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.replies} trả lời
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </AppLayout>
  );
}
