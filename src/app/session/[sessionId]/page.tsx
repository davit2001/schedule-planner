import Chat from '../../../../components/Chat';

const SessionPage = ({ params }: {
  params: { sessionId: string }
}) => {
  return (
    <Chat sessionId={params.sessionId} />
  )
};

export default SessionPage;