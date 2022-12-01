import bankJson from "../../json/bank.json";
import { Card, Stack, Container, Table,Button  } from "@mantine/core";
import Link from "next/link";
import { RowData } from "../../types"
// Next Dynamic routes access via [id] file name
export async function getStaticPaths() {
  const arr = bankJson.accounts.map((acc) => {
    return { params: { id: acc.id.toString() } };
  });
  return {
    paths: arr,
    fallback: false, 
  };
}
// getstaticprops pre-render with data instead of without data that components might need
export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: { // Passed to the pages component as props
      accountDetails: bankJson.accounts.find(
        (acc) => acc.id.toString() === params.id
      ),
    },
  };
}
// this is where the data is displayed per transaction details
const AccountDetails = ({ accountDetails }: { accountDetails: RowData }) => {
  return (
    <Container size="xs">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Stack>
          <h2>Accounts Details</h2>
          <b>Description: {accountDetails.description}</b>
          <div>
            <p>
              Category: <span>{accountDetails.category}</span>
            </p>
          </div>

          <Table
            align="left"
            className="table"
            horizontalSpacing="md"
            verticalSpacing="md"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>{accountDetails.id}</td>
              <td>{accountDetails.description}</td>
              <td>{accountDetails.credit ? accountDetails.credit : ""}</td>
              <td>{accountDetails.debit ? accountDetails.debit : ""}</td>
              <td>{accountDetails.transactionDate}</td>
              </tr>
            </tbody>
          </Table>
          <Link href="/">
              <Button>Back</Button>
          </Link>
        </Stack>
      </Card>
    </Container>
  );
};

export default AccountDetails;
