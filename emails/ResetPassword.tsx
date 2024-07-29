import * as React from "react";

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
const ResetPassword = ({ newPassword }: { newPassword: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Password Reset</Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
              <Section className="mt-[32px]">
                <Img
                  src={`${process.env.HOST_NAME}/icon.png`}
                  width="160"
                  height="48"
                  alt="logo"
                  className="my-0 mx-auto"
                />
              </Section>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Text className="text-black font-medium text-[14px] leading-[24px] mb-8">
                  Hello, You have requested to update your password. Here is
                  your new password for login. <b>{newPassword}</b>
                </Text>
                <Text className="text-black font-medium text-[14px] leading-[24px] mb-8">
                  Please log in with the new password and update your profile.
                </Text>
              </Section>

              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

              <Text className="text-[#666666] text-[12px] leading-[24px] flex items-center justify-center">
                © Security alert system, All rights reserved.
              </Text>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
};

export default ResetPassword;
