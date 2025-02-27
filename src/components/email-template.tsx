import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                          firstName,
                                                                      }) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);

interface PwdVerificationProps {
    firstName: string;
    verificationCode: string;
}

export const RestPwdEmailTemplate: React.FC<Readonly<PwdVerificationProps>> = ({
                                                                                        firstName,
                                                                                        verificationCode,
                                                                                    }) => (
    <div>
        <h1>Hello, {firstName}!</h1>
        <p>Here is your reset password verification code: {verificationCode}</p>
    </div>
)

export const RegisterEmailTemplate: React.FC<Readonly<PwdVerificationProps>> = ({
    firstName,
    verificationCode,
}: {
    firstName: string;
    verificationCode: string;
}) => (
    <div>
        <h1>Welcome to Our Platform!</h1>
        <p>Thank you for registering. To complete your registration, please use the following verification code:</p>
        <h2>{verificationCode}</h2>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this registration, please ignore this email.</p>
    </div>
);
