import { HttpServices } from "../config/HttpServices";
import data from "../config/token-address.json";

export const GetData = async () => {
  const result = await HttpServices.post(data.CreateAddress, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      pageIndex: 1,
      pageSize: 100000,
    },
  }).then((data) => data);
  // .catch((error) => showError(""));
  return result;
};

export const CreateData = async (Name, Phone) => {
  const result = await HttpServices.post(data.CreateAddress, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      name: Name,
      phone: Phone,
    },
  }).then((data) => data);
  return result;
};
export const LoginUser = async (User, Pass) => {
  const result = await HttpServices.post(data.LoginAddress, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      user: User,
      pass: Pass,
    },
  }).then((data) => data);
  return result;
};

export const Delete = async (id) => {
  const result = await HttpServices.post(data.DeleteAddress, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      id: id,
    },
  }).then((data) => data);
  return result;
};

// <!-- <div id="root">
// <div class="maindiv">
// totalcount = <t t-esc="totalCount" />
// <table>
// <tr>
// <th>id</th>
// <th>name</th>
// <th>phone</th>
// </tr>
// <tr t-foreach="result" t-as="data" style="border:solid grey 4px">
//                                         <td><span t-esc="data['id']"/></td>

//                                         <td><span t-esc="data['name']"/></td>

//                                         <td><span t-esc="data['phone']"/></td>
//                         </tr>
// </table>

// </div>
//  </div> -->
