export const extractHashtags = (content: string): string[] => {
  const matches = content.match(/#\w+/g);
  return matches ? matches.map(tag => tag.slice(1)) : [];
};

export const extractMentions = (content: string): string[] => {
  const matches = content.match(/@\w+/g);
  return matches ? matches.map(mention => mention.slice(1)) : [];
};

export const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else {
    return date.toLocaleDateString();
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export const getEngagementColor = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return 'text-green-500';
    case 'down':
      return 'text-red-500';
    case 'stable':
    default:
      return 'text-blue-500';
  }
};

export const filterPosts = (posts: any[], filter: string, isFollowing: Record<string, boolean>) => {
  return posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'following') return isFollowing[post.author.id];
    if (filter === 'trending') return post.engagement.rate > 8;
    if (filter === 'companies') return post.author.title === 'Company';
    if (filter === 'jobs') return post.type === 'job';
    return true;
  });
};