import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { 
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Repeat,
  MoreHorizontal,
  MapPin,
  CheckCircle,
  Crown,
  Pin,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  Award,
  Send,
  ThumbsUp,
  Smile
} from 'lucide-react';
import { Post } from './types';
import { formatTime } from './utils';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    title: string;
    verified: boolean;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
}

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (postId: string) => void;
  onRepost: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onNavigateToProfile?: (profileId: string) => void;
}

export function PostCard({ 
  post, 
  index, 
  onLike, 
  onRepost, 
  onBookmark, 
  onNavigateToProfile 
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Senior Developer',
        verified: true
      },
      content: 'Great insights! This really aligns with what we\'ve been seeing in our user research as well.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likes: 12,
      isLiked: false,
      replies: []
    },
    {
      id: '2',
      author: {
        name: 'Sarah Williams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Product Manager',
        verified: false
      },
      content: 'Would love to hear more about how you implemented this. Do you have any resources to share?',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      likes: 8,
      isLiked: true,
      replies: [
        {
          id: '2-1',
          author: {
            name: 'Alex Thompson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            title: 'Senior Software Engineer',
            verified: true
          },
          content: 'I\'ll put together a detailed post about our implementation process. Thanks for the interest!',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          likes: 5,
          isLiked: false,
          replies: []
        }
      ]
    }
  ]);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Software Developer',
        verified: false
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked 
          }
        : comment
    ));
  };

  const handleProfileClick = (profileId: string) => {
    if (onNavigateToProfile) {
      onNavigateToProfile(profileId);
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-12' : ''}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={comment.author.avatar} />
        <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            {comment.author.verified && (
              <CheckCircle className="w-3 h-3 text-blue-500" />
            )}
            <span className="text-xs text-muted-foreground">{comment.author.title}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-muted-foreground">
            {formatTime(comment.timestamp)}
          </span>
          <button 
            onClick={() => handleCommentLike(comment.id)}
            className={`flex items-center gap-1 text-xs transition-colors ${
              comment.isLiked ? 'text-blue-600' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <ThumbsUp className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
            {comment.likes > 0 && comment.likes}
          </button>
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Reply
          </button>
        </div>
        {comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary">
        {/* Post Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="relative">
            <Avatar 
              className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              onClick={() => handleProfileClick(post.author.id)}
            >
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {post.author.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 
                className="font-semibold text-sm sm:text-base truncate cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleProfileClick(post.author.id)}
              >
                {post.author.name}
              </h4>
              {post.author.verified && (
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
              )}
              {post.author.premium && (
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
              )}
              <Badge variant="outline" className="text-xs">
                {post.author.followers > 1000 
                  ? `${Math.round(post.author.followers / 1000)}k followers` 
                  : `${post.author.followers} followers`
                }
              </Badge>
              {post.isPromoted && (
                <Badge variant="default" className="text-xs bg-gradient-to-r from-blue-500 to-purple-500">
                  <Sparkles className="w-2 h-2 mr-1" />
                  Promoted
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">{post.author.title}</p>
            <p className="text-xs text-muted-foreground">{post.author.company}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</span>
              {post.location && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </span>
                </>
              )}
              {post.threadCount && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <Badge variant="secondary" className="text-xs">
                    {post.threadCount} part thread
                  </Badge>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {post.isPinned && (
              <Pin className="w-4 h-4 text-primary" />
            )}
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <div className="text-sm leading-relaxed whitespace-pre-line mb-3">
            {post.content.split(/(\#\w+|\@\w+)/g).map((part, i) => {
              if (part.startsWith('#')) {
                return (
                  <span key={i} className="text-blue-600 hover:underline cursor-pointer font-medium">
                    {part}
                  </span>
                );
              }
              if (part.startsWith('@')) {
                return (
                  <span key={i} className="text-purple-600 hover:underline cursor-pointer font-medium">
                    {part}
                  </span>
                );
              }
              return part;
            })}
          </div>
          
          {/* Media */}
          {post.media && post.media.length > 0 && (
            <div className="mt-4 grid gap-2 rounded-lg overflow-hidden">
              {post.media.map((media, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={media.url}
                    alt={media.alt || 'Post media'}
                    className="w-full h-64 sm:h-80 object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {/* Poll */}
          {post.poll && (
            <div className="mt-4 p-4 border border-border rounded-lg bg-muted/30">
              <h4 className="font-medium text-sm mb-3">{post.poll.question}</h4>
              <div className="space-y-2 mb-3">
                {post.poll.options.map((option, idx) => (
                  <div 
                    key={idx} 
                    className="relative p-3 border border-border rounded cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span>{option.text}</span>
                      <span className="font-medium">{option.percentage}%</span>
                    </div>
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.poll.totalVotes.toLocaleString()} votes</span>
                <span>Ends in {Math.ceil((post.poll.endsAt.getTime() - Date.now()) / (1000 * 60 * 60))} hours</span>
              </div>
            </div>
          )}

          {/* Achievement Badge */}
          {post.achievements && (
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{post.achievements.title}</h4>
                  <p className="text-xs text-muted-foreground">{post.achievements.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between py-2 border-t border-b border-border text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-blue-500" />
              {post.comments}
            </span>
            <span className="flex items-center gap-1">
              <Repeat className="w-3 h-3 text-green-500" />
              {post.reposts}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="w-3 h-3 text-purple-500" />
              {post.shares}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>{post.views.toLocaleString()} views</span>
            <div className="flex items-center gap-1">
              {post.engagement.trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : post.engagement.trend === 'down' ? (
                <TrendingDown className="w-3 h-3 text-red-500" />
              ) : (
                <Activity className="w-3 h-3 text-blue-500" />
              )}
              <span>{post.engagement.rate}%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={`text-xs sm:text-sm hover:bg-red-50 hover:text-red-600 transition-colors ${post.isLiked ? 'text-red-600 bg-red-50' : ''}`}
            >
              <Heart className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
              Like
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowComments(!showComments)}
              className="text-xs sm:text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Comment
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRepost(post.id)}
              className={`text-xs sm:text-sm hover:bg-green-50 hover:text-green-600 transition-colors ${post.isReposted ? 'text-green-600 bg-green-50' : ''}`}
            >
              <Repeat className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${post.isReposted ? 'fill-current' : ''}`} />
              Repost
            </Button>
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors">
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Share
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBookmark(post.id)}
            className={`text-xs sm:text-sm hover:bg-yellow-50 hover:text-yellow-600 transition-colors ${post.isBookmarked ? 'text-yellow-600 bg-yellow-50' : ''}`}
          >
            <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-border"
            >
              {/* Comment Input */}
              <div className="flex gap-3 mb-4">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map(comment => renderComment(comment))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}