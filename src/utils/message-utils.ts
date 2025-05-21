export function denormalizeMessages(storedMessages) {
  if (!storedMessages) {
    return [];
  }

  return storedMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
    parts: [
      {
        type: 'text',
        text: msg.content,
      }
    ],
  }));
}