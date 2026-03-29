import app from "./app.js";
import { env } from "./utils/env.js";

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port} in ${env.nodeEnv} mode`);
});
