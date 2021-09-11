import ForgeUI, {
  Fragment,
  Text,
  Strong,
  useState,
  Code,
  ModalDialog,
  Button,
} from "@forge/ui";
import { WebTriggerUrl } from "./WebTriggerUrl";

export const ConfigDialog = () => {
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
      <Button
        text="Configuration"
        icon="settings"
        iconPosition="before"
        onClick={() => setOpen(true)}
      />
      {isOpen && (
        <ModalDialog header="Configuration" onClose={() => setOpen(false)}>
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
