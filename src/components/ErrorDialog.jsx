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

export const ErrorDialog = ({ isOpen, setOpen }) => {
  const error = {
    message: "x not defined",
    occurrences: 2,
    users: 5,
    time: "3 minutes ago",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Error Information" onClose={() => setOpen(false)}>
          <TagGroup>
            <Tag color="green" text="5 occurrences" />
            <Tag color="green" text="2 users" />
          </TagGroup>
          <Heading size="medium">X is not defined</Heading>
          <Text>
            <Strong>HomePage.js 50:5</Strong>
          </Text>
          <Text>May 25, 2020 9:00:00 PM UTC</Text>

          <Text>
            <Link href="http://localhost:3000/">http://localhost:3000/</Link>
          </Text>
          <Table>
            <Head>
              <Cell>
                <Text>User ID</Text>
              </Cell>
              <Cell>
                <Text>Browser Name</Text>
              </Cell>
              <Cell>
                <Text>Browser Version</Text>
              </Cell>
              <Cell>
                <Text>OS</Text>
              </Cell>
            </Head>
            <Row>
              <Cell>
                <Text>453535435345</Text>
              </Cell>
              <Cell>
                <Text>Chrome</Text>
              </Cell>
              <Cell>
                <Text>67.7</Text>
              </Cell>
              <Cell>
                <Text>Mac</Text>
              </Cell>
            </Row>
          </Table>
          <Text>
            <Strong>User Feedback</Strong>
          </Text>
          {error.feedback == "" ? (
            <Text>No Feedback</Text>
          ) : (
            <Text>{error.feedback}</Text>
          )}
          <ButtonSet>
            <Button icon="arrow-left" />
            <Button icon="arrow-right" />
            <Button text="Create Issue" />
          </ButtonSet>
        </ModalDialog>
      )}
    </Fragment>
  );
};
