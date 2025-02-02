export function calcTimeBeforeExpires(
  createdAt: Date,
  minutesLeftWhenFirstIssued: number,
) {
  const now = new Date();
  const tokenCreationTime = new Date(createdAt);
  const timeElapsed = now.getTime() - tokenCreationTime.getTime();
  const timeLeftWhenIssued = minutesLeftWhenFirstIssued * 60 * 1000;

  if (timeElapsed < timeLeftWhenIssued) {
    const timeToWait = timeLeftWhenIssued - timeElapsed;
    const minutes = Math.floor(timeToWait / (60 * 1000));
    const seconds = Math.floor((timeToWait % (60 * 1000)) / 1000);
    const dateOfIssue = new Date(now.getTime() + timeToWait).toLocaleString();

    return { minutes, seconds, dateOfIssue };
  } else {
    return null;
  }
}
