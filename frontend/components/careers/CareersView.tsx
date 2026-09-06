'use client';

import { useApiData, api } from '@/hooks/useApiData';
import Container from '@/components/ui/Container';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import JobCard from '@/components/careers/JobCard';

export default function CareersView() {
  const jobs = useApiData(() => api.getJobs());

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <Container>
        {jobs.loading && <LoadingCard className="mx-auto max-w-3xl" />}

        {jobs.error && !jobs.loading && (
          <ErrorMessage message={jobs.error} onRetry={jobs.refetch} />
        )}

        {!jobs.loading && !jobs.error && jobs.data.length === 0 && (
          <EmptyState
            title="We don't have any open positions right now"
            description="We'd still love to hear from you. Send your details to the email on our contact page and we will keep you in mind as roles open up."
          />
        )}

        {!jobs.loading && !jobs.error && jobs.data.length > 0 && (
          <div className="mx-auto max-w-4xl space-y-6">
            {jobs.data.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}