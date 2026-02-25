'use client'
import { TimelineSection } from '~/app/(pages)/home/_components/timeline-section'
import { messages } from './data'

interface ProblemTimelineProps {
  title?: string
  messages?: Array<{
    _id: string
    messageId?: { current: string }
    tag: string
    message: string
    videoDescription?: string
    video?: { mp4?: string; webm?: string; poster?: unknown }
    order?: number
  }>
}

export function ProblemTimeline({
  title,
  messages: sanityMessages,
}: ProblemTimelineProps) {
  const timelineMessages = sanityMessages
    ? (sanityMessages.map((m) => ({
        id: m.messageId?.current ?? m._id,
        tag: m.tag,
        message: m.message,
        video: m.videoDescription ?? '',
      })) as typeof messages)
    : messages

  return (
    <TimelineSection
      id="the-problem"
      messages={timelineMessages}
      href="#platform"
      title={title ?? 'Compliance Gaps'}
    />
  )
}
