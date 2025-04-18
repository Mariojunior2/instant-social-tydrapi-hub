
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, Share2 } from 'lucide-react';

interface Post {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    isGroup: boolean;
  };
  content: string;
  time: string;
  likes: number;
  comments: number;
  liked: boolean;
  isAcademic?: boolean;
}

interface SocialPostsProps {
  posts: Post[];
  onLike: (postId: number) => void;
}

const SocialPosts = ({ posts, onLike }: SocialPostsProps) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Destaques</h2>
        <Button variant="link" className="text-tydrapi-red">Atualizar</Button>
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id} className={`tydrapi-card ${post.isAcademic ? 'border-l-4 border-l-yellow-500' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <CardTitle className="text-base">{post.user.name}</CardTitle>
                    <p className="text-xs text-tydrapi-gray">@{post.user.username} • {post.time}</p>
                  </div>
                </div>
                {post.user.isGroup && (
                  <Badge variant="outline" className={`${post.isAcademic ? 'bg-yellow-900' : 'bg-tydrapi-darkred'} border-none`}>
                    {post.isAcademic ? 'Acadêmico' : 'Grupo'}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.content}</p>
            </CardContent>
            <CardFooter className="pt-2 pb-3 flex justify-between text-tydrapi-gray">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-tydrapi-red">
                <MessageCircle size={18} /> {post.comments}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-1 ${post.liked ? 'text-tydrapi-red' : 'hover:text-tydrapi-red'}`}
                onClick={() => onLike(post.id)}
              >
                <Heart size={18} fill={post.liked ? '#E10600' : 'none'} /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-tydrapi-red">
                <Share2 size={18} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SocialPosts;
