import ForgeUI, {
  render,
  Fragment,
  Macro,
  Text,
  Strong,
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

  const installCode = `# using yarn
yarn add react-bug-trap
# using npm
npm install react-bug-trap`;

  const configCode = `// import the module
import { BugTrap } from "react-bug-trap";
// wrap any component with <BugTrap>
<BugTrap webhook="YOUR_FORGE_WEBHOOK">
  <App />
</BugTrap>`;

  return (
    <Fragment>
      <Button text="React Application Setup" onClick={() => setOpen(true)} />
      {isOpen && (
        <ModalDialog
          header="React Application Setup"
          onClose={() => setOpen(false)}
        >
          <Text>
            <Strong>Installation</Strong>
          </Text>
          <Text>
            This module should be installed as one of your project's
            dependencies:
          </Text>
          <Code text={installCode} language="shell" />
          <Text>
            <Strong>Usage</Strong>
          </Text>
          <Text>
            Wrap <Code text="<BugTrap>" language="javascript" /> around any
            component that may throw an error. This will handle errors thrown by
            that component and its descendants too.
          </Text>
          <Code text={configCode} language="javascript" />
          <Text>
            Replace <Code text="YOUR_FORGE_WEBHOOK" language="javascript" />{" "}
            with the URL below:
          </Text>
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
