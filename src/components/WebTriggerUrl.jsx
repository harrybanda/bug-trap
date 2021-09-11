import ForgeUI, { useState, Code, useEffect } from "@forge/ui";
import { webTrigger } from "@forge/api";

export const WebTriggerUrl = () => {
  const [url, setUrl] = useState();
  useEffect(async () => {
    const wtUrl = await webTrigger.getUrl("web-trigger-key");
    setUrl(wtUrl);
  }, []);
  return <Code text={url} language="text" />;
};
