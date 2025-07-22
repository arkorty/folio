import { redirect } from 'next/navigation';

export default function Page() {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;

  if (!resumeUrl) {
    throw new Error('NEXT_PUBLIC_RESUME_URL is not defined');
  }

  redirect(resumeUrl);
}
