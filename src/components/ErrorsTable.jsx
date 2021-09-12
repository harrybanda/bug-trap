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
  const [disableL, setDisableL] = useState(true);
  const [disableR, setDisableR] = useState(true);
  const [errorIndex, setErrorIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(undefined);

  useEffect(async () => {
    const _errors = await storage
      .query()
      .where("key", startsWith("error_group_"))
      .getMany();

    const _feedbacks = await storage
      .query()
      .where("key", startsWith("error_id_"))
      .getMany();

    setErrors(_errors.results);
    setFeedbacks(_feedbacks.results);
  }, []);

  const feedbackExists = (id) => {
    return feedbacks.some(function (el) {
      if (el.key === id) {
        setCurrentFeedback(el.value);
      }
    });
  };

  const removeError = async (idx) => {
    await storage.delete(idx).then(() => {
      const temp = [...errors];
      temp.splice(idx, 1);
      setErrors(temp);
    });
  };

  return (
    <Fragment>
      <ErrorDialog
        isOpen={isOpenError}
        setOpen={setOpenError}
        errorData={selectedErrors}
        occurrences={occurrences}
        users={users}
        disableL={disableL}
        setDisableL={setDisableL}
        disableR={disableR}
        setDisableR={setDisableR}
        errorIndex={errorIndex}
        setErrorIndex={setErrorIndex}
        feedbacks={feedbacks}
        currentFeedback={currentFeedback}
        setCurrentFeedback={setCurrentFeedback}
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
                        setDisableL(true);
                        setDisableR(false);
                      } else {
                        setDisableL(true);
                        setDisableR(true);
                      }
                      setOpenError(true);

                      feedbackExists(error.value.errors[errorIndex].errorId);
                    }}
                  />
                  <Button
                    icon="trash"
                    onClick={async () => {
                      await removeError(
                        error.value.errors[errorIndex].errorGroupId
                      );
                    }}
                  />
                </ButtonSet>
              </Cell>
            </Row>
          ))}
        </Table>
      )}
    </Fragment>
  );
};
