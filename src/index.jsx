import ForgeUI, {
  render,
  Fragment,
  Macro,
  Text,
  useEffect,
  useState,
  Code,
  ModalDialog,
  Button,
} from "@forge/ui";
import { webTrigger } from "@forge/api";

const buildOutput = () => ({
  body: "",
  headers: {
    "Content-Type": ["application/json"],
  },
  statusCode: 200,
  statusText: "OK",
});

const WebTriggerUrl = () => {
  const [url, setUrl] = useState();

  useEffect(async () => {
    const wtUrl = await webTrigger.getUrl("web-trigger-key");
    setUrl(wtUrl);
  }, []);

  return <Code text={url} language="text" />;
};

const App = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Fragment>
      <Button text="Show modal" onClick={() => setOpen(true)} />
      {isOpen && (
        <ModalDialog header="My modal dialog" onClose={() => setOpen(false)}>
          <Text>Hello there!</Text>
          <WebTriggerUrl />
        </ModalDialog>
      )}
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);

export const runWebTrigger = async (req) => {
  console.log(JSON.parse(req.body));
  return buildOutput();
};
