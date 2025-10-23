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

interface VerificationEmailProps {
    userName: string;
    verificationUrl: string;
}

export default function VerificationEmail({
    userName,
    verificationUrl,
}: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Verify your email address to complete your account setup</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                                Verify Your Email Address
                            </Heading>
                            <Text className="text-[16px] text-gray-600 m-0">
                                Welcome! Please verify your email to get started.
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                                Hi there,
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                                Thanks for signing up! To complete your account setup and start using our platform, please verify your email address by clicking the button below.
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                                Name: <strong>{userName}</strong>
                            </Text>
                        </Section>

                        {/* Verification Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={verificationUrl}
                                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                            >
                                Verify Email Address
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section className="mb-[32px]">
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                                If the button above doesn't work, copy and paste this link into your browser:
                            </Text>
                            <Link
                                href={verificationUrl}
                                className="text-blue-600 text-[14px] break-all"
                            >
                                {verificationUrl}
                            </Link>
                        </Section>

                        {/* Security Notice */}
                        <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
                            <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
                                <strong>Security Notice:</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                                This verification link will expire in 24 hours. If you didn't create an account, please ignore this email or contact our support team.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};