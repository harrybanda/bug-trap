import ForgeUI, {
  render,
  Fragment,
  Macro,
  MacroConfig,
  useState,
  Select,
  UserPicker,
  RadioGroup,
  Radio,
  Option,
  useConfig,
  Text,
  useEffect,
} from "@forge/ui";
import api, { route } from "@forge/api";
import { ErrorsTable } from "./components/ErrorsTable";
import { ConfigDialog } from "./components/ConfigDialog";

const fetchProjects = async () => {
  const response = await api.asApp().requestJira(route`/rest/api/2/project`);
  return response.json();
};

const fetchIssueTypes = async () => {
  const response = await api.asApp().requestJira(route`/rest/api/2/issuetype`);
  const issueTypes = await response.json();
  return issueTypes.filter((issueType) => !issueType.subtask);
};

const getInstance = async () => {
  const response = await api.requestJira(route`/rest/applinks/latest/manifest`);
  const results = await response.text();
  const jurl = /\<url\>(.*)\<\/url\>/;
  return jurl.exec(results)[1];
};

const App = () => {
  const [issueCreated, setIssueCreated] = useState(false);
  const [issueKey, setIssueKey] = useState(null);
  const [site, setSite] = useState("");
  const config = useConfig();

  async function createIssue(summary, description) {
    setIssueKey(null);
    const payload = {
      fields: {
        project: {
          key: config.projectKey,
        },
        issuetype: {
          id: config.issueTypeId,
        },
        assignee: {
          id: config.assignee,
        },
        summary,
        description,
      },
    };
    const response = await api.asApp().requestJira(route`/rest/api/2/issue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await response.json();
    if (!response.ok) {
      console.error(responseBody);
      const firstErrorMessage = responseBody.errorMessages[0];
      let errorMessage = firstErrorMessage ? firstErrorMessage : "";
      if (responseBody.errors) {
        const messageSeparator = ". ";
        const additionalErrorText = Object.values(responseBody.errors).join(
          messageSeparator
        );
        if (additionalErrorText) {
          errorMessage = errorMessage
            ? errorMessage + messageSeparator + additionalErrorText
            : additionalErrorText;
        }
      }
      console.log("Failed to create issue.");
      console.log(errorMessage);
    } else {
      console.log("success");
      setIssueKey(responseBody.key);
      setIssueCreated(true);
      //setError(null);
      //setIssueKey(responseBody.key);
      //setState(STATE.SUCCESS);
    }
  }

  useEffect(async () => {
    const i = await getInstance();
    setSite(i);
  }, []);

  return (
    <Fragment>
      <ErrorsTable
        createIssue={createIssue}
        issueCreated={issueCreated}
        issueKey={issueKey}
        site={site}
      />
      <ConfigDialog />
    </Fragment>
  );
};

const Config = () => {
  const [projects] = useState(fetchProjects);
  const [issueTypes] = useState(fetchIssueTypes);
  return (
    <MacroConfig>
      <Select label="Project" name="projectKey">
        {projects.map((project) => {
          return (
            <Option
              label={`${project.name} (${project.key})`}
              value={project.key}
            />
          );
        })}
      </Select>
      <Select label="Issue type" name="issueTypeId">
        {issueTypes.map((issueType) => {
          return <Option label={issueType.name} value={issueType.id} />;
        })}
      </Select>
      <UserPicker label="Assign to" name="assignee" />
    </MacroConfig>
  );
};

export const run = render(<Macro app={<App />} />);
export const config = render(<Config />);
