export default (authorizationToken: string) => {
  const encodedCreds = authorizationToken.split(" ")[1];
  const buff = Buffer.from(encodedCreds, "base64");
  const plainCreds = buff.toString("utf-8").split(":");
  const [username, password] = plainCreds;

  console.log(`username: ${username} and password": ${password}`);

  const storedUserPassword = process.env[username];
  const effect =
    !storedUserPassword || storedUserPassword != password ? "Deny" : "Allow";
  return { encodedCreds, effect };
};
