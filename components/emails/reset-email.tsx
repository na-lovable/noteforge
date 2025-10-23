import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface PasswordResetEmailProps {
    userName: string;
    resetUrl: string;
}

export default function PasswordResetEmail({ 
  userName, 
  resetUrl 
} : PasswordResetEmailProps) {
 return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - secure link expires soon</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{userName}</strong>.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-red-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button doesn't work, copy and paste this link into your browser:
              </Text>
              <Link
                href={resetUrl}
                className="text-red-600 text-[14px] break-all"
              >
                {resetUrl}
              </Link>
            </Section>

            {/* Security Warning */}
            <Section className="bg-red-50 border border-red-200 p-[20px] rounded-[8px] mb-[32px]">
              <Text className="text-[14px] text-red-800 leading-[20px] m-0 mb-[8px]">
                <strong>Important Security Information:</strong>
              </Text>
              <Text className="text-[14px] text-red-700 leading-[20px] m-0 mb-[8px]">
                • If you didn't request this reset, please ignore this email
              </Text>
              <Text className="text-[14px] text-red-700 leading-[20px] m-0">
                • Your current password remains unchanged until you create a new one
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
                <strong>Need Help?</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                If you're having trouble resetting your password or didn't request this change, please contact our support team immediately.
              </Text>
              <Link
                href="mailto:support@company.com"
                className="text-blue-600 text-[14px] font-semibold"
              >
                Contact Support
              </Link>
            </Section>

            {/* Alternative Action */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                Didn't request a password reset?
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                You can safely ignore this email. Your password will not be changed.
              </Text>
            </Section>

            {/* Footer */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};