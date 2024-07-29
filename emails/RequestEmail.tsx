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
const ResetPassword = ({
  detail,
  department,
  location,
}: {
  detail: string;
  department: string;
  location: { Latitude: string; Longitude: string };
}) => {
  const lat = location.Latitude;
  const lng = location.Longitude;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <Html>
      <Head />
      <Preview>Emergency Request</Preview>
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
                  This is an urgent alert regarding an emergency situation that
                  requires your immediate attention.
                </Text>
                <Text className="text-black font-medium text-[14px] leading-[24px] mb-8">
                  Department:{department}
                </Text>
                <Text className="text-black font-medium text-[14px] leading-[24px] mb-8">
                  {detail}
                </Text>

                <Text className="text-black font-medium text-[14px] leading-[24px]">
                  Please find the location of the incident on Google Maps by
                  clicking the link below:
                  <Link
                    href={googleMapsUrl}
                    target="_blank"
                    className="text-[#2754C5] underline"
                  >
                    View Location
                  </Link>
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
