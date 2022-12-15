import * as coda from "@codahq/packs-sdk";
export const pack = coda.newPack();

pack.addNetworkDomain("6o5evn.deta.dev");

const SubjectSchema = coda.makeObjectSchema({
  properties: {
    Serial: { type: coda.ValueType.Number, fromKey: "S.No" },
    Code: {
      type: coda.ValueType.String,
      fromKey: "Course_Code",
    },
    Name: {
      type: coda.ValueType.String,
      fromKey: "Course_Name",
    },
    Type: {
      type: coda.ValueType.String,
      fromKey: "Course_Type",
    },
    Category: {
      type: coda.ValueType.String,
      fromKey: "Course_Category",
    },
    Conduct: {
      type: coda.ValueType.Number,
      fromKey: "Conducted",
    },
    Attend: {
      type: coda.ValueType.Number,
      fromKey: "Attended",
    },
    Percentage: {
      type: coda.ValueType.Number,
      fromKey: "Attendance_%",
    },
    Status: {
      type: coda.ValueType.String,
      fromKey: "Status",
    },
  },
  displayProperty: "Name",
  idProperty: "Code",
  featuredProperties: ["Conduct", "Attend", "Percentage", "Status"],
});

pack.addSyncTable({
  name: "attendTable",
  description: "Displays the attendance table",
  identityName: "attendTable",
  schema: SubjectSchema,
  formula: {
    name: "syncAttend",
    description: "Syncs the attendance table",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "username",
        description: "Username to your Samvidha login",
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "password",
        description: "Password to your Samvidha login",
      }),
    ],

    execute: async function ([username, password], context) {
      let baseUrl = "https://6o5evn.deta.dev/api/samvidha/attend/dis/v1";
      let url = coda.withQueryParams(baseUrl, {
        username: username,
        password: password,
      });
      let response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      let subjects = response.body.data;
      return {
        result: subjects,
      };
    },
  },
});
