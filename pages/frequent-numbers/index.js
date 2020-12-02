import { Component } from "react";
import FrequentNumber from "../../components/tier3-screens/FrequentNumber";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog } from "../../scripts/General";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case "SuperAdmin":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "BusinessSuport":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "Distributor":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "OrganizationAdmin":
            res.writeHead(302, {
              Location: "/admin-dashboard",
            });
            res.end();

            break;

          default:
            break;
        }
      } else {
        res.writeHead(302, {
          Location: "/",
        });
        res.end();
      }
    }

    const frequentNumbersTableData = [
      {
        key: "1",
        alias: "Peter Lock",
        number: "33278779099",
      },
      {
        key: "2",
        alias: "Anna Frias",
        number: "33278779099",
      },
      {
        key: "3",
        alias: "Samuel Harlock",
        number: "33278779099",
      },
      {
        key: "4",
        alias: "Sebastian Bones",
        number: "33278779099",
      },
    ];

    return {
      frequentNumbersTableData,
      user,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = "";
  }
  componentDidMount() {
    systemLog.log(this.props);
  }

  render() {
    const { frequentNumbersTableData } = this.props;

    return (
      <BaseLayout>
        <FrequentNumber frequentNumbersTableData={frequentNumbersTableData} />
      </BaseLayout>
    );
  }
}
