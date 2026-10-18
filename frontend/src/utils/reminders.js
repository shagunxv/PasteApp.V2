
export const scheduleReminders = (content) => {
  if (!content || !('Notification' in window)) {
    return;
  }

  if (Notification.permission !== 'granted') {
    return;
  }

  const reminder = new Notification('Paste Reminder', {
    body: content.length > 100
      ? `${content.slice(0, 100)}...`
      : content,
  });

  return reminder;
};
