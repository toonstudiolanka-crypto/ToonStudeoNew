export type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video";
  alt?: string;
};

export type FeaturedVideo = {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
};

export type ServiceItem = {
  id: string;
  number: string;
  accent: string;
  title: string;
  description: string;
  imageUrl: string;
  theme: "dark" | "dark-alt" | "orange" | "blue";
};

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  videoUrl?: string;
  aspect: "4/5" | "1/1" | "16/10" | "3/4" | "5/4";
};

export type Founder = {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type ClientLogo = {
  id: string;
  name: string;
  imageUrl: string;
};

export type PressFeature = {
  id: string;
  kind: "newspaper" | "article";
  source: string;
  title: string;
  byline?: string;
  excerpt?: string;
  imageUrl: string;
  imagePosition?: string;
  articleUrl?: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[];
    subtitle: string;
    tags: string[];
    mediaUrl: string;
    mediaType: "image" | "video";
  };
  whoWeAre: {
    label: string;
    headline: string;
    headlineParts?: Array<{ text: string; color?: string }>;
    description: string;
  };
  clientLogos: {
    label: string;
    logos: ClientLogo[];
  };
  featuredVideos: FeaturedVideo[];
  featuredPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pressFeatures: PressFeature[];
  };
  strength: {
    label: string;
    headline: string;
    paragraphs: string[];
    quote: string;
    footer: string;
  };
  services: ServiceItem[];
  work: WorkItem[];
  founders: Founder[];
  contact: {
    email: string;
    phones: string[];
    social: SocialLink[];
    youtubeUrl: string;
  };
  footer: {
    copyright: string;
    location: string;
  };
};
