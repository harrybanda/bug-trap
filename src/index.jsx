import ForgeUI, { render, Fragment, Macro } from "@forge/ui";
import { ErrorsTable } from "./components/ErrorsTable";
import { ConfigDialog } from "./components/ConfigDialog";

const App = () => {
  return (
    <Fragment>
      <ErrorsTable />
      <ConfigDialog />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
