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

export const ErrorDialog = ({
  isOpen,
  setOpen,
  errorData,
  occurrences,
  users,
  disableL,
  disableR,
  setDisableL,
  setDisableR,
  errorIndex,
  setErrorIndex,
  feedbacks,
  currentFeedback,
  setCurrentFeedback,
}) => {
  const errorPrev = () => {
    let index = errorIndex - 1;
    let disableL = index === 0;
    setErrorIndex(index);
    setDisableL(disableL);
    setDisableR(false);
    feedbackExists(errorData[index].errorId);
  };

  const errorNext = () => {
    let index = errorIndex + 1;
    let disableR = index === occurrences - 1;
    setErrorIndex(index);
    setDisableR(disableR);
    setDisableL(false);
    feedbackExists(errorData[index].errorId);
  };

  const feedbackExists = (id) => {
    return feedbacks.some(function (el) {
      if (el.key === id) {
        setCurrentFeedback(el.value);
      }
    });
  };

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Error Information" onClose={() => setOpen(false)}>
          <TagGroup>
            <Tag color="green" text={occurrences + " occurrences"} />
            <Tag color="green" text={users + " users"} />
          </TagGroup>
          <Heading size="medium">
            {errorData[errorIndex].fullErrorMessage}
          </Heading>
          <Text>
            <Strong>
              {JSON.parse(errorData[errorIndex].fileInfo).functionName +
                ".js" +
                " " +
                JSON.parse(errorData[errorIndex].fileInfo).lineNumber +
                ":" +
                JSON.parse(errorData[errorIndex].fileInfo).columnNumber}
            </Strong>
          </Text>
          <Text>{errorData[errorIndex].fullDate}</Text>
          <Text>
            <Link href={errorData[errorIndex].url}>
              {errorData[errorIndex].url}
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
                <Text>{errorData[errorIndex].browserName}</Text>
              </Cell>
              <Cell>
                <Text>{errorData[errorIndex].browserVersion}</Text>
              </Cell>
              <Cell>
                <Text>{errorData[errorIndex].osName}</Text>
              </Cell>
              <Cell>
                <Text>{errorData[errorIndex].osVersion}</Text>
              </Cell>
            </Row>
          </Table>
          <Text>
            <Strong>User Feedback</Strong>
          </Text>
          {currentFeedback == undefined ? (
            <Text>No Feedback</Text>
          ) : (
            <Text>{currentFeedback.report}</Text>
          )}
          <ButtonSet>
            <Button
              disabled={disableL}
              icon="arrow-left"
              onClick={() => errorPrev()}
            />
            <Button
              disabled={disableR}
              icon="arrow-right"
              onClick={() => errorNext()}
            />
            <Button text="Create Issue" />
          </ButtonSet>
          <Text>{errorIndex + 1 + "/" + occurrences + " occurrences"}</Text>
        </ModalDialog>
      )}
    </Fragment>
  );
};
