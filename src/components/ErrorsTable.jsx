import ForgeUI, {
  Fragment,
  Text,
  Strong,
  Button,
  Table,
  Head,
  Row,
  Cell,
  ButtonSet,
  useState,
} from "@forge/ui";
import { ErrorDialog } from "./ErrorDialog";

export const ErrorsTable = () => {
  const [isOpenError, setOpenError] = useState(false);
  const errors = [
    {
      message: "x not defined",
      occurrences: 2,
      users: 5,
      time: "3 minutes ago",
    },
  ];
  return (
    <Fragment>
      <ErrorDialog isOpen={isOpenError} setOpen={setOpenError} />
      {errors.length == 0 ? (
        <Text>No errors reported</Text>
      ) : (
        <Table>
          <Head>
            <Cell>
              <Text>Error Message</Text>
            </Cell>
            <Cell>
              <Text>Occurrences</Text>
            </Cell>
            <Cell>
              <Text>Users</Text>
            </Cell>
            <Cell>
              <Text>Actions</Text>
            </Cell>
          </Head>
          {errors.map((error) => (
            <Row>
              <Cell>
                <Text>
                  <Strong>{error.message}</Strong>
                </Text>
                <Text>{error.time}</Text>
              </Cell>
              <Cell>
                <Text>{error.occurrences}</Text>
              </Cell>
              <Cell>
                <Text>{error.users}</Text>
              </Cell>
              <Cell>
                <ButtonSet>
                  <Button text="Open" onClick={() => setOpenError(true)} />
                  <Button icon="trash" />
                </ButtonSet>
              </Cell>
            </Row>
          ))}
        </Table>
      )}
    </Fragment>
  );
};
