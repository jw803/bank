import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: '1.0.0',
    title: 'Change Password Demo'
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "authorization", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
  definitions: {
    //定義預設值
    email: "jw80301@gmail.com",
    changePasswordReq: {
      email: {
        $ref: "#/definitions/email",
      },
      password: 'abc123',
      newPassword: 'bb'
    },
    emailOTPReq: {
      email: {
        '$ref': '#/definitions/email'
      }
    },
    verifyOTPReq: {
      verification_key: '',
      otp: '',
      email: {
        '$ref': '#/definitions/email'
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).then(
  async () => {
    await import("./server.js"); // Your project's root file
  }
);
