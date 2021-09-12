import ForgeUI, {
  ModalDialog,
  Fragment,
  Button,
  ButtonSet,
  Text,
  Strong,
  Link,
  Heading,
  Table,
  Head,
  Row,
  Cell,
  Tag,
  TagGroup,
} from "@forge/ui";
import moment from "moment";

export const ErrorDialog = ({
  isOpen,
  setOpen,
  errorData,
  occurrences,
  users,
  navButtonsL,
  navButtonsR,
  setNavButtonsL,
  setNavButtonsR,
  currentError,
  setCurrentError,
}) => {
  let feedback = undefined;
  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Error Information" onClose={() => setOpen(false)}>
          <TagGroup>
            <Tag color="green" text={occurrences + " occurrences"} />
            <Tag color="green" text={users + " users"} />
          </TagGroup>
          <Heading size="medium">
            {errorData[currentError].fullErrorMessage}
          </Heading>
          <Text>
            <Strong>
              {JSON.parse(errorData[currentError].fileInfo).functionName +
                ".js" +
                " " +
                JSON.parse(errorData[currentError].fileInfo).lineNumber +
                ":" +
                JSON.parse(errorData[currentError].fileInfo).columnNumber}
            </Strong>
          </Text>
          <Text>{moment(errorData[currentError].date).format("LLLL")}</Text>
          <Text>
            <Link href={errorData[currentError].url}>
              {errorData[currentError].url}
            </Link>
          </Text>
          <Table>
            <Head>
              <Cell>
                <Text>Browser Name</Text>
              </Cell>
              <Cell>
                <Text>Browser Version</Text>
              </Cell>
              <Cell>
                <Text>OS</Text>
              </Cell>
              <Cell>
                <Text>OS Version</Text>
              </Cell>
            </Head>
            <Row>
              <Cell>
                <Text>{errorData[currentError].browserName}</Text>
              </Cell>
              <Cell>
                <Text>{errorData[currentError].browserVersion}</Text>
              </Cell>
              <Cell>
                <Text>{errorData[currentError].osName}</Text>
              </Cell>
              <Cell>
                <Text>{errorData[currentError].osVersion}</Text>
              </Cell>
            </Row>
          </Table>
          <Text>
            <Strong>User Feedback</Strong>
          </Text>
          {feedback == undefined ? (
            <Text>No Feedback</Text>
          ) : (
            <Text>{error.feedback}</Text>
          )}
          <ButtonSet>
            <Button
              disabled={navButtonsL}
              icon="arrow-left"
              onClick={() => {
                currentError--;
                if (currentError == 0) {
                  setNavButtonsL(true);
                } else {
                  setNavButtonsR(false);
                }
                setCurrentError(currentError);
              }}
            />
            <Button
              disabled={navButtonsR}
              icon="arrow-right"
              onClick={() => {
                currentError++;
                if (currentError == occurrences - 1) {
                  setNavButtonsR(true);
                } else {
                  setNavButtonsL(false);
                }
                setCurrentError(currentError);
              }}
            />
            <Button text="Create Issue" />
          </ButtonSet>
          <Text>{currentError + 1 + "/" + occurrences + " occurrences"}</Text>
        </ModalDialog>
      )}
    </Fragment>
  );
};
