export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string;
};
