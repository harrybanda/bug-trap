import ForgeUI, {
  Fragment,
  Text,
  Button,
  Table,
  Head,
  Row,
  Cell,
  ButtonSet,
  useState,
  useEffect,
} from "@forge/ui";
import moment from "moment";
import { storage, startsWith } from "@forge/api";
import { ErrorDialog } from "./ErrorDialog";

export const ErrorsTable = () => {
  const [isOpenError, setOpenError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedErrors, setSelectedErrors] = useState([]);
  const [occurrences, setOccurrences] = useState([]);
  const [users, setUsers] = useState([]);
  const [navButtonsL, setNavButtonsL] = useState(true);
  const [navButtonsR, setNavButtonsR] = useState(true);
  const [currentError, setCurrentError] = useState(0);

  useEffect(async () => {
    const _errors = await storage
      .query()
      .where("key", startsWith("error_group_"))
      .getMany();
    setErrors(_errors.results);
  }, []);

  return (
    <Fragment>
      <ErrorDialog
        isOpen={isOpenError}
        setOpen={setOpenError}
        errorData={selectedErrors}
        occurrences={occurrences}
        users={users}
        navButtonsL={navButtonsL}
        setNavButtonsL={setNavButtonsL}
        navButtonsR={navButtonsR}
        setNavButtonsR={setNavButtonsR}
        currentError={currentError}
        setCurrentError={setCurrentError}
      />
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
              <Text>Time</Text>
            </Cell>
            <Cell>
              <Text>Actions</Text>
            </Cell>
          </Head>
          {errors.map((error) => (
            <Row>
              <Cell>
                <Text>{error.value.message.substring(0, 20) + "..."}</Text>
              </Cell>
              <Cell>
                <Text>{error.value.occurrences}</Text>
              </Cell>
              <Cell>
                <Text>{error.value.users}</Text>
              </Cell>
              <Cell>
                <Text>{moment(error.value.date).fromNow()}</Text>
              </Cell>
              <Cell>
                <ButtonSet>
                  <Button
                    text="Open"
                    onClick={() => {
                      setSelectedErrors(error.value.errors);
                      setOccurrences(error.value.occurrences);
                      setUsers(error.value.users);

                      if (error.value.occurrences > 1) {
                        setNavButtonsL(true);
                        setNavButtonsR(false);
                      } else {
                        setNavButtonsL(true);
                        setNavButtonsR(true);
                      }

                      setOpenError(true);
                    }}
                  />
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
