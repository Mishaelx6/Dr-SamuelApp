import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Book, Video } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));

  const { data: books = [] } = useQuery<Book[]>({
    queryKey: ["/api/books"],
    enabled: isAuthenticated
  });

  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    enabled: isAuthenticated
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token);
      setIsAuthenticated(true);
      toast({ title: "Login successful", description: "Welcome to admin dashboard" });
    },
    onError: () => {
      toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
    }
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete book');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      toast({ title: "Book deleted", description: "Book has been removed successfully" });
    }
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete video');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({ title: "Video deleted", description: "Video has been removed successfully" });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    loginMutation.mutate({
      username: formData.get('username') as string,
      password: formData.get('password') as string
    });
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to add book');
      
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      setShowAddBook(false);
      toast({ title: "Book added", description: "New book has been added successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add book", variant: "destructive" });
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to add video');
      
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      setShowAddVideo(false);
      toast({ title: "Video added", description: "New video has been added successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add video", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                name="username"
                type="text"
                placeholder="Username"
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setLocation("/")}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setLocation("/")}>
              Back to Site
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                localStorage.removeItem('adminToken');
                setIsAuthenticated(false);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="books" className="space-y-6">
          <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Books</h2>
              <Dialog open={showAddBook} onOpenChange={setShowAddBook}>
                <DialogTrigger asChild>
                  <Button>Add New Book</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Book</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddBook} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="title" placeholder="Book Title" required />
                      <Input name="author" placeholder="Author" required />
                    </div>
                    <Textarea name="description" placeholder="Description" required />
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="price" type="number" step="0.01" placeholder="Price" required />
                      <Input name="coverImage" type="file" accept="image/*" />
                    </div>
                    <Input name="pdfFile" type="file" accept=".pdf" />
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddBook(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Book</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {books.map((book) => (
                <Card key={book.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      {book.coverImage && (
                        <img src={book.coverImage} alt={book.title} className="w-16 h-20 object-cover rounded" />
                      )}
                      <div>
                        <h3 className="font-semibold">{book.title}</h3>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-primary font-bold">${book.price}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteBookMutation.mutate(book.id)}
                        disabled={deleteBookMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Videos</h2>
              <Dialog open={showAddVideo} onOpenChange={setShowAddVideo}>
                <DialogTrigger asChild>
                  <Button>Add New Video</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Video</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddVideo} className="space-y-4">
                    <Input name="title" placeholder="Video Title" required />
                    <Textarea name="description" placeholder="Description" required />
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="platform" placeholder="Platform (YouTube, Vimeo, etc.)" required />
                      <Input name="duration" placeholder="Duration (e.g., 45 min)" />
                    </div>
                    <Input name="videoUrl" placeholder="Video URL" required />
                    <Input name="thumbnail" type="file" accept="image/*" />
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddVideo(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Video</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      {video.thumbnail && (
                        <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover rounded" />
                      )}
                      <div>
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-gray-600">{video.platform}</p>
                        <p className="text-sm text-gray-500">{video.duration}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteVideoMutation.mutate(video.id)}
                        disabled={deleteVideoMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{books.length}</div>
                    <div className="text-gray-600">Total Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">{videos.length}</div>
                    <div className="text-gray-600">Total Videos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning">0</div>
                    <div className="text-gray-600">Total Sales</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
