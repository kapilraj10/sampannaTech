'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { useApiData, api } from '@/hooks/useApiData';
import Container from '@/components/ui/Container';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';

export default function TeamView() {
  const team = useApiData(() => api.getTeam());

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <Container>
        {team.loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[300px]" />
            ))}
          </div>
        )}

        {team.error && !team.loading && (
          <ErrorMessage message={team.error} onRetry={team.refetch} />
        )}

        {!team.loading && !team.error && team.data.length === 0 && (
          <EmptyState
            title="Team information coming soon"
            description="We are currently updating our team directory. Please check back soon."
          />
        )}

        {!team.loading && !team.error && team.data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.data.map((member) => {
              const socials = [
                { key: 'linkedin' as const, icon: Linkedin },
                { key: 'github' as const, icon: Github },
                { key: 'email' as const, icon: Mail },
              ].filter((s) => member.social?.[s.key]);

              return (
                <article
                  key={member._id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    {member.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-800">
                        {member.name
                          .split(' ')
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {member.name}
                      </h2>
                      <p className="mt-0.5 text-sm font-medium text-brand-600">
                        {member.position}
                      </p>
                    </div>
                  </div>

                  {member.bio && (
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                      {member.bio}
                    </p>
                  )}

                  {member.skills && member.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {socials.length > 0 && (
                    <div className="mt-5 flex gap-2">
                      {socials.map((social) => (
                        <a
                          key={social.key}
                          href={member.social?.[social.key]}
                          target={social.key === 'email' ? undefined : '_blank'}
                          rel={
                            social.key === 'email'
                              ? undefined
                              : 'noopener noreferrer'
                          }
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors',
                            'hover:border-brand-200 hover:text-brand-600'
                          )}
                          aria-label={`${member.name} ${social.key}`}
                        >
                          <social.icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}