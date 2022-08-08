const Logs: string[] = [];

const addToLogs = (data: string): void => {
  const now = new Date();
  const current = `${now.getHours()}:${now.getMinutes()}`;
  Logs.push(`${current} ${data}`);
};

export default addToLogs;
